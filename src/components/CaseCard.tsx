import React from 'react';
import { CaseFile } from '../types/detective';
import {
  FolderOpen,
  Calendar,
  MapPin,
  Users,
  Eye,
  FileText,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CaseCardProps {
  caseFile: CaseFile;
  onOpenCase: (caseFile: CaseFile) => void;
  isSaved: boolean;
  onToggleSave: (caseId: string) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseFile,
  onOpenCase,
  isSaved,
  onToggleSave
}) => {
  const getStatusLabel = () => {
    switch (caseFile.status) {
      case 'unsolved':
        return { text: 'ÇÖZÜLEMEMİŞ DOSYA', color: 'border-red-600/70 text-red-300 bg-red-950/60' };
      case 'cold_case':
        return { text: 'TARİHİ SOĞUK VAKA', color: 'border-blue-600/70 text-blue-300 bg-blue-950/60' };
      case 'reopened':
        return { text: 'YENİDEN AÇILDI', color: 'border-amber-600/70 text-amber-300 bg-amber-950/60' };
      default:
        return { text: 'AKTİF SORUŞTURMA', color: 'border-stone-600/70 text-stone-300 bg-stone-900/60' };
    }
  };

  const status = getStatusLabel();

  return (
    <div className="group relative bg-[#131720] hover:bg-[#161c27] border border-amber-900/30 hover:border-amber-700/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Dossier Header Strip */}
      <div className="bg-[#181e2a] px-4 py-2.5 border-b border-amber-900/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-amber-400">
            {caseFile.caseNumber}
          </span>
          <span className="text-stone-600">·</span>
          <span className="text-[11px] font-serif text-stone-400">
            {caseFile.era}
          </span>
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEffects.playClick();
            onToggleSave(caseFile.id);
          }}
          className={`p-1.5 rounded transition-colors ${
            isSaved
              ? 'text-amber-400 hover:text-amber-300'
              : 'text-stone-500 hover:text-stone-300'
          }`}
          title={isSaved ? 'Kayıtlı Dosyalardan Çıkar' : 'Zihin Sarayıma Kaydet'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Status Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border ${status.color}`}
            >
              {status.text}
            </span>
            <span className="text-xs font-serif text-stone-400 italic">
              {caseFile.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-[#f5ebd7] group-hover:text-amber-200 transition-colors leading-snug mb-1">
            {caseFile.title}
          </h3>

          <p className="text-xs font-serif text-amber-500/80 mb-3 italic">
            {caseFile.subtitle}
          </p>

          {/* Summary */}
          <p className="text-xs text-stone-300 font-serif line-clamp-3 leading-relaxed mb-4">
            {caseFile.summary}
          </p>
        </div>

        {/* Meta Stats Row */}
        <div>
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 font-mono pt-3 border-t border-stone-800/80 mb-4">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{caseFile.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Yıl: {caseFile.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{caseFile.suspects.length} Baş Şüpheli</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{caseFile.evidenceList.length} Adli Kanıt</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCase(caseFile);
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-700/60 text-amber-100 font-serif text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group-hover:border-amber-500"
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span>Dosyayı Aç & İncele</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
