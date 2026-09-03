import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CommercialBusinessType,
  mapAreaToStoreFormat,
} from '../data/commercialBusinessTypes';
import { StoreFormatType } from '../types';
import {
  getAllBusinessTypes,
  addCustomBusinessType,
  updateBusinessType,
  deleteBusinessType,
  resetBusinessType,
  resetAllBusinessTypesToDefault,
  getNextBusinessId,
  BUSINESS_TYPES_UPDATED_EVENT,
  getCustomBusinessTypes,
  getEditedBusinessTypes,
} from '../utils/businessTypesStorage';
import { AddEditBusinessTypeModal } from './AddEditBusinessTypeModal';
import {
  Search,
  Building2,
  Sparkles,
  Layers,
  MapPin,
  Check,
  ChevronDown,
  X,
  Flame,
  SlidersHorizontal,
  Users,
  Plus,
  Edit2,
  RotateCcw,
  Tag,
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

  // Business Types loaded from persistent storage (standard + custom + user edits)
  const [businessTypesList, setBusinessTypesList] = useState<CommercialBusinessType[]>(() =>
    getAllBusinessTypes()
  );

  // Add / Edit Modal state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<CommercialBusinessType | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever storage changes or event fires
  const refreshBusinessTypes = () => {
    const list = getAllBusinessTypes();
    setBusinessTypesList(list);

    // If currently selected item was edited, update it in parent
    if (selectedBusinessType) {
      const updatedMatch = list.find((b) => b.business_id === selectedBusinessType.business_id);
      if (updatedMatch && JSON.stringify(updatedMatch) !== JSON.stringify(selectedBusinessType)) {
        const suggestedFormat = mapAreaToStoreFormat(
          updatedMatch.approximately_area,
          updatedMatch.place
        ) as StoreFormatType;
        onSelectBusinessType(updatedMatch, suggestedFormat);
      }
    }
  };

  useEffect(() => {
    const handleStorageUpdate = () => {
      refreshBusinessTypes();
    };

    window.addEventListener(BUSINESS_TYPES_UPDATED_EVENT, handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener(BUSINESS_TYPES_UPDATED_EVENT, handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [selectedBusinessType, onSelectBusinessType]);

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

  // Derived filter options based on active list
  const availablePlaces = useMemo(() => {
    return Array.from(new Set(businessTypesList.map((b) => b.place))).sort();
  }, [businessTypesList]);

  const availableCustomerTypes = useMemo(() => {
    return Array.from(
      new Set(businessTypesList.map((b) => b.customer_type).filter(Boolean) as string[])
    ).sort();
  }, [businessTypesList]);

  // Filtered business types based on query, place, model, popularity, and customer type
  const filteredBusinessTypes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return businessTypesList.filter((item) => {
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
  }, [
    businessTypesList,
    searchQuery,
    selectedPlaceFilter,
    selectedModelFilter,
    selectedPopularityFilter,
    selectedCustomerFilter,
  ]);

  const handleSelect = (item: CommercialBusinessType) => {
    const suggestedFormat = mapAreaToStoreFormat(
      item.approximately_area,
      item.place
    ) as StoreFormatType;
    onSelectBusinessType(item, suggestedFormat);
    setIsCustomMode(false);
    setIsOpen(false);
  };

  const handleSaveAddEdit = (saved: CommercialBusinessType) => {
    let finalItem: CommercialBusinessType;
    if (editingItem) {
      finalItem = updateBusinessType(saved);
    } else {
      finalItem = addCustomBusinessType(saved);
    }

    refreshBusinessTypes();

    // Auto-select the newly added or edited business type
    const suggestedFormat = mapAreaToStoreFormat(
      finalItem.approximately_area,
      finalItem.place
    ) as StoreFormatType;
    onSelectBusinessType(finalItem, suggestedFormat);
    setIsCustomMode(false);
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (businessId: string) => {
    deleteBusinessType(businessId);
    refreshBusinessTypes();
    if (selectedBusinessType?.business_id === businessId) {
      // Clear selection if current item was deleted
      const remaining = getAllBusinessTypes();
      if (remaining.length > 0) {
        const first = remaining[0];
        onSelectBusinessType(
          first,
          mapAreaToStoreFormat(first.approximately_area, first.place) as StoreFormatType
        );
      }
    }
  };

  const handleResetItem = (businessId: string) => {
    resetBusinessType(businessId);
    refreshBusinessTypes();
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

  const hasCustomOrEdited = useMemo(() => {
    return (
      getCustomBusinessTypes().length > 0 ||
      Object.keys(getEditedBusinessTypes()).length > 0
    );
  }, [businessTypesList]);

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
      {/* 1. Header Toolbar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>1. Target Business Type ({businessTypesList.length} Types)</span>
        </label>

        <div className="flex items-center gap-2">
          {/* Add New Business Type Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setEditingItem(null);
              setIsAddEditModalOpen(true);
            }}
            className="px-2 py-0.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-all flex items-center gap-1 cursor-pointer"
            title="Register a brand new target business type into the catalog"
          >
            <Plus className="w-3 h-3 text-indigo-600" />
            <span>+ Add Type</span>
          </button>

          {/* Quick Custom Niche Text Mode */}
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
            {isCustomMode ? `← Catalog (${businessTypesList.length})` : '+ Quick Text'}
          </button>
        </div>
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
          {/* Main Trigger & Change/Edit Row */}
          <div className="flex items-center gap-1.5">
            {/* Main Trigger Button */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => setIsOpen(!isOpen)}
              className="flex-1 min-w-0 text-left bg-slate-50 hover:bg-white border border-slate-300 hover:border-blue-400 rounded-lg p-2.5 transition-all shadow-sm flex items-center justify-between gap-2 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {selectedBusinessType ? (
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-black font-mono bg-slate-200 text-slate-800 rounded">
                    {selectedBusinessType.business_id}
                  </span>
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {selectedBusinessType.business_type_name}
                  </span>

                  {selectedBusinessType.isCustom && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded shrink-0">
                      Custom
                    </span>
                  )}
                  {selectedBusinessType.isModified && !selectedBusinessType.isCustom && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 rounded shrink-0">
                      Modified
                    </span>
                  )}

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
                      {selectedBusinessType.popularity === 'Very High' && (
                        <Flame className="w-2.5 h-2.5 text-rose-500" />
                      )}
                      {selectedBusinessType.popularity}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-slate-400 font-normal">
                  Select Business Type from catalog ({businessTypesList.length} categories)...
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Direct Edit / Change Active Type Button */}
            {selectedBusinessType && (
              <button
                type="button"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingItem(selectedBusinessType);
                  setIsAddEditModalOpen(true);
                }}
                className="px-3 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-300 rounded-lg text-slate-700 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                title="Change / Edit parameters for this Target Business Type"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold hidden sm:inline">Change / Edit</span>
              </button>
            )}
          </div>

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
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 max-w-2xl w-screen sm:w-[680px] max-h-[520px] flex flex-col">
              {/* Search Bar & Quick Add Action */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={`Search ${businessTypesList.length} business types (e.g. AI Lab, Bakery, Retail, BUS-0010)...`}
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

                  {/* Add New Type inside search bar */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setIsAddEditModalOpen(true);
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Type</span>
                  </button>
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
                    <option value="All">All Space Types ({availablePlaces.length})</option>
                    {availablePlaces.map((p) => (
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
                    <option value="All">All Customers ({availableCustomerTypes.length})</option>
                    {availableCustomerTypes.map((c) => (
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

                  {(selectedModelFilter !== 'All' ||
                    selectedPlaceFilter !== 'All' ||
                    selectedCustomerFilter !== 'All' ||
                    selectedPopularityFilter !== 'All' ||
                    searchQuery) && (
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
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Counter / Actions Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1 border-b border-slate-100 pb-1.5 shrink-0">
                <span>
                  Showing <strong className="text-slate-800">{filteredBusinessTypes.length}</strong> of{' '}
                  {businessTypesList.length} business types
                </span>

                <div className="flex items-center gap-2">
                  {hasCustomOrEdited && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Reset all business types back to default original catalog? (Custom business types and edits will be cleared)'
                          )
                        ) {
                          resetAllBusinessTypesToDefault();
                          refreshBusinessTypes();
                        }
                      }}
                      className="text-[10px] text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset All Catalog Edits</span>
                    </button>
                  )}
                  <span className="text-[10px] text-slate-400">Click to select • Pencil to edit</span>
                </div>
              </div>

              {/* Scrollable List of Business Types */}
              <div className="overflow-y-auto flex-1 space-y-1 pr-1 custom-scrollbar">
                {filteredBusinessTypes.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-700">No matching business types found</p>
                    <p className="text-[11px] text-slate-500">
                      You can add &quot;{searchQuery}&quot; as a new business type right now!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem({
                          business_id: getNextBusinessId(),
                          business_type_name: searchQuery,
                          online_or_onsite: 'Onsite',
                          place: 'First Floor',
                          approximately_area: '120 m2',
                          popularity: 'High',
                          customer_type: 'all',
                          isCustom: true,
                        });
                        setIsAddEditModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create &quot;{searchQuery}&quot;</span>
                    </button>
                  </div>
                ) : (
                  filteredBusinessTypes.map((item) => {
                    const isSelected = selectedBusinessType?.business_id === item.business_id;
                    return (
                      <div
                        key={`${item.business_id}_${item.business_type_name}`}
                        onClick={() => handleSelect(item)}
                        className={`group w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                            : 'bg-white hover:bg-slate-50/90 border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {/* Left section: ID + Name + Attributes */}
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold font-mono bg-slate-100 text-slate-700 rounded border border-slate-200">
                            {item.business_id}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {item.business_type_name}
                              </p>
                              {item.isCustom && (
                                <span className="px-1.5 py-0.2 text-[8px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 rounded shrink-0">
                                  Custom
                                </span>
                              )}
                              {item.isModified && !item.isCustom && (
                                <span className="px-1.5 py-0.2 text-[8px] font-black bg-amber-100 text-amber-800 border border-amber-300 rounded shrink-0">
                                  Modified
                                </span>
                              )}
                            </div>

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

                        {/* Right section: Badges + Edit button + Checkmark */}
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
                            {item.popularity === 'Very High' && (
                              <Flame className="w-2.5 h-2.5 text-rose-500" />
                            )}
                            {item.popularity}
                          </span>

                          {/* Edit / Change Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItem(item);
                              setIsAddEditModalOpen(true);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title={`Change / Edit parameters for "${item.business_type_name}"`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {isSelected && <Check className="w-4 h-4 text-blue-600 ml-0.5" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Business Type Modal */}
      <AddEditBusinessTypeModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveAddEdit}
        onDelete={handleDeleteItem}
        onReset={handleResetItem}
        initialData={editingItem}
        suggestedNextId={getNextBusinessId()}
      />
    </div>
  );
};
