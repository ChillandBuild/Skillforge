
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Briefcase, ExternalLink } from 'lucide-react';

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

  return (
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
      <CardContent className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {results}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
          <Button 
            onClick={() => onStartRoadmap(searchTerm)}
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
  );
};

export default AISearchResults;
