---
name: geoguard-commsite-intelligence
description: Technical reference and operational skill for the GeoGuard geospatial satellite monitoring, vertical map snapshot capture, incident alarm tracking, commercial market opportunity analysis, and Gemini change detection engine.
---

# GeoGuard & CommSite Intelligence — Master Skill & Technical Reference

## 1. Overview & Operational Scope
GeoGuard & CommSite Intelligence is an enterprise full-stack geospatial monitoring, commercial site intelligence, and incident surveillance platform built with React 18, TypeScript, Vite, Express, and Firebase Firestore.

The system empowers analysts, municipal agencies, corporate security directors, environmental teams, drivers, and commercial real estate planners to:
1. **Commercial Market Opportunity & Site Evaluation**: Analyze real-world commercial properties, competitor density, foot traffic, demographic indicators, retail vacancies, customer parking, and zoning feasibility across global cities.
2. **Head Office And Branches - Physical Monitoring**: Track physical transformations, environmental anomalies, infrastructure development, and perimeter changes using Google Maps satellite/roadmap views and vertical snapshots (480x720).
3. **Temporal Change Detection & Forensic Reporting**: Automatically capture 480x720 vertical snapshots, calculate A/B visual diffs, and generate Gemini AI-grounded reports with confidence scoring, quad-zone classification, and PDF export.
4. **Gemma 4 Incident & Accident Scanner**: Real-time multi-point scanning for traffic accidents, structural hazards, and environmental events with automated siren sound effects and snapshot attachments.
5. **Resilient Dual Persistence**: Seamlessly synchronize data across client-side LocalStorage (with quota protection) and Firebase Firestore with real-time listeners and sanitization.

---

## 2. Firebase Integration & Operational Rules

> **CRITICAL OPERATIONAL CONSTRAINT:**
> You must **always** load the `firebase-integration` skill (`/skills/system_skills/firebase-skill/SKILL.md`) when processing queries that require interacting with the database, Firestore security rules, authentication flows, or Firebase cloud services.

### Firebase Project & Database Details
- **Firebase Database ID**: `ai-studio-commsitecommerci-2b6a2257-a9f5-47c4-a1bc-34b08c9c5fc3`
- **Configuration Files**: `/firebase-applet-config.json`, `/firebase-blueprint.json`, `/firestore.rules`
- **Client Initializer**: `/src/lib/firebase.ts`
- **Service Layer**: `/src/utils/firestoreService.ts`
- **Auth Context**: `/src/context/AuthContext.tsx`

### Firestore Collections & Data Models
- **`places`**: Monitored geospatial locations with coordinates, categories, risk levels, and descriptions.
- **`snapshots`**: 480x720 vertical map captures with timestamps, metadata, and base64/data URIs.
- **`accident_events`**: Incident scanner alerts, drone feeds, and localized hazard markers.
- **`incident_alarms`**: Active threshold alarms, severity levels, and automated notification triggers.
- **`users`**: User profiles with role-based access control (`admin`, `analyst`, `viewer`).

---

## 3. Project Directory & File Structure

