import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, Trophy, Phone, Mail, CheckCircle, Sparkles } from 'lucide-react';

export default function EventModal({ event, onClose, onRegister }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-purple-950/50 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header Image with close button */}
        <div className="relative h-48 sm:h-64 w-full shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-500 text-white uppercase tracking-wider">
                {event.category}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-amber/20 text-accent-amber border border-accent-amber/30">
                Prize: {event.prizePool}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                Fee: {event.registrationFee}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{event.title}</h2>
            <p className="text-sm text-slate-300">{event.tagline}</p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Event Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Date</span>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>{event.date}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Time</span>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                <span>{event.time}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Venue</span>
              <div className="flex items-center gap-1.5 text-white font-semibold truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Team Size</span>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Users className="w-3.5 h-3.5 text-brand-400" />
                <span>{event.teamSize}</span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">About The Event</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{event.fullDescription}</p>
          </div>

          {/* Rules & Guidelines */}
          {event.rules && (
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Rules & Guidelines</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rounds / Schedule */}
          {event.rounds && (
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Rounds & Timeline</h4>
              <div className="space-y-2">
                {event.rounds.map((round, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs sm:text-sm">
                    <span className="font-semibold text-white">{round.name}</span>
                    <span className="text-brand-300 font-mono bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">{round.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Contact */}
          {event.coordinators && (
            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Event Coordinators</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.coordinators.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
                    <div className="font-bold text-white mb-1">{c.name}</div>
                    <div className="flex items-center gap-1.5 text-slate-300 mb-0.5">
                      <Phone className="w-3 h-3 text-brand-400" />
                      <span>{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-3 h-3 text-brand-400" />
                      <span className="truncate">{c.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Need accommodations or team slot reservations? Contact coordinators.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(event);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-pink hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-accent-amber" />
              <span>Register For This Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
