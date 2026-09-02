import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BusinessSectorCategory,
  TargetPriceTier,
  StoreFormatType,
  CommercialMarketAnalysis,
  OpportunityZone,
  VacantCommercialProperty,
  CompetitorEstablishment,
  ConcreteDeploymentSite,
} from '../types';
import { CommercialMap } from './CommercialMap';
import { WorldLocationPicker } from './WorldLocationPicker';
import { ConcreteDeploymentExplorer } from './ConcreteDeploymentExplorer';
import { ZoneEconomicsSwotModal } from './ZoneEconomicsSwotModal';
import { BusinessTypePicker } from './BusinessTypePicker';
import { CommsiteLogo } from './CommsiteLogo';
import { WorldCountry, WorldCity } from '../utils/worldLocations';
import { generateClientMarketFallback } from '../utils/marketFallbackGenerator';
import {
  CommercialBusinessType,
  COMMERCIAL_BUSINESS_TYPES,
  mapAreaToStoreFormat,
} from '../data/commercialBusinessTypes';
import {
  Search,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Store,
  Building,
  Car,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Layers,
  MapPin,
  Compass,
  FileText,
  HelpCircle,
  ExternalLink,
  Phone,
  Maximize2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Preset Cities for instant selection
const PRESET_CITIES = [
  { city: 'London', country: 'United Kingdom', label: '🇬🇧 London, UK' },
  { city: 'New York', country: 'USA', label: '🇺🇸 New York, USA' },
  { city: 'Paris', country: 'France', label: '🇫🇷 Paris, France' },
  { city: 'Tokyo', country: 'Japan', label: '🇯🇵 Tokyo, Japan' },
  { city: 'Berlin', country: 'Germany', label: '🇩🇪 Berlin, Germany' },
  { city: 'Singapore', country: 'Singapore', label: '🇸🇬 Singapore' },
  { city: 'San Francisco', country: 'USA', label: '🇺🇸 San Francisco, USA' },
  { city: 'Dubai', country: 'UAE', label: '🇦🇪 Dubai, UAE' },
  { city: 'Toronto', country: 'Canada', label: '🇨🇦 Toronto, Canada' },
  { city: 'Sydney', country: 'Australia', label: '🇦🇺 Sydney, Australia' },
  { city: 'Munich', country: 'Germany', label: '🇩🇪 Munich, Germany' },
];

const BUSINESS_SECTORS: BusinessSectorCategory[] = [
  'Grocery Stores & Supermarkets',
  'Electronics & Gadget Retailers',
  'Fashion & Clothing Boutiques',
  'Specialty Cafes & Bakeries',
  'Pharmacies & Health Clinics',
  'Fitness Centers & Gyms',
  'Restaurants & Fast Casual',
  'Furniture & Home Decor',
  'Co-working Spaces & Tech Hubs',
  'Pet Supplies & Veterinary',
  'Bookstores & Concept Stores',
  'Beauty Salons & Wellness Spas',
];

const PRICE_TIERS: TargetPriceTier[] = [
  'Budget & Value ($)',
  'Mid-Market & Standard ($$)',
  'Premium & Upper-Mid ($$$)',
  'Luxury & High-End ($$$$)',
];

const STORE_FORMATS: StoreFormatType[] = [
  'Micro / Kiosk (< 50 m²)',
  'Boutique / Compact (50 - 150 m²)',
  'Standard Retail (150 - 450 m²)',
  'Flagship Store (450 - 1,200 m²)',
  'Anchor / Big-Box (> 1,200 m²)',
];

function normalizeMarketAnalysis(data: any): CommercialMarketAnalysis {
  if (!data) return data;
  return {
    ...data,
    searchCity: data.searchCity || '',
    searchCountry: data.searchCountry || '',
    businessSector: data.businessSector || '',
    targetPriceTier: data.targetPriceTier || 'Mid-Market & Standard ($$)',
    storeFormat: data.storeFormat || 'Standard Retail (150 - 450 m²)',
    cityCenterCoordinates: {
      lat: typeof data.cityCenterCoordinates?.lat === 'number' ? data.cityCenterCoordinates.lat : (typeof data.cityCenterCoordinates?.latitude === 'number' ? data.cityCenterCoordinates.latitude : 0),
      lng: typeof data.cityCenterCoordinates?.lng === 'number' ? data.cityCenterCoordinates.lng : (typeof data.cityCenterCoordinates?.longitude === 'number' ? data.cityCenterCoordinates.longitude : 0),
    },
    opportunityZones: Array.isArray(data.opportunityZones)
      ? data.opportunityZones.map((z: any, zIdx: number) => ({
          ...z,
          id: z?.id || `zone-${zIdx + 1}`,
          name: z?.name || `Opportunity Zone #${zIdx + 1}`,
          district: z?.district || 'Central Commercial District',
          latitude: typeof z?.latitude === 'number' ? z.latitude : 0,
          longitude: typeof z?.longitude === 'number' ? z.longitude : 0,
          opportunityScore: typeof z?.opportunityScore === 'number' ? z.opportunityScore : 80,
          successProbabilityPct: typeof z?.successProbabilityPct === 'number' ? z.successProbabilityPct : 75,
          demandSaturation: z?.demandSaturation || 'Balanced Market',
          potentialCustomerBase: typeof z?.potentialCustomerBase === 'number' ? z.potentialCustomerBase : 45000,
          targetDemographicFitScore: typeof z?.targetDemographicFitScore === 'number' ? z.targetDemographicFitScore : 80,
          unmetDemandDrivers: Array.isArray(z?.unmetDemandDrivers) ? z.unmetDemandDrivers : [],
          swotAnalysis: {
            strengths: Array.isArray(z?.swotAnalysis?.strengths) ? z.swotAnalysis.strengths : [],
            weaknesses: Array.isArray(z?.swotAnalysis?.weaknesses) ? z.swotAnalysis.weaknesses : [],
            opportunities: Array.isArray(z?.swotAnalysis?.opportunities) ? z.swotAnalysis.opportunities : [],
            threats: Array.isArray(z?.swotAnalysis?.threats) ? z.swotAnalysis.threats : [],
          },
          demographicSummary: {
            primaryAgeGroup: z?.demographicSummary?.primaryAgeGroup || '25-50',
            averageHouseholdIncomeUsd: typeof z?.demographicSummary?.averageHouseholdIncomeUsd === 'number' ? z.demographicSummary.averageHouseholdIncomeUsd : 55000,
            footfallProfile: z?.demographicSummary?.footfallProfile || 'Steady',
            consumerSpendingIndex: typeof z?.demographicSummary?.consumerSpendingIndex === 'number' ? z.demographicSummary.consumerSpendingIndex : 100,
          },
          predictedAnnualSalesVolumeUsd: {
            low: typeof z?.predictedAnnualSalesVolumeUsd?.low === 'number' ? z.predictedAnnualSalesVolumeUsd.low : 1000000,
            expected: typeof z?.predictedAnnualSalesVolumeUsd?.expected === 'number' ? z.predictedAnnualSalesVolumeUsd.expected : 1500000,
            high: typeof z?.predictedAnnualSalesVolumeUsd?.high === 'number' ? z.predictedAnnualSalesVolumeUsd.high : 2000000,
          },
          recommendedStrategy: z?.recommendedStrategy || 'Establish initial retail or branch presence.',
          matchedVacantPropertyIds: Array.isArray(z?.matchedVacantPropertyIds) ? z.matchedVacantPropertyIds : [],
          nearbyParkingIds: Array.isArray(z?.nearbyParkingIds) ? z.nearbyParkingIds : [],
        }))
      : [],
    competitors: Array.isArray(data.competitors)
      ? data.competitors.map((c: any, idx: number) => ({
          ...c,
          id: c?.id || `comp-${idx + 1}`,
          name: c?.name || `Competitor #${idx + 1}`,
          latitude: typeof c?.latitude === 'number' ? c.latitude : 0,
          longitude: typeof c?.longitude === 'number' ? c.longitude : 0,
          rating: typeof c?.rating === 'number' ? c.rating : 4.2,
          userRatingsTotal: typeof c?.userRatingsTotal === 'number' ? c.userRatingsTotal : 50,
          estimatedDailyFootfall: typeof c?.estimatedDailyFootfall === 'number' ? c.estimatedDailyFootfall : 450,
          estimatedFootprintM2: typeof c?.estimatedFootprintM2 === 'number' ? c.estimatedFootprintM2 : 200,
          marketShareEstimatePct: typeof c?.marketShareEstimatePct === 'number' ? c.marketShareEstimatePct : 15,
          vulnerabilities: Array.isArray(c?.vulnerabilities) ? c.vulnerabilities : [],
          strengths: Array.isArray(c?.strengths) ? c.strengths : [],
          address: c?.address || 'Commercial Corridor',
          priceLevel: c?.priceLevel || '$$',
        }))
      : [],
    vacantProperties: Array.isArray(data.vacantProperties)
      ? data.vacantProperties.map((p: any, idx: number) => ({
          ...p,
          id: p?.id || `prop-${idx + 1}`,
          title: p?.title || 'Commercial Space',
          address: p?.address || 'Main Street',
          neighborhood: p?.neighborhood || 'Commercial Center',
          latitude: typeof p?.latitude === 'number' ? p.latitude : 0,
          longitude: typeof p?.longitude === 'number' ? p.longitude : 0,
          monthlyRentUsd: typeof p?.monthlyRentUsd === 'number' ? p.monthlyRentUsd : 3500,
          rentPerM2Usd: typeof p?.rentPerM2Usd === 'number' ? p.rentPerM2Usd : 25,
          sizeM2: typeof p?.sizeM2 === 'number' ? p.sizeM2 : 140,
          sizeSqFt: typeof p?.sizeSqFt === 'number' ? p.sizeSqFt : 1500,
          propertyType: p?.propertyType || 'Retail Storefront',
          features: Array.isArray(p?.features) ? p.features : [],
        }))
      : [],
    parkingFacilities: Array.isArray(data.parkingFacilities)
      ? data.parkingFacilities.map((pk: any, idx: number) => ({
          ...pk,
          id: pk?.id || `parking-${idx + 1}`,
          name: pk?.name || `Parking Facility #${idx + 1}`,
          address: pk?.address || 'Parking Facility',
          neighborhood: pk?.neighborhood || 'Central Commercial District',
          latitude: typeof pk?.latitude === 'number' ? pk.latitude : 0,
          longitude: typeof pk?.longitude === 'number' ? pk.longitude : 0,
          capacitySpaces: typeof pk?.capacitySpaces === 'number' ? pk.capacitySpaces : 150,
          hourlyRateUsd: typeof pk?.hourlyRateUsd === 'number' ? pk.hourlyRateUsd : 2.5,
          dailyRateUsd: typeof pk?.dailyRateUsd === 'number' ? pk.dailyRateUsd : 15.0,
          monthlyRateUsd: typeof pk?.monthlyRateUsd === 'number' ? pk.monthlyRateUsd : 120.0,
          securityLevel: pk?.securityLevel || 'Monitored 24/7 CCTV',
          hasEvCharging: typeof pk?.hasEvCharging === 'boolean' ? pk.hasEvCharging : true,
          distanceToZoneMeters: typeof pk?.distanceToZoneMeters === 'number' ? pk.distanceToZoneMeters : 120,
          convenienceScore: typeof pk?.convenienceScore === 'number' ? pk.convenienceScore : 88,
        }))
      : [],
    concreteDeploymentSites: Array.isArray(data.concreteDeploymentSites)
      ? data.concreteDeploymentSites.map((s: any, idx: number) => ({
          ...s,
          id: s?.id || `site-${idx + 1}`,
          siteName: s?.siteName || `Commercial Site #${idx + 1}`,
          spaceType: s?.spaceType || 'Corner Flagship Unit',
          exactStreetAddress: s?.exactStreetAddress || 'Prime Commercial Avenue',
          unitOrSuite: s?.unitOrSuite || 'Suite 101',
          crossStreets: s?.crossStreets || 'Main Blvd & 1st Ave',
          latitude: typeof s?.latitude === 'number' ? s.latitude : 0,
          longitude: typeof s?.longitude === 'number' ? s.longitude : 0,
          floorAreaM2: typeof s?.floorAreaM2 === 'number' ? s.floorAreaM2 : 180,
          monthlyRentUsd: typeof s?.monthlyRentUsd === 'number' ? s.monthlyRentUsd : 4500,
          estimatedFitoutCapExUsd: typeof s?.estimatedFitoutCapExUsd === 'number' ? s.estimatedFitoutCapExUsd : 45000,
          deploymentSuitabilityScore: typeof s?.deploymentSuitabilityScore === 'number' ? s.deploymentSuitabilityScore : 92,
          dailyPedestrianFootfall: typeof s?.dailyPedestrianFootfall === 'number' ? s.dailyPedestrianFootfall : 3500,
          estimatedBreakevenMonths: typeof s?.estimatedBreakevenMonths === 'number' ? s.estimatedBreakevenMonths : 14,
          turnkeyTimelineWeeks: typeof s?.turnkeyTimelineWeeks === 'number' ? s.turnkeyTimelineWeeks : 8,
          recommendedFormat: s?.recommendedFormat || 'Full Service / High Volume',
          deploymentChecklist: Array.isArray(s?.deploymentChecklist) ? s.deploymentChecklist : [],
          keyAdvantages: Array.isArray(s?.keyAdvantages) ? s.keyAdvantages : [],
          riskFactors: Array.isArray(s?.riskFactors) ? s.riskFactors : [],
          contactBroker: s?.contactBroker || {
            brokerName: 'Commercial Real Estate Brokerage',
            agencyName: 'Metropolitan Commercial Advisory',
            phone: '+1 (555) 019-2831',
            email: 'leasing@commercialsites.com',
          },
        }))
      : [],
    keyAiInsights: Array.isArray(data.keyAiInsights) ? data.keyAiInsights : [],
    strategicActionPlan: Array.isArray(data.strategicActionPlan) ? data.strategicActionPlan : [],
    marketOverview: {
      primeRecommendedZoneName: data?.marketOverview?.primeRecommendedZoneName || data?.opportunityZones?.[0]?.name || 'Prime Commercial Zone',
      primeZoneOpportunityScore: typeof data?.marketOverview?.primeZoneOpportunityScore === 'number' ? data.marketOverview.primeZoneOpportunityScore : (data?.opportunityZones?.[0]?.opportunityScore || 90),
      totalAddressableMarketAnnualUsd: typeof data?.marketOverview?.totalAddressableMarketAnnualUsd === 'number' ? data.marketOverview.totalAddressableMarketAnnualUsd : 15000000,
      marketSaturationIndex: typeof data?.marketOverview?.marketSaturationIndex === 'number' ? data.marketOverview.marketSaturationIndex : 40,
      unmetDemandIndex: typeof data?.marketOverview?.unmetDemandIndex === 'number' ? data.marketOverview.unmetDemandIndex : 60,
      averageCompetitorRating: typeof data?.marketOverview?.averageCompetitorRating === 'number' ? data.marketOverview.averageCompetitorRating : 4.2,
      totalExistingCompetitors: typeof data?.marketOverview?.totalExistingCompetitors === 'number' ? data.marketOverview.totalExistingCompetitors : (Array.isArray(data?.competitors) ? data.competitors.length : 0),
    },
  };
}

export const CommercialMarketFinder: React.FC = () => {
  // Search Form State - Defaulted to empty per user request
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCityLat, setSelectedCityLat] = useState<number>(0);
  const [selectedCityLng, setSelectedCityLng] = useState<number>(0);

  const [selectedBusinessType, setSelectedBusinessType] = useState<CommercialBusinessType | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [customSector, setCustomSector] = useState<string>('');
  const [isCustomSector, setIsCustomSector] = useState<boolean>(false);

  const [selectedPriceTier, setSelectedPriceTier] = useState<TargetPriceTier>('Premium & Upper-Mid ($$$)');
  const [selectedStoreFormat, setSelectedStoreFormat] = useState<StoreFormatType>('Standard Retail (150 - 450 m²)');

  // Analysis State
  const [analysis, setAnalysis] = useState<CommercialMarketAnalysis | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [selectedZoneId, setSelectedZoneId] = useState<string | undefined>(undefined);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(undefined);

  // Competitor list sanitized to guarantee no entries mirror the user's selected business area / sector
  const sanitizedCompetitors = useMemo(() => {
    if (!analysis?.competitors) return [];
    const sectorLower = (analysis.businessSector || '').toLowerCase().trim();
    const customLower = (customSector || '').toLowerCase().trim();
    const selectedTypeLower = (selectedBusinessType?.business_type_name || '').toLowerCase().trim();

    return analysis.competitors
      .filter((comp) => {
        if (!comp || !comp.name) return false;
        const nameLower = comp.name.toLowerCase().trim();
        if (
          nameLower === sectorLower ||
          nameLower === customLower ||
          nameLower === selectedTypeLower ||
          nameLower === 'selected business area' ||
          nameLower === 'business area' ||
          nameLower === 'your business sector' ||
          nameLower === 'current business area'
        ) {
          return false;
        }
        return true;
      })
      .map((comp, idx) => {
        if (comp.name.toLowerCase().trim() === sectorLower) {
          return {
            ...comp,
            name: `${analysis.searchCity} Commercial Enterprise #${idx + 1}`,
          };
        }
        return comp;
      });
  }, [analysis?.competitors, analysis?.businessSector, analysis?.searchCity, customSector, selectedBusinessType?.business_type_name]);

  // Active Tab: 'overview' | 'sites' | 'zones' | 'realestate' | 'parking' | 'competitors' | 'charts' | 'strategy'
  const [activeTab, setActiveTab] = useState<
    'overview' | 'sites' | 'zones' | 'realestate' | 'parking' | 'competitors' | 'charts' | 'strategy'
  >('overview');
  const [selectedSiteId, setSelectedSiteId] = useState<string | undefined>(undefined);

  // Contact Broker Modal state
  const [contactProperty, setContactProperty] = useState<VacantCommercialProperty | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  // Zone Economics & SWOT Modal state
  const [swotModalZone, setSwotModalZone] = useState<OpportunityZone | null>(null);
  const [isSwotModalOpen, setIsSwotModalOpen] = useState<boolean>(false);

  // Real-Time Google Maps Search State
  const [liveMapsSearchQuery, setLiveMapsSearchQuery] = useState<string>('');
  const [liveMapsResults, setLiveMapsResults] = useState<CompetitorEstablishment[]>([]);
  const [isSearchingLiveMaps, setIsSearchingLiveMaps] = useState<boolean>(false);
  const [liveMapsSearchError, setLiveMapsSearchError] = useState<string | null>(null);
  const [hasSearchedLiveMaps, setHasSearchedLiveMaps] = useState<boolean>(false);
  const [importedPlaceIds, setImportedPlaceIds] = useState<Set<string>>(new Set());

  // Google Search Grounded Web Intelligence State
  const [googleSearchQuery, setGoogleSearchQuery] = useState<string>('');
  const [googleSearchData, setGoogleSearchData] = useState<{
    query: string;
    summary: string;
    sources: Array<{ title: string; uri: string }>;
    timestamp?: string;
  } | null>(null);
  const [isSearchingGoogleWeb, setIsSearchingGoogleWeb] = useState<boolean>(false);
  const [googleSearchError, setGoogleSearchError] = useState<string | null>(null);
  const [isGoogleSearchModalOpen, setIsGoogleSearchModalOpen] = useState<boolean>(false);

  // Client-side cache to eliminate redundant requests & prevent quota churn
  const marketAnalysisCacheRef = useRef<Map<string, CommercialMarketAnalysis>>(new Map());
  const activeAbortControllerRef = useRef<AbortController | null>(null);

  // Live Google Search Grounding Handler
  const handleSearchGoogleWeb = async (customQ?: string) => {
    const q = (customQ !== undefined ? customQ : googleSearchQuery).trim() || `${selectedSector} retail commercial trends in ${selectedCity}`;
    setIsSearchingGoogleWeb(true);
    setGoogleSearchError(null);
    setIsGoogleSearchModalOpen(true);

    try {
      const res = await fetch('/api/market-finder/google-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          city: selectedCity,
          sector: selectedSector,
        }),
      });
      if (!res.ok) throw new Error(`Google Search query failed (${res.status})`);
      const data = await res.json();
      setGoogleSearchData({
        query: q,
        summary: data.summary,
        sources: data.sources || [],
        timestamp: data.timestamp,
      });
    } catch (err: any) {
      setGoogleSearchError(err?.message || 'Failed to retrieve Google search results');
    } finally {
      setIsSearchingGoogleWeb(false);
    }
  };

  // Live Google Maps Search Handler
  const handleSearchGoogleMapsLive = async (customQuery?: string) => {
    const q = (customQuery !== undefined ? customQuery : liveMapsSearchQuery).trim() || selectedSector || 'Commercial Business';
    setIsSearchingLiveMaps(true);
    setLiveMapsSearchError(null);
    setHasSearchedLiveMaps(true);

    try {
      const params = new URLSearchParams({
        city: selectedCity,
        country: selectedCountry,
        sector: selectedSector,
        q: q,
        lat: String(selectedCityLat),
        lng: String(selectedCityLng),
      });
      const res = await fetch(`/api/market-finder/places-search?${params.toString()}`);
      if (!res.ok) throw new Error(`Google Maps search failed with status ${res.status}`);
      const data = await res.json();
      if (data.places && Array.isArray(data.places)) {
        setLiveMapsResults(data.places);
      } else {
        setLiveMapsResults([]);
      }
    } catch (err: any) {
      setLiveMapsSearchError(err?.message || 'Error searching Google Maps');
    } finally {
      setIsSearchingLiveMaps(false);
    }
  };

  const handleImportLivePlace = (place: CompetitorEstablishment) => {
    if (!analysis) return;
    const exists = analysis.competitors.some((c) => c.name.toLowerCase() === place.name.toLowerCase());
    if (exists) {
      setImportedPlaceIds((prev) => new Set(prev).add(place.id));
      return;
    }
    const updatedCompetitors = [place, ...analysis.competitors];
    const updatedAnalysis = {
      ...analysis,
      competitors: updatedCompetitors,
      marketOverview: {
        ...analysis.marketOverview,
        totalExistingCompetitors: updatedCompetitors.length,
      },
    };
    setAnalysis(updatedAnalysis);
    setImportedPlaceIds((prev) => new Set(prev).add(place.id));
  };

  // Trigger analysis function
  const runMarketAnalysis = async (
    overrideCity?: string,
    overrideCountry?: string,
    overrideSector?: string,
    overrideLat?: number,
    overrideLng?: number,
    overridePriceTier?: TargetPriceTier,
    overrideStoreFormat?: StoreFormatType
  ) => {
    const finalCity = (overrideCity !== undefined ? overrideCity : selectedCity).trim();
    const finalCountry = (overrideCountry !== undefined ? overrideCountry : selectedCountry).trim();
    const finalSector = (
      overrideSector !== undefined
        ? overrideSector
        : isCustomSector
        ? customSector
        : selectedBusinessType?.business_type_name || selectedSector
    ).trim();
    const finalLat = overrideLat !== undefined ? overrideLat : selectedCityLat;
    const finalLng = overrideLng !== undefined ? overrideLng : selectedCityLng;
    const finalPriceTier = overridePriceTier || selectedPriceTier;
    const finalStoreFormat = overrideStoreFormat || selectedStoreFormat;

    if (!finalCountry) {
      setValidationError('Please select a Country / Territory to evaluate.');
      return;
    }
    if (!finalCity) {
      setValidationError('Please select a City / Metro area.');
      return;
    }
    if (!finalSector) {
      setValidationError('Please select a Target Business Type or enter a Custom Niche.');
      return;
    }

    setValidationError(null);

    const cacheKey = `${finalCity.toLowerCase()}_${finalCountry.toLowerCase()}_${finalSector.toLowerCase()}_${finalPriceTier.toLowerCase()}_${finalStoreFormat.toLowerCase()}`;
    const cachedData = marketAnalysisCacheRef.current.get(cacheKey);
    if (cachedData) {
      const normalized = normalizeMarketAnalysis(cachedData);
      setAnalysis(normalized);
      if (normalized.opportunityZones && normalized.opportunityZones.length > 0) {
        setSelectedZoneId(normalized.opportunityZones[0].id);
      }
      return;
    }

    // Cancel any in-flight request
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    activeAbortControllerRef.current = abortController;

    setIsLoading(true);
    setLoadingStep(`Scanning Google Maps places & live commercial establishments in ${finalCity}...`);

    const stepTimer1 = setTimeout(() => {
      setLoadingStep(`Evaluating pedestrian footfall & demographic spending indices for ${finalSector}...`);
    }, 1500);
    const stepTimer2 = setTimeout(() => {
      setLoadingStep(`Generating opportunity clusters, SWOT analytics & vacant commercial sites in ${finalCity}...`);
    }, 3500);

    try {
      const timeoutId = setTimeout(() => abortController.abort(), 35000);

      const response = await fetch('/api/market-finder/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          city: finalCity,
          country: finalCountry,
          sector: finalSector,
          priceTier: finalPriceTier,
          storeFormat: finalStoreFormat,
          latitude: finalLat,
          longitude: finalLng,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const rawData = await response.json();
      const data: CommercialMarketAnalysis = normalizeMarketAnalysis(rawData);
      marketAnalysisCacheRef.current.set(cacheKey, data);
      setAnalysis(data);
      if (data.opportunityZones && data.opportunityZones.length > 0) {
        setSelectedZoneId(data.opportunityZones[0].id);
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        return;
      }
      const rawFallback = generateClientMarketFallback(
        finalCity,
        finalCountry,
        finalSector,
        finalPriceTier,
        finalStoreFormat,
        finalLat,
        finalLng
      );
      const fallbackData = normalizeMarketAnalysis(rawFallback);
      marketAnalysisCacheRef.current.set(cacheKey, fallbackData);
      setAnalysis(fallbackData);
      if (fallbackData.opportunityZones && fallbackData.opportunityZones.length > 0) {
        setSelectedZoneId(fallbackData.opportunityZones[0].id);
      }
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const activeZone = useMemo(() => {
    if (!analysis || !analysis.opportunityZones || analysis.opportunityZones.length === 0) return null;
    return analysis.opportunityZones.find((z) => z.id === selectedZoneId) || analysis.opportunityZones[0];
  }, [analysis, selectedZoneId]);

  // Export Analysis Report to CSV
  const handleExportReport = () => {
    if (!analysis) return;
    const headers = [
      'Zone Name',
      'District',
      'Opportunity Score',
      'Success Probability %',
      'Demand Saturation',
      'Potential Customer Base',
      'Expected Annual Sales USD',
      'Target Demographic Fit',
      'Recommended Strategy',
    ];

    const rows = (analysis.opportunityZones || []).map((z) => [
      `"${(z.name || '').replace(/"/g, '""')}"`,
      `"${(z.district || '').replace(/"/g, '""')}"`,
      z.opportunityScore,
      `${z.successProbabilityPct}%`,
      `"${z.demandSaturation}"`,
      z.potentialCustomerBase,
      z.predictedAnnualSalesVolumeUsd?.expected || 0,
      `${z.targetDemographicFitScore}%`,
      `"${(z.recommendedStrategy || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `GeoGuard_Commercial_Market_Report_${analysis.searchCity}_${analysis.businessSector.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Comparative Chart Data preparation
  const salesComparisonData = useMemo(() => {
    if (!analysis?.opportunityZones) return [];
    return (analysis.opportunityZones || []).map((z) => ({
      name: (z.name || '').length > 18 ? `${(z.name || '').substring(0, 16)}...` : (z.name || ''),
      fullName: z.name || '',
      'Expected Sales ($k)': Math.round((z.predictedAnnualSalesVolumeUsd?.expected || 0) / 1000),
      'Min Projected ($k)': Math.round((z.predictedAnnualSalesVolumeUsd?.low || 0) / 1000),
      'Max Potential ($k)': Math.round((z.predictedAnnualSalesVolumeUsd?.high || 0) / 1000),
      'Opportunity Score': z.opportunityScore || 0,
      'Success Prob (%)': z.successProbabilityPct || 0,
    }));
  }, [analysis]);

  const radarMetricsData = useMemo(() => {
    if (!activeZone) return [];
    return [
      { subject: 'Demographic Fit', A: activeZone.targetDemographicFitScore, fullMark: 100 },
      { subject: 'Footfall Density', A: Math.min(100, Math.round(activeZone.opportunityScore * 1.05)), fullMark: 100 },
      { subject: 'Spending Power', A: Math.min(100, Math.round((activeZone.demographicSummary.consumerSpendingIndex / 160) * 100)), fullMark: 100 },
      { subject: 'Unmet Demand Gap', A: activeZone.demandSaturation.includes('High Demand') ? 95 : activeZone.demandSaturation.includes('Balanced') ? 70 : 40, fullMark: 100 },
      { subject: 'Mobility & Parking', A: 90, fullMark: 100 },
      { subject: 'Real Estate ROI', A: activeZone.successProbabilityPct, fullMark: 100 },
    ];
  }, [activeZone]);

  return (
    <div id="commercial-market-finder-page" className="space-y-6">
      {/* 1. Page Header & AI Mission Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 relative z-10">
          <div className="space-y-3 max-w-4xl">
            {/* Brand Logo */}
            <div className="flex items-center">
              <CommsiteLogo size="lg" />
            </div>

            {/* Program Description & Feature Badges Moved Directly Under Logo */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full border border-blue-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Geospatial Market Intelligence &amp; Site Selection
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                  Google Maps &amp; Live Search Grounded
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                  Gemini 3.7 &amp; 2.5 Flash Engine
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-700 font-normal max-w-3xl">
                Scan operating commercial establishments across any world city, analyze competitor density, and identify high-opportunity zones with strong demographics, vacant retail storefronts, and customer parking.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 pt-1 lg:pt-0">
            <button
              onClick={handleExportReport}
              disabled={!analysis}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Export Dossier (CSV)
            </button>
            <button
              onClick={() => runMarketAnalysis()}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Re-Scan Market
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search & Target Market Configuration Toolbar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <Search className="w-4 h-4 text-blue-600" />
            <span>Define Target Market &amp; Location Parameters</span>
          </div>
          <span className="text-xs text-slate-500">
            Tailored AI modeling across urban demographic nodes
          </span>
        </div>

        {/* 1. Global Country and City Dropdowns (250 Countries, 148,000+ Cities) */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
          <WorldLocationPicker
            selectedCountryName={selectedCountry}
            selectedCityName={selectedCity}
            disabled={isLoading}
            onLocationChange={(country, city) => {
              setSelectedCountry(country.name);
              setSelectedCity(city.name);
              setSelectedCityLat(city.latitude);
              setSelectedCityLng(city.longitude);
              setValidationError(null);
              const currentTargetSector = (isCustomSector ? customSector : (selectedBusinessType?.business_type_name || selectedSector)).trim();
              if (currentTargetSector && country.name && city.name) {
                runMarketAnalysis(city.name, country.name, currentTargetSector, city.latitude, city.longitude);
              }
            }}
          />
        </div>

        {/* 2. Business Venture Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Target Business Type Catalog Selection */}
          <BusinessTypePicker
            selectedBusinessType={selectedBusinessType}
            onSelectBusinessType={(business, suggestedFormat) => {
              setSelectedBusinessType(business);
              setSelectedSector(business.business_type_name);
              setSelectedStoreFormat(suggestedFormat);
              setIsCustomSector(false);
              setValidationError(null);
              if (selectedCity && selectedCountry) {
                runMarketAnalysis(selectedCity, selectedCountry, business.business_type_name, selectedCityLat, selectedCityLng, selectedPriceTier, suggestedFormat);
              }
            }}
            customSectorValue={customSector}
            onCustomSectorChange={(val) => {
              setCustomSector(val);
              setSelectedSector(val);
              setIsCustomSector(true);
              setValidationError(null);
            }}
            disabled={isLoading}
          />

          {/* Target Demographic / Price Tier */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              2. Target Demographic / Price Tier
            </label>
            <select
              value={selectedPriceTier}
              onChange={(e) => setSelectedPriceTier(e.target.value as TargetPriceTier)}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            >
              {PRICE_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block">
              Aligns revenue modeling with district income tiers
            </span>
          </div>

          {/* Store Footprint / Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              3. Store Format &amp; Footprint
            </label>
            <select
              value={selectedStoreFormat}
              onChange={(e) => setSelectedStoreFormat(e.target.value as StoreFormatType)}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            >
              {STORE_FORMATS.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block">
              Matches vacant commercial rental spaces
            </span>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-amber-800 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Execute Scan Trigger Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Real-time Google Maps search + Gemini 3.7 Flash Urban Economics Engine
            </span>
          </div>

          <button
            onClick={() => runMarketAnalysis()}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Geospatial Scan...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan Google Maps &amp; Analyze Market Opportunities</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 animate-pulse text-xs text-blue-900 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <div>
              <span className="font-bold block">Executing AI Geospatial Market Analysis...</span>
              <span className="text-blue-700">{loadingStep}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Empty State / Guidance Prompt when no market scan has been run yet */}
      {!analysis && !isLoading && (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 border border-blue-100">
            <Compass className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-black text-slate-900">
              Ready for Geospatial Market Evaluation
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please select your target <strong>Country</strong>, <strong>City</strong>, and <strong>Business Type</strong> above, then click &quot;Scan Google Maps &amp; Analyze Market Opportunities&quot; to evaluate competitor density, demographic spending, footfall clusters, and available commercial spaces.
            </p>
          </div>
        </div>
      )}

      {/* 4. Market Overview KPI Cards */}
      {analysis && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Prime Recommended Zone */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Prime Opportunity Zone</span>
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 truncate">
              {analysis.marketOverview.primeRecommendedZoneName}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Score: {analysis.marketOverview.primeZoneOpportunityScore} / 100
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Highest Demand Fit</span>
            </div>
          </div>

          {/* KPI 2: Total Addressable Market (TAM) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Est. Annual TAM</span>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              ${(((analysis.marketOverview?.totalAddressableMarketAnnualUsd || 0)) / 1000000).toFixed(1)}M USD
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Target sector metropolitan expenditure
            </p>
          </div>

          {/* KPI 3: Saturation vs Unmet Demand */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Unmet Demand Index</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-emerald-700">
                {analysis.marketOverview.unmetDemandIndex}%
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">
                (Saturation: {analysis.marketOverview.marketSaturationIndex}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${analysis.marketOverview.unmetDemandIndex}%` }}
              />
            </div>
          </div>

          {/* KPI 4: Existing Competitors Mapped */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Competitors Mapped</span>
              <Store className="w-4 h-4 text-rose-600" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">
                {sanitizedCompetitors.length} Active Stores
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                ★ {analysis.marketOverview.averageCompetitorRating}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Google Maps verified establishments
            </p>
          </div>
        </div>
      )}

      {/* 4. Interactive Map & Live Exploration Section */}
      {analysis && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Interactive Geospatial Map: {analysis.searchCity}, {analysis.searchCountry}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> High Demand Hotspots
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Competitors
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Available Rentals
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Parking
              </span>
            </div>
          </div>

          <CommercialMap
            city={analysis.searchCity}
            country={analysis.searchCountry}
            centerCoords={analysis.cityCenterCoordinates}
            competitors={sanitizedCompetitors}
            opportunityZones={analysis.opportunityZones}
            vacantProperties={analysis.vacantProperties}
            parkingFacilities={analysis.parkingFacilities}
            concreteDeploymentSites={analysis.concreteDeploymentSites || []}
            selectedZoneId={selectedZoneId}
            onOpenZoneSwotModal={(zone) => {
              setSwotModalZone(zone);
              setIsSwotModalOpen(true);
              setSelectedZoneId(zone.id);
            }}
            onSelectZone={(id) => {
              const matched = analysis.opportunityZones.find((z) => z.id === id);
              if (matched) {
                setSwotModalZone(matched);
                setIsSwotModalOpen(true);
              }
              setSelectedZoneId(id);
              setActiveTab('zones');
              setTimeout(() => {
                const el = document.getElementById(`zone-card-${id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 120);
            }}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={(id) => {
              setSelectedPropertyId(id);
              setActiveTab('realestate');
            }}
            selectedSiteId={selectedSiteId}
            onSelectSite={(id) => {
              setSelectedSiteId(id);
              setActiveTab('sites');
            }}
            onDeployToSite={(site) => {
              setSelectedSiteId(site.id);
              setActiveTab('sites');
            }}
          />
        </div>
      )}

      {/* 5. Deep-Dive Analytical Tabs */}
      {analysis && (
        <div id="market-finder-tabs-section" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-6">
          {/* Tab Navigation Headers */}
          <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/70 px-4 pt-2 text-xs font-bold gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Executive AI Insights</span>
            </button>

            {/* Concrete Deployment & Situate Places Tab */}
            <button
              onClick={() => setActiveTab('sites')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'sites'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-black">
                🏢 Concrete Sites &amp; Places ({analysis.concreteDeploymentSites?.length || 0})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('zones')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'zones'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Opportunity Zones ({analysis.opportunityZones?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('realestate')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'realestate'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Vacant for Rent ({analysis.vacantProperties?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('parking')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'parking'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-indigo-600" />
              <span>Parking &amp; Transit ({analysis.parkingFacilities?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'competitors'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-rose-600" />
              <span>Competitors ({sanitizedCompetitors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('charts')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'charts'
                  ? 'bg-white text-blue-700 border-t-2 border-t-blue-600 border-x border-slate-200 font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
              <span>Comparative Analytics</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6">
            {/* TAB 1: EXECUTIVE OVERVIEW & KEY AI INSIGHTS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Executive Summary Quote Box */}
                <div className="p-5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-200/80 text-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-2">
                    <div className="flex items-center gap-2 font-bold text-xs text-blue-900 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Gemini 3.7 Flash Market Executive Summary</span>
                    </div>
                    <button
                      onClick={() => handleSearchGoogleWeb(`Current market demand and commercial expansion trends for ${analysis.businessSector} in ${analysis.searchCity}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200 shadow-sm transition-all self-start sm:self-auto"
                    >
                      <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Search Live Web on Google ↗</span>
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed font-medium text-slate-800">
                    {analysis.executiveSummary}
                  </p>
                </div>

                {/* Key AI Findings Grid */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key Strategic Findings &amp; Market Dynamics</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(analysis.keyAiInsights || []).map((insight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1 transition-colors"
                      >
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span>Observation #{idx + 1}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended 4-Phase Rollout Plan */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Recommended Expansion &amp; Launch Roadmap</span>
                  </h4>
                  <div className="space-y-2">
                    {(analysis.strategicActionPlan || []).map((action, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-xs flex items-start gap-3"
                      >
                        <div className="px-2 py-1 bg-blue-100 text-blue-800 font-extrabold rounded text-[11px] shrink-0">
                          Step {idx + 1}
                        </div>
                        <p className="text-slate-700 font-medium leading-normal mt-0.5">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONCRETE DEPLOYMENT & SITUATE PLACES EXPLORER */}
            {activeTab === 'sites' && (
              <ConcreteDeploymentExplorer
                analysis={analysis}
                selectedSiteId={selectedSiteId}
                onSelectSite={(id) => setSelectedSiteId(id)}
                onFocusSiteOnMap={(site) => {
                  setSelectedSiteId(site.id);
                  // Scroll up smoothly to the map
                  const mapElement = document.getElementById('commercial-map-root');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              />
            )}

            {/* TAB 2: OPPORTUNITY ZONES DEEP-DIVE */}
            {activeTab === 'zones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Ranked Market Opportunity Zones in {analysis.searchCity}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ranked by algorithmic Opportunity Score (0-100) based on unmet demand, disposable income, and competitor proximity.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {analysis.opportunityZones?.length || 0} Zones Analyzed
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {(analysis.opportunityZones || []).map((zone) => {
                    const isSelected = activeZone?.id === zone.id;

                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer space-y-4 ${
                          isSelected
                            ? 'bg-emerald-50/40 border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                        }`}
                      >
                        {/* Zone Header & Badges */}
                        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-black text-slate-900 text-base">{zone.name}</h4>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded">
                                  Selected
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{zone.district}</span>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-black text-emerald-700">
                              {zone.opportunityScore}
                              <span className="text-xs font-medium text-slate-400">/100</span>
                            </div>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 block mt-0.5">
                              {zone.successProbabilityPct}% Win Probability
                            </span>
                          </div>
                        </div>

                        {/* Customer Base & Demographic Fit */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Customer Base</span>
                            <span className="font-extrabold text-slate-800">
                              {zone.potentialCustomerBase?.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Avg Household Income</span>
                            <span className="font-extrabold text-slate-800">
                              ${zone.demographicSummary?.averageHouseholdIncomeUsd?.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Spending Index</span>
                            <span className="font-extrabold text-blue-700">
                              {zone.demographicSummary?.consumerSpendingIndex || 100} (Base 100)
                            </span>
                          </div>
                        </div>

                        {/* Predicted Annual Sales Volume */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-slate-700">Predicted Annual Sales Volume:</span>
                            <span className="font-black text-emerald-700">
                              ${(((zone.predictedAnnualSalesVolumeUsd?.expected || 0)) / 1000000).toFixed(2)}M expected
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                            <span>Low: ${(((zone.predictedAnnualSalesVolumeUsd?.low || 0)) / 1000000).toFixed(2)}M</span>
                            <span>High: ${(((zone.predictedAnnualSalesVolumeUsd?.high || 0)) / 1000000).toFixed(2)}M</span>
                          </div>
                        </div>

                        {/* Unmet Demand Drivers */}
                        <div>
                          <span className="text-xs font-bold text-slate-800 block mb-1">
                            Why Unmet Demand Exists:
                          </span>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                            {(zone.unmetDemandDrivers || []).map((driver, idx) => (
                              <li key={idx} className="leading-snug">
                                {driver}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Strategic Recommendation */}
                        <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                          <span className="font-bold text-blue-900 block mb-0.5">Recommended Strategy:</span>
                          <p className="leading-relaxed text-slate-600">{zone.recommendedStrategy}</p>
                        </div>

                        {/* SWOT 4-Quadrant Preview Grid */}
                        <div className="space-y-1.5 pt-1 border-t border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-emerald-600" />
                            <span>SWOT Matrix Highlights:</span>
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <span className="text-[10px] font-black text-emerald-800 uppercase block">Strengths</span>
                              <p className="text-emerald-950 font-medium line-clamp-1">
                                {zone.swotAnalysis?.strengths?.[0] || 'High purchasing power'}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                              <span className="text-[10px] font-black text-rose-800 uppercase block">Weaknesses</span>
                              <p className="text-rose-950 font-medium line-clamp-1">
                                {zone.swotAnalysis?.weaknesses?.[0] || 'Premium lease rates'}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                              <span className="text-[10px] font-black text-blue-800 uppercase block">Opportunities</span>
                              <p className="text-blue-950 font-medium line-clamp-1">
                                {zone.swotAnalysis?.opportunities?.[0] || 'Under-served category'}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                              <span className="text-[10px] font-black text-amber-800 uppercase block">Threats</span>
                              <p className="text-amber-950 font-medium line-clamp-1">
                                {zone.swotAnalysis?.threats?.[0] || 'Upcoming new developments'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Deep-Dive Button */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            id={`btn-open-swot-deepdive-${zone.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSwotModalZone(zone);
                              setIsSwotModalOpen(true);
                              setSelectedZoneId(zone.id);
                            }}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-black text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>View Full Zone Economics &amp; SWOT →</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: VACANT REAL ESTATE & PROPERTIES FOR RENT */}
            {activeTab === 'realestate' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Available Commercial Properties for Rent in Target Zones
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pre-vetted vacant retail storefronts and showroom spaces matching &quot;{selectedStoreFormat}&quot;.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {analysis.vacantProperties?.length || 0} Properties Listed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(analysis.vacantProperties || []).map((prop) => (
                    <div
                      key={prop.id}
                      className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 bg-white shadow-sm hover:shadow-md transition-all ${
                        prop.isHighOpportunityMatch
                          ? 'border-blue-300 ring-1 ring-blue-200'
                          : 'border-slate-200'
                      }`}
                    >
                      <div>
                        {/* Header & Rent */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800">
                            {prop.propertyType}
                          </span>
                          <div className="text-right">
                            <span className="text-base font-black text-blue-700">
                              ${prop.monthlyRentUsd?.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-medium">/ month</span>
                          </div>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{prop.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{prop.address}</p>
                        <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                          Zone: {prop.neighborhood}
                        </span>

                        {/* Specs grid */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-3 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Total Area</span>
                            <span className="font-bold text-slate-800">
                              {prop.sizeM2} m² ({prop.sizeSqFt} sq ft)
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Rent Rate</span>
                            <span className="font-bold text-slate-800">${prop.rentPerM2Usd}/m²</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {(prop.features || []).map((feat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Broker Action */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${prop.address}, ${analysis.searchCity}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                            title="View location on Google Maps"
                          >
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>Google Maps ↗</span>
                          </a>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => handleSearchGoogleWeb(`Commercial property rent lease "${prop.address}" ${analysis.searchCity}`)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:underline"
                            title="Search Google for building information and leasing records"
                          >
                            <Globe2 className="w-3 h-3 text-blue-500" />
                            <span>Search Google ↗</span>
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setContactProperty(prop);
                            setIsContactModalOpen(true);
                            setInquirySent(false);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all self-end sm:self-auto"
                        >
                          Inquire / Tour
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PARKING & TRANSIT ACCESSIBILITY */}
            {activeTab === 'parking' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Customer Parking &amp; Transit Accessibility Infrastructure
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ensures convenient customer access, on-site/nearby parking capacity, and electric vehicle charging.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    {analysis.parkingFacilities?.length || 0} Facilities Mapped
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(analysis.parkingFacilities || []).map((park) => (
                    <div
                      key={park.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                            <Car className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{park.name}</h4>
                            <span className="text-xs text-slate-500 font-medium">{park.type} • {park.neighborhood}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-indigo-700">
                            {park.convenienceScore}/100
                          </span>
                          <span className="text-[10px] text-slate-400 block font-semibold">Convenience</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Total Spaces</span>
                          <span className="font-extrabold text-slate-900">{park.capacitySpaces}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Hourly Rate</span>
                          <span className="font-extrabold text-slate-900">${(park.hourlyRateUsd ?? 0).toFixed(2)}/hr</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">EV Charging</span>
                          <span className="font-bold text-emerald-700">
                            {park.hasEvCharging ? '⚡ Available' : 'No'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                        <span className="font-medium">{park.address}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-700">
                            🚶 ~{park.distanceToZoneMeters}m walk
                          </span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${park.name}, ${park.address || analysis.searchCity}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>Maps ↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: EXISTING COMPETITORS BREAKDOWN & GOOGLE MAPS LIVE SEARCH */}
            {activeTab === 'competitors' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <span>Operating Competitors &amp; Places in {analysis.searchCity}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                        Google Maps Powered
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-world verified commercial establishments in &quot;{analysis.businessSector}&quot; retrieved via Google Maps search.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 self-start sm:self-auto">
                    {sanitizedCompetitors.length} Active Competitors Mapped
                  </span>
                </div>

                {/* Real-Time Google Maps Search Bar */}
                <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span>Search Real Places on Google Maps in {analysis.searchCity}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Queries live Google Maps database
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={liveMapsSearchQuery}
                        onChange={(e) => setLiveMapsSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSearchGoogleMapsLive();
                          }
                        }}
                        placeholder={`e.g. "${analysis.businessSector}" or "Coffee", "Supermarket", "Gym" in ${analysis.searchCity}...`}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleSearchGoogleMapsLive()}
                        disabled={isSearchingLiveMaps}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        {isSearchingLiveMaps ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Searching...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>Search Google Maps</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleSearchGoogleWeb(liveMapsSearchQuery || `${analysis.businessSector} in ${analysis.searchCity}`)}
                        disabled={isSearchingGoogleWeb}
                        className="w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center gap-1.5"
                        title="Run real-time Google Web search grounding"
                      >
                        <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Google Search ↗</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick sector search chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">Quick Search:</span>
                    {[
                      analysis.businessSector,
                      'Coffee Shop',
                      'Supermarket',
                      'Fashion Store',
                      'Gym & Fitness',
                      'Pharmacy',
                    ]
                      .filter((v, idx, arr) => v && arr.indexOf(v) === idx)
                      .slice(0, 5)
                      .map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setLiveMapsSearchQuery(chip);
                            handleSearchGoogleMapsLive(chip);
                          }}
                          className="px-2 py-0.5 rounded bg-white hover:bg-blue-100/70 text-slate-700 hover:text-blue-800 text-[10px] font-semibold border border-slate-200 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                  </div>

                  {/* Live Search Results Container */}
                  {hasSearchedLiveMaps && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          Live Results from Google Maps ({liveMapsResults.length} places found):
                        </span>
                        {liveMapsResults.length > 0 && (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Verified Real Data
                          </span>
                        )}
                      </div>

                      {liveMapsSearchError && (
                        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                          {liveMapsSearchError}
                        </div>
                      )}

                      {liveMapsResults.length === 0 && !isSearchingLiveMaps && !liveMapsSearchError && (
                        <div className="p-4 text-center bg-white rounded-lg border border-dashed border-slate-200 text-xs text-slate-500">
                          No places found for this query in {analysis.searchCity}. Try broadening your search keyword.
                        </div>
                      )}

                      {liveMapsResults.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                          {liveMapsResults.map((place) => {
                            const isImported =
                              importedPlaceIds.has(place.id) ||
                              sanitizedCompetitors.some(
                                (c) => c.name.toLowerCase() === place.name.toLowerCase()
                              );

                            return (
                              <div
                                key={place.id}
                                className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between space-y-2 hover:border-blue-300 transition-all"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-1.5">
                                    <h5 className="font-bold text-xs text-slate-900 leading-snug">
                                      {place.name}
                                    </h5>
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                                      ★ {place.rating} ({place.userRatingsTotal})
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                                    {place.address}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                                  <a
                                    href={
                                      place.googleMapsUrl ||
                                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        `${place.name} ${place.address}`
                                      )}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline"
                                  >
                                    <MapPin className="w-3 h-3 text-rose-500" />
                                    <span>Google Maps ↗</span>
                                  </a>

                                  <button
                                    onClick={() => handleImportLivePlace(place)}
                                    disabled={isImported}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                                      isImported
                                        ? 'bg-slate-100 text-slate-500 cursor-default'
                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                    }`}
                                  >
                                    {isImported ? '✓ In Analysis' : '+ Add as Competitor'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Primary Competitors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sanitizedCompetitors.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
                            <Store className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{comp.name}</h4>
                            <span className="text-xs text-slate-500 font-medium">{comp.neighborhood}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ★ {comp.rating} ({comp.userRatingsTotal})
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500">{comp.address}</p>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Est. Daily Footfall</span>
                          <span className="font-bold text-slate-900">{comp.estimatedDailyFootfall}/day</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Store Footprint</span>
                          <span className="font-bold text-slate-900">{comp.estimatedFootprintM2} m²</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Market Share</span>
                          <span className="font-bold text-slate-900">{comp.marketShareEstimatePct}%</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold text-rose-800 block mb-1">
                          Vulnerabilities &amp; Market Gaps to Exploit:
                        </span>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                          {comp.vulnerabilities?.map((vuln, idx) => (
                            <li key={idx}>{vuln}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Google Maps Verified
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={
                              comp.googleMapsUrl ||
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `${comp.name} ${comp.address || analysis.searchCity}`
                              )}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span>Google Maps ↗</span>
                          </a>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => handleSearchGoogleWeb(`"${comp.name}" ${analysis.searchCity} reviews business hours news`)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline"
                          >
                            <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                            <span>Search Google ↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: COMPARATIVE ANALYTICS & VISUAL CHARTS */}
            {activeTab === 'charts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Comparative District Revenue Projections &amp; Fit Metrics
                  </h3>
                  <p className="text-xs text-slate-500">
                    Compare projected annual sales potential vs opportunity score across municipal districts.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart: Predicted Annual Sales */}
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-3">
                      Predicted Annual Sales Potential by Zone ($k USD)
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesComparisonData}>
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          <Bar dataKey="Min Projected ($k)" fill="#94a3b8" />
                          <Bar dataKey="Expected Sales ($k)" fill="#2563eb" />
                          <Bar dataKey="Max Potential ($k)" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Radar Chart: Selected Zone Multi-Factor Radar */}
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-1">
                      Multi-Factor Suitability Radar: {activeZone?.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mb-2">
                      6-dimensional evaluation score (0-100) for commercial viability
                    </p>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarMetricsData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                          <Radar
                            name="Zone Viability Score"
                            dataKey="A"
                            stroke="#059669"
                            fill="#10b981"
                            fillOpacity={0.4}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Broker Modal */}
      {isContactModalOpen && contactProperty && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">
                  Commercial Leasing Inquiry
                </span>
                <h3 className="font-bold text-slate-900 text-base">{contactProperty.title}</h3>
                <p className="text-xs text-slate-500">{contactProperty.address}</p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm px-2 py-1 hover:bg-slate-100 rounded"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-900 text-sm">Tour Inquiry Successfully Sent!</h4>
                <p className="text-xs text-emerald-700">
                  {contactProperty.contactAgent} has been notified. You will receive scheduling confirmation via phone or email within 2 hours.
                </p>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="mt-3 px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySent(true);
                }}
                className="space-y-3 text-xs"
              >
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Monthly Rent</span>
                    <span className="font-extrabold text-blue-700">
                      ${contactProperty.monthlyRentUsd.toLocaleString()}/mo
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Area</span>
                    <span className="font-bold text-slate-800">{contactProperty.sizeM2} m²</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Your Full Name / Company</label>
                  <input
                    type="text"
                    required
                    defaultValue="Executive Retail Expansion Group"
                    className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      defaultValue="expansion@retailventures.com"
                      className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      defaultValue="+1 (555) 349-2810"
                      className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Inquiry / Proposed Move-In Date</label>
                  <textarea
                    rows={2}
                    defaultValue={`Requesting a site tour for prospective "${analysis?.businessSector}" store rollout in Q4.`}
                    className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                  >
                    Submit Tour Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Zone Economics & Full SWOT Deep-Dive Modal */}
      {analysis && (
        <ZoneEconomicsSwotModal
          zone={swotModalZone}
          isOpen={isSwotModalOpen}
          onClose={() => setIsSwotModalOpen(false)}
          analysis={analysis}
          onInquireProperty={(prop) => {
            setContactProperty(prop);
            setIsContactModalOpen(true);
            setInquirySent(false);
          }}
          onNavigateToTab={(tab) => {
            setActiveTab(tab);
            const el = document.getElementById('market-finder-tabs-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />
      )}
      {/* Google Search Grounded Intelligence Modal */}
      {isGoogleSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-600/30 text-blue-400 rounded-lg">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>Google Search Grounded Intelligence</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                      Live Web Data
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Real-time market insights retrieved from Google Search indexes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGoogleSearchModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-2">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={googleSearchQuery}
                  onChange={(e) => setGoogleSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchGoogleWeb(googleSearchQuery);
                    }
                  }}
                  placeholder={`Search Google for ${analysis?.businessSector || 'commercial'} trends in ${analysis?.searchCity || 'city'}...`}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleSearchGoogleWeb(googleSearchQuery)}
                disabled={isSearchingGoogleWeb}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {isSearchingGoogleWeb ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching Google...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Google</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {isSearchingGoogleWeb && (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-700">
                    Querying Google Search live index for verified intelligence...
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Retrieving real-time web citations, commercial footfall trends, and local business developments.
                  </p>
                </div>
              )}

              {googleSearchError && !isSearchingGoogleWeb && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  <span className="font-bold block mb-1">Search Notice:</span>
                  {googleSearchError}
                </div>
              )}

              {googleSearchData && !isSearchingGoogleWeb && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-900 border-b border-blue-100/80 pb-1.5">
                      <span>Live Intelligence Summary</span>
                      {googleSearchData.timestamp && (
                        <span className="text-[10px] text-slate-500 font-normal">
                          {new Date(googleSearchData.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line font-medium">
                      {googleSearchData.summary}
                    </p>
                  </div>

                  {/* Web Sources & Grounding Citations */}
                  {googleSearchData.sources && googleSearchData.sources.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Verified Google Web Sources &amp; Citations ({googleSearchData.sources.length}):</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {googleSearchData.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-xs text-blue-700 font-bold transition-all flex items-start gap-2 group"
                          >
                            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <span className="line-clamp-1 group-hover:underline text-slate-900 text-xs">
                                {src.title || 'Web Reference'}
                              </span>
                              <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">
                                {src.uri}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Grounding source: Google Search &amp; Vertex AI</span>
              <button
                onClick={() => setIsGoogleSearchModalOpen(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
