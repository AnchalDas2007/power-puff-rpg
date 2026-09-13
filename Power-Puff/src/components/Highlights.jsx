import React from 'react';
import { Cpu, Music2, Gamepad2, Briefcase, Zap, Star } from 'lucide-react';

export default function Highlights() {
  const highlights = [
    {
      icon: Cpu,
      title: "Cutting-Edge Tech Arenas",
      description: "From 36-hour hackathons and IoT challenges to high-torque combat robotics, test your skills against South Asia's sharpest student engineers.",
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-400"
    },
    {
      icon: Music2,
      title: "Electrifying Stage Arts",
      description: "Mega western dance showdowns, fashion runway galas, street theatre, and rock band championships with concert-grade sound and lighting.",
      color: "from-pink-500 to-rose-600",
      accent: "text-pink-400"
    },
    {
      icon: Gamepad2,
      title: "Esports & LAN Battles",
      description: "Low-latency LAN tournament arenas for Valorant, BGMI, and FIFA with live commentary, casting desks, and high-refresh tournament rigs.",
      color: "from-cyan-500 to-blue-600",
      accent: "text-cyan-400"
    },
    {
      icon: Briefcase,
      title: "Industry Mentors & Internships",
      description: "Get discovered by visiting tech scouts, venture capitalists, and hiring partners offering direct internships, grant funding, and prize rewards.",
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400"
    }
  ];

  return (
    <section id="highlights" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Why Attend IGNITE?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            More Than Just A Fest — It’s An Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Immerse yourself in non-stop energy, learn from industry pioneers, compete for glory, and forge lifelong friendships.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <span className={`text-xs font-semibold ${item.accent}`}>Featured Track</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro-Nights Special Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-500/30 bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-slate-950/90 p-8 sm:p-12">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/30 text-accent-amber text-xs font-bold mb-3">
                <Star className="w-3.5 h-3.5 fill-accent-amber" />
                <span>STAR PRO-NIGHTS ANNOUNCEMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                3 Mega Concert Nights Under The Stars
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Featuring chart-topping Bollywood playback icons, an international electronic dance music (EDM) DJ set, and raw rock band showcases. Free entry with all event registrations!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center">
                <div className="text-xs text-brand-400 font-semibold uppercase">Day 1 Night</div>
                <div className="text-sm font-bold text-white">Rock Band Arena</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center">
                <div className="text-xs text-accent-pink font-semibold uppercase">Day 2 Night</div>
                <div className="text-sm font-bold text-white">Sunburn EDM Stage</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center">
                <div className="text-xs text-accent-amber font-semibold uppercase">Day 3 Night</div>
                <div className="text-sm font-bold text-white">Bollywood Mega Star</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
