
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import CareerQuiz from "./pages/CareerQuiz";
import RoleLibrary from "./pages/RoleLibrary";
import SkillsRoadmap from "./pages/SkillsRoadmap";
import CompareCareers from "./pages/CompareCareers";
import CareerStories from "./pages/CareerStories";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-black">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<CareerQuiz />} />
              <Route path="/roles" element={<RoleLibrary />} />
              <Route path="/roadmap" element={<SkillsRoadmap />} />
              <Route path="/compare" element={<CompareCareers />} />
              <Route path="/stories" element={<CareerStories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </GameProvider>
      </TooltipProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
