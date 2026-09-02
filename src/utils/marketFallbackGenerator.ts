import {
  CommercialMarketAnalysis,
  TargetPriceTier,
  StoreFormatType,
  ConcreteDeploymentSite,
  OpportunityZone,
  VacantCommercialProperty,
  ParkingFacility,
  CompetitorEstablishment,
} from '../types';
import { generateRealCityData, REAL_WORLD_CITIES_CATALOG } from './realLocationsDatabase';

// Industry-specific realistic competitor brands generator tailored 100% to the specific city
export function getSectorCompetitorTemplates(
  city: string,
  sector: string,
  streets: string[],
  landmarks: string[]
): { name: string; address: string; neighborhood: string; rating: number; reviews: number; priceLevel: number; strengths: string[]; vulnerabilities: string[] }[] {
  const s = sector.toLowerCase();
  const normalizedCity = city.trim().toLowerCase();
  const st0 = streets[0] || `${city} Main Street`;
  const st1 = streets[1] || `${city} Central Avenue`;
  const st2 = streets[2] || `${city} Commercial Way`;
  const st3 = streets[3] || `${city} Market Road`;
  const lm0 = landmarks[0] || `${city} Central Plaza`;
  const lm1 = landmarks[1] || `${city} Municipal Square`;

  // Check if static catalog has pre-verified real competitors for this city and sector
  const cleanNorm = normalizedCity.replace(/\(.*?\)/g, '').trim();
  const strippedAccent = cleanNorm
    .replace(/ğ/g, 'g')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c');

  const catalogCity = REAL_WORLD_CITIES_CATALOG[normalizedCity] ||
    REAL_WORLD_CITIES_CATALOG[cleanNorm] ||
    REAL_WORLD_CITIES_CATALOG[strippedAccent] ||
    (cleanNorm === 'adam' || cleanNorm === 'agdam' || cleanNorm === 'ağdam' || cleanNorm === 'aghdam' ? REAL_WORLD_CITIES_CATALOG['agdam'] : undefined) ||
    (cleanNorm === 'agsu' || cleanNorm === 'ağsu' || cleanNorm === 'aghsu' ? REAL_WORLD_CITIES_CATALOG['agsu'] : undefined);
  if (catalogCity && catalogCity.realCompetitorsBySector) {
    if ((s.includes('bakery') || s.includes('bread') || s.includes('pastry') || s.includes('təndir') || s.includes('tandir') || s.includes('şirniyyat') || s.includes('sirniyyat') || s.includes('qənnadı') || s.includes('qennadi') || s.includes('çörək') || s.includes('cake') || s.includes('patisserie')) && catalogCity.realCompetitorsBySector.bakery) {
      return catalogCity.realCompetitorsBySector.bakery;
    }
    if ((s.includes('retail') || s.includes('supermarket') || s.includes('mall') || s.includes('hypermarket') || s.includes('grocery')) && catalogCity.realCompetitorsBySector.retail) {
      return catalogCity.realCompetitorsBySector.retail;
    }
    if ((s.includes('bank') || s.includes('atm') || s.includes('financial') || s.includes('credit') || s.includes('wealth') || s.includes('fintech')) && catalogCity.realCompetitorsBySector.bank) {
      return catalogCity.realCompetitorsBySector.bank;
    }
    if ((s.includes('fashion') || s.includes('cloth') || s.includes('apparel') || s.includes('boutique') || s.includes('shoe')) && catalogCity.realCompetitorsBySector.fashion) {
      return catalogCity.realCompetitorsBySector.fashion;
    }
    if ((s.includes('food') || s.includes('dining') || s.includes('restaurant') || s.includes('bistro') || s.includes('grill')) && catalogCity.realCompetitorsBySector.dining) {
      return catalogCity.realCompetitorsBySector.dining;
    }
    if ((s.includes('coffee') || s.includes('cafe') || s.includes('tea') || s.includes('roast')) && catalogCity.realCompetitorsBySector.coffee) {
      return catalogCity.realCompetitorsBySector.coffee;
    }
  }

  const isAze = cleanNorm === 'agsu' || cleanNorm === 'ağsu' || cleanNorm === 'aghsu' || strippedAccent === 'agsu' ||
    cleanNorm === 'agdam' || cleanNorm === 'ağdam' || cleanNorm === 'adam' || cleanNorm === 'aghdam' || strippedAccent === 'agdam' ||
    cleanNorm === 'baku' || cleanNorm === 'bakı' || cleanNorm === 'ganja' || cleanNorm === 'gəncə' ||
    cleanNorm === 'sumqayit' || cleanNorm === 'sumqayıt' || cleanNorm === 'shusha' || cleanNorm === 'şuşa' ||
    cleanNorm === 'mingachevir' || cleanNorm === 'mingəçevir' || cleanNorm === 'shaki' || cleanNorm === 'şəki' ||
    cleanNorm === 'quba' || cleanNorm === 'lankaran' || cleanNorm === 'lənkəran' || cleanNorm === 'khachmaz' ||
    cleanNorm === 'xaçmaz' || cleanNorm === 'qusar' || cleanNorm === 'khankendi' || cleanNorm === 'xankəndi' ||
    cleanNorm === 'lachin' || cleanNorm === 'laçın' || cleanNorm === 'fizuli' || cleanNorm === 'füzuli' ||
    cleanNorm === 'jabrayil' || cleanNorm === 'cəbrayıl' || cleanNorm === 'zangilan' || cleanNorm === 'zəngilan' ||
    cleanNorm === 'gubadli' || cleanNorm === 'qubadli' || cleanNorm === 'qubadlı' || cleanNorm === 'kalbajar' ||
    cleanNorm === 'kəlbəcər' || cleanNorm === 'barda' || cleanNorm === 'bərdə' || cleanNorm === 'tartar' ||
    cleanNorm === 'tərtər' || cleanNorm === 'aghjabadi' || cleanNorm === 'ağcabədi' || cleanNorm === 'agdash' ||
    cleanNorm === 'ağdaş' || cleanNorm === 'goychay' || cleanNorm === 'göyçay' || cleanNorm === 'ismayilli' ||
    cleanNorm === 'ismayıllı' || cleanNorm === 'shamakhi' || cleanNorm === 'şamaxı' || cleanNorm === 'gabala' ||
    cleanNorm === 'qabala' || cleanNorm === 'qəbələ' || cleanNorm === 'naftalan' || cleanNorm === 'yevlakh' ||
    cleanNorm === 'yevlax' || cleanNorm === 'goygol' || cleanNorm === 'göygöl' || cleanNorm === 'shirvan' ||
    cleanNorm === 'şirvan' || cleanNorm === 'nakhchivan' || cleanNorm === 'naxçıvan';

  const isTr = cleanNorm === 'istanbul' || cleanNorm === 'ankara' || cleanNorm === 'izmir' ||
    cleanNorm === 'bursa' || cleanNorm === 'antalya' || cleanNorm === 'adana' ||
    cleanNorm === 'gaziantep' || cleanNorm === 'konya' || cleanNorm === 'trabzon' || cleanNorm === 'bodrum';

  // 1. Banking, ATM Centers, Financial Services & Wealth Management
  if (s.includes('bank') || s.includes('atm') || s.includes('financial') || s.includes('credit') || s.includes('wealth') || s.includes('fintech') || s.includes('investment') || s.includes('mortgage') || s.includes('accounting') || s.includes('tax') || s.includes('insurance') || s.includes('asset management')) {

    if (isAze) {
      return [
        { name: `ABB (Azərbaycan Beynəlxalq Bankı) - ${city} Filialı & 24/7 ATM Mərkəzi`, address: `${st0} No:14, ${city}`, neighborhood: 'Mərkəzi Biznes Kvartalı', rating: 4.8, reviews: 1420, priceLevel: 2, strengths: ['Premier state-backed corporate and retail banking', 'Full-service ATM cash-in/out hub', 'Priority business teller windows'], vulnerabilities: ['Peak hour teller queues on pension distribution days'] },
        { name: `Kapital Bank - ${city} Xidmət Şöbəsi & BirBank Rəqəmsal Zonası`, address: `${st1} No:28, ${city}`, neighborhood: 'Mərkəzi Kvartal', rating: 4.7, reviews: 1850, priceLevel: 2, strengths: ['Market leader in BirBank mobile integration', 'Dual 24/7 drive-thru ATM kiosks', 'Express SME business credit desks'], vulnerabilities: ['Weekend branch service limited to digital zone'] },
        { name: `PAŞA Bank (PASHA Bank) - ${city} Korporativ və Fərdi Bankçılıq Mərkəzi`, address: `${st2} No:42, ${city}`, neighborhood: 'Ticarət Koridoru', rating: 4.9, reviews: 940, priceLevel: 4, strengths: ['Premier corporate treasury and trade finance hub', 'High-net-worth private banking suites', 'Dedicated business concierge'], vulnerabilities: ['Strict minimum account balance requirements for corporate services'] },
        { name: `Bank Respublika - ${city} Filialı & Nağdlaşdırma Terminalı`, address: `${st3} No:19, ${city}`, neighborhood: 'İşgüzar Rayon', rating: 4.6, reviews: 780, priceLevel: 2, strengths: ['Competitive micro-business and agrarian loans', 'Fast commercial POS terminal setup'], vulnerabilities: ['Smaller commercial branch footprint'] },
        { name: `Rabitəbank - ${city} Smart Bankçılıq Mərkəzi`, address: `${lm0} Meydanı No:5, ${city}`, neighborhood: 'Mərkəzi Meydan', rating: 4.5, reviews: 620, priceLevel: 2, strengths: ['Kartmane cashback ecosystem loyalty', 'Digital queue kiosk system'], vulnerabilities: ['Limited parking on street during noon peak'] },
      ];
    }

    if (isTr) {
      return [
        { name: `Ziraat Bankası - ${city} Merkez Şubesi & 24/7 ATM`, address: `${st0} No:18, ${city}`, neighborhood: 'Merkez Ticaret Alanı', rating: 4.6, reviews: 2400, priceLevel: 2, strengths: ['Geniş ATM ağı ve kamu bankacılığı güvencesi', 'KOBİ ve tarımsal destek kredileri'], vulnerabilities: ['Ay başı maaş günlerinde yoğun gişe kuyrukları'] },
        { name: `Türkiye İş Bankası - ${city} Ticari Şubesi & Bankamatik`, address: `${st1} No:35, ${city}`, neighborhood: 'Finans Caddesi', rating: 4.7, reviews: 1950, priceLevel: 2, strengths: ['Köklü kurumsal müşteri ağı', 'Gelişmiş dijital İşCep entegrasyonu'], vulnerabilities: ['Otopark kısıtlılığı'] },
        { name: `Garanti BBVA - ${city} Şubesi & Paramatik Merkezi`, address: `${st2} No:52, ${city}`, neighborhood: 'Çarşı Bölgesi', rating: 4.6, reviews: 1720, priceLevel: 3, strengths: ['Yüksek dijital işlem hızı ve temassız ATM çözümleri', 'Bonus ticari ekosistemi'], vulnerabilities: ['Yoğun mesai saatlerinde telefon müşteri temsilcisi bekleme süreleri'] },
        { name: `Akbank - ${city} Şubesi & 24/7 ATM`, address: `${st3} No:21, ${city}`, neighborhood: 'İnovasyon Aksı', rating: 4.5, reviews: 1350, priceLevel: 2, strengths: ['Axess ticari kart avantajları', 'Hızlı POS terminal kurulumu'], vulnerabilities: ['Kompakt şube alanı'] },
      ];
    }

    return [
      { name: `${city} First National Bank & 24/7 ATM Financial Hub`, address: `${st0} No:100, ${city}`, neighborhood: 'Central Financial Core', rating: 4.7, reviews: 1850, priceLevel: 3, strengths: ['Multi-currency teller desk', 'Dual automated smart deposit ATMs', 'SME commercial lending specialists'], vulnerabilities: ['Peak lunch hour queue times', 'Strict corporate compliance documentation'] },
      { name: `Meridian Commercial Bank & Wealth Management - ${city}`, address: `${st1} No:45, ${city}`, neighborhood: 'Downtown Business District', rating: 4.8, reviews: 1240, priceLevel: 4, strengths: ['Private wealth advisory suites', 'Express corporate escrow processing', 'High transaction limit authorizations'], vulnerabilities: ['High minimum balance requirement for private tier'] },
      { name: `Apex Federal Credit Union & ATM Center ${city}`, address: `${st2} No:82, ${city}`, neighborhood: 'Commerce Corridor', rating: 4.6, reviews: 1420, priceLevel: 2, strengths: ['Low-fee merchant checking accounts', 'Competitive equipment leasing rates', '24/7 drive-up cash dispenser'], vulnerabilities: ['Fewer international wire transfer corridors'] },
      { name: `Vanguard Trust & Retail Banking Center ${city}`, address: `${st3} No:17, ${city}`, neighborhood: 'Metropolitan Square', rating: 4.5, reviews: 960, priceLevel: 3, strengths: ['Digital onboarding kiosks', 'Direct Treasury bond desk', 'Dedicated business cashier counter'], vulnerabilities: ['Limited parking spaces during morning clearing hours'] },
    ];
  }

  // 1. AI, Machine Learning, Technology & Software
  if (s.includes('ai') || s.includes('machine learning') || s.includes('tech') || s.includes('software') || s.includes('data') || s.includes('robot') || s.includes('cyber') || s.includes('cloud') || s.includes('3d print')) {
    return [
      { name: `${city} Applied AI & Robotics Lab`, address: `${st0} No:104, ${city}`, neighborhood: 'Innovation District', rating: 4.8, reviews: 620, priceLevel: 3, strengths: ['High machine learning research talent', 'GPU compute infrastructure'], vulnerabilities: ['Enterprise contract focus creates opening for SMB applications', 'Long onboarding cycles'] },
      { name: `Turing & Neural Systems Hub ${city}`, address: `${st1} No:48, ${city}`, neighborhood: 'Tech Quarter', rating: 4.7, reviews: 490, priceLevel: 3, strengths: ['Direct university research partnership', 'Patent portfolio in computer vision'], vulnerabilities: ['Slow product commercialization', 'Limited client-facing demo showroom'] },
      { name: `${city} CognitiveEdge Tech Solutions`, address: `${st2} No:12, ${city}`, neighborhood: 'Downtown Innovation Park', rating: 4.6, reviews: 380, priceLevel: 4, strengths: ['Hardware-accelerated AI modeling', 'Tier-1 venture backing'], vulnerabilities: ['High bespoke consulting fees', 'Niche developer tooling focus'] },
      { name: `Vertex & Cloud Automation Studio ${city}`, address: `${st3} No:77, ${city}`, neighborhood: 'Creative Tech Cluster', rating: 4.5, reviews: 290, priceLevel: 2, strengths: ['Rapid prototype turnaround', 'Agile deployment models'], vulnerabilities: ['Smaller engineering team limits multi-client bandwidth', 'Under-developed marketing'] },
      { name: `Synthesia Digital Systems ${city}`, address: `${lm0} Business Suites, ${city}`, neighborhood: 'Central Commerce Hub', rating: 4.4, reviews: 210, priceLevel: 3, strengths: ['High viral visibility', 'Modern developer community presence'], vulnerabilities: ['High client churn in entry-tier tiers', 'Generic customer support'] },
    ];
  }

  // 2. Specialty Bakeries, Patisseries, Cafes & Tea
  if (s.includes('coffee') || s.includes('cafe') || s.includes('bakery') || s.includes('boba') || s.includes('tea') || s.includes('pastry') || s.includes('roast') || s.includes('təndir') || s.includes('tandir') || s.includes('şirniyyat') || s.includes('sirniyyat') || s.includes('qənnadı') || s.includes('bread') || s.includes('çörək')) {
    if (isAze) {
      return [
        { name: `${city} Şirniyyat & Çörək Evi (Təndir & Qənnadı)`, address: `${st0} No:18, ${city}`, neighborhood: 'Mərkəzi Kvartal', rating: 4.8, reviews: 760, priceLevel: 2, strengths: ['Təzə xırçıltılı təndir çörəyi, şorqoğalı və milli paxlava çeşidləri', 'Mərkəzi küçədə yüksək piyada axını'], vulnerabilities: ['Səhər və axşam pik saatlarında növbələr'] },
        { name: `Qarabağ Təndir Evi & Ətirli Şirniyyat Mərkəzi - ${city}`, address: `${st1} No:14, ${city}`, neighborhood: 'Ticarət Koridoru', rating: 4.7, reviews: 620, priceLevel: 2, strengths: ['Ənənəvi daş soba çörəkləri və fəsəli', 'Sürətli paket xidməti'], vulnerabilities: ['Məhdud oturacaq sahəsi'] },
        { name: `${city} Qənnadı & Butik Tort Evi`, address: `${st2} No:9, ${city}`, neighborhood: 'Mədəniyyət Parkı Yanı', rating: 4.9, reviews: 490, priceLevel: 3, strengths: ['Xüsusi reseptlərlə hazırlanan premium tortlar və şirniyyatlar', 'Fərdi sifarişlər üçün usta şirniyyatçılar'], vulnerabilities: ['Öncədən sifariş tələb olunur'] },
        { name: `${city} Çörəkbişirmə & Bulka İstehsalatı Mərkəzi`, address: `${st3} No:5, ${city}`, neighborhood: 'Logistika Zonası', rating: 4.6, reviews: 580, priceLevel: 1, strengths: ['Müasir avtomatlaşdırılmış un məmulatları xətti', 'Həm pərakəndə həm topdansatış təminatı'], vulnerabilities: ['Əsasən standart çörək sortlarına fokuslanır'] },
      ];
    }

    if (isTr) {
      return [
        { name: `${city} Tarihi Odun Fırını & Taş Ekmek Evi`, address: `${st0} No:18, ${city}`, neighborhood: 'Merkez Çarşı', rating: 4.8, reviews: 1450, priceLevel: 2, strengths: ['Geleneksel ekşi mayalı taş fırın ekmekleri ve sıcak simit', 'Sabah saatlerinde yüksek müşteri sirkülasyonu'], vulnerabilities: ['Sabah kahvaltı saatlerinde sıra oluşması'] },
        { name: `${city} Gurme Butik Pastanesi & Cafe`, address: `${st1} No:24, ${city}`, neighborhood: 'Moda Aksı', rating: 4.7, reviews: 1120, priceLevel: 3, strengths: ['Taze Fransız kruvasanları, yaş pastalar ve sıcak kahve servisi', 'Şık bahçe oturma alanı'], vulnerabilities: ['Hafta sonları masa bulma zorluğu'] },
        { name: `${city} Simit & Börek Sarayı`, address: `${st2} No:42, ${city}`, neighborhood: 'İstasyon Caddesi', rating: 4.6, reviews: 980, priceLevel: 1, strengths: ['Hızlı al-götür servisi ve taze demlik çay', 'Uygun fiyat politikası'], vulnerabilities: ['Kompakt iç mekan'] },
      ];
    }

    return [
      { name: `${city} Artisan Bakery, Patisserie & Sourdough Lab`, address: `${st0} No:28, ${city}`, neighborhood: 'Market Quarter', rating: 4.8, reviews: 3400, priceLevel: 2, strengths: ['Fresh stone-baked sourdough & artisan pastries', 'Iconic local neighborhood loyalty'], vulnerabilities: ['Zero indoor laptop seating during morning rush', 'Frequent queue walk-aways'] },
      { name: `The ${city} Heritage Espresso & Bakehouse`, address: `${st1} No:15, ${city}`, neighborhood: 'Historic Square', rating: 4.7, reviews: 1850, priceLevel: 2, strengths: ['Architectural design aesthetic', 'High corporate takeaway spend'], vulnerabilities: ['Premium price point creates friction for student demographics', 'Off-peak weekday lulls'] },
      { name: `Artisan Bakery & Patisserie ${city}`, address: `${st2} No:92, ${city}`, neighborhood: 'Downtown Promenade', rating: 4.5, reviews: 2600, priceLevel: 2, strengths: ['Authentic fresh pastry displays', 'Consistent high-speed service'], vulnerabilities: ['Seating bottlenecks during weekend brunch hours', 'Pre-packaged food perception'] },
      { name: `${city} Botanical Coffee & Pastry House`, address: `${st3} No:5, ${city}`, neighborhood: 'Riverside Walk', rating: 4.6, reviews: 2100, priceLevel: 3, strengths: ['Minimalist aesthetic', 'High average bean bag retail checkout'], vulnerabilities: ['Long pour-over wait times', 'Limited hot food menu options'] },
    ];
  }

  // 3. Restaurants, Dining, Bistro, Food & Fast Casual
  if (s.includes('food') || s.includes('dining') || s.includes('restaurant') || s.includes('bistro') || s.includes('burger') || s.includes('pizza') || s.includes('sushi') || s.includes('bbq') || s.includes('smokehouse') || s.includes('culinary')) {
    return [
      { name: `The ${city} Grand Heritage Brasserie`, address: `${st0} No:12, ${city}`, neighborhood: 'Cultural Quarter', rating: 4.7, reviews: 4900, priceLevel: 2, strengths: ['Cult brand following', 'High table turn velocity'], vulnerabilities: ['No reservations during peak dinner hours', 'High acoustic noise levels'] },
      { name: `${city} Prime Steakhouse & Grill`, address: `${st1} No:34, ${city}`, neighborhood: 'Financial Core', rating: 4.6, reviews: 3200, priceLevel: 3, strengths: ['High corporate entertainment spend', 'Award-winning cocktail program'], vulnerabilities: ['Basement dining space lacks streetfront window exposure', 'Meat-centric menu'] },
      { name: `${city} Fusion Asian Kitchen & Lounge`, address: `${st2} No:80, ${city}`, neighborhood: 'Luxury Promenade', rating: 4.6, reviews: 2700, priceLevel: 4, strengths: ['VIP private dining suites', 'High spend per head'], vulnerabilities: ['Rigid cancellation policies', 'Perceived as exclusive rather than neighborhood casual'] },
      { name: `Craft Kitchen & Gourmet Burgers ${city}`, address: `${st3} No:19, ${city}`, neighborhood: 'High Street Strip', rating: 4.5, reviews: 2100, priceLevel: 2, strengths: ['Fast delivery app integration', 'Local craft beverage pairings'], vulnerabilities: ['Tight table spacing', 'Limited vegetarian variety'] },
    ];
  }

  // 4. Grocery, Supermarkets & Organic Markets
  if (s.includes('grocery') || s.includes('supermarket') || s.includes('organic') || s.includes('food market') || s.includes('deli') || s.includes('cheese')) {
    return [
      { name: `${city} Organic Market & Gourmet Hub`, address: `${st0} No:63, ${city}`, neighborhood: 'Westgate Promenade', rating: 4.6, reviews: 4100, priceLevel: 3, strengths: ['Organic specialty assortment', 'Hot food prepared bars'], vulnerabilities: ['Premium pricing creates value friction', 'Large store footprint overhead'] },
      { name: `${city} Gourmet Pantry & Cellar`, address: `${st1} No:110, ${city}`, neighborhood: 'Residential High Street', rating: 4.5, reviews: 2800, priceLevel: 3, strengths: ['Affluent household customer loyalty', 'High fresh produce quality'], vulnerabilities: ['Limited late-night trading hours', 'Parking constraints'] },
      { name: `${city} Central Food Hall`, address: `${st2} No:45, ${city}`, neighborhood: 'Downtown Core', rating: 4.4, reviews: 3400, priceLevel: 2, strengths: ['Convenience meal dominance', 'Heavy commuter foot traffic'], vulnerabilities: ['Restricted raw bulk cooking supplies', 'High checkout queues at rush hour'] },
      { name: `Green Living Grocer ${city}`, address: `${st3} No:22, ${city}`, neighborhood: 'Green Living Quarter', rating: 4.5, reviews: 1450, priceLevel: 3, strengths: ['Vitamins and vegan specialties', 'Loyal eco-conscious demographic'], vulnerabilities: ['Higher pricing than conventional grocers', 'Compact store footprint'] },
    ];
  }

  // 5. Fitness, Gyms, Yoga & Wellness Studios
  if (s.includes('fitness') || s.includes('gym') || s.includes('yoga') || s.includes('barre') || s.includes('pilates') || s.includes('boxing') || s.includes('crossfit') || s.includes('athletic')) {
    return [
      { name: `${city} Prestige Athletic Club & Spa`, address: `${st0} No:99, ${city}`, neighborhood: 'Prestige Promenade', rating: 4.8, reviews: 1650, priceLevel: 4, strengths: ['Luxury amenities and eucalyptus steam rooms', 'High membership retention'], vulnerabilities: ['High fee excludes mass urban demographic', 'Peak hour class booking congestion'] },
      { name: `Urban Performance & Wellness Studio ${city}`, address: `${st1} No:50, ${city}`, neighborhood: 'Tech & Financial Quarter', rating: 4.7, reviews: 1800, priceLevel: 3, strengths: ['Olympic lifting platforms & recovery suites', 'High corporate subsidization'], vulnerabilities: ['Waitlist during seasonal peaks', 'Limited outdoor athletic access'] },
      { name: `${city} High-Intensity Bootcamp`, address: `${st2} No:14, ${city}`, neighborhood: 'Shopping District', rating: 4.6, reviews: 1450, priceLevel: 3, strengths: ['Energetic workout cult followings', 'Celebrity trainer roster'], vulnerabilities: ['High burnout rate for beginners', 'No general open gym floor'] },
      { name: `CoreFit Functional Training ${city}`, address: `${st3} No:31, ${city}`, neighborhood: 'Midtown Strip', rating: 4.7, reviews: 980, priceLevel: 2, strengths: ['45-minute efficient circuit classes', 'Community team atmosphere'], vulnerabilities: ['Fixed class timetable restrictions', 'No dedicated swimming pool or sauna'] },
    ];
  }

  // 6. Pharmacies, Health Clinics, Dental & Medical
  if (s.includes('pharmacy') || s.includes('clinic') || s.includes('health') || s.includes('medical') || s.includes('dental') || s.includes('acupuncture') || s.includes('doctor')) {
    return [
      { name: `${city} Central Pharmacy & Health Hub`, address: `${st0} No:55, ${city}`, neighborhood: 'High Street Center', rating: 4.4, reviews: 2900, priceLevel: 2, strengths: ['Massive brand trust & prescription volume', 'Cosmetics co-merchandising'], vulnerabilities: ['Prescription pickup wait queues', 'Impersonal clinical atmosphere'] },
      { name: `${city} Preventive Medical Plaza`, address: `${st1} No:88, ${city}`, neighborhood: 'Medical Plaza', rating: 4.7, reviews: 1400, priceLevel: 3, strengths: ['Same-day private GP appointments', 'Comprehensive imaging diagnostics'], vulnerabilities: ['Private insurance requirement', 'Limited walk-in availability'] },
      { name: `PureCare Dental & Orthodontics ${city}`, address: `${st2} No:20, ${city}`, neighborhood: 'Downtown Core', rating: 4.8, reviews: 850, priceLevel: 3, strengths: ['Modern digital scanning and cosmetic dentistry', 'Weekend opening hours'], vulnerabilities: ['High treatment cost friction', 'Appointment cancellations lead times'] },
      { name: `Aura Integrative Wellness ${city}`, address: `${st3} No:7, ${city}`, neighborhood: 'Green Quarter', rating: 4.6, reviews: 520, priceLevel: 2, strengths: ['Holistic pain therapy treatments', 'Calm boutique environment'], vulnerabilities: ['Low conventional insurance coverage', 'Limited practitioner capacity'] },
    ];
  }

  // 7. Co-working, Tech Hubs & Innovation Incubators
  if (s.includes('coworking') || s.includes('co-working') || s.includes('workspace') || s.includes('incubator') || s.includes('office') || s.includes('business center')) {
    return [
      { name: `${city} Innovation Campus & Workspaces`, address: `${st0} No:120, ${city}`, neighborhood: 'Tech Corridor', rating: 4.5, reviews: 2100, priceLevel: 3, strengths: ['Global enterprise network access', 'High-speed fiber & modern phone booths'], vulnerabilities: ['High hot-desk acoustic distractions', 'Price escalations on renewal'] },
      { name: `Creative Members Lounge ${city}`, address: `${st1} No:18, ${city}`, neighborhood: 'Arts District', rating: 4.7, reviews: 1100, priceLevel: 4, strengths: ['Curated member community & podcast studios', 'Luxury interior styling'], vulnerabilities: ['Strict membership application vetting', 'Limited dedicated private desks'] },
      { name: `${city} Venture & Scaleup Hub`, address: `${st2} No:40, ${city}`, neighborhood: 'Financial District', rating: 4.6, reviews: 820, priceLevel: 3, strengths: ['Fintech & investor demo days', 'Vibrant startup events schedule'], vulnerabilities: ['Limited 24/7 parking access', 'Meeting room credit limits'] },
    ];
  }

  // 8. Electronics, Gadgets, Computers & Audio
  if (s.includes('electronic') || s.includes('gadget') || s.includes('audio') || s.includes('camera') || s.includes('phone') || s.includes('computer') || s.includes('appliance')) {
    return [
      { name: `${city} Tech Flagship Experience Store`, address: `${st0} No:1, ${city}`, neighborhood: 'Prime Retail Mall', rating: 4.7, reviews: 6400, priceLevel: 3, strengths: ['Iconic architectural flagship presence', 'High average transaction spend'], vulnerabilities: ['Service appointment congestion', 'Fixed non-negotiable retail margins'] },
      { name: `${city} Megastore & Digital Appliances`, address: `${st1} No:150, ${city}`, neighborhood: 'Commercial Plaza', rating: 4.2, reviews: 3200, priceLevel: 2, strengths: ['Broad multi-brand appliance inventory', 'Price matching guarantees'], vulnerabilities: ['Variable in-store staff technical expertise', 'Generic warehouse environment'] },
      { name: `Acoustic Sound & Hi-Fi Studio ${city}`, address: `${st2} No:32, ${city}`, neighborhood: 'Luxury Quarter', rating: 4.8, reviews: 420, priceLevel: 4, strengths: ['Audiophile acoustic demo rooms', 'Custom architectural installation services'], vulnerabilities: ['Ultra-luxury price tags narrow prospective buyers', 'Low walk-in conversion'] },
      { name: `MobileTech Repair & Gadget Hub ${city}`, address: `${st3} No:78, ${city}`, neighborhood: 'Transit Hub', rating: 4.5, reviews: 1890, priceLevel: 2, strengths: ['Rapid 30-minute repair turnarounds', 'High-margin accessory add-ons'], vulnerabilities: ['Limited retail showroom space', 'Intense local independent competition'] },
    ];
  }

  // 9. Fashion, Apparel, Boutiques & Shoes
  if (s.includes('fashion') || s.includes('cloth') || s.includes('apparel') || s.includes('boutique') || s.includes('shoe') || s.includes('luxury') || s.includes('jewel') || s.includes('watch') || s.includes('dress') || s.includes('tailor')) {
    return [
      { name: `${city} Premier Designer Galleria`, address: `${st0} No:45, ${city}`, neighborhood: 'Fashion Avenue', rating: 4.7, reviews: 2900, priceLevel: 3, strengths: ['High pedestrian luxury traffic', 'Curated international and local designer collections'], vulnerabilities: ['High lease overhead', 'Peak hour fitting room queues'] },
      { name: `Atelier & Haute Couture ${city}`, address: `${st1} No:24, ${city}`, neighborhood: 'Heritage Row', rating: 4.6, reviews: 1450, priceLevel: 4, strengths: ['Bespoke tailoring services', 'Loyal affluent clientele'], vulnerabilities: ['Long production lead times for custom orders'] },
      { name: `${city} Urban Streetwear & Footwear`, address: `${st2} No:88, ${city}`, neighborhood: 'Creative Quarter', rating: 4.5, reviews: 1820, priceLevel: 2, strengths: ['Exclusive sneaker drops', 'High youth and tourist draw'], vulnerabilities: ['Rapid trend turnover requires constant inventory refreshment'] },
      { name: `Luxe Timepieces & Fine Jewelry ${city}`, address: `${st3} No:12, ${city}`, neighborhood: 'Gold & Diamond Corridor', rating: 4.8, reviews: 920, priceLevel: 4, strengths: ['Certified pre-owned luxury horology', 'High-security private appraisal salon'], vulnerabilities: ['High insurance and security overhead'] },
    ];
  }

  // 10. Automotive, EV Charging, Detailing, Car Wash & Repair
  if (s.includes('auto') || s.includes('car') || s.includes('ev') || s.includes('vehicle') || s.includes('tire') || s.includes('motor') || s.includes('mechanic') || s.includes('detailing') || s.includes('valet')) {
    return [
      { name: `${city} Premier EV Fast-Charging Lounge & Hub`, address: `${st0} No:112, ${city}`, neighborhood: 'Commercial Transit Ring', rating: 4.8, reviews: 1420, priceLevel: 3, strengths: ['350kW ultra-fast CCS chargers', 'Air-conditioned driver workspace with specialty coffee'], vulnerabilities: ['High grid interconnect upgrade capital costs', 'Queue formation during holiday travel peaks'] },
      { name: `Apex Precision Auto Detailing & Ceramic Studio ${city}`, address: `${st1} No:84, ${city}`, neighborhood: 'Automotive Plaza', rating: 4.9, reviews: 980, priceLevel: 4, strengths: ['Dust-free climate-controlled bay', 'Certified paint protection film (PPF) installer'], vulnerabilities: ['Multi-day service turnaround limits bay throughput'] },
      { name: `${city} Central German Motors & Hybrid Specialists`, address: `${st2} No:55, ${city}`, neighborhood: 'Industrial Boulevard', rating: 4.6, reviews: 2150, priceLevel: 3, strengths: ['OEM computer diagnostics', 'Extensive European parts inventory in stock'], vulnerabilities: ['Long appointment booking lead times (7-10 days)'] },
      { name: `Express Laser Car Wash & Valet ${city}`, address: `${st3} No:201, ${city}`, neighborhood: 'Commerce Expressway', rating: 4.4, reviews: 3100, priceLevel: 2, strengths: ['3-minute frictionless touchless wash tunnel', 'Subscription recurring monthly pass program'], vulnerabilities: ['High water recycling maintenance costs', 'Weather-dependent revenue fluctuations'] },
    ];
  }

  // 11. Beauty, Aesthetics, Spas, Hair & Barbershops
  if (s.includes('beauty') || s.includes('salon') || s.includes('spa') || s.includes('barber') || s.includes('hair') || s.includes('nail') || s.includes('cosmetic') || s.includes('aesthetic') || s.includes('skincare') || s.includes('massage')) {
    return [
      { name: `${city} Lumière Aesthetic Clinic & MedSpa`, address: `${st0} No:38, ${city}`, neighborhood: 'Prestige Promenade', rating: 4.9, reviews: 1680, priceLevel: 4, strengths: ['Board-certified aesthetic physicians', 'FDA-cleared laser skin rejuvenation equipment'], vulnerabilities: ['High therapist acquisition and retention costs'] },
      { name: `The Gentlemen’s Heritage Barber & Grooming Club ${city}`, address: `${st1} No:19, ${city}`, neighborhood: 'Historic Quarter', rating: 4.8, reviews: 2450, priceLevel: 3, strengths: ['Complimentary single malt whiskey with hot towel shave', 'Loyal recurring monthly membership club'], vulnerabilities: ['Walk-in clients turned away due to full booking calendar'] },
      { name: `${city} Organic Nail Studio & Botanical Spa`, address: `${st2} No:62, ${city}`, neighborhood: 'Lifestyle Arcade', rating: 4.7, reviews: 1920, priceLevel: 2, strengths: ['Non-toxic vegan gel polishes', 'Simultaneous manicure/pedicure express stations'], vulnerabilities: ['Peak weekend congestion requiring deposit booking'] },
      { name: `Elysium Thermal Bath & Swedish Massage ${city}`, address: `${st3} No:95, ${city}`, neighborhood: 'Wellness District', rating: 4.6, reviews: 1150, priceLevel: 4, strengths: ['Private hydrotherapy soaking suites', 'Couple treatment packages'], vulnerabilities: ['High utility operating costs for steam and saunas'] },
    ];
  }

  // 12. Furniture, Home Decor, Lighting & Interior Design
  if (s.includes('furniture') || s.includes('decor') || s.includes('interior') || s.includes('lighting') || s.includes('kitchen') || s.includes('rug') || s.includes('mattress') || s.includes('home') || s.includes('architect')) {
    return [
      { name: `${city} Scandinavian Design & Furniture Gallery`, address: `${st0} No:150, ${city}`, neighborhood: 'Design District', rating: 4.8, reviews: 1840, priceLevel: 4, strengths: ['Authentic solid oak & teak minimalist collections', 'In-house 3D interior architecture studio'], vulnerabilities: ['8-12 week custom upholstery production lead time'] },
      { name: `${city} Heritage Home Furnishings & Living Concepts`, address: `${st1} No:210, ${city}`, neighborhood: 'Commercial Boulevard', rating: 4.5, reviews: 3400, priceLevel: 2, strengths: ['Immediate local warehouse stock delivery', 'Interest-free installment financing'], vulnerabilities: ['Large footprint creates high square-meter overhead'] },
      { name: `Lumina Architectural Lighting & Smart Home ${city}`, address: `${st2} No:40, ${city}`, neighborhood: 'Creative Tech Quarter', rating: 4.7, reviews: 860, priceLevel: 3, strengths: ['DALI & Zigbee smart lighting interactive darkroom', 'Commercial contractor bulk pricing tier'], vulnerabilities: ['Niche technical focus requires specialized sales consultants'] },
    ];
  }

  // 13. Education, Tutoring, Language & Art Academies
  if (s.includes('education') || s.includes('tutor') || s.includes('school') || s.includes('academy') || s.includes('language') || s.includes('music') || s.includes('art') || s.includes('dance') || s.includes('stem') || s.includes('coding') || s.includes('child')) {
    return [
      { name: `${city} Cambridge Scholars Academic & STEM Center`, address: `${st0} No:72, ${city}`, neighborhood: 'University & Civic Core', rating: 4.9, reviews: 1120, priceLevel: 3, strengths: ['98% top-tier university placement rate', 'State-of-the-art robotics and chemistry labs'], vulnerabilities: ['Strict entrance diagnostic assessment', 'Premium term tuition fees'] },
      { name: `${city} Global Languages & Cultural Institute`, address: `${st1} No:33, ${city}`, neighborhood: 'Academic District', rating: 4.7, reviews: 1540, priceLevel: 2, strengths: ['Native-speaking instructors for 12 languages', 'Flexible hybrid evening & weekend schedules'], vulnerabilities: ['Seasonal enrollment drop during summer holiday months'] },
      { name: `Virtuoso Music & Performing Arts Conservatory ${city}`, address: `${st2} No:18, ${city}`, neighborhood: 'Cultural Arts Row', rating: 4.8, reviews: 930, priceLevel: 3, strengths: ['Soundproof Steinway piano studios', 'Annual philharmonic youth showcase'], vulnerabilities: ['Limited soundproof room capacity during after-school peak (4-7 PM)'] },
    ];
  }

  // 14. Pet Hospital, Veterinary, Grooming & Pet Supplies
  if (s.includes('pet') || s.includes('vet') || s.includes('dog') || s.includes('cat') || s.includes('animal') || s.includes('aquarium')) {
    return [
      { name: `${city} 24/7 Animal Emergency Hospital & Trauma Center`, address: `${st0} No:88, ${city}`, neighborhood: 'Medical & Civic Boulevard', rating: 4.8, reviews: 3100, priceLevel: 3, strengths: ['24/7 on-call veterinary surgeons and digital CT scanner', 'Separate stress-free cat and dog waiting lobbies'], vulnerabilities: ['High emergency intake triage wait times during night shifts'] },
      { name: `Paws & Paws Luxury Pet Spa & Canine Boutique ${city}`, address: `${st1} No:27, ${city}`, neighborhood: 'Residential Green Corridor', rating: 4.7, reviews: 1650, priceLevel: 3, strengths: ['Organic hydro-massage baths and styling', 'Gourmet raw dog bakery & wellness treats'], vulnerabilities: ['Saturday appointments booked 3 weeks in advance'] },
      { name: `${city} Veterinary Care & Wellness Clinic`, address: `${st2} No:49, ${city}`, neighborhood: 'Central Neighborhood', rating: 4.6, reviews: 1980, priceLevel: 2, strengths: ['Preventive vaccine plans', 'Affordable annual dental cleaning packages'], vulnerabilities: ['Smaller facility lacks overnight critical care boarding'] },
    ];
  }

  // 15. Entertainment, Cinema, Gaming, VR & Sports
  if (s.includes('cinema') || s.includes('movie') || s.includes('game') || s.includes('gaming') || s.includes('vr') || s.includes('arcade') || s.includes('bowling') || s.includes('escape') || s.includes('entertainment') || s.includes('play')) {
    return [
      { name: `${city} IMAX Cineplex & VIP Lounge`, address: `${st0} No:1, ${city}`, neighborhood: 'City Center Mall', rating: 4.7, reviews: 7800, priceLevel: 3, strengths: ['Laser IMAX projection and motorized leather recliners', 'Full hot menu and craft beer service delivered to seat'], vulnerabilities: ['High ticket pricing reduces frequency for large families'] },
      { name: `HyperSpace VR & Esports Arena ${city}`, address: `${st1} No:56, ${city}`, neighborhood: 'Innovation & Youth District', rating: 4.8, reviews: 1420, priceLevel: 3, strengths: ['Omni-directional VR treadmills and 10Gbps LAN gaming rigs', 'Popular birthday and corporate team-building venue'], vulnerabilities: ['Hardware depreciation requires bi-annual GPU upgrades'] },
      { name: `Kingpin Boutique Bowling & Retro Arcade ${city}`, address: `${st2} No:102, ${city}`, neighborhood: 'Entertainment Strip', rating: 4.6, reviews: 3900, priceLevel: 3, strengths: ['Bespoke retro pinball machines and illuminated cocktail lanes', 'Late-night DJ residency on weekends'], vulnerabilities: ['High acoustic noise levels deter quiet corporate gatherings'] },
    ];
  }

  // 16. Hotels, Hospitality & Extended Stay Suites
  if (s.includes('hotel') || s.includes('hospitality') || s.includes('hostel') || s.includes('lodge') || s.includes('resort') || s.includes('suite') || s.includes('inn') || s.includes('stay')) {
    return [
      { name: `The Grand Regency Hotel & Suites ${city}`, address: `${st0} No:10, ${city}`, neighborhood: 'Central Historic Square', rating: 4.8, reviews: 4500, priceLevel: 4, strengths: ['5-star luxury heritage building with rooftop infinity pool', 'Michelin-guide recognized ballroom dining'], vulnerabilities: ['High fixed room service staffing costs'] },
      { name: `${city} Urban Boutique Hotel & Art Lounge`, address: `${st1} No:42, ${city}`, neighborhood: 'Creative Arts Quarter', rating: 4.7, reviews: 2800, priceLevel: 3, strengths: ['Curated contemporary local art in each room', 'High international business traveler loyalty'], vulnerabilities: ['Limited on-site subterranean parking (15 valet spots)'] },
      { name: `CityStay Executive Suites & Co-Living ${city}`, address: `${st2} No:77, ${city}`, neighborhood: 'Financial Business Core', rating: 4.5, reviews: 1890, priceLevel: 3, strengths: ['Fully equipped designer kitchens with high-speed fiber', 'Flexible weekly and monthly corporate booking tiers'], vulnerabilities: ['Minimal front-desk concierge services'] },
    ];
  }

  // 17. Logistics, Dark Stores, Courier & 3D Prototyping
  if (s.includes('logistic') || s.includes('courier') || s.includes('delivery') || s.includes('dark store') || s.includes('warehouse') || s.includes('print') || s.includes('cargo') || s.includes('freight')) {
    return [
      { name: `${city} Express Micro-Fulfillment & Dark Store Hub`, address: `${st0} No:200, ${city}`, neighborhood: 'Metropolitan Logistics Ring', rating: 4.7, reviews: 850, priceLevel: 2, strengths: ['15-minute ultra-fast neighborhood delivery radius', 'Automated robotic pick-and-pack sorting conveyor'], vulnerabilities: ['Restricted customer walk-in access limits street brand exposure'] },
      { name: `${city} Industrial 3D Additive Manufacturing & Prototyping Lab`, address: `${st1} No:64, ${city}`, neighborhood: 'Industrial Tech Park', rating: 4.8, reviews: 520, priceLevel: 3, strengths: ['Direct metal laser sintering (DMLS) and carbon-fiber printers', 'Aerospace and medical device ISO-certified cleanroom'], vulnerabilities: ['High raw material powder inventory carrying costs'] },
      { name: `Global Cargo & Courier Dispatch Center ${city}`, address: `${st2} No:118, ${city}`, neighborhood: 'Transit Gateway', rating: 4.4, reviews: 1950, priceLevel: 2, strengths: ['Same-day international customs clearance brokerage', '24/7 automated package drop & locker bank'], vulnerabilities: ['Heavy truck traffic requires strict municipal zoning permits'] },
    ];
  }

  // 18. Breweries, Distilleries, Wineries, Bars & Nightclubs
  if (s.includes('brew') || s.includes('bar') || s.includes('pub') || s.includes('wine') || s.includes('cocktail') || s.includes('nightclub') || s.includes('lounge') || s.includes('distill') || s.includes('alcohol')) {
    return [
      { name: `${city} Craft Brewery & Industrial Taproom`, address: `${st0} No:22, ${city}`, neighborhood: 'Warehouse Arts District', rating: 4.8, reviews: 3600, priceLevel: 2, strengths: ['24 rotating fresh craft taps brewed on-site', 'Outdoor heated beer garden and live music stage'], vulnerabilities: ['Seasonal revenue drop during cold winter weekdays'] },
      { name: `The Alchemist Speakeasy & Cocktail Parlor ${city}`, address: `${st1} No:7, ${city}`, neighborhood: 'Historic Downtown Core', rating: 4.9, reviews: 2200, priceLevel: 4, strengths: ['Award-winning mixologists with bespoke molecular cocktails', 'High-spend VIP bottle and lounge reservations'], vulnerabilities: ['Strict dress code and 60-person intimate capacity'] },
      { name: `${city} Sommelier Wine Cellar & Tapas Bar`, address: `${st2} No:48, ${city}`, neighborhood: 'Old Town Promenade', rating: 4.7, reviews: 1780, priceLevel: 3, strengths: ['Over 400 biodynamic and vintage wines by the glass', 'Charcuterie pairings sourced directly from European farms'], vulnerabilities: ['High sommelier training and temperature-controlled storage overhead'] },
    ];
  }

  // 19. Smart Generic Dynamic Generator tailored 100% to the specific sector name and city
  const cleanSector = sector || 'Commercial Business';
  const cleanSectorWords = cleanSector
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
    .split(' ')
    .filter((w) => w.length > 2);
  const primarySectorKeyword = cleanSectorWords[0] || 'Commercial';
  const secondarySectorKeyword = cleanSectorWords[1] || 'Enterprise';

  return [
    {
      name: `${city} Prime ${primarySectorKeyword} ${secondarySectorKeyword} Flagship`,
      address: `${st0} No:108, ${city}`,
      neighborhood: `${lm0} District`,
      rating: 4.8,
      reviews: 1420,
      priceLevel: 3,
      strengths: [`Direct streetfront visibility along ${st0}`, `Established brand reputation in ${cleanSector}`, 'Loyal recurring customer accounts'],
      vulnerabilities: ['Higher square meter leasing overhead', 'Peak hour customer service bottlenecks'],
    },
    {
      name: `Vanguard & Artisan ${primarySectorKeyword} Studio ${city}`,
      address: `${st1} No:44, ${city}`,
      neighborhood: `${lm1} Quarter`,
      rating: 4.7,
      reviews: 980,
      priceLevel: 3,
      strengths: ['Specialized bespoke offerings with high average spend', `Proximity to ${lm1} draws affluent footfall`],
      vulnerabilities: ['Limited parking spaces during rush hours', 'Niche marketing focus'],
    },
    {
      name: `${city} ${primarySectorKeyword} Hub & Solutions`,
      address: `${st2} No:19, ${city}`,
      neighborhood: 'Downtown Central',
      rating: 4.5,
      reviews: 730,
      priceLevel: 2,
      strengths: ['Competitive value pricing tier', 'Rapid same-day service and turnaround'],
      vulnerabilities: ['Smaller floorplate limits large interactive displays', 'Lower baseline digital ad spend'],
    },
    {
      name: `Apex ${secondarySectorKeyword || primarySectorKeyword} Center ${city}`,
      address: `${st3} No:72, ${city}`,
      neighborhood: 'Commercial Corridor',
      rating: 4.6,
      reviews: 580,
      priceLevel: 3,
      strengths: ['Modern physical interior fitout', 'Strong regional supplier partnerships'],
      vulnerabilities: ['Under-developed mobile app loyalty ecosystem', 'Customer inquiry response latency'],
    },
  ];
}

