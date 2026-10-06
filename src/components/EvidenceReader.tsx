import React, { useState } from 'react';
import { EvidenceItem } from '../types/detective';
import {
  FileText,
  ShieldAlert,
  Search,
  CheckCircle2,
  Compass,
  Lightbulb,
  AlertTriangle,
  Clock,
  MapPin,
  Sparkles,
  BookOpen,
  BookmarkCheck,
  Eye,
  Microscope,
  FileCheck
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface EvidenceReaderProps {
  evidence: EvidenceItem;
  onEvidenceExamined?: (evidenceId: string) => void;
}

export const EvidenceReader: React.FC<EvidenceReaderProps> = ({
  evidence,
  onEvidenceExamined
}) => {
  const [examinedClaimed, setExaminedClaimed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'physical' | 'lab' | 'transcription'>('all');

  const handleClaim = () => {
    if (!examinedClaimed) {
      setExaminedClaimed(true);
      soundEffects.playDeductionSuccess();
      if (onEvidenceExamined) {
        onEvidenceExamined(evidence.id);
      }
    }
  };

  return (
    <div className="bg-[#12161f] border border-amber-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Dossier Header Strip */}
      <div className="bg-[#181e2b] px-5 py-4 border-b border-amber-900/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/60 flex items-center justify-center font-mono font-bold text-amber-300 text-xs shadow">
            {evidence.code.split('-')[1] || 'EVD'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                {evidence.code}
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-xs font-mono text-stone-400">{evidence.category}</span>
              <span className="text-stone-500">·</span>
              <span className="text-xs font-mono text-amber-500">{evidence.dateFound}</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f5ebd7] leading-tight">
              {evidence.name}
            </h3>
          </div>
        </div>

        {/* Claim / Save Action Button */}
        <button
          onClick={handleClaim}
          disabled={examinedClaimed}
          className={`px-4 py-2 rounded-lg font-serif text-xs font-bold transition-all flex items-center gap-2 ${
            examinedClaimed
              ? 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 cursor-default'
              : 'bg-amber-700 hover:bg-amber-600 text-amber-50 shadow-md hover:shadow-amber-900/30 active:scale-95'
          }`}
        >
          {examinedClaimed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zihin Sarayına Kaydedildi (+25 XP)</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Kanıtı İncele & Notları Kaydet (+25 XP)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Top Meta Details Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#0e1218] p-4 rounded-xl border border-stone-800 font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-stone-400">Bulunduğu Mahal:</span>
            <span className="text-stone-200 font-bold truncate">{evidence.locationFound}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-stone-400">Tutanak Tarihi:</span>
            <span className="text-stone-200 font-bold">{evidence.dateFound}</span>
          </div>
        </div>

        {/* SECTION 1: Genel Adli Açıklama & Arka Plan */}
        <div className="bg-[#141924] p-5 rounded-xl border border-amber-900/30 space-y-2">
          <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>1. Adli Delil Tanımı & Olay Yeri Arka Planı</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {evidence.description}
          </p>
          <div className="pt-2 text-xs text-stone-400 font-serif italic border-t border-stone-800">
            Tarihsel ve Adli Bağlam: {evidence.historicalContext}
          </div>
        </div>

        {/* SECTION 2: Fiziksel & Mikroskobik Bulgular */}
        <div className="bg-[#141924] p-5 rounded-xl border border-amber-900/30 space-y-3">
          <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Microscope className="w-4 h-4 text-amber-500" />
            <span>2. Fiziksel ve Mikroskobik İnceleme Bulguları</span>
          </h4>

          <div className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {evidence.physicalCondition || (
              <>
                Örnek üzerinde yapılan optik mikroskobik incelemede yüzey aşınma izleri, mekanik darbe çentikleri ve malzeme yoğunluğu kaydedilmiştir.
                {evidence.reverseSideDescription && (
                  <span className="block mt-2 text-stone-200">
                    <strong>Ters / İç Yüzey İncelemesi:</strong> {evidence.reverseSideDescription}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Zoom macro bullet points if present */}
          {evidence.zoomMacroDetails && evidence.zoomMacroDetails.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                Mikroskopik Odak Noktaları:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {evidence.zoomMacroDetails.map((macro, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#0d1017] rounded-lg border border-stone-800 text-xs font-serif"
                  >
                    <div className="font-bold text-amber-200 mb-0.5">
                      {idx + 1}. {macro.title}
                    </div>
                    <div className="text-stone-400 leading-snug">{macro.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Laboratuvar, Spektrografi & Kimyasal Analiz */}
        <div className="bg-[#141924] p-5 rounded-xl border border-amber-900/30 space-y-2">
          <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-amber-500" />
            <span>3. Adli Laboratuvar, Kimyasal & Balistik Analiz Raporu</span>
          </h4>
          <div className="bg-[#0c0f16] p-4 rounded-lg border border-stone-800 font-mono text-xs text-stone-300 leading-relaxed whitespace-pre-line">
            {evidence.laboratoryReport || (
              evidence.uvSecretText ? (
                <>
                  [SPEKTROSKOPİ & ADLİ TESPİT RAPORU]
                  {'\n'}• Kimyasal ve Optik Reaksiyon: {evidence.uvSecretText}
                  {'\n'}• Adli Lamba Gözlemi: {evidence.uvDescription || 'Fosforlu ve floresan dalga boyunda latent izler tespit edilmiştir.'}
                </>
              ) : (
                'Laboratuvar spektroskopisi ve balistik incelemesinde materyal alaşımı, aşınma çizgileri ve mikrometre ölçümleri standart suç kaydıyla uyumlu bulunmuştur.'
              )
            )}
          </div>
        </div>

        {/* SECTION 4: Transkripsiyon & Metin / Gravür Okuması (Varsa) */}
        {(evidence.transcribedText || evidence.hiddenInscription) && (
          <div className="bg-[#181315] p-5 rounded-xl border border-red-900/40 space-y-2">
            <h4 className="text-xs font-serif font-bold text-red-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" />
              <span>4. Belge Transkripsiyonu & Gizli Gravür Metni</span>
            </h4>
            <div className="bg-[#0f0c0e] p-4 rounded-lg border border-red-950 font-mono text-xs text-red-200 leading-relaxed">
              {evidence.transcribedText || evidence.hiddenInscription}
            </div>
          </div>
        )}

        {/* SECTION 5: Adli Çelişki / Fail İpucu */}
        <div className="bg-[#181512] p-5 rounded-xl border border-amber-700/50 space-y-2">
          <h4 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>5. Adli Anomaliler & Kritik Çelişkiler</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {evidence.forensicContradiction || (
              'Delil üzerindeki aşınma ve zamanlama parametreleri, görgü tanıklarının ifadeleri ile adli tıp hekiminin otopsi bulguları arasında doğrudan bir zaman veya mekan çelişkisi oluşturmaktadır.'
            )}
          </p>
        </div>

        {/* SECTION 6: Sherlock Holmes'un Dedüksiyon Notu */}
        <div className="bg-[#1c1813] p-5 sm:p-6 rounded-xl border border-amber-600/50 relative shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-serif font-bold text-amber-200 uppercase tracking-wider">
              Sherlock Holmes'un Dedüksiyon Notu
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 font-serif italic leading-relaxed">
            "{evidence.sherlockNote}"
          </p>
        </div>
      </div>
    </div>
  );
};
