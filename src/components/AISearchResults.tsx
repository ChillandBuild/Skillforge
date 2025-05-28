
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Briefcase, ExternalLink, CheckCircle, GraduationCap, Wrench } from 'lucide-react';

interface AISearchResultsProps {
  results: string;
  isLoading: boolean;
  onStartRoadmap: (skill: string) => void;
  searchTerm: string;
}

const AISearchResults = ({ results, isLoading, onStartRoadmap, searchTerm }: AISearchResultsProps) => {
  if (isLoading) {
    return (
      <Card className="glass-card border-gray-800 animate-pulse">
        <CardContent className="p-8 text-center">
          <div className="text-2xl mb-4">🤖</div>
          <p className="text-cyan-400">AI is generating your personalized learning roadmap...</p>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  const handleCreateRoadmap = () => {
    onStartRoadmap(searchTerm);
  };

  // Parse the AI results into structured format
  const formatAIResults = (rawResults: string) => {
    const sections = rawResults.split('---').map(section => section.trim());
    
    return {
      whatYouDo: "Just type a course name or skill you want to learn.\nExamples: Data Science, Python, UX Design, Cloud Computing, AI Ethics",
      whatAIDelivers: [
        "✅ Step-by-step learning roadmap using free top-rated online courses (Coursera, YouTube, edX, Udemy, etc.)",
        "🎓 Certification suggestions from trusted sources (Google, IBM, AWS, etc.)",
        "🛠 Real-world project ideas (beginner → advanced) to build your portfolio"
      ],
      roadmapSteps: rawResults
    };
  };

  const formattedData = formatAIResults(results);

  return (
    <div className="space-y-6">
      {/* Main AI Results Card */}
      <Card className="glass-card border-gray-800 bg-gradient-to-br from-cyan-400/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-cyan-400">
            <BookOpen className="mr-3 h-6 w-6" />
            AI-Generated Learning Path: {searchTerm}
          </CardTitle>
          <Badge className="w-fit bg-emerald-500 text-white">
            ✨ Powered by AI
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* What You Do Section */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <h3 className="flex items-center text-lg font-semibold text-white mb-3">
              🔍 What You Do
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {formattedData.whatYouDo}
            </p>
          </div>

          {/* What Our AI Delivers Section */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <h3 className="flex items-center text-lg font-semibold text-white mb-4">
              🤖 What Our AI Delivers
            </h3>
            <div className="space-y-3">
              {formattedData.whatAIDelivers.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-gray-300 leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Generated Roadmap Section */}
          <div className="bg-gradient-to-r from-cyan-400/10 to-emerald-500/10 rounded-lg p-6 border border-cyan-400/30">
            <h3 className="flex items-center text-lg font-semibold text-cyan-400 mb-4">
              🚀 Your Personalized Roadmap for: {searchTerm}
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed bg-gray-900/30 rounded-lg p-4 border border-gray-600">
                {formattedData.roadmapSteps}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
            <Button 
              onClick={handleCreateRoadmap}
              className="bg-cyan-400 text-black hover:bg-cyan-500 glow-button"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Create Custom Roadmap
            </Button>
            <Button 
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
            >
              <Award className="mr-2 h-4 w-4" />
              Find Certifications
            </Button>
            <Button 
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Explore Projects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Format Card */}
      <Card className="glass-card border-gray-800 bg-gradient-to-br from-emerald-400/5 to-cyan-500/5">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-emerald-400">
            <GraduationCap className="mr-3 h-5 w-5" />
            Example Output Format
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Example Steps */}
          <div className="space-y-4">
            <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h4 className="font-semibold text-white mb-2">Step 1: Learn Python Basics</h4>
              <p className="text-gray-300 text-sm">→ FreeCodeCamp YouTube Course</p>
            </div>
            
            <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Step 2: Intermediate Projects</h4>
              <p className="text-gray-300 text-sm">→ Build a calculator, to-do app, or data scraper</p>
            </div>
            
            <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="font-semibold text-white mb-2">Step 3: Advanced Projects</h4>
              <p className="text-gray-300 text-sm">→ Create a Flask web app, automate Excel reports, integrate APIs</p>
            </div>
            
            <div className="bg-gray-900/40 rounded-lg p-4 border-l-4 border-amber-500">
              <h4 className="font-semibold text-white mb-2">Certifications:</h4>
              <div className="space-y-1 text-gray-300 text-sm">
                <p>→ Google Python Certificate</p>
                <p>→ IBM Python for Data Science (Coursera)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISearchResults;
