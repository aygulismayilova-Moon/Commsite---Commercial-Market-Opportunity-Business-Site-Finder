```
skills/
└── geoguard-monitoring/
    ├── SKILL.md
    └── references/
        ├── snapshot-engine.md
        ├── storage-persistence.md
        ├── gemini-pipeline.md
        └── ui-components.md
```

---
name: geoguard-monitoring
description: GeoGuard geospatial satellite monitoring, vertical map snapshot capture, incident alarm tracking, commercial market opportunity analysis, and Gemini change detection engine.
---

# GeoGuard & CommSite Intelligence Skill & Technical Reference

## Overview
The goal of this program is to streamline operations for commercial site planners, state supervisory agencies, corporate facilities managers, environmental teams, drivers, and tourists. Users manage monitored zones to track physical site conditions, competitor developments, zoning parameters, and acute incidents (vehicle accidents, natural disasters, tree felling) using Google Maps imagery, vertical snapshots (480x720), and Gemini / Gemma 4 AI models.

## Modular References
* **[Snapshot Engine](./references/snapshot-engine.md)** - Vertical map snapshot capture (480x720), fallback order, and HUD overlay standards.
* **[Storage & Persistence](./references/storage-persistence.md)** - LocalStorage quota safe-guards (`safeSaveToLocalStorage`) and Firestore object sanitization (`sanitizeForFirestore`).
* **[Gemini AI Pipeline](./references/gemini-pipeline.md)** - Analysis endpoints, change detection, commercial market SWOT evaluation, and quota resilience.
* **[UI Components Architecture](./references/ui-components.md)** - Overview of core views (Commercial Market Finder, Head Office And Branches - Physical Monitoring, Admin Section), interactive modals, and maps.

---

# 1. Vertical Map Snapshot Engine (`/src/utils/mapImageCanvas.ts`)

* **Aspect Ratio & Dimensions**: All map images and snapshot tiles are captured and rendered in vertical orientation (**480px width × 720px height**).
* **Capture Fallback Order**:
  1. Server Google Static Maps Proxy (`/api/map-snapshot`)
  2. Client-side Google Static Maps API
  3. Canvas DOM rendering
  4. Tile-based OpenStreetMap / Satellite tile compositor
  5. High-definition synthetic canvas generator (`generateSyntheticMapSnapshot`)

## HUD & Overlay Standards
* **Vertical layout HUD banner**: Positioned at the top left (location & coordinates).
* **Date badge**: Positioned at the top right.
* **Event warning banner**: Centered near the bottom (`height - 46`).
* **Target crosshair**: Positioned at the exact center (`width / 2`, `height / 2`).
* **Output format**: JPEG with **82% quality compression** (`toDataURL('image/jpeg', 0.82)`) for optimal storage footprint.

---

# 2. Storage & Persistence (`/src/utils/snapshotStore.ts` & `/src/utils/firestoreService.ts`)

* **LocalStorage Quota Safe-Guard**: `safeSaveToLocalStorage` wraps `localStorage.setItem` calls and gracefully prunes older snapshot entries (retaining the top 12 items) if browser storage limits are reached.
* **Firestore Object Sanitization**: `sanitizeForFirestore` recursively removes all `undefined` values from payloads before invoking `setDoc` or `writeBatch` to prevent Firestore document validation errors.

---

# 3. Gemini AI Analysis Pipeline (`server.ts`)

## Endpoints
* **`POST /api/map-snapshot`**: Static map proxy for high-resolution 480x720 captures.
* **`POST /api/gemini/analyze-change`**: Compares two temporal snapshots to identify geospatial changes, confidence scores, and affected quad-zones.
* **`POST /api/gemini/search-place-info`**: Performs Google Search-grounded geospatial site inspection.
* **`POST /api/gemini/market-analysis`**: Generates commercial SWOT analysis, footfall estimation, and feasibility scoring.
* **`POST /api/real-city-data`**: Delivers live and catalog-verified commercial district directories and competitor rosters.

## Quota Resilience
Includes exponential backoff and automatic structured fallback generation when API rate limits or free-tier quotas are reached using production models (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.5-pro`).

---

# 4. UI Components Architecture

* **`CommercialMarketFinder.tsx`**: Flagship commercial search dashboard featuring global country/city selection, sector archetypes, site suitability scoring, competitor density mapping, footfall estimators, and SWOT analysis.
* **`GoogleMapView.tsx`**: Interactive satellite map canvas with keyboard navigation shortcuts (`↑↓←→` / `WASD` pan, `+/-` zoom, `R` recenter), automated snapshot capture engine (10s to 1 hour intervals with live countdown), and instant vertical 480x720 snapshot triggers.
* **`SnapshotManager.tsx`**: Timeline viewer, side-by-side dual panel comparison view, vertical comparison slider (A/B wipe), Gemini change inspection report panel with extract options (Copy Text, Download .TXT, Download .JSON, Print PDF), and full Official Report Modal view.
* **`AccidentScannerModal.tsx`**: Real-time incident scanner monitoring drone alerts, traffic incidents, and environmental hazards. Includes Gemma 4 incident detection with auto-attached vertical map snapshots (`480x720`), manual snapshot controls, and a full-screen Lightbox snapshot inspection modal.
* **`Header.tsx`**: Top navigation with tab switching, user authentication controls, and scoped Gemma 4 / API Key health indicators that appear exclusively on the *Head Office And Branches - Physical Monitoring* page.
* **`AdminSection.tsx`**: Access-controlled administration suite for managing user roles, executing CSV dataset batch imports, and database maintenance.