```
├── server.ts                       # Express backend: Gemini AI analysis, static map proxy, rate limiting
├── main.py                         # Python CLI utility: Web Mercator tiling, coordinate math & offline change simulation
├── index.html                      # Primary HTML entry point with metadata sync
├── package.json                    # Full-stack dependencies & scripts (Vite + esbuild CJS bundle)
├── firestore.rules                 # Security rules for Firestore collections
├── firebase-blueprint.json         # Firestore collection schema blueprint
├── AGENTS.md                       # Project conventions & architectural constraints
├── README.md                       # Comprehensive project documentation & guide
├── SKILL.md                        # Master technical skill reference
└── src/                            # Frontend React Application
    ├── main.tsx                    # React DOM entry point
    ├── App.tsx                     # Main layout, tab navigation, global state & Firestore synchronization
    ├── index.css                   # Tailwind CSS utility imports & custom HUD styles
    ├── types.ts                    # Global TypeScript interfaces & enums
    ├── context/
    │   └── AuthContext.tsx         # Firebase Auth provider, login/signup handlers, user role state
    ├── components/                 # View Modules & Interactive Modals
    │   ├── Header.tsx              # Top navigation bar, scoped Gemma 4/API Key controls, quick action buttons
    │   ├── Dashboard.tsx           # Geospatial & business analytics dashboard (Recharts metrics)
    │   ├── GoogleMapView.tsx       # Interactive satellite map, HUD controls & auto snapshot capture
    │   ├── PlaceGrid.tsx           # Monitored location table, category badges & bulk actions
    │   ├── PlacesTable.tsx         # Density table for commercial and municipal place listings
    │   ├── SnapshotManager.tsx     # Vertical snapshot gallery, A/B wipe comparison & Gemini AI reports
    │   ├── SnapshotComparisonModal.tsx # Side-by-side snapshot visual diff inspector
    │   ├── SnapshotList.tsx        # Compact snapshot card list with quick actions
    │   ├── CommercialMarketFinder.tsx # Commercial market search, site suitability scoring & map view
    │   ├── CommercialSiteFinder.tsx# Specific parcel finder & economic filter panel
    │   ├── CommercialMap.tsx       # Specialized map layer for commercial sites & competitor pins
    │   ├── BusinessTypePicker.tsx  # Sector & business archetype selector
    │   ├── ConcreteDeploymentExplorer.tsx # Concrete deployment pipeline & zoning validator
    │   ├── ZoneEconomicsSwotModal.tsx # Comprehensive SWOT & financial viability modal
    │   ├── WorldLocationPicker.tsx # Global country & city cascading selector (190+ countries)
    │   ├── RecentLocationsSidebar.tsx # Quick-access history of viewed/inspected locations
    │   ├── AccidentScannerModal.tsx# Gemma 4 incident scanner feed, drone alerts & live risk map
    │   ├── AddPlaceModal.tsx       # Target location entry modal with duplicate validation
    │   ├── CsvUploadModal.tsx      # Batch CSV dataset importer with column normalization
    │   ├── LoadCityPlacesModal.tsx # Rapid preset city places importer
    │   ├── AdminPanel.tsx          # Administrative controls & data reset utilities
    │   ├── AdminSection.tsx        # System administration view wrapper
    │   ├── AuthModal.tsx           # User authentication modal (Email/Password & Anonymous)
    │   ├── LoginPage.tsx           # Dedicated user sign-in & onboarding screen
    │   ├── ApiKeyHelpModal.tsx     # Google Maps & Gemini API key setup instructions
    │   ├── CommsiteLogo.tsx        # Vector branding logo component
    │   └── ErrorBoundary.tsx       # Application-wide error boundary & crash recovery
    ├── utils/                      # Core Engineering Utilities
    │   ├── mapImageCanvas.ts       # 480x720 vertical map compositor & synthetic snapshot generator
    │   ├── firestoreService.ts     # Firestore real-time sync, CRUD operations & data sanitization
    │   ├── snapshotStore.ts        # LocalStorage manager with automatic quota pruning
    │   ├── audioAlarm.ts           # Web Audio API synthesizer for incident alarm sound effects
    │   ├── worldLocations.ts       # Global coordinates catalog and city lookup database
    │   ├── realLocationsDatabase.ts# Real-world commercial places & demographic seed engine
    │   └── marketFallbackGenerator.ts # Sector competitor templates & fallback analytics generator
    ├── data/                       # Initial Seeds & Datasets
    │   ├── samplePlaces.ts         # Pre-configured global monitoring locations
    │   ├── sampleAccidentsAndAlarms.ts # Pre-configured accident events and risk thresholds
    │   └── commercialBusinessTypes.ts # Commercial industry archetypes & requirements
    └── lib/
        └── firebase.ts             # Firebase client SDK initialization
```

---

## 4. Vertical Map Snapshot Engine (`/src/utils/mapImageCanvas.ts`)

