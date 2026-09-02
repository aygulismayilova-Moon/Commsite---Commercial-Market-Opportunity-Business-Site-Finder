export * from '../utils/realLocationsDatabase';

export interface RealLocationGroup {
  city: string;
  state?: string;
  country: string;
  defaultLat: number;
  defaultLng: number;
  places: {
    place_name: string;
    area: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
  }[];
  presets: {
    place_name: string;
    area: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
  }[];
}

const RAW_LOCATIONS = [
  {
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    defaultLat: 37.7749,
    defaultLng: -122.4194,
    places: [
      {
        place_name: 'Union Square Retail & Hotel Core',
        area: 'Union Square',
        category: 'Urban Commercial',
        latitude: 37.7879,
        longitude: -122.4074,
        description: 'Prime luxury flagship retail zone with high pedestrian traffic, underground transit, and multi-level parking decks.',
      },
      {
        place_name: 'Market Street & 4th Corridor',
        area: 'SoMa / Financial District',
        category: 'Commercial Hub',
        latitude: 37.7858,
        longitude: -122.4065,
        description: 'Bustling transit interchange connecting tech offices, shopping malls, and BART metro ingress.',
      },
      {
        place_name: 'Embarcadero Waterfront Ferry Plaza',
        area: 'The Embarcadero',
        category: 'Food & Beverage / Market',
        latitude: 37.7955,
        longitude: -122.3937,
        description: 'Iconic artisan food market hall and pedestrian promenade with panoramic bay views and ferry terminals.',
      },
      {
        place_name: 'Mission District Valencia Corridor',
        area: 'Mission District',
        category: 'Boutique & Dining',
        latitude: 37.7634,
        longitude: -122.4218,
        description: 'Dense independent specialty boutiques, artisan coffee roasters, and lively evening footfall.',
      },
      {
        place_name: 'Chestnut Street Marina Retail Spine',
        area: 'Marina District',
        category: 'Neighborhood Commercial',
        latitude: 37.8005,
        longitude: -122.4372,
        description: 'High-income neighborhood commercial strip with fitness studios, specialty grocers, and weekend cafe queues.',
      },
    ],
  },
  {
    city: 'New York',
    state: 'NY',
    country: 'United States',
    defaultLat: 40.7128,
    defaultLng: -74.006,
    places: [
      {
        place_name: 'SoHo Broadway & Spring Cast-Iron District',
        area: 'SoHo',
        category: 'Flagship Retail',
        latitude: 40.7223,
        longitude: -73.9987,
        description: 'World-renowned destination for global fashion flagships, pop-up stores, and design concepts with high foot traffic.',
      },
      {
        place_name: 'Fifth Avenue & 57th Luxury Spine',
        area: 'Midtown Manhattan',
        category: 'High-End Luxury Retail',
        latitude: 40.7628,
        longitude: -73.9738,
        description: 'Iconic shopping corridor with supreme customer spending power and global tourist visibility.',
      },
      {
        place_name: 'Chelsea Meatpacking High Line Ingress',
        area: 'Meatpacking District',
        category: 'Lifestyle & Hospitality',
        latitude: 40.7412,
        longitude: -74.0078,
        description: 'Cobblestone streets featuring upscale restaurants, boutique hotels, and Whitney Museum tourist volume.',
      },
      {
        place_name: 'Williamsburg Bedford Avenue Corridor',
        area: 'Brooklyn - Williamsburg',
        category: 'Trendy Commercial',
        latitude: 40.7178,
        longitude: -73.9576,
        description: 'Dense creative district with young affluent demographics, specialty food concepts, and high weekend footfall.',
      },
    ],
  },
  {
    city: 'London',
    country: 'United Kingdom',
    defaultLat: 51.5074,
    defaultLng: -0.1278,
    places: [
      {
        place_name: 'Oxford Circus & Regent Street Hub',
        area: 'West End',
        category: 'High Street Retail',
        latitude: 51.5152,
        longitude: -0.1419,
        description: 'Europe’s busiest shopping district with massive international foot traffic, flagship stores, and major tube connections.',
      },
      {
        place_name: 'Covent Garden Piazza & Seven Dials',
        area: 'Covent Garden',
        category: 'Culture & Commercial',
        latitude: 51.5117,
        longitude: -0.1235,
        description: 'Pedestrian-friendly market square filled with luxury beauty halls, street performers, and specialty dining.',
      },
      {
        place_name: 'Shoreditch High Street & Redchurch St',
        area: 'East London / Shoreditch',
        category: 'Creative Tech & Fashion',
        latitude: 51.5234,
        longitude: -0.0768,
        description: 'Tech startup epicenter with concept stores, rooftop bars, and progressive culinary ventures.',
      },
      {
        place_name: 'King’s Road Chelsea Commercial Promenade',
        area: 'Chelsea & Kensington',
        category: 'Affluent Neighborhood Retail',
        latitude: 51.4875,
        longitude: -0.1687,
        description: 'Classic British luxury avenue with high average household spending, home interiors, and designer boutiques.',
      },
    ],
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    defaultLat: 35.6762,
    defaultLng: 139.6503,
    places: [
      {
        place_name: 'Shibuya Crossing & Center-Gai Promenade',
        area: 'Shibuya Ward',
        category: 'High-Density Commercial',
        latitude: 35.6595,
        longitude: 139.7004,
        description: 'The world’s busiest pedestrian crossing surrounded by youth fashion megastores, digital billboards, and entertainment.',
      },
      {
        place_name: 'Ginza Chuo-Dori Luxury Avenue',
        area: 'Chuo Ward - Ginza',
        category: 'Premier Luxury Retail',
        latitude: 35.6719,
        longitude: 139.7658,
        description: 'World-famous luxury shopping boulevard featuring flagship department stores and pedestrian paradise weekend closures.',
      },
      {
        place_name: 'Omotesando & Harajuku Cat Street',
        area: 'Shibuya - Jingumae',
        category: 'Architecture & Streetwear',
        latitude: 35.6652,
        longitude: 139.7123,
        description: 'Tree-lined architectural showpiece with designer flagships and hip underground streetwear lanes.',
      },
      {
        place_name: 'Shinjuku East Exit Commercial Plaza',
        area: 'Shinjuku Core',
        category: 'Mass Transit & Retail',
        latitude: 35.6909,
        longitude: 139.7028,
        description: 'Massive transport hub serving over 3.5 million daily commuters with extensive department store connections.',
      },
    ],
  },
  {
    city: 'Paris',
    country: 'France',
    defaultLat: 48.8566,
    defaultLng: 2.3522,
    places: [
      {
        place_name: 'Champs-Élysées Flagship Promenade',
        area: '8th Arrondissement',
        category: 'Global Flagship Retail',
        latitude: 48.8698,
        longitude: 2.3075,
        description: 'Prestigious avenue hosting global flagship stores, luxury automobile showrooms, and massive international tourism.',
      },
      {
        place_name: 'Le Marais Rue des Francs-Bourgeois',
        area: '3rd & 4th Arrondissement',
        category: 'Boutique & Heritage',
        latitude: 48.8575,
        longitude: 2.3622,
        description: 'Historic cobblestone shopping district vibrant on Sundays, filled with niche perfumeries and contemporary fashion.',
      },
      {
        place_name: 'Boulevard Haussmann Grands Magasins',
        area: '9th Arrondissement',
        category: 'Department Stores Hub',
        latitude: 48.8738,
        longitude: 2.3316,
        description: 'Home to Galeries Lafayette and Printemps, drawing heavy commercial spending and luxury retail volume.',
      },
    ],
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    defaultLat: 1.3521,
    defaultLng: 103.8198,
    places: [
      {
        place_name: 'Orchard Road Shopping Belt',
        area: 'Orchard Core',
        category: 'Premier Shopping District',
        latitude: 1.3048,
        longitude: 103.8318,
        description: 'Iconic 2.2-kilometer retail boulevard with integrated MRT transit, premier malls, and year-round tourist spending.',
      },
      {
        place_name: 'Marina Bay Sands & Financial Center',
        area: 'Downtown Core',
        category: 'Luxury Mall & Integrated Resort',
        latitude: 1.2838,
        longitude: 103.8591,
        description: 'Ultra-luxury waterfront shopping mall, convention center, and global corporate business towers.',
      },
      {
        place_name: 'Tiong Bahru Heritage Commercial Enclave',
        area: 'Bukit Merah',
        category: 'Artisan & Specialty Food',
        latitude: 1.2855,
        longitude: 103.8322,
        description: 'Art-deco residential enclave converted into specialty coffee roasters, independent bookshops, and bakeries.',
      },
    ],
  },
  {
    city: 'Baku',
    country: 'Azerbaijan',
    defaultLat: 40.4093,
    defaultLng: 49.8671,
    places: [
      {
        place_name: 'Nizami Street (Torgovaya) & Fountain Square',
        area: 'Səbail Downtown Core',
        category: 'Pedestrian Shopping Boulevard',
        latitude: 40.3713,
        longitude: 49.8398,
        description: 'Peak pedestrian walking boulevard, historic architecture, dining, and prime retail storefronts with 55,000 daily footfall.',
      },
      {
        place_name: 'Baku White City Commercial Boulevard',
        area: 'White City Urban Redevelopment',
        category: 'Modern Commercial District',
        latitude: 40.3789,
        longitude: 49.8785,
        description: 'Modern master-planned commercial district with wide avenues, contemporary retail units, and extensive underground parking.',
      },
      {
        place_name: 'Port Baku Mall & Towers Waterfront',
        area: 'Neftchilar Avenue',
        category: 'Luxury Fashion Galleria',
        latitude: 40.3742,
        longitude: 49.8601,
        description: 'Premier luxury shopping mall housing flagship luxury brands, gourmet gastronomy, and executive residences.',
      },
    ],
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    defaultLat: 41.0082,
    defaultLng: 28.9784,
    places: [
      {
        place_name: 'Nişantaşı & Abdi İpekçi Luxury Avenue',
        area: 'Şişli - Nişantaşı',
        category: 'Luxury Fashion & Dining',
        latitude: 41.0504,
        longitude: 28.9934,
        description: 'Turkey’s most exclusive high-street retail avenue with high-end designer flagships and upscale sidewalk cafes.',
      },
      {
        place_name: 'İstiklal Avenue & Taksim Square',
        area: 'Beyoğlu',
        category: 'Mass Pedestrian High Street',
        latitude: 41.0342,
        longitude: 28.9778,
        description: 'Historic pedestrian street welcoming over 1 million daily visitors, vintage tramway, and multi-story retail stores.',
      },
      {
        place_name: 'Bağdat Avenue (Bağdat Caddesi)',
        area: 'Kadıköy (Asian Side)',
        category: 'High-End Residential High Street',
        latitude: 40.9634,
        longitude: 29.0723,
        description: '14-kilometer upscale open-air shopping boulevard with prestigious local and international brands and valet parking.',
      },
    ],
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    defaultLat: 25.2048,
    defaultLng: 55.2708,
    places: [
      {
        place_name: 'Downtown Dubai & Burj Khalifa Boulevard',
        area: 'Downtown Dubai',
        category: 'Premier Commercial & Tourism',
        latitude: 25.1972,
        longitude: 55.2744,
        description: 'Epicenter of luxury lifestyle, high-density residential towers, and massive international consumer spending.',
      },
      {
        place_name: 'City Walk Outdoor Shopping District',
        area: 'Al Wasl',
        category: 'Open-Air Commercial Concept',
        latitude: 25.2081,
        longitude: 55.2612,
        description: 'Contemporary European-style pedestrian boulevard featuring designer boutiques, wellness centers, and fine dining.',
      },
      {
        place_name: 'Dubai Marina Walk & JBR The Beach',
        area: 'Dubai Marina / JBR',
        category: 'Waterfront Retail & Hospitality',
        latitude: 25.0784,
        longitude: 55.1328,
        description: 'Lively waterfront promenade surrounded by high-rise residential towers, beachgoers, and bustling evening dining.',
      },
    ],
  },
  {
    city: 'Sydney',
    country: 'Australia',
    defaultLat: -33.8688,
    defaultLng: 151.2093,
    places: [
      {
        place_name: 'Pitt Street Mall & Westfield Sydney',
        area: 'Sydney CBD',
        category: 'Flagship Commercial Mall',
        latitude: -33.8702,
        longitude: 151.2085,
        description: 'One of the world’s most profitable retail strips, anchored by global department stores and central railway connections.',
      },
      {
        place_name: 'Barangaroo South Commercial Waterfront',
        area: 'Barangaroo',
        category: 'Financial Core & Dining',
        latitude: -33.8641,
        longitude: 151.2014,
        description: 'Modern architectural precinct with premium grade corporate towers, waterfront dining, and eco-certified architecture.',
      },
    ],
  },
];

export const REAL_LOCATIONS_DATABASE: RealLocationGroup[] = RAW_LOCATIONS.map((loc) => ({
  ...loc,
  presets: loc.places,
}));
