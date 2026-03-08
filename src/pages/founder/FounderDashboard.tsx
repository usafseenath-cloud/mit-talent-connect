import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Send, X, ChevronDown, CheckCircle2, XCircle, Eye } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import MatchScore from "@/components/MatchScore";
import StatusBadge from "@/components/StatusBadge";
import { studentProfiles } from "@/data/dummyData";

const FounderDashboard = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [candidates, setCandidates] = useState(studentProfiles);
  const [activeTab, setActiveTab] = useState<"all" | "shortlisted" | "intro_requested">("all");

  const filtered = candidates.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.program.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeTab === "shortlisted" && c.status !== "shortlisted") return false;
    if (activeTab === "intro_requested" && c.status !== "intro_requested") return false;
    return true;
  }).sort((a, b) => b.fitScore - a.fitScore);

  const updateStatus = (id: string, status: 'shortlisted' | 'passed' | 'intro_requested' | 'active') => {
    setCandidates(cs => cs.map(c => c.id === id ? { ...c, status } : c));
  };

  const counts = {
    all: candidates.length,
    shortlisted: candidates.filter(c => c.status === "shortlisted").length,
    intro_requested: candidates.filter(c => c.status === "intro_requested").length,
  };

  return (
    <div className="min-h-screen">
      <AppHeader userType="founder" />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold">Curated Candidates</h1>
          <p className="text-muted-foreground">Pre-vetted MIT talent matched to your role. Review, shortlist, and connect.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
          {([["all", "All Candidates"], ["shortlisted", "Shortlisted"], ["intro_requested", "Intro Requested"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${activeTab === key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {label} ({counts[key]})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates..." className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} candidates</p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="glass-card flex flex-col p-5 transition-all hover:border-accent/30">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary font-display text-sm font-bold text-primary-foreground">{c.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold">{c.name}</h3>
                      {c.verified && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{c.program} · {c.graduationYear}</span>
                  </div>
                </div>
                <MatchScore score={c.fitScore} size="sm" />
              </div>

              <p className="mb-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">{c.bio}</p>

              <div className="mb-3 flex flex-wrap gap-1">
                {c.skills.slice(0, 4).map(s => <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{s}</span>)}
                {c.skills.length > 4 && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">+{c.skills.length - 4}</span>}
              </div>

              <div className="mb-3 flex flex-wrap gap-1">
                {c.missionAlignment.slice(0, 2).map(m => <span key={m} className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-xs text-accent">{m}</span>)}
              </div>

              <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Available: {c.availability}</span>
                <StatusBadge status={c.status} />
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2">
                <Link to={`/founder/candidate/${c.id}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary py-2 text-xs font-medium text-secondary-foreground hover:border-accent/40 transition-all">
                  <Eye className="h-3 w-3" /> View
                </Link>
                {c.status !== "shortlisted" && c.status !== "intro_requested" ? (
                  <button onClick={() => updateStatus(c.id, "shortlisted")} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-all">
                    <Star className="h-3 w-3" /> Shortlist
                  </button>
                ) : c.status === "shortlisted" ? (
                  <button onClick={() => updateStatus(c.id, "intro_requested")} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg gradient-accent py-2 text-xs font-medium text-accent-foreground transition-all">
                    <Send className="h-3 w-3" /> Request Intro
                  </button>
                ) : null}
                {c.status !== "passed" && c.status !== "intro_requested" && (
                  <button onClick={() => updateStatus(c.id, "passed")} className="flex items-center justify-center rounded-lg border border-border bg-secondary p-2 text-muted-foreground hover:text-destructive transition-all">
                    <XCircle className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
