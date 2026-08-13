import { Link, NavLink } from 'react-router-dom';
import { FileSearch, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { sidebarNav } from '@/config/sidebar-nav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  /** Hides the collapse control — used inside the mobile drawer, which has its own close button. */
  showCollapseToggle?: boolean;
  className?: string;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  showCollapseToggle = true,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border bg-card transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-[68px]' : 'w-64',
        className
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-border px-4',
          collapsed && 'justify-center px-0'
        )}
      >
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2 overflow-hidden font-display font-bold tracking-tight',
            collapsed && 'justify-center'
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileSearch className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </span>
          {!collapsed && <span className="whitespace-nowrap">ResumeAI</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Workspace
          </p>
        )}
        {sidebarNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === '/dashboard'}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center px-0'
              )
            }
          >
            <item.icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {showCollapseToggle && (
        <div className={cn('border-t border-border p-3', collapsed && 'flex justify-center')}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="w-full"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" />
            ) : (
              <PanelLeftClose className="h-[18px] w-[18px]" />
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}
