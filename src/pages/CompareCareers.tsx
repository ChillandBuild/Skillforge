
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Career {
  id: string;
  title: string;
  category: string;
  salary: { min: number; max: number; currency: string };
  growth: number;
  demand: 'Low' | 'Medium' | 'High' | 'Very High';
  creativity: number; // 1-10 scale
  workLifeBalance: number; // 1-10 scale
  education: string;
  certifications: string[];
  remote: boolean;
  travelRequired: boolean;
  stressLevel: 'Low' | 'Medium' | 'High';
  skills: string[];
}

const CompareCareers = () => {
  const [selectedCareers, setSelectedCareers] = useState<Career[]>([]);
  const [availableCareers] = useState<Career[]>([
    {
      id: '1',
      title: 'Software Developer',
      category: 'Technology',
      salary: { min: 70000, max: 150000, currency: 'USD' },
      growth: 22,
      demand: 'Very High',
      creativity: 8,
      workLifeBalance: 7,
      education: 'Bachelor\'s or Bootcamp',
      certifications: ['AWS Certified', 'Google Cloud', 'Microsoft Azure'],
      remote: true,
      travelRequired: false,
      stressLevel: 'Medium',
      skills: ['Programming', 'Problem Solving', 'Logic', 'Testing', 'Version Control']
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      category: 'Creative',
      salary: { min: 60000, max: 120000, currency: 'USD' },
      growth: 13,
      demand: 'High',
      creativity: 9,
      workLifeBalance: 8,
      education: 'Bachelor\'s or Portfolio',
      certifications: ['Google UX Design', 'Adobe Certified', 'HFI Certification'],
      remote: true,
      travelRequired: false,
      stressLevel: 'Low',
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design', 'Empathy']
    },
    {
      id: '3',
      title: 'Data Scientist',
      category: 'Technology',
      salary: { min: 80000, max: 160000, currency: 'USD' },
      growth: 35,
      demand: 'Very High',
      creativity: 6,
      workLifeBalance: 6,
      education: 'Bachelor\'s + Statistics',
      certifications: ['Google Data Analytics', 'IBM Data Science', 'Microsoft Azure'],
      remote: true,
      travelRequired: false,
      stressLevel: 'Medium',
      skills: ['Statistics', 'Python/R', 'Machine Learning', 'SQL', 'Data Visualization']
    },
    {
      id: '4',
      title: 'Registered Nurse',
      category: 'Healthcare',
      salary: { min: 50000, max: 90000, currency: 'USD' },
      growth: 15,
      demand: 'Very High',
      creativity: 4,
      workLifeBalance: 5,
      education: 'Associate/Bachelor\'s + License',
      certifications: ['RN License', 'BLS Certification', 'Specialty Certs'],
      remote: false,
      travelRequired: false,
      stressLevel: 'High',
      skills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Empathy']
    },
    {
      id: '5',
      title: 'Digital Marketing Manager',
      category: 'Business',
      salary: { min: 55000, max: 95000, currency: 'USD' },
      growth: 10,
      demand: 'High',
      creativity: 7,
      workLifeBalance: 7,
      education: 'Bachelor\'s preferred',
      certifications: ['Google Ads', 'Facebook Blueprint', 'HubSpot'],
      remote: true,
      travelRequired: false,
      stressLevel: 'Medium',
      skills: ['SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media', 'Creativity']
    },
    {
      id: '6',
      title: 'Cybersecurity Analyst',
      category: 'Technology',
      salary: { min: 75000, max: 130000, currency: 'USD' },
      growth: 31,
      demand: 'Very High',
      creativity: 5,
      workLifeBalance: 6,
      education: 'Bachelor\'s + Certifications',
      certifications: ['Security+', 'CISSP', 'CEH'],
      remote: true,
      travelRequired: false,
      stressLevel: 'High',
      skills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Ethical Hacking', 'Analysis']
    }
  ]);

  const addCareerToComparison = (careerId: string) => {
    if (selectedCareers.length >= 3) return;
    
    const career = availableCareers.find(c => c.id === careerId);
    if (career && !selectedCareers.find(c => c.id === careerId)) {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const removeCareerFromComparison = (careerId: string) => {
    setSelectedCareers(selectedCareers.filter(c => c.id !== careerId));
  };

  const getScoreColor = (score: number, max: number = 10) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'text-neon-lime';
    if (percentage >= 60) return 'text-yellow-500';
    if (percentage >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-neon-lime';
      case 'High': return 'text-electric-blue';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStressColor = (stress: string) => {
    switch (stress) {
      case 'Low': return 'text-neon-lime';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `$${salary.min / 1000}K - $${salary.max / 1000}K`;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            <span className="text-neon-lime">Compare</span> Careers
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Side-by-side comparison of salary, growth, work-life balance, and more
          </p>
        </div>

        {/* Career Selection */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <Select onValueChange={addCareerToComparison}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Add a career to compare..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {availableCareers
                  .filter(career => !selectedCareers.find(selected => selected.id === career.id))
                  .map(career => (
                    <SelectItem key={career.id} value={career.id} className="text-white hover:bg-gray-800">
                      {career.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Select up to 3 careers to compare • {selectedCareers.length}/3 selected
            </p>
          </div>
        </div>

        {/* Selected Careers Pills */}
        {selectedCareers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {selectedCareers.map(career => (
              <Badge key={career.id} className="bg-neon-lime text-black px-3 py-1 text-sm">
                {career.title}
                <button 
                  onClick={() => removeCareerFromComparison(career.id)}
                  className="ml-2 hover:text-red-600"
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Comparison Table */}
        {selectedCareers.length > 0 ? (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedCareers.length}, 1fr)` }}>
              {selectedCareers.map(career => (
                <Card key={career.id} className="glass-card border-gray-800">
                  <CardHeader className="text-center">
                    <CardTitle className="text-neon-lime">{career.title}</CardTitle>
                    <Badge variant="outline" className="border-neon-purple text-neon-purple w-fit mx-auto">
                      {career.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-electric-blue">{formatSalary(career.salary)}</div>
                      <div className="text-sm text-gray-400">Global Salary Range</div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Job Growth:</span>
                        <span className="text-neon-lime font-semibold">+{career.growth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Demand:</span>
                        <span className={`font-semibold ${getDemandColor(career.demand)}`}>
                          {career.demand}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Remote Work:</span>
                        <span className={career.remote ? 'text-neon-lime' : 'text-red-500'}>
                          {career.remote ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stress Level:</span>
                        <span className={`font-semibold ${getStressColor(career.stressLevel)}`}>
                          {career.stressLevel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Comparison */}
            <div className="space-y-6">
              {/* Skills Comparison */}
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-neon-purple">🎯 Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedCareers.length}, 1fr)` }}>
                    {selectedCareers.map(career => (
                      <div key={career.id}>
                        <h4 className="font-semibold text-neon-lime mb-3">{career.title}</h4>
                        <div className="space-y-1">
                          {career.skills.map((skill, index) => (
                            <div key={index} className="text-sm text-gray-300">• {skill}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ratings Comparison */}
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-electric-blue">📊 Career Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Creativity */}
                    <div>
                      <h4 className="font-semibold text-coral mb-3">🎨 Creativity (1-10)</h4>
                      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedCareers.length}, 1fr)` }}>
                        {selectedCareers.map(career => (
                          <div key={career.id} className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(career.creativity)}`}>
                              {career.creativity}/10
                            </div>
                            <div className="text-xs text-gray-400">{career.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work-Life Balance */}
                    <div>
                      <h4 className="font-semibold text-lavender mb-3">⚖️ Work-Life Balance (1-10)</h4>
                      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedCareers.length}, 1fr)` }}>
                        {selectedCareers.map(career => (
                          <div key={career.id} className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(career.workLifeBalance)}`}>
                              {career.workLifeBalance}/10
                            </div>
                            <div className="text-xs text-gray-400">{career.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education & Certifications */}
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-neon-lime">🎓 Education & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedCareers.length}, 1fr)` }}>
                    {selectedCareers.map(career => (
                      <div key={career.id}>
                        <h4 className="font-semibold text-electric-blue mb-2">{career.title}</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-400">Education Required:</div>
                            <div className="text-sm text-white">{career.education}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Top Certifications:</div>
                            <div className="space-y-1">
                              {career.certifications.slice(0, 3).map((cert, index) => (
                                <div key={index} className="text-sm text-gray-300">• {cert}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-neon-lime text-black glow-button">
                  📚 Explore Role Details
                </Button>
                <Button className="bg-neon-purple text-white glow-button">
                  🗺️ View Learning Roadmaps
                </Button>
                <Button className="bg-electric-blue text-black glow-button">
                  🎥 Watch Career Stories
                </Button>
              </div>
              <Button 
                onClick={() => setSelectedCareers([])}
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:border-coral hover:text-coral"
              >
                🔄 Start New Comparison
              </Button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">⚖️</div>
            <h3 className="text-3xl font-poppins font-bold text-gray-400 mb-4">Ready to Compare?</h3>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Select careers from the dropdown above to see detailed side-by-side comparisons of 
              salary, growth potential, required skills, and work-life balance.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="glass-card border-gray-800 p-4">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-neon-lime">Salary Analysis</h4>
                <p className="text-sm text-gray-400">Compare global salary ranges and earning potential</p>
              </Card>
              <Card className="glass-card border-gray-800 p-4">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-electric-blue">Growth Potential</h4>
                <p className="text-sm text-gray-400">Job market demand and future outlook</p>
              </Card>
              <Card className="glass-card border-gray-800 p-4">
                <div className="text-3xl mb-2">⚖️</div>
                <h4 className="font-semibold text-neon-purple">Work-Life Balance</h4>
                <p className="text-sm text-gray-400">Stress levels and flexibility options</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareCareers;
