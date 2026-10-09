import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="QuizNova home">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-bold">
        Quiz<span className="text-gradient-brand">Nova</span>
      </span>
    </Link>
  );
}
