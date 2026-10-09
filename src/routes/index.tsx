import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, Layers, ListChecks, MousePointerClick, Target, Timer, Trophy } from "lucide-react";
import { CATEGORIES, TOTAL_QUESTIONS, TOTAL_QUIZZES } from "@/data/quizzes";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHeading } from "@/components/PageHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuizNova — Smart Quiz Platform" },
      { name: "description", content: "Challenge your knowledge with timed quizzes on AI, Computer Science, Web Development and more." },
      { property: "og:title", content: "QuizNova — Smart Quiz Platform" },
      { property: "og:description", content: "Timed multiple-choice quizzes with instant results and answer review." },
    ],
  }),
  component: Home,
});

const STEPS = [
  { icon: Layers, title: "Pick a category", text: "Choose a topic and a difficulty level." },
  { icon: MousePointerClick, title: "Answer questions", text: "One question at a time, against the clock." },
  { icon: ListChecks, title: "Submit your quiz", text: "Change answers anytime before submitting." },
  { icon: Trophy, title: "Review results", text: "See your score and the correct answers." },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-primary shadow-card">
              <Target className="h-3.5 w-3.5" /> Smart Quiz Platform
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
              Challenge Your <span className="text-gradient-brand">Knowledge</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              QuizNova helps students practise and test what they know with timed multiple-choice quizzes, instant scoring and detailed answer review.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/categories" className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Start Quiz <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="inline-flex items-center rounded-xl border bg-card px-6 py-3.5 font-semibold hover:bg-secondary">
                Learn more
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3 px-4 pb-16 sm:gap-6">
          {[
            [CATEGORIES.length, "Categories"],
            [TOTAL_QUIZZES, "Quizzes"],
            [TOTAL_QUESTIONS, "Questions"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border bg-card p-4 text-center shadow-card sm:p-6">
              <div className="font-display text-3xl font-extrabold text-gradient-brand sm:text-4xl">{n}+</div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About QuizNova</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Learning made engaging</h2>
            <p className="mt-4 text-muted-foreground">
              QuizNova is an online quiz website where learners can practise topics from Artificial Intelligence to General Knowledge. Each quiz is timed, questions are shuffled on every attempt, and the results page explains exactly where you went right or wrong.
            </p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-1 font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[[Timer, "Countdown timer"], [BookOpen, "5 categories, 3 levels"], [CheckCircle2, "Instant scoring"], [ListChecks, "Answer review"]].map(([I, t]) => {
              const Icon = I as typeof Timer;
              return (
                <li key={t as string} className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card">
                  <Icon className="h-5 w-5 shrink-0 text-primary" /> <span className="font-semibold">{t as string}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24">
        <PageHeading eyebrow="How it works" title="Four simple steps" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border bg-card p-6 shadow-card">
              <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-secondary">0{i + 1}</span>
              <s.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24">
        <PageHeading eyebrow="Popular" title="Popular quiz categories" text="Choose a difficulty on any card and start right away." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 3).map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/categories" className="inline-flex items-center gap-2 rounded-xl border bg-card px-6 py-3 font-semibold hover:bg-secondary">
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
      <div className="relative animate-float rounded-3xl border bg-card p-6 shadow-glow">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Question 3 of 5</span>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-primary"><Timer className="h-3 w-3" /> 01:24</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 w-3/5 rounded-full bg-gradient-brand" /></div>
        <p className="mt-5 font-display font-bold">Which data structure follows LIFO?</p>
        <div className="mt-4 space-y-2">
          {["Queue", "Stack", "Array", "Graph"].map((o, i) => (
            <div key={o} className={`rounded-xl border px-4 py-2.5 text-sm ${i === 1 ? "border-primary bg-secondary font-semibold text-primary" : ""}`}>{o}</div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-card">
        <Trophy className="h-5 w-5 text-warning" /><span className="text-sm font-bold">Score 90%</span>
      </div>
    </div>
  );
}
