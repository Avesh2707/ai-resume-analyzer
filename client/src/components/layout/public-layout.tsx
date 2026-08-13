import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="min-w-0 flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
