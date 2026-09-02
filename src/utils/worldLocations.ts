import { Country, City, ICountry, ICity } from 'country-state-city';

export interface WorldCountry {
  name: string;
  isoCode: string;
  flag: string;
  currency: string;
  latitude: number;
  longitude: number;
  citiesCount?: number;
}

export interface WorldCity {
  name: string;
  countryCode: string;
  stateCode?: string;
  latitude: number;
  longitude: number;
}

// Popular / Major Countries placed at top for fast discovery
export const POPULAR_COUNTRY_CODES = [
  'GB', // United Kingdom
  'US', // United States
  'DE', // Germany
  'FR', // France
  'TR', // Turkey
  'AZ', // Azerbaijan
  'JP', // Japan
  'CA', // Canada
  'AU', // Australia
  'AE', // United Arab Emirates
  'SG', // Singapore
  'IT', // Italy
  'ES', // Spain
  'NL', // Netherlands
  'CH', // Switzerland
  'SE', // Sweden
  'AT', // Austria
  'IN', // India
  'BR', // Brazil
  'MX', // Mexico
  'KR', // South Korea
  'SA', // Saudi Arabia
  'ZA', // South Africa
];

// Country Alias Map for robust matching
export const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'US',
  us: 'US',
  'united states of america': 'US',
  'united states': 'US',
  uk: 'GB',
  gb: 'GB',
  'united kingdom': 'GB',
  'great britain': 'GB',
  england: 'GB',
  uae: 'AE',
  ae: 'AE',
  'united arab emirates': 'AE',
  turkey: 'TR',
  turkiye: 'TR',
  türkiye: 'TR',
  tr: 'TR',
  azerbaijan: 'AZ',
  azerbaycan: 'AZ',
  az: 'AZ',
  germany: 'DE',
  deutschland: 'DE',
  de: 'DE',
  france: 'FR',
  fr: 'FR',
  japan: 'JP',
  jp: 'JP',
  italy: 'IT',
  italia: 'IT',
  it: 'IT',
  spain: 'ES',
  espana: 'ES',
  españa: 'ES',
  es: 'ES',
  canada: 'CA',
  ca: 'CA',
  australia: 'AU',
  au: 'AU',
  singapore: 'SG',
  sg: 'SG',
  'south korea': 'KR',
  korea: 'KR',
  kr: 'KR',
  saudi: 'SA',
  'saudi arabia': 'SA',
  sa: 'SA',
  china: 'CN',
  cn: 'CN',
  russia: 'RU',
  'russian federation': 'RU',
  ru: 'RU',
  brazil: 'BR',
  brasil: 'BR',
  br: 'BR',
  mexico: 'MX',
  mx: 'MX',
  india: 'IN',
  in: 'IN',
  netherlands: 'NL',
  holland: 'NL',
  nl: 'NL',
  switzerland: 'CH',
  ch: 'CH',
  austria: 'AT',
  at: 'AT',
  sweden: 'SE',
  se: 'SE',
  norway: 'NO',
  no: 'NO',
  denmark: 'DK',
  dk: 'DK',
  finland: 'FI',
  fi: 'FI',
  poland: 'PL',
  polska: 'PL',
  pl: 'PL',
  ireland: 'IE',
  ie: 'IE',
  greece: 'GR',
  gr: 'GR',
  portugal: 'PT',
  pt: 'PT',
  qatar: 'QA',
  qa: 'QA',
  egypt: 'EG',
  eg: 'EG',
};

