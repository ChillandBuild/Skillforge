
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Career Quiz', path: '/quiz' },
      { label: 'Role Library', path: '/roles' },
      { label: 'Skills Roadmap', path: '/roadmap' },
      { label: 'Compare Careers', path: '/compare' }
    ],
    resources: [
      { label: 'Career Stories', path: '/stories' },
      { label: 'Evolution Timeline', path: '/timeline' },
      { label: 'Profile', path: '/profile' }
    ],
    company: [
      { label: 'About Us', path: '#' },
      { label: 'Contact', path: '#' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-poppins font-bold">
                <span className="text-neon-lime">Skill</span>
                <span className="text-neon-purple">Forge</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              The most advanced career guidance platform for teens and young adults. 
              Master your career path with AI-powered insights.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:text-neon-lime transition-colors">📧</span>
              <span className="text-2xl cursor-pointer hover:text-neon-lime transition-colors">🐦</span>
              <span className="text-2xl cursor-pointer hover:text-neon-lime transition-colors">💼</span>
              <span className="text-2xl cursor-pointer hover:text-neon-lime transition-colors">📱</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-poppins font-bold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-neon-lime transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-poppins font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-neon-lime transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-poppins font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <a 
                    href={link.path} 
                    className="text-gray-400 hover:text-neon-lime transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} SkillForge. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>🌍 Available worldwide</span>
            <span>•</span>
            <span>🎓 Free educational resources</span>
            <span>•</span>
            <span>⚡ Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
