import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';

export function DashboardLayout() {
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
        <main className="min-w-0 flex-1 pt-8 px-4 sm:px-8 pb-20">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
