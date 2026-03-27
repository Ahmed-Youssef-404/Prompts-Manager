import { useState, useEffect } from 'react';
import { Search, Plus, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { usePromptContext } from '@/contexts/PromptContext';
import { Button } from '@/components/ui/button';
import { PromptFormModal } from '@/components/PromptFormModal';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/categories', label: 'Categories' },
  { to: '/settings', label: 'Settings' },
];

export function TopBar() {
  const { isDark, toggle } = useTheme();
  const { searchQuery, setSearchQuery } = usePromptContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setShowAddModal(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-30">
        <button className="md:hidden p-1.5 rounded-lg hover:bg-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            id="global-search"
            type="text"
            placeholder="Search prompts... ⌘K"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-secondary/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg"
            onClick={toggle}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button
            size="sm"
            className="h-9 gap-1.5 rounded-lg bg-gradient-brand hover:opacity-90 text-primary-foreground border-0"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Prompt</span>
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-2 space-y-1 animate-fade-in">
          {mobileNavItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.to ? 'bg-secondary text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      <PromptFormModal open={showAddModal} onOpenChange={setShowAddModal} />
    </>
  );
}
