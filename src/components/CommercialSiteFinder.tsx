import React, { useState, useEffect, useMemo } from 'react';
import {
  CommercialMarketAnalysis,
  OpportunityZone,
  ConcreteDeploymentSite,
  VacantCommercialProperty,
  CompetitorEstablishment,
  ParkingFacility,
  TargetPriceTier,
  StoreFormatType,
} from '../types';
import { COMMERCIAL_BUSINESS_SECTORS } from '../data/commercialBusinessTypes';
import { REAL_WORLD_CITIES_CATALOG, getSupportedRealCityNames } from '../utils/realLocationsDatabase';
import { generateClientMarketFallback } from '../utils/marketFallbackGenerator';
import {
  Building2,
  Sparkles,
  MapPin,
  TrendingUp,
  Search,
  DollarSign,
  Users,
  Car,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Store,
  Layers,
  Award,
  AlertCircle,
  FileSpreadsheet,
  Globe,
  Compass,
} from 'lucide-react';

interface CommercialSiteFinderProps {
  onExportCsv?: () => void;
}

export const CommercialSiteFinder: React.FC<CommercialSiteFinderProps> = ({ onExportCsv }) => {
  const supportedCities = useMemo(() => getSupportedRealCityNames(), []);

  const [selectedCity, setSelectedCity] = useState<string>('London');
  const [selectedCountry, setSelectedCountry] = useState<string>('United Kingdom');
  const [selectedSector, setSelectedSector] = useState<string>('Fashion & Clothing Boutiques');
  const [selectedPriceTier, setSelectedPriceTier] = useState<TargetPriceTier>('Mid-Market & Standard ($$)');
  const [selectedStoreFormat, setSelectedStoreFormat] = useState<StoreFormatType>('Standard Retail (150 - 450 m²)');

  const [analysis, setAnalysis] = useState<CommercialMarketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeZoneId, setActiveZoneId] = useState<string>('');
  const [activeSiteId, setActiveSiteId] = useState<string>('');
  const [groundedSearchQuery, setGroundedSearchQuery] = useState<string>('');
  const [groundedSearchResult, setGroundedSearchResult] = useState<any | null>(null);
  const [isSearchingGrounded, setIsSearchingGrounded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'overview' | 'zones' | 'sites' | 'competitors' | 'vacant' | 'parking'>('overview');

  // Load initial analysis for London
  useEffect(() => {
    runAnalysis('London', 'United Kingdom', 'Fashion & Clothing Boutiques', 'Mid-Market & Standard ($$)', 'Standard Retail (150 - 450 m²)');
  }, []);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const catalogItem = REAL_WORLD_CITIES_CATALOG[cityName.toLowerCase()];
    if (catalogItem) {
      setSelectedCountry(catalogItem.country);
    }
  };

  const runAnalysis = async (
    city = selectedCity,
    country = selectedCountry,
    sector = selectedSector,
    priceTier = selectedPriceTier,
    storeFormat = selectedStoreFormat
  ) => {
    setIsLoading(true);
    try {
      const catalogItem = REAL_WORLD_CITIES_CATALOG[city.toLowerCase()];
      const lat = catalogItem?.lat || 51.5074;
      const lng = catalogItem?.lng || -0.1278;

      const resp = await fetch('/api/market-finder/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          country,
          sector,
          priceTier,
          storeFormat,
          latitude: lat,
          longitude: lng,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        setAnalysis(data);
        if (data.opportunityZones?.length > 0) {
          setActiveZoneId(data.opportunityZones[0].id);
        }
        if (data.concreteDeploymentSites?.length > 0) {
          setActiveSiteId(data.concreteDeploymentSites[0].id);
        }
      } else {
        const fallback = generateClientMarketFallback(city, country, sector, priceTier, storeFormat, lat, lng);
        setAnalysis(fallback);
        if (fallback.opportunityZones?.length > 0) setActiveZoneId(fallback.opportunityZones[0].id);
        if (fallback.concreteDeploymentSites?.length > 0) setActiveSiteId(fallback.concreteDeploymentSites[0].id);
      }
    } catch (e) {
      const catalogItem = REAL_WORLD_CITIES_CATALOG[city.toLowerCase()];
      const lat = catalogItem?.lat || 51.5074;
      const lng = catalogItem?.lng || -0.1278;
      const fallback = generateClientMarketFallback(city, country, sector, priceTier, storeFormat, lat, lng);
      setAnalysis(fallback);
      if (fallback.opportunityZones?.length > 0) setActiveZoneId(fallback.opportunityZones[0].id);
      if (fallback.concreteDeploymentSites?.length > 0) setActiveSiteId(fallback.concreteDeploymentSites[0].id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGroundedSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groundedSearchQuery.trim()) return;
    setIsSearchingGrounded(true);
    try {
      const resp = await fetch('/api/market-finder/google-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: groundedSearchQuery,
          city: selectedCity,
          sector: selectedSector,
        }),
      });
      if (resp.ok) {
        const data = await resp.json();
        setGroundedSearchResult(data);
      }
    } catch (err) {
      console.warn('Grounded search error:', err);
    } finally {
      setIsSearchingGrounded(false);
    }
  };

  const activeZone = useMemo(() => {
    if (!analysis) return null;
    return analysis.opportunityZones.find((z) => z.id === activeZoneId) || analysis.opportunityZones[0];
  }, [analysis, activeZoneId]);

  const activeSite = useMemo(() => {
    if (!analysis) return null;
    return analysis.concreteDeploymentSites.find((s) => s.id === activeSiteId) || analysis.concreteDeploymentSites[0];
  }, [analysis, activeSiteId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Parameter Selection Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Commercial Site Finder &amp; Market Opportunity Intelligence
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your business sector, target city, price tier, and floor format to evaluate spatial market viability.
            </p>
          </div>
          <button
            onClick={() => runAnalysis()}
            disabled={isLoading}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{isLoading ? 'Scanning Market Geometry...' : 'Run Spatial Analysis'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Target Metropolitan City</label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              {supportedCities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Commercial Business Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              {COMMERCIAL_BUSINESS_SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Target Price Tier</label>
            <select
              value={selectedPriceTier}
              onChange={(e) => setSelectedPriceTier(e.target.value as TargetPriceTier)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              <option value="Budget / Value Tier ($)">Budget / Value Tier ($)</option>
              <option value="Mid-Market & Standard ($$)">Mid-Market &amp; Standard ($$)</option>
              <option value="Premium & Upscale ($$$)">Premium &amp; Upscale ($$$)</option>
              <option value="Luxury & Exclusive ($$$$)">Luxury &amp; Exclusive ($$$$)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Store / Space Format</label>
            <select
              value={selectedStoreFormat}
              onChange={(e) => setSelectedStoreFormat(e.target.value as StoreFormatType)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              <option value="Kiosk & Compact (20 - 80 m²)">Kiosk &amp; Compact (20 - 80 m²)</option>
              <option value="Boutique & Specialty (80 - 180 m²)">Boutique &amp; Specialty (80 - 180 m²)</option>
              <option value="Standard Retail (150 - 450 m²)">Standard Retail (150 - 450 m²)</option>
              <option value="Flagship & Large Format (450 - 1,500 m²)">Flagship &amp; Large Format (450 - 1,500 m²)</option>
            </select>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Executive Overview Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                    Executive Market Brief
                  </span>
                  <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold rounded">
                    Score: {analysis.marketOverview.primeZoneOpportunityScore}/100
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {analysis.searchCity}, {analysis.searchCountry} &bull; {analysis.businessSector}
                </h3>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 overflow-x-auto text-xs font-bold">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('zones')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'zones' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Opportunity Zones ({analysis.opportunityZones.length})
                </button>
                <button
                  onClick={() => setViewMode('sites')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'sites' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Deployment Sites ({analysis.concreteDeploymentSites.length})
                </button>
                <button
                  onClick={() => setViewMode('competitors')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'competitors' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Competitors ({analysis.competitors.length})
                </button>
                <button
                  onClick={() => setViewMode('vacant')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'vacant' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Vacant Units ({analysis.vacantProperties.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Prime Recommended Zone</div>
                <div className="text-sm font-extrabold text-emerald-400 truncate mt-1">
                  {analysis.marketOverview.primeRecommendedZoneName}
                </div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Unmet Demand Index</div>
                <div className="text-base font-extrabold text-white mt-1">
                  {analysis.marketOverview.unmetDemandIndex}%
                </div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Addressable Mkt</div>
                <div className="text-base font-extrabold text-white mt-1">
                  ${(((analysis.marketOverview?.totalAddressableMarketAnnualUsd ?? 0) / 1000000)).toFixed(1)}M / yr
                </div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Identified Competitors</div>
                <div className="text-base font-extrabold text-white mt-1">
                  {analysis.marketOverview?.totalExistingCompetitors ?? 0} Units
                </div>
              </div>
            </div>
          </div>

          {/* VIEW: OVERVIEW */}
          {viewMode === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Top Recommended Opportunity Zone */}
              <div className="lg:col-span-7 space-y-4">
                {activeZone && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-600" />
                          <h4 className="text-sm font-extrabold text-slate-900">
                            #1 Prime Opportunity: {activeZone.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          District: {activeZone.district} &bull; Lat: {(activeZone.latitude ?? 0).toFixed(4)}, Lng: {(activeZone.longitude ?? 0).toFixed(4)}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-xs rounded-lg">
                        {activeZone.opportunityScore}/100 Score
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                      <div className="font-bold text-slate-800">Demand &amp; Demographics Profile:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block">Avg Household Inc</span>
                          <span className="font-extrabold text-slate-900">
                            ${activeZone.demographicSummary.averageHouseholdIncomeUsd.toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block">Primary Target</span>
                          <span className="font-extrabold text-slate-900">
                            {activeZone.demographicSummary.primaryAgeGroup}
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block">Spending Index</span>
                          <span className="font-extrabold text-emerald-700">
                            {activeZone.demographicSummary.consumerSpendingIndex}
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-slate-500 block">Success Est.</span>
                          <span className="font-extrabold text-blue-700">
                            {activeZone.successProbabilityPct}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unmet Demand Drivers */}
                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-slate-900">Unmet Demand Drivers:</h5>
                      <ul className="space-y-1.5">
                        {activeZone.unmetDemandDrivers.map((driver, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SWOT Matrix */}
                    <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                      <h5 className="font-bold text-slate-900">SWOT Viability Matrix:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                          <span className="font-bold text-emerald-900 block mb-1">Strengths</span>
                          <ul className="space-y-1 text-emerald-800">
                            {activeZone.swotAnalysis.strengths.map((s, idx) => (
                              <li key={idx}>&bull; {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg">
                          <span className="font-bold text-amber-900 block mb-1">Weaknesses &amp; Mitigation</span>
                          <ul className="space-y-1 text-amber-800">
                            {activeZone.swotAnalysis.weaknesses.map((w, idx) => (
                              <li key={idx}>&bull; {w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Grounded Search & Strategic Roadmap */}
              <div className="lg:col-span-5 space-y-4">
                {/* Google Search Grounded Intelligence */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Real-Time Web Intelligence &amp; Google Search Grounding
                    </h4>
                  </div>
                  <form onSubmit={handleGroundedSearch} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Search market dynamics in ${selectedCity}...`}
                      value={groundedSearchQuery}
                      onChange={(e) => setGroundedSearchQuery(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                    <button
                      type="submit"
                      disabled={isSearchingGrounded}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1 disabled:opacity-50"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{isSearchingGrounded ? 'Searching...' : 'Search'}</span>
                    </button>
                  </form>

                  {groundedSearchResult && (
                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2 text-xs animate-in fade-in duration-150">
                      <p className="text-slate-800 whitespace-pre-line leading-relaxed">
                        {groundedSearchResult.summary}
                      </p>
                      {groundedSearchResult.sources?.length > 0 && (
                        <div className="pt-2 border-t border-blue-200/60 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Live Web Citations:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {groundedSearchResult.sources.map((s: any, idx: number) => (
                              <a
                                key={idx}
                                href={s.uri}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-blue-200 text-blue-800 text-[10px] font-semibold rounded hover:bg-blue-50 transition-colors"
                              >
                                <span>{s.title}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* AI Strategic Action Plan */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-slate-900">Commercial Rollout Action Plan</h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {analysis.strategicActionPlan.map((step, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <div className="font-bold text-slate-900">Stage {idx + 1}</div>
                        <p className="text-slate-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: OPPORTUNITY ZONES */}
          {viewMode === 'zones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.opportunityZones.map((zone, idx) => (
                <div
                  key={zone.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Rank #{idx + 1}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded">
                        Score: {zone.opportunityScore}/100
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{zone.name}</h4>
                    <p className="text-xs text-slate-500">District: {zone.district}</p>

                    <div className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Expected Annual Rev:</span>
                        <span className="font-bold text-slate-900">
                          ${(((zone.predictedAnnualSalesVolumeUsd?.expected ?? 0) / 1000000)).toFixed(2)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Success Probability:</span>
                        <span className="font-bold text-emerald-600">{zone.successProbabilityPct}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Customer Base:</span>
                        <span className="font-bold text-slate-800">{zone.potentialCustomerBase.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${zone.name} ${analysis.searchCity}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Zone in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: CONCRETE DEPLOYMENT SITES */}
          {viewMode === 'sites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.concreteDeploymentSites.map((site, idx) => (
                <div key={site.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Site #{idx + 1}</span>
                      <h4 className="text-sm font-bold text-slate-900">{site.buildingName}</h4>
                      <p className="text-xs text-slate-600">{site.exactStreetAddress}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-lg">
                      {site.deploymentSuitabilityScore}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-500 block">Monthly Rent</span>
                      <span className="font-bold text-slate-900">${site.monthlyRentUsd.toLocaleString()}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-500 block">Floor Area</span>
                      <span className="font-bold text-slate-900">{site.floorAreaM2} m²</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-500 block">Breakeven</span>
                      <span className="font-bold text-blue-700">{site.estimatedBreakevenMonths} mo</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-800">Deployment Key Points:</span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {site.keyAdvantages.map((adv, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Contact Broker: {site.contactBroker.agentName}</span>
                    <a
                      href={site.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Maps View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: COMPETITORS */}
          {viewMode === 'competitors' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">
                  Direct &amp; Indirect Competitor Analysis ({analysis.competitors.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysis.competitors.map((comp) => (
                  <div key={comp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-bold text-slate-900">{comp.name}</h5>
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded">
                        ★ {comp.rating} ({comp.userRatingsTotal})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{comp.address}</p>

                    <div className="space-y-1 pt-1 border-t border-slate-200/60 text-[11px]">
                      <div>
                        <span className="font-bold text-emerald-800">Strengths:</span>{' '}
                        <span className="text-slate-600">{comp.strengths.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-bold text-rose-800">Vulnerabilities:</span>{' '}
                        <span className="text-slate-600">{comp.vulnerabilities.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: VACANT PROPERTIES */}
          {viewMode === 'vacant' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.vacantProperties.map((prop) => (
                <div key={prop.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{prop.title}</h4>
                      <p className="text-[11px] text-slate-500">{prop.address}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-bold text-[10px] rounded">
                      {prop.propertyType}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly Rent:</span>
                      <span className="font-bold text-slate-900">${prop.monthlyRentUsd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Floor Size:</span>
                      <span className="font-bold text-slate-900">{prop.sizeM2} m² ({prop.sizeSqFt} sq ft)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fitout CapEx:</span>
                      <span className="font-bold text-slate-900">${prop.estimatedFitoutCostUsd.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {prop.features.map((feat, fIdx) => (
                      <span key={fIdx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <a
                    href={prop.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Property Location</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
