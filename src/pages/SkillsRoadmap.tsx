import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

const SkillsRoadmap = () => {
  const { addPoints } = useGame();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledRoadmaps, setEnrolledRoadmaps] = useState<number[]>([]);

  const roadmaps = [
    {
      id: 1,
      title: 'Full-Stack Web Developer',
      description: 'Master front-end and back-end development',
      duration: '6-12 months',
      difficulty: 'Intermediate',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database'],
      progress: 0,
      category: 'tech',
      learningUrl: 'https://www.freecodecamp.org/learn/responsive-web-design/'
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      description: 'Learn modern digital marketing strategies',
      duration: '3-6 months',
      difficulty: 'Beginner',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      progress: 0,
      category: 'marketing',
      learningUrl: 'https://www.coursera.org/learn/introduction-digital-marketing'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      description: 'Design user-centered digital experiences',
      duration: '4-8 months',
      difficulty: 'Intermediate',
      skills: ['Design Thinking', 'Figma', 'Prototyping', 'User Research'],
      progress: 0,
      category: 'design',
      learningUrl: 'https://www.coursera.org/learn/ui-ux-design'
    },
    {
      id: 4,
      title: 'Data Analyst',
      description: 'Analyze data to drive business decisions',
      duration: '4-6 months',
      difficulty: 'Intermediate',
      skills: ['Excel', 'SQL', 'Python', 'Data Visualization'],
      progress: 0,
      category: 'data',
      learningUrl: 'https://www.kaggle.com/learn'
    },
    {
      id: 5,
      title: 'AI Engineer',
      description: 'Build intelligent systems and machine learning models',
      duration: '8-12 months',
      difficulty: 'Advanced',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Neural Networks'],
      progress: 0,
      category: 'tech',
      learningUrl: 'https://www.coursera.org/learn/machine-learning'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'tech', name: 'Technology' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data', name: 'Data Science' },
    { id: 'business', name: 'Business' }
  ];

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleStartRoadmap = (roadmap: typeof roadmaps[0]) => {
    // Add to enrolled roadmaps
    setEnrolledRoadmaps(prev => [...prev, roadmap.id]);
    
    // Add points for starting a roadmap
    addPoints(30);
    
    // Show success toast
    toast({
      title: "🚀 Learning Started!",
      description: `You've enrolled in ${roadmap.title}. Opening learning resources...`,
    });
    
    // Open the learning URL in a new tab
    setTimeout(() => {
      window.open(roadmap.learningUrl, '_blank');
    }, 1000);
    
    console.log(`Started roadmap: ${roadmap.title}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500';
      case 'Intermediate': return 'bg-amber-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            Learn Skills <span className="text-cyan-400">Anywhere</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Skip the college debt. Master in-demand skills with free online resources.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Build your career from anywhere in the world with just an internet connection
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Badge className="bg-cyan-400 text-black text-lg px-4 py-2">
              🆓 100% Free Resources
            </Badge>
            <Badge className="bg-emerald-500 text-black text-lg px-4 py-2">
              🌍 Learn From Home
            </Badge>
            <Badge className="bg-amber-500 text-black text-lg px-4 py-2">
              🚀 No Degree Required
            </Badge>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search roadmaps, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-cyan-400 text-black hover:bg-cyan-500' 
                      : 'text-white border-gray-600 hover:border-cyan-400'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadmaps.map((roadmap) => {
            const isEnrolled = enrolledRoadmaps.includes(roadmap.id);
            
            return (
              <Card key={roadmap.id} className="glass-card border-gray-800 hover:border-cyan-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-white">{roadmap.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getDifficultyColor(roadmap.difficulty)} text-white`}>
                        {roadmap.difficulty}
                      </Badge>
                      {isEnrolled && (
                        <Badge className="bg-green-500 text-white">
                          Enrolled
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{roadmap.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>⏱️ {roadmap.duration}</span>
                    <span>🎯 {roadmap.skills.length} skills</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {roadmap.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className={`w-full font-semibold ${
                      isEnrolled 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gradient-to-r from-cyan-400 to-emerald-500 text-black hover:from-cyan-500 hover:to-emerald-600 glow-button'
                    }`}
                    onClick={() => handleStartRoadmap(roadmap)}
                  >
                    {isEnrolled ? '✅ Continue Learning' : '🚀 Start Learning Free'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No roadmaps found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="glass-card border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-cyan-400 mb-4">
                🎯 Ready to Transform Your Future?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands who've built successful careers using only free online resources. 
                No student loans, no classroom limits - just you, your determination, and the internet.
              </p>
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold glow-button" onClick={() => addPoints(10)}>
                📝 Request Custom Learning Path
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsRoadmap;
