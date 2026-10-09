import { createFileRoute } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, DIFFICULTIES, type Difficulty } from "@/data/quizzes";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHeading } from "@/components/PageHeading";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Quiz Categories — QuizNova" },
      { name: "description", content: "Search and filter QuizNova quizzes by category and difficulty." },
      { property: "og:title", content: "Quiz Categories — QuizNova" },
      { property: "og:description", content: "AI, Computer Science, GK, Web Development and Programming quizzes." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) =>
      (cat === "all" || c.id === cat) &&
      (!q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)));
  }, [query, cat]);

  const reset = () => { setQuery(""); setCat("all"); };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-14">
      <PageHeading eyebrow="Categories" title="Find your next quiz" text="Search by topic, pick a category and choose your difficulty level." />

      <div className="mt-10 grid gap-3 rounded-2xl border bg-card p-4 shadow-card md:grid-cols-[1fr_220px_auto]">
        <label className="relative">
          <span className="sr-only">Search categories</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search categories…" maxLength={60}
            className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}
            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1" role="radiogroup" aria-label="Difficulty filter">
          {DIFFICULTIES.map((d) => (
            <button key={d} role="radio" aria-checked={difficulty === d} onClick={() => setDifficulty(d)}
              className={`rounded-lg px-4 py-2 text-sm font-bold capitalize ${difficulty === d ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing <b className="text-foreground">{results.length}</b> categor{results.length === 1 ? "y" : "ies"} · <span className="capitalize">{difficulty}</span> level
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed bg-card p-12 text-center">
          <SearchX className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-3 text-lg font-bold">No quizzes match your search</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try a different keyword or clear the filters.</p>
          <button onClick={reset} className="mt-5 rounded-xl bg-gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground">Clear filters</button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => <CategoryCard key={c.id} category={c} defaultDifficulty={difficulty} />)}
        </div>
      )}
    </section>
  );
}
