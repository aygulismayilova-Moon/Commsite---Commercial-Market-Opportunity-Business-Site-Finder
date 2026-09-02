import React from 'react';
import { MapSnapshot, PlaceItem } from '../types';
import { Camera, Calendar, Trash2, GitCompare, Layers, ExternalLink, Sparkles } from 'lucide-react';

interface SnapshotListProps {
  snapshots: MapSnapshot[];
  places: PlaceItem[];
  selectedPlaceId?: string;
  onDeleteSnapshot: (id: string) => void;
  onCompareSnapshots: (snap1: MapSnapshot, snap2: MapSnapshot) => void;
}

export const SnapshotList: React.FC<SnapshotListProps> = ({
  snapshots,
  places,
  selectedPlaceId,
  onDeleteSnapshot,
  onCompareSnapshots,
}) => {
  const [selectedForCompare, setSelectedForCompare] = React.useState<string[]>([]);

  // Filter snapshots if a place is selected, or show all
  const filteredSnapshots = selectedPlaceId
    ? snapshots.filter((s) => s.place_id === selectedPlaceId)
    : snapshots;

  const handleToggleSelectForCompare = (snapshotId: string) => {
    if (selectedForCompare.includes(snapshotId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== snapshotId));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], snapshotId]);
      } else {
        setSelectedForCompare([...selectedForCompare, snapshotId]);
      }
    }
  };

  const handleTriggerCompare = () => {
    if (selectedForCompare.length !== 2) return;
    const snap1 = snapshots.find((s) => s.id === selectedForCompare[0]);
    const snap2 = snapshots.find((s) => s.id === selectedForCompare[1]);
    if (snap1 && snap2) {
      onCompareSnapshots(snap1, snap2);
    }
  };

  const getPlaceName = (placeId: string) => {
    const p = places.find((pl) => pl.id === placeId);
    return p ? p.place_name : 'Unknown Target';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-3">
      {/* Header and Compare Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold">
            <Camera className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Captured Satellite Snapshots ({filteredSnapshots.length})
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              High-resolution 480x720 portrait surveillance imagery archives
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedForCompare.length === 2 ? (
            <button
              type="button"
              onClick={handleTriggerCompare}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Compare Selected (2/2)</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
              Select 2 snapshots to trigger AI difference analysis ({selectedForCompare.length}/2)
            </span>
          )}
        </div>
      </div>

      {filteredSnapshots.length === 0 ? (
        <div className="p-8 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-2">
          <Layers className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs font-bold text-slate-700">No Snapshots Captured Yet</p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
            Select a monitored target and click <strong>&quot;Capture Snapshot&quot;</strong> in the map viewer to create timestamped surveillance captures.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSnapshots.map((snap) => {
            const isSelected = selectedForCompare.includes(snap.id);
            const targetName = getPlaceName(snap.place_id);

            return (
              <div
                key={snap.id}
                onClick={() => handleToggleSelectForCompare(snap.id)}
                className={`group relative rounded-xl border p-2 bg-white transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                {/* 480x720 Portrait Aspect Ratio Preview Container */}
                <div className="w-full aspect-[2/3] bg-slate-950 rounded-lg overflow-hidden relative shadow-inner flex items-center justify-center">
                  <img
                    src={snap.image_url}
                    alt={targetName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border shadow-2xs ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'bg-slate-900/80 text-white border-slate-700'
                      }`}
                    >
                      {snap.map_type ? snap.map_type.toUpperCase() : 'SAT'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this surveillance snapshot?')) {
                        onDeleteSnapshot(snap.id);
                      }
                    }}
                    className="absolute top-1.5 right-1.5 p-1 bg-slate-900/80 hover:bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete snapshot"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Metadata */}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900 truncate" title={targetName}>
                    {targetName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-2.5 h-2.5" />
                      {new Date(snap.captured_at).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-blue-700 font-bold">{snap.zoom_level}x</span>
                  </div>
                </div>

                {/* Select button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSelectForCompare(snap.id);
                  }}
                  className={`w-full py-1 text-[10px] font-bold rounded transition-colors flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <GitCompare className="w-3 h-3" />
                  <span>{isSelected ? 'Selected' : 'Select'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
