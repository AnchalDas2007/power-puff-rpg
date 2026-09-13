import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Events from './components/Events';
import EventModal from './components/EventModal';
import Schedule from './components/Schedule';
import RegistrationForm from './components/RegistrationForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [modalEvent, setModalEvent] = useState(null);
  const [preselectedEventId, setPreselectedEventId] = useState('hackmatrix-2026');

  // Action to open details modal
  const handleViewDetails = (event) => {
    setModalEvent(event);
  };

  // Action when user clicks "Register" directly on an Event card or inside Modal
  const handleRegisterEvent = (event) => {
    setPreselectedEventId(event.id);
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navbar and Hero "Register Now" button action
  const handleScrollToRegister = () => {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero "Explore Events" button action
  const handleScrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Fixed Sticky Header */}
      <Navbar onRegisterClick={handleScrollToRegister} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreClick={handleScrollToEvents}
          onRegisterClick={handleScrollToRegister}
        />
        <Highlights />
        <Events
          onViewDetails={handleViewDetails}
          onRegisterEvent={handleRegisterEvent}
        />
        <Schedule />
        <RegistrationForm
          preselectedEventId={preselectedEventId}
          onResetPreselected={() => setPreselectedEventId('hackmatrix-2026')}
        />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Accessible Event Details Modal */}
      {modalEvent && (
        <EventModal
          event={modalEvent}
          onClose={() => setModalEvent(null)}
          onRegister={handleRegisterEvent}
        />
      )}
    </div>
  );
}
