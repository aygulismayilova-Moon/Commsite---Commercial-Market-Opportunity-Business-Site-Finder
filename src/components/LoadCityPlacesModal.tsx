import React, { useState } from 'react';
import { PlaceItem, STANDARD_PLACE_CATEGORIES } from '../types';
import { WorldLocationPicker } from './WorldLocationPicker';
import { WorldCountry, WorldCity } from '../utils/worldLocations';
import {
  Globe,
  MapPin,
  Sparkles,
  Loader2,
  CheckCircle2,
  X,
  Plus,
  RefreshCw,
  Building2,
  Navigation,
  Layers,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface LoadCityPlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportPlaces: (newPlaces: PlaceItem[], replaceAll: boolean, cityName: string) => void;
  currentCityName?: string;
  currentCountryName?: string;
}

export const LoadCityPlacesModal: React.FC<LoadCityPlacesModalProps> = ({
  isOpen,
  onClose,
  onImportPlaces,
  currentCityName = 'London',
  currentCountryName = 'United Kingdom',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(currentCountryName);
  const [selectedCity, setSelectedCity] = useState<string>(currentCityName);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({ lat: 51.5074, lng: -0.1278 });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [itemLimit, setItemLimit] = useState<number>(12);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedPlaces, setFetchedPlaces] = useState<PlaceItem[]>([]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLocationChange = (country: WorldCountry, city: WorldCity) => {
    setSelectedCountry(country.name);
    setSelectedCity(city.name);
    setSelectedCoords({ lat: city.latitude, lng: city.longitude });
    setErrorNotice(null);
  };

  const handleFetchCityPlaces = async () => {
    if (!selectedCity.trim()) {
      setErrorNotice('Please select or specify a city name.');
      return;
    }

    setIsLoading(true);
    setErrorNotice(null);
    setFetchedPlaces([]);

    try {
      const queryParams = new URLSearchParams({
        city: selectedCity.trim(),
        country: selectedCountry.trim(),
        category: selectedCategory.trim(),
        q: customKeyword.trim(),
        lat: String(selectedCoords.lat),
        lng: String(selectedCoords.lng),
        limit: String(itemLimit),
      });

      const response = await fetch(`/api/places/city-real-places?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const data = await response.json();
      if (data.places && Array.isArray(data.places) && data.places.length > 0) {
        setFetchedPlaces(data.places);
        setHasFetched(true);
      } else {
        setErrorNotice(`No real locations found for ${selectedCity}. Try a different keyword or category.`);
        setHasFetched(true);
      }
    } catch (err: any) {
      console.error('Error fetching city real places:', err);
      setErrorNotice(err.message || 'Failed to fetch real places from Google Maps.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyImport = (replaceAll: boolean) => {
    if (fetchedPlaces.length === 0) return;
    onImportPlaces(fetchedPlaces, replaceAll, selectedCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-slate-900 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                Load Real Places &amp; Streets from Google Maps
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Fetch authentic places, streets, and coordinates for your chosen city worldwide.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* City & Country Selector */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <label className="block text-[11px] font-extrabold uppercase text-slate-600 tracking-wider">
              1. Choose City &amp; Country
            </label>
            <WorldLocationPicker
              selectedCountryName={selectedCountry}
              selectedCityName={selectedCity}
              onLocationChange={handleLocationChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">Category Filter</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="">All Categories (Diverse)</option>
                  {STANDARD_PLACE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">Custom Keyword (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. boulevard, plaza, market..."
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">Places Count</label>
                <select
                  value={itemLimit}
                  onChange={(e) => setItemLimit(Number(e.target.value))}
                  className="w-full bg-white text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value={8}>8 Real Places</option>
                  <option value={12}>12 Real Places (Recommended)</option>
                  <option value={16}>16 Real Places</option>
                  <option value={24}>24 Real Places</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleFetchCityPlaces}
                disabled={isLoading || !selectedCity}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Fetching Real Places for {selectedCity}...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Fetch Real Places &amp; Streets from Google Maps
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Notice */}
          {errorNotice && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Fetched Results Preview */}
          {fetchedPlaces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 tracking-wider">
                  2. Preview Real Places in {selectedCity} ({fetchedPlaces.length} Found)
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  ✓ Verified Google Maps Data
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-56 overflow-y-auto space-y-1.5 divide-y divide-slate-200/60">
                {fetchedPlaces.map((p, idx) => (
                  <div key={idx} className="pt-1.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">{p.place_name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold shrink-0">
                          {p.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span className="font-medium text-slate-800">📍 {p.street}</span>
                        <span className="text-slate-400">•</span>
                        <span>{p.area}, {p.city}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono text-[10px] text-slate-500">
                          ({p.latitude.toFixed(4)}, {p.longitude.toFixed(4)})
                        </span>
                      </div>
                    </div>

                    {p.googleMapsUrl && (
                      <a
                        href={p.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 shrink-0 hover:underline pt-0.5"
                      >
                        Map <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {fetchedPlaces.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => handleApplyImport(false)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                  Append ({fetchedPlaces.length}) to Dataset
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyImport(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Replace Dataset with {selectedCity} Places
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
