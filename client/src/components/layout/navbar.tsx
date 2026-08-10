import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FileSearch, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { primaryNav } from '@/config/nav';
import { sidebarNav } from '@/config/sidebar-nav';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <FileSearch className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
      <span>
        Resume<span className="mark-highlight">AI</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'text-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-3/4 flex-col sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-4 flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                        isActive && 'bg-secondary text-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-5 border-t border-border pt-4">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Workspace
                </p>
                <div className="flex flex-col gap-1">
                  {sidebarNav.map((item) => (
                    <div
                      key={item.label}
                      aria-disabled="true"
                      className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground/70"
                    >
                      <item.icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-2">
                {user ? (
                  <>
                    <Button className="w-full" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="w-full" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/register">Get started</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
