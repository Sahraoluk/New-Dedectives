import React, { useState } from 'react';
import { CaseFile, DetectiveProfile, SolutionAnalysis } from '../types/detective';
import { X, Feather, CheckCircle2, AlertCircle, Compass, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SubmitAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseFile: CaseFile;
  profile: DetectiveProfile;
  onSubmitAnalysis: (analysis: SolutionAnalysis) => void;
}

export const SubmitAnalysisModal: React.FC<SubmitAnalysisModalProps> = ({
  isOpen,
  onClose,
  caseFile,
  profile,
  onSubmitAnalysis
}) => {
  const [theoryTitle, setTheoryTitle] = useState('');
  const [primeSuspectId, setPrimeSuspectId] = useState(caseFile.suspects[0]?.id || '');
  const [motiveExplanation, setMotiveExplanation] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [deductionNarrative, setDeductionNarrative] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const toggleEvidence = (evName: string) => {
    soundEffects.playClick();
    if (selectedEvidence.includes(evName)) {
      setSelectedEvidence(selectedEvidence.filter((e) => e !== evName));
    } else {
      setSelectedEvidence([...selectedEvidence, evName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theoryTitle.trim()) {
      setErrorMsg('Lütfen teoriniz için bir başlık belirleyin.');
      return;
    }
    if (!motiveExplanation.trim()) {
      setErrorMsg('Lütfen failin motivasyonunu ve fırsatını açıklayın.');
      return;
    }
    if (!deductionNarrative.trim()) {
      setErrorMsg('Lütfen dedüksiyon analizinizin adımlarını yazın.');
      return;
    }

    const primeSuspect = caseFile.suspects.find((s) => s.id === primeSuspectId);

    const newAnalysis: SolutionAnalysis = {
      id: `ana-${Date.now()}`,
      caseId: caseFile.id,
      caseTitle: caseFile.title,
      authorDetectiveName: profile.name,
      authorBadge: profile.avatarIcon,
      authorRank: profile.title,
      createdAt: 'Az önce',
      theoryTitle: theoryTitle.trim(),
      primeSuspectId: primeSuspectId,
      primeSuspectName: primeSuspect?.name || 'Bilinmeyen Fail',
      motiveExplanation: motiveExplanation.trim(),
      evidenceLinks: selectedEvidence.length > 0 ? selectedEvidence : [caseFile.evidenceList[0]?.name || 'Adli Delil'],
      deductionNarrative: deductionNarrative.trim(),
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      status: 'İnceleniyor',
      commentsCount: 0
    };

    soundEffects.playDeductionSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    onSubmitAnalysis(newAnalysis);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#12161f] border border-amber-800/60 rounded-xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#181e2b] px-6 py-4 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-900/60 border border-amber-600/50 flex items-center justify-center">
              <Feather className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-amber-200">
                Dedüksiyon Analizi Yayınla
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                {caseFile.title} [{caseFile.caseNumber}]
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-lg text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Author info note */}
          <div className="p-3 bg-[#0c0f14] rounded-lg border border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400">Raporlayan Dedektif:</span>
            <div className="flex items-center gap-2 font-serif text-amber-300 font-bold">
              <span>{profile.name}</span>
              <span className="text-stone-500 font-normal">·</span>
              <span className="text-amber-500 font-mono text-[11px] font-normal">{profile.title}</span>
            </div>
          </div>

          {/* Theory Title */}
          <div>
            <label className="block text-xs font-serif font-bold text-amber-300 mb-1.5">
              Teori / Çözüm Hipotezi Başlığı *
            </label>
            <input
              type="text"
              value={theoryTitle}
              onChange={(e) => setTheoryTitle(e.target.value)}
              placeholder="Örn: 03:45 Kaçış Hattı ve Montague Druitt Cerrahi Bağlantısı"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500 placeholder:text-stone-600 font-serif"
            />
          </div>

          {/* Prime Suspect Selector */}
          <div>
            <label className="block text-xs font-serif font-bold text-amber-300 mb-1.5">
              Baş Fail Hipotezi *
            </label>
            <select
              value={primeSuspectId}
              onChange={(e) => setPrimeSuspectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500 font-serif"
            >
              {caseFile.suspects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.profession} - {s.alias || 'Şüpheli'})
                </option>
              ))}
            </select>
          </div>

          {/* Motive & Opportunity */}
          <div>
            <label className="block text-xs font-serif font-bold text-amber-300 mb-1.5">
              Motivasyon & Fırsat Analizi *
            </label>
            <textarea
              rows={2}
              value={motiveExplanation}
              onChange={(e) => setMotiveExplanation(e.target.value)}
              placeholder="Failin kurbanı hedef alma sebebi, cinayet anındaki hareket serbestisi ve psikolojik durumu..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs focus:outline-none focus:border-amber-500 placeholder:text-stone-600 leading-relaxed font-serif"
            />
          </div>

          {/* Evidence Checkboxes */}
          <div>
            <label className="block text-xs font-serif font-bold text-amber-300 mb-2">
              Teoriyi Destekleyen 360° Deliller & İpuçları
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseFile.evidenceList.map((ev) => {
                const isSelected = selectedEvidence.includes(ev.name);
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => toggleEvidence(ev.name)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                        : 'bg-[#0a0d12] border-stone-800 text-stone-400 hover:border-amber-900'
                    }`}
                  >
                    <span className="font-serif truncate mr-2">{ev.name}</span>
                    <span className="text-[10px] font-mono text-amber-500 shrink-0">
                      {isSelected ? '✓ SEÇİLDİ' : '+ EKLE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step by step Sherlock Deduction */}
          <div>
            <label className="block text-xs font-serif font-bold text-amber-300 mb-1.5 flex items-center justify-between">
              <span>Zihin Sarayı Dedüksiyon Adımları (Holmes Yöntemi) *</span>
              <span className="text-[10px] text-amber-500 font-mono">+100 Dedektif XP</span>
            </label>
            <textarea
              rows={4}
              value={deductionNarrative}
              onChange={(e) => setDeductionNarrative(e.target.value)}
              placeholder="Adım adım mantıksal çıkarımınız: Olay yeri saatinden elde edilen ipucu, adli otopsi kesikleri, şüphelinin yalanladığı detaylar..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs focus:outline-none focus:border-amber-500 placeholder:text-stone-600 leading-relaxed font-serif"
            />
          </div>

          {/* Submit footer */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-serif text-stone-400 hover:text-stone-200"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-amber-50 font-serif font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Analizi Dosyaya Ekle & Yayınla</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
