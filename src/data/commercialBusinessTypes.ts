export interface CommercialBusinessType {
  business_id: string;
  business_type_name: string;
  online_or_onsite: 'Hybrid' | 'Onsite' | 'Online' | string;
  place: string;
  approximately_area: string;
  popularity: 'Low' | 'Medium' | 'High' | 'Very High' | string;
  customer_type?: 'companies' | 'all' | 'children' | 'woman' | 'families' | 'man' | 'youth' | 'seniors' | 'students' | string;
}

export const COMMERCIAL_BUSINESS_TYPES: CommercialBusinessType[] = [
  {
    "business_id": "BUS-0001",
    "business_type_name": "3D Printing Bureau",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0002",
    "business_type_name": "3D Scan & Modeling Studio",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "80 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0003",
    "business_type_name": "Academic Tutoring Center",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0004",
    "business_type_name": "Accounting & Tax Advisory",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0005",
    "business_type_name": "Acupuncture & Wellness Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0006",
    "business_type_name": "Actuarial Consulting Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0007",
    "business_type_name": "AdTech Infrastructure Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0008",
    "business_type_name": "Aerial Photography Service",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "60 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0009",
    "business_type_name": "Aerial Yoga Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0010",
    "business_type_name": "AI & Machine Learning Lab",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "400 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0011",
    "business_type_name": "Aircraft Maintenance Hangar",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "5000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0012",
    "business_type_name": "Alternative Energy Consultancy",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0013",
    "business_type_name": "Ambulance & Medical Transport",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0014",
    "business_type_name": "Amusement Park",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "15000 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0015",
    "business_type_name": "Animal Shelter & Sanctuary",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "3000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0016",
    "business_type_name": "Animation & VFX Studio",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0017",
    "business_type_name": "Antique Restoration Shop",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0018",
    "business_type_name": "Antiques & Collectibles Gallery",
    "online_or_onsite": "Onsite",
    "place": "Historical Building",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0019",
    "business_type_name": "API Integration Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0020",
    "business_type_name": "Aquatic Sports Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0021",
    "business_type_name": "Arbitration & Mediation Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0022",
    "business_type_name": "Arborist & Tree Care Service",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0023",
    "business_type_name": "Arcade & Gaming Lounge",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0024",
    "business_type_name": "Architectural Model Studio",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0025",
    "business_type_name": "Architecture & Urban Design",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "280 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0026",
    "business_type_name": "Aromatherapy & Essential Oils Shop",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "45 m2",
    "popularity": "Medium",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0027",
    "business_type_name": "Art Auction House",
    "online_or_onsite": "Onsite",
    "place": "Historical Building",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0028",
    "business_type_name": "Art Gallery & Exhibition Space",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0029",
    "business_type_name": "Art Supplies Depot",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "220 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0030",
    "business_type_name": "Artisan Bakery",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "95 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0031",
    "business_type_name": "Artisan Cheese Shop",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "50 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0032",
    "business_type_name": "Artisan Glassblowing Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0033",
    "business_type_name": "Artisan Leather Goods Shop",
    "online_or_onsite": "Hybrid",
    "place": "Historical Building",
    "approximately_area": "70 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0034",
    "business_type_name": "Artisan Pottery Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0035",
    "business_type_name": "Artisanal Chocolate Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "65 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0036",
    "business_type_name": "Asset Management Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "450 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0037",
    "business_type_name": "Astro-Tourism Observatory",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "1200 m2",
    "popularity": "Medium",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0038",
    "business_type_name": "Audio Equipment Rental",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0039",
    "business_type_name": "Auto Body Repair & Paint",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "850 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0040",
    "business_type_name": "Auto Salvage & Recycling",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "4000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0041",
    "business_type_name": "Auto Tuning & Performance Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0042",
    "business_type_name": "Automated Express Car Wash",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "700 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0043",
    "business_type_name": "Autonomous Vehicle Software Lab",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0044",
    "business_type_name": "Aviation Flight School",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0045",
    "business_type_name": "Axe Throwing Lounge",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0046",
    "business_type_name": "Baby & Children Boutique",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "85 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0047",
    "business_type_name": "Bagel & Breakfast Deli",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "75 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0048",
    "business_type_name": "Balloon & Event Decor",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "90 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0049",
    "business_type_name": "Bank Branch & ATM Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0050",
    "business_type_name": "Barbershop & Men's Grooming",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "60 m2",
    "popularity": "Very High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0051",
    "business_type_name": "Barre Fitness Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "140 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0052",
    "business_type_name": "BBQ Smokehouse & Restaurant",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "280 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0053",
    "business_type_name": "Bicycle Repair & Retail Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0054",
    "business_type_name": "Billiards & Pool Hall",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "450 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0055",
    "business_type_name": "Biohazard Remediation Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0056",
    "business_type_name": "Bioinformatics Software Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0057",
    "business_type_name": "Biometric Security Solutions",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0058",
    "business_type_name": "Biotechnology Research Lab",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0059",
    "business_type_name": "Bitumen & Asphalt Paving",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0060",
    "business_type_name": "Blockchain Engineering Studio",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0061",
    "business_type_name": "Board Game Cafe",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "130 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0062",
    "business_type_name": "Boarding Kennel & Pet Hotel",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "1000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0063",
    "business_type_name": "Boat Repair & Maintenance",
    "online_or_onsite": "Onsite",
    "place": "Marina Pier",
    "approximately_area": "800 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0064",
    "business_type_name": "Boba Tea & Dessert Lounge",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "50 m2",
    "popularity": "Very High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0065",
    "business_type_name": "Botanical Garden & Conservatory",
    "online_or_onsite": "Onsite",
    "place": "Park Street",
    "approximately_area": "8000 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0066",
    "business_type_name": "Boutique Fashion Emporium",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0067",
    "business_type_name": "Boutique Hotel & Beach Resort",
    "online_or_onsite": "Onsite",
    "place": "Beach",
    "approximately_area": "5000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0068",
    "business_type_name": "Bowling Alley & Entertainment",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "1800 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0069",
    "business_type_name": "Boxing Gym & Academy",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "320 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0070",
    "business_type_name": "Brand Strategy Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0071",
    "business_type_name": "Brass & Metal Foundry",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2200 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0072",
    "business_type_name": "Bridal & Formal Wear Boutique",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0073",
    "business_type_name": "Broadcast Television Studio",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0074",
    "business_type_name": "Building Inspection Services",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "70 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0075",
    "business_type_name": "Business Appraisal Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0076",
    "business_type_name": "Business Intelligence Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0077",
    "business_type_name": "Business Process Outsourcing (BPO)",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0078",
    "business_type_name": "Cabaret & Dinner Theater",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "500 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0079",
    "business_type_name": "Cabinetry & Fine Woodworking",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "450 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0080",
    "business_type_name": "Calibration Laboratory",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0081",
    "business_type_name": "Call Center Services",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0082",
    "business_type_name": "Camera & Gear Rental Hub",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "140 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0083",
    "business_type_name": "Camping & Outdoor Outfitter",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0084",
    "business_type_name": "Cancer Treatment Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "3500 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0085",
    "business_type_name": "Candy & Confectionery Shop",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "65 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0086",
    "business_type_name": "Canine Agility Training Center",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "1500 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0087",
    "business_type_name": "Capital Management Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0088",
    "business_type_name": "Car Audio & Electronics Shop",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "130 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0089",
    "business_type_name": "Car Detailing & Paint Protection",
    "online_or_onsite": "Onsite",
    "place": "Underground Parking",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0090",
    "business_type_name": "Car Rental Agency",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0091",
    "business_type_name": "Car Wash & Detailing Hub",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0092",
    "business_type_name": "Car Wrap & Graphics Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "280 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0093",
    "business_type_name": "Card & Comic Book Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "Medium",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0094",
    "business_type_name": "Catering & Banquet Services",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0095",
    "business_type_name": "Cellular Repair & Accessories",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "35 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0096",
    "business_type_name": "Ceramic Tile & Stone Showroom",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "450 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0097",
    "business_type_name": "Chemical Processing Facility",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "6000 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0098",
    "business_type_name": "Children's Daycare Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "350 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0099",
    "business_type_name": "Children's Indoor Play Center",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "600 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0100",
    "business_type_name": "Chiropractic Care Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0101",
    "business_type_name": "Chocolatier Studio",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0102",
    "business_type_name": "Choreography Studio",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0103",
    "business_type_name": "Churrascaria Brazilian Steakhouse",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "650 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0104",
    "business_type_name": "Cider Brewery & Taproom",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0105",
    "business_type_name": "Cinema Multiplex",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "3500 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0106",
    "business_type_name": "Civil Engineering Consultancy",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0107",
    "business_type_name": "Classic Car Restoration Shop",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "900 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0108",
    "business_type_name": "Cleanroom Manufacturing",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1800 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0109",
    "business_type_name": "Clinical Research Organization",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0110",
    "business_type_name": "Clothing Alterations & Tailoring",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "40 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0111",
    "business_type_name": "Cloud Architecture Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0112",
    "business_type_name": "Cloud Kitchen - Italian Cuisine",
    "online_or_onsite": "Online",
    "place": "Industrial Zone",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0113",
    "business_type_name": "Cloud Kitchen - Pizza Express",
    "online_or_onsite": "Online",
    "place": "Basement Level",
    "approximately_area": "100 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0114",
    "business_type_name": "Cloud Kitchen - Sushi Bar",
    "online_or_onsite": "Online",
    "place": "Industrial Zone",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0115",
    "business_type_name": "Cocktail Lounge & Bar",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "160 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0116",
    "business_type_name": "Coding Boot Camp",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0117",
    "business_type_name": "Coffee Roastery & Specialty Cafe",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0118",
    "business_type_name": "Cold Storage Logistics Facility",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "4500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0119",
    "business_type_name": "Cold-Pressed Juice Bar",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "30 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0120",
    "business_type_name": "Comedy Club",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "280 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0121",
    "business_type_name": "Commercial Cleaning Services",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0122",
    "business_type_name": "Commercial Diving Services",
    "online_or_onsite": "Onsite",
    "place": "Marina Pier",
    "approximately_area": "300 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0123",
    "business_type_name": "Commercial Freight Forwarding",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0124",
    "business_type_name": "Commercial Laundry Facility",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0125",
    "business_type_name": "Commercial Printing Press",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0126",
    "business_type_name": "Commercial Real Estate Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0127",
    "business_type_name": "Commercial Refrigeration Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0128",
    "business_type_name": "Community Health Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0129",
    "business_type_name": "Compliance & Regulatory Tech",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0130",
    "business_type_name": "Custom Neon Sign Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0131",
    "business_type_name": "Cyber Defense Operation Center",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "500 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0132",
    "business_type_name": "Cybersecurity Consulting Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0133",
    "business_type_name": "Dance Academy & Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0134",
    "business_type_name": "Data Analytics Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0135",
    "business_type_name": "Data Center Operations",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "5000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0136",
    "business_type_name": "Database Administration Services",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0137",
    "business_type_name": "Debt Collection Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0138",
    "business_type_name": "Dental Clinic & Surgery",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0139",
    "business_type_name": "Dermatology & Skin Care Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "220 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0140",
    "business_type_name": "Design Prototyping Workshop",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0141",
    "business_type_name": "Desktop Publishing Services",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0142",
    "business_type_name": "Dialysis Medical Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0143",
    "business_type_name": "Digital Marketing Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0144",
    "business_type_name": "Digital Printing Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0145",
    "business_type_name": "Dim Sum Restaurant",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0146",
    "business_type_name": "Direct Mail Marketing Agency",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0147",
    "business_type_name": "Discount Variety Store",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "600 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0148",
    "business_type_name": "Diving & Scuba School",
    "online_or_onsite": "Onsite",
    "place": "Beach",
    "approximately_area": "250 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0149",
    "business_type_name": "Dog Boarding & Daycare",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0150",
    "business_type_name": "Dog Grooming Salon",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "70 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0151",
    "business_type_name": "Donut Bakery & Coffee Shop",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0152",
    "business_type_name": "Drone Aerial Cinematography",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0153",
    "business_type_name": "Drone Repair & Maintenance",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "100 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0154",
    "business_type_name": "Dry Cleaning & Laundromat",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0155",
    "business_type_name": "Dumpling House Restaurant",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0156",
    "business_type_name": "E-Commerce Fulfillment Center",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "3500 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0157",
    "business_type_name": "E-Commerce Platform Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0158",
    "business_type_name": "Ear Nose Throat (ENT) Clinic",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "160 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0159",
    "business_type_name": "Earthmoving & Excavation",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0160",
    "business_type_name": "Eco-Friendly Dry Cleaner",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "95 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0161",
    "business_type_name": "EdTech Platform Solutions",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0162",
    "business_type_name": "Elder Care & Assisted Living",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2800 m2",
    "popularity": "High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0163",
    "business_type_name": "Electric Bicycle Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0164",
    "business_type_name": "Electric Vehicle Charging Station Hub",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "400 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0165",
    "business_type_name": "Electrical Contracting Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0166",
    "business_type_name": "Electroplating & Metal Finishing",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0167",
    "business_type_name": "Elevator Maintenance Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0168",
    "business_type_name": "Embedded Systems Design Lab",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0169",
    "business_type_name": "Emergency Medical Services Hub",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0170",
    "business_type_name": "Endangered Species Sanctuary",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "25000 m2",
    "popularity": "Medium",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0171",
    "business_type_name": "Endocrinology Clinic",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "140 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0172",
    "business_type_name": "Environmental Impact Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0173",
    "business_type_name": "Environmental Remediation Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0174",
    "business_type_name": "Equestrian Riding Center",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "12000 m2",
    "popularity": "Medium",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0175",
    "business_type_name": "Equipment Rental Depot",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0176",
    "business_type_name": "ER & Urgent Care Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1800 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0177",
    "business_type_name": "ERP Software Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0178",
    "business_type_name": "Escape Room Entertainment",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0179",
    "business_type_name": "eSports Arena & Studio",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "800 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0180",
    "business_type_name": "Essential Oils Distillery",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0181",
    "business_type_name": "Event Lighting & Audio Service",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "450 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0182",
    "business_type_name": "Event Planning Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0183",
    "business_type_name": "Executive Headhunting Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0184",
    "business_type_name": "Exotic Car Rental Agency",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0185",
    "business_type_name": "Eye Care & Optometry Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "130 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0186",
    "business_type_name": "Falconry Experience Center",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "5000 m2",
    "popularity": "Low",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0187",
    "business_type_name": "Family Law Practice",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "160 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0188",
    "business_type_name": "Farm Machinery Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1200 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0189",
    "business_type_name": "Farm-to-Table Restaurant",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "320 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0190",
    "business_type_name": "Fashion Design Studio",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0191",
    "business_type_name": "Fast Food Drive-Thru",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0192",
    "business_type_name": "Fencing Sports Academy",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0193",
    "business_type_name": "Film Editing & Post Production",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0194",
    "business_type_name": "Film Equipment Rental",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0195",
    "business_type_name": "Film Production Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0196",
    "business_type_name": "Financial Auditing Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0197",
    "business_type_name": "Fine Art Gallery",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0198",
    "business_type_name": "Fine Dining Seafood Restaurant",
    "online_or_onsite": "Onsite",
    "place": "Sea",
    "approximately_area": "450 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0199",
    "business_type_name": "Fine Dining Steakhouse",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "500 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0200",
    "business_type_name": "Fine Jewelry Boutique",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0201",
    "business_type_name": "Fire Protection Engineering",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0202",
    "business_type_name": "Firearm Safety Training & Range",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "800 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0203",
    "business_type_name": "Fireplace & Hearth Showroom",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0204",
    "business_type_name": "Fishmonger & Seafood Market",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0205",
    "business_type_name": "Fitness Gym & Crossfit Center",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "1200 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0206",
    "business_type_name": "Flea Market Operator",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "6000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0207",
    "business_type_name": "Fleet Management Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0208",
    "business_type_name": "Flight Simulator Center",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0209",
    "business_type_name": "Floatation Therapy Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "160 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0210",
    "business_type_name": "Floating Restaurant",
    "online_or_onsite": "Onsite",
    "place": "Sea",
    "approximately_area": "380 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0211",
    "business_type_name": "Flooring & Carpet Showroom",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "400 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0212",
    "business_type_name": "Floral Design Studio",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0213",
    "business_type_name": "Flower & Plant Nursery",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "3500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0214",
    "business_type_name": "Fluid Power & Hydraulics Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0215",
    "business_type_name": "Food Truck - Gourmet Burgers",
    "online_or_onsite": "Onsite",
    "place": "Park Street",
    "approximately_area": "18 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0216",
    "business_type_name": "Food Truck - Ice Cream",
    "online_or_onsite": "Onsite",
    "place": "Beach",
    "approximately_area": "15 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0217",
    "business_type_name": "Food Truck - Tacos",
    "online_or_onsite": "Onsite",
    "place": "Pedestrian Zone",
    "approximately_area": "18 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0218",
    "business_type_name": "Footwear Customization Studio",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "60 m2",
    "popularity": "Medium",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0219",
    "business_type_name": "Foreign Exchange Bureau",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "30 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0220",
    "business_type_name": "Foreign Language Academy",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0221",
    "business_type_name": "Forensic Accounting Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0222",
    "business_type_name": "Freight & Cargo Logistics",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "2000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0223",
    "business_type_name": "French Bakery & Patisserie",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0224",
    "business_type_name": "Frozen Yogurt Shop",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "45 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0225",
    "business_type_name": "Furniture Restoration Shop",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0226",
    "business_type_name": "Game Audio Design Studio",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "120 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0227",
    "business_type_name": "Game Development Studio",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "400 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0228",
    "business_type_name": "Garage Door Installation",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0229",
    "business_type_name": "Garden Center & Landscaping",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0230",
    "business_type_name": "Gastropub & Craft Brewery",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "350 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0231",
    "business_type_name": "Gelato Parlor",
    "online_or_onsite": "Onsite",
    "place": "Pedestrian Zone",
    "approximately_area": "50 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0232",
    "business_type_name": "Gemological Testing Lab",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "90 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0233",
    "business_type_name": "Genealogical Research Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Low",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0234",
    "business_type_name": "General Practice Medical Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0235",
    "business_type_name": "Geospatial & GIS Mapping",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0236",
    "business_type_name": "Glass & Mirror Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0237",
    "business_type_name": "Glassware Manufacturing",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2000 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0238",
    "business_type_name": "Golf Course & Country Club",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "50000 m2",
    "popularity": "Very High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0239",
    "business_type_name": "Gourmet Delicatessen",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0240",
    "business_type_name": "Gourmet Olive Oil & Vinegar",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "60 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0241",
    "business_type_name": "Gourmet Spice & Seasoning Shop",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "55 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0242",
    "business_type_name": "Graphic Design Studio",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0243",
    "business_type_name": "Green Energy Systems Installation",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0244",
    "business_type_name": "Greenhouse & Hydroponics",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "4000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0245",
    "business_type_name": "Gymnastics Training Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1000 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0246",
    "business_type_name": "Hair Extension & Wig Boutique",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "70 m2",
    "popularity": "Medium",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0247",
    "business_type_name": "Hair Salon & Styling Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0248",
    "business_type_name": "Hawaiian Poke Bowl Bar",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "65 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0249",
    "business_type_name": "Hazardous Material Disposal",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0250",
    "business_type_name": "Health Food & Supplement Shop",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0251",
    "business_type_name": "HealthTech Software Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0252",
    "business_type_name": "Hearing Aid & Audiology Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "100 m2",
    "popularity": "Medium",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0253",
    "business_type_name": "Heavy Machinery Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2500 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0254",
    "business_type_name": "Helicopter Charter Service",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "3000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0255",
    "business_type_name": "Herbal Medicine Apothecary",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "60 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0256",
    "business_type_name": "High-End Watch Boutique",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0257",
    "business_type_name": "Historical Museum",
    "online_or_onsite": "Onsite",
    "place": "Historical Building",
    "approximately_area": "2000 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0258",
    "business_type_name": "Holistic Health & Wellness Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0259",
    "business_type_name": "Home Automation Integrator",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0260",
    "business_type_name": "Home Health Care Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "120 m2",
    "popularity": "Very High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0261",
    "business_type_name": "Home Inspection Agency",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0262",
    "business_type_name": "Hookah Lounge & Cafe",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0263",
    "business_type_name": "Horse Boarding Stable",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "10000 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0264",
    "business_type_name": "Hospice Care Facility",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "3000 m2",
    "popularity": "High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0265",
    "business_type_name": "Hospital & Medical Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "15000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0266",
    "business_type_name": "Hostel & Backpacker Lodge",
    "online_or_onsite": "Onsite",
    "place": "Historical Building",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0267",
    "business_type_name": "Hot Air Balloon Charter",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "5000 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0268",
    "business_type_name": "Hot Yoga Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "160 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0269",
    "business_type_name": "Hotel & Convention Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "20000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0270",
    "business_type_name": "HVAC Installation & Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "350 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0271",
    "business_type_name": "Hydraulic Equipment Supply",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0272",
    "business_type_name": "Hyperbaric Oxygen Therapy Center",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0273",
    "business_type_name": "Ice Cream Parlor",
    "online_or_onsite": "Onsite",
    "place": "Pedestrian Zone",
    "approximately_area": "40 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0274",
    "business_type_name": "Ice Skating Rink",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0275",
    "business_type_name": "Image Consulting Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Low",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0276",
    "business_type_name": "Immigration Law Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "140 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0277",
    "business_type_name": "Import Export Consultancy",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0278",
    "business_type_name": "Indoor Climbing Gym",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0279",
    "business_type_name": "Indoor Go-Kart Track",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "4000 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0280",
    "business_type_name": "Indoor Playland & Arcade",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "1000 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0281",
    "business_type_name": "Indoor Skydiving Wind Tunnel",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0282",
    "business_type_name": "Indoor Trampoline Park",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2200 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0283",
    "business_type_name": "Industrial Automation Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0284",
    "business_type_name": "Industrial Chemical Supplier",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "3000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0285",
    "business_type_name": "Industrial Cleaning Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0286",
    "business_type_name": "Industrial Coating & Painting",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0287",
    "business_type_name": "Industrial Design Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0288",
    "business_type_name": "Industrial Logistics Hub",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "10000 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0289",
    "business_type_name": "Industrial Packaging Solutions",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0290",
    "business_type_name": "Industrial Recycling Facility",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "8000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0291",
    "business_type_name": "Industrial Robotics Assembly",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0292",
    "business_type_name": "Industrial Testing Laboratory",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0293",
    "business_type_name": "Infectious Disease Clinic",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "500 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0294",
    "business_type_name": "Infrared Sauna Lounge",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0295",
    "business_type_name": "Insulation Contracting",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0296",
    "business_type_name": "InsurTech Platform Developer",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0297",
    "business_type_name": "Intellectual Property Law Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0298",
    "business_type_name": "Interior Design Studio",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0299",
    "business_type_name": "International Freight Forwarding",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "1800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0300",
    "business_type_name": "Investigation & Detective Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "90 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0301",
    "business_type_name": "IoT Solutions Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0302",
    "business_type_name": "Irrigation System Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "350 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0303",
    "business_type_name": "IT Asset Management Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0304",
    "business_type_name": "IT Managed Service Provider (MSP)",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0305",
    "business_type_name": "IV Hydration Therapy Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0306",
    "business_type_name": "Izakaya Japanese Pub",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "140 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0307",
    "business_type_name": "Janitorial Services Agency",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0308",
    "business_type_name": "Japanese Ramen Bar",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "95 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0309",
    "business_type_name": "Jet Ski Rental & Repair",
    "online_or_onsite": "Onsite",
    "place": "Beach",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0310",
    "business_type_name": "Jewelry Repair & Custom Design",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "45 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0311",
    "business_type_name": "Juice & Smoothie Bar",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "35 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0312",
    "business_type_name": "K-Beauty Cosmetics Shop",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "75 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0313",
    "business_type_name": "Karaoke Lounge & Bar",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0314",
    "business_type_name": "Kennel & Pet Boarding Hub",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0315",
    "business_type_name": "Kitchen & Bath Showroom",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0316",
    "business_type_name": "Korean BBQ Restaurant",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0317",
    "business_type_name": "Land Surveying Firm",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0318",
    "business_type_name": "Landscape Architecture Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0319",
    "business_type_name": "Landscaping & Hardscaping",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0320",
    "business_type_name": "Language Translation Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0321",
    "business_type_name": "Laser Cutting & Engraving",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0322",
    "business_type_name": "Laser Hair Removal Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0323",
    "business_type_name": "Laundromat & Wash Services",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0324",
    "business_type_name": "Law Firm & Legal Services",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0325",
    "business_type_name": "Leather Tanning & Crafting",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0326",
    "business_type_name": "LegalTech Platform Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0327",
    "business_type_name": "Library & Cultural Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0328",
    "business_type_name": "Lighting Design & Equipment",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0329",
    "business_type_name": "Limousine & Chauffeur Service",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0330",
    "business_type_name": "Live Event Production Company",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0331",
    "business_type_name": "Live Streaming Studio",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0332",
    "business_type_name": "Locksmith & Security Services",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "50 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0333",
    "business_type_name": "Loss Adjusting Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "120 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0334",
    "business_type_name": "Low-Code Platform Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0335",
    "business_type_name": "Luggage & Travel Accessories",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "100 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0336",
    "business_type_name": "Luxury Yacht Charter",
    "online_or_onsite": "Onsite",
    "place": "Marina Pier",
    "approximately_area": "500 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0337",
    "business_type_name": "Machining & CNC Fabrication",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0338",
    "business_type_name": "Magic & Illusion Venue",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0339",
    "business_type_name": "Marble & Granite Countertop Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "700 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0340",
    "business_type_name": "Marine Engine Maintenance",
    "online_or_onsite": "Onsite",
    "place": "Marina Pier",
    "approximately_area": "450 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0341",
    "business_type_name": "Market Research Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0342",
    "business_type_name": "Martial Arts Dojo",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0343",
    "business_type_name": "Massage Therapy Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "100 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0344",
    "business_type_name": "Matcha Specialty Cafe",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "55 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0345",
    "business_type_name": "Materials Testing Lab",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0346",
    "business_type_name": "Maternity & Neonatal Clinic",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0347",
    "business_type_name": "Mattress Specialty Store",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0348",
    "business_type_name": "Meat Butchery & Delicatessen",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "95 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0349",
    "business_type_name": "Media Buying Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0350",
    "business_type_name": "Medical Equipment Supplier",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0351",
    "business_type_name": "Medical Imaging Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "800 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0352",
    "business_type_name": "Medical Spa & Aesthetics",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0353",
    "business_type_name": "Mediterranean Restaurant",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "220 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0354",
    "business_type_name": "Mental Health Therapy Clinic",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "140 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0355",
    "business_type_name": "Metal Fabrication Workshop",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0356",
    "business_type_name": "Micro-Roastery Coffee Bar",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "80 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0357",
    "business_type_name": "Microbrewery & Taproom",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0358",
    "business_type_name": "Microservices Architecture Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0359",
    "business_type_name": "Military Surplus Store",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0360",
    "business_type_name": "Miniature Golf Course",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "3000 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0361",
    "business_type_name": "Mobile App Development Studio",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0362",
    "business_type_name": "Mobile Auto Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0363",
    "business_type_name": "Mobile Car Detailing",
    "online_or_onsite": "Onsite",
    "place": "Underground Parking",
    "approximately_area": "80 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0364",
    "business_type_name": "Mobile Laser Tag Arena",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "1000 m2",
    "popularity": "Medium",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0365",
    "business_type_name": "Mobile Locksmith Services",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "40 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0366",
    "business_type_name": "Mobile Tire Service",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0367",
    "business_type_name": "Modeling & Talent Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0368",
    "business_type_name": "Montessori Preschool",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "800 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0369",
    "business_type_name": "Mortgage Brokerage Firm",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "160 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0370",
    "business_type_name": "Motorcycle Repair & Customization",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0371",
    "business_type_name": "Moving & Relocation Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0372",
    "business_type_name": "Multi-Specialty Medical Group",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "3000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0373",
    "business_type_name": "Music Academy & School",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0374",
    "business_type_name": "Music Conservatory",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0375",
    "business_type_name": "Music Festival Organizer",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0376",
    "business_type_name": "Music Publishing Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0377",
    "business_type_name": "Musical Instrument Retail & Repair",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0378",
    "business_type_name": "Nail Art & Manicure Lounge",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "70 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0379",
    "business_type_name": "Nanotechnology Research Lab",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0380",
    "business_type_name": "National Freight Logistics",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "5000 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0381",
    "business_type_name": "Neapolitan Pizzeria",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "150 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0382",
    "business_type_name": "Neon Sign Manufacturing",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "350 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0383",
    "business_type_name": "Network Infrastructure Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0384",
    "business_type_name": "Neurological Medical Clinic",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0385",
    "business_type_name": "Newspaper Publishing House",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "800 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0386",
    "business_type_name": "Novelty & Souvenir Shop",
    "online_or_onsite": "Onsite",
    "place": "Pedestrian Zone",
    "approximately_area": "60 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0387",
    "business_type_name": "Nuclear Medicine Clinic",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1000 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0388",
    "business_type_name": "Nursery & Botanical Supply",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "4000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0389",
    "business_type_name": "Nursing Agency & Staffing",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0390",
    "business_type_name": "Nutrition & Dietetics Practice",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0391",
    "business_type_name": "Obstetrics & Gynecology Clinic",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "220 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0392",
    "business_type_name": "Occupational Health Center",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0393",
    "business_type_name": "Ocean Freight Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0394",
    "business_type_name": "Off-Road Customization Shop",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "High",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0395",
    "business_type_name": "Office Furniture Showroom",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0396",
    "business_type_name": "Office Supplies Retailer",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "250 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0397",
    "business_type_name": "Oil Change & Lube Express",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "200 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0398",
    "business_type_name": "Online Education Portal",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Very High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0399",
    "business_type_name": "Onsen & Thermal Bathhouse",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2500 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0400",
    "business_type_name": "Ophthalmology Surgery Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0401",
    "business_type_name": "Optical & Eyewear Boutique",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0402",
    "business_type_name": "Optometry Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0403",
    "business_type_name": "Oral & Maxillofacial Surgery",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0404",
    "business_type_name": "Organic Farmers Market",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "2000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0405",
    "business_type_name": "Organic Grocery Store",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "500 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0406",
    "business_type_name": "Orthodontic Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "160 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0407",
    "business_type_name": "Orthopedic Surgery Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0408",
    "business_type_name": "Outdoor Equipment Outfitter",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "450 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0409",
    "business_type_name": "Oyster & Seafood Raw Bar",
    "online_or_onsite": "Onsite",
    "place": "Beach",
    "approximately_area": "140 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0410",
    "business_type_name": "Packaging Design Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0411",
    "business_type_name": "Pain Management Clinic",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0412",
    "business_type_name": "Paintball & Airsoft Arena",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "5000 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0413",
    "business_type_name": "Painting Contracting Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0414",
    "business_type_name": "Pallet Manufacturing & Repair",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "3000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0415",
    "business_type_name": "Paper & Cardboard Recycling",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "6000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0416",
    "business_type_name": "Paragliding & Hang Gliding School",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "2000 m2",
    "popularity": "Medium",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0417",
    "business_type_name": "Parking Garage Management",
    "online_or_onsite": "Onsite",
    "place": "Underground Parking",
    "approximately_area": "4000 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0418",
    "business_type_name": "Party Rental Supply",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0419",
    "business_type_name": "Passport & Visa Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "90 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0420",
    "business_type_name": "Patent Law Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0421",
    "business_type_name": "Pathology Laboratory",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "350 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0422",
    "business_type_name": "Paving & Concrete Contractor",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0423",
    "business_type_name": "Pawnbroker Shop",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "100 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0424",
    "business_type_name": "Pediatric Medical Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "220 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0425",
    "business_type_name": "Penetration Testing Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0426",
    "business_type_name": "Perfumery & Fragrance Studio",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "75 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0427",
    "business_type_name": "Periodontics Dental Studio",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "150 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0428",
    "business_type_name": "Personal Fitness Training",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0429",
    "business_type_name": "Pest Control Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0430",
    "business_type_name": "Pet Grooming & Spa",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0431",
    "business_type_name": "Pet Supply Store",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0432",
    "business_type_name": "Petroleum Wholesale Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0433",
    "business_type_name": "Pharmaceutical Manufacturing",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "8000 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0434",
    "business_type_name": "Pharmacy & Drugstore",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0435",
    "business_type_name": "Photo Printing & Framing",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "80 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0436",
    "business_type_name": "Photography Studio",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0437",
    "business_type_name": "Physical Therapy Clinic",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "200 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0438",
    "business_type_name": "Piano Tuning & Restoration",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "150 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0439",
    "business_type_name": "Pilates Reformer Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "160 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0440",
    "business_type_name": "Pipefitting & Industrial Piping",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0441",
    "business_type_name": "Pizza Delivery & Takeout",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0442",
    "business_type_name": "Planetarium & Observatory",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1800 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0443",
    "business_type_name": "Plastic Injection Molding",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "3000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0444",
    "business_type_name": "Plastic Surgery Clinic",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "600 m2",
    "popularity": "Very High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0445",
    "business_type_name": "Plumbing & Heating Services",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0446",
    "business_type_name": "Podcast Production Studio",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "90 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0447",
    "business_type_name": "Podiatry Care Center",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0448",
    "business_type_name": "Pole Dance & Fitness Studio",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0449",
    "business_type_name": "Pop-Up Retail Space",
    "online_or_onsite": "Onsite",
    "place": "Shopping Mall",
    "approximately_area": "80 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0450",
    "business_type_name": "Post-Production Film House",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0451",
    "business_type_name": "Power Tool Repair & Retail",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "200 m2",
    "popularity": "Medium",
    "customer_type": "man"
  },
  {
    "business_id": "BUS-0452",
    "business_type_name": "Precision Laser Engraving",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "150 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0453",
    "business_type_name": "Private Aviation Charter",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2000 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0454",
    "business_type_name": "Private Detective Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "70 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0455",
    "business_type_name": "Private Equity Investment",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "400 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0456",
    "business_type_name": "Private K-12 Academy",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "6000 m2",
    "popularity": "Very High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0457",
    "business_type_name": "Private Security Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0458",
    "business_type_name": "Process Server Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0459",
    "business_type_name": "Product Design Consultancy",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0460",
    "business_type_name": "Prop & Costume Rental",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "600 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0461",
    "business_type_name": "PropTech Software Agency",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0462",
    "business_type_name": "Prosthetics & Orthotics Center",
    "online_or_onsite": "Onsite",
    "place": "Business Center",
    "approximately_area": "220 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0463",
    "business_type_name": "Public Relations (PR) Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0464",
    "business_type_name": "Publishing House",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "350 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0465",
    "business_type_name": "Puppet & Animatronics Studio",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "Low",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0466",
    "business_type_name": "Pyrotechnics & Special FX",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0467",
    "business_type_name": "Quality Assurance Testing Lab",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0468",
    "business_type_name": "Quantum Computing Software Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0469",
    "business_type_name": "Quick Lube & Oil Change",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "180 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0470",
    "business_type_name": "Radiology Diagnostic Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "700 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0471",
    "business_type_name": "Rare Book & Manuscript Shop",
    "online_or_onsite": "Hybrid",
    "place": "Historical Building",
    "approximately_area": "90 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0472",
    "business_type_name": "Raw Vegan Cafe & Lounge",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "110 m2",
    "popularity": "High",
    "customer_type": "woman"
  },
  {
    "business_id": "BUS-0473",
    "business_type_name": "Real Estate Appraisal Agency",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "120 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0474",
    "business_type_name": "Real Estate Brokerage",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "300 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0475",
    "business_type_name": "Real Estate Property Management",
    "online_or_onsite": "Hybrid",
    "place": "Business Center",
    "approximately_area": "250 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0476",
    "business_type_name": "Recording Studio & Sound Design",
    "online_or_onsite": "Onsite",
    "place": "Basement Level",
    "approximately_area": "180 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0477",
    "business_type_name": "Records Storage & Shredding",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "2000 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0478",
    "business_type_name": "Recreation Center",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "3500 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0479",
    "business_type_name": "Recycling & Waste Management",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "10000 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0480",
    "business_type_name": "Refrigeration Contracting",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0481",
    "business_type_name": "Refurbished Electronics Shop",
    "online_or_onsite": "Hybrid",
    "place": "Shopping Mall",
    "approximately_area": "120 m2",
    "popularity": "Very High",
    "customer_type": "students"
  },
  {
    "business_id": "BUS-0482",
    "business_type_name": "Regional Airline Carrier",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "10000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0483",
    "business_type_name": "Rehabilitation Hospital",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "5000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0484",
    "business_type_name": "Regulatory Compliance Firm",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0485",
    "business_type_name": "Renewable Energy Contractor",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "500 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0486",
    "business_type_name": "Research & Development Lab",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1800 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0487",
    "business_type_name": "Residential Care Home",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "seniors"
  },
  {
    "business_id": "BUS-0488",
    "business_type_name": "Residential Cleaning Services",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "100 m2",
    "popularity": "Very High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0489",
    "business_type_name": "Resin Flooring Installation",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "250 m2",
    "popularity": "Medium",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0490",
    "business_type_name": "Restaurant Supply Store",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "1200 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0491",
    "business_type_name": "Retro Video Game Store",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "85 m2",
    "popularity": "High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0492",
    "business_type_name": "Risk Management Consultancy",
    "online_or_onsite": "Online",
    "place": "Virtual / Cloud Space",
    "approximately_area": "0 m2 (Virtual)",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0493",
    "business_type_name": "Robotics Integration Firm",
    "online_or_onsite": "Hybrid",
    "place": "Industrial Zone",
    "approximately_area": "800 m2",
    "popularity": "Very High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0494",
    "business_type_name": "Rock Climbing Gym",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "1800 m2",
    "popularity": "Very High",
    "customer_type": "youth"
  },
  {
    "business_id": "BUS-0495",
    "business_type_name": "Roller Skating Rink",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "2000 m2",
    "popularity": "High",
    "customer_type": "children"
  },
  {
    "business_id": "BUS-0496",
    "business_type_name": "Roofing & Waterproofing Contractor",
    "online_or_onsite": "Onsite",
    "place": "Industrial Zone",
    "approximately_area": "400 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0497",
    "business_type_name": "Rooftop Cocktail Lounge",
    "online_or_onsite": "Onsite",
    "place": "Commercial Building",
    "approximately_area": "350 m2",
    "popularity": "Very High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0498",
    "business_type_name": "RV Rental & Repair Hub",
    "online_or_onsite": "Onsite",
    "place": "Empty Area",
    "approximately_area": "4000 m2",
    "popularity": "High",
    "customer_type": "families"
  },
  {
    "business_id": "BUS-0499",
    "business_type_name": "Safety Training Academy",
    "online_or_onsite": "Hybrid",
    "place": "Commercial Building",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0500",
    "business_type_name": "Salt Cave Therapy Lounge",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "90 m2",
    "popularity": "Medium",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0501",
    "business_type_name": "Software Development",
    "online_or_onsite": "Hybrid",
    "place": "First Floor",
    "approximately_area": "1500 m2",
    "popularity": "High",
    "customer_type": "companies"
  },
  {
    "business_id": "BUS-0502",
    "business_type_name": "Shopping Mall",
    "online_or_onsite": "Onsite",
    "place": "Standalone Building",
    "approximately_area": "10000 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0502",
    "business_type_name": "Retail - goods and services to consumers",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0503",
    "business_type_name": "Reatil - Clothing Store",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "300 m2",
    "popularity": "High",
    "customer_type": "all"
  },
  {
    "business_id": "BUS-0504",
    "business_type_name": "Retail - Bakery store",
    "online_or_onsite": "Onsite",
    "place": "First Floor",
    "approximately_area": "50 m2",
    "popularity": "High",
    "customer_type": "all"
  }
];

