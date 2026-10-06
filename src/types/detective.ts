export type CaseStatus = 'cold_case' | 'unsolved' | 'reopened' | 'in_investigation';

export type ClueType = 'pocket_watch' | 'cipher_letter' | 'ballistic_casing' | 'poison_vial' | 'crime_scene_360';

export interface EvidenceItem {
  id: string;
  name: string;
  code: string;
  clueType: ClueType;
  category: 'Fiziksel Kanıt' | 'Adli Belge' | 'Balistik' | 'Toksikoloji' | 'Olay Yeri';
  description: string;
  historicalContext: string;
  sherlockNote: string; // Holmes' deduction commentary
  locationFound: string;
  dateFound: string;
  chainOfCustody?: string;
  physicalCondition?: string;
  laboratoryReport?: string;
  transcribedText?: string;
  forensicContradiction?: string;
  hasUvLayer?: boolean;
  uvSecretText?: string;
  uvDescription?: string;
  hiddenInscription?: string;
  reverseSideDescription?: string;
  anglesCount?: number;
  zoomMacroDetails?: {
    x: number;
    y: number;
    title: string;
    description: string;
  }[];
}

export interface Suspect {
  id: string;
  name: string;
  alias?: string;
  profession: string;
  avatarSeed: string;
  ageAtTime: string;
  motive: string;
  alibi: string;
  suspiciousFactors: string[];
  sherlockAssessment: string;
  communitySuspicionVote: number; // percentage
}

export interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  location: string;
  description: string;
  importance: 'critical' | 'high' | 'normal';
}

export interface CaseFile {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  year: number;
  location: string;
  era: 'Viktorya Dönemi (1880-1901)' | '20. Yüzyıl Ortası (1940-1975)' | 'Modern Dönem';
  status: CaseStatus;
  difficulty: 'Orta Düzey' | 'Zorlu Bulmaca' | 'Sherlock Düzeyi';
  victimCount: number;
  victims: string[];
  summary: string;
  narrative: string;
  forensicReport: string;
  coverImageTheme: string;
  timeline: TimelineEvent[];
  suspects: Suspect[];
  evidenceList: EvidenceItem[];
  unsolvedQuestions: string[];
  bannerColor: string;
}

export interface SolutionAnalysis {
  id: string;
  caseId: string;
  caseTitle: string;
  authorDetectiveName: string;
  authorBadge: string;
  authorRank: string;
  createdAt: string;
  theoryTitle: string;
  primeSuspectId: string;
  primeSuspectName: string;
  motiveExplanation: string;
  evidenceLinks: string[]; // names of referenced evidence
  deductionNarrative: string; // the step-by-step Sherlock logic
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  status: 'İnceleniyor' | 'Topluluk Onaylı' | 'Baş Dedektif Seçkisi';
  commentsCount: number;
}

export interface ForumComment {
  id: string;
  authorName: string;
  authorRank: string;
  authorBadge: string;
  content: string;
  createdAt: string;
  upvotes: number;
  userVoted?: boolean;
}

export interface ForumTopic {
  id: string;
  caseId?: string;
  caseTitle?: string;
  title: string;
  authorName: string;
  authorRank: string;
  authorBadge: string;
  createdAt: string;
  content: string;
  category: 'Vaka Hipotezi' | 'Adli Tıp & Balistik' | '360° Kanıt Keşfi' | 'Genel Teori';
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  comments: ForumComment[];
}

export interface DetectiveBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DetectiveProfile {
  name: string;
  title: string;
  rank: string;
  rankLevel: number;
  avatarIcon: string;
  mindPalaceMotto: string;
  score: number;
  solvedAnalysesCount: number;
  evidencesExaminedCount: number;
  upvotesReceived: number;
  savedCaseIds: string[];
  badges: DetectiveBadge[];
}

export interface LeaderboardUser {
  rankPosition: number;
  name: string;
  title: string;
  score: number;
  avatarIcon: string;
  analysesCount: number;
  accuracyRate: string;
  isCurrentUser?: boolean;
}
