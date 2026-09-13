import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { SCHEDULE_DAYS } from '../data/scheduleData';

export default function Schedule() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = SCHEDULE_DAYS[activeDayIndex];

  const getTagColor = (category) => {
    switch (category) {
      case 'Technical':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Cultural':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'Gaming':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Workshops':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Pro-Night':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  return (
    <section id="schedule" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Itinerary & Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Festival Schedule
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Plan your 3 days across all stages, halls, computing labs, and festival grounds.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {SCHEDULE_DAYS.map((dayData, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={dayData.day}
                onClick={() => setActiveDayIndex(idx)}
                className={`flex-1 sm:flex-initial sm:min-w-[170px] p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-600 border-brand-400 text-white shadow-lg shadow-brand-500/25 scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="font-extrabold text-sm sm:text-base">{dayData.day}</div>
                <div className="text-[11px] opacity-80">{dayData.date.split(',')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Day Header Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white">{activeDay.theme}</h3>
            <span className="text-xs text-brand-400 font-medium">{activeDay.date}</span>
          </div>
          <span className="text-xs text-slate-400">
            {activeDay.events.length} Scheduled Sessions
          </span>
        </div>

        {/* Timeline List */}
        <div className="space-y-3">
          {activeDay.events.map((item, idx) => (
            <div
              key={idx}
              className="glass-card hover:border-slate-700 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Time Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 text-brand-300 border border-slate-700 text-xs font-mono font-bold shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </div>

                {/* Event Name & Venue */}
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.venue}</span>
                  </div>
                </div>
              </div>

              {/* Tag Category */}
              <div className="shrink-0 self-start sm:self-center">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border ${getTagColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
