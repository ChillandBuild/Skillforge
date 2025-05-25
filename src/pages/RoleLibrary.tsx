
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Role {
  id: string;
  title: string;
  category: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  skills: string[];
  certifications: string[];
  courses: string[];
  workLifeBalance: 'Low' | 'Medium' | 'High';
  futureOutlook: 'Declining' | 'Stable' | 'Growing' | 'Booming';
  remote: boolean;
}

const RoleLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const categories = ['All', 'Technology', 'Healthcare', 'Creative', 'Business', 'Engineering', 'Education'];

  const roles: Role[] = [
    {
      id: '1',
      title: 'AI Engineer',
      category: 'Technology',
      description: 'Design and develop artificial intelligence systems and machine learning models to solve complex problems.',
      salaryRange: '$90K - $180K',
      growthRate: '40%',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'Deep Learning'],
      certifications: ['Google AI Certificate', 'AWS ML Specialty', 'TensorFlow Developer'],
      courses: ['CS229 Machine Learning (Stanford)', 'Deep Learning Specialization (Coursera)', 'Fast.ai Practical Deep Learning'],
      workLifeBalance: 'Medium',
      futureOutlook: 'Booming',
      remote: true
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      category: 'Creative',
      description: 'Create intuitive and beautiful digital experiences through user research, prototyping, and visual design.',
      salaryRange: '$60K - $120K',
      growthRate: '13%',
      skills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping', 'Visual Design'],
      certifications: ['Google UX Design Certificate', 'Adobe Certified Expert', 'Interaction Design Foundation'],
      courses: ['Google UX Design (Coursera)', 'Design Thinking (IDEO)', 'The Complete Web Design Course (Udemy)'],
      workLifeBalance: 'High',
      futureOutlook: 'Growing',
      remote: true
    },
    {
      id: '3',
      title: 'Cybersecurity Analyst',
      category: 'Technology',
      description: 'Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.',
      salaryRange: '$75K - $130K',
      growthRate: '31%',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'SIEM Tools', 'Incident Response'],
      certifications: ['CompTIA Security+', 'CISSP', 'CEH (Certified Ethical Hacker)'],
      courses: ['Cybersecurity Specialization (University of Maryland)', 'Ethical Hacking (EC-Council)', 'Security+ Training'],
      workLifeBalance: 'Medium',
      futureOutlook: 'Booming',
      remote: true
    },
    {
      id: '4',
      title: 'Registered Nurse',
      category: 'Healthcare',
      description: 'Provide direct patient care, educate patients about health conditions, and coordinate care with healthcare teams.',
      salaryRange: '$50K - $90K',
      growthRate: '15%',
      skills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Empathy'],
      certifications: ['RN License', 'BLS Certification', 'Specialty Certifications (ICU, ER, etc.)'],
      courses: ['Nursing School Prerequisites', 'BSN Programs', 'Continuing Education Courses'],
      workLifeBalance: 'Medium',
      futureOutlook: 'Growing',
      remote: false
    },
    {
      id: '5',
      title: 'Data Scientist',
      category: 'Technology',
      description: 'Extract insights from large datasets using statistical analysis, machine learning, and data visualization.',
      salaryRange: '$80K - $160K',
      growthRate: '35%',
      skills: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      certifications: ['Google Data Analytics Certificate', 'IBM Data Science Professional', 'Microsoft Azure Data Scientist'],
      courses: ['Data Science Specialization (Johns Hopkins)', 'Python for Data Science (edX)', 'Kaggle Learn Courses'],
      workLifeBalance: 'High',
      futureOutlook: 'Booming',
      remote: true
    },
    {
      id: '6',
      title: 'Digital Marketing Manager',
      category: 'Business',
      description: 'Develop and execute digital marketing strategies across multiple channels to drive brand awareness and sales.',
      salaryRange: '$55K - $95K',
      growthRate: '10%',
      skills: ['SEO/SEM', 'Social Media Marketing', 'Analytics', 'Content Strategy', 'PPC Advertising'],
      certifications: ['Google Ads Certification', 'Facebook Blueprint', 'HubSpot Content Marketing'],
      courses: ['Digital Marketing Specialization (University of Illinois)', 'Social Media Marketing (Hootsuite)', 'Google Analytics Academy'],
      workLifeBalance: 'High',
      futureOutlook: 'Growing',
      remote: true
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || role.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getOutlookColor = (outlook: string) => {
    switch (outlook) {
      case 'Booming': return 'text-neon-lime';
      case 'Growing': return 'text-electric-blue';
      case 'Stable': return 'text-yellow-500';
      case 'Declining': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getBalanceColor = (balance: string) => {
    switch (balance) {
      case 'High': return 'text-neon-lime';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setSelectedRole(null)}
            variant="outline" 
            className="mb-6 border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
          >
            ← Back to Library
          </Button>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-poppins font-bold mb-4 text-neon-lime">
                {selectedRole.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {selectedRole.description}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="glass-card border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-neon-lime">{selectedRole.salaryRange}</div>
                  <div className="text-sm text-gray-400">Global Salary</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className={`text-2xl font-bold ${getOutlookColor(selectedRole.futureOutlook)}`}>
                    {selectedRole.futureOutlook}
                  </div>
                  <div className="text-sm text-gray-400">Future Outlook</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-electric-blue">+{selectedRole.growthRate}</div>
                  <div className="text-sm text-gray-400">Job Growth</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className={`text-2xl font-bold ${getBalanceColor(selectedRole.workLifeBalance)}`}>
                    {selectedRole.workLifeBalance}
                  </div>
                  <div className="text-sm text-gray-400">Work-Life Balance</div>
                </CardContent>
              </Card>
            </div>

            {/* Skills & Certifications */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-neon-purple">💪 Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-neon-lime">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-electric-blue">🏆 Top Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedRole.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-300">• {cert}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Learning Path */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-coral">📚 Recommended Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-neon-lime">Free Courses & Resources:</h4>
                  <ul className="space-y-2">
                    {selectedRole.courses.map((course, index) => (
                      <li key={index} className="text-gray-300">
                        <span className="text-neon-lime">•</span> {course}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                    <h5 className="font-semibold text-electric-blue mb-2">💡 Pro Tip:</h5>
                    <p className="text-gray-300 text-sm">
                      Start with the first course listed, then build practical projects to showcase your skills. 
                      Join online communities and consider contributing to open-source projects!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-neon-lime text-black glow-button">
                  🗺️ View Skills Roadmap
                </Button>
                <Button className="bg-neon-purple text-white glow-button">
                  ⚖️ Compare Careers
                </Button>
                <Button className="bg-electric-blue text-black glow-button">
                  🎥 Watch Career Stories
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            <span className="text-neon-lime">Career</span> Library
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore 50+ career paths with global salary data, required skills, and free learning resources
          </p>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto space-y-4">
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category 
                    ? "bg-neon-lime text-black" 
                    : "border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Career Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="glass-card border-gray-800 hover:border-neon-lime transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-neon-lime group-hover:text-white transition-colors">
                    {role.title}
                  </span>
                  {role.remote && <Badge className="bg-electric-blue text-black">Remote</Badge>}
                </CardTitle>
                <Badge variant="outline" className="w-fit border-neon-purple text-neon-purple">
                  {role.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{role.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Salary:</span>
                    <span className="text-neon-lime font-semibold">{role.salaryRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Growth:</span>
                    <span className="text-electric-blue font-semibold">+{role.growthRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Outlook:</span>
                    <span className={`font-semibold ${getOutlookColor(role.futureOutlook)}`}>
                      {role.futureOutlook}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button 
                    onClick={() => setSelectedRole(role)}
                    className="w-full bg-gray-800 text-neon-lime border border-gray-700 hover:bg-neon-lime hover:text-black transition-all"
                  >
                    Learn More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-poppins font-bold text-gray-400 mb-2">No careers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleLibrary;
