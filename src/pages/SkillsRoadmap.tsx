
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';

interface Course {
  id: string;
  title: string;
  platform: string;
  url: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  courses: Course[];
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
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'overview' | 'checklist'>('overview');

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
          courses: [
            {
              id: 'html-css-1',
              title: 'HTML & CSS Full Course - Beginner to Pro',
              platform: 'YouTube (SuperSimpleDev)',
              url: 'https://youtube.com/watch?v=G3e-cpL7ofc',
              duration: '6.5 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'html-css-2',
              title: 'Responsive Web Design',
              platform: 'freeCodeCamp',
              url: 'https://freecodecamp.org/learn/responsive-web-design/',
              duration: '300 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'html-css-3',
              title: 'Introduction to Web Development',
              platform: 'edX (W3C)',
              url: 'https://edx.org/course/introduction-web-development',
              duration: '5 weeks',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'html-css-4',
              title: 'CSS3 In-Depth',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/web-lab-intro-to-web-development/',
              duration: '4 weeks',
              level: 'Intermediate',
              completed: false
            }
          ],
          skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
          completed: false
        },
        {
          id: 'step2',
          title: 'JavaScript Fundamentals',
          description: 'Master the programming language of the web',
          duration: '4-5 weeks',
          courses: [
            {
              id: 'js-1',
              title: 'JavaScript Full Course for Beginners',
              platform: 'YouTube (Dave Gray)',
              url: 'https://youtube.com/watch?v=EfAl9bwzVZk',
              duration: '8 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'js-2',
              title: 'JavaScript, HTML and CSS Web Development',
              platform: 'Coursera (Johns Hopkins University)',
              url: 'https://coursera.org/learn/html-css-javascript-for-web-developers',
              duration: '5 weeks',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'js-3',
              title: 'Introduction to Computer Science and Programming',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
              duration: '9 weeks',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'js-4',
              title: 'JavaScript Programming',
              platform: 'edX (University of Pennsylvania)',
              url: 'https://edx.org/course/javascript-introduction',
              duration: '4 weeks',
              level: 'Intermediate',
              completed: false
            }
          ],
          skills: ['Variables', 'Functions', 'Objects', 'Arrays', 'DOM Manipulation'],
          completed: false
        },
        {
          id: 'step3',
          title: 'React Framework',
          description: 'Build interactive user interfaces with React',
          duration: '5-6 weeks',
          courses: [
            {
              id: 'react-1',
              title: 'React Course - Beginner\'s Tutorial',
              platform: 'YouTube (Dev Ed)',
              url: 'https://youtube.com/watch?v=dGcsHMXbSOA',
              duration: '2.5 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'react-2',
              title: 'React Specialization',
              platform: 'Coursera (Meta)',
              url: 'https://coursera.org/specializations/react',
              duration: '7 months',
              level: 'Intermediate',
              completed: false
            },
            {
              id: 'react-3',
              title: 'Introduction to ReactJS',
              platform: 'edX (Microsoft)',
              url: 'https://edx.org/course/introduction-reactjs',
              duration: '5 weeks',
              level: 'Intermediate',
              completed: false
            }
          ],
          skills: ['Components', 'Props', 'State', 'Hooks', 'Router'],
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
          courses: [
            {
              id: 'python-1',
              title: 'Python for Everybody Specialization',
              platform: 'Coursera (University of Michigan)',
              url: 'https://coursera.org/specializations/python',
              duration: '8 months',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'python-2',
              title: 'Python Full Course for Beginners',
              platform: 'YouTube (Programming with Mosh)',
              url: 'https://youtube.com/watch?v=_uQrJ0TkZlc',
              duration: '6 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'python-3',
              title: 'Introduction to Computer Science and Programming',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
              duration: '9 weeks',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'python-4',
              title: 'Introduction to Python Programming',
              platform: 'edX (Georgia Tech)',
              url: 'https://edx.org/course/introduction-python-programming',
              duration: '5 weeks',
              level: 'Beginner',
              completed: false
            }
          ],
          skills: ['Python Syntax', 'Data Types', 'Control Flow', 'Functions', 'Libraries'],
          completed: false
        },
        {
          id: 'ds-step2',
          title: 'Data Analysis Libraries',
          description: 'Learn pandas, NumPy, and data manipulation',
          duration: '3-4 weeks',
          courses: [
            {
              id: 'pandas-1',
              title: 'Pandas & Python for Data Analysis',
              platform: 'YouTube (Keith Galli)',
              url: 'https://youtube.com/playlist?list=PLFCB5Dp81iNVmuoGIqcT5oF4K-7kTI5vp',
              duration: '4 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'pandas-2',
              title: 'Applied Data Science with Python',
              platform: 'Coursera (University of Michigan)',
              url: 'https://coursera.org/specializations/data-science-python',
              duration: '5 months',
              level: 'Intermediate',
              completed: false
            },
            {
              id: 'pandas-3',
              title: 'Data Analysis for Social Scientists',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/14-310x-data-analysis-for-social-scientists-spring-2023/',
              duration: '12 weeks',
              level: 'Intermediate',
              completed: false
            }
          ],
          skills: ['Pandas', 'NumPy', 'Data Cleaning', 'Data Manipulation'],
          completed: false
        },
        {
          id: 'ds-step3',
          title: 'Machine Learning',
          description: 'Build predictive models with scikit-learn',
          duration: '6-8 weeks',
          courses: [
            {
              id: 'ml-1',
              title: 'Machine Learning Course',
              platform: 'Coursera (Stanford University)',
              url: 'https://coursera.org/learn/machine-learning',
              duration: '11 weeks',
              level: 'Intermediate',
              completed: false
            },
            {
              id: 'ml-2',
              title: 'Machine Learning Explained',
              platform: 'YouTube (Zach Star)',
              url: 'https://youtube.com/playlist?list=PLblh5JKOoLUIcdlgu78MnlATeyx4cEVeR',
              duration: '3 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'ml-3',
              title: 'Introduction to Machine Learning',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/',
              duration: '16 weeks',
              level: 'Advanced',
              completed: false
            }
          ],
          skills: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
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
          title: 'Design Fundamentals',
          description: 'Learn fundamental design theory and principles',
          duration: '2-3 weeks',
          courses: [
            {
              id: 'design-1',
              title: 'UI/UX Design Tutorial - Figma',
              platform: 'YouTube (DesignCourse)',
              url: 'https://youtube.com/watch?v=c9Wg6Cb_YlU',
              duration: '3 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'design-2',
              title: 'Google UX Design Professional Certificate',
              platform: 'Coursera (Google)',
              url: 'https://coursera.org/professional-certificates/google-ux-design',
              duration: '6 months',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'design-3',
              title: 'Introduction to User Experience Design',
              platform: 'edX (University of Michigan)',
              url: 'https://edx.org/course/introduction-user-experience-design',
              duration: '4 weeks',
              level: 'Beginner',
              completed: false
            }
          ],
          skills: ['Design Theory', 'Color Theory', 'Typography', 'Layout'],
          completed: false
        },
        {
          id: 'ux-step2',
          title: 'User Research',
          description: 'Understand users through research and testing',
          duration: '3-4 weeks',
          courses: [
            {
              id: 'research-1',
              title: 'UX Research Methods',
              platform: 'YouTube (AJ&Smart)',
              url: 'https://youtube.com/playlist?list=PLxk9zj3EDi0PQWN0FlKKZe2yt6oMRyYGO',
              duration: '2 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'research-2',
              title: 'User Experience Research and Design',
              platform: 'Coursera (University of Michigan)',
              url: 'https://coursera.org/specializations/michiganux',
              duration: '6 months',
              level: 'Intermediate',
              completed: false
            },
            {
              id: 'research-3',
              title: 'The Psychology of Human-Computer Interaction',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/psychology-human-computer-interaction/',
              duration: '8 weeks',
              level: 'Advanced',
              completed: false
            }
          ],
          skills: ['User Interviews', 'Personas', 'User Journey Mapping', 'Usability Testing'],
          completed: false
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist',
      description: 'Protect systems and data from digital threats',
      duration: '6-8 months',
      difficulty: 'Intermediate',
      steps: [
        {
          id: 'cyber-step1',
          title: 'Security Fundamentals',
          description: 'Learn basic cybersecurity concepts and principles',
          duration: '3-4 weeks',
          courses: [
            {
              id: 'security-1',
              title: 'Cybersecurity for Beginners',
              platform: 'YouTube (NetworkChuck)',
              url: 'https://youtube.com/playlist?list=PLIhvC56v63IK8KoBbOQ8e0w0_9xF4pFOI',
              duration: '5 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'security-2',
              title: 'IBM Cybersecurity Analyst',
              platform: 'Coursera (IBM)',
              url: 'https://coursera.org/professional-certificates/ibm-cybersecurity-analyst',
              duration: '8 months',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'security-3',
              title: 'Introduction to Cybersecurity',
              platform: 'edX (University of Washington)',
              url: 'https://edx.org/course/introduction-cybersecurity',
              duration: '6 weeks',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'security-4',
              title: 'Computer Systems Security',
              platform: 'MIT OCW',
              url: 'https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/',
              duration: '16 weeks',
              level: 'Advanced',
              completed: false
            }
          ],
          skills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Compliance'],
          completed: false
        }
      ]
    },
    {
      id: 'cloud-computing',
      title: 'Cloud Computing Engineer',
      description: 'Design and manage cloud infrastructure and services',
      duration: '5-7 months',
      difficulty: 'Intermediate',
      steps: [
        {
          id: 'cloud-step1',
          title: 'Cloud Fundamentals',
          description: 'Understanding cloud computing concepts and models',
          duration: '2-3 weeks',
          courses: [
            {
              id: 'cloud-1',
              title: 'AWS Cloud Practitioner Course',
              platform: 'YouTube (FreeCodeCamp)',
              url: 'https://youtube.com/watch?v=3hLmDS179YE',
              duration: '4 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'cloud-2',
              title: 'Cloud Computing Specialization',
              platform: 'Coursera (University of Illinois)',
              url: 'https://coursera.org/specializations/cloud-computing',
              duration: '6 months',
              level: 'Intermediate',
              completed: false
            },
            {
              id: 'cloud-3',
              title: 'Introduction to Cloud Computing',
              platform: 'edX (IBM)',
              url: 'https://edx.org/course/introduction-cloud-computing',
              duration: '4 weeks',
              level: 'Beginner',
              completed: false
            }
          ],
          skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps'],
          completed: false
        }
      ]
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Specialist',
      description: 'Master online marketing strategies and tools',
      duration: '3-5 months',
      difficulty: 'Beginner',
      steps: [
        {
          id: 'marketing-step1',
          title: 'Marketing Fundamentals',
          description: 'Learn core digital marketing concepts',
          duration: '2-3 weeks',
          courses: [
            {
              id: 'marketing-1',
              title: 'Digital Marketing Course',
              platform: 'YouTube (Simplilearn)',
              url: 'https://youtube.com/watch?v=bixR-KIJKYM',
              duration: '11 hours',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'marketing-2',
              title: 'Google Digital Marketing & E-commerce',
              platform: 'Coursera (Google)',
              url: 'https://coursera.org/professional-certificates/google-digital-marketing-ecommerce',
              duration: '6 months',
              level: 'Beginner',
              completed: false
            },
            {
              id: 'marketing-3',
              title: 'Digital Marketing Strategy',
              platform: 'edX (University of Pennsylvania)',
              url: 'https://edx.org/course/digital-marketing-strategy',
              duration: '5 weeks',
              level: 'Intermediate',
              completed: false
            }
          ],
          skills: ['SEO', 'Social Media Marketing', 'Content Marketing', 'PPC', 'Analytics'],
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

  const toggleCourseCompletion = (courseId: string) => {
    setCompletedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getProgress = (roadmap: Roadmap) => {
    const completed = roadmap.steps.filter(step => completedSteps.includes(step.id)).length;
    return (completed / roadmap.steps.length) * 100;
  };

  const getCourseProgress = (step: RoadmapStep) => {
    const completed = step.courses.filter(course => completedCourses.includes(course.id)).length;
    return (completed / step.courses.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-neon-lime';
      case 'Intermediate': return 'text-yellow-500';
      case 'Advanced': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('YouTube')) return '🎥';
    if (platform.includes('Coursera')) return '🎓';
    if (platform.includes('edX')) return '📚';
    if (platform.includes('MIT OCW')) return '🏛️';
    if (platform.includes('freeCodeCamp')) return '💻';
    return '📖';
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

            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-neon-lime">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* View Mode Toggle */}
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => value && setViewMode(value as 'overview' | 'checklist')}
              className="justify-center mb-6"
            >
              <ToggleGroupItem value="overview" className="bg-gray-800 data-[state=on]:bg-neon-lime data-[state=on]:text-black">
                📋 Overview
              </ToggleGroupItem>
              <ToggleGroupItem value="checklist" className="bg-gray-800 data-[state=on]:bg-electric-blue data-[state=on]:text-black">
                ✅ Checklist
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'overview' ? (
            <div className="space-y-6">
              <Accordion type="single" collapsible className="space-y-4">
                {selectedRoadmap.steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(step.id);
                  const courseProgress = getCourseProgress(step);
                  
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
                            {/* Course Progress */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Course Progress</span>
                                <span className="text-sm text-electric-blue">{Math.round(courseProgress)}%</span>
                              </div>
                              <Progress value={courseProgress} className="h-2" />
                            </div>

                            {/* Free Courses */}
                            <div>
                              <h4 className="font-semibold text-electric-blue mb-3">📚 Free Learning Resources</h4>
                              <div className="space-y-3">
                                {step.courses.map((course) => {
                                  const isCourseCompleted = completedCourses.includes(course.id);
                                  return (
                                    <div key={course.id} className={`p-3 rounded-lg border transition-all ${
                                      isCourseCompleted ? 'border-neon-lime bg-neon-lime/5' : 'border-gray-700 bg-gray-800/50'
                                    }`}>
                                      <div className="flex items-start gap-3">
                                        <div className="flex items-center gap-2 mt-1">
                                          <Switch
                                            checked={isCourseCompleted}
                                            onCheckedChange={() => toggleCourseCompletion(course.id)}
                                          />
                                          <span className="text-lg">{getPlatformIcon(course.platform)}</span>
                                        </div>
                                        <div className="flex-1">
                                          <h5 className={`font-medium ${isCourseCompleted ? 'text-neon-lime' : 'text-white'}`}>
                                            {course.title}
                                          </h5>
                                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                            <span>{course.platform}</span>
                                            <span>⏱️ {course.duration}</span>
                                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(course.level)} border-current`}>
                                              {course.level}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

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
          ) : (
            // Checklist Mode
            <div className="space-y-6">
              {selectedRoadmap.steps.map((step, index) => {
                const isStepCompleted = completedSteps.includes(step.id);
                const courseProgress = getCourseProgress(step);
                
                return (
                  <Card key={step.id} className="glass-card border-gray-800">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isStepCompleted ? 'bg-neon-lime text-black' : 'bg-gray-700 text-white'
                        }`}>
                          {isStepCompleted ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <CardTitle className={`${isStepCompleted ? 'text-neon-lime' : 'text-white'}`}>
                            {step.title}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="border-electric-blue text-electric-blue">
                          {step.duration}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">Course Completion</span>
                          <span className="text-sm text-electric-blue">{Math.round(courseProgress)}%</span>
                        </div>
                        <Progress value={courseProgress} className="h-2" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-electric-blue">📋 Course Checklist</h4>
                        <div className="grid gap-3">
                          {step.courses.map((course) => {
                            const isCourseCompleted = completedCourses.includes(course.id);
                            return (
                              <div key={course.id} className={`flex items-center gap-3 p-3 rounded border transition-all ${
                                isCourseCompleted ? 'border-neon-lime bg-neon-lime/5' : 'border-gray-700'
                              }`}>
                                <Switch
                                  checked={isCourseCompleted}
                                  onCheckedChange={() => toggleCourseCompletion(course.id)}
                                />
                                <span className="text-lg">{getPlatformIcon(course.platform)}</span>
                                <div className="flex-1">
                                  <div className={`font-medium ${isCourseCompleted ? 'text-neon-lime line-through' : 'text-white'}`}>
                                    {course.title}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {course.platform} • {course.duration} • {course.level}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="pt-4 border-t border-gray-700">
                          <Button
                            onClick={() => toggleStepCompletion(step.id)}
                            className={`w-full ${
                              isStepCompleted 
                                ? 'bg-neon-lime text-black hover:bg-neon-lime/90' 
                                : 'bg-gray-800 text-neon-lime border border-gray-700 hover:bg-neon-lime hover:text-black'
                            }`}
                          >
                            {isStepCompleted ? '✓ Step Completed' : 'Mark Step as Complete'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

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
