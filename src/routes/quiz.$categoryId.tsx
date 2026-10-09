import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Loader2, RotateCcw, Send, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { DIFFICULTIES, getCategory, SECONDS_PER_QUESTION, type Question } from "@/data/quizzes";
import { formatTime, RESULT_KEY, scoreQuiz, shuffle, type QuizResult } from "@/lib/quiz";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/quiz/$categoryId")({
  validateSearch: z.object({ difficulty: z.enum(DIFFICULTIES as [string, ...string[]]).catch("easy").default("easy") }),
  loader: ({ params }) => {
    const c = getCategory(params.categoryId);
    if (!c) throw notFound();
    return { name: c.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} Quiz — QuizNova` : "Quiz — QuizNova" },
      { name: "description", content: "Answer timed multiple-choice questions and see your score instantly." },
      { property: "og:title", content: loaderData ? `${loaderData.name} Quiz — QuizNova` : "Quiz — QuizNova" },
      { property: "og:description", content: "Timed multiple-choice quiz on QuizNova." },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Quiz not found</h1>
      <p className="mt-2 text-muted-foreground">This category doesn't exist.</p>
      <Link to="/categories" className="mt-6 inline-flex rounded-xl bg-gradient-brand px-5 py-2.5 font-semibold text-primary-foreground">Browse categories</Link>
    </div>
  ),
  component: QuizPage,
});

function QuizPage() {
  const { categoryId } = Route.useParams();
  const { difficulty } = Route.useSearch() as { difficulty: "easy" | "medium" | "hard" };
  const [attempt, setAttempt] = useState(0);
  return <QuizRunner key={`${categoryId}-${difficulty}-${attempt}`} categoryId={categoryId} difficulty={difficulty} onRestart={() => setAttempt((a) => a + 1)} />;
}

function QuizRunner({ categoryId, difficulty, onRestart }: { categoryId: string; difficulty: "easy" | "medium" | "hard"; onRestart: () => void }) {
  const category = getCategory(categoryId)!;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);
  const totalTime = useRef(0);

  // Shuffle on the client only, so every new attempt gets a fresh order.
  useEffect(() => {
    const qs = shuffle(category.questions.filter((q) => q.difficulty === difficulty));
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
    totalTime.current = qs.length * SECONDS_PER_QUESTION[difficulty];
    setTimeLeft(totalTime.current);
  }, [category, difficulty]);

  const submit = useCallback((timedOut = false) => {
    if (submittedRef.current || !questions) return; // prevent duplicate submissions
    submittedRef.current = true;
    setSubmitting(true);
    const s = scoreQuiz(questions, answers);
    const result: QuizResult = {
      categoryId, categoryName: category.name, difficulty, ...s, timedOut,
      timeTaken: totalTime.current - timeLeft,
      review: questions.map((q, i) => ({ question: q.question, options: q.options, correct: q.answer, selected: answers[i] ?? null })),
      completedAt: new Date().toISOString(),
    };
    try { localStorage.setItem(RESULT_KEY, JSON.stringify(result)); } catch { /* storage unavailable */ }
    navigate({ to: "/results" });
  }, [questions, answers, categoryId, category.name, difficulty, timeLeft, navigate]);

  useEffect(() => {
    if (!questions || submittedRef.current) return;
    if (timeLeft <= 0) { submit(true); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, questions, submit]);

  if (!questions) {
    return <div className="flex min-h-[60vh] items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Preparing your quiz…</div>;
  }

  const q = questions[index]!;
  const answered = answers.filter((a) => a != null).length;
  const last = index === questions.length - 1;
  const low = timeLeft <= 15;
  const Icon = category.icon;

  const select = (i: number) => setAnswers((a) => a.map((v, k) => (k === index ? i : v)));

  return (
    <section className="mx-auto max-w-3xl px-4 pt-10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground"><Icon className="h-5 w-5" /></span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl">{category.name}</h1>
            <span className="text-xs font-semibold capitalize text-muted-foreground">{difficulty} level</span>
          </div>
        </div>
        <div role="timer" aria-live="polite" className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 font-display font-bold ${low ? "bg-destructive/10 text-destructive animate-pulse" : "bg-secondary text-primary"}`}>
          <Timer className="h-4 w-4" /> {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs font-semibold text-muted-foreground">
          <span>Question {index + 1} of {questions.length}</span>
          <span>{answered} answered</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-brand transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div key={q.id} className="mt-6 rounded-3xl border bg-card p-6 shadow-card animate-rise sm:p-8">
        <h2 className="text-xl font-bold sm:text-2xl">{q.question}</h2>
        <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Answer options">
          {q.options.map((opt, i) => {
            const sel = answers[index] === i;
            return (
              <button key={i} role="radio" aria-checked={sel} onClick={() => select(i)}
                className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all ${sel ? "border-primary bg-secondary" : "border-border hover:border-primary/40 hover:bg-muted"}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${sel ? "bg-gradient-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {questions.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Go to question ${i + 1}`}
            className={`h-9 w-9 rounded-lg text-sm font-bold ${i === index ? "bg-gradient-brand text-primary-foreground" : answers[i] != null ? "bg-secondary text-primary" : "border bg-card text-muted-foreground"}`}>
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:justify-between">
        <button onClick={() => setIndex((i) => i - 1)} disabled={index === 0}
          className="inline-flex items-center justify-center gap-1 rounded-xl border bg-card px-5 py-3 font-semibold disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        {!last ? (
          <button onClick={() => setIndex((i) => i + 1)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-brand px-5 py-3 font-semibold text-primary-foreground sm:order-last">
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={() => setConfirmOpen(true)} disabled={submitting} className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-brand px-5 py-3 font-semibold text-primary-foreground shadow-glow disabled:opacity-50 sm:order-last">
            <Send className="h-4 w-4" /> Submit Quiz
          </button>
        )}
        <div className="col-span-2 flex gap-3 sm:col-span-1">
          <button onClick={onRestart} className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
          {!last && (
            <button onClick={() => setConfirmOpen(true)} disabled={submitting} className="flex-1 rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary disabled:opacity-50">
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              {answered < questions.length
                ? `You have answered ${answered} of ${questions.length} questions. Unanswered questions will be marked incorrect.`
                : "You have answered all questions. You won't be able to change answers after submitting."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep answering</AlertDialogCancel>
            <AlertDialogAction disabled={submitting} onClick={() => submit(false)}>Yes, submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
