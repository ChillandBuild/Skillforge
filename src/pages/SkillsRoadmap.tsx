
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';

const SkillsRoadmap = () => {
  const { addPoints } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const roadmaps = [
    {
      id: 1,
      title: 'Full-Stack Web Developer',
      description: 'Master front-end and back-end development',
      duration: '6-12 months',
      difficulty: 'Intermediate',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database'],
      progress: 25,
      category: 'tech',
      enrolled: true
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
      enrolled: false
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      description: 'Design user-centered digital experiences',
      duration: '4-8 months',
      difficulty: 'Intermediate',
      skills: ['Design Thinking', 'Figma', 'Prototyping', 'User Research'],
      progress: 60,
      category: 'design',
      enrolled: true
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
      enrolled: false
    },
    {
      id: 5,
      title: 'Project Manager',
      description: 'Lead teams and deliver successful projects',
      duration: '3-5 months',
      difficulty: 'Beginner',
      skills: ['Agile', 'Scrum', 'Leadership', 'Communication'],
      progress: 0,
      category: 'business',
      enrolled: false
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

  const handleStartRoadmap = (roadmapId: number) => {
    addPoints(30);
    console.log(`Starting roadmap ${roadmapId}`);
    // Here you would typically update the roadmap enrollment status
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
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
            Skills <span className="text-neon-lime">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose your learning path and master the skills you need for your dream career
          </p>
          
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
                      ? 'bg-neon-lime text-black' 
                      : 'text-white border-gray-600 hover:border-neon-lime'
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
          {filteredRoadmaps.map((roadmap) => (
            <Card key={roadmap.id} className="glass-card border-gray-800 hover:border-neon-lime transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-white">{roadmap.title}</CardTitle>
                  <Badge className={`${getDifficultyColor(roadmap.difficulty)} text-white`}>
                    {roadmap.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{roadmap.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>⏱️ {roadmap.duration}</span>
                  <span>🎯 {roadmap.skills.length} skills</span>
                </div>

                {roadmap.enrolled && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-neon-lime">{roadmap.progress}%</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-2" />
                  </div>
                )}

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
                  className={`w-full glow-button ${
                    roadmap.enrolled 
                      ? 'bg-electric-blue text-black hover:bg-electric-blue/90' 
                      : 'bg-neon-lime text-black hover:bg-neon-lime/90'
                  }`}
                  onClick={() => handleStartRoadmap(roadmap.id)}
                >
                  {roadmap.enrolled ? '📚 Continue Learning' : '🚀 Start Roadmap'}
                </Button>
              </CardContent>
            </Card>
          ))}
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
              <h3 className="text-2xl font-poppins font-bold text-neon-lime mb-4">
                🎯 Can't Find Your Path?
              </h3>
              <p className="text-gray-300 mb-6">
                Request a custom roadmap tailored to your specific career goals and interests.
              </p>
              <Button className="bg-neon-purple text-white glow-button" onClick={() => addPoints(10)}>
                📝 Request Custom Roadmap
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsRoadmap;
