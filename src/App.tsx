import React, { useState, useEffect } from 'react';
import {
  CaseFile,
  DetectiveProfile,
  EvidenceItem,
  ForumComment,
  ForumTopic,
  LeaderboardUser,
  SolutionAnalysis
} from './types/detective';
import { INITIAL_CASES } from './data/mockCases';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredAnalyses,
  saveStoredAnalyses,
  getStoredForum,
  saveStoredForum,
  getStoredLeaderboard,
  saveStoredLeaderboard
} from './utils/storage';
import { soundEffects } from './utils/audio';

import { Header } from './components/Header';
import { CaseCard } from './components/CaseCard';
import { CaseDetailModal } from './components/CaseDetailModal';
import { ProfileView } from './components/ProfileView';
import { ForumView } from './components/ForumView';
import { LeaderboardView } from './components/LeaderboardView';
import { MindPalaceBoard } from './components/MindPalaceBoard';
import { EvidenceLaboratoryView } from './components/EvidenceLaboratoryView';

import {
  Search,
  Filter,
  Bookmark,
  FolderOpen,
  Eye,
  Compass,
  Sparkles,
  Shield,
  Award,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'cases' | 'evidence360' | 'mindpalace' | 'forum' | 'leaderboard' | 'profile'>('cases');
  const [profile, setProfile] = useState<DetectiveProfile>(() => getStoredProfile());
  const [analyses, setAnalyses] = useState<SolutionAnalysis[]>(() => getStoredAnalyses());
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(() => getStoredForum());
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(() => getStoredLeaderboard());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Case detail modal state
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null);

  // Evidence lab jump state
  const [activeEvidenceIdForLab, setActiveEvidenceIdForLab] = useState<string | undefined>(undefined);

  // Filters for Cases View
  const [caseSearch, setCaseSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // Persist state updates to localStorage
  useEffect(() => {
    saveStoredProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveStoredAnalyses(analyses);
  }, [analyses]);

  useEffect(() => {
    saveStoredForum(forumTopics);
  }, [forumTopics]);

  useEffect(() => {
    saveStoredLeaderboard(leaderboard);
  }, [leaderboard]);

  // Keep leaderboard in sync with profile name & score
  const updateProfileAndLeaderboard = (updated: Partial<DetectiveProfile>) => {
    setProfile((prev) => {
      const nextProfile = { ...prev, ...updated };
      // update rank level if score crossed threshold
      const newLevel = Math.max(1, Math.floor(nextProfile.score / 1200));
      nextProfile.rankLevel = newLevel;

      // sync into leaderboard
      setLeaderboard((prevBoard) =>
        prevBoard.map((u) => {
          if (u.name === prev.name || u.isCurrentUser) {
            return {
              ...u,
              name: nextProfile.name,
              title: nextProfile.title,
              score: nextProfile.score,
              isCurrentUser: true
            };
          }
          return u;
        })
      );
      return nextProfile;
    });
  };

  // Bookmark / Save case handler
  const handleToggleSaveCase = (caseId: string) => {
    setProfile((prev) => {
      const isSaved = prev.savedCaseIds.includes(caseId);
      const nextSaved = isSaved
        ? prev.savedCaseIds.filter((id) => id !== caseId)
        : [...prev.savedCaseIds, caseId];
      return { ...prev, savedCaseIds: nextSaved };
    });
  };

  // Submit new solution analysis (+100 XP)
  const handleSubmitAnalysis = (analysis: SolutionAnalysis) => {
    setAnalyses((prev) => [analysis, ...prev]);
    updateProfileAndLeaderboard({
      score: profile.score + 100,
      solvedAnalysesCount: profile.solvedAnalysesCount + 1
    });
  };

  // Delete user analysis
  const handleDeleteAnalysis = (id: string) => {
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
  };

  // Vote on analysis
  const handleVoteAnalysis = (analysisId: string, type: 'up' | 'down') => {
    soundEffects.playClick();
    setAnalyses((prev) =>
      prev.map((a) => {
        if (a.id === analysisId) {
          if (a.userVote === type) {
            return {
              ...a,
              upvotes: type === 'up' ? a.upvotes - 1 : a.upvotes,
              downvotes: type === 'down' ? a.downvotes - 1 : a.downvotes,
              userVote: null
            };
          }
          const prevUpDelta = a.userVote === 'up' ? -1 : 0;
          const prevDownDelta = a.userVote === 'down' ? -1 : 0;
          return {
            ...a,
            upvotes: a.upvotes + (type === 'up' ? 1 : 0) + prevUpDelta,
            downvotes: a.downvotes + (type === 'down' ? 1 : 0) + prevDownDelta,
            userVote: type
          };
        }
        return a;
      })
    );
  };

  // Claim XP from inspecting 360 evidence (+25 XP)
  const handleEvidenceExamined = (evidenceId: string) => {
    updateProfileAndLeaderboard({
      score: profile.score + 25,
      evidencesExaminedCount: profile.evidencesExaminedCount + 1
    });
  };

  // Forum actions
  const handleVoteTopic = (topicId: string, type: 'up' | 'down') => {
    soundEffects.playClick();
    setForumTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          if (t.userVote === type) {
            return {
              ...t,
              upvotes: type === 'up' ? t.upvotes - 1 : t.upvotes,
              downvotes: type === 'down' ? t.downvotes - 1 : t.downvotes,
              userVote: null
            };
          }
          const prevUpDelta = t.userVote === 'up' ? -1 : 0;
          const prevDownDelta = t.userVote === 'down' ? -1 : 0;
          return {
            ...t,
            upvotes: t.upvotes + (type === 'up' ? 1 : 0) + prevUpDelta,
            downvotes: t.downvotes + (type === 'down' ? 1 : 0) + prevDownDelta,
            userVote: type
          };
        }
        return t;
      })
    );
  };

  const handleAddTopic = (topic: ForumTopic) => {
    setForumTopics((prev) => [topic, ...prev]);
    updateProfileAndLeaderboard({
      score: profile.score + 50
    });
  };

  const handleAddComment = (topicId: string, comment: ForumComment) => {
    setForumTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            comments: [...t.comments, comment]
          };
        }
        return t;
      })
    );
    updateProfileAndLeaderboard({
      score: profile.score + 10
    });
  };

  const handleOpenCaseById = (caseId: string) => {
    const found = INITIAL_CASES.find((c) => c.id === caseId);
    if (found) {
      setSelectedCase(found);
    }
  };

  const handleOpenEvidenceInLab = (evidence: EvidenceItem) => {
    setActiveEvidenceIdForLab(evidence.id);
    setCurrentTab('evidence360');
  };

  // Filter cases for main catalog
  const filteredCases = INITIAL_CASES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(caseSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSaved = !onlySaved || profile.savedCaseIds.includes(c.id);
    return matchesSearch && matchesStatus && matchesSaved;
  });

  const userAnalyses = analyses.filter(
    (a) => a.authorDetectiveName === profile.name || a.authorDetectiveName === 'Dedektif Sahra'
  );

  return (
    <div className="min-h-screen bg-[#0c0f14] text-[#e2d8c3] flex flex-col font-sans selection:bg-amber-800/40 selection:text-amber-100">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profile={profile}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        savedCount={profile.savedCaseIds.length}
      />

      {/* Main Body per Active Tab */}
      <main className="flex-1">
        {/* TAB: CASES ARCHIVE */}
        {currentTab === 'cases' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-200">
            {/* Victorian Baker Street Hero Banner */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#17120e] via-[#1c1a16] to-[#121720] border border-amber-900/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(#cbb282 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-xs font-mono text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>221B Baker Street Özel Kriminoloji Arşivi</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#f7ebd4] tracking-tight leading-tight">
                  Tarihin En Büyük Çözülememiş Suç Dosyaları
                </h1>

                <p className="text-sm sm:text-base text-stone-300 font-serif leading-relaxed">
                  Ayrıntılı adli kanıt raporlarını okuyun, şüphelilerin ifadelerindeki çelişkileri ve otopsi bulgularını inceleyin; kendi mantıksal çözüm hipotezinizi yazarak toplulukla tartışın.
                </p>

                {/* Quick Stats Strip */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>5 Çözülememiş Soğuk Vaka</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Detaylı Adli Kanıt Dosyaları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>{profile.score} Dedektif XP ({profile.rank})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-[#12161f] border border-stone-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                  placeholder="Vaka adı, yer veya dosya no ara..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0a0d13] border border-stone-800 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Status and Saved Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs font-serif">
                <div className="inline-flex rounded-lg bg-[#0a0d13] p-1 border border-stone-800">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setStatusFilter('all');
                    }}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-amber-900/70 text-amber-100 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Tüm Dosyalar
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setStatusFilter('unsolved');
                    }}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      statusFilter === 'unsolved'
                        ? 'bg-amber-900/70 text-amber-100 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Çözülemedi
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setStatusFilter('cold_case');
                    }}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      statusFilter === 'cold_case'
                        ? 'bg-amber-900/70 text-amber-100 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Soğuk Vaka
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setStatusFilter('reopened');
                    }}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      statusFilter === 'reopened'
                        ? 'bg-amber-900/70 text-amber-100 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Yeniden Açılan
                  </button>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setOnlySaved(!onlySaved);
                  }}
                  className={`px-3 py-2 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    onlySaved
                      ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                      : 'bg-[#0a0d13] border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-amber-400' : ''}`} />
                  <span>Kayıtlı Dosyalarım ({profile.savedCaseIds.length})</span>
                </button>
              </div>
            </div>

            {/* Case Dossiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseFile={caseItem}
                  onOpenCase={(c) => setSelectedCase(c)}
                  isSaved={profile.savedCaseIds.includes(caseItem.id)}
                  onToggleSave={handleToggleSaveCase}
                />
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-16 bg-[#12161f] rounded-xl border border-stone-800 p-8">
                <FolderOpen className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-stone-300">
                  Aradığınız kriterlere uygun vaka dosyası bulunamadı
                </h3>
                <p className="text-xs text-stone-400 font-serif mt-1">
                  Arama kelimesini değiştirin veya filtreleri temizleyin.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB: 360° EVIDENCE LABORATORY */}
        {currentTab === 'evidence360' && (
          <EvidenceLaboratoryView
            cases={INITIAL_CASES}
            onEvidenceExamined={handleEvidenceExamined}
            initialEvidenceId={activeEvidenceIdForLab}
          />
        )}

        {/* TAB: MIND PALACE */}
        {currentTab === 'mindpalace' && (
          <MindPalaceBoard
            cases={INITIAL_CASES}
            onOpenCase={(c) => setSelectedCase(c)}
            onOpenEvidence={handleOpenEvidenceInLab}
          />
        )}

        {/* TAB: DISCUSSION FORUM */}
        {currentTab === 'forum' && (
          <ForumView
            topics={forumTopics}
            profile={profile}
            cases={INITIAL_CASES}
            onVoteTopic={handleVoteTopic}
            onAddTopic={handleAddTopic}
            onAddComment={handleAddComment}
            onOpenCaseById={handleOpenCaseById}
          />
        )}

        {/* TAB: LEADERBOARD & SCORES */}
        {currentTab === 'leaderboard' && (
          <LeaderboardView leaderboard={leaderboard} profile={profile} />
        )}

        {/* TAB: USER PROFILE */}
        {currentTab === 'profile' && (
          <ProfileView
            profile={profile}
            onUpdateProfile={updateProfileAndLeaderboard}
            userAnalyses={userAnalyses}
            onDeleteAnalysis={handleDeleteAnalysis}
            onOpenCaseById={handleOpenCaseById}
          />
        )}
      </main>

      {/* Case Detail Modal (If open) */}
      {selectedCase && (
        <CaseDetailModal
          caseFile={selectedCase}
          onClose={() => setSelectedCase(null)}
          profile={profile}
          analyses={analyses}
          onVoteAnalysis={handleVoteAnalysis}
          onSubmitAnalysis={handleSubmitAnalysis}
          isSaved={profile.savedCaseIds.includes(selectedCase.id)}
          onToggleSave={handleToggleSaveCase}
          onEvidenceExamined={handleEvidenceExamined}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#090b0e] border-t border-amber-900/30 py-8 px-4 sm:px-6 mt-12 text-center text-xs text-stone-500 font-serif">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-500 font-bold tracking-wider uppercase text-[11px]">
            <span>New Detectives</span>
            <span>·</span>
            <span>221B Baker Street</span>
            <span>·</span>
            <span>Adli Kriminoloji Arşivi</span>
          </div>
          <p className="italic text-stone-400">
            "Dünyadaki en harika dedüksiyonlar, küçük detayları görebilen zihinlerin eseridir."
          </p>
          <div className="text-[10px] text-stone-600 font-mono pt-2">
            HTML5 · CSS · JS · 360° Delil İnceleme · Adli Kriminoloji ve Tartışma Sistemi
          </div>
        </div>
      </footer>
    </div>
  );
}
