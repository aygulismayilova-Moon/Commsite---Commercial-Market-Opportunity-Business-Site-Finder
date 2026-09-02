# AGENTS.md - GeoGuard & CommSite Intelligence Platform Conventions

## Overview
**GeoGuard & CommSite Intelligence** is an enterprise full-stack geospatial monitoring, commercial site intelligence, and incident surveillance platform built with React 18, TypeScript, Vite, Express, and Firebase Firestore.

## Core Architectural Modules & Views
1. **Commercial Market Finder (`activeView: 'commercial'`)**:
   - Global multi-country and city selector with deep regional directories (including specialized coverage for Azerbaijan, Turkey, US, Europe, Middle East, Asia).
   - Commercial sector analysis (Retail, Banking & 24/7 ATM Networks, Automotive, Tech, Hospitality, Healthcare, EV Charging, etc.).
   - Google Places API and OpenStreetMap live search proxies with resilient generative fallback catalogs.
   - Footfall analytics, competitor SWOT generation, parcel evaluation, and Concrete Deployment Explorer.

2. **Head Office And Branches - Physical Monitoring (`activeView: 'monitoring'`)**:
   - High-resolution vertical portrait map snapshots (480x720 resolution).
   - Multi-temporal change detection with A/B wipe comparison sliders and Gemini AI variance analysis.
   - Gemma 4 accident and disaster scanner with siren audio synthesizers and incident event feeds.
   - Dedicated header utilities (Gemma 4 scanner trigger and Maps/Gemini key health badges are exclusively visible in this view).

3. **Admin & Governance Section (`activeView: 'admin'`)**:
   - Role-based clearance levels (`Admin`, `Commercial Strategy Analyst`, `Field Monitoring Officer`, `Viewer`).
   - Batch CSV uploader, City Preset importer, and Firestore database management.

## Key Rules & Developer Directives
1. **API Keys & Secrets**:
   - All secret API keys (`GEMINI_API_KEY`, Google Maps server keys) must **only** be accessed server-side in `server.ts`.
   - Never expose API secret keys in client-side bundles or public variables.
2. **Vertical Snapshot Ratio (480x720)**:
   - Always maintain the vertical **480px × 720px** aspect ratio across `getGoogleStaticMapUrl`, `fetchServerGoogleStaticMap`, `fetchRealTileMapCanvas`, and synthetic map generators.
3. **Dual Persistence & Firestore Data Sanitization**:
   - Real-time Firestore sync operates alongside LocalStorage.
   - Always pass all document payloads through `sanitizeForFirestore()` before `setDoc` or `writeBatch` to eliminate `undefined` fields.
   - Always use `safeSaveToLocalStorage()` to prevent browser storage quota exceptions.
4. **Resilient AI Pipeline**:
   - Use `generateWithFallbackAndRetry()` on the server with active model aliases (`gemini-3.7-flash`, `gemini-3.1-flash-lite`, `gemini-flash-latest`).
   - If AI quota limits are reached, provide structured fallbacks using `marketFallbackGenerator.ts`.
5. **Build & Dev Execution**:
   - Development server: `npm run dev` (`tsx server.ts` binding to `0.0.0.0:3000`).
   - Production bundle: `npm run build` (`vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`).
   - Production startup: `npm run start` (`node dist/server.cjs`).