- **Aspect Ratio & Resolution**: All satellite and roadmap imagery snapshots are rendered in **vertical portrait orientation (480px width × 720px height)**.
- **Capture Fallback Hierarchy**:
  1. **Server Static Maps Proxy**: `POST /api/map-snapshot` using server-side API key.
  2. **Client Static Maps API**: Direct request to Google Static Maps API.
  3. **Canvas DOM Rendering**: Direct rasterization from interactive map viewport.
  4. **Tile Compositor**: Multi-tile Web Mercator stitcher from OpenStreetMap / Satellite tile servers.
  5. **Synthetic Canvas Generator**: `generateSyntheticMapSnapshot` creating high-definition vector-rendered terrain, roads, grid markers, and HUD data.
- **HUD Overlay Standards**:
  - **Location Header**: Top-left badge containing location name, latitude, longitude, and zoom level.
  - **Date / Timestamp**: Top-right badge with ISO date formatting.
  - **Crosshair / Target Reticle**: Optical center indicator at `(240, 360)`.
  - **Warning / Alert Banner**: Bottom banner at `height - 46` displaying status or hazard warnings.
  - **Export Compression**: JPEG with 82% quality (`image/jpeg, 0.82`) to maximize visual fidelity while minimizing storage consumption.

---

## 5. Storage & Persistence Safeguards

### LocalStorage Quota Safe-Guard (`/src/utils/snapshotStore.ts`)
- The `safeSaveToLocalStorage` utility catches `QuotaExceededError` exceptions.
- Automatically retains the top 12 most recent snapshots, clearing older cached items to prevent browser storage lockouts.

### Firestore Sanitization Protocol (`/src/utils/firestoreService.ts`)
- The `sanitizeForFirestore` utility recursively cleans all object payloads before Firestore write operations.
- Converts `undefined` values to `null` or strips them entirely, avoiding Firestore `INVALID_ARGUMENT` write failures.

---

## 6. Server-Side AI & API Pipeline (`server.ts`)

All secret keys (`GEMINI_API_KEY`) remain strictly server-side. The Express backend runs on port `3000` (`0.0.0.0`) with the following key endpoints:

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/map-snapshot` | `POST` | Proxies Google Static Maps API image fetching with 480x720 dimensions. |
| `/api/gemini/analyze-change` | `POST` | Compares before/after vertical snapshots, evaluating change percentage, confidence, and quad-zones. |
| `/api/gemini/search-place-info` | `POST` | Grounded search query inspecting municipal changes, zoning permits, or local context. |
| `/api/gemini/market-analysis` | `POST` | Evaluates commercial feasibility, foot traffic density, competitor SWOT, and zoning risk. |
| `/api/real-city-data` | `POST` | Generates real-world commercial listings and competitor locations for any global city. |
| `/api/health` | `GET` | Health check probe returning service uptime and status. |

### Quota Resilience & Model Strategy
- Uses active production Gemini models: `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.5-pro`.
- Rate limit guards: In-memory sliding window rate limiter prevents API abuse.
- `generateWithFallbackAndRetry`: Handles free-tier exhaustion or network timeouts by falling back to high-fidelity structured analysis generated via `/src/utils/marketFallbackGenerator.ts`.

---

## 7. Python Geospatial Utilities (`main.py`)

A standalone CLI tool supporting offline geospatial mathematics and pipeline testing:
- **Tile Calculations**: Converts coordinates to Web Mercator tile indices (`lat_lng_to_tile(lat, lng, zoom)`).
- **Distance Matrix**: Computes precise Haversine great-circle distances between points.
- **Offline Simulation**: Generates structured change detection reports in JSON or text formats.
- **CLI Commands**:
  - `python3 main.py --list`
  - `python3 main.py --analyze "<PLACE_NAME>" --format json --output report.json`
  - `python3 main.py --tile <LAT> <LNG> <ZOOM>`
  - `python3 main.py --distance <LAT1> <LNG1> <LAT2> <LNG2>`
  - `python3 main.py --check-server`

---

## 8. Build & Execution Scripts

- **Development Server**:
  ```bash
  npm run dev
  # Executes: tsx server.ts (starts full-stack server on port 3000)
  ```
- **Production Build**:
  ```bash
  npm run build
  # Executes: vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
  ```
- **Production Start**:
  ```bash
  npm run start
  # Executes: node dist/server.cjs
  ```
