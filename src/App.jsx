import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TrendsPage from './pages/TrendsPage.jsx';
import WellnessJourneyPage from './pages/WellnessJourneyPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import LoggingPage from './pages/LoggingPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';
import ChatLauncher from './components/ChatLauncher.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// (ProtectedRoute not currently used)

// Main App Layout
const AppLayout = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Navigation />
      <main className="pb-20 md:pb-6 pt-2">
        <Outlet />
      </main>
      <ChatLauncher />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <LoginPage /> },
    { path: '/onboarding', element: <OnboardingPage /> },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'trends', element: <TrendsPage /> },
        { path: 'wellness-journey', element: <WellnessJourneyPage /> },
        { path: 'community', element: <CommunityPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'chatbot', element: <ChatbotPage /> },
        { path: 'logging', element: <LoggingPage /> },
        { path: 'reports', element: <ReportsPage /> },
      ],
    },
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider 
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
