import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Send, Eye, XCircle, AlertCircle, Sparkles } from "lucide-react";

type Status = "verified" | "matched" | "intro_requested" | "under_review" | "closed" | "incomplete" | "active" | "shortlisted" | "passed" | "pending" | "accepted";

const statusConfig: Record<Status, { label: string; icon: React.ElementType; className: string }> = {
  verified: { label: "MIT Verified", icon: CheckCircle2, className: "bg-success/15 text-success border-success/20" },
  matched: { label: "Matched", icon: Sparkles, className: "bg-accent/15 text-accent border-accent/20" },
  active: { label: "Active", icon: CheckCircle2, className: "bg-success/15 text-success border-success/20" },
  shortlisted: { label: "Shortlisted", icon: Sparkles, className: "bg-accent/15 text-accent border-accent/20" },
  intro_requested: { label: "Intro Requested", icon: Send, className: "bg-primary/15 text-primary border-primary/20" },
  under_review: { label: "Under Review", icon: Eye, className: "bg-accent/15 text-accent border-accent/20" },
  pending: { label: "Pending", icon: Clock, className: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20" },
  accepted: { label: "Accepted", icon: CheckCircle2, className: "bg-success/15 text-success border-success/20" },
  closed: { label: "Closed", icon: XCircle, className: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20" },
  incomplete: { label: "Incomplete", icon: AlertCircle, className: "bg-destructive/15 text-destructive border-destructive/20" },
  passed: { label: "Passed", icon: XCircle, className: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20" },
};

const StatusBadge = ({ status, size = "sm" }: { status: Status; size?: "sm" | "md" }) => {
  const config = statusConfig[status];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium",
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      config.className
    )}>
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
