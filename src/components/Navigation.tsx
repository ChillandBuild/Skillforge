
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
    { path: '/stories', label: 'Stories', icon: '🎥' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <div className="text-2xl font-poppins font-bold text-black">
              CareerFlow
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`text-sm transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
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
            className="md:hidden text-black hover:text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-300">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
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
