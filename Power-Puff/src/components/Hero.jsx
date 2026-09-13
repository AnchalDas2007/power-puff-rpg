import React from 'react';
import { Sparkles, Calendar, MapPin, ArrowRight, Trophy, Users, Award, Radio } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function Hero({ onExploreClick, onRegisterClick }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[750px] md:h-[750px] bg-brand-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-brand-500/30 text-xs sm:text-sm text-brand-300 font-medium mb-6 shadow-inner backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-pink"></span>
          </span>
          <span className="font-semibold text-white">Annual Flagship Fest</span>
          <span className="text-slate-500">•</span>
          <span>November 14 – 16, 2026</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4">
          CODE. CREATE.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-pink to-accent-amber animate-text">
            CELEBRATE.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-4">
          Experience 3 electrifying days of cutting-edge hackathons, high-adrenaline robot combat, esports showdowns, stage drama, and star-studded celebrity pro-nights.
        </p>

        {/* Location & Venue highlight */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400 font-medium mb-8">
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <MapPin className="w-4 h-4 text-brand-400" />
            <span>Horizon Campus Arena, Tech Valley, Bengaluru</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Radio className="w-4 h-4 text-accent-emerald animate-pulse" />
            <span>Registrations Open Online</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
            FESTIVAL COMMENCES IN
          </p>
          <CountdownTimer targetDate="2026-11-14T09:00:00" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-pink hover:opacity-95 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Register for Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore 25+ Events</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="inline-flex p-2.5 rounded-xl bg-brand-500/10 text-brand-400 mb-2">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">₹5,00,000+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Cash Prize Pool</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="inline-flex p-2.5 rounded-xl bg-accent-pink/10 text-accent-pink mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">6,000+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">College Attendees</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="inline-flex p-2.5 rounded-xl bg-accent-cyan/10 text-accent-cyan mb-2">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">25+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Events & Battles</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="inline-flex p-2.5 rounded-xl bg-accent-amber/10 text-accent-amber mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">3 Nights</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Star Celebrity Concerts</div>
          </div>
        </div>
      </div>
    </section>
  );
}
