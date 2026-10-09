import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Layout, Shuffle, Smartphone, Timer, Trophy } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — QuizNova" },
      { name: "description", content: "About QuizNova, an online quiz website built as a BCA mini project by Sonal Gayakwad." },
      { property: "og:title", content: "About QuizNova" },
      { property: "og:description", content: "Purpose, features and technologies of the QuizNova quiz platform." },
    ],
  }),
  component: About,
});

const FEATURES = [
  { icon: Timer, t: "Countdown timer", d: "Each quiz is timed; it auto-submits when time runs out." },
  { icon: Shuffle, t: "Shuffled questions", d: "Question order changes on every new attempt." },
  { icon: Trophy, t: "Detailed results", d: "Score, percentage, feedback and full answer review." },
  { icon: Layout, t: "Search & filters", d: "Find categories quickly and pick Easy, Medium or Hard." },
  { icon: Smartphone, t: "Responsive design", d: "Works smoothly on mobile, tablet and desktop." },
  { icon: Code2, t: "Modern stack", d: "React, TypeScript and Tailwind CSS with reusable components." },
];

function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14">
      <PageHeading eyebrow="About" title="What is QuizNova?" text="QuizNova — Smart Quiz Platform is an online quiz website that lets students test their knowledge through timed multiple-choice quizzes and learn from instant feedback." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.t} className="card-lift rounded-2xl border bg-card p-6 shadow-card">
            <f.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-3 font-bold">{f.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 rounded-3xl bg-gradient-brand p-8 text-primary-foreground md:grid-cols-2 md:p-12">
        <div>
          <h3 className="text-2xl font-bold">Project details</h3>
          <p className="mt-2 opacity-90">BCA Mini Project — Student and Personal Projects category.</p>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div><dt className="opacity-75">Project title</dt><dd className="font-semibold">Online Quiz Website</dd></div>
          <div><dt className="opacity-75">Project number</dt><dd className="font-semibold">44</dd></div>
          <div><dt className="opacity-75">Developer</dt><dd className="font-semibold">Sonal Gayakwad</dd></div>
          <div><dt className="opacity-75">Technologies</dt><dd className="font-semibold">React · TypeScript · Tailwind</dd></div>
        </dl>
      </div>
      <div className="mt-10 text-center">
        <Link to="/categories" className="inline-flex rounded-xl bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow">Start a Quiz</Link>
      </div>
    </section>
  );
}
