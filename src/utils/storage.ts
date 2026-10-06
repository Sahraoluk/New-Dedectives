import { DetectiveProfile, ForumTopic, LeaderboardUser, SolutionAnalysis } from '../types/detective';
import { INITIAL_BADGES, INITIAL_ANALYSES, INITIAL_TOPICS, INITIAL_LEADERBOARD } from '../data/mockForum';

const PROFILE_KEY = 'new_detectives_profile_v1';
const ANALYSES_KEY = 'new_detectives_analyses_v1';
const FORUM_KEY = 'new_detectives_forum_v1';
const LEADERBOARD_KEY = 'new_detectives_leaderboard_v1';

export const DEFAULT_PROFILE: DetectiveProfile = {
  name: 'Dedektif Sahra',
  title: 'Kıdemli Dedektif Danışmanı',
  rank: 'Baker Street Özel Danışmanı',
  rankLevel: 4,
  avatarIcon: 'PocketWatch',
  mindPalaceMotto: 'İmkansızı elediğinde, geriye kalan ne kadar olasılıksız olursa olsun, gerçektir.',
  score: 4350,
  solvedAnalysesCount: 14,
  evidencesExaminedCount: 28,
  upvotesReceived: 184,
  savedCaseIds: ['jack-the-ripper', 'zodiac-killer'],
  badges: INITIAL_BADGES
};

export const getStoredProfile = (): DetectiveProfile => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading profile from storage', err);
  }
  return DEFAULT_PROFILE;
};

export const saveStoredProfile = (profile: DetectiveProfile): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed saving profile', err);
  }
};

export const getStoredAnalyses = (): SolutionAnalysis[] => {
  if (typeof window === 'undefined') return INITIAL_ANALYSES;
  try {
    const raw = localStorage.getItem(ANALYSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading analyses', err);
  }
  return INITIAL_ANALYSES;
};

export const saveStoredAnalyses = (analyses: SolutionAnalysis[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  } catch (err) {
    console.error('Failed saving analyses', err);
  }
};

export const getStoredForum = (): ForumTopic[] => {
  if (typeof window === 'undefined') return INITIAL_TOPICS;
  try {
    const raw = localStorage.getItem(FORUM_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading forum', err);
  }
  return INITIAL_TOPICS;
};

export const saveStoredForum = (topics: ForumTopic[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FORUM_KEY, JSON.stringify(topics));
  } catch (err) {
    console.error('Failed saving forum', err);
  }
};

export const getStoredLeaderboard = (): LeaderboardUser[] => {
  if (typeof window === 'undefined') return INITIAL_LEADERBOARD;
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading leaderboard', err);
  }
  return INITIAL_LEADERBOARD;
};

export const saveStoredLeaderboard = (board: LeaderboardUser[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
  } catch (err) {
    console.error('Failed saving leaderboard', err);
  }
};
