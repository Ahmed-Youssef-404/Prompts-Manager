import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Star, FolderOpen, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePromptContext } from '@/contexts/PromptContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/favorites', icon: Star, label: 'Favorites' },
  { to: '/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
  const location = useLocation();
  const { allPrompts } = usePromptContext();
  const favCount = allPrompts.filter(p => p.isFavorite).length;

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-border bg-sidebar h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm text-foreground tracking-tight">Prompt Manager</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.label === 'Favorites' && favCount > 0 && (
                <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono">
                  {favCount}
                </span>
              )}
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-primary-foreground">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
