
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Story {
  id: string;
  title: string;
  author: string;
  age: number;
  location: string;
  career: string;
  industry: string;
  gender: 'Male' | 'Female' | 'Non-binary';
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
  tags: string[];
  views: number;
  featured: boolean;
}

const CareerStories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filters = ['All', 'Technology', 'Healthcare', 'Creative', 'Business', 'Engineering', 'Female', 'Male', 'Asia', 'Europe', 'Americas'];

  const stories: Story[] = [
    {
      id: '1',
      title: 'From College Dropout to Senior Software Engineer at Google',
      author: 'Alex Chen',
      age: 26,
      location: 'San Francisco, USA',
      career: 'Senior Software Engineer',
      industry: 'Technology',
      gender: 'Male',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      thumbnail: '/placeholder.svg',
      duration: '12:34',
      description: 'How I went from dropping out of college to landing my dream job at Google through self-learning and determination.',
      tags: ['Self-taught', 'Coding Bootcamp', 'Career Change', 'Tech Giants'],
      views: 45230,
      featured: true
    },
    {
      id: '2',
      title: 'Breaking into UX Design with Zero Experience',
      author: 'Sarah Williams',
      age: 24,
      location: 'London, UK',
      career: 'UX Designer',
      industry: 'Creative',
      gender: 'Female',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      duration: '8:45',
      description: 'My journey from marketing to UX design, including the courses I took and portfolio projects that got me hired.',
      tags: ['Career Transition', 'Portfolio Building', 'Design Thinking'],
      views: 32100,
      featured: true
    },
    {
      id: '3',
      title: 'Building a Data Science Career in the Developing World',
      author: 'Priya Sharma',
      age: 23,
      location: 'Mumbai, India',
      career: 'Data Scientist',
      industry: 'Technology',
      gender: 'Female',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      duration: '15:20',
      description: 'How I leveraged free online resources and local communities to build a successful data science career in India.',
      tags: ['Remote Work', 'Self-learning', 'Community Building'],
      views: 28900,
      featured: false
    },
    {
      id: '4',
      title: 'From Nurse to Healthcare Tech Entrepreneur',
      author: 'Maria Rodriguez',
      age: 29,
      location: 'Barcelona, Spain',
      career: 'Healthcare Tech Founder',
      industry: 'Healthcare',
      gender: 'Female',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      duration: '18:12',
      description: 'My transition from frontline nursing to founding a healthcare technology startup that helps patients.',
      tags: ['Entrepreneurship', 'Healthcare Innovation', 'Career Pivot'],
      views: 19500,
      featured: false
    },
    {
      id: '5',
      title: 'Cybersecurity Career: Protecting the Digital World',
      author: 'David Kim',
      age: 27,
      location: 'Seoul, South Korea',
      career: 'Cybersecurity Analyst',
      industry: 'Technology',
      gender: 'Male',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      duration: '11:30',
      description: 'A day in the life of a cybersecurity professional and how I got started in this critical field.',
      tags: ['Cybersecurity', 'IT Security', 'Day in the Life'],
      views: 37800,
      featured: true
    },
    {
      id: '6',
      title: 'Digital Marketing Success in Africa',
      author: 'Amara Okafor',
      age: 25,
      location: 'Lagos, Nigeria',
      career: 'Digital Marketing Manager',
      industry: 'Business',
      gender: 'Female',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      duration: '9:55',
      description: 'Building a digital marketing career in Africa and helping local businesses grow their online presence.',
      tags: ['Digital Marketing', 'African Market', 'Local Impact'],
      views: 15600,
      featured: false
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.career.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All' || 
                         story.industry === selectedFilter ||
                         story.gender === selectedFilter ||
                         story.location.includes(selectedFilter === 'Asia' ? 'India' : selectedFilter === 'Asia' ? 'Korea' : selectedFilter === 'Europe' ? 'UK' : selectedFilter === 'Europe' ? 'Spain' : selectedFilter === 'Americas' ? 'USA' : selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  if (selectedStory) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => setSelectedStory(null)}
            variant="outline" 
            className="mb-6 border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
          >
            ← Back to Stories
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
                <iframe
                  src={selectedStory.videoUrl}
                  title={selectedStory.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-poppins font-bold text-neon-lime">
                  {selectedStory.title}
                </h1>
                <p className="text-gray-300 text-lg">{selectedStory.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedStory.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-800 text-neon-purple">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Details */}
            <div className="space-y-6">
              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-electric-blue">👤 About {selectedStory.author}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">{selectedStory.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{selectedStory.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Career:</span>
                    <span className="text-neon-lime">{selectedStory.career}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Industry:</span>
                    <span className="text-neon-purple">{selectedStory.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views:</span>
                    <span className="text-gray-300">{selectedStory.views.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-coral">🎯 Key Takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Importance of continuous learning and upskilling</li>
                    <li>• Building a strong portfolio to showcase skills</li>
                    <li>• Networking and community involvement</li>
                    <li>• Persistence and resilience in career transitions</li>
                    <li>• Leveraging free global resources for education</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lavender">📚 Resources Mentioned</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• freeCodeCamp</li>
                    <li>• Coursera Specializations</li>
                    <li>• YouTube tutorials</li>
                    <li>• GitHub for portfolio</li>
                    <li>• LinkedIn Learning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Stories */}
          <div className="mt-12">
            <h3 className="text-2xl font-poppins font-bold text-neon-purple mb-6">Related Stories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {stories
                .filter(story => story.id !== selectedStory.id && story.industry === selectedStory.industry)
                .slice(0, 3)
                .map(story => (
                  <Card key={story.id} className="glass-card border-gray-800 hover:border-neon-lime transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center">
                        <span className="text-4xl">🎥</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">{story.title}</h4>
                      <p className="text-xs text-gray-400">{story.author} • {story.duration}</p>
                      <Button 
                        onClick={() => setSelectedStory(story)}
                        className="w-full mt-3 text-xs bg-gray-800 text-neon-lime hover:bg-neon-lime hover:text-black"
                      >
                        Watch Story
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
            <span className="text-neon-lime">Career</span> Stories
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Real stories from professionals worldwide who built their dream careers
          </p>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto space-y-4">
            <Input
              placeholder="Search stories by career, name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={selectedFilter === filter 
                    ? "bg-neon-lime text-black" 
                    : "border-gray-600 text-gray-300 hover:border-neon-lime hover:text-neon-lime"
                  }
                  size="sm"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-bold text-neon-purple mb-6">🌟 Featured Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories
              .filter(story => story.featured && filteredStories.includes(story))
              .map(story => (
                <Card key={story.id} className="glass-card border-gray-800 hover:border-neon-lime transition-all cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-800 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <span className="text-6xl group-hover:scale-110 transition-transform">🎥</span>
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {story.duration}
                      </div>
                      {story.featured && (
                        <Badge className="absolute top-2 left-2 bg-neon-lime text-black">Featured</Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-poppins font-bold text-neon-lime mb-2 line-clamp-2 group-hover:text-white transition-colors">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-300">{story.author}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{story.age} years</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{story.location}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{story.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-neon-purple text-neon-purple text-xs">
                          {story.career}
                        </Badge>
                        <span className="text-xs text-gray-500">{story.views.toLocaleString()} views</span>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedStory(story)}
                        className="w-full mt-4 bg-gray-800 text-neon-lime border border-gray-700 hover:bg-neon-lime hover:text-black transition-all"
                      >
                        Watch Story →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Stories */}
        <div>
          <h2 className="text-2xl font-poppins font-bold text-electric-blue mb-6">📚 All Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStories
              .filter(story => !story.featured)
              .map(story => (
                <Card key={story.id} className="glass-card border-gray-800 hover:border-electric-blue transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center relative">
                      <span className="text-4xl group-hover:scale-110 transition-transform">🎥</span>
                      <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                        {story.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-electric-blue transition-colors">
                      {story.title}
                    </h3>
                    <div className="text-xs text-gray-400 mb-2">
                      <span>{story.author}</span> • <span>{story.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {story.industry}
                      </Badge>
                      <span className="text-xs text-gray-500">{story.views.toLocaleString()}</span>
                    </div>
                    <Button 
                      onClick={() => setSelectedStory(story)}
                      className="w-full text-xs bg-gray-800 text-electric-blue hover:bg-electric-blue hover:text-black transition-all"
                    >
                      Watch
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎥</div>
            <h3 className="text-3xl font-poppins font-bold text-gray-400 mb-4">No stories found</h3>
            <p className="text-xl text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="glass-card border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-coral mb-4">
                📹 Share Your Story
              </h3>
              <p className="text-gray-300 mb-6">
                Inspire the next generation by sharing your career journey. Help others discover 
                their potential and build their dream careers.
              </p>
              <Button className="bg-coral text-white glow-button">
                Submit Your Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerStories;
