import React, { useState } from 'react';
import {
  OpportunityZone,
  VacantCommercialProperty,
  ParkingFacility,
  CommercialMarketAnalysis,
} from '../types';
import {
  TrendingUp,
  ShieldAlert,
  Target,
  Zap,
  Building,
  Car,
  CheckCircle2,
  DollarSign,
  Users,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ZoneEconomicsSwotModalProps {
  zone: OpportunityZone | null;
  isOpen: boolean;
  onClose: () => void;
  analysis: CommercialMarketAnalysis;
  onInquireProperty?: (property: VacantCommercialProperty) => void;
  onNavigateToTab?: (tab: 'sites' | 'realestate' | 'parking' | 'competitors') => void;
}

export const ZoneEconomicsSwotModal: React.FC<ZoneEconomicsSwotModalProps> = ({
  zone,
  isOpen,
  onClose,
  analysis,
  onInquireProperty,
  onNavigateToTab,
}) => {
  const [copiedSwot, setCopiedSwot] = useState<boolean>(false);
  const [activeSubSection, setActiveSubSection] = useState<'swot' | 'economics' | 'properties'>('swot');

  if (!isOpen || !zone) return null;

  // Filter matched vacant properties for this zone
  const matchedProperties = analysis.vacantProperties.filter(
    (p) =>
      zone.matchedVacantPropertyIds?.includes(p.id) ||
      p.neighborhood.toLowerCase().includes(zone.district.toLowerCase()) ||
      p.address.toLowerCase().includes(zone.name.toLowerCase())
  );

  // Filter nearby parking
  const matchedParking = analysis.parkingFacilities.filter(
    (pk) =>
      zone.nearbyParkingIds?.includes(pk.id) ||
      pk.neighborhood.toLowerCase().includes(zone.district.toLowerCase())
  );

  const copySummaryToClipboard = () => {
    const text = `
=== GEOGUARD COMMERCIAL MARKET ANALYSIS ===
Zone: ${zone.name} (${zone.district})
City: ${analysis.searchCity}, ${analysis.searchCountry}
Opportunity Score: ${zone.opportunityScore}/100 | Win Probability: ${zone.successProbabilityPct}%
Demand Saturation: ${zone.demandSaturation}
Potential Customers: ${zone.potentialCustomerBase.toLocaleString()} | Avg Household Income: $${zone.demographicSummary.averageHouseholdIncomeUsd.toLocaleString()}
Projected Annual Sales: $${(zone.predictedAnnualSalesVolumeUsd.expected / 1000000).toFixed(2)}M (Range: $${(zone.predictedAnnualSalesVolumeUsd.low / 1000000).toFixed(2)}M - $${(zone.predictedAnnualSalesVolumeUsd.high / 1000000).toFixed(2)}M)

[SWOT MATRIX]
STRENGTHS:
${zone.swotAnalysis?.strengths?.map((s) => `• ${s}`).join('\n') || 'None'}

WEAKNESSES:
${zone.swotAnalysis?.weaknesses?.map((w) => `• ${w}`).join('\n') || 'None'}

OPPORTUNITIES:
${zone.swotAnalysis?.opportunities?.map((o) => `• ${o}`).join('\n') || 'None'}

THREATS:
${zone.swotAnalysis?.threats?.map((t) => `• ${t}`).join('\n') || 'None'}

RECOMMENDED STRATEGY:
${zone.recommendedStrategy}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedSwot(true);
    setTimeout(() => setCopiedSwot(false), 2500);
  };

  return (
    <div
      id="zone-swot-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="zone-swot-modal-card"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 sm:p-6 shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🎯 Opportunity Zone Deep-Dive
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-slate-200 border border-white/10">
                  {zone.district}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {zone.demandSaturation}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {zone.name}
              </h2>
              <p className="text-xs text-slate-300">
                Targeting <span className="text-white font-semibold">{analysis.businessSector}</span> • Location: {analysis.searchCity}, {analysis.searchCountry}
              </p>
            </div>

            <button
              id="close-zone-swot-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Header Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-slate-300 block font-medium">Opportunity Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-emerald-400">{zone.opportunityScore}</span>
                <span className="text-[10px] text-slate-400">/ 100</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 block font-medium">Win Probability</span>
              <div className="text-xl font-black text-blue-300">{zone.successProbabilityPct}%</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 block font-medium">Est. Annual Revenue</span>
              <div className="text-xl font-black text-amber-300">
                ${(zone.predictedAnnualSalesVolumeUsd.expected / 1000000).toFixed(2)}M
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 block font-medium">Customer Reach</span>
              <div className="text-xl font-black text-purple-300">
                {zone.potentialCustomerBase.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-5 pt-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveSubSection('swot')}
            className={`px-4 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeSubSection === 'swot'
                ? 'bg-white text-emerald-700 border-t-2 border-t-emerald-600 border-x border-slate-200 font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>4-Quadrant SWOT Matrix</span>
          </button>
          <button
            onClick={() => setActiveSubSection('economics')}
            className={`px-4 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeSubSection === 'economics'
                ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            <span>Micro-Economics &amp; Demographics</span>
          </button>
          <button
            onClick={() => setActiveSubSection('properties')}
            className={`px-4 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeSubSection === 'properties'
                ? 'bg-white text-indigo-700 border-t-2 border-t-indigo-600 border-x border-slate-200 font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-indigo-600" />
            <span>Vacant Properties &amp; Parking ({matchedProperties.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: 4-QUADRANT SWOT MATRIX */}
          {activeSubSection === 'swot' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Strategic SWOT Analysis for {zone.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive strengths, weaknesses, opportunities, and competitive threat factors.
                  </p>
                </div>
                <button
                  onClick={copySummaryToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm transition-all"
                >
                  {copiedSwot ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Full SWOT</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4-Quadrant Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. STRENGTHS */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      S
                    </span>
                    <span>Strengths (Internal Advantages)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {zone.swotAnalysis?.strengths?.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    )) || <li className="text-xs text-slate-500">No specific strengths recorded.</li>}
                  </ul>
                </div>

                {/* 2. WEAKNESSES */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs">
                      W
                    </span>
                    <span>Weaknesses (Internal Challenges)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {zone.swotAnalysis?.weaknesses?.map((weak, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-rose-950 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{weak}</span>
                      </li>
                    )) || <li className="text-xs text-slate-500">No specific weaknesses recorded.</li>}
                  </ul>
                </div>

                {/* 3. OPPORTUNITIES */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                      O
                    </span>
                    <span>Opportunities (Market Upside)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {zone.swotAnalysis?.opportunities?.map((opp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-blue-950 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{opp}</span>
                      </li>
                    )) || <li className="text-xs text-slate-500">No specific opportunities recorded.</li>}
                  </ul>
                </div>

                {/* 4. THREATS */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-xs">
                      T
                    </span>
                    <span>Threats (External Risks &amp; Competitors)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {zone.swotAnalysis?.threats?.map((thr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{thr}</span>
                      </li>
                    )) || <li className="text-xs text-slate-500">No specific threats recorded.</li>}
                  </ul>
                </div>
              </div>

              {/* Recommended Strategic Playbook */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>AI Recommended Operational &amp; Expansion Strategy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {zone.recommendedStrategy}
                </p>
              </div>

              {/* Unmet Demand Drivers */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Why Unmet Demand Exists in this Zone</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                  {zone.unmetDemandDrivers.map((driver, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {driver}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED MICRO-ECONOMICS & DEMOGRAPHICS */}
          {activeSubSection === 'economics' && (
            <div className="space-y-5">
              <h3 className="font-extrabold text-slate-900 text-base">
                Micro-Economic &amp; Demographic Profile
              </h3>

              {/* Projected Revenue Breakdown */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Projected Annual Sales Volume Modeling
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Confidence: High ({zone.successProbabilityPct}%)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-semibold text-slate-400 block">Conservative (Low)</span>
                    <span className="text-base font-black text-slate-700">
                      ${(zone.predictedAnnualSalesVolumeUsd.low / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-emerald-500 shadow-md">
                    <span className="text-[10px] font-black text-emerald-600 block">Expected Baseline</span>
                    <span className="text-lg font-black text-emerald-700">
                      ${(zone.predictedAnnualSalesVolumeUsd.expected / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-semibold text-slate-400 block">Aggressive (High)</span>
                    <span className="text-base font-black text-slate-700">
                      ${(zone.predictedAnnualSalesVolumeUsd.high / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>
              </div>

              {/* Demographics Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
                  <span className="text-xs font-bold text-slate-900 block border-b border-slate-100 pb-2">
                    Target Customer Demographics
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Primary Age Group:</span>
                      <span className="font-bold text-slate-800">{zone.demographicSummary.primaryAgeGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Avg Household Income:</span>
                      <span className="font-bold text-emerald-700">
                        ${zone.demographicSummary.averageHouseholdIncomeUsd.toLocaleString()} / yr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Consumer Spending Index:</span>
                      <span className="font-bold text-blue-700">
                        {zone.demographicSummary.consumerSpendingIndex} (National Benchmark 100)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Customer Reach:</span>
                      <span className="font-bold text-slate-800">
                        {zone.potentialCustomerBase.toLocaleString()} citizens
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
                  <span className="text-xs font-bold text-slate-900 block border-b border-slate-100 pb-2">
                    Footfall &amp; Pedestrian Dynamics
                  </span>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Footfall Profile:</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">
                        {zone.demographicSummary.footfallProfile}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Demographic Fit Score:</span>
                      <span className="font-black text-emerald-600">
                        {zone.targetDemographicFitScore} / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VACANT PROPERTIES & PARKING */}
          {activeSubSection === 'properties' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Available Real Estate in {zone.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Direct commercial storefronts ready for lease and site deployment.
                </p>
              </div>

              {matchedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-2 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded">
                          {prop.propertyType}
                        </span>
                        <span className="font-black text-blue-700 text-sm">
                          ${prop.monthlyRentUsd.toLocaleString()}/mo
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs">{prop.title}</h4>
                      <p className="text-[11px] text-slate-500">{prop.address}</p>
                      <div className="text-[11px] text-slate-600 flex justify-between bg-slate-50 p-2 rounded">
                        <span>Area: {prop.sizeM2} m² ({prop.sizeSqFt} sq ft)</span>
                        <span>${prop.rentPerM2Usd}/m²</span>
                      </div>

                      {onInquireProperty && (
                        <button
                          onClick={() => {
                            onClose();
                            onInquireProperty(prop);
                          }}
                          className="w-full mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Inquire with Broker ({prop.contactAgent})
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No direct matching vacant listings in this exact zone, but multiple adjacent retail sites are available in {analysis.searchCity}.
                </div>
              )}

              {/* Nearby Parking */}
              {matchedParking.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Customer Parking &amp; Transit Hubs ({matchedParking.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedParking.map((pk) => (
                      <div
                        key={pk.id}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{pk.name}</span>
                          <span className="text-indigo-600 font-extrabold">{pk.capacitySpaces} spaces</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex justify-between">
                          <span>{pk.type}</span>
                          <span>${pk.hourlyRateUsd}/hr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {onNavigateToTab && (
              <>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToTab('sites');
                  }}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5 text-amber-300" />
                  <span>Situate / Deploy in this Market</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToTab('realestate');
                  }}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all"
                >
                  View All {analysis.vacantProperties.length} Properties
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