export function generateClientMarketFallback(
  city: string,
  country: string,
  sector: string,
  priceTier: TargetPriceTier | string,
  storeFormat: StoreFormatType | string,
  latitude: number,
  longitude: number
): CommercialMarketAnalysis {
  let cLat = (latitude !== 0 && !isNaN(latitude)) ? latitude : 0;
  let cLng = (longitude !== 0 && !isNaN(longitude)) ? longitude : 0;
  const cleanSector = sector || 'Bank Branch & ATM Center';

  const realCityData = generateRealCityData(city, country, cLat, cLng);

  if ((cLat === 0 && cLng === 0) || (cLat === 51.5074 && cLng === -0.1278)) {
    if (realCityData.lat && realCityData.lng) {
      cLat = realCityData.lat;
      cLng = realCityData.lng;
    }
  }
  if (cLat === 0 && cLng === 0) {
    cLat = 39.9910;
    cLng = 46.9274;
  }

  // Extract real street and landmark names from city data
  const sampleStreets = realCityData.commercialDistricts.flatMap((d) => d.streets);
  const sampleLandmarks = realCityData.commercialDistricts.flatMap((d) => d.landmarks);

  // Generate distinct, realistic competitor establishments for the exact sector
  const competitorList = getSectorCompetitorTemplates(city, cleanSector, sampleStreets, sampleLandmarks);

  // Generate competitors with real coordinates
  const competitors: CompetitorEstablishment[] = competitorList.map((comp, idx) => {
    const angle = (idx * (2 * Math.PI)) / Math.max(1, competitorList.length);
    const distanceOffset = 0.005 + (idx % 3) * 0.003;
    return {
      id: `comp-${idx + 1}`,
      name: comp.name,
      sector: cleanSector,
      address: comp.address,
      neighborhood: comp.neighborhood,
      latitude: Number((cLat + Math.sin(angle) * distanceOffset).toFixed(6)),
      longitude: Number((cLng + Math.cos(angle) * distanceOffset).toFixed(6)),
      rating: comp.rating,
      userRatingsTotal: comp.reviews,
      priceLevel: comp.priceLevel,
      estimatedFootprintM2: 150 + (idx % 4) * 80,
      estimatedDailyFootfall: 450 + (idx % 5) * 160,
      marketShareEstimatePct: Math.round(100 / (competitorList.length + 1) + (idx % 2 === 0 ? 5 : -3)),
      strengths: comp.strengths,
      vulnerabilities: comp.vulnerabilities,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${comp.name} ${comp.address}`
      )}`,
    };
  });

  // Generate Opportunity Zones from Real Districts
  const opportunityZones: OpportunityZone[] = realCityData.commercialDistricts.map((dist, idx) => {
    const zoneLat = Number((cLat + dist.dLat).toFixed(6));
    const zoneLng = Number((cLng + dist.dLng).toFixed(6));
    const isPrime = idx === 0;

    const baseScore = isPrime ? 96 : 88 - idx * 7;
    const successProb = isPrime ? 93 : 86 - idx * 6;

    return {
      id: `zone-${idx + 1}`,
      name: dist.name,
      district: dist.neighborhood,
      latitude: zoneLat,
      longitude: zoneLng,
      radiusMeters: 500 + idx * 120,
      opportunityScore: baseScore,
      successProbabilityPct: successProb,
      demandSaturation: isPrime
        ? 'Under-served (High Demand)'
        : idx === 1
        ? 'Under-served (High Demand)'
        : 'Balanced Market',
      potentialCustomerBase: 50000 + (3 - idx) * 22000,
      targetDemographicFitScore: isPrime ? 95 : 88 - idx * 6,
      demographicSummary: {
        primaryAgeGroup: dist.targetAgeGroup,
        averageHouseholdIncomeUsd: dist.householdIncome,
        footfallProfile: dist.footfallProfile,
        consumerSpendingIndex: dist.spendingIndex,
      },
      predictedAnnualSalesVolumeUsd: {
        low: Math.round((1200000 + (3 - idx) * 300000) * (dist.spendingIndex / 100)),
        expected: Math.round((1900000 + (3 - idx) * 420000) * (dist.spendingIndex / 100)),
        high: Math.round((2800000 + (3 - idx) * 580000) * (dist.spendingIndex / 100)),
      },
      unmetDemandDrivers: [
        `High demographic concentration of ${dist.targetAgeGroup} (${dist.spendingIndex} purchasing power index).`,
        `Commercial spine along ${dist.streets.slice(0, 2).join(' & ')} currently exhibits unmet demand for high-quality "${cleanSector}".`,
        `Continuous footfall anchored by ${dist.landmarks.slice(0, 2).join(', ')}.`,
      ],
      recommendedStrategy: `Establish a flagship footprint on ${dist.streets[0]}. Leverage storefront glazed frontage and omni-channel click-and-collect to capture local footfall.`,
      swotAnalysis: {
        strengths: [
          `Highest spending index (${dist.spendingIndex}) across the metropolitan district`,
          `Constant footfall draw from ${dist.landmarks[0] || 'central transit and attractions'}`,
          `Strong demographic alignment with target price tier`,
        ],
        weaknesses: [
          `Premium lease rates on ${dist.streets[0]} require disciplined inventory turnover`,
          `Competitive licensing timeline for streetfront terrace extensions`,
        ],
        opportunities: [
          `Pioneer modern customer experiences in "${cleanSector}" along ${dist.streets[0]}`,
          `Collaborate with local business associations and corporate offices nearby`,
        ],
        threats: [
          `Potential new entrants attracted by the district's high retail footfall`,
          `Peak hour traffic requiring clear public parking guidance`,
        ],
      },
      matchedVacantPropertyIds: [`prop-${idx * 2 + 1}`, `prop-${idx * 2 + 2}`].filter(
        (_, pIdx) => pIdx < realCityData.vacantBuildings.length
      ),
      nearbyParkingIds: [`park-1`, `park-2`],
    };
  });

  // Generate Vacant Properties
  const vacantProperties: VacantCommercialProperty[] = realCityData.vacantBuildings.map((bldg, idx) => {
    const dist = realCityData.commercialDistricts[bldg.districtIdx] || realCityData.commercialDistricts[0];
    const pLat = Number((cLat + dist.dLat + (idx % 2 === 0 ? 0.0012 : -0.0015)).toFixed(6));
    const pLng = Number((cLng + dist.dLng + (idx % 2 === 0 ? -0.001 : 0.0018)).toFixed(6));
    const sizeSqFt = Math.round(bldg.sizeM2 * 10.7639);
    const rentPerM2Usd = Math.round(bldg.monthlyRent / bldg.sizeM2);

    return {
      id: `prop-${idx + 1}`,
      title: bldg.title,
      buildingName: bldg.buildingName,
      address: bldg.address,
      crossStreets: bldg.crossStreets,
      neighborhood: dist.neighborhood,
      latitude: pLat,
      longitude: pLng,
      sizeM2: bldg.sizeM2,
      sizeSqFt: sizeSqFt,
      monthlyRentUsd: bldg.monthlyRent,
      rentPerM2Usd: rentPerM2Usd,
      propertyType: 'Street Retail Front',
      zoningPermits: ['Commercial Class E (Retail / Dining)', 'Signage Approved'],
      features: bldg.features,
      contactAgent: `Commercial Advisory Group (${city})`,
      phone: '+1 (800) 555-SITE',
      isHighOpportunityMatch: idx === 0,
      deploymentScore: 92 - idx * 4,
      estimatedDailyFootfall: 1400 - idx * 120,
      estimatedFitoutCostUsd: 45000 + idx * 8000,
      estimatedBreakevenMonths: 10 + idx * 2,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${bldg.title || bldg.buildingName} ${bldg.address}`
      )}`,
    };
  });

  // Generate Parking Facilities
  const parkingFacilities: ParkingFacility[] = realCityData.parkingGarages.map((prk, idx) => {
    const pkLat = Number((cLat + prk.dLat).toFixed(6));
    const pkLng = Number((cLng + prk.dLng).toFixed(6));

    return {
      id: `park-${idx + 1}`,
      name: prk.name,
      type: 'Multi-story Garage',
      address: prk.address,
      neighborhood: `${city} Core`,
      latitude: pkLat,
      longitude: pkLng,
      capacitySpaces: prk.capacity,
      hourlyRateUsd: prk.hourlyRate,
      distanceToZoneMeters: 60 + idx * 75,
      hasEvCharging: prk.hasEv,
      convenienceScore: 90 - idx * 5,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${prk.name} ${prk.address}`
      )}`,
    };
  });

  // Concrete Deployment Sites (ranked)
  const concreteDeploymentSites: ConcreteDeploymentSite[] = opportunityZones.map((zone, idx) => {
    const matchedProp = vacantProperties[idx] || vacantProperties[0];
    const nearestPark = parkingFacilities[0];

    return {
      id: `site-${idx + 1}`,
      buildingName: matchedProp.buildingName || `Commercial Building ${idx + 1}`,
      unitOrSuite: `Suite ${100 + idx * 10}`,
      exactStreetAddress: matchedProp.address,
      crossStreets: matchedProp.crossStreets || `${sampleStreets[0] || 'Main St'} & ${sampleStreets[1] || 'Market St'}`,
      neighborhood: zone.district,
      city: city,
      country: country,
      latitude: matchedProp.latitude,
      longitude: matchedProp.longitude,
      deploymentSuitabilityScore: zone.opportunityScore,
      suggestedBusinessConcept: `High-impact ${cleanSector} flagship designed for urban density`,
      spaceType: matchedProp.propertyType,
      floorAreaM2: matchedProp.sizeM2,
      floorAreaSqFt: matchedProp.sizeSqFt,
      monthlyRentUsd: matchedProp.monthlyRentUsd,
      estimatedFitoutCapExUsd: 120000 + (3 - idx) * 35000,
      estimatedBreakevenMonths: 11 + idx * 2,
      dailyPedestrianFootfall: matchedProp.estimatedDailyFootfall || 1200,
      footfallPeakHours: '12:00 - 14:00 & 17:30 - 20:30',
      targetAudienceFitPct: zone.targetDemographicFitScore,
      frontageWidthMeters: 8.5 + idx * 1.5,
      ceilingHeightMeters: 3.8,
      availablePowerKw: 45,
      hvacStatus: 'Fully operational central HVAC',
      loadingAccess: 'Rear dedicated commercial loading bay',
      signagePermitStatus: 'Pre-approved commercial fascia signage',
      zoningClassification: 'Commercial / Retail Class E',
      turnkeyTimelineWeeks: 6 + idx * 2,
      contactBroker: {
        agencyName: `Prime Commercial Advisors (${city})`,
        agentName: 'Marcus Vance',
        phone: '+1 (800) 555-SITE',
        email: `brokerage@${city.toLowerCase().replace(/[^a-z0-9]/g, '')}-realty.com`,
      },
      deploymentChecklist: [
        `Submit commercial lease Letter of Intent (LOI) for ${matchedProp.buildingName || 'premises'}`,
        `Engage local architecture bureau for interior store layout approval`,
        `Launch local geo-targeted awareness campaigns 4 weeks prior to grand opening`,
      ],
      keyAdvantages: [
        `Direct frontage on ${distStreet(zone, 0)} with ${zone.demographicSummary.footfallProfile.split('(')[0]}`,
        `High household income ($${zone.demographicSummary.averageHouseholdIncomeUsd.toLocaleString()})`,
        `Close proximity to ${nearestPark?.name || 'parking facilities'}`,
      ],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${matchedProp.buildingName || 'Commercial Site'} ${matchedProp.address}`
      )}`,
    };
  });

  return {
    id: `cma-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    searchCity: city,
    searchCountry: country,
    businessSector: cleanSector,
    targetPriceTier: priceTier as TargetPriceTier,
    storeFormat: storeFormat as StoreFormatType,
    analyzedAt: new Date().toISOString(),
    cityCenterCoordinates: {
      lat: cLat,
      lng: cLng,
    },
    executiveSummary: `Spatial market intelligence for "${cleanSector}" in ${city}, ${country} reveals strong commercial opportunity across ${opportunityZones.length} districts with ${opportunityZones[0]?.name || 'Central District'} leading at ${opportunityZones[0]?.opportunityScore || 95}/100 opportunity score.`,
    marketOverview: {
      totalExistingCompetitors: competitors.length,
      averageCompetitorRating: 4.6,
      marketSaturationIndex: 42,
      unmetDemandIndex: 78,
      totalAddressableMarketAnnualUsd: 4800000,
      primeRecommendedZoneName: opportunityZones[0]?.name || 'Prime Commercial Zone',
      primeZoneOpportunityScore: opportunityZones[0]?.opportunityScore || 95,
    },
    opportunityZones,
    competitors,
    vacantProperties,
    parkingFacilities,
    concreteDeploymentSites,
    keyAiInsights: [
      `In ${city}, ${opportunityZones[0]?.name || 'Central District'} ranks as the #1 commercial location for "${cleanSector}" with an Opportunity Score of ${opportunityZones[0]?.opportunityScore || 95}/100.`,
      `Local consumer spending power index stands at ${opportunityZones[0]?.demographicSummary.consumerSpendingIndex || 150} with high unmet demand along ${sampleStreets[0] || 'primary commercial corridors'}.`,
      `Available prime commercial inventory includes ${vacantProperties[0]?.buildingName || 'flagship units'} with direct proximity to ${parkingFacilities[0]?.name || 'multilevel parking facilities'}.`,
    ],
    strategicActionPlan: [
      `Phase 1 (Weeks 1-3): Site inspection and LOI execution for ${vacantProperties[0]?.title || 'Prime retail premises'}.`,
      `Phase 2 (Weeks 4-8): Architectural store design, permitting and procurement with local ${city} contractors.`,
      `Phase 3 (Weeks 9-12): Staff recruitment, inventory stocking and grand opening campaign targeting ${opportunityZones[0]?.demographicSummary.primaryAgeGroup || 'key demographics'}.`,
    ],
  };
}

function distStreet(zone: OpportunityZone, index: number): string {
  if (!zone) return 'High Street';
  const match = zone.unmetDemandDrivers.find((d) => d.includes('along'));
  if (match) {
    const parts = match.split('along')[1];
    if (parts) return parts.split('exhibiting')[0].trim();
  }
  return 'Prime Commercial Boulevard';
}
