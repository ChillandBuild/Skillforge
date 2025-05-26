
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Briefcase, DollarSign, Users, Calendar } from 'lucide-react';

const CareerEvolutionTimeline = () => {
  // Career growth data (job postings in thousands)
  const careerGrowthData = [
    {
      year: '2019',
      'AI Engineer': 45,
      'AI Generalist': 25,
      'Data Science': 85,
      'Cloud Computing': 120,
      'UX/UI Design': 95,
      'Climate Tech': 25,
      'Cybersecurity': 110,
      'Mental Health Support': 45
    },
    {
      year: '2020',
      'AI Engineer': 65,
      'AI Generalist': 40,
      'Data Science': 105,
      'Cloud Computing': 160,
      'UX/UI Design': 115,
      'Climate Tech': 35,
      'Cybersecurity': 140,
      'Mental Health Support': 65
    },
    {
      year: '2021',
      'AI Engineer': 95,
      'AI Generalist': 65,
      'Data Science': 135,
      'Cloud Computing': 220,
      'UX/UI Design': 145,
      'Climate Tech': 55,
      'Cybersecurity': 180,
      'Mental Health Support': 95
    },
    {
      year: '2022',
      'AI Engineer': 145,
      'AI Generalist': 105,
      'Data Science': 165,
      'Cloud Computing': 285,
      'UX/UI Design': 175,
      'Climate Tech': 85,
      'Cybersecurity': 225,
      'Mental Health Support': 135
    },
    {
      year: '2023',
      'AI Engineer': 220,
      'AI Generalist': 165,
      'Data Science': 190,
      'Cloud Computing': 350,
      'UX/UI Design': 200,
      'Climate Tech': 125,
      'Cybersecurity': 275,
      'Mental Health Support': 180
    },
    {
      year: '2024',
      'AI Engineer': 340,
      'AI Generalist': 275,
      'Data Science': 215,
      'Cloud Computing': 420,
      'UX/UI Design': 225,
      'Climate Tech': 175,
      'Cybersecurity': 320,
      'Mental Health Support': 230
    }
  ];

  // Salary trend data (in thousands USD)
  const salaryData = [
    {
      year: '2019',
      'AI Engineer': 120,
      'AI Generalist': 95,
      'Data Science': 95,
      'Cloud Computing': 105,
      'UX/UI Design': 75,
      'Climate Tech': 80,
      'Cybersecurity': 90,
      'Mental Health Support': 55
    },
    {
      year: '2024',
      'AI Engineer': 180,
      'AI Generalist': 140,
      'Data Science': 130,
      'Cloud Computing': 145,
      'UX/UI Design': 95,
      'Climate Tech': 110,
      'Cybersecurity': 125,
      'Mental Health Support': 75
    }
  ];

  const careers = [
    {
      name: 'AI Engineer',
      icon: '🤖',
      color: '#FF3366',
      growth: '+656%',
      avgSalary: '$180k',
      description: 'Building and deploying AI systems and machine learning models'
    },
    {
      name: 'AI Generalist',
      icon: '🧠',
      color: '#33FF99',
      growth: '+1000%',
      avgSalary: '$140k',
      description: 'Versatile AI professional across multiple domains and applications'
    },
    {
      name: 'Data Science',
      icon: '📊',
      color: '#C6FF00',
      growth: '+153%',
      avgSalary: '$130k',
      description: 'Analyzing data to drive business decisions and create AI solutions'
    },
    {
      name: 'Cloud Computing',
      icon: '☁️',
      color: '#00E5FF',
      growth: '+250%',
      avgSalary: '$145k',
      description: 'Building and managing scalable cloud infrastructure'
    },
    {
      name: 'UX/UI Design',
      icon: '🎨',
      color: '#9C27B0',
      growth: '+137%',
      avgSalary: '$95k',
      description: 'Creating intuitive and beautiful user experiences'
    },
    {
      name: 'Climate Tech',
      icon: '🌱',
      color: '#4CAF50',
      growth: '+600%',
      avgSalary: '$110k',
      description: 'Developing technology solutions for environmental challenges'
    },
    {
      name: 'Cybersecurity',
      icon: '🔐',
      color: '#FF5722',
      growth: '+191%',
      avgSalary: '$125k',
      description: 'Protecting digital assets and preventing cyber threats'
    },
    {
      name: 'Mental Health Support',
      icon: '💚',
      color: '#FF9800',
      growth: '+411%',
      avgSalary: '$75k',
      description: 'Providing digital mental health services and support'
    }
  ];

  const chartConfig = {
    'AI Engineer': { label: 'AI Engineer', color: '#FF3366' },
    'AI Generalist': { label: 'AI Generalist', color: '#33FF99' },
    'Data Science': { label: 'Data Science', color: '#C6FF00' },
    'Cloud Computing': { label: 'Cloud Computing', color: '#00E5FF' },
    'UX/UI Design': { label: 'UX/UI Design', color: '#9C27B0' },
    'Climate Tech': { label: 'Climate Tech', color: '#4CAF50' },
    'Cybersecurity': { label: 'Cybersecurity', color: '#FF5722' },
    'Mental Health Support': { label: 'Mental Health Support', color: '#FF9800' }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
            Career Evolution <span className="text-neon-lime">Timeline</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore the explosive growth of tomorrow's careers. See which fields are reshaping 
            the future of work and where opportunities are expanding fastest.
          </p>
          <Badge className="bg-electric-blue text-black text-lg px-4 py-2">
            📈 Data Updated 2024
          </Badge>
        </div>

        {/* Career Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {careers.map((career) => (
            <Card key={career.name} className="glass-card border-gray-800 hover:border-neon-lime transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{career.icon}</span>
                  <h3 className="text-lg font-poppins font-bold text-white group-hover:text-neon-lime transition-colors">
                    {career.name}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{career.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-bold">{career.growth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-500 font-bold">{career.avgSalary}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Charts */}
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Market Growth
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Salary Evolution
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Growth Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-neon-lime flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Job Market Evolution (2019-2024)
                </CardTitle>
                <p className="text-gray-400">Track the exponential growth in job postings across trending career fields</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <LineChart data={careerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(chartConfig).map(([key, config]) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={config.color}
                        strokeWidth={3}
                        dot={{ fill: config.color, strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: config.color, strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-electric-blue flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Average Salary Growth (2019 vs 2024)
                </CardTitle>
                <p className="text-gray-400">Compare how salaries have evolved across different career paths</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <BarChart data={salaryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(chartConfig).map(([key, config]) => (
                      <Bar key={key} dataKey={key} fill={config.color} radius={[4, 4, 0, 0]} />
                    ))}
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-neon-purple flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  5-Year Growth Comparison
                </CardTitle>
                <p className="text-gray-400">Visualize the relative growth rates across all career fields</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <AreaChart data={careerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(chartConfig).map(([key, config]) => (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stackId="1"
                        stroke={config.color}
                        fill={config.color}
                        fillOpacity={0.3}
                      />
                    ))}
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="glass-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-poppins text-green-500 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Fastest Growing Careers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🌱 Climate Tech</span>
                  <Badge className="bg-green-500 text-black">+600%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🧠 Mental Health Support</span>
                  <Badge className="bg-green-500 text-black">+411%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">☁️ Cloud Computing</span>
                  <Badge className="bg-green-500 text-black">+250%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-poppins text-yellow-500 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Highest Paying Careers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">☁️ Cloud Computing</span>
                  <Badge className="bg-yellow-500 text-black">$145k</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">📊 Data Science</span>
                  <Badge className="bg-yellow-500 text-black">$130k</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🔐 Cybersecurity</span>
                  <Badge className="bg-yellow-500 text-black">$125k</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="glass-card border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-neon-lime mb-4">
                Ready to Join the Future?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                These careers are reshaping industries and creating unprecedented opportunities. 
                Start building skills in tomorrow's most in-demand fields today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-neon-lime text-black px-8 py-3 rounded-lg font-semibold hover:bg-neon-lime/90 transition-colors">
                  🎯 Take Career Quiz
                </button>
                <button className="border border-electric-blue text-electric-blue px-8 py-3 rounded-lg font-semibold hover:bg-electric-blue hover:text-black transition-colors">
                  📚 View Learning Paths
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerEvolutionTimeline;
