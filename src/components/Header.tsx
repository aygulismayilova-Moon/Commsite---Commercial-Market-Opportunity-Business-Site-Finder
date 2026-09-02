import React, { useState } from 'react';
import {
  MapPin,
  FileSpreadsheet,
  Upload,
  Download,
  Sparkles,
  Key,
  Layers,
  Siren,
  Bell,
  RefreshCw,
  Shield,
  User,
  LogOut,
  LogIn,
  Lock,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { CommsiteLogo } from './CommsiteLogo';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  placesCount: number;
  totalSnapshotsCount: number;
  hasGoogleMapsKey: boolean;
  hasGeminiKey: boolean;
  activeAlarmsCount?: number;
  activeIncidentsCount?: number;
  activeView?: 'monitoring' | 'commercial' | 'admin';
  onChangeView?: (view: 'monitoring' | 'commercial' | 'admin') => void;
  onOpenUploadModal: () => void;
  onLoadSampleData: () => void;
  onDownloadCsv: () => void;
  onOpenApiKeyHelp: () => void;
  onOpenAccidentScanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  placesCount,
  totalSnapshotsCount,
  hasGoogleMapsKey,
  hasGeminiKey,
  activeAlarmsCount = 0,
  activeIncidentsCount = 0,
  activeView = 'commercial',
  onChangeView,
  onOpenUploadModal,
  onLoadSampleData,
  onDownloadCsv,
  onOpenApiKeyHelp,
  onOpenAccidentScanner,
}) => {
  const { userProfile, isAuthorizedAdmin, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Brand & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="cursor-pointer" onClick={() => onChangeView && onChangeView('commercial')}>
              <CommsiteLogo size="sm" />
            </div>

            {/* Navigation Tabs */}
            {onChangeView && (
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => onChangeView('commercial')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeView === 'commercial'
                      ? 'bg-white text-blue-800 shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Commercial Market</span>
                  <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-black rounded uppercase">
                    AI
                  </span>
                </button>

                <button
                  onClick={() => onChangeView('monitoring')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    activeView === 'monitoring'
                      ? 'bg-white text-blue-800 shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Head Office And Branches - Physical Monitoring"
                >
                  <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Head Office And Branches - Physical Monitoring</span>
                </button>

                <button
                  onClick={() => onChangeView('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeView === 'admin'
                      ? 'bg-slate-900 text-white shadow-sm font-black'
                      : isAuthorizedAdmin
                      ? 'text-rose-700 hover:text-rose-900 hover:bg-rose-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className={`w-3.5 h-3.5 ${isAuthorizedAdmin ? 'text-rose-500' : 'text-slate-500'}`} />
                  <span>Admin Section</span>
                  {isAuthorizedAdmin && (
                    <span className="px-1 py-0.2 bg-rose-600 text-white text-[9px] font-black rounded uppercase">
                      Admin
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-xs">
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-slate-500 font-medium">Places:</span>
              <span className="font-bold text-slate-800">{placesCount}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-xs">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-slate-500 font-medium">Snapshots:</span>
              <span className="font-bold text-slate-800">{totalSnapshotsCount}</span>
            </div>

            {/* Gemma 4 Accident Detector & Siren Button - Only on Head Office And Branches - Physical Monitoring */}
            {activeView === 'monitoring' && onOpenAccidentScanner && (
              <button
                onClick={onOpenAccidentScanner}
                className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  activeIncidentsCount > 0
                    ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200'
                }`}
                title="Open Gemma 4 Accident & Disaster Detector with Alarms"
              >
                <Siren className={`w-3.5 h-3.5 ${activeIncidentsCount > 0 ? 'text-white' : 'text-rose-600'}`} />
                <span>Gemma 4</span>
                {activeAlarmsCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-white text-rose-700 text-[10px] font-extrabold rounded-full">
                    {activeAlarmsCount}
                  </span>
                )}
              </button>
            )}

            {/* API Keys Indicator Button (Maps & Gemini) - Only on Head Office And Branches - Physical Monitoring */}
            {activeView === 'monitoring' && (
              <button
                onClick={onOpenApiKeyHelp}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 transition-colors cursor-pointer"
                title="Click for API Key Setup Info"
              >
                <Key className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-medium hidden sm:inline">Keys:</span>
                <span className={`w-2 h-2 rounded-full ${hasGoogleMapsKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] text-slate-500">Maps</span>
                <span className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] text-slate-500">Gemini</span>
              </button>
            )}

            {/* User Auth: Sign In or Sign Out Button */}
            {userProfile ? (
              <div className="flex items-center gap-2">
                {/* User Identity Pill / Role Badge */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      isAuthorizedAdmin
                        ? 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100'
                        : 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100'
                    }`}
                    title="User Profile & Clearance"
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                      {userProfile.displayName?.charAt(0)?.toUpperCase() || userProfile.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate hidden sm:inline">{userProfile.displayName || userProfile.email.split('@')[0]}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded uppercase font-black ${
                        isAuthorizedAdmin ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {userProfile.role}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Signed in as</p>
                        <p className="text-xs font-bold text-slate-900 truncate">{userProfile.email}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="px-1.5 py-0.2 text-[9px] font-black uppercase rounded bg-slate-100 text-slate-700">
                            Role: {userProfile.role}
                          </span>
                          {isAuthorizedAdmin && (
                            <span className="px-1.5 py-0.2 text-[9px] font-black uppercase rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> Authorized
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="py-1 text-xs">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            if (onChangeView) onChangeView('commercial');
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>Commercial Market Finder</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            if (onChangeView) onChangeView('monitoring');
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                          <span>Head Office And Branches - Physical Monitoring</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            if (onChangeView) onChangeView('admin');
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                        >
                          <Shield className="w-3.5 h-3.5 text-rose-600" />
                          <span>Admin Section &amp; Controls</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={async () => {
                            setIsUserMenuOpen(false);
                            await logout();
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Sign Out Button */}
                <button
                  onClick={async () => {
                    setIsUserMenuOpen(false);
                    await logout();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
                  title="Sign out of COMMSITE across all pages"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : null}

            {/* Action Buttons for Places */}
            {activeView === 'monitoring' && (
              <>
                <button
                  onClick={onOpenUploadModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Upload CSV</span>
                </button>

                <button
                  onClick={onDownloadCsv}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded transition-colors"
                  title="Export places dataset to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

