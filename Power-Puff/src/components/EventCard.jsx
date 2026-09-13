import React from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, ChevronRight, Sparkles } from 'lucide-react';

export default function EventCard({ event, onViewDetails, onRegisterEvent }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technical':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Cultural':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'Gaming':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Workshops':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group h-full">
      {/* Image Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>

        {/* Prize Pool Pill */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-accent-amber border border-accent-amber/30 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 fill-accent-amber/20" />
            <span>{event.prizePool}</span>
          </div>
        </div>

        {/* Title Overlay in Image Header */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
            {event.title}
          </h3>
          <p className="text-xs text-slate-300 font-medium line-clamp-1">
            {event.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Description snippet */}
          <p className="text-sm text-slate-400 mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Event Metadata Grid */}
          <div className="space-y-2 mb-5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Team: {event.teamSize}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
          <button
            onClick={() => onViewDetails(event)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Details & Rules</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => onRegisterEvent(event)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-pink hover:opacity-95 text-xs font-semibold text-white shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}
