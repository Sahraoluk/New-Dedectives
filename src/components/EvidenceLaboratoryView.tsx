import React, { useState } from 'react';
import { CaseFile, EvidenceItem } from '../types/detective';
import { EvidenceReader } from './EvidenceReader';
import { FileText, Sparkles, Filter, Search, Compass, BookOpen, Clock } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface EvidenceLaboratoryViewProps {
  cases: CaseFile[];
  onEvidenceExamined: (evidenceId: string) => void;
  initialEvidenceId?: string;
}

export const EvidenceLaboratoryView: React.FC<EvidenceLaboratoryViewProps> = ({
  cases,
  onEvidenceExamined,
  initialEvidenceId
}) => {
  // Collect all evidences with case title metadata
  const allEvidences: { evidence: EvidenceItem; caseTitle: string; caseId: string }[] = [];
  cases.forEach((c) => {
    c.evidenceList.forEach((ev) => {
      allEvidences.push({ evidence: ev, caseTitle: c.title, caseId: c.id });
    });
  });

  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(
    initialEvidenceId || allEvidences[0]?.evidence.id || ''
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentItem =
    allEvidences.find((item) => item.evidence.id === selectedEvidenceId) || allEvidences[0];

  const filteredItems = allEvidences.filter((item) => {
    const matchesCat = categoryFilter === 'Tümü' || item.evidence.category === categoryFilter;
    const matchesSearch =
      item.evidence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.evidence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-[#12161f] border border-amber-900/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded">
              Adli Tıp & Kriminoloji Arşivi
            </span>
            <span className="text-stone-500 text-xs">·</span>
            <span className="text-xs text-stone-400 font-serif">Detaylı Yazılı Kanıt Raporları</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7]">
            Adli Kanıtlar & Belge Raporları
          </h1>
          <p className="text-xs text-stone-300 font-serif max-w-2xl mt-1 leading-relaxed">
            Tarihi gerçek suç dosyalarındaki fiziksel delillerin, balistik kovanların, şifreli mektupların ve otopsi bulgularının detaylı adli dökümü ve transkripsiyonları.
          </p>
        </div>

        <div className="p-3 bg-[#181f2b] rounded-xl border border-amber-700/40 text-xs font-serif text-amber-200 flex items-center gap-2 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Her Kanıt İncelemesi: <strong>+25 XP</strong></span>
        </div>
      </div>

      {/* Grid: Clue Selector List + Full Textual Evidence Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Clues List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search and Category Filter */}
          <div className="bg-[#141922] p-3 rounded-xl border border-stone-800 space-y-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kanıt veya dosya ara..."
              className="w-full px-3 py-1.5 rounded-lg bg-[#0e1217] border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-600"
            />

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-[11px] font-serif pt-1">
              {['Tümü', 'Fiziksel Kanıt', 'Adli Belge', 'Balistik', 'Toksikoloji'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEffects.playClick();
                    setCategoryFilter(cat);
                  }}
                  className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-amber-900/60 text-amber-200 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Evidence Items */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = item.evidence.id === selectedEvidenceId;

              return (
                <div
                  key={item.evidence.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedEvidenceId(item.evidence.id);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-[#141922] border-stone-800/80 hover:border-amber-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                    <span className="text-amber-500/80">{item.evidence.code}</span>
                    <span>{item.evidence.category}</span>
                  </div>

                  <h4 className="text-sm font-serif font-bold text-[#f5ebd7] mb-1">
                    {item.evidence.name}
                  </h4>

                  <div className="text-[11px] font-serif text-stone-400 truncate mb-2">
                    Vaka: {item.caseTitle}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-800/60">
                    <span className="text-stone-500 font-mono">{item.evidence.dateFound}</span>
                    <span className="text-amber-400 font-mono text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Raporu Oku</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Textual Evidence Reader */}
        <div className="lg:col-span-8">
          {currentItem ? (
            <div className="space-y-4">
              <div className="text-xs font-mono text-stone-400 flex items-center justify-between bg-[#141922] px-4 py-2.5 rounded-lg border border-stone-800">
                <span>VAKA DOSYASI: <strong>{currentItem.caseTitle}</strong></span>
                <span className="text-amber-400">AYRINTILI ADLİ TIK TUTANAĞI</span>
              </div>
              <EvidenceReader
                evidence={currentItem.evidence}
                onEvidenceExamined={onEvidenceExamined}
              />
            </div>
          ) : (
            <div className="p-12 text-center text-stone-500 font-serif">
              Kanıt seçiniz.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

