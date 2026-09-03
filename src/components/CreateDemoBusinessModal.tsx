import React, { useState, useEffect } from 'react';
import {
  DemoBusiness,
  DemoBusinessStatus,
  CommercialMarketAnalysis,
} from '../types';
import {
  X,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileText,
  Compass,
  Layers,
  Sparkles,
  Store,
} from 'lucide-react';

interface CreateDemoBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (business: DemoBusiness) => void;
  initialData?: Partial<DemoBusiness> | null;
  currentAnalysis?: CommercialMarketAnalysis | null;
}

export const CreateDemoBusinessModal: React.FC<CreateDemoBusinessModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  currentAnalysis,
}) => {
  const [businessName, setBusinessName] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  const [sector, setSector] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [storeFormat, setStoreFormat] = useState<string>('Standard Retail (150 - 450 m²)');
  const [targetPriceTier, setTargetPriceTier] = useState<string>('Mid-Market & Standard ($$)');
  const [projectedAnnualSalesUsd, setProjectedAnnualSalesUsd] = useState<number>(650000);
  const [estimatedCapExUsd, setEstimatedCapExUsd] = useState<number>(120000);
  const [estimatedMonthlyRentUsd, setEstimatedMonthlyRentUsd] = useState<number>(3800);
  const [expectedGrossMarginPct, setExpectedGrossMarginPct] = useState<number>(34);
  const [status, setStatus] = useState<DemoBusinessStatus>('Site Selected');
  const [notes, setNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize initial data whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    setErrorMsg(null);

    const defaultCity = initialData?.city || currentAnalysis?.searchCity || '';
    const defaultCountry = initialData?.country || currentAnalysis?.searchCountry || '';
    const defaultSector = initialData?.sector || currentAnalysis?.businessSector || 'Retail';
    const defaultType = initialData?.businessType || currentAnalysis?.businessSector || 'Retail Store';

    const smartName =
      initialData?.businessName ||
      (defaultCity
        ? `${defaultCity} ${defaultType.split('-')[0].trim()} Branch`
        : 'New Commercial Venture');

    setBusinessName(smartName);
    setBusinessType(defaultType);
    setSector(defaultSector);
    setCountry(defaultCountry);
    setCity(defaultCity);
    setAddress(
      initialData?.address ||
        (initialData?.neighborhood
          ? `${initialData.neighborhood}, ${defaultCity}`
          : defaultCity ? `Central Commercial Corridor, ${defaultCity}` : '')
    );
    setNeighborhood(
      initialData?.neighborhood ||
        (currentAnalysis?.marketOverview?.primeRecommendedZoneName || '')
    );

    const latVal = initialData?.latitude ?? currentAnalysis?.cityCenterCoordinates?.lat ?? 0;
    const lngVal = initialData?.longitude ?? currentAnalysis?.cityCenterCoordinates?.lng ?? 0;
    setLatitude(latVal ? String(latVal) : '');
    setLongitude(lngVal ? String(lngVal) : '');

    setStoreFormat(initialData?.storeFormat || currentAnalysis?.storeFormat || 'Standard Retail (150 - 450 m²)');
    setTargetPriceTier(initialData?.targetPriceTier || currentAnalysis?.targetPriceTier || 'Mid-Market & Standard ($$)');

    if (initialData?.projectedAnnualSalesUsd) {
      setProjectedAnnualSalesUsd(initialData.projectedAnnualSalesUsd);
    } else if (currentAnalysis?.opportunityZones?.[0]?.predictedAnnualSalesVolumeUsd?.expected) {
      setProjectedAnnualSalesUsd(currentAnalysis.opportunityZones[0].predictedAnnualSalesVolumeUsd.expected);
    } else {
      setProjectedAnnualSalesUsd(650000);
    }

    if (initialData?.estimatedCapExUsd) {
      setEstimatedCapExUsd(initialData.estimatedCapExUsd);
    } else {
      setEstimatedCapExUsd(115000);
    }

    if (initialData?.estimatedMonthlyRentUsd) {
      setEstimatedMonthlyRentUsd(initialData.estimatedMonthlyRentUsd);
    } else if (currentAnalysis?.vacantProperties?.[0]?.monthlyRentUsd) {
      setEstimatedMonthlyRentUsd(currentAnalysis.vacantProperties[0].monthlyRentUsd);
    } else {
      setEstimatedMonthlyRentUsd(3500);
    }

    setExpectedGrossMarginPct(initialData?.expectedGrossMarginPct ?? 35);
    setStatus(initialData?.status || 'Site Selected');
    setNotes(
      initialData?.notes ||
        (initialData?.sourceZoneName
          ? `Generated from Market Opportunity Zone: ${initialData.sourceZoneName}. Strategic focus: prime footfall and unmet consumer demand.`
          : initialData?.sourceSiteName
          ? `Generated from Concrete Deployment Site: ${initialData.sourceSiteName}.`
          : `Created from ${defaultCity} commercial site analysis.`)
    );
  }, [isOpen, initialData, currentAnalysis]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessName.trim()) {
      setErrorMsg('Please enter a valid Demo Business Name.');
      return;
    }
    if (!city.trim() || !country.trim()) {
      setErrorMsg('City and Country are required to locate this business.');
      return;
    }

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setErrorMsg('Please provide valid decimal coordinates for latitude and longitude.');
      return;
    }

    const finalBusiness: DemoBusiness = {
      id: initialData?.id || `demo_biz_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      businessName: businessName.trim(),
      businessType: businessType.trim() || sector.trim() || 'Commercial Business',
      sector: sector.trim() || 'Retail',
      city: city.trim(),
      country: country.trim(),
      address: address.trim() || `${city.trim()} Commercial District`,
      neighborhood: neighborhood.trim() || undefined,
      latitude: Number(latNum.toFixed(6)),
      longitude: Number(lngNum.toFixed(6)),
      storeFormat,
      targetPriceTier,
      projectedAnnualSalesUsd: Number(projectedAnnualSalesUsd) || 500000,
      estimatedCapExUsd: Number(estimatedCapExUsd) || 100000,
      estimatedMonthlyRentUsd: Number(estimatedMonthlyRentUsd) || 3000,
      expectedGrossMarginPct: Number(expectedGrossMarginPct) || 35,
      targetDemographicFitScore: initialData?.targetDemographicFitScore || 88,
      opportunityScore: initialData?.opportunityScore || (currentAnalysis?.marketOverview?.primeZoneOpportunityScore ?? 85),
      status,
      notes: notes.trim(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      sourceZoneId: initialData?.sourceZoneId,
      sourceZoneName: initialData?.sourceZoneName,
      sourceSiteId: initialData?.sourceSiteId,
      sourceSiteName: initialData?.sourceSiteName,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${businessName} ${address} ${city}`
      )}`,
    };

    onSave(finalBusiness);
    onClose();
  };

  // Live simulation helpers
  const monthlyRevenue = projectedAnnualSalesUsd / 12;
  const rentToRevenuePct = monthlyRevenue > 0 ? (estimatedMonthlyRentUsd / monthlyRevenue) * 100 : 0;
  const monthlyGrossProfit = monthlyRevenue * (expectedGrossMarginPct / 100);
  const estimatedMonthlyNetProfit = Math.max(0, monthlyGrossProfit - estimatedMonthlyRentUsd - (monthlyRevenue * 0.15));
  const breakevenMonths = estimatedMonthlyNetProfit > 0 ? Math.ceil(estimatedCapExUsd / estimatedMonthlyNetProfit) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/50 rounded-xl text-amber-300 border border-indigo-400/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  {initialData?.id ? 'Edit Demo Business' : 'Create Demo Business from Results'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Simulation &amp; Tracking
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">
                Add this commercial unit to your active Demo Business List for financial tracking and map monitoring.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Business Identity */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-blue-600" />
              <span>Business Identity &amp; Sector</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Demo Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Ağdam Zəfər Artisan Bakehouse"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Sector / Category
                </label>
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="e.g. Specialty Cafes & Bakeries"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Store Format
                </label>
                <select
                  value={storeFormat}
                  onChange={(e) => setStoreFormat(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                >
                  <option value="Micro / Kiosk (< 50 m²)">Micro / Kiosk (&lt; 50 m²)</option>
                  <option value="Boutique / Compact (50 - 150 m²)">Boutique / Compact (50 - 150 m²)</option>
                  <option value="Standard Retail (150 - 450 m²)">Standard Retail (150 - 450 m²)</option>
                  <option value="Flagship Store (450 - 1,200 m²)">Flagship Store (450 - 1,200 m²)</option>
                  <option value="Anchor / Big-Box (> 1,200 m²)">Anchor / Big-Box (&gt; 1,200 m²)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lifecycle Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DemoBusinessStatus)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-bold"
                >
                  <option value="Concept / Planning">💡 Concept / Planning</option>
                  <option value="Site Selected">📍 Site Selected</option>
                  <option value="Feasibility Confirmed">📊 Feasibility Confirmed</option>
                  <option value="Ready to Deploy">🚀 Ready to Deploy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Geospatial Coordinates & Location */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Geospatial Location &amp; Coordinates</span>
              </h4>
              {initialData?.sourceZoneName && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Zone: {initialData.sourceZoneName}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Azerbaijan"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Ağdam"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street Address or Corridor
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Zəfər Prospekti, 14 / Mərkəzi Kvartal"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Latitude (GPS) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 39.991200"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 font-mono text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Longitude (GPS) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. 46.929800"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 font-mono text-slate-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financial Feasibility & Targets */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Projected Financials &amp; Economics</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Projected Annual Sales ($)
                </label>
                <input
                  type="number"
                  value={projectedAnnualSalesUsd}
                  onChange={(e) => setProjectedAnnualSalesUsd(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fitout CapEx ($)
                </label>
                <input
                  type="number"
                  value={estimatedCapExUsd}
                  onChange={(e) => setEstimatedCapExUsd(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Monthly Rent ($)
                </label>
                <input
                  type="number"
                  value={estimatedMonthlyRentUsd}
                  onChange={(e) => setEstimatedMonthlyRentUsd(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gross Margin (%)
                </label>
                <input
                  type="number"
                  value={expectedGrossMarginPct}
                  onChange={(e) => setExpectedGrossMarginPct(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Financial Quick Card */}
            <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Monthly Sales</span>
                <span className="font-extrabold text-slate-900">
                  ${Math.round(monthlyRevenue).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Rent / Revenue Ratio</span>
                <span className={`font-extrabold ${rentToRevenuePct > 15 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {rentToRevenuePct.toFixed(1)}% {rentToRevenuePct <= 10 ? '✓ Healthy' : ''}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Est. CapEx Breakeven</span>
                <span className="font-extrabold text-indigo-700">
                  {breakevenMonths > 0 ? `~${breakevenMonths} months` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Notes / Strategy Memo */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Strategic Notes &amp; Feasibility Memo
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Target opening Q3. Excellent proximity to public parking and high pedestrian morning footfall corridor."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 leading-relaxed font-normal"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{initialData?.id ? 'Save Changes' : 'Add to Demo Business List'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
