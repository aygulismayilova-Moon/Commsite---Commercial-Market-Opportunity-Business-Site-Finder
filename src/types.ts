export const STANDARD_PLACE_CATEGORIES = Array.from(
  new Set([
    'Urban Construction',
    'Coastal Monitoring',
    'Traffic & Infrastructure',
    'Forest & Vegetation',
    'Urban Development',
    'Public Infrastructure',
    'Environmental Monitoring',
    'Industrial Site',
    'Custom Location',
  ])
);

export interface PlaceItem {
  id: string;
  place_name: string;
  area: string;
  street: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  category?: string;
}

export interface MapSnapshot {
  id: string;
  placeId: string;
  capturedAt: string; // ISO string or timestamp
  dateLabel: string;  // e.g. "Aug 9, 2026 - 10:15 AM"
  isoDate: string;    // e.g. "2026-08-09"
  imageUrl: string;   // base64 data URL
  zoomLevel: number;
  mapType: 'satellite' | 'roadmap' | 'hybrid' | 'terrain';
  notes?: string;
  lat: number;
  lng: number;
  eventOverlay?: string; // Optional tag if generated with simulated event
}

export interface ChangeAnalysisResult {
  changeDetected: boolean;
  changeType: 'Building Construction' | 'Car Accident' | 'Nature Event' | 'Tree Cutting' | 'Infrastructure Work' | 'Landscaping' | 'No Significant Change' | string;
  confidenceScore: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical' | 'None' | string;
  summary: string;
  detailedAnalysis: string;
  changedAreas: string[];
  actionableRecommendations: string[];
}

export type GeminiChangeAnalysisResult = ChangeAnalysisResult;
export type AccidentItem = AccidentEvent;


export type AccidentType =
  | 'Car Accident'
  | 'Nature Accident'
  | 'Tree Cutting'
  | 'New Building Construction'
  | 'Structural Damage'
  | 'Heavy Rain / Flood'
  | 'Severe Wind'
  | 'Animal Event'
  | 'Other';

export interface AccidentEvent {
  id: string;
  placeId: string;
  placeName: string;
  cityName: string;
  accidentType: AccidentType;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  timestamp: number;
  dateLabel: string;
  locationCoordinates: { lat: number; lng: number };
  status: 'Reported' | 'Verified' | 'Resolved' | 'Alarm Active';
  alarmTriggered?: boolean;
  imageUrl?: string;
}

export interface IncidentAlarm {
  id: string;
  placeId?: string;
  cityName?: string;
  accidentType: AccidentType | 'All';
  severityThreshold: 'Low' | 'Medium' | 'High' | 'Critical';
  isMuted: boolean;
  audioAlertEnabled: boolean;
  createdDate: string;
  lastTriggered?: string;
  label: string;
}

