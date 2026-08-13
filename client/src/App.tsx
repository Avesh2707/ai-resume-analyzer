import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/auth-context';
import { PublicLayout } from '@/components/layout/public-layout';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { GuestRoute } from '@/components/auth/guest-route';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Overview from '@/pages/dashboard/Overview';
import ResumeDetails from '@/pages/dashboard/ResumeDetails';
import Resumes from '@/pages/dashboard/Resumes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public/Marketing Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Guest Routes (Only accessible if NOT logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes (Only accessible if logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/resumes" element={<Resumes />} />
            <Route path="/dashboard/resumes/:id" element={<ResumeDetails />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