// High-precision coordinates database for global cities & world hubs
export const GLOBAL_CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // UK
  'london': { lat: 51.5074, lng: -0.1278 },
  'manchester': { lat: 53.4808, lng: -2.2426 },
  'birmingham': { lat: 52.4862, lng: -1.8904 },
  'edinburgh': { lat: 55.9533, lng: -3.1883 },
  'glasgow': { lat: 55.8642, lng: -4.2518 },
  'leeds': { lat: 53.8008, lng: -1.5491 },
  'liverpool': { lat: 53.4084, lng: -2.9916 },
  'bristol': { lat: 51.4545, lng: -2.5879 },

  // USA
  'new york': { lat: 40.7128, lng: -74.006 },
  'new york city': { lat: 40.7128, lng: -74.006 },
  'los angeles': { lat: 34.0522, lng: -118.2437 },
  'chicago': { lat: 41.8781, lng: -87.6298 },
  'houston': { lat: 29.7604, lng: -95.3698 },
  'san francisco': { lat: 37.7749, lng: -122.4194 },
  'miami': { lat: 25.7617, lng: -80.1918 },
  'seattle': { lat: 47.6062, lng: -122.3321 },
  'boston': { lat: 42.3601, lng: -71.0589 },
  'austin': { lat: 30.2672, lng: -97.7431 },
  'dallas': { lat: 32.7767, lng: -96.797 },
  'atlanta': { lat: 33.749, lng: -84.388 },
  'washington': { lat: 38.9072, lng: -77.0369 },
  'washington dc': { lat: 38.9072, lng: -77.0369 },

  // Turkey
  'istanbul': { lat: 41.0082, lng: 28.9784 },
  'ankara': { lat: 39.9334, lng: 32.8597 },
  'izmir': { lat: 38.4237, lng: 27.1428 },
  'bursa': { lat: 40.1885, lng: 29.061 },
  'antalya': { lat: 36.8969, lng: 30.7133 },
  'adana': { lat: 37.0, lng: 35.3213 },
  'gaziantep': { lat: 37.0662, lng: 37.3833 },
  'konya': { lat: 37.8746, lng: 32.4932 },
  'mersin': { lat: 36.8121, lng: 34.6415 },
  'diyarbakir': { lat: 37.9144, lng: 40.2306 },
  'kayseri': { lat: 38.7205, lng: 35.4826 },
  'eskisehir': { lat: 39.7767, lng: 30.5206 },
  'samsun': { lat: 41.2867, lng: 36.33 },
  'denizli': { lat: 37.7765, lng: 29.0864 },
  'trabzon': { lat: 41.0027, lng: 39.7168 },
  'bodrum': { lat: 37.0344, lng: 27.4305 },

  // Azerbaijan
  'baku': { lat: 40.4093, lng: 49.8671 },
  'ganja': { lat: 40.6828, lng: 46.3606 },
  'sumqayit': { lat: 40.5897, lng: 49.6686 },
  'agdam': { lat: 39.9910, lng: 46.9274 },
  'ağdam': { lat: 39.9910, lng: 46.9274 },
  'aghdam': { lat: 39.9910, lng: 46.9274 },
  'adam': { lat: 39.9910, lng: 46.9274 },
  'shusha': { lat: 39.7537, lng: 46.7465 },
  'mingachevir': { lat: 40.764, lng: 47.0595 },
  'shaki': { lat: 41.1919, lng: 47.1706 },
  'shirvan': { lat: 39.9378, lng: 48.929 },
  'nakhchivan': { lat: 39.2089, lng: 45.4122 },
  'lankaran': { lat: 38.7529, lng: 48.8475 },
  'khachmaz': { lat: 41.4636, lng: 48.8061 },
  'quba': { lat: 41.3611, lng: 48.5133 },
  'qusar': { lat: 41.4275, lng: 48.4300 },
  'khankendi': { lat: 39.8177, lng: 46.7528 },
  'lachin': { lat: 39.6383, lng: 46.5461 },
  'fizuli': { lat: 39.6003, lng: 47.1431 },
  'jabrayil': { lat: 39.3986, lng: 47.0278 },
  'zangilan': { lat: 39.0833, lng: 46.6500 },
  'gubadli': { lat: 39.3444, lng: 46.5818 },
  'qubadli': { lat: 39.3444, lng: 46.5818 },
  'kalbajar': { lat: 40.1039, lng: 46.0361 },
  'barda': { lat: 40.3758, lng: 47.1261 },
  'tartar': { lat: 40.3456, lng: 46.9322 },
  'aghjabadi': { lat: 40.0502, lng: 47.4594 },
  'agdash': { lat: 40.6500, lng: 47.4750 },
  'goychay': { lat: 40.6536, lng: 47.7406 },
  'ismayilli': { lat: 40.7850, lng: 48.1519 },
  'shamakhi': { lat: 40.6319, lng: 48.6414 },
  'gabala': { lat: 40.9982, lng: 47.8492 },
  'qabala': { lat: 40.9982, lng: 47.8492 },
  'astara': { lat: 38.4561, lng: 48.8744 },
  'naftalan': { lat: 40.5067, lng: 46.8250 },
  'yevlakh': { lat: 40.6172, lng: 47.1500 },
  'goygol': { lat: 40.5858, lng: 46.3189 },

  // Germany
  'berlin': { lat: 52.52, lng: 13.405 },
  'munich': { lat: 48.1351, lng: 11.582 },
  'frankfurt': { lat: 50.1109, lng: 8.6821 },
  'hamburg': { lat: 53.5511, lng: 9.9937 },
  'cologne': { lat: 50.9375, lng: 6.9603 },
  'dusseldorf': { lat: 51.2277, lng: 6.7735 },
  'stuttgart': { lat: 48.7758, lng: 9.1829 },
  'leipzig': { lat: 51.3397, lng: 12.3731 },

  // France
  'paris': { lat: 48.8566, lng: 2.3522 },
  'lyon': { lat: 45.764, lng: 4.8357 },
  'marseille': { lat: 43.2965, lng: 5.3698 },
  'nice': { lat: 43.7102, lng: 7.262 },
  'toulouse': { lat: 43.6047, lng: 1.4442 },
  'bordeaux': { lat: 44.8378, lng: -0.5792 },
  'lille': { lat: 50.6292, lng: 3.0573 },
  'strasbourg': { lat: 48.5734, lng: 7.7521 },

  // Japan
  'tokyo': { lat: 35.6762, lng: 139.6503 },
  'osaka': { lat: 34.6937, lng: 135.5023 },
  'kyoto': { lat: 35.0116, lng: 135.7681 },
  'yokohama': { lat: 35.4437, lng: 139.638 },
  'nagoya': { lat: 35.1815, lng: 136.9066 },
  'sapporo': { lat: 43.0618, lng: 141.3545 },
  'fukuoka': { lat: 33.5904, lng: 130.4017 },
  'kobe': { lat: 34.6901, lng: 135.1955 },

  // Italy
  'rome': { lat: 41.9028, lng: 12.4964 },
  'milan': { lat: 45.4642, lng: 9.19 },
  'florence': { lat: 43.7696, lng: 11.2558 },
  'naples': { lat: 40.8518, lng: 14.2681 },
  'venice': { lat: 45.4408, lng: 12.3155 },
  'turin': { lat: 45.0703, lng: 7.6869 },
  'bologna': { lat: 44.4949, lng: 11.3426 },

  // Spain
  'madrid': { lat: 40.4168, lng: -3.7038 },
  'barcelona': { lat: 41.3851, lng: 2.1734 },
  'valencia': { lat: 39.4699, lng: -0.3763 },
  'seville': { lat: 37.3891, lng: -5.9845 },
  'malaga': { lat: 36.7213, lng: -4.4214 },
  'bilbao': { lat: 43.263, lng: -2.935 },

  // Canada
  'toronto': { lat: 43.6532, lng: -79.3832 },
  'vancouver': { lat: 49.2827, lng: -123.1207 },
  'montreal': { lat: 45.5017, lng: -73.5673 },
  'calgary': { lat: 51.0447, lng: -114.0719 },
  'ottawa': { lat: 45.4215, lng: -75.6972 },

  // Australia
  'sydney': { lat: -33.8688, lng: 151.2093 },
  'melbourne': { lat: -37.8136, lng: 144.9631 },
  'brisbane': { lat: -27.4698, lng: 153.0251 },
  'perth': { lat: -31.9505, lng: 115.8605 },
  'adelaide': { lat: -34.9285, lng: 138.6007 },

  // UAE & Middle East
  'dubai': { lat: 25.2048, lng: 55.2708 },
  'abu dhabi': { lat: 24.4539, lng: 54.3773 },
  'sharjah': { lat: 25.3463, lng: 55.4209 },
  'doha': { lat: 25.2854, lng: 51.531 },
  'riyadh': { lat: 24.7136, lng: 46.6753 },
  'jeddah': { lat: 21.4858, lng: 39.1925 },
  'manama': { lat: 26.2285, lng: 50.586 },
  'kuwait city': { lat: 29.3759, lng: 47.9774 },

  // Others
  'singapore': { lat: 1.3521, lng: 103.8198 },
  'seoul': { lat: 37.5665, lng: 126.978 },
  'busan': { lat: 35.1796, lng: 129.0756 },
  'amsterdam': { lat: 52.3676, lng: 4.9041 },
  'rotterdam': { lat: 51.9244, lng: 4.4777 },
  'zurich': { lat: 47.3769, lng: 8.5417 },
  'geneva': { lat: 46.2044, lng: 6.1432 },
  'vienna': { lat: 48.2082, lng: 16.3738 },
  'brussels': { lat: 50.8503, lng: 4.3517 },
  'stockholm': { lat: 59.3293, lng: 18.0686 },
  'oslo': { lat: 59.9139, lng: 10.7522 },
  'copenhagen': { lat: 55.6761, lng: 12.5683 },
  'helsinki': { lat: 60.1699, lng: 24.9384 },
  'warsaw': { lat: 52.2297, lng: 21.0122 },
  'krakow': { lat: 50.0647, lng: 19.945 },
  'prague': { lat: 50.0755, lng: 14.4378 },
  'budapest': { lat: 47.4979, lng: 19.0402 },
  'athens': { lat: 37.9838, lng: 23.7275 },
  'dublin': { lat: 53.3498, lng: -6.2603 },
  'lisbon': { lat: 38.7223, lng: -9.1393 },
  'porto': { lat: 41.1579, lng: -8.6291 },
  'cairo': { lat: 30.0444, lng: 31.2357 },
  'johannesburg': { lat: -26.2041, lng: 28.0473 },
  'cape town': { lat: -33.9249, lng: 18.4241 },
  'mumbai': { lat: 19.076, lng: 72.8777 },
  'delhi': { lat: 28.6139, lng: 77.209 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'sao paulo': { lat: -23.5505, lng: -46.6333 },
  'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
  'mexico city': { lat: 19.4326, lng: -99.1332 },
  'buenos aires': { lat: -34.6037, lng: -58.3816 },
  'bangkok': { lat: 13.7563, lng: 100.5018 },
  'kuala lumpur': { lat: 3.139, lng: 101.6869 },
  'jakarta': { lat: -6.2088, lng: 106.8456 },
  'manila': { lat: 14.5995, lng: 120.9842 },
  'taipei': { lat: 25.033, lng: 121.5654 },
  'hong kong': { lat: 22.3193, lng: 114.1694 },
};

