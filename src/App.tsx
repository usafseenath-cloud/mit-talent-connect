import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentOnboarding from "./pages/student/StudentOnboarding";
import StudentDashboard from "./pages/student/StudentDashboard";
import RoleDetail from "./pages/student/RoleDetail";
import FounderOnboarding from "./pages/founder/FounderOnboarding";
import FounderDashboard from "./pages/founder/FounderDashboard";
import CandidateDetail from "./pages/founder/CandidateDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/student/onboarding" element={<StudentOnboarding />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/role/:id" element={<RoleDetail />} />
          <Route path="/founder/onboarding" element={<FounderOnboarding />} />
          <Route path="/founder/dashboard" element={<FounderDashboard />} />
          <Route path="/founder/candidate/:id" element={<CandidateDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
