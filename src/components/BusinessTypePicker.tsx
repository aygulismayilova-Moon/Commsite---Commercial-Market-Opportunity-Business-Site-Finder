import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CommercialBusinessType,
  COMMERCIAL_BUSINESS_TYPES,
  UNIQUE_BUSINESS_PLACES,
  UNIQUE_CUSTOMER_TYPES,
  mapAreaToStoreFormat,
} from '../data/commercialBusinessTypes';
import { StoreFormatType } from '../types';
import {
  Search,
  Building2,
  Sparkles,
  Layers,
  MapPin,
  Maximize2,
  Check,
  ChevronDown,
  X,
  Flame,
  Globe,
  SlidersHorizontal,
  Users,
} from 'lucide-react';

interface BusinessTypePickerProps {
  selectedBusinessType: CommercialBusinessType | null;
  onSelectBusinessType: (business: CommercialBusinessType, suggestedFormat: StoreFormatType) => void;
  customSectorValue?: string;
  onCustomSectorChange?: (value: string) => void;
  disabled?: boolean;
}

export const BusinessTypePicker: React.FC<BusinessTypePickerProps> = ({
  selectedBusinessType,
  onSelectBusinessType,
  customSectorValue = '',
  onCustomSectorChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlaceFilter, setSelectedPlaceFilter] = useState<string>('All');
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>('All');
  const [selectedPopularityFilter, setSelectedPopularityFilter] = useState<string>('All');
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<string>('All');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filtered business types based on query, place, model, popularity, and customer type
  const filteredBusinessTypes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COMMERCIAL_BUSINESS_TYPES.filter((item) => {
      // Search text match
      const matchesSearch =
        !q ||
        item.business_type_name.toLowerCase().includes(q) ||
        item.business_id.toLowerCase().includes(q) ||
        item.place.toLowerCase().includes(q) ||
        item.approximately_area.toLowerCase().includes(q) ||
        (item.customer_type && item.customer_type.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Place filter
      if (selectedPlaceFilter !== 'All' && item.place !== selectedPlaceFilter) {
        return false;
      }

      // Operational Model filter
      if (selectedModelFilter !== 'All' && item.online_or_onsite !== selectedModelFilter) {
        return false;
      }

      // Popularity filter
      if (selectedPopularityFilter !== 'All' && item.popularity !== selectedPopularityFilter) {
        return false;
      }

      // Customer Demographic filter
      if (selectedCustomerFilter !== 'All' && item.customer_type !== selectedCustomerFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedPlaceFilter, selectedModelFilter, selectedPopularityFilter, selectedCustomerFilter]);

  const handleSelect = (item: CommercialBusinessType) => {
    const suggestedFormat = mapAreaToStoreFormat(item.approximately_area, item.place) as StoreFormatType;
    onSelectBusinessType(item, suggestedFormat);
    setIsCustomMode(false);
    setIsOpen(false);
  };

  const getModelBadgeClass = (model: string) => {
    switch (model) {
      case 'Online':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Hybrid':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Onsite':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getPopularityBadgeClass = (pop: string) => {
    switch (pop) {
      case 'Very High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getCustomerBadgeClass = (cust?: string) => {
    switch (cust) {
      case 'companies':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'woman':
        return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200';
      case 'children':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'families':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'youth':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'students':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'seniors':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'man':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>1. Target Business Type ({COMMERCIAL_BUSINESS_TYPES.length} Types Available)</span>
        </label>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setIsCustomMode(!isCustomMode);
            if (!isCustomMode) {
              setIsOpen(false);
            }
          }}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          {isCustomMode ? `← Choose from ${COMMERCIAL_BUSINESS_TYPES.length} Standard Types` : '+ Custom Niche'}
        </button>
      </div>

      {isCustomMode ? (
        <div className="space-y-1">
          <input
            type="text"
            placeholder="e.g. Specialty Matcha Bar, Drone Maintenance Lab..."
            value={customSectorValue}
            onChange={(e) => onCustomSectorChange?.(e.target.value)}
            disabled={disabled}
            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
          <p className="text-[10px] text-slate-500">
            Type custom venture name to scan tailored demographic &amp; competitor models.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Main Trigger Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left bg-slate-50 hover:bg-white border border-slate-300 hover:border-blue-400 rounded-lg p-2.5 transition-all shadow-sm flex items-center justify-between gap-2 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {selectedBusinessType ? (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-black font-mono bg-slate-200 text-slate-800 rounded">
                  {selectedBusinessType.business_id}
                </span>
                <span className="font-bold text-xs text-slate-900 truncate">
                  {selectedBusinessType.business_type_name}
                </span>
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${getModelBadgeClass(
                      selectedBusinessType.online_or_onsite
                    )}`}
                  >
                    {selectedBusinessType.online_or_onsite}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded border bg-slate-100 text-slate-700 border-slate-200">
                    {selectedBusinessType.place}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-100 text-slate-600">
                    {selectedBusinessType.approximately_area}
                  </span>
                  {selectedBusinessType.customer_type && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded border flex items-center gap-0.5 capitalize ${getCustomerBadgeClass(
                        selectedBusinessType.customer_type
                      )}`}
                    >
                      <Users className="w-2.5 h-2.5 opacity-70" />
                      {selectedBusinessType.customer_type}
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded border flex items-center gap-0.5 ${getPopularityBadgeClass(
                      selectedBusinessType.popularity
                    )}`}
                  >
                    {selectedBusinessType.popularity === 'Very High' && <Flame className="w-2.5 h-2.5 text-rose-500" />}
                    {selectedBusinessType.popularity}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-normal">
                Select Business Type from catalog ({COMMERCIAL_BUSINESS_TYPES.length} categories)...
              </span>
            )}
            <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Active Detail Summary Pill on Mobile */}
          {selectedBusinessType && (
            <div className="sm:hidden flex flex-wrap items-center gap-1 mt-1">
              <span
                className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${getModelBadgeClass(
                  selectedBusinessType.online_or_onsite
                )}`}
              >
                {selectedBusinessType.online_or_onsite}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded border bg-slate-100 text-slate-700 border-slate-200">
                {selectedBusinessType.place}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-100 text-slate-600">
                {selectedBusinessType.approximately_area}
              </span>
              {selectedBusinessType.customer_type && (
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded border flex items-center gap-0.5 capitalize ${getCustomerBadgeClass(
                    selectedBusinessType.customer_type
                  )}`}
                >
                  <Users className="w-2.5 h-2.5 opacity-70" />
                  {selectedBusinessType.customer_type}
                </span>
              )}
            </div>
          )}

          {/* Dropdown / Popover Modal Menu */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 max-w-2xl w-screen sm:w-[640px] max-h-[500px] flex flex-col">
              {/* Search Bar & Stats */}
              <div className="space-y-2 shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={`Search ${COMMERCIAL_BUSINESS_TYPES.length} business types (e.g. AI Lab, 3D Print, Bakery, Retail, BUS-0010, companies)...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Toolbar: Operational Model, Place, Customer & Popularity */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1 mr-1">
                    <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-500">Filters:</span>
                  </div>

                  {/* Model Selector */}
                  <select
                    value={selectedModelFilter}
                    onChange={(e) => setSelectedModelFilter(e.target.value)}
                    className="bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="All">All Operations (Onsite/Hybrid/Online)</option>
                    <option value="Onsite">Onsite Physical Store</option>
                    <option value="Hybrid">Hybrid (Onsite + Digital)</option>
                    <option value="Online">Online / Cloud Only</option>
                  </select>

                  {/* Place / Location Type Selector */}
                  <select
                    value={selectedPlaceFilter}
                    onChange={(e) => setSelectedPlaceFilter(e.target.value)}
                    className="bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[10px] font-bold text-slate-700 outline-none cursor-pointer max-w-[140px] truncate"
                  >
                    <option value="All">All Space Types ({UNIQUE_BUSINESS_PLACES.length})</option>
                    {UNIQUE_BUSINESS_PLACES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>

                  {/* Customer Target Demographic Selector */}
                  <select
                    value={selectedCustomerFilter}
                    onChange={(e) => setSelectedCustomerFilter(e.target.value)}
                    className="bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="All">All Customers ({UNIQUE_CUSTOMER_TYPES.length})</option>
                    {UNIQUE_CUSTOMER_TYPES.map((c) => (
                      <option key={c} value={c} className="capitalize">
                        Target: {c}
                      </option>
                    ))}
                  </select>

                  {/* Popularity Selector */}
                  <select
                    value={selectedPopularityFilter}
                    onChange={(e) => setSelectedPopularityFilter(e.target.value)}
                    className="bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="All">All Popularity Tiers</option>
                    <option value="Very High">🔥 Very High Demand</option>
                    <option value="High">⭐ High Demand</option>
                    <option value="Medium">Medium Demand</option>
                    <option value="Low">Niche / Specialized</option>
                  </select>

                  {(selectedModelFilter !== 'All' || selectedPlaceFilter !== 'All' || selectedCustomerFilter !== 'All' || selectedPopularityFilter !== 'All' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedModelFilter('All');
                        setSelectedPlaceFilter('All');
                        setSelectedCustomerFilter('All');
                        setSelectedPopularityFilter('All');
                        setSearchQuery('');
                      }}
                      className="text-[10px] text-rose-600 hover:text-rose-800 font-bold ml-auto cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Counter / Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1 border-b border-slate-100 pb-1 shrink-0">
                <span>
                  Showing <strong className="text-slate-800">{filteredBusinessTypes.length}</strong> of {COMMERCIAL_BUSINESS_TYPES.length} business types
                </span>
                <span className="text-[10px] text-slate-400">Click any type to auto-configure footprint</span>
              </div>

              {/* Scrollable List of Business Types */}
              <div className="overflow-y-auto flex-1 space-y-1 pr-1 custom-scrollbar">
                {filteredBusinessTypes.length === 0 ? (
                  <div className="py-8 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-700">No matching business types found</p>
                    <p className="text-[11px] text-slate-500">
                      Try searching with different keywords or switch to Custom Niche mode.
                    </p>
                  </div>
                ) : (
                  filteredBusinessTypes.map((item) => {
                    const isSelected = selectedBusinessType?.business_id === item.business_id;
                    return (
                      <button
                        key={`${item.business_id}_${item.business_type_name}`}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-300 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold font-mono bg-slate-100 text-slate-700 rounded border border-slate-200">
                            {item.business_id}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {item.business_type_name}
                            </p>
                            <div className="flex flex-wrap items-center gap-1 mt-0.5 text-[9px]">
                              <span className="text-slate-500 flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                {item.place}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-600 font-mono font-medium">
                                {item.approximately_area}
                              </span>
                              {item.customer_type && (
                                <>
                                  <span className="text-slate-400">•</span>
                                  <span
                                    className={`px-1 py-0.2 rounded text-[8px] font-bold capitalize ${getCustomerBadgeClass(
                                      item.customer_type
                                    )}`}
                                  >
                                    {item.customer_type}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${getModelBadgeClass(
                              item.online_or_onsite
                            )}`}
                          >
                            {item.online_or_onsite}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded border flex items-center gap-0.5 ${getPopularityBadgeClass(
                              item.popularity
                            )}`}
                          >
                            {item.popularity === 'Very High' && <Flame className="w-2.5 h-2.5 text-rose-500" />}
                            {item.popularity}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 ml-1" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

