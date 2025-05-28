
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

  const handleFindCertifications = () => {
    const certificationSearchUrl = `https://www.coursera.org/search?query=${encodeURIComponent(searchTerm + ' certification')}&entityTypeDescription=Specializations&entityTypeDescription=Professional%20Certificates`;
    window.open(certificationSearchUrl, '_blank');
  };

  const handleExploreProjects = () => {
    const projectSearchUrl = `https://github.com/search?q=${encodeURIComponent(searchTerm + ' project tutorial')}&type=repositories`;
    window.open(projectSearchUrl, '_blank');
  };

  // Enhanced parsing function to properly format AI results
  const parseAndFormatAIResults = (content: string) => {
    // Remove markdown formatting and clean up the text
    let cleanContent = content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/#{1,6}\s*/g, '') // Remove headers
      .replace(/\*\s*/g, '') // Remove bullet points
      .replace(/→\s*/g, '• ') // Replace arrows with bullet points
      .replace(/\n\s*\n/g, '\n') // Remove extra line breaks
      .trim();

    // Split into sections based on common patterns
    const sections = cleanContent.split(/(?=Step-by-Step Learning Path|Beginner Level|Intermediate Level|Advanced Level|Recommended Certifications|Portfolio Project Ideas|Learning Timeline|Top Free Resources)/i);
    
    return sections.filter(section => section.trim().length > 0);
  };

  const formatSection = (section: string) => {
    const lines = section.split('\n').filter(line => line.trim());
    const title = lines[0];
    const content = lines.slice(1);

    return (
      <div key={title} className="mb-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-3 text-left">{title}</h3>
        <div className="space-y-2 text-left">
          {content.map((line, index) => {
            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
              return (
                <div key={index} className="flex items-start ml-4">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">{line.replace(/^[•\-]\s*/, '')}</span>
                </div>
              );
            }
            return (
              <p key={index} className="text-gray-300 ml-4">{line}</p>
            );
          })}
        </div>
      </div>
    );
  };

  const parsedSections = parseAndFormatAIResults(results);

  return (
    <div className="space-y-6">
      {/* Main AI Roadmap Card */}
      <Card className="bg-gray-900 border-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-white text-left">
              {searchTerm} Learning Roadmap
            </CardTitle>
            <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full font-medium">
              AI Generated
            </Badge>
          </div>
          <p className="text-gray-400 text-lg text-left">
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
          <div className="text-left">
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

          {/* Formatted AI Response */}
          <div className="bg-gradient-to-r from-cyan-400/10 to-emerald-500/10 rounded-xl p-6 border border-cyan-400/30">
            <h3 className="flex items-center text-xl font-semibold text-cyan-400 mb-6 text-left">
              🤖 Your Complete Learning Roadmap
            </h3>
            <div className="space-y-6 text-left">
              {parsedSections.map((section, index) => formatSection(section))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AISearchResults;
