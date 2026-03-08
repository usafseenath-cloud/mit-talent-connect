import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, Clock, DollarSign, Sparkles, ChevronDown, X } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import MatchScore from "@/components/MatchScore";
import StatusBadge from "@/components/StatusBadge";
import { startupRoles, allFunctions, allDomains, allStages, allJobTypes } from "@/data/dummyData";

const StudentDashboard = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    functions: [] as string[], domains: [] as string[], stages: [] as string[], jobTypes: [] as string[],
    minComp: 0, minMatch: 0,
  });

  const filteredRoles = startupRoles.filter(r => {
    if (search && !r.roleTitle.toLowerCase().includes(search.toLowerCase()) && !r.startupName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.functions.length && !filters.functions.includes(r.function)) return false;
    if (filters.domains.length && !filters.domains.includes(r.domain)) return false;
    if (filters.stages.length && !filters.stages.includes(r.startupStage)) return false;
    if (filters.jobTypes.length && !filters.jobTypes.includes(r.jobType)) return false;
    if (filters.minMatch && r.matchScore < filters.minMatch) return false;
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const activeFilterCount = filters.functions.length + filters.domains.length + filters.stages.length + filters.jobTypes.length + (filters.minMatch ? 1 : 0);

  const FilterChips = ({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) => (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(o => (
          <button key={o} onClick={() => onToggle(o)} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${selected.includes(o) ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-secondary-foreground hover:border-primary/40"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  const toggleFilter = (field: keyof typeof filters, val: string) => {
    setFilters(f => {
      const arr = f[field] as string[];
      return { ...f, [field]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  return (
    <div className="min-h-screen">
      <AppHeader userType="student" />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold">Your Matches</h1>
          <p className="text-muted-foreground">Curated startup opportunities matched to your skills, interests, and values.</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles or startups..." className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${showFilters || activeFilterCount ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-secondary-foreground"}`}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 glass-card p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Filter Opportunities</span>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({ functions: [], domains: [], stages: [], jobTypes: [], minComp: 0, minMatch: 0 })} className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>
            <FilterChips label="Function" options={allFunctions} selected={filters.functions} onToggle={v => toggleFilter('functions', v)} />
            <FilterChips label="Domain" options={allDomains} selected={filters.domains} onToggle={v => toggleFilter('domains', v)} />
            <FilterChips label="Stage" options={allStages} selected={filters.stages} onToggle={v => toggleFilter('stages', v)} />
            <FilterChips label="Job Type" options={allJobTypes} selected={filters.jobTypes} onToggle={v => toggleFilter('jobTypes', v)} />
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Min Match Score</label>
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={95} step={5} value={filters.minMatch} onChange={e => setFilters(f => ({ ...f, minMatch: Number(e.target.value) }))} className="flex-1 accent-primary" />
                <span className="text-sm font-medium w-10 text-right">{filters.minMatch}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <p className="mb-4 text-sm text-muted-foreground">{filteredRoles.length} opportunities found</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoles.map((role, i) => (
            <Link to={`/student/role/${role.id}`} key={role.id} className="glass-card group flex flex-col p-5 transition-all hover:border-primary/30 hover:glow-primary" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-xl">{role.startupLogo}</span>
                  <div>
                    <span className="text-xs text-muted-foreground">{role.startupName}</span>
                    <h3 className="font-display text-base font-semibold group-hover:text-primary transition-colors">{role.roleTitle}</h3>
                  </div>
                </div>
                <MatchScore score={role.matchScore} size="sm" />
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{role.startupStage}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{role.jobType}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{role.function}</span>
              </div>

              <div className="mb-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><DollarSign className="h-3 w-3" />{role.compensationRange}{role.equity && ` + ${role.equity} equity`}</div>
                <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{role.timeline}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{role.location}</div>
              </div>

              <div className="mb-3 flex flex-wrap gap-1">
                {role.missionTags.slice(0, 3).map(t => (
                  <span key={t} className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-xs text-accent">{t}</span>
                ))}
              </div>

              <div className="mt-auto flex items-start gap-1.5 rounded-lg bg-primary/5 p-2.5">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                <p className="text-xs text-muted-foreground leading-relaxed">{role.matchReason}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
