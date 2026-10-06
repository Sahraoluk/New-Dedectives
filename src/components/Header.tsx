import React from 'react';
import { DetectiveProfile } from '../types/detective';
import {
  Compass,
  FolderOpen,
  Eye,
  FileText,
  MessageSquare,
  Award,
  User,
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  currentTab: 'cases' | 'evidence360' | 'mindpalace' | 'forum' | 'leaderboard' | 'profile';
  setCurrentTab: (tab: 'cases' | 'evidence360' | 'mindpalace' | 'forum' | 'leaderboard' | 'profile') => void;
  profile: DetectiveProfile;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  profile,
  soundEnabled,
  setSoundEnabled,
  savedCount
}) => {
  const handleTabChange = (tab: typeof currentTab) => {
    soundEffects.playClick();
    setCurrentTab(tab);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundEffects.enabled = next;
    setSoundEnabled(next);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d1016]/95 backdrop-blur-md border-b border-amber-900/40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo & Baker Street Title */}
          <div
            onClick={() => handleTabChange('cases')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* 221B Wax Crest Icon */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-radial from-amber-600 via-amber-800 to-amber-950 border border-amber-500/60 shadow-[0_0_15px_rgba(217,119,6,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-amber-100 text-base sm:text-lg tracking-tighter">
                221<span className="text-amber-300 text-xs">B</span>
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600 rounded-full border border-red-300" title="Aktif Soruşturma" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg sm:text-2xl text-[#f3e7ce] tracking-wide">
                  NEW DETECTIVES
                </span>
                <span className="text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800/60 px-1.5 py-0.5 rounded hidden sm:inline">
                  Baker Street Arşivi
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-serif italic hidden md:block">
                "İmkansızı elediğinde, geriye kalan ne kadar olasılıksız olsa da gerçektir."
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-serif text-sm">
            <button
              onClick={() => handleTabChange('cases')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'cases'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <FolderOpen className="w-4 h-4 text-amber-500" />
              <span>Vaka Dosyaları</span>
            </button>

            <button
              onClick={() => handleTabChange('evidence360')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'evidence360'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Adli Kanıtlar</span>
            </button>

            <button
              onClick={() => handleTabChange('mindpalace')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'mindpalace'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Zihin Sarayı</span>
            </button>

            <button
              onClick={() => handleTabChange('forum')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'forum'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>Tartışma Forumu</span>
            </button>

            <button
              onClick={() => handleTabChange('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'leaderboard'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Puan Kürsüsü</span>
            </button>
          </nav>

          {/* Right User Bar & Profile Quick Access */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-[#141922] border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-800/50 transition-colors"
              title={soundEnabled ? 'Sesleri Kapat' : 'Sesleri Aç (Daktilo & Büyüteç)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Profile Pill Trigger */}
            <button
              onClick={() => handleTabChange('profile')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all ${
                currentTab === 'profile'
                  ? 'bg-amber-900/40 border-amber-500 text-amber-200'
                  : 'bg-[#141922] border-stone-800 hover:border-amber-700/60 text-stone-200'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-xs font-serif font-bold text-amber-100 shadow">
                {profile.name.charAt(0) || 'D'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-serif font-bold text-amber-200 leading-tight">
                  {profile.name}
                </div>
                <div className="text-[10px] font-mono text-amber-500/90 leading-tight">
                  {profile.score} XP · Lvl {profile.rankLevel}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-stone-800/60 no-scrollbar text-xs">
          <button
            onClick={() => handleTabChange('cases')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'cases' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Vaka Dosyaları
          </button>
          <button
            onClick={() => handleTabChange('evidence360')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'evidence360' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Adli Kanıtlar
          </button>
          <button
            onClick={() => handleTabChange('mindpalace')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'mindpalace' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Zihin Sarayı
          </button>
          <button
            onClick={() => handleTabChange('forum')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'forum' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Tartışma Forumu
          </button>
          <button
            onClick={() => handleTabChange('leaderboard')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'leaderboard' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Puan Tablosu
          </button>
          <button
            onClick={() => handleTabChange('profile')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === 'profile' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-stone-400'
            }`}
          >
            Profilim ({profile.solvedAnalysesCount})
          </button>
        </div>
      </div>
    </header>
  );
};
