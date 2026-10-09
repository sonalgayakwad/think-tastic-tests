import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { DIFFICULTIES, SECONDS_PER_QUESTION, type Category, type Difficulty } from "@/data/quizzes";
import { formatTime } from "@/lib/quiz";

export function CategoryCard({ category, defaultDifficulty = "easy" }: { category: Category; defaultDifficulty?: Difficulty }) {
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  useEffect(() => setDifficulty(defaultDifficulty), [defaultDifficulty]);
  const Icon = category.icon;
  const count = category.questions.filter((q) => q.difficulty === difficulty).length;

  return (
    <article className="card-lift flex flex-col rounded-2xl border bg-card p-6 shadow-card animate-rise">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{category.description}</p>
      <div className="mt-5" role="radiogroup" aria-label={`${category.name} difficulty`}>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
          {DIFFICULTIES.map((d) => (
            <button key={d} role="radio" aria-checked={difficulty === d} onClick={() => setDifficulty(d)}
              className={`rounded-lg py-1.5 text-xs font-bold capitalize transition-all ${difficulty === d ? "bg-card text-primary shadow-card" : "text-muted-foreground hover:text-foreground"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{count} questions</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatTime(count * SECONDS_PER_QUESTION[difficulty])}</span>
      </div>
      <Link to="/quiz/$categoryId" params={{ categoryId: category.id }} search={{ difficulty }}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
        Start Quiz <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
