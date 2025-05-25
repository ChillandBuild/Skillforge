
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  type: 'mbti' | 'holland' | 'interests' | 'skills';
  options: { text: string; value: string; weight: number }[];
}

interface CareerMatch {
  title: string;
  description: string;
  match: number;
  skills: string[];
  outlook: string;
  salary: string;
}

const CareerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<CareerMatch[]>([]);
  const { addPoints, earnBadge } = useGame();
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 'energy',
      question: 'You gain energy from:',
      type: 'mbti',
      options: [
        { text: 'Being around people and external stimulation', value: 'E', weight: 1 },
        { text: 'Quiet time alone to think and reflect', value: 'I', weight: 1 }
      ]
    },
    {
      id: 'information',
      question: 'When gathering information, you prefer:',
      type: 'mbti',
      options: [
        { text: 'Concrete facts and details', value: 'S', weight: 1 },
        { text: 'Patterns, possibilities, and big picture', value: 'N', weight: 1 }
      ]
    },
    {
      id: 'decisions',
      question: 'When making decisions, you rely more on:',
      type: 'mbti',
      options: [
        { text: 'Logical analysis and objective criteria', value: 'T', weight: 1 },
        { text: 'Personal values and how it affects people', value: 'F', weight: 1 }
      ]
    },
    {
      id: 'lifestyle',
      question: 'Your preferred lifestyle is:',
      type: 'mbti',
      options: [
        { text: 'Organized, planned, and decided', value: 'J', weight: 1 },
        { text: 'Flexible, adaptable, and open to options', value: 'P', weight: 1 }
      ]
    },
    {
      id: 'holland1',
      question: 'You enjoy activities that involve:',
      type: 'holland',
      options: [
        { text: 'Building, fixing, or working with tools', value: 'R', weight: 1 },
        { text: 'Solving puzzles and conducting research', value: 'I', weight: 1 },
        { text: 'Creating art, music, or writing', value: 'A', weight: 1 },
        { text: 'Helping, teaching, or counseling others', value: 'S', weight: 1 }
      ]
    },
    {
      id: 'holland2',
      question: 'Your ideal work environment involves:',
      type: 'holland',
      options: [
        { text: 'Leading teams and managing projects', value: 'E', weight: 1 },
        { text: 'Following procedures and attention to detail', value: 'C', weight: 1 },
        { text: 'Innovation and creative problem-solving', value: 'A', weight: 1 },
        { text: 'Data analysis and systematic thinking', value: 'I', weight: 1 }
      ]
    },
    {
      id: 'interests1',
      question: 'Which topic excites you most?',
      type: 'interests',
      options: [
        { text: 'Technology and digital innovation', value: 'tech', weight: 2 },
        { text: 'Healthcare and helping people', value: 'health', weight: 2 },
        { text: 'Business and entrepreneurship', value: 'business', weight: 2 },
        { text: 'Environment and sustainability', value: 'environment', weight: 2 }
      ]
    },
    {
      id: 'skills1',
      question: 'Your strongest skill area is:',
      type: 'skills',
      options: [
        { text: 'Analytical thinking and problem-solving', value: 'analytical', weight: 2 },
        { text: 'Communication and interpersonal skills', value: 'communication', weight: 2 },
        { text: 'Creative thinking and innovation', value: 'creative', weight: 2 },
        { text: 'Organization and attention to detail', value: 'organized', weight: 2 }
      ]
    }
  ];

  const careerDatabase: CareerMatch[] = [
    {
      title: 'Software Developer',
      description: 'Design and build applications, websites, and systems that solve real-world problems.',
      match: 0,
      skills: ['Programming', 'Problem Solving', 'Logic', 'Testing'],
      outlook: 'Excellent (22% growth)',
      salary: '$70K - $150K globally'
    },
    {
      title: 'UX/UI Designer',
      description: 'Create intuitive and beautiful digital experiences that users love.',
      match: 0,
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design'],
      outlook: 'Very Good (13% growth)',
      salary: '$60K - $120K globally'
    },
    {
      title: 'Data Scientist',
      description: 'Extract insights from data to help organizations make better decisions.',
      match: 0,
      skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
      outlook: 'Outstanding (35% growth)',
      salary: '$80K - $160K globally'
    },
    {
      title: 'Registered Nurse',
      description: 'Provide compassionate care and support to patients in various healthcare settings.',
      match: 0,
      skills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Empathy'],
      outlook: 'Excellent (15% growth)',
      salary: '$50K - $90K globally'
    },
    {
      title: 'Digital Marketing Specialist',
      description: 'Help brands connect with their audience through online channels and campaigns.',
      match: 0,
      skills: ['Analytics', 'Content Creation', 'Social Media', 'SEO'],
      outlook: 'Very Good (10% growth)',
      salary: '$45K - $80K globally'
    },
    {
      title: 'Environmental Engineer',
      description: 'Develop solutions to environmental problems and promote sustainability.',
      match: 0,
      skills: ['Engineering Principles', 'Environmental Science', 'Project Management', 'Regulations'],
      outlook: 'Good (8% growth)',
      salary: '$60K - $100K globally'
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    // Simple matching algorithm
    const calculatedMatches = careerDatabase.map(career => {
      let matchScore = 50; // Base score

      // Tech interest
      if (finalAnswers.interests1 === 'tech' && 
          (career.title.includes('Software') || career.title.includes('Data'))) {
        matchScore += 30;
      }

      // Health interest
      if (finalAnswers.interests1 === 'health' && career.title.includes('Nurse')) {
        matchScore += 30;
      }

      // Creative interest
      if (finalAnswers.interests1 === 'business' && career.title.includes('Marketing')) {
        matchScore += 25;
      }

      // MBTI factors
      if (finalAnswers.information === 'N' && 
          (career.title.includes('UX') || career.title.includes('Data'))) {
        matchScore += 15;
      }

      if (finalAnswers.decisions === 'T' && 
          (career.title.includes('Software') || career.title.includes('Engineer'))) {
        matchScore += 15;
      }

      if (finalAnswers.decisions === 'F' && 
          (career.title.includes('Nurse') || career.title.includes('UX'))) {
        matchScore += 15;
      }

      // Skills alignment
      if (finalAnswers.skills1 === 'analytical' && 
          (career.title.includes('Data') || career.title.includes('Software'))) {
        matchScore += 20;
      }

      if (finalAnswers.skills1 === 'creative' && 
          (career.title.includes('UX') || career.title.includes('Marketing'))) {
        matchScore += 20;
      }

      if (finalAnswers.skills1 === 'communication' && 
          (career.title.includes('Nurse') || career.title.includes('Marketing'))) {
        matchScore += 20;
      }

      return { ...career, match: Math.min(matchScore, 98) };
    });

    const sortedMatches = calculatedMatches
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);

    setMatches(sortedMatches);
    setShowResults(true);
    
    // Award points and badge
    addPoints(50);
    earnBadge('career-curious');
    
    toast({
      title: "🎉 Quiz Complete!",
      description: "You earned 50 points and the Career Curious badge!",
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setMatches([]);
  };

  if (showResults) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4">
              Your <span className="text-neon-lime">Career Matches</span>
            </h1>
            <p className="text-xl text-gray-300">Based on your personality, interests, and skills</p>
          </div>

          <div className="space-y-6">
            {matches.map((match, index) => (
              <Card key={match.title} className="glass-card border-gray-800 hover:border-neon-lime transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                        <h3 className="text-2xl font-poppins font-bold text-neon-lime">{match.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4">{match.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-neon-lime">{match.match}%</div>
                      <div className="text-sm text-gray-400">Match</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-neon-purple mb-2">Key Skills</h4>
                      <ul className="space-y-1">
                        {match.skills.map(skill => (
                          <li key={skill} className="text-gray-300">• {skill}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-electric-blue mb-2">Job Outlook</h4>
                      <p className="text-gray-300">{match.outlook}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-coral mb-2">Global Salary</h4>
                      <p className="text-gray-300">{match.salary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-gray-300">Ready to explore these careers in detail?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={resetQuiz}
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
              >
                🔄 Retake Quiz
              </Button>
              <Button className="bg-neon-purple text-white glow-button">
                📚 Explore Role Library
              </Button>
              <Button className="bg-electric-blue text-black glow-button">
                🗺️ View Skills Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            <span className="text-neon-lime">Career</span> Discovery Quiz
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Answer a few questions to discover careers that match your personality and interests
          </p>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="w-full h-2"
          />
          <p className="text-sm text-gray-400 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card className="glass-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full p-6 text-left justify-start border-gray-600 hover:border-neon-lime hover:text-neon-lime transition-all"
              >
                <span className="text-lg">{option.text}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            💡 This quiz combines MBTI personality types with Holland Code career theory
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;