// Cache all countries loaded once
let _allCountriesCache: WorldCountry[] | null = null;

export const getAllCountries = (): WorldCountry[] => {
  if (_allCountriesCache) return _allCountriesCache;

  const raw = Country.getAllCountries();
  const list: WorldCountry[] = raw.map((c: ICountry) => {
    let lat = parseFloat(c.latitude || '0') || 0;
    let lng = parseFloat(c.longitude || '0') || 0;

    // Fill known country center fallback if 0
    if (lat === 0 && lng === 0) {
      if (c.isoCode === 'TR') { lat = 39.9334; lng = 32.8597; }
      else if (c.isoCode === 'AZ') { lat = 40.4093; lng = 49.8671; }
      else if (c.isoCode === 'GB') { lat = 51.5074; lng = -0.1278; }
      else if (c.isoCode === 'US') { lat = 37.0902; lng = -95.7129; }
    }

    return {
      name: c.name,
      isoCode: c.isoCode,
      flag: c.flag || '🌐',
      currency: c.currency || 'USD',
      latitude: lat,
      longitude: lng,
    };
  });

  // Sort alphabetically by name
  list.sort((a, b) => a.name.localeCompare(b.name));
  _allCountriesCache = list;
  return _allCountriesCache;
};

// Cache cities by country code
const _citiesByCountryCache = new Map<string, WorldCity[]>();

