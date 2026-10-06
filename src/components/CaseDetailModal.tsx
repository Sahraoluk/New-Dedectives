import React, { useState } from 'react';
import { CaseFile, DetectiveProfile, EvidenceItem, SolutionAnalysis, Suspect } from '../types/detective';
import { EvidenceReader } from './EvidenceReader';
import { SubmitAnalysisModal } from './SubmitAnalysisModal';
import {
  X,
  FileText,
  Clock,
  Users,
  Eye,
  Compass,
  ChevronRight,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  Share2,
  ShieldAlert
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CaseDetailModalProps {
  caseFile: CaseFile;
  onClose: () => void;
  profile: DetectiveProfile;
  analyses: SolutionAnalysis[];
  onVoteAnalysis: (analysisId: string, type: 'up' | 'down') => void;
  onSubmitAnalysis: (analysis: SolutionAnalysis) => void;
  isSaved: boolean;
  onToggleSave: (caseId: string) => void;
  onEvidenceExamined: (evidenceId: string) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseFile,
  onClose,
  profile,
  analyses,
  onVoteAnalysis,
  onSubmitAnalysis,
  isSaved,
  onToggleSave,
  onEvidenceExamined
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'suspects' | 'evidence360' | 'analyses'>('overview');
  const [selectedEvidenceIndex, setSelectedEvidenceIndex] = useState<number>(0);
  const [isSubmitAnalysisOpen, setIsSubmitAnalysisOpen] = useState<boolean>(false);
  const [suspectVotes, setSuspectVotes] = useState<Record<string, number>>(
    caseFile.suspects.reduce((acc, s) => ({ ...acc, [s.id]: s.communitySuspicionVote }), {})
  );
  const [votedSuspectId, setVotedSuspectId] = useState<string | null>(null);

  const caseAnalyses = analyses.filter((a) => a.caseId === caseFile.id);

  const handleSuspectVote = (suspectId: string) => {
    soundEffects.playClick();
    if (votedSuspectId === suspectId) return;
    setSuspectVotes((prev) => ({
      ...prev,
      [suspectId]: (prev[suspectId] || 0) + 1
    }));
    setVotedSuspectId(suspectId);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    soundEffects.playClick();
    setActiveTab(tab);
  };

  const currentEvidence = caseFile.evidenceList[selectedEvidenceIndex] || caseFile.evidenceList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#11141c] border border-amber-800/60 rounded-xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Top Case Dossier Ribbon */}
        <div className="bg-[#171c26] px-4 sm:px-6 py-4 border-b border-amber-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-600/50 flex items-center justify-center text-amber-300 font-mono font-bold text-sm">
              {caseFile.caseNumber.split('-')[1] || 'DOC'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-500">{caseFile.caseNumber}</span>
                <span className="text-stone-500">·</span>
                <span className="text-xs font-mono text-stone-400">{caseFile.location} ({caseFile.year})</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f5ebd7] leading-tight">
                {caseFile.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(caseFile.id)}
              className={`p-2 rounded-lg border text-xs font-serif transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Zihin Sarayı Arşivine Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Arşivde' : 'Arşive Kaydet'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Tabs */}
        <div className="bg-[#131721] px-4 sm:px-6 border-b border-stone-800/80 flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-serif">
          <button
            onClick={() => handleTabChange('overview')}
            className={`py-3 px-2 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Dosya Özeti & Adli Tıp</span>
          </button>

          <button
            onClick={() => handleTabChange('timeline')}
            className={`py-3 px-2 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Zaman Çizelgesi ({caseFile.timeline.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('suspects')}
            className={`py-3 px-2 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'suspects'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Şüpheliler & Oylama ({caseFile.suspects.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('evidence360')}
            className={`py-3 px-2 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'evidence360'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Adli Kanıt Dosyaları ({caseFile.evidenceList.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('analyses')}
            className={`py-3 px-2 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'analyses'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Çözüm Analizleri ({caseAnalyses.length})</span>
          </button>
        </div>

        {/* Tab Contents Viewport */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Narrative Story */}
              <div className="bg-[#141922] p-5 sm:p-6 rounded-xl border border-amber-900/30">
                <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Olay Örgüsü & Dosya Arka Planı</span>
                </h3>
                <p className="text-sm text-stone-300 font-serif leading-relaxed whitespace-pre-line">
                  {caseFile.narrative}
                </p>
              </div>

              {/* Forensic Autopsy Report */}
              <div className="bg-[#181315] p-5 sm:p-6 rounded-xl border border-red-900/40 relative">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-serif font-bold text-red-300 uppercase tracking-wider">
                    Adli Tıp & Otopsi Raporu
                  </h3>
                </div>
                <div className="bg-[#0f0c0d] p-4 rounded-lg border border-red-950 text-xs font-mono text-stone-300 whitespace-pre-line leading-relaxed">
                  {caseFile.forensicReport}
                </div>
              </div>

              {/* Unsolved Questions (The Sherlock Puzzles) */}
              <div className="bg-[#131a24] p-5 sm:p-6 rounded-xl border border-amber-900/30">
                <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-amber-500" />
                  <span>Cevapsız Kalan Kritik Sorular</span>
                </h3>
                <div className="space-y-2.5">
                  {caseFile.unsolvedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0d121a] rounded-lg border border-stone-800 text-xs text-stone-300 font-serif flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-xs text-stone-400 font-serif italic mb-2">
                Olayların adli kronolojisi dakika dakika kaydedilmiştir:
              </div>
              <div className="relative border-l-2 border-amber-900/60 ml-4 space-y-6 pl-6">
                {caseFile.timeline.map((item, idx) => (
                  <div key={item.id} className="relative group">
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${
                        item.importance === 'critical'
                          ? 'bg-red-600 border-red-300'
                          : 'bg-amber-600 border-amber-300'
                      }`}
                    />
                    <div className="bg-[#141922] p-4 rounded-xl border border-stone-800 group-hover:border-amber-700/60 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs text-amber-400 font-bold">
                          {item.date} · {item.time}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {item.location}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-stone-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-300 font-serif leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SUSPECTS & VOTING */}
          {activeTab === 'suspects' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="text-xs text-stone-400 font-serif italic mb-2">
                Dosyadaki baş şüpheliler ve delil temelli topluluk şüphe oylaması:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseFile.suspects.map((suspect) => {
                  const voteCount = suspectVotes[suspect.id] || 0;
                  const isVoted = votedSuspectId === suspect.id;

                  return (
                    <div
                      key={suspect.id}
                      className="bg-[#141922] border border-amber-900/30 rounded-xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h4 className="text-base font-serif font-bold text-amber-200">
                              {suspect.name}
                            </h4>
                            <div className="text-xs font-mono text-amber-500">
                              {suspect.profession} · Yaş: {suspect.ageAtTime}
                            </div>
                          </div>
                          {suspect.alias && (
                            <span className="text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                              {suspect.alias}
                            </span>
                          )}
                        </div>

                        {/* Motive & Alibi */}
                        <div className="space-y-2 text-xs mb-3">
                          <div className="p-2.5 bg-[#0e1218] rounded border border-stone-800">
                            <span className="font-bold text-amber-400 block mb-0.5">Motivasyon / Neden:</span>
                            <span className="text-stone-300 font-serif">{suspect.motive}</span>
                          </div>
                          <div className="p-2.5 bg-[#0e1218] rounded border border-stone-800">
                            <span className="font-bold text-stone-400 block mb-0.5">Öne Sürdüğü Alibi:</span>
                            <span className="text-stone-300 font-serif">{suspect.alibi}</span>
                          </div>
                        </div>

                        {/* Suspicious Factors */}
                        <div className="mb-3">
                          <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                            Şüpheli Unsurlar:
                          </span>
                          <ul className="text-xs text-stone-300 list-disc list-inside space-y-1 font-serif">
                            {suspect.suspiciousFactors.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Sherlock Assessment */}
                        <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs font-serif italic text-amber-200/90 mb-4">
                          "{suspect.sherlockAssessment}"
                        </div>
                      </div>

                      {/* Community Vote Bar */}
                      <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
                        <div className="text-xs font-mono text-amber-400">
                          Şüphe Puanı: <span className="font-bold">{voteCount} Oy</span>
                        </div>
                        <button
                          onClick={() => handleSuspectVote(suspect.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                            isVoted
                              ? 'bg-amber-600 text-stone-900 shadow'
                              : 'bg-stone-900 border border-stone-700 text-stone-300 hover:border-amber-600'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{isVoted ? 'Oy Verildi' : 'Fail Olarak Oyla'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ADLİ KANIT DOSYALARI & RAPORLAR */}
          {activeTab === 'evidence360' && (
            <div className="space-y-6">
              {/* Evidence Sub-Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {caseFile.evidenceList.map((ev, idx) => (
                  <button
                    key={ev.id}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedEvidenceIndex(idx);
                    }}
                    className={`px-3 py-2 rounded-lg border text-xs font-serif whitespace-nowrap transition-colors flex items-center gap-2 ${
                      selectedEvidenceIndex === idx
                        ? 'bg-amber-900/60 border-amber-500 text-amber-200 font-bold'
                        : 'bg-[#141922] border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>{ev.name}</span>
                  </button>
                ))}
              </div>

              {/* The Textual Forensic Evidence Reader */}
              {currentEvidence && (
                <EvidenceReader
                  evidence={currentEvidence}
                  onEvidenceExamined={onEvidenceExamined}
                />
              )}
            </div>
          )}

          {/* TAB 5: DEDUCTION ANALYSES & VOTING */}
          {activeTab === 'analyses' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Header and CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#141922] rounded-xl border border-amber-900/40">
                <div>
                  <h3 className="text-sm font-serif font-bold text-amber-200">
                    Dedektif Çözüm Analizleri & Topluluk Oylaması
                  </h3>
                  <p className="text-xs text-stone-400 font-serif">
                    Bu dosya için yayınlanmış hipotezleri oylayabilir veya kendi çıkarımınızı yazabilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsSubmitAnalysisOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-amber-50 font-serif font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-amber-200" />
                  <span>Kendi Analizini Yaz (+100 XP)</span>
                </button>
              </div>

              {/* List of Analyses */}
              {caseAnalyses.length === 0 ? (
                <div className="text-center py-12 bg-[#12161f] rounded-xl border border-stone-800 p-6">
                  <Compass className="w-10 h-10 text-stone-600 mx-auto mb-2" />
                  <h4 className="text-sm font-serif font-bold text-stone-300">
                    Henüz Çözüm Analizi Yayınlanmadı
                  </h4>
                  <p className="text-xs text-stone-400 font-serif mt-1">
                    Bu dosyanın ilk dedektifi olun ve mantıksal hipotezinizi toplulukla paylaşın!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {caseAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="bg-[#141922] border border-stone-800 hover:border-amber-900/50 rounded-xl p-5 transition-colors"
                    >
                      {/* Author Bar */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-900/80 border border-amber-600/50 flex items-center justify-center font-serif text-xs font-bold text-amber-200">
                            {analysis.authorDetectiveName.charAt(0)}
                          </div>
                          <div>
                            <span className="text-xs font-serif font-bold text-amber-200">
                              {analysis.authorDetectiveName}
                            </span>
                            <span className="text-stone-500 text-xs ml-2">·</span>
                            <span className="text-[11px] font-mono text-amber-500 ml-2">
                              {analysis.authorRank}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-stone-500">
                          {analysis.createdAt}
                        </span>
                      </div>

                      {/* Theory Title */}
                      <h4 className="text-base font-serif font-bold text-stone-100 mb-2">
                        {analysis.theoryTitle}
                      </h4>

                      {/* Motive and Suspect */}
                      <div className="p-3 bg-[#0d1017] rounded-lg border border-stone-800 text-xs mb-3 space-y-1">
                        <div>
                          <span className="text-amber-400 font-bold">Hedef Şüpheli: </span>
                          <span className="text-stone-200">{analysis.primeSuspectName}</span>
                        </div>
                        <div>
                          <span className="text-amber-400 font-bold">Motivasyon: </span>
                          <span className="text-stone-300 font-serif">{analysis.motiveExplanation}</span>
                        </div>
                      </div>

                      {/* Deduction Narrative */}
                      <p className="text-xs text-stone-300 font-serif leading-relaxed whitespace-pre-line mb-3">
                        {analysis.deductionNarrative}
                      </p>

                      {/* Evidence Links */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <span className="text-[11px] font-mono text-stone-500">Dayanaklar:</span>
                        {analysis.evidenceLinks.map((ev, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-serif bg-stone-900 border border-stone-800 text-amber-300/80 px-2 py-0.5 rounded"
                          >
                            {ev}
                          </span>
                        ))}
                      </div>

                      {/* Voting Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onVoteAnalysis(analysis.id, 'up')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                              analysis.userVote === 'up'
                                ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                            }`}
                            title="Destekle"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{analysis.upvotes}</span>
                          </button>

                          <button
                            onClick={() => onVoteAnalysis(analysis.id, 'down')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                              analysis.userVote === 'down'
                                ? 'bg-red-950 border border-red-600 text-red-300'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                            }`}
                            title="Çürüt"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>{analysis.downvotes}</span>
                          </button>
                        </div>

                        <span className="text-[11px] font-mono text-amber-500/80">
                          {analysis.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Analysis Modal */}
      {isSubmitAnalysisOpen && (
        <SubmitAnalysisModal
          isOpen={isSubmitAnalysisOpen}
          onClose={() => setIsSubmitAnalysisOpen(false)}
          caseFile={caseFile}
          profile={profile}
          onSubmitAnalysis={onSubmitAnalysis}
        />
      )}
    </div>
  );
};
