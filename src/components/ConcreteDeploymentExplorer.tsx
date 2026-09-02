import React, { useState } from 'react';
import {
  ConcreteDeploymentSite,
  CommercialMarketAnalysis,
} from '../types';
import {
  Building,
  MapPin,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  Compass,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  Copy,
  Check,
  Maximize2,
  Sliders,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  Store,
  FileText,
  Calendar,
  Percent,
} from 'lucide-react';

interface ConcreteDeploymentExplorerProps {
  analysis: CommercialMarketAnalysis;
  onFocusSiteOnMap?: (site: ConcreteDeploymentSite) => void;
  selectedSiteId?: string;
  onSelectSite?: (siteId: string) => void;
}

export const ConcreteDeploymentExplorer: React.FC<ConcreteDeploymentExplorerProps> = ({
  analysis,
  onFocusSiteOnMap,
  selectedSiteId,
  onSelectSite,
}) => {
  if (!analysis) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No active commercial market analysis loaded.
      </div>
    );
  }

  const sites = analysis.concreteDeploymentSites || [];
  const [activeSiteForSimulation, setActiveSiteForSimulation] = useState<ConcreteDeploymentSite | null>(
    sites.length > 0 ? sites[0] : null
  );
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'rent' | 'footfall' | 'breakeven'>('score');

  // Deployment Simulation State
  const [customBrandName, setCustomBrandName] = useState<string>(
    `Aura ${(analysis.businessSector || 'Retail').split(' ')[0]} Hub`
  );
  const [simAvgOrderValue, setSimAvgOrderValue] = useState<number>(
    analysis.targetPriceTier === 'Ultra-Luxury / Exclusive'
      ? 180
      : analysis.targetPriceTier === 'Premium / Upscale'
      ? 95
      : analysis.targetPriceTier === 'Mid-Market / Accessible'
      ? 45
      : 22
  );
  const [simDailyConversionRate, setSimDailyConversionRate] = useState<number>(3.2); // % of footfall
  const [isDossierExported, setIsDossierExported] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<'blueprint' | 'financials' | 'roadmap' | 'permits'>('blueprint');

  // Copy GPS Coordinates
  const handleCopyCoords = (site: ConcreteDeploymentSite) => {
    const text = `${site.latitude.toFixed(6)}, ${site.longitude.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Sorted Sites
  const filteredSites = sites
    .filter((s) => {
      if (filterType === 'all') return true;
      return s.spaceType.toLowerCase().includes(filterType.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.deploymentSuitabilityScore - a.deploymentSuitabilityScore;
      if (sortBy === 'rent') return a.monthlyRentUsd - b.monthlyRentUsd;
      if (sortBy === 'footfall') return b.dailyPedestrianFootfall - a.dailyPedestrianFootfall;
      if (sortBy === 'breakeven') return a.estimatedBreakevenMonths - b.estimatedBreakevenMonths;
      return 0;
    });

  // Calculate dynamic simulation financials
  const calculateSimFinancials = (site: ConcreteDeploymentSite) => {
    const dailyPayingCustomers = Math.round(site.dailyPedestrianFootfall * (simDailyConversionRate / 100));
    const dailyRevenue = dailyPayingCustomers * simAvgOrderValue;
    const monthlyRevenue = dailyRevenue * 30;
    const annualRevenue = monthlyRevenue * 12;
    const monthlyOperatingCosts = site.monthlyRentUsd + monthlyRevenue * 0.45 + 5500; // Rent + COGS + Staff/Utilities
    const monthlyNetProfit = Math.max(0, monthlyRevenue - monthlyOperatingCosts);
    const dynamicBreakevenMonths = monthlyNetProfit > 0
      ? Number((site.estimatedFitoutCapExUsd / monthlyNetProfit).toFixed(1))
      : 24;

    return {
      dailyPayingCustomers,
      dailyRevenue,
      monthlyRevenue,
      annualRevenue,
      monthlyOperatingCosts,
      monthlyNetProfit,
      dynamicBreakevenMonths,
    };
  };

  return (
    <div id="concrete-deployment-explorer" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Concrete Site Placement Engine
              </span>
              <span className="text-slate-400 text-xs font-semibold">
                {analysis.searchCity}, {analysis.searchCountry}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Pinpoint Places &amp; Buildings to Situate Your Business
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Explore concrete buildings, street addresses, and exact GPS coordinates pre-screened for &quot;
              {analysis.businessSector}&quot;. Click any site to simulate a turnkey launch, examine floor layouts, and verify zoning readiness.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (sites.length > 0) {
                  setActiveSiteForSimulation(sites[0]);
                  setIsDeployModalOpen(true);
                }
              }}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Simulate Launch on #1 Ranked Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            Filter Format:
          </span>
          {['all', 'Corner', 'Street', 'Pavilion', 'Concourse'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFilterType(fmt.toLowerCase())}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterType === fmt.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {fmt === 'all' ? 'All Spaces' : fmt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="score">Highest Deployment Score</option>
            <option value="rent">Lowest Monthly Rent</option>
            <option value="footfall">Highest Daily Footfall</option>
            <option value="breakeven">Fastest Breakeven Horizon</option>
          </select>
        </div>
      </div>

      {/* Concrete Sites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredSites.map((site, index) => {
          const isSelected = selectedSiteId === site.id;

          return (
            <div
              key={site.id}
              id={`site-card-${site.id}`}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-400/30 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Site Top Banner */}
              <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50/70 via-white to-slate-50/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold flex items-center gap-1">
                        <Building className="w-3 h-3 text-blue-600" />
                        Rank #{index + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {site.spaceType}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                        {site.turnkeyTimelineWeeks} Wk Turnkey
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-lg leading-tight mt-1">
                      {site.buildingName}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700">
                      {site.unitOrSuite}
                    </p>
                  </div>

                  {/* Suitability Score Badge */}
                  <div className="text-right shrink-0 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Viability
                    </span>
                    <div className="text-xl font-black text-emerald-700 leading-none">
                      {site.deploymentSuitabilityScore}
                      <span className="text-xs font-bold text-slate-400">/100</span>
                    </div>
                  </div>
                </div>

                {/* Exact Street Address & Cross Streets */}
                <div className="mt-3.5 p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-slate-800 space-y-1">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-slate-900 block">
                        {site.exactStreetAddress}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Intersection: {site.crossStreets} • {site.neighborhood}
                      </span>
                    </div>
                  </div>

                  {/* GPS Pinpoint Point Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-blue-200/50 mt-1">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600">
                      <span className="font-bold text-blue-900">GPS Point:</span>
                      <span>{site.latitude.toFixed(6)}, {site.longitude.toFixed(6)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyCoords(site)}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold transition-colors flex items-center gap-1"
                        title="Copy latitude and longitude"
                      >
                        {copiedId === site.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copy Point</span>
                          </>
                        )}
                      </button>

                      {onFocusSiteOnMap && (
                        <button
                          onClick={() => {
                            if (onSelectSite) onSelectSite(site.id);
                            onFocusSiteOnMap(site);
                          }}
                          className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-colors flex items-center gap-1"
                        >
                          <Compass className="w-3 h-3" />
                          <span>Pinpoint on Map</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Body Stats & Specifications */}
              <div className="p-5 space-y-4 text-xs">
                {/* 4-Stat Metric Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Monthly Rent</span>
                    <span className="font-black text-slate-900 text-sm">
                      ${site.monthlyRentUsd.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-500 block">
                      ${(site.monthlyRentUsd / site.floorAreaM2).toFixed(1)}/m²
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Daily Footfall</span>
                    <span className="font-black text-blue-700 text-sm">
                      {site.dailyPedestrianFootfall.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-500 block">passersby/day</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Fitout CapEx</span>
                    <span className="font-black text-slate-900 text-sm">
                      ${site.estimatedFitoutCapExUsd.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-bold block">Est. Setup</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Breakeven</span>
                    <span className="font-black text-emerald-700 text-sm">
                      {site.estimatedBreakevenMonths} mos
                    </span>
                    <span className="text-[9px] text-slate-500 block">Payback ROI</span>
                  </div>
                </div>

                {/* Suggested Concept & Space Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900">Suggested Store Concept:</span>
                    <span className="text-slate-600 truncate">{site.suggestedBusinessConcept}</span>
                  </div>

                  {/* Physical Specs Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Floor Area</span>
                      <span className="font-extrabold">{site.floorAreaM2} m² ({site.floorAreaSqFt} sq ft)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Glass Frontage</span>
                      <span className="font-extrabold">{site.frontageWidthMeters} m Width</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Ceiling Height</span>
                      <span className="font-extrabold">{site.ceilingHeightMeters} m Clearance</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Power Supply</span>
                      <span className="font-extrabold">{site.availablePowerKw} kW 3-Phase</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Signage Permit</span>
                      <span className="font-extrabold text-emerald-700">Pre-Approved</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold">Zoning Status</span>
                      <span className="font-extrabold text-slate-800 truncate">{site.zoningClassification}</span>
                    </div>
                  </div>
                </div>

                {/* Key Site Advantages */}
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block mb-1.5">
                    Location &amp; Footfall Highlights:
                  </span>
                  <div className="space-y-1">
                    {site.keyAdvantages.slice(0, 2).map((adv, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Broker Info */}
                <div className="flex items-center justify-between p-2.5 bg-slate-100/60 rounded-xl text-[11px] text-slate-700">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[9px] font-bold block uppercase">Commercial Broker</span>
                    <span className="font-extrabold text-slate-900">{site.contactBroker.agentName}</span>
                    <span className="text-slate-500 block text-[10px]">{site.contactBroker.agencyName}</span>
                  </div>
                  <div className="text-right text-[11px] space-y-0.5">
                    <span className="text-blue-700 font-bold block">{site.contactBroker.phone}</span>
                    <span className="text-slate-500 text-[10px] block">{site.contactBroker.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (onSelectSite) onSelectSite(site.id);
                    if (onFocusSiteOnMap) onFocusSiteOnMap(site);
                  }}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Highlight on Map</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSiteForSimulation(site);
                    setIsDeployModalOpen(true);
                    setIsDossierExported(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Deploy / Situate Business Here</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE DEPLOYMENT SIMULATION MODAL */}
      {isDeployModalOpen && activeSiteForSimulation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
                    Business Site Deployment Simulator
                  </span>
                  <span className="text-slate-400 text-xs">
                    Score: {activeSiteForSimulation.deploymentSuitabilityScore}/100 Viability
                  </span>
                </div>
                <h3 className="text-xl font-black mt-1 text-white">
                  Situate Business at: {activeSiteForSimulation.buildingName}
                </h3>
                <p className="text-xs text-blue-200 font-medium">
                  {activeSiteForSimulation.exactStreetAddress} • {activeSiteForSimulation.unitOrSuite}
                </p>
              </div>

              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 text-xs font-bold gap-2">
              <button
                onClick={() => setActiveStepTab('blueprint')}
                className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
                  activeStepTab === 'blueprint'
                    ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Storefront Placement Blueprint</span>
              </button>

              <button
                onClick={() => setActiveStepTab('financials')}
                className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
                  activeStepTab === 'financials'
                    ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Revenue &amp; Payback Model</span>
              </button>

              <button
                onClick={() => setActiveStepTab('roadmap')}
                className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
                  activeStepTab === 'roadmap'
                    ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>3. Turnkey Launch Roadmap</span>
              </button>

              <button
                onClick={() => setActiveStepTab('permits')}
                className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
                  activeStepTab === 'permits'
                    ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>4. Permits &amp; Lease Readiness</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
              {/* TAB 1: BLUEPRINT & STOREFRONT SETUP */}
              {activeStepTab === 'blueprint' && (
                <div className="space-y-6">
                  {/* Brand Customization Input */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <label className="font-black text-slate-900 text-xs block">
                      Customize Your Storefront Brand Name for this Location:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customBrandName}
                        onChange={(e) => setCustomBrandName(e.target.value)}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Store Name..."
                      />
                      <button
                        onClick={() =>
                          setCustomBrandName(
                            `${analysis.searchCity} ${analysis.businessSector.split(' ')[0]} Studio`
                          )
                        }
                        className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold text-slate-700"
                      >
                        Auto-Format
                      </button>
                    </div>
                  </div>

                  {/* Architectural Storefront Mockup Preview */}
                  <div className="p-5 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-white space-y-4">
                    <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2">
                      <span className="font-extrabold text-amber-400 flex items-center gap-1.5">
                        <Store className="w-4 h-4" />
                        Architectural Street Frontage Render Preview
                      </span>
                      <span className="text-slate-400">
                        {activeSiteForSimulation.frontageWidthMeters}m Glazed Frontage • {activeSiteForSimulation.ceilingHeightMeters}m Height
                      </span>
                    </div>

                    {/* Visual Facade Mockup */}
                    <div className="h-44 bg-slate-950 rounded-xl border-2 border-slate-700 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                      {/* Top Signage Blade */}
                      <div className="mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-lg border border-blue-400 shadow-lg text-center">
                        <span className="font-black text-sm tracking-wider uppercase text-white drop-shadow">
                          {customBrandName || 'COMMERCIAL BOUTIQUE'}
                        </span>
                        <span className="block text-[9px] text-blue-200 font-semibold tracking-widest uppercase">
                          {analysis.businessSector} • {activeSiteForSimulation.buildingName}
                        </span>
                      </div>

                      {/* Floor Layout Schematic */}
                      <div className="grid grid-cols-4 gap-2 h-20 text-center text-[10px]">
                        <div className="bg-blue-900/40 border border-blue-500/50 rounded-lg p-1.5 flex flex-col justify-center items-center">
                          <span className="font-bold text-blue-300">Entrance &amp; Foyer</span>
                          <span className="text-[9px] text-slate-400">Glass Automatic</span>
                        </div>
                        <div className="bg-emerald-900/40 border border-emerald-500/50 rounded-lg p-1.5 flex flex-col justify-center items-center">
                          <span className="font-bold text-emerald-300">Showcase Gallery</span>
                          <span className="text-[9px] text-slate-400">Primary Merchandising</span>
                        </div>
                        <div className="bg-amber-900/40 border border-amber-500/50 rounded-lg p-1.5 flex flex-col justify-center items-center">
                          <span className="font-bold text-amber-300">POS &amp; Pickup</span>
                          <span className="text-[9px] text-slate-400">Click &amp; Collect</span>
                        </div>
                        <div className="bg-purple-900/40 border border-purple-500/50 rounded-lg p-1.5 flex flex-col justify-center items-center">
                          <span className="font-bold text-purple-300">Storage &amp; Staging</span>
                          <span className="text-[9px] text-slate-400">Rear Dock Access</span>
                        </div>
                      </div>

                      {/* Footer Street Curb */}
                      <div className="text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-1">
                        <span>Street Level: {activeSiteForSimulation.exactStreetAddress}</span>
                        <span className="text-emerald-400 font-bold">● High Pedestrian Corridor</span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Space Specs Table */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">HVAC Climate</span>
                      <span className="font-bold text-slate-900">{activeSiteForSimulation.hvacStatus}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">Loading Access</span>
                      <span className="font-bold text-slate-900">{activeSiteForSimulation.loadingAccess}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">Signage Permit</span>
                      <span className="font-bold text-emerald-700">{activeSiteForSimulation.signagePermitStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REVENUE & FINANCIALS */}
              {activeStepTab === 'financials' && (
                <div className="space-y-6">
                  {/* Interactive Conversion Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Average Transaction Basket:</span>
                        <span className="font-black text-blue-700">${simAvgOrderValue} USD</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="300"
                        step="5"
                        value={simAvgOrderValue}
                        onChange={(e) => setSimAvgOrderValue(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <span className="text-[10px] text-slate-400 block">
                        Estimated average customer spend per visit
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Footfall Conversion Rate:</span>
                        <span className="font-black text-emerald-700">{simDailyConversionRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="8.0"
                        step="0.1"
                        value={simDailyConversionRate}
                        onChange={(e) => setSimDailyConversionRate(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <span className="text-[10px] text-slate-400 block">
                        Percentage of daily passersby ({activeSiteForSimulation.dailyPedestrianFootfall.toLocaleString()}) who make a purchase
                      </span>
                    </div>
                  </div>

                  {/* Calculated ROI Outputs */}
                  {(() => {
                    const fin = calculateSimFinancials(activeSiteForSimulation);
                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-blue-600 font-bold block">Daily Customers</span>
                            <span className="text-lg font-black text-blue-950">
                              {fin.dailyPayingCustomers} / day
                            </span>
                            <span className="text-[9px] text-slate-500 block">
                              ${fin.dailyRevenue.toLocaleString()} daily rev
                            </span>
                          </div>

                          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
                            <span className="text-[10px] text-emerald-600 font-bold block">Monthly Gross</span>
                            <span className="text-lg font-black text-emerald-950">
                              ${Math.round(fin.monthlyRevenue).toLocaleString()}
                            </span>
                            <span className="text-[9px] text-slate-500 block">
                              ${(fin.annualRevenue / 1000000).toFixed(2)}M annual
                            </span>
                          </div>

                          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                            <span className="text-[10px] text-amber-700 font-bold block">Est. Monthly Profit</span>
                            <span className="text-lg font-black text-amber-950">
                              ${Math.round(fin.monthlyNetProfit).toLocaleString()}
                            </span>
                            <span className="text-[9px] text-slate-500 block">After rent &amp; staff</span>
                          </div>

                          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200">
                            <span className="text-[10px] text-purple-700 font-bold block">Breakeven Horizon</span>
                            <span className="text-lg font-black text-purple-950">
                              {fin.dynamicBreakevenMonths} Months
                            </span>
                            <span className="text-[9px] text-emerald-700 font-bold block">Full ROI Payback</span>
                          </div>
                        </div>

                        {/* Financial Narrative */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <h5 className="font-bold text-slate-900 text-xs">Financial Viability Assessment:</h5>
                          <p className="text-slate-600 leading-relaxed">
                            With a base monthly rent of <strong>${activeSiteForSimulation.monthlyRentUsd.toLocaleString()}</strong>, this site generates an estimated rent-to-revenue ratio of{' '}
                            <strong>{((activeSiteForSimulation.monthlyRentUsd / fin.monthlyRevenue) * 100).toFixed(1)}%</strong> (industry benchmark is under 10%). The projected fitout investment of ${activeSiteForSimulation.estimatedFitoutCapExUsd.toLocaleString()} is expected to break even in {fin.dynamicBreakevenMonths} months under standard trading conditions.
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 3: TURNKEY ROADMAP */}
              {activeStepTab === 'roadmap' && (
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-900 text-xs">
                    Turnkey Site Launch Roadmap ({activeSiteForSimulation.turnkeyTimelineWeeks} Weeks to Grand Opening):
                  </h5>
                  <div className="space-y-3">
                    {[
                      {
                        period: 'Week 1: Acquisition & Permits',
                        title: 'Lease Execution & Municipal Registration',
                        desc: `Finalize the standard commercial lease with ${activeSiteForSimulation.contactBroker.agencyName} and submit architectural signage plans.`,
                        status: 'Ready for Signature',
                      },
                      {
                        period: `Week 2: Space Fitout & MEP`,
                        title: 'Interior Fixtures & Electrical Hookup',
                        desc: `Commission ${activeSiteForSimulation.availablePowerKw}kW 3-phase electrical, test ${activeSiteForSimulation.hvacStatus}, and install custom display fixtures.`,
                        status: 'Contractors Scheduled',
                      },
                      {
                        period: 'Week 3: Tech & Inventory Staging',
                        title: 'POS Systems, Fiber Drop & Stock Delivery',
                        desc: 'Terminate high-speed fiber internet, configure point-of-sale terminals, and stage initial opening stock via the dedicated loading bay.',
                        status: 'Pre-Wired Ready',
                      },
                      {
                        period: `Week ${activeSiteForSimulation.turnkeyTimelineWeeks}: Grand Launch`,
                        title: 'Soft Opening & Geofenced Mobile Campaign',
                        desc: `Launch targeted geo-fenced mobile promotions to the ${activeSiteForSimulation.dailyPedestrianFootfall.toLocaleString()} daily passersby in ${activeSiteForSimulation.neighborhood}.`,
                        status: 'Launch Date Set',
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-900">{step.title}</span>
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                              {step.period}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PERMITS & CHECKLIST */}
              {activeStepTab === 'permits' && (
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-900 text-xs">
                    Site Verification &amp; Municipal Compliance Checklist:
                  </h5>
                  <div className="space-y-2">
                    {activeSiteForSimulation.deploymentChecklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 flex items-center gap-3 text-xs text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-900 block">Assigned Commercial Broker Contact:</span>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-slate-800">{activeSiteForSimulation.contactBroker.agentName}</span>
                        <span className="text-slate-500 block text-[11px]">{activeSiteForSimulation.contactBroker.agencyName}</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${activeSiteForSimulation.contactBroker.phone}`}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg font-bold text-slate-800 flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span>{activeSiteForSimulation.contactBroker.phone}</span>
                        </a>
                        <a
                          href={`mailto:${activeSiteForSimulation.contactBroker.email}`}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-blue-200" />
                          <span>Send Inquiry Email</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleCopyCoords(activeSiteForSimulation);
                }}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Exact Coordinates ({activeSiteForSimulation.latitude.toFixed(4)}, {activeSiteForSimulation.longitude.toFixed(4)})</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsDossierExported(true);
                    setTimeout(() => setIsDossierExported(false), 3000);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
                >
                  {isDossierExported ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Dossier Saved &amp; Ready!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Export Site Deployment Dossier</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (onFocusSiteOnMap) {
                      onFocusSiteOnMap(activeSiteForSimulation);
                    }
                    setIsDeployModalOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-200" />
                  <span>View Point on Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
