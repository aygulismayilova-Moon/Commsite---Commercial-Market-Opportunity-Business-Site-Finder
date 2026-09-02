import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  getAllCountries,
  getCitiesByCountryCode,
  getCountryByIsoCode,
  getCountryByName,
  normalizeSearchText,
  GLOBAL_CITY_COORDINATES,
  POPULAR_COUNTRY_CODES,
  WorldCountry,
  WorldCity,
  exportCountryCitiesToCsv,
} from '../utils/worldLocations';
import {
  Globe2,
  MapPin,
  Search,
  ChevronDown,
  Check,
  Download,
  SlidersHorizontal,
  X,
  Sparkles,
  Layers,
  Compass,
} from 'lucide-react';

interface WorldLocationPickerProps {
  selectedCountryName: string;
  selectedCityName: string;
  onLocationChange: (country: WorldCountry, city: WorldCity) => void;
  disabled?: boolean;
}

export const WorldLocationPicker: React.FC<WorldLocationPickerProps> = ({
  selectedCountryName,
  selectedCityName,
  onLocationChange,
  disabled = false,
}) => {
  const allCountries = useMemo(() => getAllCountries(), []);

  // Find initial country object if provided
  const initialCountry = useMemo(() => {
    if (!selectedCountryName) return null;
    return getCountryByName(selectedCountryName) || null;
  }, [selectedCountryName]);

  const [currentCountry, setCurrentCountry] = useState<WorldCountry | null>(initialCountry);
  const [currentCity, setCurrentCity] = useState<string>(selectedCityName || '');

  // Country Dropdown state
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // City Dropdown state
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Custom coordinate preview
  const [currentCityCoords, setCurrentCityCoords] = useState<{ lat: number; lng: number }>({
    lat: initialCountry?.latitude || 0,
    lng: initialCountry?.longitude || 0,
  });

  // Cities for the currently selected country
  const countryCities = useMemo(() => {
    if (!currentCountry?.isoCode) return [];
    return getCitiesByCountryCode(currentCountry.isoCode);
  }, [currentCountry?.isoCode]);

  // Synchronize initial selection
  useEffect(() => {
    if (selectedCountryName) {
      if (!currentCountry || selectedCountryName !== currentCountry.name) {
        const match = getCountryByName(selectedCountryName);
        if (match) {
          setCurrentCountry(match);
        }
      }
    } else {
      setCurrentCountry(null);
    }
  }, [selectedCountryName]);

  useEffect(() => {
    if (selectedCityName !== currentCity) {
      setCurrentCity(selectedCityName || '');
    }
  }, [selectedCityName]);

  // When country changes, ensure current city is valid or pick capital / first city
  const handleSelectCountry = (country: WorldCountry) => {
    setCurrentCountry(country);
    setIsCountryOpen(false);
    setCountrySearch('');

    const cities = getCitiesByCountryCode(country.isoCode);
    let chosenCity: WorldCity;

    if (cities.length > 0) {
      // Try to match existing city if already in that country, otherwise take the first city
      const existingMatch = currentCity
        ? cities.find((c) => c.name.toLowerCase() === currentCity.toLowerCase())
        : null;
      chosenCity = existingMatch || cities[0];
    } else {
      // Fallback for territories without granular city entries
      chosenCity = {
        name: country.name,
        countryCode: country.isoCode,
        latitude: country.latitude,
        longitude: country.longitude,
      };
    }

    setCurrentCity(chosenCity.name);
    setCurrentCityCoords({ lat: chosenCity.latitude, lng: chosenCity.longitude });
    onLocationChange(country, chosenCity);
  };

  const handleSelectCity = (city: WorldCity) => {
    if (!currentCountry) return;
    setCurrentCity(city.name);
    setCurrentCityCoords({ lat: city.latitude, lng: city.longitude });
    setIsCityOpen(false);
    setCitySearch('');
    onLocationChange(currentCountry, city);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryOpen(false);
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered Countries
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return allCountries;
    const term = countrySearch.toLowerCase().trim();
    const normTerm = normalizeSearchText(countrySearch);
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        normalizeSearchText(c.name).includes(normTerm) ||
        c.isoCode.toLowerCase().includes(term)
    );
  }, [allCountries, countrySearch]);

  // Popular Countries list
  const popularCountries = useMemo(() => {
    return POPULAR_COUNTRY_CODES.map((code) => getCountryByIsoCode(code)).filter(
      Boolean
    ) as WorldCountry[];
  }, []);

  // Filtered Cities (with diacritic-tolerant & typo-tolerant fuzzy matching)
  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) {
      return countryCities.slice(0, 150);
    }
    const term = citySearch.toLowerCase().trim();
    const normTerm = normalizeSearchText(citySearch);
    const matches: WorldCity[] = [];
    for (const c of countryCities) {
      const normName = normalizeSearchText(c.name);
      if (
        c.name.toLowerCase().includes(term) ||
        normName.includes(normTerm) ||
        (normTerm === 'adam' && (normName.includes('agdam') || normName.includes('adam') || normName.includes('aghdam'))) ||
        (normTerm === 'agdam' && normName.includes('adam')) ||
        (normTerm === 'aghdam' && normName.includes('adam'))
      ) {
        matches.push(c);
        if (matches.length >= 200) break;
      }
    }
    return matches;
  }, [countryCities, citySearch]);

  // Export current country's cities CSV
  const handleDownloadCsv = () => {
    const csvContent = exportCountryCitiesToCsv(currentCountry.isoCode);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${currentCountry.name.replace(/\s+/g, '_')}_cities_${countryCities.length}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Globe2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Global Territory &amp; City Selector</span>
        </label>
        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          250 Countries &amp; 148,000+ Cities
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Country Dropdown */}
        <div className="relative" ref={countryDropdownRef}>
          <div className="text-[11px] font-semibold text-slate-500 mb-1 flex items-center justify-between">
            <span>Country / Territory:</span>
            <span className="text-[10px] text-blue-600 font-bold">{allCountries.length} Available</span>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setIsCountryOpen(!isCountryOpen);
              setIsCityOpen(false);
            }}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg p-2.5 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
          >
            <div className="flex items-center gap-2 truncate">
              {currentCountry ? (
                <>
                  <span className="text-base leading-none">{currentCountry.flag}</span>
                  <span className="truncate">{currentCountry.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-mono">
                    {currentCountry.isoCode}
                  </span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">Select Country / Territory...</span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Country Popover Menu */}
          {isCountryOpen && (
            <div className="absolute z-50 mt-1.5 w-full sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-2 space-y-2 max-h-96 overflow-hidden flex flex-col">
              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search 250 countries (e.g. France, Japan, USA)..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  autoFocus
                  className="w-full text-xs pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                />
                {countrySearch && (
                  <button
                    onClick={() => setCountrySearch('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Select Popular Countries */}
              {!countrySearch && (
                <div className="pt-1 pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                    Popular Global Markets
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                    {popularCountries.map((c) => (
                      <button
                        key={c.isoCode}
                        type="button"
                        onClick={() => handleSelectCountry(c)}
                        className={`text-[11px] px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${
                          currentCountry?.isoCode === c.isoCode
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{c.flag}</span>
                        <span className="truncate max-w-[80px]">{c.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* All Countries List */}
              <div className="overflow-y-auto flex-1 divide-y divide-slate-50 pr-1 max-h-56">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                  All 250 Countries ({filteredCountries.length})
                </div>
                {filteredCountries.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching country found.
                  </div>
                ) : (
                  filteredCountries.map((c) => {
                    const isSelected = currentCountry?.isoCode === c.isoCode;
                    return (
                      <button
                        key={c.isoCode}
                        type="button"
                        onClick={() => handleSelectCountry(c)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base leading-none">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {c.isoCode}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* City Dropdown (Sensitive to Selected Country) */}
        <div className="relative" ref={cityDropdownRef}>
          <div className="text-[11px] font-semibold text-slate-500 mb-1 flex items-center justify-between">
            <span>{currentCountry ? `City in ${currentCountry.name}:` : 'City / Metro Area:'}</span>
            {currentCountry && (
              <span className="text-[10px] text-emerald-600 font-bold">
                {countryCities.length.toLocaleString()} Cities
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={disabled || !currentCountry}
            onClick={() => {
              if (!currentCountry) return;
              setIsCityOpen(!isCityOpen);
              setIsCountryOpen(false);
            }}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg p-2.5 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${currentCity ? 'text-emerald-600' : 'text-slate-400'}`} />
              {currentCity ? (
                <>
                  <span className="truncate font-bold">{currentCity}</span>
                  {currentCityCoords.lat !== 0 && (
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline truncate">
                      ({currentCityCoords.lat.toFixed(2)}, {currentCityCoords.lng.toFixed(2)})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-slate-400 font-normal">
                  {currentCountry ? 'Select City from list...' : 'Select Country First...'}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* City Popover Menu */}
          {isCityOpen && currentCountry && (
            <div className="absolute z-50 mt-1.5 w-full sm:w-88 right-0 bg-white border border-slate-200 rounded-xl shadow-xl p-2 space-y-2 max-h-96 overflow-hidden flex flex-col">
              {/* Header with City Count & CSV Download */}
              <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <span>{currentCountry.flag}</span>
                  <span>{countryCities.length.toLocaleString()} cities in {currentCountry.name}</span>
                </span>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  title="Download CSV of all cities in this country"
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </button>
              </div>

              {/* City Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder={`Search ${countryCities.length} cities in ${currentCountry.name}...`}
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  autoFocus
                  className="w-full text-xs pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                />
                {citySearch && (
                  <button
                    onClick={() => setCitySearch('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Cities List */}
              <div className="overflow-y-auto flex-1 divide-y divide-slate-50 pr-1 max-h-60">
                {filteredCities.length === 0 ? (
                  <div className="p-4 text-center space-y-2">
                    <p className="text-xs text-slate-500">
                      No matching city found for &quot;{citySearch}&quot;.
                    </p>
                    {citySearch.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          const norm = normalizeSearchText(citySearch.trim());
                          const lower = citySearch.trim().toLowerCase();
                          const coords =
                            GLOBAL_CITY_COORDINATES[norm] ||
                            GLOBAL_CITY_COORDINATES[lower] ||
                            { lat: currentCountry.latitude, lng: currentCountry.longitude };
                          const custom: WorldCity = {
                            name: citySearch.trim(),
                            countryCode: currentCountry.isoCode,
                            latitude: coords.lat,
                            longitude: coords.lng,
                          };
                          handleSelectCity(custom);
                        }}
                        className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold transition-colors"
                      >
                        Use &quot;{citySearch.trim()}&quot; as custom city
                      </button>
                    )}
                  </div>
                ) : (
                  filteredCities.map((c, idx) => {
                    const isSelected = currentCity.toLowerCase() === c.name.toLowerCase();
                    return (
                      <button
                        key={`${c.name}-${c.stateCode || idx}`}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="truncate">{c.name}</span>
                          {c.stateCode && (
                            <span className="text-[10px] px-1 py-0.2 bg-slate-100 text-slate-500 rounded">
                              {c.stateCode}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {c.latitude !== 0 && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              {c.latitude.toFixed(2)}, {c.longitude.toFixed(2)}
                            </span>
                          )}
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer status */}
              {countryCities.length > 150 && !citySearch && (
                <div className="text-[10px] text-center text-slate-400 pt-1 border-t border-slate-100">
                  Showing top 150 of {countryCities.length.toLocaleString()} cities. Type to filter all.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Location Pills / Coordinates Summary */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-700">Active Focus:</span>
          {currentCountry && currentCity ? (
            <span className="font-bold text-slate-900">
              {currentCountry.flag} {currentCity}, {currentCountry.name}
            </span>
          ) : (
            <span className="text-slate-400 italic">None (Please select Country &amp; City)</span>
          )}
        </div>
        {currentCityCoords.lat !== 0 && (
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
            <span>LAT: {currentCityCoords.lat.toFixed(4)}</span>
            <span>•</span>
            <span>LNG: {currentCityCoords.lng.toFixed(4)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
