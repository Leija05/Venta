import { Sun, Moon } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { Switch } from '@/components/ui/switch';

export default function Header({ isDark, setIsDark }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BrandLogo
            className={`h-14 w-auto transition-colors duration-300 ${isDark ? 'text-white' : 'text-zinc-900'}`}
          />
          <div>
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
