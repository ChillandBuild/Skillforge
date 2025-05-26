
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const Navigation = () => {
  const location = useLocation();
  const { points } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/quiz', label: 'Career Quiz', icon: '🎯' },
    { path: '/roles', label: 'Role Library', icon: '📚' },
    { path: '/roadmap', label: 'Skills Roadmap', icon: '🗺️' },
    { path: '/compare', label: 'Compare', icon: '⚖️' },
    { path: '/stories', label: 'Stories', icon: '🎥' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-poppins font-bold">
              <span className="text-neon-lime">Skill</span>
              <span className="text-neon-purple">Forge</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`glow-button text-sm ${
                    location.pathname === item.path 
                      ? 'bg-neon-lime text-black' 
                      : 'text-white hover:text-neon-lime'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Points Display */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-full">
              <span className="text-neon-lime">⭐</span>
              <span className="text-sm font-medium">{points} pts</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`w-full justify-start glow-button ${
                    location.pathname === item.path 
                      ? 'bg-neon-lime text-black' 
                      : 'text-white hover:text-neon-lime'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex items-center justify-center space-x-2 bg-gray-900 px-3 py-2 rounded-full mt-4">
              <span className="text-neon-lime">⭐</span>
              <span className="text-sm font-medium">{points} pts</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
