
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/quiz', label: 'Career Quiz', icon: '🎯' },
    { path: '/roles', label: 'Role Library', icon: '📚' },
    { path: '/roadmap', label: 'Self-Taught Mastery', icon: '🗺️' },
    { path: '/compare', label: 'Compare', icon: '⚖️' },
    { path: '/stories', label: 'Stories', icon: '🎥' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-poppins font-bold">
              <span className="text-white">Skill</span>
              <span className="text-gray-400">Forge</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`glow-button text-sm ${
                    location.pathname === item.path 
                      ? 'bg-white text-black' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-800">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`w-full justify-start glow-button ${
                    location.pathname === item.path 
                      ? 'bg-white text-black' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
