
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

interface GameContextType {
  points: number;
  badges: Badge[];
  addPoints: (amount: number) => void;
  earnBadge: (badgeId: string) => void;
  getBadgeProgress: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  { id: 'career-curious', name: '🎓 Career Curious', description: 'Completed your first career quiz', icon: '🎓', earned: false },
  { id: 'path-explorer', name: '💡 Path Explorer', description: 'Explored 5 different career paths', icon: '💡', earned: false },
  { id: 'global-learner', name: '🌍 Global Learner', description: 'Watched 3 career stories', icon: '🌍', earned: false },
  { id: 'skill-mapper', name: '🗺️ Skill Mapper', description: 'Completed a skills roadmap', icon: '🗺️', earned: false },
  { id: 'comparison-master', name: '⚖️ Comparison Master', description: 'Compared 3 careers', icon: '⚖️', earned: false }
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('careerflow-points');
    return saved ? parseInt(saved) : 0;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('careerflow-badges');
    return saved ? JSON.parse(saved) : initialBadges;
  });

  useEffect(() => {
    localStorage.setItem('careerflow-points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('careerflow-badges', JSON.stringify(badges));
  }, [badges]);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const earnBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId ? { ...badge, earned: true, earnedDate: new Date() } : badge
    ));
  };

  const getBadgeProgress = () => {
    const earnedCount = badges.filter(badge => badge.earned).length;
    return (earnedCount / badges.length) * 100;
  };

  return (
    <GameContext.Provider value={{ points, badges, addPoints, earnBadge, getBadgeProgress }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
