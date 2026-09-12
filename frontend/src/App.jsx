import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ThemeBackdrop from './components/ThemeBackdrop';
import Home from './pages/Home';
import VirtualWorldView from './components/VirtualWorldView';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'world'
  const [companionChar, setCompanionChar] = useState(() => {
    try {
      const saved = localStorage.getItem('rpg_companion_char');
      if (saved === 'aiko') return 'emily';
      return saved || 'emily';
    } catch {
      return 'emily';
    }
  });

  const handleSelectCompanion = (charId) => {
    setCompanionChar(charId);
    try {
      localStorage.setItem('rpg_companion_char', charId);
    } catch {}
  };

  // When user successfully authenticates or enters as guest, automatically enter the virtual world
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView('world');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-rpg-bg text-rpg-text transition-colors duration-500 flex flex-col font-sans relative">
      {/* Dynamic Theme Visual Animations Layer */}
      <ThemeBackdrop />

      {/* Navigation Bar */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        companionChar={companionChar}
        onSelectCompanion={handleSelectCompanion}
      />

      {/* Main Content View (Strict Public Overview vs Post-Auth Virtual World) */}
      <main className="flex-grow">
        {currentView === 'world' ? (
          <VirtualWorldView onBackToOverview={() => setCurrentView('home')} />
        ) : (
          <Home 
            companionChar={companionChar}
            onSelectCompanion={handleSelectCompanion}
          />
        )}
      </main>

      {/* Login & Character Creation Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
