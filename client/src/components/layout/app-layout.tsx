import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';

/**
 * The application shell: a sticky Navbar on top, a collapsible Sidebar on
 * the left (desktop only — its items also surface in the Navbar's mobile
 * menu on small screens), a Main content area rendering the active route,
 * and a Footer. Purely presentational; no routing/business logic lives here.
 */
export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          className="sticky top-16 hidden h-[calc(100vh-4rem)] md:flex"
        />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
