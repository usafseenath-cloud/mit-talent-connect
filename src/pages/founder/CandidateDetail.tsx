import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Sparkles, Send, Star, GraduationCap, Code, Heart, Calendar, Award } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import MatchScore from "@/components/MatchScore";
import StatusBadge from "@/components/StatusBadge";
import { studentProfiles } from "@/data/dummyData";

const CandidateDetail = () => {
  const { id } = useParams();
  const candidate = studentProfiles.find(s => s.id === id);
  const [actionTaken, setActionTaken] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (!candidate) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Candidate not found</div>;

  return (
    <div className="min-h-screen">
      <AppHeader userType="founder" />
      <div className="container max-w-4xl py-8">
        <Link to="/founder/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to candidates
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary font-display text-xl font-bold text-primary-foreground">{candidate.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-2xl font-bold">{candidate.name}</h1>
                    {candidate.verified && <StatusBadge status="verified" />}
                  </div>
                  <p className="text-muted-foreground">{candidate.program} · Class of {candidate.graduationYear}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusBadge status={candidate.status} />
                    <span className="text-xs text-muted-foreground">Profile {candidate.profileCompleteness}% complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="glass-card p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Skills */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Code className="h-4 w-4 text-accent" /> Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(s => (
                  <span key={s} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent">{s}</span>
                ))}
              </div>
            </div>

            {/* Project Highlights */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Award className="h-4 w-4 text-primary" /> Project Highlights</h2>
              <ul className="space-y-2">
                {candidate.projectHighlights.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interests & Mission */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Heart className="h-4 w-4 text-primary" /> Interests & Mission Alignment</h2>
              <div className="mb-3 flex flex-wrap gap-2">
                {candidate.interests.map(i => <span key={i} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{i}</span>)}
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.missionAlignment.map(m => <span key={m} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent">{m}</span>)}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Calendar className="h-4 w-4 text-muted-foreground" /> Availability</h2>
              <p className="text-sm text-muted-foreground">{candidate.availability}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6 text-center">
              <MatchScore score={candidate.fitScore} size="lg" />
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent/5 p-3 text-left">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <span className="text-xs font-medium text-accent">Why This Candidate Fits</span>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{candidate.matchReason}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card p-6 space-y-3">
              {!actionTaken ? (
                <>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Add a personal note (optional)..." className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button onClick={() => setActionTaken("intro")} className="flex w-full items-center justify-center gap-2 rounded-lg gradient-accent py-3 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90 glow-accent">
                    <Send className="h-4 w-4" /> Request Intro
                  </button>
                  <button onClick={() => setActionTaken("shortlisted")} className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent/20 bg-accent/10 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20">
                    <Star className="h-4 w-4" /> Shortlist
                  </button>
                </>
              ) : (
                <div className="text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <p className="font-display font-semibold">
                    {actionTaken === "intro" ? "Intro Requested!" : "Added to Shortlist!"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {actionTaken === "intro" ? "The candidate will be notified. Expect a response within 48 hours." : "You can find them in your shortlisted tab."}
                  </p>
                  <StatusBadge status={actionTaken === "intro" ? "intro_requested" : "shortlisted"} size="md" />
                </div>
              )}
            </div>

            {/* Profile Quality */}
            <div className="glass-card p-6">
              <h3 className="mb-3 text-sm font-semibold">Profile Quality</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Completeness</span>
                <span className="text-xs font-medium">{candidate.profileCompleteness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${candidate.profileCompleteness}%` }} />
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  ["MIT Verified", true],
                  ["Skills Complete", candidate.skills.length > 3],
                  ["Bio Added", !!candidate.bio],
                  ["Projects Listed", candidate.projectHighlights.length > 0],
                ].map(([label, done]) => (
                  <div key={label as string} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className={`h-3 w-3 ${done ? "text-success" : "text-muted"}`} />
                    <span className={done ? "text-muted-foreground" : "text-muted"}>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
