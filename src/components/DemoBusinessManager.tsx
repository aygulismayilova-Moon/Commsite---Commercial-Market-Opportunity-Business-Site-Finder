import React, { useState, useMemo } from 'react';
import { DemoBusiness, DemoBusinessStatus } from '../types';
import {
  Briefcase,
  Store,
  MapPin,
  DollarSign,
  TrendingUp,
  Percent,
  Compass,
  Layers,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Copy,
  Sparkles,
  CheckCircle2,
  Eye,
  Building,
  Check,
  Share2,
} from 'lucide-react';

interface DemoBusinessManagerProps {
  demoBusinesses: DemoBusiness[];
  onFocusOnMap: (business: DemoBusiness) => void;
  onEditBusiness: (business: DemoBusiness) => void;
  onDeleteBusiness: (businessId: string) => void;
  onDuplicateBusiness: (business: DemoBusiness) => void;
  onCreateNew: () => void;
  onAddToMonitoredPlaces?: (business: DemoBusiness) => void;
  activeCityFilter?: string;
}

export const DemoBusinessManager: React.FC<DemoBusinessManagerProps> = ({
  demoBusinesses,
  onFocusOnMap,
  onEditBusiness,
  onDeleteBusiness,
  onDuplicateBusiness,
  onCreateNew,
  onAddToMonitoredPlaces,
  activeCityFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>(activeCityFilter || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [monitoredAddedId, setMonitoredAddedId] = useState<string | null>(null);
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(null);

  // Available cities in the list
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    demoBusinesses.forEach((b) => {
      if (b.city) set.add(b.city);
    });
    return Array.from(set).sort();
  }, [demoBusinesses]);

  // Filtered dataset
  const filteredBusinesses = useMemo(() => {
    return demoBusinesses.filter((b) => {
      if (selectedCity !== 'ALL' && b.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedStatus !== 'ALL' && b.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.businessName.toLowerCase().includes(q);
        const matchesSector = (b.sector || '').toLowerCase().includes(q);
        const matchesAddress = (b.address || '').toLowerCase().includes(q);
        const matchesCity = (b.city || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSector && !matchesAddress && !matchesCity) {
          return false;
        }
      }
      return true;
    });
  }, [demoBusinesses, selectedCity, selectedStatus, searchQuery]);

  // Portfolio Totals
  const portfolioStats = useMemo(() => {
    const totalCount = filteredBusinesses.length;
    const totalProjectedSales = filteredBusinesses.reduce(
      (acc, b) => acc + (b.projectedAnnualSalesUsd || 0),
      0
    );
    const totalCapEx = filteredBusinesses.reduce(
      (acc, b) => acc + (b.estimatedCapExUsd || 0),
      0
    );
    const totalMonthlyRent = filteredBusinesses.reduce(
      (acc, b) => acc + (b.estimatedMonthlyRentUsd || 0),
      0
    );
    const avgScore =
      totalCount > 0
        ? Math.round(
            filteredBusinesses.reduce((acc, b) => acc + (b.opportunityScore || 80), 0) /
              totalCount
          )
        : 0;

    return { totalCount, totalProjectedSales, totalCapEx, totalMonthlyRent, avgScore };
  }, [filteredBusinesses]);

  const handleCopyCoords = (b: DemoBusiness) => {
    const str = `${b.latitude.toFixed(6)}, ${b.longitude.toFixed(6)}`;
    navigator.clipboard.writeText(str);
    setCopiedId(b.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportCsv = () => {
    if (filteredBusinesses.length === 0) return;

    const headers = [
      'id',
      'businessName',
      'sector',
      'businessType',
      'city',
      'country',
      'address',
      'latitude',
      'longitude',
      'status',
      'projectedAnnualSalesUsd',
      'estimatedCapExUsd',
      'estimatedMonthlyRentUsd',
      'expectedGrossMarginPct',
      'opportunityScore',
      'createdAt',
    ];

    const rows = filteredBusinesses.map((b) =>
      [
        `"${b.id}"`,
        `"${b.businessName.replace(/"/g, '""')}"`,
        `"${(b.sector || '').replace(/"/g, '""')}"`,
        `"${(b.businessType || '').replace(/"/g, '""')}"`,
        `"${b.city.replace(/"/g, '""')}"`,
        `"${b.country.replace(/"/g, '""')}"`,
        `"${(b.address || '').replace(/"/g, '""')}"`,
        b.latitude,
        b.longitude,
        `"${b.status}"`,
        b.projectedAnnualSalesUsd || 0,
        b.estimatedCapExUsd || 0,
        b.estimatedMonthlyRentUsd || 0,
        b.expectedGrossMarginPct || 0,
        b.opportunityScore || 0,
        `"${b.createdAt}"`,
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `demo_businesses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    if (filteredBusinesses.length === 0) return;
    const jsonStr = JSON.stringify(filteredBusinesses, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `demo_businesses_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: DemoBusinessStatus) => {
    switch (status) {
      case 'Ready to Deploy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Feasibility Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Site Selected':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Concept / Planning':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary KPIs Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Demo Business Portfolio &amp; Simulated Enterprises
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">
                  {demoBusinesses.length} Units Saved
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Manage commercial concept businesses created from market analysis results, zones, and concrete deployment sites.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportCsv}
              disabled={filteredBusinesses.length === 0}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              title="Export to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJson}
              disabled={filteredBusinesses.length === 0}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              title="Export JSON"
            >
              <span>JSON</span>
            </button>

            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Create Demo Business</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Active Demo Units
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-slate-900">{portfolioStats.totalCount}</span>
              <span className="text-[11px] text-slate-400 font-medium">businesses</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
              Est. Annual Sales
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-emerald-700">
                ${(portfolioStats.totalProjectedSales / 1000000).toFixed(2)}M
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">USD / yr</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
            <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
              Total Planned CapEx
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-blue-700">
                ${(portfolioStats.totalCapEx / 1000).toLocaleString()}k
              </span>
              <span className="text-[11px] text-blue-600 font-medium">fitout</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider block">
              Avg. Opportunity Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-indigo-700">{portfolioStats.avgScore}</span>
              <span className="text-[11px] text-indigo-500 font-medium">/ 100 benchmark</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Controls Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search demo businesses..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
            >
              <option value="ALL">All Cities ({demoBusinesses.length})</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
            <span className="font-bold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="Concept / Planning">Concept / Planning</option>
              <option value="Site Selected">Site Selected</option>
              <option value="Feasibility Confirmed">Feasibility Confirmed</option>
              <option value="Ready to Deploy">Ready to Deploy</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 ml-auto md:ml-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* 3. Empty State */}
      {filteredBusinesses.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 border border-indigo-100">
            <Briefcase className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-base font-black text-slate-900">
              No Demo Businesses Found
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {demoBusinesses.length === 0
                ? 'You have not created any Demo Businesses yet. You can create one from any Opportunity Zone, Concrete Deployment Site, or click the button below.'
                : 'No demo businesses match your active filter criteria. Try resetting search or selecting "All Cities".'}
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Create Your First Demo Business</span>
          </button>
        </div>
      )}

      {/* 4. Cards Grid View */}
      {filteredBusinesses.length > 0 && viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((business) => {
            const isSimulating = activeSimulationId === business.id;
            const isMonitored = monitoredAddedId === business.id;
            const isCopied = copiedId === business.id;

            return (
              <div
                key={business.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Card Top */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                          {business.businessName}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {business.sector || business.businessType}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border shrink-0 ${getStatusBadge(
                        business.status
                      )}`}
                    >
                      {business.status}
                    </span>
                  </div>

                  {/* Location and Origin */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{business.address}, {business.city}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                      <span>
                        GPS: {business.latitude.toFixed(4)}, {business.longitude.toFixed(4)}
                      </span>
                      <button
                        onClick={() => handleCopyCoords(business)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold inline-flex items-center gap-1"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {business.sourceZoneName && (
                      <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                        Origin: Zone &quot;{business.sourceZoneName}&quot;
                      </div>
                    )}
                    {business.sourceSiteName && (
                      <div className="text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mt-1">
                        Origin: Site &quot;{business.sourceSiteName}&quot;
                      </div>
                    )}
                  </div>

                  {/* Financial Grid */}
                  <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Sales</span>
                      <span className="font-extrabold text-emerald-700">
                        ${((business.projectedAnnualSalesUsd || 0) / 1000).toLocaleString()}k
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Rent</span>
                      <span className="font-extrabold text-slate-800">
                        ${(business.estimatedMonthlyRentUsd || 0).toLocaleString()}/mo
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">CapEx</span>
                      <span className="font-extrabold text-indigo-700">
                        ${((business.estimatedCapExUsd || 0) / 1000).toLocaleString()}k
                      </span>
                    </div>
                  </div>

                  {/* Notes Preview */}
                  {business.notes && (
                    <p className="text-[11px] text-slate-500 italic line-clamp-2 pt-1 border-t border-slate-100">
                      &quot;{business.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onFocusOnMap(business)}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                      title="Focus on Map"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      <span>Map View</span>
                    </button>

                    {onAddToMonitoredPlaces && (
                      <button
                        onClick={() => {
                          onAddToMonitoredPlaces(business);
                          setMonitoredAddedId(business.id);
                          setTimeout(() => setMonitoredAddedId(null), 3000);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          isMonitored
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Add to Monitored Places (Head Office & Branches)"
                      >
                        {isMonitored ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Monitored</span>
                          </>
                        ) : (
                          <>
                            <Layers className="w-3.5 h-3.5 text-slate-600" />
                            <span>Monitor</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditBusiness(business)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Demo Business"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDuplicateBusiness(business)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Clone / Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteBusiness(business.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete from List"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Table List View */}
      {filteredBusinesses.length > 0 && viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Demo Business Name</th>
                  <th className="px-4 py-3">Sector &amp; Format</th>
                  <th className="px-4 py-3">Location &amp; Coordinates</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Projected Sales</th>
                  <th className="px-4 py-3 text-right">Rent / CapEx</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredBusinesses.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-extrabold text-slate-900">{b.businessName}</div>
                      {b.sourceZoneName && (
                        <div className="text-[10px] text-emerald-700">From: {b.sourceZoneName}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-800">{b.sector || b.businessType}</div>
                      <div className="text-[11px] text-slate-400">{b.storeFormat}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{b.address}, {b.city}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {b.latitude.toFixed(4)}, {b.longitude.toFixed(4)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-emerald-700">
                      ${((b.projectedAnnualSalesUsd || 0) / 1000).toLocaleString()}k
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div>${(b.estimatedMonthlyRentUsd || 0).toLocaleString()}/mo</div>
                      <div className="text-[10px] text-slate-400">CapEx: ${((b.estimatedCapExUsd || 0) / 1000).toLocaleString()}k</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onFocusOnMap(b)}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-[11px] font-bold"
                          title="View on Map"
                        >
                          Map
                        </button>
                        <button
                          onClick={() => onEditBusiness(b)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteBusiness(b.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