// Normalize strings for diacritic-insensitive, accent-free, and typo-tolerant search
export const normalizeSearchText = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ğ/g, 'g')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const getCitiesByCountryCode = (countryIsoCodeOrName: string): WorldCity[] => {
  if (!countryIsoCodeOrName) return [];
  const countryObj = getCountryByIsoCode(countryIsoCodeOrName) || getCountryByName(countryIsoCodeOrName);
  const upper = countryObj ? countryObj.isoCode.toUpperCase() : countryIsoCodeOrName.trim().toUpperCase();
  if (_citiesByCountryCache.has(upper)) {
    return _citiesByCountryCache.get(upper)!;
  }

  const raw = City.getCitiesOfCountry(upper) || [];
  const seen = new Set<string>();
  const cities: WorldCity[] = [];

  const countryCenterLat = countryObj?.latitude || 51.5074;
  const countryCenterLng = countryObj?.longitude || -0.1278;

  for (const c of raw as ICity[]) {
    if (!c.name) continue;
    const nameTrimmed = c.name.trim();
    const cityKey = normalizeSearchText(nameTrimmed);
    const key = `${cityKey}|${c.stateCode || ''}`;
    if (!seen.has(key)) {
      seen.add(key);

      let lat = parseFloat(c.latitude || '0') || 0;
      let lng = parseFloat(c.longitude || '0') || 0;

      // Look up high-accuracy coordinates dictionary if 0 or missing
      if ((lat === 0 && lng === 0) || isNaN(lat)) {
        if (GLOBAL_CITY_COORDINATES[cityKey] || GLOBAL_CITY_COORDINATES[nameTrimmed.toLowerCase()]) {
          const coord = GLOBAL_CITY_COORDINATES[cityKey] || GLOBAL_CITY_COORDINATES[nameTrimmed.toLowerCase()];
          lat = coord.lat;
          lng = coord.lng;
        } else {
          lat = countryCenterLat;
          lng = countryCenterLng;
        }
      }

      cities.push({
        name: nameTrimmed,
        countryCode: upper,
        stateCode: c.stateCode || undefined,
        latitude: lat,
        longitude: lng,
      });
    }
  }

  // Ensure major capitals / hub cities exist even if missing from country-state-city
  if (upper === 'TR') {
    const trMajors = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Gaziantep', 'Konya', 'Trabzon', 'Bodrum'];
    trMajors.forEach((m) => {
      if (!cities.some((c) => normalizeSearchText(c.name) === normalizeSearchText(m))) {
        const coords = GLOBAL_CITY_COORDINATES[m.toLowerCase()] || { lat: 39.93, lng: 32.85 };
        cities.unshift({ name: m, countryCode: 'TR', latitude: coords.lat, longitude: coords.lng });
      }
    });
  } else if (upper === 'AZ') {
    const azMajors: { name: string; altNames?: string[]; lat: number; lng: number }[] = [
      { name: 'Agdam (Ağdam)', altNames: ['Agdam', 'Ağdam', 'Adam', 'Aghdam'], lat: 39.9910, lng: 46.9274 },
      { name: 'Baku', altNames: ['Bakı'], lat: 40.4093, lng: 49.8671 },
      { name: 'Ganja', altNames: ['Gəncə'], lat: 40.6828, lng: 46.3606 },
      { name: 'Sumqayit', altNames: ['Sumqayıt'], lat: 40.5897, lng: 49.6686 },
      { name: 'Mingachevir', altNames: ['Mingəçevir'], lat: 40.7640, lng: 47.0595 },
      { name: 'Shusha', altNames: ['Şuşa'], lat: 39.7537, lng: 46.7465 },
      { name: 'Shaki', altNames: ['Şəki'], lat: 41.1919, lng: 47.1706 },
      { name: 'Nakhchivan', altNames: ['Naxçıvan'], lat: 39.2089, lng: 45.4122 },
      { name: 'Lankaran', altNames: ['Lənkəran'], lat: 38.7529, lng: 48.8475 },
      { name: 'Khankendi', altNames: ['Xankəndi'], lat: 39.8177, lng: 46.7528 },
      { name: 'Lachin', altNames: ['Laçın'], lat: 39.6383, lng: 46.5461 },
      { name: 'Fizuli', altNames: ['Füzuli'], lat: 39.6003, lng: 47.1431 },
      { name: 'Jabrayil', altNames: ['Cəbrayıl'], lat: 39.3986, lng: 47.0278 },
      { name: 'Zangilan', altNames: ['Zəngilan'], lat: 39.0833, lng: 46.6500 },
      { name: 'Qubadli', altNames: ['Qubadlı', 'Gubadli'], lat: 39.3444, lng: 46.5818 },
      { name: 'Kalbajar', altNames: ['Kəlbəcər'], lat: 40.1039, lng: 46.0361 },
      { name: 'Quba', altNames: ['Quba'], lat: 41.3611, lng: 48.5133 },
      { name: 'Khachmaz', altNames: ['Xaçmaz'], lat: 41.4636, lng: 48.8061 },
      { name: 'Qabala', altNames: ['Qəbələ', 'Gabala'], lat: 40.9982, lng: 47.8492 },
      { name: 'Shamakhi', altNames: ['Şamaxı'], lat: 40.6319, lng: 48.6414 },
      { name: 'Goychay', altNames: ['Göyçay'], lat: 40.6536, lng: 47.7406 },
      { name: 'Barda', altNames: ['Bərdə'], lat: 40.3758, lng: 47.1261 },
      { name: 'Tartar', altNames: ['Tərtər'], lat: 40.3456, lng: 46.9322 },
      { name: 'Naftalan', altNames: ['Naftalan'], lat: 40.5067, lng: 46.8250 },
    ];

    azMajors.forEach((m) => {
      const matchIdx = cities.findIndex((c) => {
        const norm = normalizeSearchText(c.name);
        return norm === normalizeSearchText(m.name) || (m.altNames && m.altNames.some(alt => normalizeSearchText(alt) === norm));
      });
      if (matchIdx >= 0) {
        // Upgrade with verified precise coordinates
        cities[matchIdx].latitude = m.lat;
        cities[matchIdx].longitude = m.lng;
      } else {
        cities.unshift({ name: m.name, countryCode: 'AZ', latitude: m.lat, longitude: m.lng });
      }
    });
  }

  // Sort alphabetically
  cities.sort((a, b) => a.name.localeCompare(b.name));
  _citiesByCountryCache.set(upper, cities);
  return cities;
};

