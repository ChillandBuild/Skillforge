
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { Search, Sparkles } from 'lucide-react';
import AISearchResults from '@/components/AISearchResults';
import { generateLearningPath } from '@/services/perplexityService';

const SkillsRoadmap = () => {
  const { addPoints } = useGame();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResults, setAiResults] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [apiKey] = useState('pplx-B1em1fhzKFZEkrWltCv3rItZlDlr4U8gteVrqbzf2nNq76zODD');

  useEffect(() => {
    // Store the API key in localStorage for persistence
    localStorage.setItem('perplexity_api_key', apiKey);
  }, [apiKey]);

  const handleAISearch = async (term: string) => {
    setIsLoadingAI(true);
    setAiResults('');
    
    try {
      const results = await generateLearningPath(term, apiKey);
      setAiResults(results);
      
      toast({
        title: "🤖 AI Learning Path Generated!",
        description: `Found a personalized roadmap for ${term}`,
      });
      
      console.log(`AI search completed for: ${term}`);
    } catch (error) {
      console.error('AI search error:', error);
      toast({
        title: "Search Failed",
        description: "Failed to generate AI learning path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleAISearch(searchTerm.trim());
    }
  };

  const handleStartAIRoadmap = (skill: string) => {
    addPoints(30);
    
    toast({
      title: "🤖 AI Roadmap Created!",
      description: `Your personalized learning path for ${skill} is ready.`,
    });
    
    console.log(`Started AI roadmap: ${skill}`);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            Self-Taught <span className="text-cyan-400">Mastery</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Skip the college debt. Master in-demand skills with free online resources.
          </p>
          
          {/* AI-Powered Search Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="mr-3 h-8 w-8 text-cyan-400" />
                  <h2 className="text-3xl font-poppins font-bold text-white">
                    AI-Powered Learning Assistant
                  </h2>
                </div>
                <p className="text-gray-300 mb-6 text-lg">
                  Get a personalized, step-by-step learning roadmap for any skill using AI and the best free resources online
                </p>
                
                <form onSubmit={handleSearch} className="relative mb-6">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    <Input
                      type="text"
                      placeholder="What do you want to learn? (e.g., 'Python Programming', 'Digital Marketing', 'UI/UX Design')"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-16 pr-32 py-8 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingAI || !searchTerm.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-emerald-500 text-black font-semibold px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-emerald-600 glow-button"
                    >
                      {isLoadingAI ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                          Generating...
                        </div>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate AI Roadmap
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-center text-sm text-gray-400">
                  <span>✨ Powered by Perplexity AI • Free resources only • No subscriptions required</span>
                </div>
              </div>
            </div>

            {/* AI Search Results */}
            {(aiResults || isLoadingAI) && (
              <div className="mb-12">
                <AISearchResults 
                  results={aiResults}
                  isLoading={isLoadingAI}
                  onStartRoadmap={handleStartAIRoadmap}
                  searchTerm={searchTerm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsRoadmap;
