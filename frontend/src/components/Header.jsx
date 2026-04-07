import { Sun, Moon, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Header({ isDark, setIsDark }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-heading font-bold text-lg tracking-tight">QUIMBAR</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-2 uppercase tracking-[0.15em]">
              Logística
            </span>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-3">
          <Sun className={`w-4 h-4 transition-colors ${!isDark ? 'text-primary' : 'text-muted-foreground'}`} />
          <Switch
            data-testid="theme-toggle"
            checked={isDark}
            onCheckedChange={setIsDark}
            aria-label="Toggle dark mode"
          />
          <Moon className={`w-4 h-4 transition-colors ${isDark ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
      </div>
    </header>
  );
}
