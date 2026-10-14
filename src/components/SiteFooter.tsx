import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            QuizNova is a smart quiz platform to test and grow your knowledge in tech and general topics — built as a BCA mini project.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-primary">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">Get in touch</h4>
          <p className="text-sm text-muted-foreground">Questions or feedback about QuizNova?</p>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-primary" /> Amravati, Maharashtra, India</p>
          <Link to="/contact" className="mt-3 inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-accent">
            Go to Contact
          </Link>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} QuizNova — Smart Quiz Platform. All rights reserved.</p>
          <p className="flex items-center gap-2 font-script text-lg italic">
            Developed by <span className="text-gradient-brand font-bold not-italic font-display">Sonal Gayakwad</span>
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
