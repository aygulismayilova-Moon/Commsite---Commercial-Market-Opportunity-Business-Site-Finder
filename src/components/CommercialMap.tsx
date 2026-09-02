import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  CompetitorEstablishment,
  OpportunityZone,
  VacantCommercialProperty,
  ParkingFacility,
  ConcreteDeploymentSite,
} from '../types';
import {
  MapPin,
  Building,
  Car,
  Layers,
  Sparkles,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  TrendingUp,
  Store,
  DollarSign,
  Zap,
  Info,
  CheckCircle2,
  Target,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';

interface CommercialMapProps {
  city: string;
  country: string;
  centerCoords: { lat: number; lng: number };
  competitors: CompetitorEstablishment[];
  opportunityZones: OpportunityZone[];
  vacantProperties: VacantCommercialProperty[];
  parkingFacilities: ParkingFacility[];
  concreteDeploymentSites?: ConcreteDeploymentSite[];
  selectedZoneId?: string;
  onSelectZone?: (zoneId: string) => void;
  onOpenZoneSwotModal?: (zone: OpportunityZone) => void;
  selectedPropertyId?: string;
  onSelectProperty?: (propertyId: string) => void;
  selectedSiteId?: string;
  onSelectSite?: (siteId: string) => void;
  onDeployToSite?: (site: ConcreteDeploymentSite) => void;
}

export const CommercialMap: React.FC<CommercialMapProps> = ({
  city,
  country,
  centerCoords,
  competitors,
  opportunityZones,
  vacantProperties,
  parkingFacilities,
  concreteDeploymentSites = [],
  selectedZoneId,
  onSelectZone,
  onOpenZoneSwotModal,
  selectedPropertyId,
  onSelectProperty,
  selectedSiteId,
  onSelectSite,
  onDeployToSite,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(13);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'dark'>('roadmap');
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active Layer Toggles
  const [showDeploymentSites, setShowDeploymentSites] = useState<boolean>(true);
  const [showCompetitors, setShowCompetitors] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showProperties, setShowProperties] = useState<boolean>(true);
  const [showParking, setShowParking] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);

  // Selected item modal/popover
  const [activeItem, setActiveItem] = useState<{
    type: 'competitor' | 'zone' | 'property' | 'parking' | 'site';
    data: any;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Center coordinate state (can be re-centered)
  const [currentCenter, setCurrentCenter] = useState(centerCoords);

  useEffect(() => {
    setCurrentCenter(centerCoords);
    setPanOffset({ x: 0, y: 0 });
  }, [centerCoords.lat, centerCoords.lng]);

  // Focus on specific site
  useEffect(() => {
    if (selectedSiteId && concreteDeploymentSites.length > 0) {
      const foundSite = concreteDeploymentSites.find((s) => s.id === selectedSiteId);
      if (foundSite) {
        setActiveItem({ type: 'site', data: foundSite });
      }
    }
  }, [selectedSiteId, concreteDeploymentSites]);

  // Handle Pan Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.interactive-marker-btn') || (e.target as HTMLElement).closest('.map-control-btn')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Web Mercator coordinate calculations
  const lngToPixel = (lng: number, z: number) => {
    return ((lng + 180) / 360) * Math.pow(2, z) * 256;
  };

  const latToPixel = (lat: number, z: number) => {
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    return (0.5 - mercN / (2 * Math.PI)) * Math.pow(2, z) * 256;
  };

  // Convert GPS Coordinates to container screen pixel offsets
  const latLngToPixel = (lat: number, lng: number) => {
    const containerWidth = containerRef.current?.clientWidth || 700;
    const containerHeight = containerRef.current?.clientHeight || 480;

    const centerPxX = lngToPixel(currentCenter.lng, zoom);
    const centerPxY = latToPixel(currentCenter.lat, zoom);

    const markerPxX = lngToPixel(lng, zoom);
    const markerPxY = latToPixel(lat, zoom);

    const x = containerWidth / 2 + (markerPxX - centerPxX) + panOffset.x;
    const y = containerHeight / 2 + (markerPxY - centerPxY) + panOffset.y;

    return { x, y };
  };

  // Compute visible slippy map tiles
  const visibleTiles = useMemo(() => {
    const containerWidth = containerRef.current?.clientWidth || 700;
    const containerHeight = containerRef.current?.clientHeight || 480;

    const centerPxX = lngToPixel(currentCenter.lng, zoom);
    const centerPxY = latToPixel(currentCenter.lat, zoom);

    const viewLeft = centerPxX - containerWidth / 2 - panOffset.x;
    const viewRight = centerPxX + containerWidth / 2 - panOffset.x;
    const viewTop = centerPxY - containerHeight / 2 - panOffset.y;
    const viewBottom = centerPxY + containerHeight / 2 - panOffset.y;

    const minTileX = Math.floor(viewLeft / 256) - 1;
    const maxTileX = Math.floor(viewRight / 256) + 1;
    const minTileY = Math.floor(viewTop / 256) - 1;
    const maxTileY = Math.floor(viewBottom / 256) + 1;

    const maxTiles = Math.pow(2, zoom);
    const tiles: { key: string; url: string; x: number; y: number }[] = [];

    for (let tx = minTileX; tx <= maxTileX; tx++) {
      for (let ty = minTileY; ty <= maxTileY; ty++) {
        if (ty < 0 || ty >= maxTiles) continue;
        const normalizedX = ((tx % maxTiles) + maxTiles) % maxTiles;

        let url = `https://tile.openstreetmap.org/${zoom}/${normalizedX}/${ty}.png`;
        if (mapType === 'satellite') {
          url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${ty}/${normalizedX}`;
        } else if (mapType === 'dark') {
          url = `https://a.basemaps.cartocdn.com/dark_all/${zoom}/${normalizedX}/${ty}.png`;
        }

        const screenX = containerWidth / 2 + tx * 256 - centerPxX + panOffset.x;
        const screenY = containerHeight / 2 + ty * 256 - centerPxY + panOffset.y;

        tiles.push({
          key: `${zoom}-${normalizedX}-${ty}`,
          url,
          x: screenX,
          y: screenY,
        });
      }
    }
    return tiles;
  }, [currentCenter.lat, currentCenter.lng, zoom, panOffset.x, panOffset.y, mapType]);

  // Handle Wheel Zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 1, 17));
    } else {
      setZoom((z) => Math.max(z - 1, 11));
    }
  };

  // Focus on specific zone
  useEffect(() => {
    if (selectedZoneId) {
      const zone = opportunityZones.find((z) => z.id === selectedZoneId);
      if (zone) {
        setActiveItem({ type: 'zone', data: zone });
      }
    }
  }, [selectedZoneId, opportunityZones]);

  // Focus on specific property
  useEffect(() => {
    if (selectedPropertyId) {
      const prop = vacantProperties.find((p) => p.id === selectedPropertyId);
      if (prop) {
        setActiveItem({ type: 'property', data: prop });
      }
    }
  }, [selectedPropertyId, vacantProperties]);

  const tileLayerUrl = useMemo(() => {
    if (mapType === 'satellite') {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;
    }
    if (mapType === 'dark') {
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png`;
    }
    return `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
  }, [mapType]);

  return (
    <div
      id="commercial-map-viewport"
      className={`relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-900 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[520px]'
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Location & Status Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-md text-xs font-semibold text-slate-800">
          <MapPin className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>
            {city}, {country}
          </span>
          <span className="h-3.5 w-px bg-slate-200" />
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            AI Market Engine Active
          </span>
        </div>

        {/* Layer Filters & Map Style Toggles */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-slate-200/80 shadow-md text-xs">
          {/* Concrete Deployment Sites Toggle */}
          {concreteDeploymentSites.length > 0 && (
            <button
              onClick={() => setShowDeploymentSites(!showDeploymentSites)}
              className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-black transition-all ${
                showDeploymentSites
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle concrete placement points and buildings for business deployment"
            >
              <Target className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Deploy Points ({concreteDeploymentSites.length})</span>
            </button>
          )}

          {/* Competitors Toggle */}
          <button
            onClick={() => setShowCompetitors(!showCompetitors)}
            className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
              showCompetitors ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle existing competitor stores"
          >
            <Store className="w-3 h-3 text-rose-600" />
            <span>Competitors ({competitors.length})</span>
          </button>

          {/* Opportunity Zones Toggle */}
          <button
            onClick={() => setShowZones(!showZones)}
            className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
              showZones ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle AI high-demand opportunity hotspots"
          >
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>AI Opportunity Zones ({opportunityZones.length})</span>
          </button>

          {/* Vacant Spaces Toggle */}
          <button
            onClick={() => setShowProperties(!showProperties)}
            className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
              showProperties ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle vacant commercial properties for rent"
          >
            <Building className="w-3 h-3 text-blue-600" />
            <span>Vacant for Rent ({vacantProperties.length})</span>
          </button>

          {/* Parking Toggle */}
          <button
            onClick={() => setShowParking(!showParking)}
            className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
              showParking ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle parking and mobility facilities"
          >
            <Car className="w-3 h-3 text-indigo-600" />
            <span>Parking ({parkingFacilities.length})</span>
          </button>

          {/* Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`map-control-btn flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
              showHeatmap ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle consumer purchasing power heatmap"
          >
            <Layers className="w-3 h-3 text-amber-600" />
            <span>Demand Heatmap</span>
          </button>
        </div>
      </div>

      {/* Floating Map Navigation & Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-200 shadow-md flex flex-col gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(z + 1, 16))}
            className="map-control-btn p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 1, 11))}
            className="map-control-btn p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setPanOffset({ x: 0, y: 0 });
              setZoom(13);
            }}
            className="map-control-btn p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors text-[10px] font-bold"
            title="Reset Map View"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="map-control-btn p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Map Type Switcher */}
        <div className="bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-200 shadow-md flex gap-1 text-[10px] font-bold">
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-2 py-1 rounded transition-colors ${
              mapType === 'roadmap' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2 py-1 rounded transition-colors ${
              mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('dark')}
            className={`px-2 py-1 rounded transition-colors ${
              mapType === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Map Drag Surface & Rendering Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden ${
          mapType === 'satellite'
            ? 'bg-slate-950'
            : mapType === 'dark'
            ? 'bg-slate-900'
            : 'bg-slate-100'
        }`}
      >
        {/* Real Dynamic Map Tile Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {visibleTiles.map((tile) => (
            <img
              key={tile.key}
              src={tile.url}
              alt=""
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute w-[256px] h-[256px] max-w-none transition-opacity duration-200"
              style={{
                left: `${tile.x}px`,
                top: `${tile.y}px`,
              }}
              onError={(e) => {
                // Graceful fallback for tile load errors
                (e.target as HTMLElement).style.opacity = '0';
              }}
            />
          ))}
        </div>

        {/* 1. Demand & Purchasing Power Heatmap Rings (Rendered below markers) */}
        {showHeatmap &&
          opportunityZones.map((zone) => {
            const { x, y } = latLngToPixel(zone.latitude, zone.longitude);
            const radiusPx = (zone.radiusMeters / 10) * (zoom / 13);
            const isSelected = selectedZoneId === zone.id;

            return (
              <div
                key={`heat-${zone.id}`}
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Outer Demand Halo */}
                <div
                  className={`rounded-full transition-all ${
                    zone.opportunityScore >= 85
                      ? 'bg-emerald-500/20 ring-2 ring-emerald-400/40 animate-pulse'
                      : zone.opportunityScore >= 70
                      ? 'bg-amber-500/15 ring-2 ring-amber-400/30'
                      : 'bg-blue-500/10 ring-1 ring-blue-400/20'
                  }`}
                  style={{
                    width: `${Math.max(120, radiusPx * 2)}px`,
                    height: `${Math.max(120, radiusPx * 2)}px`,
                  }}
                />
              </div>
            );
          })}

        {/* 2. AI High-Demand Opportunity Zones */}
        {showZones &&
          opportunityZones.map((zone) => {
            const { x, y } = latLngToPixel(zone.latitude, zone.longitude);
            const isSelected = selectedZoneId === zone.id;

            return (
              <div
                key={`zone-marker-${zone.id}`}
                className="absolute transition-transform duration-100 z-10"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => {
                    setActiveItem({ type: 'zone', data: zone });
                    if (onSelectZone) onSelectZone(zone.id);
                  }}
                  className={`interactive-marker-btn group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 scale-110 ring-4 ring-emerald-400/40 z-20'
                      : 'bg-emerald-500/90 hover:bg-emerald-600 text-white border-white/90 hover:scale-105'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[11px] font-extrabold whitespace-nowrap">{zone.name}</span>
                    <span className="text-[9px] text-emerald-100 font-semibold">
                      Opp. Score: {zone.opportunityScore}% • {zone.successProbabilityPct}% Win Prob
                    </span>
                  </div>
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-emerald-800 text-[10px] font-black rounded-full">
                    #{zone.opportunityScore}
                  </span>
                </button>
              </div>
            );
          })}

        {/* 3. Existing Competitors Markers */}
        {showCompetitors &&
          competitors.map((comp) => {
            const { x, y } = latLngToPixel(comp.latitude, comp.longitude);

            return (
              <div
                key={`comp-marker-${comp.id}`}
                className="absolute transition-transform duration-100 z-10"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => setActiveItem({ type: 'competitor', data: comp })}
                  className="interactive-marker-btn group flex items-center gap-1 px-2 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold shadow-md border border-white hover:scale-110 transition-transform"
                >
                  <Store className="w-3 h-3 text-rose-100" />
                  <span className="max-w-[100px] truncate">{comp.name}</span>
                  <span className="px-1 py-0.2 bg-rose-900/80 rounded text-[9px] font-semibold text-rose-200">
                    ★ {comp.rating.toFixed(1)}
                  </span>
                </button>
              </div>
            );
          })}

        {/* 4. Vacant Properties for Rent Markers */}
        {showProperties &&
          vacantProperties.map((prop) => {
            const { x, y } = latLngToPixel(prop.latitude, prop.longitude);
            const isSelected = selectedPropertyId === prop.id;

            return (
              <div
                key={`prop-marker-${prop.id}`}
                className="absolute transition-transform duration-100 z-10"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => {
                    setActiveItem({ type: 'property', data: prop });
                    if (onSelectProperty) onSelectProperty(prop.id);
                  }}
                  className={`interactive-marker-btn group flex items-center gap-1 px-2.5 py-1 rounded-md shadow-md border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-300 scale-110 ring-4 ring-blue-300/40 z-20'
                      : prop.isHighOpportunityMatch
                      ? 'bg-blue-500 hover:bg-blue-600 text-white border-white'
                      : 'bg-white hover:bg-blue-50 text-blue-900 border-blue-300'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-amber-300" />
                  <div className="flex flex-col text-left leading-tight text-[10px]">
                    <span className="font-extrabold">${prop.monthlyRentUsd.toLocaleString()}/mo</span>
                    <span className="text-[9px] opacity-80">{prop.sizeM2} m²</span>
                  </div>
                </button>
              </div>
            );
          })}

        {/* 0. Concrete Deployment Sites Markers (Prominent Placement Points) */}
        {showDeploymentSites &&
          concreteDeploymentSites.map((site, index) => {
            const { x, y } = latLngToPixel(site.latitude, site.longitude);
            const isSelected = selectedSiteId === site.id || (activeItem?.type === 'site' && activeItem.data.id === site.id);

            return (
              <div
                key={`deploy-site-marker-${site.id}`}
                className="absolute transition-transform duration-150 z-30"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => {
                    setActiveItem({ type: 'site', data: site });
                    if (onSelectSite) onSelectSite(site.id);
                  }}
                  className={`interactive-marker-btn group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-lg border transition-all ${
                    isSelected
                      ? 'bg-slate-950 text-white border-amber-400 scale-115 ring-4 ring-blue-500/40 z-40 shadow-2xl'
                      : 'bg-slate-900/95 hover:bg-slate-950 text-white border-blue-400/80 hover:scale-105'
                  }`}
                >
                  <div className="w-5 h-5 rounded-lg bg-blue-600 text-amber-300 flex items-center justify-center font-black text-[10px] shadow-sm">
                    #{index + 1}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-extrabold text-[11px] text-white tracking-tight truncate max-w-[130px]">
                      {site.buildingName.split(' ')[0]} {site.unitOrSuite.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-bold">
                      ★ {site.deploymentSuitabilityScore}% Viability
                    </span>
                  </div>

                  {/* Pulsing Target Dot */}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-slate-900"></span>
                  </span>
                </button>
              </div>
            );
          })}

        {/* 5. Parking & Mobility Markers */}
        {showParking &&
          parkingFacilities.map((park) => {
            const { x, y } = latLngToPixel(park.latitude, park.longitude);

            return (
              <div
                key={`park-marker-${park.id}`}
                className="absolute transition-transform duration-100 z-10"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => setActiveItem({ type: 'parking', data: park })}
                  className="interactive-marker-btn flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-700 hover:bg-indigo-800 text-white text-[10px] font-bold shadow-md border border-indigo-300 hover:scale-110 transition-transform"
                >
                  <Car className="w-3 h-3 text-indigo-200" />
                  <span>P: {park.capacitySpaces}</span>
                  {park.hasEvCharging && <Zap className="w-2.5 h-2.5 text-amber-300" />}
                </button>
              </div>
            );
          })}
      </div>

      {/* Interactive Inspector Info Drawer (Bottom Left) */}
      {activeItem && (
        <div className="absolute bottom-4 left-4 max-w-md w-full bg-white/98 backdrop-blur-md rounded-xl p-4 border border-slate-200 shadow-xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              {activeItem.type === 'zone' && (
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
              )}
              {activeItem.type === 'site' && (
                <div className="p-1.5 bg-slate-900 text-amber-300 rounded-lg border border-slate-700">
                  <Target className="w-4 h-4 animate-pulse" />
                </div>
              )}
              {activeItem.type === 'competitor' && (
                <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                  <Store className="w-4 h-4" />
                </div>
              )}
              {activeItem.type === 'property' && (
                <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                  <Building className="w-4 h-4" />
                </div>
              )}
              {activeItem.type === 'parking' && (
                <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                  <Car className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {activeItem.type === 'site'
                    ? 'Concrete Deployment Point & Building'
                    : activeItem.type === 'zone'
                    ? 'AI Opportunity Hotspot'
                    : activeItem.type === 'competitor'
                    ? 'Existing Competitor Store'
                    : activeItem.type === 'property'
                    ? 'Vacant Space for Rent'
                    : 'Parking & Mobility Facility'}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {activeItem.data.buildingName || activeItem.data.name || activeItem.data.title}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setActiveItem(null)}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-0.5 hover:bg-slate-100 rounded"
            >
              ✕
            </button>
          </div>

          {/* Details based on type */}
          {activeItem.type === 'site' && (
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2 bg-blue-50/80 rounded-lg border border-blue-100">
                <span className="font-extrabold text-slate-900 block text-xs">
                  {activeItem.data.exactStreetAddress}
                </span>
                <span className="text-[11px] text-blue-700 font-semibold block">
                  {activeItem.data.unitOrSuite} • Intersection: {activeItem.data.crossStreets}
                </span>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-blue-200/50 text-[10px]">
                  <span className="font-mono text-slate-600">
                    GPS: {activeItem.data.latitude.toFixed(5)}, {activeItem.data.longitude.toFixed(5)}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${activeItem.data.latitude.toFixed(6)}, ${activeItem.data.longitude.toFixed(6)}`);
                      setCopiedId(activeItem.data.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1"
                  >
                    {copiedId === activeItem.data.id ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5" />
                        <span>Copy GPS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                <div>
                  <span className="text-slate-400 text-[10px] block">Viability</span>
                  <span className="font-black text-emerald-700 text-xs">
                    {activeItem.data.deploymentSuitabilityScore}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Rent</span>
                  <span className="font-black text-slate-900 text-xs">
                    ${activeItem.data.monthlyRentUsd?.toLocaleString()}/mo
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Footfall</span>
                  <span className="font-black text-blue-700 text-xs">
                    {activeItem.data.dailyPedestrianFootfall?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">Concept: </span>
                <span>{activeItem.data.suggestedBusinessConcept}</span>
              </div>

              {onDeployToSite && (
                <button
                  onClick={() => onDeployToSite(activeItem.data)}
                  className="w-full mt-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Situate &amp; Simulate Launch Here</span>
                  <ArrowRight className="w-3 h-3 text-blue-200" />
                </button>
              )}
            </div>
          )}

          {activeItem.type === 'zone' && (
            <div className="space-y-2 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[10px] block">Opportunity Score</span>
                  <span className="font-black text-emerald-700 text-sm">
                    {activeItem.data.opportunityScore} / 100
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Success Probability</span>
                  <span className="font-black text-blue-700 text-sm">
                    {activeItem.data.successProbabilityPct}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Potential Customer Base</span>
                  <span className="font-bold text-slate-800">
                    {activeItem.data.potentialCustomerBase?.toLocaleString()} citizens
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Market Saturation</span>
                  <span className="font-bold text-amber-700">{activeItem.data.demandSaturation}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 text-[11px] block">Demographic Fit:</span>
                <p className="text-slate-600 text-[11px]">
                  {activeItem.data.demographicSummary?.primaryAgeGroup} • Avg Income: $
                  {activeItem.data.demographicSummary?.averageHouseholdIncomeUsd?.toLocaleString()}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 text-[11px] block">AI Strategic Advice:</span>
                <p className="text-slate-600 text-[11px] line-clamp-2">
                  {activeItem.data.recommendedStrategy}
                </p>
              </div>

              <button
                id={`btn-view-swot-zone-${activeItem.data.id}`}
                onClick={() => {
                  if (onOpenZoneSwotModal) {
                    onOpenZoneSwotModal(activeItem.data);
                  } else if (onSelectZone) {
                    onSelectZone(activeItem.data.id);
                  }
                }}
                className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-black text-xs shadow-md hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>View Full Zone Economics &amp; SWOT →</span>
              </button>
            </div>
          )}

          {activeItem.type === 'competitor' && (
            <div className="space-y-2 text-xs text-slate-700">
              <p className="text-slate-500 text-[11px]">{activeItem.data.address}</p>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                <div>
                  <span className="text-slate-400 text-[10px] block">Rating</span>
                  <span className="font-bold text-slate-900">★ {activeItem.data.rating}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Est. Footfall</span>
                  <span className="font-bold text-slate-900">{activeItem.data.estimatedDailyFootfall}/day</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Footprint</span>
                  <span className="font-bold text-slate-900">{activeItem.data.estimatedFootprintM2} m²</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-rose-800 text-[11px]">Competitor Vulnerabilities to Exploit:</span>
                <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5 mt-0.5">
                  {activeItem.data.vulnerabilities?.map((vuln: string, idx: number) => (
                    <li key={idx}>{vuln}</li>
                  ))}
                </ul>
              </div>

              <a
                href={
                  activeItem.data.googleMapsUrl ||
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeItem.data.name} ${activeItem.data.address || city}`
                  )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Open in Google Maps / Reviews ↗</span>
              </a>
            </div>
          )}

          {activeItem.type === 'property' && (
            <div className="space-y-2 text-xs text-slate-700">
              <p className="text-slate-500 text-[11px]">{activeItem.data.address}</p>
              <div className="grid grid-cols-2 gap-2 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                <div>
                  <span className="text-slate-500 text-[10px] block">Monthly Rent</span>
                  <span className="font-black text-blue-700 text-sm">
                    ${activeItem.data.monthlyRentUsd?.toLocaleString()} / mo
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Size Area</span>
                  <span className="font-bold text-slate-800">
                    {activeItem.data.sizeM2} m² ({activeItem.data.sizeSqFt} sq ft)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {activeItem.data.features?.map((feat: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                <span className="font-bold text-slate-700">{activeItem.data.contactAgent}</span>
                <span className="text-blue-600 font-semibold">{activeItem.data.phone}</span>
              </div>
            </div>
          )}

          {activeItem.type === 'parking' && (
            <div className="space-y-2 text-xs text-slate-700">
              <p className="text-slate-500 text-[11px]">{activeItem.data.address}</p>
              <div className="grid grid-cols-3 gap-2 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100 text-center">
                <div>
                  <span className="text-slate-400 text-[10px] block">Capacity</span>
                  <span className="font-bold text-indigo-900">{activeItem.data.capacitySpaces} spaces</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Hourly Rate</span>
                  <span className="font-bold text-slate-900">${activeItem.data.hourlyRateUsd?.toFixed(2)}/hr</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">EV Charging</span>
                  <span className="font-bold text-emerald-700">
                    {activeItem.data.hasEvCharging ? 'Available' : 'No'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Customer Walk Distance: ~{activeItem.data.distanceToZoneMeters} meters to shopping sector</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
