import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, DollarSign, Clock, MapPin, Sparkles, CheckCircle2, Send, Building2, Heart } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import MatchScore from "@/components/MatchScore";
import StatusBadge from "@/components/StatusBadge";
import { startupRoles } from "@/data/dummyData";

const RoleDetail = () => {
  const { id } = useParams();
  const role = startupRoles.find(r => r.id === id);
  const [interested, setInterested] = useState(false);
  const [note, setNote] = useState("");

  if (!role) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Role not found</div>;

  return (
    <div className="min-h-screen">
      <AppHeader userType="student" />
      <div className="container max-w-4xl py-8">
        <Link to="/student/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to matches
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-start gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-3xl">{role.startupLogo}</span>
                <div className="flex-1">
                  <span className="text-sm text-muted-foreground">{role.startupName} · {role.startupStage}</span>
                  <h1 className="font-display text-2xl font-bold">{role.roleTitle}</h1>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status="verified" />
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{role.jobType}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{role.domain}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-secondary p-4">
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-accent" /><div><div className="text-xs text-muted-foreground">Compensation</div><div className="text-sm font-semibold">{role.compensationRange}</div>{role.equity && <div className="text-xs text-accent">{role.equity} equity</div>}</div></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><div><div className="text-xs text-muted-foreground">Timeline</div><div className="text-sm font-semibold">{role.timeline}</div></div></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Location</div><div className="text-sm font-semibold">{role.location}</div></div></div>
              </div>
            </div>

            {/* Company Overview */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Building2 className="h-4 w-4 text-primary" /> About {role.startupName}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{role.companyOverview}</p>
            </div>

            {/* Role Description */}
            <div className="glass-card p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">About the Role</h2>
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{role.description}</p>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Required Skills</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {role.skillsRequired.map(s => <span key={s} className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{s}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Skills</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {role.skillsPreferred.map(s => <span key={s} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Note */}
            <div className="glass-card p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold"><Heart className="h-4 w-4 text-primary" /> From the Founder</h2>
              <blockquote className="border-l-2 border-primary/30 pl-4 text-sm italic text-muted-foreground leading-relaxed">"{role.founderNote}"</blockquote>
            </div>

            {/* Mission Tags */}
            <div className="glass-card p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">Mission & Values</h2>
              <div className="flex flex-wrap gap-2">
                {role.missionTags.map(t => <span key={t} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Score */}
            <div className="glass-card p-6 text-center">
              <MatchScore score={role.matchScore} size="lg" />
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-left">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="text-xs font-medium text-primary">Why You Match</span>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{role.matchReason}</p>
                </div>
              </div>
            </div>

            {/* Express Interest */}
            <div className="glass-card p-6">
              {!interested ? (
                <div className="space-y-3">
                  <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Add a note to the founder (optional)..." className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button onClick={() => setInterested(true)} className="flex w-full items-center justify-center gap-2 rounded-lg gradient-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary">
                    <Send className="h-4 w-4" /> Express Interest
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-display font-semibold">Interest Expressed!</p>
                    <p className="text-xs text-muted-foreground">The founder has been notified. You'll hear back within 48 hours.</p>
                  </div>
                  <StatusBadge status="intro_requested" size="md" />
                </div>
              )}
            </div>

            {/* Hiring Stage */}
            <div className="glass-card p-6">
              <h3 className="mb-3 text-sm font-semibold">Hiring Stage</h3>
              <div className="space-y-2">
                {["Open", "Screening", "Technical screen", "Final round", "Final candidates"].map((stage, i) => {
                  const isActive = role.hiringStage === stage;
                  const isPast = ["Open", "Screening", "Technical screen", "Final round", "Final candidates"].indexOf(role.hiringStage) >= i;
                  return (
                    <div key={stage} className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${isActive ? "gradient-primary animate-pulse-glow" : isPast ? "bg-primary/40" : "bg-muted"}`} />
                      <span className={`text-xs ${isActive ? "font-semibold text-foreground" : isPast ? "text-muted-foreground" : "text-muted-foreground/50"}`}>{stage}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
