
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { Search, Sparkles, CheckCircle, Award, Wrench } from 'lucide-react';
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

            {/* How It Works Card */}
            <Card className="glass-card border-gray-800 bg-gradient-to-br from-emerald-400/5 to-cyan-500/5 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-emerald-400">
                  <Sparkles className="mr-3 h-5 w-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* What You Do Section */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="flex items-center text-lg font-semibold text-white mb-3">
                    🔍 What You Do
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-left">
                    Just type a course name or skill you want to learn.<br />
                    Examples: Data Science, Python, UX Design, Cloud Computing, AI Ethics
                  </p>
                </div>

                {/* What Our AI Delivers Section */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="flex items-center text-lg font-semibold text-white mb-4">
                    🤖 What Our AI Delivers
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-left">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-gray-300">
                        Step-by-step learning roadmap using free top-rated online courses (Coursera, YouTube, edX, Udemy, etc.)
                      </div>
                    </div>
                    <div className="flex items-start text-left">
                      <Award className="mr-3 h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="text-gray-300">
                        Certification suggestions from trusted sources (Google, IBM, AWS, etc.)
                      </div>
                    </div>
                    <div className="flex items-start text-left">
                      <Wrench className="mr-3 h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-gray-300">
                        Real-world project ideas (beginner → advanced) to build your portfolio
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example Output */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="flex items-center text-lg font-semibold text-white mb-4">
                    🚀 Example Output for: Python
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-emerald-500 text-left">
                      <h4 className="font-semibold text-white mb-2">Step 1: Learn Python Basics</h4>
                      <p className="text-gray-300 text-sm">• FreeCodeCamp YouTube Course</p>
                    </div>
                    
                    <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-cyan-500 text-left">
                      <h4 className="font-semibold text-white mb-2">Step 2: Intermediate Projects</h4>
                      <p className="text-gray-300 text-sm">• Build a calculator, to-do app, or data scraper</p>
                    </div>
                    
                    <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-purple-500 text-left">
                      <h4 className="font-semibold text-white mb-2">Step 3: Advanced Projects</h4>
                      <p className="text-gray-300 text-sm">• Create a Flask web app, automate Excel reports, integrate APIs</p>
                    </div>
                    
                    <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-amber-500 text-left">
                      <h4 className="font-semibold text-white mb-2">Certifications:</h4>
                      <div className="space-y-1 text-gray-300 text-sm text-left">
                        <p>• Google Python Certificate</p>
                        <p>• IBM Python for Data Science (Coursera)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
