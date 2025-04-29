
import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/theme-provider';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the theme toggle client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      variant="ghost" 
      size="icon" 
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
