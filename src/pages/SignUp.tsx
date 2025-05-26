
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign up attempt:', formData);
      // Here you would handle the actual sign up logic
    }, 1000);
  };

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <div className="text-3xl font-poppins font-bold">
              <span className="text-neon-lime">Skill</span>
              <span className="text-neon-purple">Forge</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join SkillForge</h1>
          <p className="text-gray-400">Start your career journey today</p>
        </div>

        {/* Sign Up Form */}
        <Card className="glass-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-neon-lime">
              ✨ Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="mt-1 bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="mt-1 bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mr-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="#" className="text-neon-lime hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-neon-lime hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-neon-lime text-black hover:bg-neon-lime/90 glow-button"
              >
                {isLoading ? '🔄 Creating Account...' : '🚀 Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
                </div>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-gray-600 text-white hover:border-neon-lime">
                <span className="mr-2">🌐</span>
                Google
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:border-neon-lime">
                <span className="mr-2">📘</span>
                Facebook
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/signin" className="text-neon-lime hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-gray-400 hover:text-neon-lime transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
