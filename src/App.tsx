
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import CareerQuiz from "./pages/CareerQuiz";
import RoleLibrary from "./pages/RoleLibrary";
import SkillsRoadmap from "./pages/SkillsRoadmap";
import CompareCareers from "./pages/CompareCareers";
import CareerStories from "./pages/CareerStories";
import CareerEvolutionTimeline from "./pages/CareerEvolutionTimeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-black flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/quiz" element={<CareerQuiz />} />
                  <Route path="/roles" element={<RoleLibrary />} />
                  <Route path="/roadmap" element={<SkillsRoadmap />} />
                  <Route path="/compare" element={<CompareCareers />} />
                  <Route path="/stories" element={<CareerStories />} />
                  <Route path="/timeline" element={<CareerEvolutionTimeline />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
