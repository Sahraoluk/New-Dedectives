import React from 'react';
import { DetectiveProfile, LeaderboardUser } from '../types/detective';
import { Award, Crown, Trophy, Sparkles, CheckCircle2, Star, Zap, Shield } from 'lucide-react';

interface LeaderboardViewProps {
  leaderboard: LeaderboardUser[];
  profile: DetectiveProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboard,
  profile
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#12161f] border border-amber-900/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded">
              Kişisel Skor & Rütbeler
            </span>
            <span className="text-stone-500 text-xs">·</span>
            <span className="text-xs text-stone-400 font-serif">221B Baker Street Liderlik Kürsüsü</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7]">
            Dedektif Puan Tablosu
          </h1>
          <p className="text-xs text-stone-300 font-serif max-w-2xl mt-1 leading-relaxed">
            360° kanıt incelemeleri, dedüksiyon analizleri ve topluluk oylamalarıyla kazanılan puanlar ve küresel dedektif sıralaması.
          </p>
        </div>

        {/* Current user badge teaser */}
        <div className="bg-[#181f2b] p-4 rounded-xl border border-amber-700/50 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500 flex items-center justify-center font-serif text-xl font-bold text-amber-200">
            #{leaderboard.find((u) => u.name === profile.name)?.rankPosition || 4}
          </div>
          <div>
            <div className="text-xs text-stone-400 font-mono">Mevcut Sıralamanız:</div>
            <div className="text-base font-serif font-bold text-amber-300">{profile.score} Dedektif XP</div>
          </div>
        </div>
      </div>

      {/* Grid: Personal Points Breakdown vs Leaderboard Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Personal Points Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141922] border border-amber-900/30 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Kişisel Puan Dökümü</span>
            </h3>

            <div className="space-y-2.5 text-xs font-serif">
              <div className="p-3 bg-[#0d1017] rounded-lg border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Adli Kanıt İncelemeleri</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {profile.evidencesExaminedCount} delil raporu okundu (Her biri +25 XP)
                  </div>
                </div>
                <div className="font-mono text-amber-400 font-bold">
                  +{profile.evidencesExaminedCount * 25} XP
                </div>
              </div>

              <div className="p-3 bg-[#0d1017] rounded-lg border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Yayınlanan Çözüm Analizleri</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {profile.solvedAnalysesCount} hipotez raporlandı (Her biri +100 XP)
                  </div>
                </div>
                <div className="font-mono text-amber-400 font-bold">
                  +{profile.solvedAnalysesCount * 100} XP
                </div>
              </div>

              <div className="p-3 bg-[#0d1017] rounded-lg border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Topluluk Takdir Oyları</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {profile.upvotesReceived} destek oyu alındı (Her biri +10 XP)
                  </div>
                </div>
                <div className="font-mono text-amber-400 font-bold">
                  +{profile.upvotesReceived * 10} XP
                </div>
              </div>

              <div className="p-3 bg-[#0d1017] rounded-lg border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Olay Yeri & Baker Street Keşifleri</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    Kripto ve gizli UV katmanı keşif bonusları
                  </div>
                </div>
                <div className="font-mono text-amber-400 font-bold">
                  +450 XP
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between font-serif">
              <span className="text-xs text-stone-300 font-bold">TOPLAM SKOR:</span>
              <span className="text-lg font-mono font-bold text-amber-300">{profile.score} XP</span>
            </div>
          </div>

          {/* How to earn points */}
          <div className="bg-[#12161f] border border-stone-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nasıl Daha Fazla XP Kazanılır?</span>
            </h4>
            <ul className="text-xs text-stone-300 font-serif space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono font-bold">+25 XP:</span>
                <span>Adli Kanıtlar bölümünde bir delil raporunu inceleyip "Zihin Sarayıma Kaydet"e basmak.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono font-bold">+100 XP:</span>
                <span>Herhangi bir soğuk vaka dosyası için mantıksal çözüm analizi yayınlamak.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono font-bold">+10 XP:</span>
                <span>Teorinizin veya forum yanıtınızın diğer dedektiflerden takdir oyu alması.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono font-bold">+50 XP:</span>
                <span>Tartışma forumunda yeni bir vaka hipotezi veya balistik sorusu açmak.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Global Leaderboard Table */}
        <div className="lg:col-span-7 bg-[#141922] border border-amber-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Küresel Dedektif Liderlik Sıralaması</span>
              </h3>
              <p className="text-xs text-stone-400 font-serif mt-0.5">
                Scotland Yard ve uluslararası kriminoloji analistleri sıralaması.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((user) => {
              const isCurrent = user.name === profile.name || user.isCurrentUser;

              return (
                <div
                  key={user.rankPosition}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                    isCurrent
                      ? 'bg-amber-950/50 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-[#0f1218] border-stone-800 hover:border-amber-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm shrink-0 ${
                        user.rankPosition === 1
                          ? 'bg-amber-500 text-stone-900 shadow-lg'
                          : user.rankPosition === 2
                          ? 'bg-slate-300 text-stone-900 shadow'
                          : user.rankPosition === 3
                          ? 'bg-amber-800 text-amber-100 shadow'
                          : 'bg-stone-900 text-stone-400 border border-stone-800'
                      }`}
                    >
                      {user.rankPosition}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif font-bold text-[#f5ebd7]">
                          {user.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono bg-amber-600 text-stone-950 px-1.5 py-0.2 rounded font-bold">
                            SİZ
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-stone-400">
                        {user.title} · {user.analysesCount} Analiz · Başarı: {user.accuracyRate}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-amber-300">
                      {isCurrent ? profile.score : user.score} XP
                    </div>
                    <div className="text-[10px] font-serif text-stone-500">Dedektif Puanı</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
