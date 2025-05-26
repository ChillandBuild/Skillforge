
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGame } from '@/contexts/GameContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { points, badges, getBadgeProgress } = useGame();
  const navigate = useNavigate();
  
  // Check if user is signed in (you can replace this with actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isSignedIn') === 'true';
  });

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    currentRole: 'AI Engineer',
    joinDate: 'January 2024',
    bio: 'Passionate about artificial intelligence and machine learning. Currently exploring different AI applications and building innovative solutions.',
    interests: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP'],
    avatar: null,
    location: 'San Francisco, CA',
    company: 'Tech Innovations Inc.',
    experience: '2 years'
  };

  const userStats = {
    careersExplored: 12,
    quizzesTaken: 3,
    storiesWatched: 8,
    roadmapsStarted: 2,
    skillsLearned: 15
  };

  const recentActivity = [
    { type: 'quiz', title: 'Completed Career Discovery Quiz', points: 50, time: '2 hours ago' },
    { type: 'explore', title: 'Explored AI Engineer role', points: 20, time: '1 day ago' },
    { type: 'story', title: 'Watched "From Student to AI Engineer"', points: 10, time: '2 days ago' },
    { type: 'roadmap', title: 'Started AI Engineer roadmap', points: 30, time: '3 days ago' },
    { type: 'badge', title: 'Earned Career Explorer badge', points: 0, time: '1 week ago' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '🎯';
      case 'explore': return '📚';
      case 'story': return '🎥';
      case 'roadmap': return '🗺️';
      case 'badge': return '🏆';
      default: return '✨';
    }
  };

  const handleContinueAsGuest = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  // If user is not authenticated, show sign in/up options
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <Card className="glass-card border-gray-800 max-w-md w-full">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">👤</div>
            <CardTitle className="text-2xl text-neon-lime">Welcome to SkillForge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-gray-300">
              Sign in to track your progress, earn badges, and unlock personalized career recommendations.
            </p>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-neon-lime text-black hover:bg-neon-lime/90 glow-button"
                onClick={handleSignIn}
              >
                🔑 Sign In
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:border-neon-lime"
                onClick={handleSignUp}
              >
                ✨ Create Account
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-4">Or continue as guest</p>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-neon-lime"
                onClick={handleContinueAsGuest}
              >
                Continue exploring →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with User Info */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-neon-lime text-black text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-poppins font-bold text-white mb-2">
              {user.name}
            </h1>
            <p className="text-neon-lime font-medium mb-1">{user.currentRole}</p>
            <p className="text-gray-400 text-sm">{user.company} • {user.location}</p>
            <p className="text-gray-400 text-sm">Member since {user.joinDate} • {user.experience} experience</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-300 mb-4">{user.bio}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {user.interests.map((interest, index) => (
                <Badge key={index} className="bg-neon-purple text-white">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Points & Level */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-neon-lime flex items-center gap-2">
                  ⭐ Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-neon-lime mb-2">{points}</div>
                  <div className="text-gray-400">Total Points Earned</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Level Progress</span>
                    <span className="text-neon-lime">{Math.floor(points / 100) + 1}</span>
                  </div>
                  <Progress value={((points % 100) / 100) * 100} className="h-3" />
                  <div className="text-xs text-gray-500 mt-1">
                    {100 - (points % 100)} points to level {Math.floor(points / 100) + 2}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-electric-blue">📊 Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-purple">{userStats.careersExplored}</div>
                    <div className="text-sm text-gray-400">Careers Explored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-coral">{userStats.quizzesTaken}</div>
                    <div className="text-sm text-gray-400">Quizzes Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lavender">{userStats.storiesWatched}</div>
                    <div className="text-sm text-gray-400">Stories Watched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-electric-blue">{userStats.roadmapsStarted}</div>
                    <div className="text-sm text-gray-400">Roadmaps Started</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-lime">{userStats.skillsLearned}</div>
                    <div className="text-sm text-gray-400">Skills Learning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500">{badges.filter(b => b.earned).length}</div>
                    <div className="text-sm text-gray-400">Badges Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-coral">📈 Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-900 bg-opacity-50">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{activity.title}</h4>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                      {activity.points > 0 && (
                        <Badge className="bg-neon-lime text-black">+{activity.points} pts</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Badges & Quick Actions */}
          <div className="space-y-8">
            {/* Badge Collection */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lavender">🎖️ Badge Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-lime">
                      {badges.filter(b => b.earned).length}/{badges.length}
                    </div>
                    <div className="text-sm text-gray-400">Badges Collected</div>
                    <Progress value={getBadgeProgress()} className="mt-2 h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {badges.map((badge, index) => (
                      <div key={index} className={`text-center p-3 rounded-lg border ${
                        badge.earned 
                          ? 'border-neon-lime bg-neon-lime bg-opacity-10' 
                          : 'border-gray-700 bg-gray-900 bg-opacity-50'
                      }`}>
                        <div className={`text-2xl mb-1 ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                          {badge.icon}
                        </div>
                        <div className={`text-xs font-semibold ${
                          badge.earned ? 'text-neon-lime' : 'text-gray-500'
                        }`}>
                          {badge.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{badge.description}</div>
                        {badge.earned && badge.earnedDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Earned {new Date(badge.earnedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-electric-blue">⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/quiz">
                  <Button className="w-full bg-neon-lime text-black hover:bg-neon-lime/90 glow-button">
                    🎯 Take Another Quiz
                  </Button>
                </Link>
                <Link to="/roles">
                  <Button className="w-full bg-neon-purple text-white hover:bg-neon-purple/90 glow-button">
                    📚 Explore New Careers
                  </Button>
                </Link>
                <Link to="/roadmap">
                  <Button className="w-full bg-electric-blue text-black hover:bg-electric-blue/90 glow-button">
                    🗺️ Continue Learning Path
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button className="w-full bg-coral text-white hover:bg-coral/90 glow-button">
                    🎥 Watch Success Stories
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:border-red-500 hover:text-red-500"
                  onClick={() => {
                    localStorage.removeItem('isSignedIn');
                    setIsAuthenticated(false);
                  }}
                >
                  🚪 Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
