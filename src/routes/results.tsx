import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Home, Loader2, MinusCircle, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { feedback, formatTime, RESULT_KEY, type QuizResult } from "@/lib/quiz";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your Results — QuizNova" },
      { name: "description", content: "Your QuizNova score, percentage, feedback and answer review." },
      { property: "og:title", content: "Quiz Results — QuizNova" },
      { property: "og:description", content: "See your score and review every answer." },
    ],
  }),
  component: Results,
});

function Results() {
  const [state, setState] = useState<{ loading: boolean; result: QuizResult | null }>({ loading: true, result: null });
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESULT_KEY);
      setState({ loading: false, result: raw ? (JSON.parse(raw) as QuizResult) : null });
    } catch {
      setState({ loading: false, result: null });
    }
  }, []);

  if (state.loading) return <div className="flex min-h-[50vh] items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading results…</div>;

  const r = state.result;
  if (!r) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ClipboardList className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">No results yet</h1>
        <p className="mt-2 text-muted-foreground">Complete a quiz to see your score here.</p>
        <Link to="/categories" className="mt-6 inline-flex rounded-xl bg-gradient-brand px-5 py-2.5 font-semibold text-primary-foreground">Start a Quiz</Link>
      </div>
    );
  }

  const fb = feedback(r.percentage);
  const stats = [
    { label: "Total questions", value: r.total, icon: ClipboardList, cls: "text-primary" },
    { label: "Correct", value: r.correct, icon: CheckCircle2, cls: "text-success" },
    { label: "Incorrect", value: r.incorrect, icon: XCircle, cls: "text-destructive" },
    { label: "Unanswered", value: r.unanswered, icon: MinusCircle, cls: "text-muted-foreground" },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 pt-10">
      <div className="overflow-hidden rounded-3xl bg-gradient-brand p-8 text-center text-primary-foreground shadow-glow animate-rise sm:p-10">
        <Trophy className="mx-auto h-12 w-12" />
        <p className="mt-3 text-sm font-semibold opacity-90">{r.categoryName} · <span className="capitalize">{r.difficulty}</span></p>
        <div className="mt-2 font-display text-6xl font-extrabold">{r.percentage}%</div>
        <p className="mt-1 text-lg font-semibold">Final score: {r.correct} / {r.total}</p>
        <h1 className="mt-4 text-2xl font-bold">{fb.title}</h1>
        <p className="mx-auto mt-1 max-w-md opacity-90">{fb.text}</p>
        <p className="mt-3 text-xs opacity-80">{r.timedOut ? "Time ran out — quiz auto-submitted." : `Time taken: ${formatTime(r.timeTaken)}`}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4 text-center shadow-card">
            <s.icon className={`mx-auto h-6 w-6 ${s.cls}`} />
            <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/quiz/$categoryId" params={{ categoryId: r.categoryId }} search={{ difficulty: r.difficulty }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground">
          <RotateCcw className="h-4 w-4" /> Retake Quiz
        </Link>
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border bg-card px-6 py-3 font-semibold">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <h2 className="mt-12 text-2xl font-bold">Review Answers</h2>
      <ol className="mt-4 space-y-4">
        {r.review.map((item, i) => {
          const ok = item.selected === item.correct;
          return (
            <li key={i} className={`rounded-2xl border-l-4 bg-card p-5 shadow-card ${ok ? "border-l-success" : "border-l-destructive"}`}>
              <div className="flex items-start gap-3">
                {ok ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" /> : <XCircle className="h-5 w-5 shrink-0 text-destructive" />}
                <div className="min-w-0">
                  <p className="font-semibold">Q{i + 1}. {item.question}</p>
                  <p className="mt-2 text-sm">
                    <span className="text-muted-foreground">Your answer: </span>
                    <span className={ok ? "font-semibold text-success" : "font-semibold text-destructive"}>
                      {item.selected == null ? "Not answered" : item.options[item.selected]}
                    </span>
                  </p>
                  {!ok && <p className="text-sm"><span className="text-muted-foreground">Correct answer: </span><span className="font-semibold text-success">{item.options[item.correct]}</span></p>}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
