import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, CheckCircle2, Building2, Briefcase, Target, DollarSign, Clock } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import { allSkills, allMissionTags } from "@/data/dummyData";

const steps = ["Company", "Mission", "Role Details", "Skills & Fit", "Review"];
const stages = ["Pre-Seed", "Seed", "Series A", "Series B+"];
const jobTypes = ["Full-time", "Internship", "Part-time", "Contract"];

const FounderOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: "", stage: "", domain: "", teamSize: "", location: "",
    mission: "", missionTags: [] as string[], founderNote: "",
    roleTitle: "", roleDescription: "", jobType: "", compensationMin: "", compensationMax: "",
    equity: "", timeline: "", hiringUrgency: "",
    skillsRequired: [] as string[], skillsPreferred: [] as string[],
    valuesImportant: [] as string[],
  });

  const toggle = (field: 'skillsRequired' | 'skillsPreferred' | 'missionTags' | 'valuesImportant', val: string) => {
    setForm(f => ({
      ...f,
      [field]: (f[field] as string[]).includes(val) ? (f[field] as string[]).filter((v: string) => v !== val) : [...(f[field] as string[]), val],
    }));
  };

  const Chip = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${selected ? "border-accent bg-accent/15 text-accent" : "border-border bg-secondary text-secondary-foreground hover:border-accent/40"}`}>
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
      <AppHeader userType="founder" />
      <div className="container max-w-2xl py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${i <= step ? "gradient-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-xs font-medium sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full rounded-full gradient-accent transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="glass-card p-8">
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div><h2 className="font-display text-2xl font-bold flex items-center gap-2"><Building2 className="h-6 w-6 text-accent" /> Company Profile</h2><p className="text-sm text-muted-foreground">Tell us about your startup.</p></div>
              <div className="space-y-4">
                <div><label className="mb-1.5 block text-sm font-medium">Company Name</label><input value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your startup name" /></div>
                <div><label className="mb-1.5 block text-sm font-medium">Stage</label><div className="flex flex-wrap gap-2">{stages.map(s => <button key={s} onClick={() => setForm(f => ({ ...f, stage: s }))} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${form.stage === s ? "border-accent bg-accent/15 text-accent" : "border-border bg-secondary text-secondary-foreground"}`}>{s}</button>)}</div></div>
                <div><label className="mb-1.5 block text-sm font-medium">Domain / Industry</label><input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., Healthcare AI, Climate Tech" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="mb-1.5 block text-sm font-medium">Team Size</label><input value={form.teamSize} onChange={e => setForm(f => ({ ...f, teamSize: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., 5-10" /></div>
                  <div><label className="mb-1.5 block text-sm font-medium">Location</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., Cambridge, MA" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div><h2 className="font-display text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-accent" /> Mission & Values</h2><p className="text-sm text-muted-foreground">What drives your company? This helps match you with mission-aligned candidates.</p></div>
              <div><label className="mb-1.5 block text-sm font-medium">Company Mission</label><textarea value={form.mission} onChange={e => setForm(f => ({ ...f, mission: e.target.value }))} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="What problem are you solving and why does it matter?" /></div>
              <div><label className="mb-2 block text-sm font-medium">Mission Tags</label><div className="flex flex-wrap gap-2">{allMissionTags.map(m => <Chip key={m} selected={form.missionTags.includes(m)} onClick={() => toggle('missionTags', m)}>{m}</Chip>)}</div></div>
              <div><label className="mb-1.5 block text-sm font-medium">Founder Note to Candidates</label><textarea value={form.founderNote} onChange={e => setForm(f => ({ ...f, founderNote: e.target.value }))} rows={2} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="A personal message about why someone should join your team" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div><h2 className="font-display text-2xl font-bold flex items-center gap-2"><Briefcase className="h-6 w-6 text-accent" /> Role Details</h2><p className="text-sm text-muted-foreground">Define the role you're hiring for.</p></div>
              <div><label className="mb-1.5 block text-sm font-medium">Role Title</label><input value={form.roleTitle} onChange={e => setForm(f => ({ ...f, roleTitle: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., ML Engineer, Product Manager" /></div>
              <div><label className="mb-1.5 block text-sm font-medium">Role Description</label><textarea value={form.roleDescription} onChange={e => setForm(f => ({ ...f, roleDescription: e.target.value }))} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="What will this person do?" /></div>
              <div><label className="mb-1.5 block text-sm font-medium">Job Type</label><div className="flex flex-wrap gap-2">{jobTypes.map(j => <button key={j} onClick={() => setForm(f => ({ ...f, jobType: j }))} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${form.jobType === j ? "border-accent bg-accent/15 text-accent" : "border-border bg-secondary text-secondary-foreground"}`}>{j}</button>)}</div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1.5 block text-sm font-medium flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> Comp Min</label><input value={form.compensationMin} onChange={e => setForm(f => ({ ...f, compensationMin: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="$80,000" /></div>
                <div><label className="mb-1.5 block text-sm font-medium flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> Comp Max</label><input value={form.compensationMax} onChange={e => setForm(f => ({ ...f, compensationMax: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="$120,000" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1.5 block text-sm font-medium">Equity Range</label><input value={form.equity} onChange={e => setForm(f => ({ ...f, equity: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0.3% – 0.8%" /></div>
                <div><label className="mb-1.5 block text-sm font-medium flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Timeline</label><input value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., Hiring this month" /></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div><h2 className="font-display text-2xl font-bold">Skills & Fit Preferences</h2><p className="text-sm text-muted-foreground">What skills are essential and which values matter most?</p></div>
              <div><label className="mb-2 block text-sm font-medium">Required Skills</label><div className="flex flex-wrap gap-2">{allSkills.slice(0, 20).map(s => <Chip key={s} selected={form.skillsRequired.includes(s)} onClick={() => toggle('skillsRequired', s)}>{s}</Chip>)}</div></div>
              <div><label className="mb-2 block text-sm font-medium">Preferred Skills</label><div className="flex flex-wrap gap-2">{allSkills.slice(0, 20).map(s => <Chip key={s} selected={form.skillsPreferred.includes(s)} onClick={() => toggle('skillsPreferred', s)}>{s}</Chip>)}</div></div>
              <div><label className="mb-2 block text-sm font-medium">Values You Prioritize</label><div className="flex flex-wrap gap-2">{["Ownership mentality", "Mission-driven", "Move fast", "Collaborative", "Detail-oriented", "Creative problem solver", "Adaptable"].map(v => <Chip key={v} selected={form.valuesImportant.includes(v)} onClick={() => toggle('valuesImportant', v)}>{v}</Chip>)}</div></div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div><h2 className="font-display text-2xl font-bold">Review Your Posting</h2><p className="text-sm text-muted-foreground">Here's a preview. You can always edit later.</p></div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Company:</span> <span className="font-medium">{form.companyName || "—"}</span></div>
                <div><span className="text-muted-foreground">Stage:</span> <span className="font-medium">{form.stage || "—"}</span></div>
                <div><span className="text-muted-foreground">Role:</span> <span className="font-medium">{form.roleTitle || "—"}</span></div>
                <div><span className="text-muted-foreground">Type:</span> <span className="font-medium">{form.jobType || "—"}</span></div>
                <div><span className="text-muted-foreground">Compensation:</span> <span className="font-medium">{form.compensationMin && form.compensationMax ? `${form.compensationMin} – ${form.compensationMax}` : "—"}{form.equity && ` + ${form.equity} equity`}</span></div>
                <div><span className="text-muted-foreground">Timeline:</span> <span className="font-medium">{form.timeline || "—"}</span></div>
                <div><span className="text-muted-foreground">Mission Tags:</span> <span className="font-medium">{form.missionTags.join(", ") || "—"}</span></div>
                <div><span className="text-muted-foreground">Required Skills:</span> <span className="font-medium">{form.skillsRequired.join(", ") || "—"}</span></div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-1.5 rounded-lg gradient-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90">
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => navigate("/founder/dashboard")} className="flex items-center gap-1.5 rounded-lg gradient-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90 glow-accent">
                View Candidates <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderOnboarding;
