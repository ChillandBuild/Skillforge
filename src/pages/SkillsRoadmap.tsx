
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  resources: string[];
  skills: string[];
  completed: boolean;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: RoadmapStep[];
}

const SkillsRoadmap = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const roadmaps: Roadmap[] = [
    {
      id: 'fullstack-web',
      title: 'Full-Stack Web Developer',
      description: 'Complete roadmap from HTML basics to deploying full-stack applications',
      duration: '6-9 months',
      difficulty: 'Beginner',
      steps: [
        {
          id: 'step1',
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the building blocks of web development',
          duration: '3-4 weeks',
          resources: [
            'freeCodeCamp HTML/CSS Course',
            'MDN Web Docs',
            'CSS Grid Garden Game',
            'Flexbox Froggy Game'
          ],
          skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
          completed: false
        },
        {
          id: 'step2',
          title: 'JavaScript Fundamentals',
          description: 'Master the programming language of the web',
          duration: '4-5 weeks',
          resources: [
            'JavaScript.info',
            'freeCodeCamp JavaScript Course',
            'Eloquent JavaScript (Book)',
            'JavaScript30 by Wes Bos'
          ],
          skills: ['Variables', 'Functions', 'Objects', 'Arrays', 'DOM Manipulation'],
          completed: false
        },
        {
          id: 'step3',
          title: 'React Framework',
          description: 'Build interactive user interfaces with React',
          duration: '5-6 weeks',
          resources: [
            'React Official Tutorial',
            'freeCodeCamp React Course',
            'React Documentation',
            'Scrimba React Course'
          ],
          skills: ['Components', 'Props', 'State', 'Hooks', 'Router'],
          completed: false
        },
        {
          id: 'step4',
          title: 'Backend Development',
          description: 'Learn server-side programming with Node.js',
          duration: '4-5 weeks',
          resources: [
            'Node.js Official Guide',
            'Express.js Tutorial',
            'freeCodeCamp Backend Course',
            'MongoDB University'
          ],
          skills: ['Node.js', 'Express', 'APIs', 'Databases', 'Authentication'],
          completed: false
        },
        {
          id: 'step5',
          title: 'Full-Stack Projects',
          description: 'Build complete applications and deploy them',
          duration: '6-8 weeks',
          resources: [
            'The Odin Project',
            'Netlify Deployment Guide',
            'Heroku Documentation',
            'GitHub Pages Tutorial'
          ],
          skills: ['Project Planning', 'Git/GitHub', 'Deployment', 'Testing'],
          completed: false
        }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      description: 'From Python basics to machine learning and data visualization',
      duration: '8-12 months',
      difficulty: 'Intermediate',
      steps: [
        {
          id: 'ds-step1',
          title: 'Python Programming',
          description: 'Master Python for data analysis',
          duration: '4-5 weeks',
          resources: [
            'Python.org Tutorial',
            'Codecademy Python Course',
            'Python for Everybody (Coursera)',
            'Automate the Boring Stuff'
          ],
          skills: ['Python Syntax', 'Data Types', 'Control Flow', 'Functions', 'Libraries'],
          completed: false
        },
        {
          id: 'ds-step2',
          title: 'Data Analysis Libraries',
          description: 'Learn pandas, NumPy, and data manipulation',
          duration: '3-4 weeks',
          resources: [
            'Pandas Documentation',
            'NumPy Quickstart',
            'Kaggle Learn Pandas',
            'Python Data Science Handbook'
          ],
          skills: ['Pandas', 'NumPy', 'Data Cleaning', 'Data Manipulation'],
          completed: false
        },
        {
          id: 'ds-step3',
          title: 'Statistics & Mathematics',
          description: 'Build statistical foundation for data science',
          duration: '5-6 weeks',
          resources: [
            'Khan Academy Statistics',
            'Think Stats (Book)',
            'Statistics for Data Science (Coursera)',
            'StatQuest YouTube Channel'
          ],
          skills: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Regression'],
          completed: false
        }
      ]
    },
    {
      id: 'ux-design',
      title: 'UX/UI Design',
      description: 'Create beautiful and intuitive user experiences',
      duration: '4-6 months',
      difficulty: 'Beginner',
      steps: [
        {
          id: 'ux-step1',
          title: 'Design Principles',
          description: 'Learn fundamental design theory and principles',
          duration: '2-3 weeks',
          resources: [
            'Google Design Course',
            'Design Better by InVision',
            'The Design of Everyday Things',
            'Material Design Guidelines'
          ],
          skills: ['Design Theory', 'Color Theory', 'Typography', 'Layout'],
          completed: false
        },
        {
          id: 'ux-step2',
          title: 'User Research',
          description: 'Understand users through research and testing',
          duration: '3-4 weeks',
          resources: [
            'IDEO Design Kit',
            'User Research Course (Coursera)',
            'Nielsen Norman Group Articles',
            'UXPin User Research Guide'
          ],
          skills: ['User Interviews', 'Personas', 'User Journey Mapping', 'Usability Testing'],
          completed: false
        }
      ]
    }
  ];

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getProgress = (roadmap: Roadmap) => {
    const completed = roadmap.steps.filter(step => completedSteps.includes(step.id)).length;
    return (completed / roadmap.steps.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-neon-lime';
      case 'Intermediate': return 'text-yellow-500';
      case 'Advanced': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (selectedRoadmap) {
    const progress = getProgress(selectedRoadmap);
    
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setSelectedRoadmap(null)}
            variant="outline" 
            className="mb-6 border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
          >
            ← Back to Roadmaps
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold mb-4 text-neon-lime">
              {selectedRoadmap.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{selectedRoadmap.description}</p>
            
            <div className="flex justify-center items-center gap-6 mb-6">
              <Badge className={`${getDifficultyColor(selectedRoadmap.difficulty)} border-current`} variant="outline">
                {selectedRoadmap.difficulty}
              </Badge>
              <div className="text-electric-blue font-semibold">
                🕒 {selectedRoadmap.duration}
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-neon-lime">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </div>

          {/* Roadmap Steps */}
          <div className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {selectedRoadmap.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                
                return (
                  <AccordionItem key={step.id} value={step.id}>
                    <Card className={`glass-card transition-all ${
                      isCompleted ? 'border-neon-lime' : 'border-gray-800'
                    }`}>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-4 w-full">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            isCompleted ? 'bg-neon-lime text-black' : 'bg-gray-700 text-white'
                          }`}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className={`text-lg font-poppins font-bold ${
                              isCompleted ? 'text-neon-lime' : 'text-white'
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                          <Badge variant="outline" className="border-electric-blue text-electric-blue">
                            {step.duration}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent>
                        <div className="px-6 pb-6 space-y-6">
                          {/* Skills */}
                          <div>
                            <h4 className="font-semibold text-neon-purple mb-3">🎯 Skills You'll Learn</h4>
                            <div className="flex flex-wrap gap-2">
                              {step.skills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-gray-800 text-neon-lime">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Resources */}
                          <div>
                            <h4 className="font-semibold text-electric-blue mb-3">📚 Learning Resources</h4>
                            <ul className="space-y-2">
                              {step.resources.map((resource, idx) => (
                                <li key={idx} className="text-gray-300 flex items-center gap-2">
                                  <span className="text-neon-lime">•</span>
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Button */}
                          <Button
                            onClick={() => toggleStepCompletion(step.id)}
                            className={`w-full ${
                              isCompleted 
                                ? 'bg-neon-lime text-black hover:bg-neon-lime/90' 
                                : 'bg-gray-800 text-neon-lime border border-gray-700 hover:bg-neon-lime hover:text-black'
                            }`}
                          >
                            {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                          </Button>
                        </div>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <Card className="glass-card border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-poppins font-bold text-coral mb-4">
                  🎉 Complete This Roadmap to Unlock
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="text-neon-lime font-semibold">Skill Mapper Badge</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="text-electric-blue font-semibold">500 Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📜</div>
                    <div className="text-neon-purple font-semibold">Certificate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <span className="text-neon-lime">Skills</span> Roadmap
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Follow structured learning paths with free global resources to master in-demand skills
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => {
            const progress = getProgress(roadmap);
            
            return (
              <Card key={roadmap.id} className="glass-card border-gray-800 hover:border-neon-lime transition-all cursor-pointer group">
                <CardHeader>
                  <CardTitle className="text-neon-lime group-hover:text-white transition-colors">
                    {roadmap.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyColor(roadmap.difficulty)} border-current`} variant="outline">
                      {roadmap.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-400">🕒 {roadmap.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">{roadmap.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-neon-lime">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="text-sm text-gray-400">
                      {roadmap.steps.length} steps • {roadmap.steps.filter(step => completedSteps.includes(step.id)).length} completed
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedRoadmap(roadmap)}
                    className="w-full mt-4 bg-gray-800 text-neon-lime border border-gray-700 hover:bg-neon-lime hover:text-black transition-all"
                  >
                    {progress > 0 ? 'Continue Learning' : 'Start Roadmap'} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="glass-card border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-neon-purple mb-4">
                📖 Don't See Your Dream Career?
              </h3>
              <p className="text-gray-300 mb-6">
                We're constantly adding new roadmaps. Explore our role library to discover more career paths 
                and their required skills.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-neon-purple text-white glow-button">
                  📚 Browse Role Library
                </Button>
                <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black">
                  💡 Request New Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsRoadmap;
