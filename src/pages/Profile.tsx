
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';

const Profile = () => {
  const { points, badges, getBadgeProgress } = useGame();

  const userStats = {
    careersExplored: 12,
    quizzesTaken: 3,
    storiesWatched: 8,
    roadmapsStarted: 2,
    skillsLearned: 15
  };

  const achievements = [
    { title: 'Career Explorer', description: 'Explored 10+ careers', unlocked: userStats.careersExplored >= 10 },
    { title: 'Knowledge Seeker', description: 'Completed 3 quizzes', unlocked: userStats.quizzesTaken >= 3 },
    { title: 'Story Enthusiast', description: 'Watched 5+ career stories', unlocked: userStats.storiesWatched >= 5 },
    { title: 'Skill Builder', description: 'Started 2 roadmaps', unlocked: userStats.roadmapsStarted >= 2 },
    { title: 'Learning Champion', description: 'Earned 1000+ points', unlocked: points >= 1000 }
  ];

  const recentActivity = [
    { type: 'quiz', title: 'Completed Career Discovery Quiz', points: 50, time: '2 hours ago' },
    { type: 'explore', title: 'Explored UX Designer role', points: 20, time: '1 day ago' },
    { type: 'story', title: 'Watched "From Nurse to Tech Entrepreneur"', points: 10, time: '2 days ago' },
    { type: 'roadmap', title: 'Started Full-Stack Web Developer roadmap', points: 30, time: '3 days ago' },
    { type: 'badge', title: 'Earned Career Curious badge', points: 0, time: '1 week ago' }
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

  const nextLevelPoints = Math.ceil(points / 100) * 100;
  const progressToNextLevel = ((points % 100) / 100) * 100;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            Your <span className="text-neon-lime">Career Journey</span>
          </h1>
          <p className="text-xl text-gray-300">
            Track your progress, achievements, and continue building your future
          </p>
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
                  <Progress value={progressToNextLevel} className="h-3" />
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

            {/* Achievements */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-neon-purple">🏆 Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'border-neon-lime bg-neon-lime bg-opacity-10' 
                        : 'border-gray-700 bg-gray-900 bg-opacity-50'
                    }`}>
                      <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        🏆
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? 'text-neon-lime' : 'text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-neon-lime text-black">Unlocked</Badge>
                      )}
                    </div>
                  ))}
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
                            Earned {badge.earnedDate.toLocaleDateString()}
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
                <Button className="w-full bg-neon-lime text-black hover:bg-neon-lime/90 glow-button">
                  🎯 Take Another Quiz
                </Button>
                <Button className="w-full bg-neon-purple text-white hover:bg-neon-purple/90 glow-button">
                  📚 Explore New Careers
                </Button>
                <Button className="w-full bg-electric-blue text-black hover:bg-electric-blue/90 glow-button">
                  🗺️ Continue Roadmap
                </Button>
                <Button className="w-full bg-coral text-white hover:bg-coral/90 glow-button">
                  🎥 Watch Success Stories
                </Button>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="glass-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-500">🎯 Your Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Explore 20 careers</span>
                      <span className="text-sm text-neon-lime">{userStats.careersExplored}/20</span>
                    </div>
                    <Progress value={(userStats.careersExplored / 20) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Watch 15 stories</span>
                      <span className="text-sm text-electric-blue">{userStats.storiesWatched}/15</span>
                    </div>
                    <Progress value={(userStats.storiesWatched / 15) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Complete 3 roadmaps</span>
                      <span className="text-sm text-neon-purple">{userStats.roadmapsStarted}/3</span>
                    </div>
                    <Progress value={(userStats.roadmapsStarted / 3) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-xs text-gray-400 mb-2">Complete all goals to unlock special rewards!</p>
                  <div className="text-2xl">🎁</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="glass-card border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-neon-lime mb-4">
                🚀 Keep Building Your Future
              </h3>
              <p className="text-gray-300 mb-6">
                You're making great progress! Continue exploring careers, learning new skills, 
                and building the foundation for your dream career.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-neon-lime text-black glow-button">
                  🎯 Discover More Careers
                </Button>
                <Button className="bg-electric-blue text-black glow-button">
                  📖 Learn New Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
