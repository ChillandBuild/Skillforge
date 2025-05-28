
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Briefcase, ExternalLink, CheckCircle, GraduationCap, Wrench, Clock, Target } from 'lucide-react';

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

  const handleFindCertifications = () => {
    const certificationSearchUrl = `https://www.coursera.org/search?query=${encodeURIComponent(searchTerm + ' certification')}&entityTypeDescription=Specializations&entityTypeDescription=Professional%20Certificates`;
    window.open(certificationSearchUrl, '_blank');
  };

  const handleExploreProjects = () => {
    const projectSearchUrl = `https://github.com/search?q=${encodeURIComponent(searchTerm + ' project tutorial')}&type=repositories`;
    window.open(projectSearchUrl, '_blank');
  };

  // Parse the AI results to extract sections
  const parseAIResults = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    let currentSection = '';
    const sections: { [key: string]: string[] } = {};
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.includes('Step ') && trimmedLine.includes(':')) {
        currentSection = 'steps';
        if (!sections[currentSection]) sections[currentSection] = [];
        sections[currentSection].push(trimmedLine);
      } else if (trimmedLine.toLowerCase().includes('certification')) {
        currentSection = 'certifications';
        if (!sections[currentSection]) sections[currentSection] = [];
        sections[currentSection].push(trimmedLine);
      } else if (trimmedLine.startsWith('→') || trimmedLine.startsWith('-')) {
        if (currentSection && sections[currentSection]) {
          sections[currentSection].push(trimmedLine);
        }
      }
    });
    
    return sections;
  };

  const parsedResults = parseAIResults(results);

  return (
    <div className="space-y-6">
      {/* Main AI Roadmap Card - Styled like the reference */}
      <Card className="bg-gray-900 border-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-white">
              {searchTerm}
            </CardTitle>
            <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full font-medium">
              AI Generated
            </Badge>
          </div>
          <p className="text-gray-400 text-lg">
            Personalized learning path powered by AI
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Duration and Skills Info */}
          <div className="flex items-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span>Adaptive Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-pink-400" />
              <span>AI Curated Skills</span>
            </div>
          </div>

          {/* Key Skills Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Key Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {searchTerm.split(' ').map((skill, index) => (
                <Badge 
                  key={index}
                  className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Steps */}
          {parsedResults.steps && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="flex items-center text-xl font-semibold text-cyan-400 mb-4">
                <BookOpen className="mr-3 h-6 w-6" />
                Your Learning Path
              </h3>
              <div className="space-y-4">
                {parsedResults.steps.map((step, index) => (
                  <div key={index} className="border-l-4 border-cyan-400 pl-4">
                    <div className="text-white font-medium">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {parsedResults.certifications && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="flex items-center text-xl font-semibold text-emerald-400 mb-4">
                <Award className="mr-3 h-6 w-6" />
                Recommended Certifications
              </h3>
              <div className="space-y-2">
                {parsedResults.certifications.map((cert, index) => (
                  <div key={index} className="text-gray-300">{cert}</div>
                ))}
              </div>
            </div>
          )}

          {/* Full AI Response */}
          <div className="bg-gradient-to-r from-cyan-400/10 to-emerald-500/10 rounded-xl p-6 border border-cyan-400/30">
            <h3 className="flex items-center text-xl font-semibold text-cyan-400 mb-4">
              🤖 Complete AI Roadmap
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed bg-gray-900/30 rounded-lg p-4 border border-gray-600">
                {results}
              </div>
            </div>
          </div>

          {/* Action Buttons - Styled like the reference */}
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={handleCreateRoadmap}
              className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold py-4 rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 text-lg"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              🚀 Start Learning Free
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleFindCertifications}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/10 py-3 rounded-xl transition-all duration-300"
              >
                <Award className="mr-2 h-4 w-4" />
                Find Certifications
              </Button>
              <Button 
                onClick={handleExploreProjects}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 hover:bg-purple-400/10 py-3 rounded-xl transition-all duration-300"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Explore Projects
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Format Card */}
      <Card className="glass-card border-gray-800 bg-gradient-to-br from-emerald-400/5 to-cyan-500/5">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-emerald-400">
            <GraduationCap className="mr-3 h-5 w-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* What You Do Section */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <h3 className="flex items-center text-lg font-semibold text-white mb-3">
              🔍 What You Do
            </h3>
            <p className="text-gray-300 leading-relaxed">
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
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  Step-by-step learning roadmap using free top-rated online courses (Coursera, YouTube, edX, Udemy, etc.)
                </div>
              </div>
              <div className="flex items-start">
                <Award className="mr-3 h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  Certification suggestions from trusted sources (Google, IBM, AWS, etc.)
                </div>
              </div>
              <div className="flex items-start">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISearchResults;
