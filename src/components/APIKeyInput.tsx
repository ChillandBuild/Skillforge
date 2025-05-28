
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface APIKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const APIKeyInput = ({ onApiKeySubmit }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('perplexity_api_key', apiKey.trim());
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="glass-card border-yellow-500/50 bg-yellow-500/10">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-400">
          <Key className="mr-2 h-5 w-5" />
          API Key Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4 text-sm">
          To use AI-powered learning paths, enter your Perplexity API key. 
          Get one free at <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">perplexity.ai</a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your Perplexity API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10 bg-gray-800 border-gray-700 text-white"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-cyan-400 text-black hover:bg-cyan-500"
            disabled={!apiKey.trim()}
          >
            Save API Key & Enable AI Search
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Your API key is stored locally in your browser and never shared.
        </p>
      </CardContent>
    </Card>
  );
};

export default APIKeyInput;
