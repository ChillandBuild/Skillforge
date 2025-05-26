
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign in successful:', { email, password });
      
      // Set authentication state
      localStorage.setItem('isSignedIn', 'true');
      
      // Navigate to profile page
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CF</span>
              </div>
              <div className="text-3xl font-poppins font-bold text-black">
                CareerFlow
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your career journey</p>
        </div>

        {/* Sign In Form */}
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-black">
              🔑 Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 bg-white border-gray-300 text-black"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 bg-white border-gray-300 text-black"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-black hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isLoading ? '🔄 Signing In...' : '🚀 Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-600">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-gray-300 text-black hover:border-black">
                <span className="mr-2">🌐</span>
                Google
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-black hover:border-black">
                <span className="mr-2">📘</span>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-300">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-black hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-gray-600 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
