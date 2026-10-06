import React, { useState } from 'react';
import { DetectiveBadge, DetectiveProfile, SolutionAnalysis } from '../types/detective';
import {
  User,
  Award,
  Shield,
  Eye,
  Compass,
  Edit3,
  Check,
  Trash2,
  ThumbsUp,
  Bookmark,
  Sparkles,
  Feather,
  Clock,
  ExternalLink
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ProfileViewProps {
  profile: DetectiveProfile;
  onUpdateProfile: (updated: Partial<DetectiveProfile>) => void;
  userAnalyses: SolutionAnalysis[];
  onDeleteAnalysis: (id: string) => void;
  onOpenCaseById: (caseId: string) => void;
}

const AVATAR_OPTIONS = [
  { id: 'PocketWatch', label: 'Vintage Cep Saati', icon: '⏱️' },
  { id: 'Pipe', label: 'Sherlock Piposu', icon: '🪶' },
  { id: 'Magnifier', label: 'Adli Büyüteç', icon: '🔍' },
  { id: 'Key', label: 'Kripto Anahtarı', icon: '🗝️' },
  { id: 'Crown', label: 'Onur Tacı', icon: '👑' },
  { id: 'Shield', label: 'Scotland Yard Rozeti', icon: '🛡️' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  userAnalyses,
  onDeleteAnalysis,
  onOpenCaseById
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(profile.name);
  const [titleInput, setTitleInput] = useState<string>(profile.title);
  const [mottoInput, setMottoInput] = useState<string>(profile.mindPalaceMotto);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(profile.avatarIcon);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onUpdateProfile({
      name: nameInput.trim(),
      title: titleInput.trim() || 'Danışman Dedektif',
      mindPalaceMotto: mottoInput.trim(),
      avatarIcon: selectedAvatar
    });
    setIsEditing(false);
    soundEffects.playClick();
  };

  const nextLevelXp = (profile.rankLevel + 1) * 1200;
  const currentLevelBaseXp = profile.rankLevel * 1200;
  const progressPercent = Math.min(
    100,
    Math.max(0, ((profile.score - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Profile Card & Scotland Yard Credential */}
      <div className="bg-[#12161f] border border-amber-900/40 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-radial from-[#1e2738] via-[#141a24] to-[#0c0f14] p-6 sm:p-8 border-b border-amber-900/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Avatar & Identifiers */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 border-2 border-amber-500/80 shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center justify-center text-3xl font-serif font-black text-amber-100">
                  {AVATAR_OPTIONS.find((a) => a.id === profile.avatarIcon)?.icon || '🔍'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-black/90 border border-amber-600 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300">
                  Lv.{profile.rankLevel}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7]">
                    {profile.name}
                  </h1>
                  <span className="text-xs font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded">
                    {profile.rank}
                  </span>
                </div>
                <p className="text-xs font-serif text-stone-400 mt-1 italic">
                  "{profile.mindPalaceMotto}"
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mt-2">
                  <span className="text-amber-400 font-bold">{profile.title}</span>
                  <span className="text-stone-600">·</span>
                  <span>Sicil: 221B-{Math.abs(profile.name.length * 137).toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsEditing(!isEditing);
                }}
                className="px-4 py-2 rounded-lg bg-[#181f2c] border border-amber-700/50 hover:border-amber-500 text-amber-200 text-xs font-serif font-bold flex items-center gap-2 transition-colors shadow"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEditing ? 'Düzenlemeyi İptal Et' : 'Dedektif Kimliğini Düzenle'}</span>
              </button>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6 pt-5 border-t border-stone-800/80">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-stone-300">
                Dedektif Seviyesi: <span className="text-amber-400 font-bold">Kademe {profile.rankLevel}</span>
              </span>
              <span className="text-amber-400 font-bold">
                {profile.score} XP / {nextLevelXp} XP (Sonraki Rütbeye %{Math.round(progressPercent)})
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Inline Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-6 bg-[#0e1218] border-b border-amber-900/30 space-y-4">
            <h3 className="text-sm font-serif font-bold text-amber-300">Dedektif Bilgilerini Güncelle</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  Dedektif Adı / Mahlas *
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#07090d] border border-amber-900/50 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  Unvan & Uzmanlık Alanı
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#07090d] border border-amber-900/50 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-stone-300 mb-1">
                Zihin Sarayı Felsefesi (Dedüksiyon Mottosu)
              </label>
              <input
                type="text"
                value={mottoInput}
                onChange={(e) => setMottoInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#07090d] border border-amber-900/50 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-serif text-stone-300 mb-2">
                Dedektif Rozeti / Sembolü
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAvatar(opt.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-serif flex items-center gap-1.5 transition-colors ${
                      selectedAvatar === opt.id
                        ? 'bg-amber-900/70 border-amber-500 text-amber-200'
                        : 'bg-[#12161f] border-stone-800 text-stone-400 hover:border-amber-900'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200 font-serif"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-900 font-serif font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Kaydet</span>
              </button>
            </div>
          </form>
        )}

        {/* Profile Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-800/80 bg-[#0e1218] p-4 sm:p-6 text-center">
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-amber-300">{profile.score}</div>
            <div className="text-xs font-mono text-stone-400 mt-0.5">Toplam Dedektif Puanı</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-amber-300">{userAnalyses.length}</div>
            <div className="text-xs font-mono text-stone-400 mt-0.5">Yayınlanan Çözüm Analizi</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-amber-300">{profile.evidencesExaminedCount}</div>
            <div className="text-xs font-mono text-stone-400 mt-0.5">İncelenen Adli Kanıt</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-amber-300">{profile.upvotesReceived}</div>
            <div className="text-xs font-mono text-stone-400 mt-0.5">Topluluk Takdir Oyu</div>
          </div>
        </div>
      </div>

      {/* Badges Ribbon */}
      <div className="bg-[#12161f] border border-amber-900/30 rounded-xl p-6">
        <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Kazanılan Dedektif Rozetleri & Nişanlar</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {profile.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
                badge.unlocked
                  ? 'bg-[#151c27] border-amber-800/60 text-stone-200'
                  : 'bg-[#0d1016] border-stone-800/50 text-stone-500 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-base ${
                  badge.unlocked
                    ? 'bg-amber-950/80 border border-amber-600/60 text-amber-300 shadow'
                    : 'bg-stone-900 text-stone-600 border border-stone-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-amber-200">
                  {badge.title}
                </div>
                <p className="text-[11px] text-stone-400 font-serif leading-snug mt-0.5">
                  {badge.description}
                </p>
                {badge.unlocked && badge.unlockedAt && (
                  <span className="text-[10px] font-mono text-amber-500/80 mt-1 block">
                    Kazanıldı: {badge.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User's Submitted Solution Analyses */}
      <div className="bg-[#12161f] border border-amber-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Yaptığım Çözüm Analizleri ({userAnalyses.length})</span>
            </h3>
            <p className="text-xs text-stone-400 font-serif mt-0.5">
              Gerçek suç dosyaları için sunduğunuz mantıksal hipotezler ve topluluk değerlendirmeleri.
            </p>
          </div>
        </div>

        {userAnalyses.length === 0 ? (
          <div className="text-center py-10 bg-[#0d1017] rounded-lg border border-stone-800 p-6">
            <Compass className="w-10 h-10 text-stone-600 mx-auto mb-2" />
            <h4 className="text-sm font-serif text-stone-300">
              Henüz Bir Çözüm Analizi Yayınlamadınız
            </h4>
            <p className="text-xs text-stone-400 font-serif mt-1">
              Herhangi bir vaka dosyasını açıp "Kendi Analizini Yaz" butonuna tıklayarak ilk dedüksiyonunuzu yayınlayabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-[#151c27] border border-stone-800 hover:border-amber-800/60 rounded-xl p-5 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() => onOpenCaseById(analysis.caseId)}
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>Vaka: {analysis.caseTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-500">
                        {analysis.createdAt}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300">
                        {analysis.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#f5ebd7] mb-2">
                    {analysis.theoryTitle}
                  </h4>

                  <div className="p-3 bg-[#0d1117] rounded-lg border border-stone-800 text-xs mb-3 space-y-1">
                    <div>
                      <span className="text-amber-400 font-bold">Hedef Şüpheli: </span>
                      <span className="text-stone-200">{analysis.primeSuspectName}</span>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold">Motivasyon Çıkarımı: </span>
                      <span className="text-stone-300 font-serif">{analysis.motiveExplanation}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 font-serif leading-relaxed whitespace-pre-line mb-3 line-clamp-4">
                    {analysis.deductionNarrative}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-[11px] font-mono text-stone-500">Kullanılan Kanıtlar:</span>
                    {analysis.evidenceLinks.map((ev, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-serif bg-stone-900 border border-stone-800 text-amber-300/80 px-2 py-0.5 rounded"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-emerald-300 font-bold">{analysis.upvotes} Destek Oyu</span>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onDeleteAnalysis(analysis.id);
                    }}
                    className="p-1.5 rounded text-stone-500 hover:text-red-400 hover:bg-stone-800 transition-colors"
                    title="Analizi Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