// Helper: Get unique places/locations
export const UNIQUE_BUSINESS_PLACES = Array.from(
  new Set(COMMERCIAL_BUSINESS_TYPES.map((b) => b.place))
).sort();

// Helper: Get unique operational models
export const UNIQUE_OPERATION_MODELS = ['All', 'Onsite', 'Hybrid', 'Online'];

// Helper: Get unique customer target demographics
export const UNIQUE_CUSTOMER_TYPES = Array.from(
  new Set(COMMERCIAL_BUSINESS_TYPES.map((b) => b.customer_type).filter(Boolean))
).sort();

// Helper: Map approx area to standard StoreFormatType
export function mapAreaToStoreFormat(areaStr: string, placeStr?: string): string {
  if (areaStr.includes('Virtual') || placeStr?.includes('Virtual')) {
    return 'Micro / Kiosk (< 50 m²)';
  }
  const match = areaStr.match(/(\d+)/);
  if (!match) return 'Standard Retail (150 - 450 m²)';
  const num = parseInt(match[1], 10);
  if (num < 50) return 'Micro / Kiosk (< 50 m²)';
  if (num <= 150) return 'Boutique / Compact (50 - 150 m²)';
  if (num <= 450) return 'Standard Retail (150 - 450 m²)';
  if (num <= 1200) return 'Flagship Store (450 - 1,200 m²)';
  return 'Anchor / Big-Box (> 1,200 m²)';
}

export const COMMERCIAL_BUSINESS_SECTORS = COMMERCIAL_BUSINESS_TYPES;
