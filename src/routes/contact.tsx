import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Mail, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHeading } from "@/components/PageHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — QuizNova" },
      { name: "description", content: "Send feedback or questions to the QuizNova team." },
      { property: "og:title", content: "Contact QuizNova" },
      { property: "og:description", content: "Get in touch with feedback about QuizNova." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)").max(100, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long (max 1000)"),
});
type Fields = z.infer<typeof schema>;

function Contact() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => { const k = i.path[0] as keyof Fields; errs[k] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setValues({ name: "", email: "", message: "" });
  };

  const field = (k: keyof Fields) => ({
    value: values[k],
    onChange: (e: { target: { value: string } }) => setValues({ ...values, [k]: e.target.value }),
    "aria-invalid": !!errors[k],
    className: `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring ${errors[k] ? "border-destructive" : ""}`,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 pt-14">
      <PageHeading eyebrow="Contact" title="We'd love to hear from you" text="Share feedback, report a wrong answer or suggest a new category." />
      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {[
            [Mail, "Email", "hello@quiznova.example"],
            [MapPin, "Location", "Sample Campus, Demo City"],
            [Clock, "Response time", "Within 2 working days"],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Mail;
            return (
              <div key={t as string} className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0"><div className="text-xs text-muted-foreground">{t as string}</div><div className="truncate font-semibold">{d as string}</div></div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">Contact details shown are fictional sample information for this demo project.</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          {sent && (
            <div role="status" className="flex items-start gap-3 rounded-xl bg-success/10 p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <span>Thank you! Your message passed validation. <span className="text-muted-foreground">(Demo only — messages are not sent or stored.)</span></span>
            </div>
          )}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name *</label>
            <input id="name" {...field("name")} placeholder="Your name" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email *</label>
            <input id="email" type="email" {...field("email")} placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold">Message *</label>
            <textarea id="message" rows={5} {...field("message")} placeholder="Write your message…" />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full rounded-xl bg-gradient-brand py-3 font-semibold text-primary-foreground shadow-glow">Send Message</button>
        </form>
      </div>
    </section>
  );
}
