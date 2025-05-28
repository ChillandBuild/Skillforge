import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, BookOpen, Clock, CheckCircle, Search, Sparkles } from 'lucide-react';
import AISearchResults from '@/components/AISearchResults';
import APIKeyInput from '@/components/APIKeyInput';
import { generateLearningPath } from '@/services/perplexityService';

const SkillsRoadmap = () => {
  const { addPoints } = useGame();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledRoadmaps, setEnrolledRoadmaps] = useState<number[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<number | null>(null);
  const [aiResults, setAiResults] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showAPIKeyInput, setShowAPIKeyInput] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('perplexity_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

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
      roadmapSteps: [
        {
          phase: 'Phase 1: Web Fundamentals',
          duration: '2-3 months',
          topics: [
            { name: 'HTML Basics', resources: ['MDN HTML Guide', 'freeCodeCamp HTML Course'], completed: false },
            { name: 'CSS Styling', resources: ['CSS-Tricks', 'Flexbox Froggy Game', 'Grid Garden'], completed: false },
            { name: 'JavaScript Fundamentals', resources: ['JavaScript.info', 'Eloquent JavaScript Book'], completed: false },
            { name: 'Version Control', resources: ['Git Tutorial', 'GitHub Learning Lab'], completed: false }
          ]
        },
        {
          phase: 'Phase 2: Frontend Development',
          duration: '2-3 months',
          topics: [
            { name: 'Advanced JavaScript', resources: ['You Don\'t Know JS', 'JavaScript30 Course'], completed: false },
            { name: 'React Fundamentals', resources: ['React Official Tutorial', 'React Beta Docs'], completed: false },
            { name: 'State Management', resources: ['Redux Toolkit Guide', 'Context API Tutorial'], completed: false },
            { name: 'Build Tools', resources: ['Vite Documentation', 'Webpack Guide'], completed: false }
          ]
        },
        {
          phase: 'Phase 3: Backend Development',
          duration: '2-3 months',
          topics: [
            { name: 'Node.js Basics', resources: ['Node.js Official Guide', 'Express.js Tutorial'], completed: false },
            { name: 'Database Management', resources: ['MongoDB University', 'PostgreSQL Tutorial'], completed: false },
            { name: 'API Development', resources: ['REST API Guide', 'GraphQL Tutorial'], completed: false },
            { name: 'Authentication', resources: ['JWT Guide', 'Passport.js Documentation'], completed: false }
          ]
        },
        {
          phase: 'Phase 4: Full-Stack Integration',
          duration: '1-2 months',
          topics: [
            { name: 'Project Architecture', resources: ['Clean Architecture Guide', 'MVC Pattern Tutorial'], completed: false },
            { name: 'Testing', resources: ['Jest Documentation', 'Testing Library Guide'], completed: false },
            { name: 'Deployment', resources: ['Vercel Guide', 'Netlify Documentation', 'Docker Basics'], completed: false },
            { name: 'Portfolio Projects', resources: ['Build 3-5 Full-Stack Projects', 'GitHub Portfolio Setup'], completed: false }
          ]
        }
      ]
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
      roadmapSteps: [
        {
          phase: 'Phase 1: Marketing Fundamentals',
          duration: '1 month',
          topics: [
            { name: 'Marketing Basics', resources: ['Google Digital Marketing Course', 'HubSpot Academy'], completed: false },
            { name: 'Consumer Psychology', resources: ['Psychology of Marketing', 'Behavioral Economics'], completed: false },
            { name: 'Brand Strategy', resources: ['Brand Building Guide', 'Logo Design Principles'], completed: false }
          ]
        },
        {
          phase: 'Phase 2: Digital Channels',
          duration: '2-3 months',
          topics: [
            { name: 'SEO Fundamentals', resources: ['Moz SEO Guide', 'Google SEO Starter Guide'], completed: false },
            { name: 'Social Media Marketing', resources: ['Facebook Blueprint', 'LinkedIn Learning'], completed: false },
            { name: 'Content Marketing', resources: ['Content Marketing Institute', 'Copywriting Guide'], completed: false },
            { name: 'Email Marketing', resources: ['Mailchimp Academy', 'Email Marketing Guide'], completed: false }
          ]
        },
        {
          phase: 'Phase 3: Analytics & Optimization',
          duration: '1-2 months',
          topics: [
            { name: 'Google Analytics', resources: ['Google Analytics Academy', 'GA4 Complete Guide'], completed: false },
            { name: 'PPC Advertising', resources: ['Google Ads Course', 'Facebook Ads Guide'], completed: false },
            { name: 'Conversion Optimization', resources: ['A/B Testing Guide', 'Landing Page Optimization'], completed: false }
          ]
        }
      ]
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
      roadmapSteps: [
        {
          phase: 'Phase 1: Design Fundamentals',
          duration: '2 months',
          topics: [
            { name: 'Design Principles', resources: ['Design Elements & Principles', 'Typography Guide'], completed: false },
            { name: 'Color Theory', resources: ['Adobe Color Guide', 'Color Psychology'], completed: false },
            { name: 'Design Thinking', resources: ['IDEO Design Kit', 'Stanford d.school Resources'], completed: false }
          ]
        },
        {
          phase: 'Phase 2: Tools & Software',
          duration: '1-2 months',
          topics: [
            { name: 'Figma Mastery', resources: ['Figma Academy', 'Figma YouTube Channel'], completed: false },
            { name: 'Adobe Creative Suite', resources: ['Adobe Tutorials', 'Photoshop Basics'], completed: false },
            { name: 'Prototyping Tools', resources: ['InVision Guide', 'Principle for Mac'], completed: false }
          ]
        },
        {
          phase: 'Phase 3: UX Research',
          duration: '1-2 months',
          topics: [
            { name: 'User Research Methods', resources: ['Nielsen Norman Group', 'UX Research Guide'], completed: false },
            { name: 'Usability Testing', resources: ['Steve Krug\'s Book', 'UserTesting Guide'], completed: false },
            { name: 'Information Architecture', resources: ['IA Institute', 'Card Sorting Guide'], completed: false }
          ]
        },
        {
          phase: 'Phase 4: Portfolio & Practice',
          duration: '2-3 months',
          topics: [
            { name: 'Portfolio Development', resources: ['Behance Examples', 'Dribbble Inspiration'], completed: false },
            { name: 'Case Study Writing', resources: ['UX Case Study Guide', 'Medium UX Articles'], completed: false },
            { name: 'Design Systems', resources: ['Material Design', 'Atomic Design Methodology'], completed: false }
          ]
        }
      ]
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
      roadmapSteps: [
        {
          phase: 'Phase 1: Data Fundamentals',
          duration: '1-2 months',
          topics: [
            { name: 'Statistics Basics', resources: ['Khan Academy Statistics', 'StatQuest YouTube'], completed: false },
            { name: 'Excel Advanced', resources: ['ExcelJet Tutorials', 'Microsoft Excel Training'], completed: false },
            { name: 'Data Cleaning', resources: ['Data Cleaning Guide', 'OpenRefine Tutorial'], completed: false }
          ]
        },
        {
          phase: 'Phase 2: Programming & SQL',
          duration: '2 months',
          topics: [
            { name: 'SQL Fundamentals', resources: ['W3Schools SQL', 'SQLBolt Interactive'], completed: false },
            { name: 'Python for Data', resources: ['Python.org Tutorial', 'Automate the Boring Stuff'], completed: false },
            { name: 'Pandas & NumPy', resources: ['Pandas Documentation', '10 Minutes to Pandas'], completed: false }
          ]
        },
        {
          phase: 'Phase 3: Data Visualization',
          duration: '1-2 months',
          topics: [
            { name: 'Matplotlib & Seaborn', resources: ['Matplotlib Tutorials', 'Seaborn Gallery'], completed: false },
            { name: 'Tableau Public', resources: ['Tableau Learning', 'Tableau Public Gallery'], completed: false },
            { name: 'Power BI', resources: ['Microsoft Power BI Learning', 'Guy in a Cube YouTube'], completed: false }
          ]
        }
      ]
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
      roadmapSteps: [
        {
          phase: 'Phase 1: Programming Foundation',
          duration: '2-3 months',
          topics: [
            { name: 'Python Mastery', resources: ['Python.org Tutorial', 'Real Python'], completed: false },
            { name: 'Mathematics for ML', resources: ['Khan Academy Linear Algebra', '3Blue1Brown Calculus'], completed: false },
            { name: 'Statistics & Probability', resources: ['Think Stats Book', 'Probability Course'], completed: false }
          ]
        },
        {
          phase: 'Phase 2: Machine Learning',
          duration: '3-4 months',
          topics: [
            { name: 'ML Fundamentals', resources: ['Andrew Ng Course', 'Scikit-learn Documentation'], completed: false },
            { name: 'Deep Learning', resources: ['Deep Learning Specialization', 'Fast.ai Course'], completed: false },
            { name: 'Neural Networks', resources: ['Neural Networks and Deep Learning', '3Blue1Brown NN Series'], completed: false }
          ]
        },
        {
          phase: 'Phase 3: Advanced AI',
          duration: '2-3 months',
          topics: [
            { name: 'TensorFlow/PyTorch', resources: ['TensorFlow Tutorials', 'PyTorch Documentation'], completed: false },
            { name: 'Computer Vision', resources: ['OpenCV Tutorial', 'CS231n Stanford Course'], completed: false },
            { name: 'Natural Language Processing', resources: ['NLTK Documentation', 'Hugging Face Course'], completed: false }
          ]
        },
        {
          phase: 'Phase 4: Deployment & MLOps',
          duration: '1-2 months',
          topics: [
            { name: 'Model Deployment', resources: ['Flask for ML', 'Docker for Data Science'], completed: false },
            { name: 'MLOps Practices', resources: ['MLflow Tutorial', 'Kubeflow Guide'], completed: false },
            { name: 'AI Ethics', resources: ['AI Ethics Course', 'Responsible AI Practices'], completed: false }
          ]
        }
      ]
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

  const handleAISearch = async (term: string) => {
    if (!apiKey && !showAPIKeyInput) {
      setShowAPIKeyInput(true);
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to use AI search.",
        variant: "destructive",
      });
      return;
    }

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
        description: "Failed to generate AI learning path. Please check your API key.",
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

  const handleApiKeySubmit = (newApiKey: string) => {
    setApiKey(newApiKey);
    setShowAPIKeyInput(false);
    if (searchTerm.trim()) {
      handleAISearch(searchTerm.trim());
    }
  };

  const handleStartRoadmap = (roadmap: typeof roadmaps[0]) => {
    setEnrolledRoadmaps(prev => [...prev, roadmap.id]);
    setSelectedRoadmap(roadmap.id);
    addPoints(30);
    
    toast({
      title: "🚀 Learning Started!",
      description: `You've enrolled in ${roadmap.title}. View your personalized roadmap below.`,
    });
    
    console.log(`Started roadmap: ${roadmap.title}`);
  };

  const handleStartAIRoadmap = (skill: string) => {
    // Create a custom roadmap for AI-generated content
    const customRoadmap = {
      id: Date.now(), // Use timestamp as unique ID
      title: `AI-Generated: ${skill}`,
      description: `Personalized learning path for ${skill}`,
      duration: 'Varies',
      difficulty: 'Adaptive',
      skills: [skill],
      progress: 0,
      category: 'ai-generated',
      roadmapSteps: []
    };
    
    setEnrolledRoadmaps(prev => [...prev, customRoadmap.id]);
    setSelectedRoadmap(customRoadmap.id);
    addPoints(30);
    
    toast({
      title: "🤖 AI Roadmap Created!",
      description: `Your personalized learning path for ${skill} is ready.`,
    });
    
    console.log(`Started AI roadmap: ${skill}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500';
      case 'Intermediate': return 'bg-amber-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const currentRoadmap = selectedRoadmap ? roadmaps.find(r => r.id === selectedRoadmap) : null;

  if (selectedRoadmap && currentRoadmap) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => setSelectedRoadmap(null)}
            className="mb-6 text-white border-gray-600 hover:border-cyan-400"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          {/* Roadmap Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold mb-4 text-white">
              {currentRoadmap.title} <span className="text-cyan-400">Roadmap</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">{currentRoadmap.description}</p>
            <div className="flex justify-center gap-4 mb-6">
              <Badge className={`${getDifficultyColor(currentRoadmap.difficulty)} text-white`}>
                {currentRoadmap.difficulty}
              </Badge>
              <Badge className="bg-cyan-400 text-black">
                <Clock className="mr-1 h-3 w-3" />
                {currentRoadmap.duration}
              </Badge>
            </div>
          </div>

          {/* Learning Path */}
          <div className="space-y-6">
            {currentRoadmap.roadmapSteps.map((phase, phaseIndex) => (
              <Card key={phaseIndex} className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-400 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {phase.phase}
                  </CardTitle>
                  <p className="text-gray-400">Duration: {phase.duration}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-white">{topic.name}</h4>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400 mb-2">Recommended Resources:</p>
                          <div className="flex flex-wrap gap-2">
                            {topic.resources.map((resource, resourceIndex) => (
                              <Badge 
                                key={resourceIndex} 
                                variant="outline" 
                                className="text-xs border-gray-600 text-gray-300"
                              >
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Tracking */}
          <Card className="glass-card border-gray-800 mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Overall Completion</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-sm text-gray-500">
                  Start learning and track your progress through each phase!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            
            {/* API Key Input */}
            {showAPIKeyInput && (
              <div className="mb-8">
                <APIKeyInput onApiKeySubmit={handleApiKeySubmit} />
              </div>
            )}

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
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-cyan-400 text-black hover:bg-cyan-500' 
                      : 'text-white border-gray-600 hover:border-cyan-400 hover:text-cyan-400'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-built Roadmap Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-poppins font-bold text-center mb-8 text-white">
            Or Choose from <span className="text-cyan-400">Pre-Built Roadmaps</span>
          </h2>
        </div>

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
                    {isEnrolled ? '📖 View Roadmap' : '🚀 Start Learning Free'}
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
      </div>
    </div>
  );
};

export default SkillsRoadmap;