export interface HeatmapPoint {
  id: string;
  xPercent: number;
  yPercent: number;
  lat: number;
  lng: number;
  intensity: number;
  radiusMeters: number;
  changeType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface HeatmapOverlayResult {
  placeId: string;
  snapshotAId: string;
  snapshotBId: string;
  snapshotADate: string;
  snapshotBDate: string;
  generatedAt: string;
  overallSummary: string;
  changeDetected: boolean;
  maxIntensity: number;
  points: HeatmapPoint[];
}

export interface FilterState {
  searchQuery: string;
  area: string;
  city: string;
  country: string;
  category: string;
}

export interface CommercialBusinessType {
  business_id: string;
  business_type_name: string;
  online_or_onsite: 'Hybrid' | 'Onsite' | 'Online' | string;
  place: string;
  approximately_area: string;
  popularity: 'Low' | 'Medium' | 'High' | 'Very High' | string;
}

export type BusinessSectorCategory =
  | 'Grocery Stores & Supermarkets'
  | 'Electronics & Gadget Retailers'
  | 'Fashion & Clothing Boutiques'
  | 'Specialty Cafes & Bakeries'
  | 'Pharmacies & Health Clinics'
  | 'Fitness Centers & Gyms'
  | 'Restaurants & Fast Casual'
  | 'Furniture & Home Decor'
  | 'Co-working Spaces & Tech Hubs'
  | 'Pet Supplies & Veterinary'
  | 'Bookstores & Concept Stores'
  | 'Beauty Salons & Wellness Spas'
  | string;

export type TargetPriceTier =
  | 'Budget & Value ($)'
  | 'Mid-Market & Standard ($$)'
  | 'Premium & Upper-Mid ($$$)'
  | 'Luxury & High-End ($$$$)';

export type StoreFormatType =
  | 'Micro / Kiosk (< 50 m²)'
  | 'Boutique / Compact (50 - 150 m²)'
  | 'Standard Retail (150 - 450 m²)'
  | 'Flagship Store (450 - 1,200 m²)'
  | 'Anchor / Big-Box (> 1,200 m²)';

export interface CompetitorEstablishment {
  id: string;
  name: string;
  sector: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  rating: number;
  userRatingsTotal: number;
  priceLevel: number; // 1 to 4
  estimatedFootprintM2: number;
  estimatedDailyFootfall: number;
  marketShareEstimatePct: number;
  strengths: string[];
  vulnerabilities: string[];
  googleMapsUrl?: string;
  placeId?: string;
  phoneNumber?: string;
  isOpenNow?: boolean;
}

export interface VacantCommercialProperty {
  id: string;
  title: string;
  buildingName?: string;
  address: string;
  crossStreets?: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  sizeM2: number;
  sizeSqFt: number;
  monthlyRentUsd: number;
  rentPerM2Usd: number;
  propertyType: 'Street Retail Front' | 'Shopping Mall Unit' | 'Corner Showcase' | 'Standalone Commercial' | 'Modern Mixed-Use';
  zoningPermits: string[];
  features: string[];
  contactAgent: string;
  phone: string;
  isHighOpportunityMatch: boolean;
  deploymentScore?: number;
  estimatedDailyFootfall?: number;
  estimatedFitoutCostUsd?: number;
  estimatedBreakevenMonths?: number;
  googleMapsUrl?: string;
}

export interface ConcreteDeploymentSite {
  id: string;
  buildingName: string;
  unitOrSuite: string;
  exactStreetAddress: string;
  crossStreets: string;
  neighborhood: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  deploymentSuitabilityScore: number; // 0 to 100
  suggestedBusinessConcept: string;
  spaceType: string;
  floorAreaM2: number;
  floorAreaSqFt: number;
  monthlyRentUsd: number;
  estimatedFitoutCapExUsd: number;
  estimatedBreakevenMonths: number;
  dailyPedestrianFootfall: number;
  footfallPeakHours: string;
  targetAudienceFitPct: number;
  frontageWidthMeters: number;
  ceilingHeightMeters: number;
  availablePowerKw: number;
  hvacStatus: string;
  loadingAccess: string;
  signagePermitStatus: string;
  zoningClassification: string;
  turnkeyTimelineWeeks: number;
  contactBroker: {
    agencyName: string;
    agentName: string;
    phone: string;
    email: string;
  };
  deploymentChecklist: string[];
  keyAdvantages: string[];
  googleMapsUrl?: string;
}

export interface ParkingFacility {
  id: string;
  name: string;
  type: 'Multi-story Garage' | 'Underground Parking' | 'Surface Lot' | 'Curbside Metered' | 'Transit Park & Ride';
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  capacitySpaces: number;
  hourlyRateUsd: number;
  distanceToZoneMeters: number;
  hasEvCharging: boolean;
  convenienceScore: number; // 1 to 100
  googleMapsUrl?: string;
}

export interface OpportunityZone {
  id: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  opportunityScore: number; // 0 to 100
  successProbabilityPct: number; // 0 to 100
  demandSaturation: 'Under-served (High Demand)' | 'Balanced Market' | 'High Competition' | 'Oversaturated';
  potentialCustomerBase: number;
  targetDemographicFitScore: number; // 0 to 100
  demographicSummary: {
    primaryAgeGroup: string;
    averageHouseholdIncomeUsd: number;
    footfallProfile: string;
    consumerSpendingIndex: number; // 100 = average
  };
  predictedAnnualSalesVolumeUsd: {
    low: number;
    expected: number;
    high: number;
  };
  unmetDemandDrivers: string[];
  recommendedStrategy: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  matchedVacantPropertyIds: string[];
  nearbyParkingIds: string[];
}

export interface CommercialMarketAnalysis {
  id: string;
  searchCity: string;
  searchCountry: string;
  businessSector: string;
  targetPriceTier: TargetPriceTier;
  storeFormat: StoreFormatType;
  analyzedAt: string;
  cityCenterCoordinates: { lat: number; lng: number };
  executiveSummary: string;
  marketOverview: {
    totalExistingCompetitors: number;
    averageCompetitorRating: number;
    marketSaturationIndex: number; // 0-100
    unmetDemandIndex: number; // 0-100
    totalAddressableMarketAnnualUsd: number;
    primeRecommendedZoneName: string;
    primeZoneOpportunityScore: number;
  };
  competitors: CompetitorEstablishment[];
  opportunityZones: OpportunityZone[];
  vacantProperties: VacantCommercialProperty[];
  concreteDeploymentSites?: ConcreteDeploymentSite[];
  parkingFacilities: ParkingFacility[];
  keyAiInsights: string[];
  strategicActionPlan: string[];
}

export type UserRole = 'admin' | 'manager' | 'analyst' | 'viewer';
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isAuthorizedAdmin: boolean;
  department?: string;
  status: UserStatus;
  createdAt: number;
  lastLoginAt: number;
  avatarUrl?: string;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  actorEmail: string;
  actorUid?: string;
  details?: string;
  category?: string;
  timestamp: number;
  ipAddress?: string;
}

export interface SystemSecurityConfig {
  allowGuestPreview: boolean;
  requireAdminTwoFactorNotice: boolean;
  autoLogoffMinutes: number;
  enforceGpsVerification: boolean;
  allowCsvExport: boolean;
  allowBulkDelete: boolean;
  aiRateLimitThreshold: number;
}

