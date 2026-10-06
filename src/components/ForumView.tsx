import React, { useState } from 'react';
import { CaseFile, DetectiveProfile, ForumComment, ForumTopic } from '../types/detective';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  PlusCircle,
  Search,
  Filter,
  Send,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Compass
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ForumViewProps {
  topics: ForumTopic[];
  profile: DetectiveProfile;
  cases: CaseFile[];
  onVoteTopic: (topicId: string, type: 'up' | 'down') => void;
  onAddTopic: (topic: ForumTopic) => void;
  onAddComment: (topicId: string, comment: ForumComment) => void;
  onOpenCaseById: (caseId: string) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({
  topics,
  profile,
  cases,
  onVoteTopic,
  onAddTopic,
  onAddComment,
  onOpenCaseById
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(topics[0]?.id || null);
  const [replyText, setReplyText] = useState<{ [topicId: string]: string }>({});
  const [isNewTopicOpen, setIsNewTopicOpen] = useState<boolean>(false);

  // New topic state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumTopic['category']>('Vaka Hipotezi');
  const [newCaseId, setNewCaseId] = useState<string>(cases[0]?.id || '');
  const [formError, setFormError] = useState('');

  const filteredTopics = topics.filter((t) => {
    const matchesCat = selectedCategory === 'Tümü' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.caseTitle && t.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Lütfen tartışma başlığını girin.');
      return;
    }
    if (!newContent.trim()) {
      setFormError('Lütfen hipotezinizin detaylarını yazın.');
      return;
    }

    const matchedCase = cases.find((c) => c.id === newCaseId);

    const topic: ForumTopic = {
      id: `topic-${Date.now()}`,
      caseId: newCaseId,
      caseTitle: matchedCase?.title,
      title: newTitle.trim(),
      authorName: profile.name,
      authorRank: profile.title,
      authorBadge: profile.avatarIcon,
      createdAt: 'Az önce',
      category: newCategory,
      content: newContent.trim(),
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      comments: []
    };

    soundEffects.playDeductionSuccess();
    onAddTopic(topic);
    setIsNewTopicOpen(false);
    setNewTitle('');
    setNewContent('');
    setFormError('');
    setExpandedTopicId(topic.id);
  };

  const handleSendReply = (topicId: string) => {
    const text = replyText[topicId]?.trim();
    if (!text) return;

    const comment: ForumComment = {
      id: `comment-${Date.now()}`,
      authorName: profile.name,
      authorRank: profile.title,
      authorBadge: profile.avatarIcon,
      content: text,
      createdAt: 'Az önce',
      upvotes: 0
    };

    soundEffects.playClick();
    onAddComment(topicId, comment);
    setReplyText((prev) => ({ ...prev, [topicId]: '' }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-[#12161f] border border-amber-900/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded">
              Baker Street Meclisi
            </span>
            <span className="text-stone-500 text-xs">·</span>
            <span className="text-xs text-stone-400 font-serif">Topluluk Münazara & Oylama</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7]">
            Dedektifler Kulübü Tartışma Forumu
          </h1>
          <p className="text-xs text-stone-300 font-serif max-w-2xl mt-1 leading-relaxed">
            Şüpheliler, 360° kanıt bulguları ve adli tıp çelişkileri üzerine dedüksiyonlarınızı paylaşın; diğer dedektiflerin teorilerini oylayın.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            setIsNewTopicOpen(true);
          }}
          className="px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-amber-50 font-serif font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-200" />
          <span>Yeni Tartışma Başlığı Aç</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141922] p-3 rounded-xl border border-stone-800">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar text-xs font-serif">
          {['Tümü', 'Vaka Hipotezi', 'Adli Tıp & Balistik', '360° Kanıt Keşfi', 'Genel Teori'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-900/60 border border-amber-600/60 text-amber-200 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Başlık veya vaka ara..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0e1217] border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-600"
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className="bg-[#131721] border border-stone-800 hover:border-amber-900/50 rounded-xl overflow-hidden transition-colors"
            >
              {/* Topic Header & Body */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-900/70 border border-amber-600/50 flex items-center justify-center font-serif text-xs font-bold text-amber-200">
                      {topic.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-serif font-bold text-amber-200">
                        {topic.authorName}
                      </span>
                      <span className="text-stone-500 text-xs ml-2">·</span>
                      <span className="text-[11px] font-mono text-amber-500 ml-2">
                        {topic.authorRank}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-stone-900 border border-stone-800 text-stone-400 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      {topic.createdAt}
                    </span>
                  </div>
                </div>

                {/* Case Link if exists */}
                {topic.caseTitle && (
                  <button
                    onClick={() => topic.caseId && onOpenCaseById(topic.caseId)}
                    className="text-xs font-mono text-amber-400/90 hover:text-amber-300 font-bold mb-1.5 block"
                  >
                    Vaka: {topic.caseTitle} →
                  </button>
                )}

                <h3 className="text-base sm:text-lg font-serif font-bold text-[#f5ebd7] mb-2 leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed whitespace-pre-line mb-4">
                  {topic.content}
                </p>

                {/* Voting & Discussion Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVoteTopic(topic.id, 'up')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        topic.userVote === 'up'
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold'
                          : 'bg-[#0d1017] border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                      title="Teoriyi Destekle"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{topic.upvotes}</span>
                    </button>

                    <button
                      onClick={() => onVoteTopic(topic.id, 'down')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        topic.userVote === 'down'
                          ? 'bg-red-950 border-red-600 text-red-300 font-bold'
                          : 'bg-[#0d1017] border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                      title="Teoriyi Çürüt"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>{topic.downvotes}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setExpandedTopicId(isExpanded ? null : topic.id);
                    }}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-amber-300 font-serif transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>{topic.comments.length} Yanıt</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Comments Section */}
              {isExpanded && (
                <div className="bg-[#0e1218] p-5 sm:p-6 border-t border-stone-800/80 space-y-4">
                  <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
                    Dedektif Yanıtları & Karşı Kanıtlar ({topic.comments.length})
                  </h4>

                  {topic.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3.5 bg-[#141922] rounded-lg border border-stone-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-serif">
                          <span className="font-bold text-amber-200">{comment.authorName}</span>
                          <span className="text-stone-500">·</span>
                          <span className="text-stone-400 font-mono text-[11px]">{comment.authorRank}</span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-stone-300 font-serif leading-relaxed">{comment.content}</p>
                    </div>
                  ))}

                  {/* Add Reply Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={replyText[topic.id] || ''}
                      onChange={(e) =>
                        setReplyText((prev) => ({ ...prev, [topic.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendReply(topic.id);
                      }}
                      placeholder="Dedüksiyonunuzu veya karşı delilinizi yazın..."
                      className="flex-1 px-3.5 py-2 rounded-lg bg-[#080a0f] border border-amber-900/40 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleSendReply(topic.id)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Yanıtla</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Topic Modal */}
      {isNewTopicOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12161f] border border-amber-800/60 rounded-xl shadow-2xl max-w-xl w-full my-8 overflow-hidden animate-in fade-in duration-150">
            <div className="bg-[#181e2b] px-6 py-4 border-b border-amber-900/40 flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-amber-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Yeni Tartışma Konusu Aç</span>
              </h3>
              <button
                onClick={() => setIsNewTopicOpen(false)}
                className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1 rounded bg-stone-800"
              >
                Kapat
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-lg text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Case Link */}
              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  İlgili Vaka Dosyası (İsteğe Bağlı)
                </label>
                <select
                  value={newCaseId}
                  onChange={(e) => setNewCaseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs font-serif"
                >
                  <option value="">Genel Kriminoloji / Bağımsız Konu</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  Kategori *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForumTopic['category'])}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs font-serif"
                >
                  <option value="Vaka Hipotezi">Vaka Hipotezi</option>
                  <option value="Adli Tıp & Balistik">Adli Tıp & Balistik</option>
                  <option value="360° Kanıt Keşfi">360° Kanıt Keşfi</option>
                  <option value="Genel Teori">Genel Teori</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  Tartışma Başlığı *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: 9mm kovan üzerindeki iğne izi neyi kanıtlıyor?"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-serif text-stone-300 mb-1">
                  Tartışma Metni / Çıkarım Detayı *
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detaylı düşüncelerinizi, şüphelerinizi ve topluluğa sormak istediğiniz soruları buraya yazın..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0d12] border border-amber-900/50 text-stone-200 text-xs font-serif focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTopicOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 font-serif"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 hover:bg-amber-600 text-amber-50 font-serif font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Başlığı Yayınla</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
