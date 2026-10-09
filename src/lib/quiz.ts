import type { Difficulty, Question } from "@/data/quizzes";

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface ReviewItem {
  question: string;
  options: string[];
  correct: number;
  selected: number | null;
}

export interface QuizResult {
  categoryId: string;
  categoryName: string;
  difficulty: Difficulty;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
  timeTaken: number;
  timedOut: boolean;
  review: ReviewItem[];
  completedAt: string;
}

export function scoreQuiz(questions: Question[], answers: (number | null)[]) {
  let correct = 0, unanswered = 0;
  questions.forEach((q, i) => {
    if (answers[i] == null) unanswered++;
    else if (answers[i] === q.answer) correct++;
  });
  const total = questions.length;
  return {
    total,
    correct,
    unanswered,
    incorrect: total - correct - unanswered,
    percentage: total ? Math.round((correct / total) * 100) : 0,
  };
}

export function feedback(pct: number) {
  if (pct >= 90) return { title: "Outstanding!", text: "You've mastered this topic. Try a harder level next." };
  if (pct >= 70) return { title: "Great job!", text: "Strong understanding — review the few you missed." };
  if (pct >= 50) return { title: "Good effort", text: "You're on the right track. A little more practice will help." };
  return { title: "Keep practising", text: "Review the answers below and give it another go." };
}

export const RESULT_KEY = "quiznova:lastResult";
export const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
