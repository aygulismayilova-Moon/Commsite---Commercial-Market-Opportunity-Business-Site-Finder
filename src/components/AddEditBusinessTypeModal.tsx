import React, { useState, useEffect } from 'react';
import { CommercialBusinessType } from '../types';
import { mapAreaToStoreFormat } from '../data/commercialBusinessTypes';
import {
  X,
  Building2,
  Sparkles,
  Layers,
  MapPin,
  Flame,
  Users,
  Check,
  RotateCcw,
  Trash2,
  HelpCircle,
} from 'lucide-react';

interface AddEditBusinessTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (businessType: CommercialBusinessType) => void;
  onDelete?: (businessId: string) => void;
  onReset?: (businessId: string) => void;
  initialData?: CommercialBusinessType | null;
  suggestedNextId?: string;
}

const COMMON_PLACES = [
  'First Floor',
  'Business Center',
  'Shopping Mall',
  'Standalone Building',
  'Industrial Zone',
  'Pedestrian Boulevard',
  'Transit Hub / Metro Station',
  'Residential Ground Floor',
  'Office Park',
  'Rooftop / Terrace',
  'Food Court',
  'Virtual / Cloud Space',
];

const CUSTOMER_TYPES: { id: string; label: string; desc: string }[] = [
  { id: 'all', label: 'General Public (All)', desc: 'Broad community appeal' },
  { id: 'companies', label: 'B2B / Companies', desc: 'Corporate & business clients' },
  { id: 'youth', label: 'Youth & Gen-Z', desc: 'Young adults, trend-seekers' },
  { id: 'families', label: 'Families', desc: 'Households with children' },
  { id: 'children', label: 'Children & Kids', desc: 'Play, tutoring, pediatric' },
  { id: 'woman', label: 'Women', desc: 'Beauty, apparel, wellness' },
  { id: 'man', label: 'Men', desc: 'Grooming, apparel, specialized' },
  { id: 'students', label: 'University Students', desc: 'Campuses & dorm corridors' },
  { id: 'seniors', label: 'Seniors & Elders', desc: 'Healthcare, accessibility' },
];

const AREA_PRESETS = [
  { label: '30 m²', value: '30 m2', desc: 'Micro / Kiosk' },
  { label: '80 m²', value: '80 m2', desc: 'Boutique' },
  { label: '200 m²', value: '200 m2', desc: 'Standard Retail' },
  { label: '500 m²', value: '500 m2', desc: 'Flagship' },
  { label: '1,500 m²', value: '1500 m2', desc: 'Big-Box Anchor' },
];

