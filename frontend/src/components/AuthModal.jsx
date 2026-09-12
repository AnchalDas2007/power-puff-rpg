import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lock, Mail, User, Shield, Wand2, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login, signup, enterAsGuest } = useAuth();
  const { currentTheme } = useTheme();

  const [tab, setTab] = useState(authModalTab || 'signup');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalityHouse, setPersonalityHouse] = useState('Blossom Leader');
  const [characterAvatar, setCharacterAvatar] = useState('warrior_girl');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const result = await login(identifier, password);
    setLoading(false);
    if (!result.success) {
      setErrorMessage(result.error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const result = await signup({
      username,
      email,
      password,
      selected_theme: currentTheme,
      personality_house: personalityHouse,
      character_avatar: characterAvatar
    });
    setLoading(false);
    if (!result.success) {
      setErrorMessage(result.error);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        
        {/* Backdrop Click Dismiss */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl bg-rpg-card border border-rpg-border p-6 sm:p-8 shadow-2xl z-10 text-rpg-text"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-rpg-bg text-rpg-muted hover:text-rpg-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rpg-accent/15 border border-rpg-accent text-rpg-accent mb-3 shadow-theme-glow">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black tracking-wide text-rpg-text">
              {tab === 'signup' ? 'Join the Virtual World' : 'Welcome Back, Adventurer'}
            </h2>
            <p className="text-xs text-rpg-muted mt-1">
              {tab === 'signup'
                ? 'Create your RPG avatar and gamify your real-life quests'
                : 'Log in to track your level, streaks, and guild stats'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 rounded-2xl bg-rpg-bg border border-rpg-border mb-6">
            <button
              onClick={() => { setTab('signup'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'signup'
                  ? 'bg-rpg-accent text-white shadow-sm'
                  : 'text-rpg-muted hover:text-rpg-text'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setTab('login'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-rpg-accent text-white shadow-sm'
                  : 'text-rpg-muted hover:text-rpg-text'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/50 text-rose-300 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Forms */}
          {tab === 'signup' ? (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Hero Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-rpg-muted" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. BlossomHero"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-rpg-bg border border-rpg-border focus:border-rpg-accent focus:outline-none text-xs text-rpg-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-rpg-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adventurer@powerpuff.io"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-rpg-bg border border-rpg-border focus:border-rpg-accent focus:outline-none text-xs text-rpg-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-rpg-muted" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-rpg-bg border border-rpg-border focus:border-rpg-accent focus:outline-none text-xs text-rpg-text"
                  />
                </div>
              </div>

              {/* Personality House Sorting */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Choose Your Personality Guild
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Blossom Leader', icon: '💖', color: 'border-pink-500' },
                    { name: 'Bubbles Empath', icon: '🫧', color: 'border-cyan-500' },
                    { name: 'Buttercup Brawler', icon: '⚡', color: 'border-lime-500' }
                  ].map((house) => (
                    <button
                      key={house.name}
                      type="button"
                      onClick={() => setPersonalityHouse(house.name)}
                      className={`p-2 rounded-xl text-center border text-[10px] font-bold transition-all ${
                        personalityHouse === house.name
                          ? `${house.color} bg-rpg-accent/15 text-rpg-text`
                          : 'border-rpg-border text-rpg-muted hover:border-rpg-text'
                      }`}
                    >
                      <div className="text-base mb-0.5">{house.icon}</div>
                      <div className="truncate">{house.name.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rpg-accent to-rpg-secondary text-white font-extrabold text-xs tracking-wider uppercase shadow-theme-glow hover:brightness-110 transition-all mt-2"
              >
                {loading ? 'Forging Character...' : 'Create Account & Begin'}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-rpg-muted" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Username or email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-rpg-bg border border-rpg-border focus:border-rpg-accent focus:outline-none text-xs text-rpg-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-rpg-muted mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-rpg-muted" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-rpg-bg border border-rpg-border focus:border-rpg-accent focus:outline-none text-xs text-rpg-text"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rpg-accent to-rpg-secondary text-white font-extrabold text-xs tracking-wider uppercase shadow-theme-glow hover:brightness-110 transition-all mt-2"
              >
                {loading ? 'Entering Realm...' : 'Log In to Account'}
              </motion.button>
            </form>
          )}

          {/* Guest Play Option */}
          <div className="mt-6 pt-4 border-t border-rpg-border text-center">
            <button
              onClick={enterAsGuest}
              className="text-xs font-semibold text-rpg-muted hover:text-rpg-text transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <Compass className="w-3.5 h-3.5 text-rpg-accent" />
              <span>Explore as Guest Adventurer (Instant Demo)</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
