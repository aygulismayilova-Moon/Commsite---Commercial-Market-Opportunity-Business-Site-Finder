import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlaceItem } from '../types';
import {
  Camera,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  Globe,
  Maximize2,
  ExternalLink,
  Crosshair,
} from 'lucide-react';
import { generateMapCanvasDataUrl } from '../utils/mapImageCanvas';

interface MapViewerProps {
  place: PlaceItem | null;
  hasGoogleMapsKey: boolean;
  onCaptureSnapshot: (dataUrl: string, zoom: number, mapType: string) => void;
  isCapturing?: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  place,
  hasGoogleMapsKey,
  onCaptureSnapshot,
  isCapturing = false,
}) => {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('satellite');
  const [zoom, setZoom] = useState<number>(16);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);

  const googleMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);

  // Generate fallback preview canvas whenever place or parameters change
  const refreshCanvasPreview = useCallback(async () => {
    if (!place) return;
    setIsLoadingPreview(true);
    try {
      const dataUrl = await generateMapCanvasDataUrl({
        placeName: place.place_name,
        area: place.area,
        city: place.city,
        category: place.category,
        latitude: place.latitude,
        longitude: place.longitude,
        zoom,
        mapType,
        width: 480,
        height: 720,
      });
      setPreviewDataUrl(dataUrl);
    } catch (err) {
      console.error('Error generating canvas map preview:', err);
    } finally {
      setIsLoadingPreview(false);
    }
  }, [place, zoom, mapType]);

  useEffect(() => {
    refreshCanvasPreview();
  }, [refreshCanvasPreview]);

  // If Google Maps SDK is loaded in window, mount interactive map
  useEffect(() => {
    if (!place || !googleMapRef.current) return;

    if (window.google && window.google.maps) {
      try {
        const center = { lat: place.latitude, lng: place.longitude };
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(googleMapRef.current, {
            center,
            zoom,
            mapTypeId: mapType,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });

          markerInstanceRef.current = new window.google.maps.Marker({
            position: center,
            map: mapInstanceRef.current,
            title: place.place_name,
            animation: window.google.maps.Animation.DROP,
          });
        } else {
          mapInstanceRef.current.setCenter(center);
          mapInstanceRef.current.setZoom(zoom);
          mapInstanceRef.current.setMapTypeId(mapType);
          if (markerInstanceRef.current) {
            markerInstanceRef.current.setPosition(center);
            markerInstanceRef.current.setTitle(place.place_name);
          }
        }
      } catch (e) {
        console.warn('Google Maps initialization fallback:', e);
      }
    }
  }, [place, zoom, mapType, hasGoogleMapsKey]);

  const handleManualCapture = async () => {
    if (!place) return;
    setIsLoadingPreview(true);
    try {
      const dataUrl = await generateMapCanvasDataUrl({
        placeName: place.place_name,
        area: place.area,
        city: place.city,
        category: place.category,
        latitude: place.latitude,
        longitude: place.longitude,
        zoom,
        mapType,
        width: 480,
        height: 720,
      });
      onCaptureSnapshot(dataUrl, zoom, mapType);
    } catch (err) {
      console.error('Snapshot capture error:', err);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  if (!place) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 space-y-2">
        <Globe className="w-8 h-8 mx-auto text-slate-300" />
        <h4 className="font-bold text-slate-700">No Target Location Selected</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Choose a commercial property or monitoring target from the database to inspect satellite views and capture portrait 480x720 snapshots.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden space-y-3 p-4">
      {/* Top Map Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 truncate" title={place.place_name}>
              {place.place_name}
            </h3>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">
              {place.category || 'General'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {place.area}, {place.city} &bull; <span className="font-mono text-blue-700">{place.latitude.toFixed(4)}&deg; N, {place.longitude.toFixed(4)}&deg; E</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Map Layer Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 rounded transition-colors ${
                mapType === 'satellite' ? 'bg-white text-blue-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-2 py-1 rounded transition-colors ${
                mapType === 'hybrid' ? 'bg-white text-blue-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hybrid
            </button>
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2 py-1 rounded transition-colors ${
                mapType === 'roadmap' ? 'bg-white text-blue-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Street
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setZoom((z) => Math.min(z + 1, 20))}
              className="p-1 text-slate-700 hover:text-blue-700 hover:bg-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono font-bold text-slate-600">{zoom}x</span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 1, 8))}
              className="p-1 text-slate-700 hover:text-blue-700 hover:bg-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* External Google Maps Link */}
          <a
            href={`https://www.google.com/maps/@${place.latitude},${place.longitude},${zoom}z`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            title="Open Full Google Maps in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Capture Snapshot Button */}
          <button
            onClick={handleManualCapture}
            disabled={isCapturing || isLoadingPreview}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Capture portrait 480x720 snapshot to database"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isCapturing ? 'Capturing...' : 'Capture Snapshot'}</span>
          </button>
        </div>
      </div>

      {/* Map Display & Vertical 480x720 Preview Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Interactive / Main View (Column 8) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-200 aspect-[16/10] sm:aspect-[16/9] min-h-[300px] flex items-center justify-center">
          {window.google && window.google.maps ? (
            <div ref={googleMapRef} className="w-full h-full" />
          ) : (
            <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
              {previewDataUrl && (
                <img
                  src={previewDataUrl}
                  alt={place.place_name}
                  className="w-full h-full object-cover opacity-90"
                />
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded backdrop-blur-xs border border-slate-700 flex items-center gap-1">
                    <Crosshair className="w-3 h-3 text-emerald-400" />
                    <span>SURVEILLANCE RADAR ACTIVE</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    ZOOM: {zoom} &bull; {mapType.toUpperCase()}
                  </span>
                </div>
                <div className="text-white text-xs">
                  <p className="font-bold">{place.place_name}</p>
                  <p className="text-[11px] text-slate-300 font-mono">
                    {place.latitude.toFixed(6)}, {place.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portrait 480x720 Snapshot Target Specimen Preview (Column 4) */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center space-y-2">
          <div className="w-full flex items-center justify-between text-xs pb-1 border-b border-slate-200">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Snapshot Format (480x720)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 font-bold">PORTRAIT</span>
          </div>

          <div className="w-[160px] h-[240px] bg-slate-900 rounded-lg overflow-hidden border border-slate-300 shadow-sm relative group flex items-center justify-center">
            {previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Portrait Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-[11px] text-slate-400 text-center p-2">Rendering Specimen...</div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
              <button
                onClick={handleManualCapture}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow transition-all flex items-center gap-1"
              >
                <Camera className="w-3 h-3" />
                <span>Save Snapshot</span>
              </button>
            </div>
          </div>

          <div className="w-full text-center space-y-0.5">
            <p className="text-[11px] font-bold text-slate-700">Snapshot Specimen Preview</p>
            <p className="text-[10px] text-slate-500">Auto-calibrated for visual AI temporal change comparison</p>
          </div>
        </div>
      </div>
    </div>
  );
};
