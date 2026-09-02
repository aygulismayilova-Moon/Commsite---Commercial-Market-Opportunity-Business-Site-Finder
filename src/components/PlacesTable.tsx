import React, { useState, useMemo } from 'react';
import { PlaceItem, AccidentItem, MapSnapshot, GeminiChangeAnalysisResult } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  MapPin,
  Camera,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { playAlarmSound, stopCurrentAlarm, toggleSoundMute, isSoundMuted } from '../utils/audioAlarm';

interface PlacesTableProps {
  places: PlaceItem[];
  accidents: AccidentItem[];
  snapshots: MapSnapshot[];
  onSelectPlace: (place: PlaceItem) => void;
  onOpenAddModal: () => void;
  onDeletePlace: (id: string) => void;
  onTriggerAlarm: (accident: AccidentItem) => void;
  onRunChangeAnalysis: (place: PlaceItem, snapA: MapSnapshot, snapB: MapSnapshot) => Promise<void>;
  isAnalyzingChange: boolean;
  latestChangeAnalysis: GeminiChangeAnalysisResult | null;
}

export const PlacesTable: React.FC<PlacesTableProps> = ({
  places,
  accidents,
  snapshots,
  onSelectPlace,
  onOpenAddModal,
  onDeletePlace,
  onTriggerAlarm,
  onRunChangeAnalysis,
  isAnalyzingChange,
  latestChangeAnalysis,
}) => {
  const { isAuthorizedAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(places[0]?.id || '');
  const [activeAccidentTab, setActiveAccidentTab] = useState<'active' | 'resolved'>('active');
  const [soundMuted, setSoundMuted] = useState(isSoundMuted());

  const categories = useMemo(() => {
    const set = new Set<string>();
    places.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchSearch =
        p.place_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.area && p.area.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [places, searchQuery, categoryFilter]);

  const activePlace = places.find((p) => p.id === selectedPlaceId) || places[0];
  const placeSnapshots = useMemo(() => {
    if (!activePlace) return [];
    return snapshots.filter((s) => s.placeId === activePlace.id);
  }, [snapshots, activePlace]);

  const placeAccidents = useMemo(() => {
    if (!activePlace) return [];
    return accidents.filter((a) => a.placeId === activePlace.id);
  }, [accidents, activePlace]);

  const handleSoundToggle = () => {
    const next = toggleSoundMute();
    setSoundMuted(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Controls Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Geospatial Places &amp; Hazard Sentinel</h2>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-extrabold rounded-md uppercase border border-blue-200">
              {places.length} Locations Monitored
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time geospatial change detection, satellite visual timelines, and active incident response.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleSoundToggle}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              soundMuted
                ? 'bg-slate-100 border-slate-300 text-slate-600'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}
            title="Toggle Synthesizer Alarm Audio"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{soundMuted ? 'Muted' : 'Audio Live'}</span>
          </button>

          {isAuthorizedAdmin && (
            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Monitored Place</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Places Master List + Place Detail & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Places List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search place, city, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto pr-1">
              {filteredPlaces.map((place) => {
                const isSelected = place.id === activePlace?.id;
                const placeIncidents = accidents.filter((a) => a.placeId === place.id && a.status === 'Active');
                return (
                  <div
                    key={place.id}
                    onClick={() => {
                      setSelectedPlaceId(place.id);
                      onSelectPlace(place);
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border border-blue-200 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900">{place.place_name}</h4>
                          {placeIncidents.length > 0 && (
                            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[9px] font-extrabold rounded-full flex items-center gap-0.5">
                              <AlertTriangle className="w-2.5 h-2.5" />
                              {placeIncidents.length} Alert
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {place.area ? `${place.area}, ` : ''}
                          {place.city}, {place.country}
                        </p>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                        {place.category || 'General'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-100">
                      <span>
                        Lat: {place.latitude.toFixed(4)}, Lng: {place.longitude.toFixed(4)}
                      </span>
                      {isAuthorizedAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePlace(place.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove Place"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Place Visual Inspection & Incidents */}
        <div className="lg:col-span-7 space-y-4">
          {activePlace ? (
            <div className="space-y-4">
              {/* Header Card for Active Place */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Active Inspection Focus
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{activePlace.place_name}</h3>
                    <p className="text-xs text-slate-600">
                      {activePlace.street ? `${activePlace.street}, ` : ''}
                      {activePlace.area ? `${activePlace.area}, ` : ''}
                      {activePlace.city}, {activePlace.country}
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${activePlace.place_name} ${activePlace.city}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                </div>

                {activePlace.description && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {activePlace.description}
                  </p>
                )}
              </div>

              {/* Satellite Comparison & AI Visual Inspection */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900">Satellite Change Timeline &amp; AI Analysis</h4>
                  </div>
                  {placeSnapshots.length >= 2 && (
                    <button
                      onClick={() => onRunChangeAnalysis(activePlace, placeSnapshots[0], placeSnapshots[1])}
                      disabled={isAnalyzingChange}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAnalyzingChange ? 'Analyzing Satellite Pixels...' : 'Run AI Change Analysis'}</span>
                    </button>
                  )}
                </div>

                {placeSnapshots.length >= 2 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {placeSnapshots.slice(0, 2).map((snap, idx) => (
                      <div key={snap.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        <div className="p-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-700">
                          <span>{idx === 0 ? 'Baseline Satellite (T0)' : 'Current Satellite (T1)'}</span>
                          <span className="text-[10px] text-slate-500">{snap.dateLabel}</span>
                        </div>
                        <img
                          src={snap.imageUrl}
                          alt={snap.notes}
                          referrerPolicy="no-referrer"
                          className="w-full h-44 object-cover"
                        />
                        <div className="p-2 text-[10px] text-slate-600 bg-white">
                          <span className="font-bold text-slate-800">Overlay:</span> {snap.eventOverlay || snap.notes}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                    Capturing high-resolution satellite imagery for this location...
                  </div>
                )}

                {/* AI Change Result */}
                {latestChangeAnalysis && (
                  <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <h5 className="text-xs font-bold text-indigo-950">
                          Gemini Vision Inspection: {latestChangeAnalysis.changeType}
                        </h5>
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-200 text-indigo-900 text-[10px] font-extrabold rounded">
                        {latestChangeAnalysis.confidenceScore}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-indigo-900 font-medium">{latestChangeAnalysis.summary}</p>
                    {latestChangeAnalysis.detailedAnalysis && (
                      <p className="text-[11px] text-indigo-800 leading-relaxed font-sans whitespace-pre-line bg-white/70 p-2.5 rounded-lg border border-indigo-100">
                        {latestChangeAnalysis.detailedAnalysis}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Incidents & Alarms Feed */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Active Alarms &amp; Incident Records ({placeAccidents.length})
                    </h4>
                  </div>
                </div>

                <div className="space-y-2">
                  {placeAccidents.map((acc) => (
                    <div
                      key={acc.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:bg-white transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              acc.severity === 'Critical'
                                ? 'bg-rose-600 animate-ping'
                                : acc.severity === 'High'
                                ? 'bg-rose-500'
                                : 'bg-amber-500'
                            }`}
                          />
                          <h5 className="text-xs font-bold text-slate-900">{acc.type}</h5>
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded">
                            {acc.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">{acc.description}</p>
                      </div>

                      <button
                        onClick={() => onTriggerAlarm(acc)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1 flex-shrink-0"
                      >
                        <Play className="w-3 h-3" />
                        <span>Sound Alarm</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs">
              Select a location from the left list to inspect satellite timeline and alerts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
