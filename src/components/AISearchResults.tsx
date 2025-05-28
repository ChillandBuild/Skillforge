
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Briefcase, ExternalLink, CheckCircle, GraduationCap, Wrench, Clock, Target, ArrowRight } from 'lucide-react';

interface AISearchResultsProps {
  results: string;
  isLoading: boolean;
  onStartRoadmap: (skill: string) => void;
  searchTerm: string;
}

const AISearchResults = ({ results, isLoading, onStartRoadmap, searchTerm }: AISearchResultsProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800 animate-pulse">
        <CardContent className="p-8 text-center">
          <div className="text-2xl mb-4">🤖</div>
          <p className="text-white">AI is generating your personalized learning roadmap...</p>
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
    const sections = cleanContent.split(/(?=Step-by-Step Learning Path|Beginner Level|Intermediate Level|Advanced Level|Recommended Certifications|Portfolio Project Ideas|Learning Timeline|Top Free Resources|🔹|🎓|🛠)/i);
    
    return sections.filter(section => section.trim().length > 0);
  };

  const formatSection = (section: string, index: number) => {
    const lines = section.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;
    
    const title = lines[0].replace(/^[🔹🎓🛠⚠]\s*/, '').trim();
    const content = lines.slice(1);

    // Determine card color based on content
    let cardColor = 'border-gray-700';
    let iconColor = 'text-white';
    let icon = <BookOpen className="h-5 w-5" />;
    
    if (title.toLowerCase().includes('beginner') || title.toLowerCase().includes('step 1')) {
      cardColor = 'border-gray-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (title.toLowerCase().includes('intermediate') || title.toLowerCase().includes('step 2')) {
      cardColor = 'border-gray-600';
      icon = <Target className="h-5 w-5" />;
    } else if (title.toLowerCase().includes('advanced') || title.toLowerCase().includes('step 3')) {
      cardColor = 'border-gray-600';
      icon = <Award className="h-5 w-5" />;
    } else if (title.toLowerCase().includes('certification')) {
      cardColor = 'border-gray-600';
      icon = <GraduationCap className="h-5 w-5" />;
    } else if (title.toLowerCase().includes('project')) {
      cardColor = 'border-gray-600';
      icon = <Wrench className="h-5 w-5" />;
    }

    return (
      <Card key={index} className={`bg-gray-900 ${cardColor} hover:border-gray-500 transition-colors`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {content.map((line, lineIndex) => {
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{line.replace(/^[•\-]\s*/, '')}</span>
                  </div>
                );
              }
              if (line.trim()) {
                return (
                  <p key={lineIndex} className="text-gray-300 text-sm">{line}</p>
                );
              }
              return null;
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const parsedSections = parseAndFormatAIResults(results);

  return (
    <div className="space-y-6 mt-8">
      {/* Main AI Roadmap Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-white">
              {searchTerm} Learning Roadmap
            </CardTitle>
            <Badge className="bg-white text-black px-3 py-1 rounded-full font-medium">
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
              <Clock className="h-5 w-5 text-gray-400" />
              <span>Adaptive Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-gray-400" />
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

          {/* Formatted AI Response in Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              🤖 Your Complete Learning Roadmap
            </h3>
            <div className="grid gap-4">
              {parsedSections.map((section, index) => formatSection(section, index))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button 
              onClick={handleFindCertifications}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-white hover:text-white hover:bg-white/10 py-3 rounded-xl transition-all duration-300"
            >
              <Award className="mr-2 h-4 w-4" />
              Find Certifications
            </Button>
            <Button 
              onClick={handleExploreProjects}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-white hover:text-white hover:bg-white/10 py-3 rounded-xl transition-all duration-300"
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