export const getCountryByIsoCode = (isoCode: string): WorldCountry | undefined => {
  if (!isoCode) return undefined;
  const upper = isoCode.trim().toUpperCase();
  const all = getAllCountries();
  return all.find((c) => c.isoCode.toUpperCase() === upper);
};

export const getCountryByName = (countryName: string): WorldCountry | undefined => {
  if (!countryName) return undefined;
  const all = getAllCountries();
  const clean = countryName.trim().toLowerCase();
  const norm = normalizeSearchText(countryName);

  // 1. Direct match by name
  const direct = all.find((c) => c.name.toLowerCase() === clean || normalizeSearchText(c.name) === norm);
  if (direct) return direct;

  // 2. Direct match by ISO code
  const byCode = all.find((c) => c.isoCode.toLowerCase() === clean);
  if (byCode) return byCode;

  // 3. Match via Alias Map
  if (COUNTRY_ALIASES[clean] || COUNTRY_ALIASES[norm]) {
    const aliased = getCountryByIsoCode(COUNTRY_ALIASES[clean] || COUNTRY_ALIASES[norm]);
    if (aliased) return aliased;
  }

  // 4. Substring inclusion
  return all.find(
    (c) =>
      c.name.toLowerCase().includes(clean) ||
      clean.includes(c.name.toLowerCase()) ||
      normalizeSearchText(c.name).includes(norm) ||
      norm.includes(normalizeSearchText(c.name))
  );
};

