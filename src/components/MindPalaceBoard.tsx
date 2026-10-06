import React, { useState } from 'react';
import { CaseFile, Suspect, EvidenceItem } from '../types/detective';
import {
  Compass,
  Pin,
  Trash2,
  Plus,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Lightbulb
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MindPalaceBoardProps {
  cases: CaseFile[];
  onOpenCase: (caseFile: CaseFile) => void;
  onOpenEvidence: (evidence: EvidenceItem) => void;
}

interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'red' | 'blue';
}

export const MindPalaceBoard: React.FC<MindPalaceBoardProps> = ({
  cases,
  onOpenCase,
  onOpenEvidence
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [eliminatedSuspects, setEliminatedSuspects] = useState<string[]>([]);
  const [connectedPairs, setConnectedPairs] = useState<{ suspectId: string; evidenceId: string }[]>([]);
  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: 'n1',
      text: 'Zamanlama Çelişkisi: Mary Ann Nichols köstekli saat 03:45 darbesi Charles Cross ifadesiyle çakışıyor!',
      color: 'yellow'
    },
    {
      id: 'n2',
      text: 'Sherlock Kuralı: İmkansız olanı elediğinde geriye kalan tek şüpheli Montague Druitt.',
      color: 'blue'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const toggleEliminate = (suspectId: string) => {
    soundEffects.playClick();
    if (eliminatedSuspects.includes(suspectId)) {
      setEliminatedSuspects(eliminatedSuspects.filter((id) => id !== suspectId));
    } else {
      setEliminatedSuspects([...eliminatedSuspects, suspectId]);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    soundEffects.playClick();
    setNotes([
      ...notes,
      {
        id: `note-${Date.now()}`,
        text: newNoteText.trim(),
        color: 'yellow'
      }
    ]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    soundEffects.playClick();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Mind Palace Header */}
      <div className="bg-[#12161f] border border-amber-900/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded">
              Zihin Sarayı (Mind Palace)
            </span>
            <span className="text-stone-500 text-xs">·</span>
            <span className="text-xs text-stone-400 font-serif">Sherlock Dedüksiyon Panosu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7]">
            Delil Bağlantı & Mantıksal Eleme Tahtası
          </h1>
          <p className="text-xs text-stone-300 font-serif max-w-2xl mt-1 italic">
            "İmkansızı elediğinde, geriye kalan ne kadar olasılıksız olursa olsun, gerçektir."
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-serif text-stone-300">Aktif Dava:</label>
          <select
            value={selectedCaseId}
            onChange={(e) => {
              soundEffects.playClick();
              setSelectedCaseId(e.target.value);
            }}
            className="px-3 py-2 rounded-lg bg-[#181f2c] border border-amber-700/60 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Corkboard Pinboard */}
      <div
        className="rounded-2xl border-4 border-[#241a13] p-6 shadow-2xl relative overflow-hidden min-h-[600px]"
        style={{
          backgroundColor: '#151310',
          backgroundImage:
            'radial-gradient(#292018 1px, transparent 1px), radial-gradient(#1e1610 1px, #14110e 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px'
        }}
      >
        {/* Subtle red thread overlay visual */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="20%" y1="30%" x2="55%" y2="35%" stroke="#b91c1c" strokeWidth="2.5" strokeDasharray="6,4" />
          <line x1="55%" y1="35%" x2="80%" y2="50%" stroke="#b91c1c" strokeWidth="2.5" strokeDasharray="6,4" />
          <line x1="30%" y1="75%" x2="55%" y2="35%" stroke="#b91c1c" strokeWidth="2" strokeDasharray="4,4" />
        </svg>

        {/* Top Controls: Add Sticky Note */}
        <div className="relative z-10 mb-6 bg-[#1a1612]/90 backdrop-blur-md p-3 rounded-xl border border-amber-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-serif font-bold text-amber-200">
              {currentCase.title} — Dedüksiyon Matrisi
            </span>
          </div>

          <form onSubmit={handleAddNote} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Zihin Sarayına mantık notu iğnele..."
              className="px-3 py-1.5 rounded-lg bg-[#0d0a08] border border-amber-900/60 text-stone-200 text-xs font-serif placeholder:text-stone-600 focus:outline-none focus:border-amber-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-lg text-xs font-serif font-bold transition-colors shrink-0 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>İğnele</span>
            </button>
          </form>
        </div>

        {/* 3 Main Columns: Şüpheliler, 360° Deliller, Zihin Sarayı Notları */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Suspects with "İmkansızı Ele" rule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                <span>Şüpheliler & Elemeler</span>
              </h3>
              <span className="text-[11px] font-mono text-stone-500">
                {eliminatedSuspects.length} Elendi
              </span>
            </div>

            <div className="space-y-3">
              {currentCase.suspects.map((suspect) => {
                const isEliminated = eliminatedSuspects.includes(suspect.id);

                return (
                  <div
                    key={suspect.id}
                    className={`relative p-4 rounded-xl border transition-all shadow-lg ${
                      isEliminated
                        ? 'bg-[#181111]/80 border-red-950 opacity-60 grayscale'
                        : 'bg-[#1d1712] border-amber-900/50 hover:border-amber-700'
                    }`}
                  >
                    {/* Pushpin at top */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-700 border border-red-400 shadow" />

                    {isEliminated && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <span className="text-lg font-mono font-black text-red-500 border-2 border-red-500 px-3 py-1 rounded -rotate-12 tracking-widest bg-black/70">
                          ELENDİ (İMKANSIZ)
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-amber-200">
                          {suspect.name}
                        </h4>
                        <div className="text-[11px] font-mono text-amber-500">
                          {suspect.profession} · {suspect.alias || 'Şüpheli'}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 font-serif line-clamp-2 mt-2 leading-relaxed">
                      {suspect.motive}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between">
                      <button
                        onClick={() => toggleEliminate(suspect.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-serif transition-colors flex items-center gap-1 ${
                          isEliminated
                            ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                            : 'bg-red-950/80 border border-red-800 text-red-200 hover:bg-red-900'
                        }`}
                      >
                        {isEliminated ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Şüpheye Geri Al</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-400" />
                            <span>İmkansızı Ele</span>
                          </>
                        )}
                      </button>

                      <span className="text-[11px] font-mono text-amber-400">
                        %{suspect.communitySuspicionVote} Şüphe
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Adli Deliller & Belgeler Pinned on Board */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>Adli Deliller & Belgeler</span>
              </h3>
              <span className="text-[11px] font-mono text-stone-500">
                {currentCase.evidenceList.length} Kanıt
              </span>
            </div>

            <div className="space-y-3">
              {currentCase.evidenceList.map((ev) => (
                <div
                  key={ev.id}
                  className="relative p-4 rounded-xl bg-[#1c1611] border border-amber-900/50 hover:border-amber-600/70 transition-all shadow-lg group cursor-pointer"
                  onClick={() => onOpenEvidence(ev)}
                >
                  {/* Pushpin */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border border-amber-300 shadow" />

                  <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
                    <span>{ev.code}</span>
                    <span className="text-amber-500">{ev.category}</span>
                  </div>

                  <h4 className="text-sm font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {ev.name}
                  </h4>

                  <p className="text-xs text-stone-300 font-serif mt-1.5 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 font-mono">{ev.dateFound}</span>
                    <span className="text-amber-400 font-serif flex items-center gap-1 group-hover:underline">
                      <FileText className="w-3 h-3" />
                      <span>Adli Raporu Oku</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Pinned Sticky Notes & Sherlock Deductions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span>Zihin Notları & Dedüksiyon</span>
              </h3>
              <span className="text-[11px] font-mono text-stone-500">{notes.length} Not</span>
            </div>

            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`relative p-4 rounded-xl shadow-xl transition-transform hover:-rotate-1 ${
                    note.color === 'yellow'
                      ? 'bg-[#332b14] border border-amber-500/40 text-amber-100'
                      : note.color === 'blue'
                      ? 'bg-[#152336] border border-blue-500/40 text-blue-100'
                      : 'bg-[#2d1414] border border-red-500/40 text-red-100'
                  }`}
                >
                  {/* Pin */}
                  <div className="absolute -top-2 left-6 w-3.5 h-3.5 rounded-full bg-amber-400 border border-stone-900 shadow" />

                  <p className="text-xs font-serif leading-relaxed pr-6">{note.text}</p>

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-stone-400 hover:text-red-400 p-1"
                      title="Notu Kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
