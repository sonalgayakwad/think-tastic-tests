import { describe, expect, it } from "vitest";
import { scoreQuiz, shuffle } from "./quiz";
import { CATEGORIES, type Question } from "@/data/quizzes";

const qs = CATEGORIES[0]!.questions.slice(0, 5) as [Question, Question, Question, Question, Question];

describe("quiz logic", () => {
  it("scores correct, incorrect and unanswered accurately", () => {
    const answers = [qs[0].answer, qs[1].answer, (qs[2].answer + 1) % 4, null, qs[4].answer];
    expect(scoreQuiz(qs, answers)).toEqual({ total: 5, correct: 3, incorrect: 1, unanswered: 1, percentage: 60 });
  });
  it("shuffle keeps all items", () => {
    expect(shuffle(qs).map((q) => q.id).sort()).toEqual(qs.map((q) => q.id).sort());
  });
  it("every category has at least 5 questions per difficulty with valid answers", () => {
    for (const c of CATEGORIES) for (const d of ["easy", "medium", "hard"]) {
      const list = c.questions.filter((q) => q.difficulty === d);
      expect(list.length).toBeGreaterThanOrEqual(5);
      list.forEach((q) => expect(q.answer).toBeGreaterThanOrEqual(0));
    }
  });
});
