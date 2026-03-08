import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, CheckCircle2, Upload } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import { allSkills, allMissionTags } from "@/data/dummyData";

const steps = ["Basics", "Skills", "Preferences", "Mission", "Review"];

const programs = ["MS Computer Science", "MBA", "PhD Computer Science", "MS Electrical Engineering", "MS Data Science", "MS AI + Decision Making", "MS Operations Research", "PhD Chemical Engineering", "PhD Computational Biology", "MArch / MS Urban Science", "MBA / MS Engineering"];
const gradYears = [2025, 2026, 2027, 2028];
const domains = ["Healthcare / AI", "Climate Tech", "EdTech", "Biotech", "DeepTech", "GovTech", "Energy", "Mental Health", "FinTech", "Robotics"];
const stagePrefs = ["Pre-Seed", "Seed", "Series A", "Series B+", "No preference"];
const jobTypes = ["Full-time", "Internship", "Part-time", "Project-based"];

const StudentOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", program: "", gradYear: 2026, skills: [] as string[], interests: [] as string[],
    stagePrefs: [] as string[], jobTypes: [] as string[], missionTags: [] as string[],
    bio: "", resumeUploaded: false,
  });

  const completeness = Math.min(100, [
    form.name, form.program, form.skills.length > 0, form.interests.length > 0,
    form.jobTypes.length > 0, form.missionTags.length > 0, form.bio,
  ].filter(Boolean).length / 7 * 100);

  const toggle = (field: 'skills' | 'interests' | 'stagePrefs' | 'jobTypes' | 'missionTags', val: string) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(val) ? f[field].filter(v => v !== val) : [...f[field], val],
    }));
  };

  const Chip = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${selected ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-secondary-foreground hover:border-primary/40"}`}>
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
      <AppHeader userType="student" />
      <div className="container max-w-2xl py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${i <= step ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-xs font-medium sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="glass-card p-8">
          {/* Step 0: Basics */}
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-2xl font-bold">Let's get started</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself so we can find the best matches.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Program</label>
                  <select value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select your program</option>
                    {programs.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Graduation Year</label>
                  <div className="flex gap-3">
                    {gradYears.map(y => (
                      <button key={y} onClick={() => setForm(f => ({ ...f, gradYear: y }))} className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${form.gradYear === y ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-secondary-foreground hover:border-primary/40"}`}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-2xl font-bold">Your skills</h2>
                <p className="text-sm text-muted-foreground">Select the skills that define you. These help us match you with the right roles.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(s => (
                  <Chip key={s} selected={form.skills.includes(s)} onClick={() => toggle('skills', s)}>{s}</Chip>
                ))}
              </div>
              {form.skills.length > 0 && <p className="text-xs text-muted-foreground">{form.skills.length} skills selected</p>}
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-2xl font-bold">Your preferences</h2>
                <p className="text-sm text-muted-foreground">Help us understand what kind of opportunity you're looking for.</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Interested Domains</label>
                <div className="flex flex-wrap gap-2">
                  {domains.map(d => <Chip key={d} selected={form.interests.includes(d)} onClick={() => toggle('interests', d)}>{d}</Chip>)}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Startup Stage Preference</label>
                <div className="flex flex-wrap gap-2">
                  {stagePrefs.map(s => <Chip key={s} selected={form.stagePrefs.includes(s)} onClick={() => toggle('stagePrefs', s)}>{s}</Chip>)}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Job Type</label>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map(j => <Chip key={j} selected={form.jobTypes.includes(j)} onClick={() => toggle('jobTypes', j)}>{j}</Chip>)}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mission */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-2xl font-bold">Mission & Values</h2>
                <p className="text-sm text-muted-foreground">What causes and missions drive you? This helps us match you with aligned startups.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {allMissionTags.map(m => <Chip key={m} selected={form.missionTags.includes(m)} onClick={() => toggle('missionTags', m)}>{m}</Chip>)}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Short Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell startups what drives you..." />
              </div>
              <button onClick={() => setForm(f => ({ ...f, resumeUploaded: true }))} className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${form.resumeUploaded ? "border-success bg-success/10 text-success" : "border-border bg-secondary text-secondary-foreground hover:border-primary/40"}`}>
                <Upload className="h-4 w-4" />
                {form.resumeUploaded ? "Resume Uploaded ✓" : "Upload Resume (optional)"}
              </button>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-display text-2xl font-bold">Review Your Profile</h2>
                <p className="text-sm text-muted-foreground">Here's a summary. You can always update this later.</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                <span className="text-sm font-medium">Profile Completeness</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${completeness}%` }} />
                  </div>
                  <span className="font-display text-sm font-bold text-primary">{Math.round(completeness)}%</span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{form.name || "—"}</span></div>
                <div><span className="text-muted-foreground">Program:</span> <span className="font-medium">{form.program || "—"}</span></div>
                <div><span className="text-muted-foreground">Graduation:</span> <span className="font-medium">{form.gradYear}</span></div>
                <div><span className="text-muted-foreground">Skills:</span> <span className="font-medium">{form.skills.join(", ") || "—"}</span></div>
                <div><span className="text-muted-foreground">Interests:</span> <span className="font-medium">{form.interests.join(", ") || "—"}</span></div>
                <div><span className="text-muted-foreground">Mission Tags:</span> <span className="font-medium">{form.missionTags.join(", ") || "—"}</span></div>
                <div><span className="text-muted-foreground">Bio:</span> <span className="font-medium">{form.bio || "—"}</span></div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-1.5 rounded-lg gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => navigate("/student/dashboard")} className="flex items-center gap-1.5 rounded-lg gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary">
                View My Matches <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboarding;
