
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Smart Career Matching',
      description: 'AI-powered quiz combining MBTI and Holland Code to find your perfect career match'
    },
    {
      icon: '📚',
      title: 'Global Learning Resources',
      description: 'Access free courses from Coursera, edX, YouTube, and top universities worldwide'
    },
    {
      icon: '🏆',
      title: 'Gamified Learning',
      description: 'Earn points, unlock badges, and track your career exploration progress'
    },
    {
      icon: '🌍',
      title: 'Real Career Stories',
      description: 'Learn from professionals worldwide through authentic career journey videos'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      age: 17,
      location: 'Singapore',
      quote: 'CareerFlow helped me discover UX design when I thought I was only good at math!',
      career: 'Aspiring UX Designer'
    },
    {
      name: 'Marcus Rodriguez',
      age: 19,
      location: 'Mexico City',
      quote: 'The roadmaps are incredible - I went from zero coding to landing an internship in 6 months.',
      career: 'Software Developer Intern'
    },
    {
      name: 'Priya Patel',
      age: 18,
      location: 'Mumbai',
      quote: 'Finally found my passion in climate tech through the career stories section!',
      career: 'Environmental Science Student'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gray-50">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CF</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-6 text-black">
            Discover Your 
            <span className="block text-gray-800">Dream Career</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The world's most advanced career guidance platform for teens and young adults. 
            Build your future using globally available, free education resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button className="bg-black text-white text-lg px-8 py-4 hover:bg-gray-800 transition-colors">
                🎯 Take Career Quiz
              </Button>
            </Link>
            <Link to="/roles">
              <Button variant="outline" className="border-black text-black text-lg px-8 py-4 hover:bg-black hover:text-white transition-colors">
                📚 Explore Careers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-poppins font-bold text-center mb-16 text-black">
            Why Choose <span className="text-gray-800">CareerFlow</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white border-gray-300 hover:border-black transition-all duration-300 group shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-poppins font-bold mb-2 text-black">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Evolution Timeline CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-poppins font-bold mb-6 text-black">
            See Which <span className="text-gray-800">Careers Are Exploding</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore interactive charts showing the fastest-growing career fields and where opportunities are expanding
          </p>
          <Link to="/timeline">
            <Button className="bg-black text-white text-lg px-8 py-4 hover:bg-gray-800 transition-colors">
              📈 View Career Evolution Timeline
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-poppins font-bold mb-8 text-black">
            Start Your Journey in <span className="text-gray-800">3 Steps</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">1</div>
              <h3 className="text-xl font-poppins font-bold text-black">Take the Quiz</h3>
              <p className="text-gray-600">Answer questions about your interests, skills, and personality</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">2</div>
              <h3 className="text-xl font-poppins font-bold text-black">Explore Matches</h3>
              <p className="text-gray-600">Discover careers that align with your unique profile</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">3</div>
              <h3 className="text-xl font-poppins font-bold text-black">Build Skills</h3>
              <p className="text-gray-600">Follow personalized roadmaps with free global resources</p>
            </div>
          </div>
          <div className="mt-12">
            <Link to="/quiz">
              <Button className="bg-black text-white text-xl px-12 py-6 hover:bg-gray-800 transition-colors">
                Start Your Career Journey 🚀
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-poppins font-bold text-center mb-16 text-black">
            Success Stories from <span className="text-gray-800">Around the World</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-gray-300 hover:border-black transition-all duration-300 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-black text-4xl mb-4">"</div>
                  <p className="text-gray-600 mb-4 italic">{testimonial.quote}</p>
                  <div className="border-t border-gray-300 pt-4">
                    <h4 className="font-poppins font-bold text-black">{testimonial.name}, {testimonial.age}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-sm text-gray-700 font-medium">{testimonial.career}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-black">
            Ready to Transform Your <span className="text-gray-800">Future</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students worldwide who are building their dream careers with CareerFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button className="bg-black text-white text-lg px-10 py-5 hover:bg-gray-800 transition-colors">
                🎯 Take Career Quiz Now
              </Button>
            </Link>
            <Link to="/stories">
              <Button variant="outline" className="border-black text-black text-lg px-10 py-5 hover:bg-black hover:text-white transition-colors">
                🎥 Watch Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
