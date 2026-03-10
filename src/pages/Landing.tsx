import { Link } from "react-router-dom";
import { Shield, ArrowRight, Zap, Eye, CheckCircle2, Users, Sparkles, Target, Clock, DollarSign } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";

const features = [
  { icon: Shield, title: "MIT-Verified Only", desc: "Every startup and student is verified through MIT credentials. No noise, only signal." },
  { icon: Eye, title: "Full Transparency", desc: "Compensation ranges, timelines, and expectations are visible upfront. No guessing games." },
  { icon: Sparkles, title: "Smart Matching", desc: "AI-powered matching based on skills, values, and mission alignment — not just keywords." },
  { icon: Target, title: "Curated, Not Crowded", desc: "See only roles and candidates that genuinely fit. Quality over quantity, always." },
];

const howItWorks = [
  { step: "01", title: "Verify & Create", desc: "Sign in with MIT credentials. Build your profile with skills, interests, and values." },
  { step: "02", title: "Get Matched", desc: "Our engine analyzes fit across skills, mission, compensation, and stage preferences." },
  { step: "03", title: "Connect with Confidence", desc: "Express interest, request intros, and communicate — all with full context and transparency." },
];

const sampleStartups = [
  { name: "Aether AI", emoji: "🔮", domain: "Healthcare AI", stage: "Series A", hiring: "2 roles" },
  { name: "Carbon Collective", emoji: "🌱", domain: "Climate Tech", stage: "Seed", hiring: "1 role" },
  { name: "NeuralPath", emoji: "🧠", domain: "EdTech", stage: "Series A", hiring: "1 role" },
  { name: "BioForge", emoji: "🧬", domain: "Biotech", stage: "Pre-Seed", hiring: "1 role" },
  { name: "CivicOS", emoji: "🏛️", domain: "GovTech", stage: "Pre-Seed", hiring: "1 role" },
  { name: "MindBridge", emoji: "💜", domain: "Mental Health", stage: "Seed", hiring: "1 role" },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(352_70%_42%/0.08),transparent_60%)]" />
        <div className="container relative py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-3.5 w-3.5" />
              MIT-Verified Startup Talent Marketplace
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Where MIT talent meets{" "}
              <span className="text-gradient-primary">startup ambition</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl leading-relaxed">
              A curated, transparent marketplace connecting MIT students with verified startups.
              No noise. No guessing. Just high-signal matches built on trust.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/student/onboarding"
                className="group inline-flex h-12 items-center gap-2 rounded-lg gradient-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 glow-primary"
              >
                I'm a Student
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/founder/onboarding"
                className="group inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-secondary px-8 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
              >
                I'm a Founder
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/50 bg-card/50">
        <div className="container grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {[
            { value: "20+", label: "Verified Startups", icon: Zap },
            { value: "50+", label: "MIT Candidates", icon: Users },
            { value: "92%", label: "Avg Match Score", icon: Target },
            { value: "<48h", label: "Response Time", icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Not another job board
            </h2>
            <p className="text-muted-foreground text-lg">
              Generic platforms bury signal in noise. We surface what matters — fit, mission, and trust — so every interaction counts.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 transition-all hover:border-primary/30 hover:glow-primary">
                <f.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/50 bg-card/30 py-20 md:py-28">
        <div className="container">
          <h2 className="mb-16 text-center font-display text-3xl font-bold md:text-4xl">
            How it works
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full gradient-primary font-display text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Side by Side */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="glass-card p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              For Students
            </div>
            <h3 className="mb-4 font-display text-2xl font-bold">Stop guessing.<br />Start matching.</h3>
            <ul className="space-y-3">
              {[
                [DollarSign, "Transparent compensation & equity upfront"],
                [Clock, "Clear hiring timelines — no black holes"],
                [Target, "Roles matched to your skills & values"],
                [CheckCircle2, "Only actively hiring, verified startups"],
              ].map(([Icon, text]) => (
                <li key={text as string} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {text as string}
                </li>
              ))}
            </ul>
            <Link to="/student/onboarding" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Get started as a student <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="glass-card p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              For Founders
            </div>
            <h3 className="mb-4 font-display text-2xl font-bold">Less screening.<br />Better hires.</h3>
            <ul className="space-y-3">
              {[
                [Users, "Exclusive MIT-only curated candidate pool"],
                [CheckCircle2, "Pre-vetted profiles you can trust"],
                [Zap, "Reduced screening time — see fit scores instantly"],
                [Sparkles, "High-signal over high-volume applications"],
              ].map(([Icon, text]) => (
                <li key={text as string} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {text as string}
                </li>
              ))}
            </ul>
            <Link to="/founder/onboarding" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Get started as a founder <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Startups */}
      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold">
            Startups actively hiring on the platform
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {sampleStartups.map((s) => (
              <div key={s.name} className="glass-card flex flex-col items-center p-5 text-center transition-all hover:border-primary/30">
                <span className="mb-3 text-3xl">{s.emoji}</span>
                <span className="mb-1 font-display text-sm font-semibold">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.domain}</span>
                <span className="mt-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{s.hiring}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Ready to find your match?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join the MIT startup talent marketplace today.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/student/onboarding"
                className="inline-flex h-12 items-center gap-2 rounded-lg gradient-primary px-8 text-sm font-semibold text-primary-foreground glow-primary"
              >
                I'm a Student <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/founder/onboarding"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-secondary px-8 text-sm font-semibold text-secondary-foreground"
              >
                I'm a Founder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-display font-medium text-foreground">MIT Startup Match</span>
          </div>
          <span>© 2026 — MIT-Verified Talent Marketplace</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