export const findCityInCountry = (countryIsoCode: string, cityName: string): WorldCity | undefined => {
  const cities = getCitiesByCountryCode(countryIsoCode);
  const lower = cityName.trim().toLowerCase();
  const norm = normalizeSearchText(cityName);

  // 1. Direct match
  const direct = cities.find((c) => c.name.toLowerCase() === lower || normalizeSearchText(c.name) === norm);
  if (direct) return direct;

  // 2. Alias / typo check (e.g. 'adam' -> 'Agdam (Ağdam)')
  if (norm === 'adam' || norm === 'agdam' || norm === 'aghdam') {
    const agdamMatch = cities.find(c => {
      const n = normalizeSearchText(c.name);
      return n.includes('agdam') || n.includes('adam') || n.includes('aghdam');
    });
    if (agdamMatch) return agdamMatch;
  }

  // 3. Prefix/Substring match
  return (
    cities.find((c) => normalizeSearchText(c.name).startsWith(norm)) ||
    cities.find((c) => normalizeSearchText(c.name).includes(norm) || norm.includes(normalizeSearchText(c.name)))
  );
};

// Asynchronous Live Geocoding for any custom city name
export const geocodeCityOnline = async (cityName: string, countryName: string): Promise<{ lat: number; lng: number } | null> => {
  const cityKey = cityName.trim().toLowerCase();
  if (GLOBAL_CITY_COORDINATES[cityKey]) {
    return GLOBAL_CITY_COORDINATES[cityKey];
  }

  try {
    const q = `${encodeURIComponent(cityName)}, ${encodeURIComponent(countryName)}`;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`, {
      headers: { 'Accept-Language': 'en' },
      signal: AbortSignal.timeout(3500),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (!isNaN(lat) && !isNaN(lng)) {
          GLOBAL_CITY_COORDINATES[cityKey] = { lat, lng };
          return { lat, lng };
        }
      }
    }
  } catch (err: any) {
    const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError' || String(err).includes('timeout') || String(err).includes('aborted');
    if (!isTimeout) {
      console.info('Geocoding lookup notice:', err?.message || err);
    }
  }
  return null;
};

// Generate CSV export of cities for a given country or world sample
export const exportCountryCitiesToCsv = (countryIsoCode?: string): string => {
  const countries = countryIsoCode
    ? [getCountryByIsoCode(countryIsoCode)].filter(Boolean) as WorldCountry[]
    : getAllCountries();

  const rows: string[] = ['"Country","CountryCode","City","StateCode","Latitude","Longitude"'];

  for (const country of countries) {
    const cities = getCitiesByCountryCode(country.isoCode);
    for (const city of cities) {
      rows.push(
        `"${country.name.replace(/"/g, '""')}","${country.isoCode}","${city.name.replace(/"/g, '""')}","${city.stateCode || ''}",${city.latitude},${city.longitude}`
      );
    }
  }

  return rows.join('\n');
};