export const AddEditBusinessTypeModal: React.FC<AddEditBusinessTypeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  onReset,
  initialData,
  suggestedNextId = 'BUS-0505',
}) => {
  const isEditing = !!initialData;

  const [businessId, setBusinessId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [model, setModel] = useState<'Onsite' | 'Hybrid' | 'Online'>('Onsite');
  const [place, setPlace] = useState<string>('First Floor');
  const [customPlace, setCustomPlace] = useState<string>('');
  const [areaNumber, setAreaNumber] = useState<string>('120');
  const [customerType, setCustomerType] = useState<string>('all');
  const [popularity, setPopularity] = useState<'Low' | 'Medium' | 'High' | 'Very High'>('High');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize or reset form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setBusinessId(initialData.business_id);
      setName(initialData.business_type_name);
      setModel((initialData.online_or_onsite as any) || 'Onsite');
      
      const isKnownPlace = COMMON_PLACES.includes(initialData.place);
      if (isKnownPlace) {
        setPlace(initialData.place);
        setCustomPlace('');
      } else {
        setPlace('Custom');
        setCustomPlace(initialData.place);
      }

      // Extract number from approximately_area e.g. "120 m2"
      const match = initialData.approximately_area.match(/(\d+)/);
      setAreaNumber(match ? match[1] : '120');

      setCustomerType(initialData.customer_type || 'all');
      setPopularity((initialData.popularity as any) || 'High');
    } else {
      setBusinessId(suggestedNextId);
      setName('');
      setModel('Onsite');
      setPlace('First Floor');
      setCustomPlace('');
      setAreaNumber('120');
      setCustomerType('all');
      setPopularity('High');
    }
    setValidationError(null);
  }, [initialData, suggestedNextId, isOpen]);

  if (!isOpen) return null;

  const finalPlace = place === 'Custom' ? (customPlace.trim() || 'Custom Space') : place;
  const finalArea = `${areaNumber.trim() || '120'} m2`;
  const computedStoreFormat = mapAreaToStoreFormat(finalArea, finalPlace);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Business Type Name is required');
      return;
    }

    if (place === 'Custom' && !customPlace.trim()) {
      setValidationError('Please specify the custom space/place');
      return;
    }

    const businessType: CommercialBusinessType = {
      business_id: businessId.trim() || suggestedNextId,
      business_type_name: name.trim(),
      online_or_onsite: model,
      place: finalPlace,
      approximately_area: finalArea,
      customer_type: customerType,
      popularity: popularity,
      isCustom: !initialData || initialData.isCustom,
      isModified: isEditing,
    };

    onSave(businessType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  {isEditing ? 'Change / Edit Target Business Type' : 'Add New Target Business Type'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 text-blue-800 rounded border border-blue-200">
                  {businessId || suggestedNextId}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Update operational parameters, floor requirements, and target customer profile'
                  : 'Register a new commercial category into the geospatial intelligence catalog'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. Business Type Name */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span>Business Type Name <span className="text-rose-500">*</span></span>
              <span className="text-[10px] font-normal text-slate-400">e.g. Specialty Matcha Bar, EV Fast Charging Hub</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationError(null);
              }}
              placeholder="e.g. Specialty Coffee & Artisanal Bakery"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-slate-900 shadow-xs"
            />
          </div>

          {/* 2. Operational Model Segmented Control */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800">Operational Delivery Model</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Onsite', title: 'Onsite Physical', desc: 'Walk-in brick & mortar store' },
                { id: 'Hybrid', title: 'Hybrid Model', desc: 'Physical hub + digital ordering' },
                { id: 'Online', title: 'Cloud / Virtual', desc: 'Virtual or delivery-only facility' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModel(m.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    model === m.id
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{m.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Space / Location Type */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span>Space / Building Placement</span>
              <span className="text-[10px] text-slate-400">Where this venture operates</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
              >
                {COMMON_PLACES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
                <option value="Custom">Custom Space...</option>
              </select>

              {place === 'Custom' ? (
                <input
                  type="text"
                  placeholder="Enter custom location type..."
                  value={customPlace}
                  onChange={(e) => setCustomPlace(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                />
              ) : (
                <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{place}</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Floor Area & Format Footprint */}
          <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Approximate Floor Area</span>
              </label>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full text-[10px]">
                {computedStoreFormat}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="5"
                  max="50000"
                  value={areaNumber}
                  onChange={(e) => setAreaNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900 pr-12 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  m²
                </span>
              </div>

              {/* Quick Area Presets */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {AREA_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      const num = preset.value.match(/(\d+)/)?.[1] || '120';
                      setAreaNumber(num);
                    }}
                    className={`px-2 py-1.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer shrink-0 ${
                      areaNumber === preset.value.match(/(\d+)/)?.[1]
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Target Customer Demographic */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Target Customer Demographic</span>
              </span>
              <span className="text-[10px] text-slate-400">Primary patron persona</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CUSTOMER_TYPES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCustomerType(c.id)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    customerType === c.id
                      ? 'bg-purple-50 border-purple-400 text-purple-900 ring-1 ring-purple-400/40'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">{c.label}</div>
                  <div className="text-[9px] text-slate-500 truncate">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Market Demand / Popularity Tier */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Market Demand / Popularity Tier</span>
              </span>
              <span className="text-[10px] text-slate-400">Estimated footfall pull</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'Very High', label: '🔥 Very High', sub: 'Peak Footfall Magnet' },
                { id: 'High', label: '⭐ High Demand', sub: 'Strong Steady Volume' },
                { id: 'Medium', label: 'Medium', sub: 'Stable Standard' },
                { id: 'Low', label: 'Low / Niche', sub: 'Destination Only' },
              ].map((pop) => (
                <button
                  key={pop.id}
                  type="button"
                  onClick={() => setPopularity(pop.id as any)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    popularity === pop.id
                      ? 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-400/40'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-[11px]">{pop.label}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{pop.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {isEditing && onReset && initialData?.isModified && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset this business type to its original catalog values?')) {
                    onReset(initialData.business_id);
                    onClose();
                  }
                }}
                className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                title="Reset to default original catalog values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            )}

            {isEditing && onDelete && initialData?.isCustom && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete "${initialData.business_type_name}" from custom business types?`)) {
                    onDelete(initialData.business_id);
                    onClose();
                  }
                }}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Add Business Type'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
