import { Link, useLocation } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

interface AppHeaderProps {
  userType?: "student" | "founder" | null;
}

const AppHeader = ({ userType }: AppHeaderProps) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {!isLanding && (
            <Link to={userType === "founder" ? "/founder/dashboard" : userType === "student" ? "/student/dashboard" : "/"} className="mr-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              MIT Startup Match
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {userType && (
            <span className="rounded-full border border-border/50 bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {userType === "student" ? "Student" : "Founder"}
            </span>
          )}
          {!isLanding && (
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
