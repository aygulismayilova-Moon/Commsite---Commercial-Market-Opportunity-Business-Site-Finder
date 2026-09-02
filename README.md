# GeoGuard & CommSite Intelligence Platform

**Enterprise Geospatial Monitoring, Commercial Site Intelligence & Automated Incident Detection**

---

## 📌 Live Application
- **URL**: [https://commsite-commercial-market-opportunity-business-s-1.ai.studio](https://commsite-commercial-market-opportunity-business-s-1.ai.studio)

---

## 🎯 Overview & Mission

**GeoGuard & CommSite Intelligence** is a full-stack geospatial monitoring and commercial intelligence platform built with React 18, TypeScript, Vite, Express, and Firebase Firestore.

The platform unites two critical operational pillars:
1. **Commercial Market Finder & Site Evaluation**: Equips real estate developers, retail chains, financial institutions, and business analysts to assess market feasibility, demographic density, competitor distribution, zoning suitability, and parcel viability across global cities.
2. **Head Office And Branches - Physical Monitoring**: Enables state agencies, municipal authorities, facilities managers, and emergency response teams to conduct multi-temporal satellite and street surveillance, compare high-resolution portrait snapshots (480x720), detect unauthorized construction or hazards, and execute Gemma 4 accident scans.

---

## 👥 Target Users & Real-World Applications

* **Commercial Real Estate & Retail Expansion Teams**: Identify optimal commercial real estate parcels, analyze competitor saturation (banks, supermarkets, fashion flagships, auto dealerships), and evaluate parking capacity and foot traffic.
* **Corporate Head Office & Branch Operations**: Monitor physical security, structural alterations, and perimeter conditions across distributed corporate headquarters and branch locations.
* **State & Municipal Supervisory Agencies**: Automatically detect unauthorized building construction, illegal tree felling in conservation zones, zoning violations, and infrastructure decay.
* **Emergency Response & Disaster Monitoring Units**: Scan urban corridors for traffic accidents, structural collapses, and natural disasters using the Gemma 4 Incident Detector with automated siren alerts.
* **Environmental & Conservation Organizations**: Track deforestation, coastal erosion, wildfire encroachment, and flood risk around sensitive ecosystems.
* **Logistics & Fleet Operators**: Monitor critical transit arteries, identify congestion choke points, and optimize depot locations.

---

## ⚡ Key Features & Core Modules

### 1. Commercial Market Finder & Site Selection
* **Global Multi-Country & City Engine**: Cascading selector covering 190+ countries and global metropolitan hubs, with verified district directories for key regions (Azerbaijan, Turkey, USA, UK, Germany, France, UAE, Japan, and more).
* **Sector Archetype Analysis**: Over 25 major industries and 150+ commercial business models (Banking & 24/7 ATM Centers, Supermarkets, EV Charging Stations, Tech Hubs, Healthcare, Warehousing, etc.).
* **Live Places & Competitor Mapping**: Real-time Google Places API and OpenStreetMap integration with dynamic competitor scoring, footfall metrics, and SWOT risk matrices.
* **Concrete Deployment Explorer**: Step-by-step parcel deployment pipeline evaluating regulatory approvals, structural feasibility, and projected ROI.

### 2. Head Office And Branches - Physical Monitoring
* **Vertical Snapshot Engine**: Automated capture and rendering of high-resolution **480px × 720px portrait map snapshots** optimized for mobile and field surveillance.
* **Multi-Temporal Diff Inspector**: Interactive A/B wipe comparison slider, side-by-side view, and optical variance analysis.
* **Gemini AI Change Detection**: Generates structured forensic reports detailing estimated percentage change, affected quad-zones, risk classifications, and recommended mitigation actions.
* **Report Extraction**: One-click report generation with text copying, `.txt` download, `.json` export, and printable PDF formats.

### 3. Gemma 4 Incident & Accident Detector
* **Real-Time Incident Scanning**: Multi-point automated scan assessing target facilities and urban corridors for vehicle collisions, structural anomalies, and fires.
* **Automated Map Snapshots**: Auto-attaches timestamped 480x720 satellite snapshots to each detected incident event.
* **Incident Feed & Siren System**: Interactive incident feed with severity filters, active alarm thresholds, and Web Audio API synthesized audio alerts.
* **Contextual UI Header**: Gemma 4 scanner controls and API key health indicators are scoped specifically to the Physical Monitoring dashboard.

### 4. Resilient Dual Persistence & Security
* **Firebase Firestore Cloud Synchronization**: Real-time bi-directional database sync for places, snapshots, accident events, and user preferences.
* **Data Sanitization Protocol (`sanitizeForFirestore`)**: Ensures clean Firestore write operations without `undefined` parameter failures.
* **LocalStorage Quota Protection (`safeSaveToLocalStorage`)**: Automatic cache management prevents browser storage quota exceptions during offline or disconnected sessions.
* **Role-Based Access Control (RBAC)**: Multi-tier access management (`Admin`, `Commercial Strategy Analyst`, `Field Monitoring Officer`, `Viewer`).

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS, Lucide Icons, Motion (Framer Motion) |
| **Data Visualizations** | Recharts (Density & Demographics), D3.js, Custom Canvas Compositor |
| **Backend & Proxy** | Express.js, TypeScript (bundled via esbuild to `dist/server.cjs`) |
| **AI Models & Engines** | Google Gemini API (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.5-pro`), Gemma 4 Scan Pipeline |
| **Geospatial & Mapping** | Google Maps Platform (Static Maps, Places API), OpenStreetMap / Nominatim |
| **Database & Auth** | Firebase Firestore, Firebase Authentication |
| **Audio Synthesis** | Web Audio API (Synthesized Siren & Notification Chimes) |
| **CLI & Offline Math** | Python 3 (`main.py` Web Mercator tiling and Haversine matrix tools) |

---

## 🔌 Server API Endpoints

The Express backend (`server.ts`) runs on port `3000` (`0.0.0.0`) and provides the following server-side routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/map-snapshot` | Server proxy for Google Static Maps vertical snapshots (480x720). |
| `POST` | `/api/gemini/analyze-change` | Evaluates multi-temporal snapshot pairs for physical variance and quad-zone classification. |
| `POST` | `/api/gemini/search-place-info` | Performs Google Search-grounded geospatial site inspection. |
| `POST` | `/api/gemini/market-analysis` | Generates comprehensive commercial viability, competitor SWOT, and zoning analysis. |
| `POST` | `/api/real-city-data` | Returns verified commercial places, streets, districts, and competitor rosters for any global city. |
| `GET` | `/api/health` | Health check probe returning service uptime and status. |

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- Node.js 18+ or Bun
- Google Maps API Key (Optional for live satellite views; synthetic fallback available)
- Gemini API Key (Configured server-side)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-org/geoguard-commsite.git
cd geoguard-commsite

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file based on `.env.example`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
PORT=3000
```

### 4. Running the Application
```bash
# Start the full-stack development server
npm run dev

# Build for production (bundles client to dist/ and server to dist/server.cjs)
npm run build

# Start the production server
npm run start
```

---

## 📖 Technical Documentation & Skills Reference

Detailed technical specifications, architecture blueprints, and coding rules can be found in:
* [`SKILL.md`](./SKILL.md) — Comprehensive technical reference manual and operational skill.
* [`AGENTS.md`](./AGENTS.md) — Architectural conventions and engineering guardrails.
* [`skills_folder.md`](./skills_folder.md) — Sub-skill reference documentation.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
