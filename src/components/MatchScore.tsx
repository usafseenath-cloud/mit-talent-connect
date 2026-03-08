import { cn } from "@/lib/utils";

const MatchScore = ({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) => {
  const getColor = () => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-primary";
    return "text-muted-foreground";
  };

  const getTrackColor = () => {
    if (score >= 90) return "bg-success/20";
    if (score >= 80) return "bg-accent/20";
    if (score >= 70) return "bg-primary/20";
    return "bg-muted/30";
  };

  const getFillColor = () => {
    if (score >= 90) return "bg-success";
    if (score >= 80) return "bg-accent";
    if (score >= 70) return "bg-primary";
    return "bg-muted-foreground";
  };

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className={cn("font-display font-bold", sizeClasses[size], getColor())}>
        {score}%
      </span>
      {size !== "sm" && (
        <div className={cn("h-1.5 w-full rounded-full", getTrackColor())}>
          <div className={cn("h-full rounded-full transition-all", getFillColor())} style={{ width: `${score}%` }} />
        </div>
      )}
      <span className="text-xs text-muted-foreground">Match</span>
    </div>
  );
};

export default MatchScore;
