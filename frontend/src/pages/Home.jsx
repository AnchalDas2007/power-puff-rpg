import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Sword, 
  Shield, 
  Brain, 
  Heart, 
  Flame, 
  ArrowRight, 
  Users, 
  Compass, 
  Palette, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Crown,
  MapPin,
  Terminal,
  Radio,
  UserCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AnimeMascot from '../components/AnimeMascot';
import FloatingCompanion from '../components/FloatingCompanion';
import ThemeEnvironment from '../components/ThemeEnvironment';
import GameFXCanvas, { triggerGameFX } from '../components/GameFX';

export default function Home({ 
  companionChar: propCompanionChar, 
  onSelectCompanion: propOnSelectCompanion 
}) {
  const { openAuthModal } = useAuth();
  const { currentTheme, setTheme, themes } = useTheme();

  // Active Companion Character: 'emily' (Angel/Fairy) or 'ren' (Knight/Mage)
  const [internalCompanionChar, setInternalCompanionChar] = useState(() => {
    try {
      const saved = localStorage.getItem('rpg_companion_char');
      if (saved === 'aiko') return 'emily';
      return saved || 'emily';
    } catch {
      return 'emily';
    }
  });

  const companionChar = propCompanionChar || internalCompanionChar;

  // Active scroll section tracking for Docked Sidebar Companion
  const [activeSection, setActiveSection] = useState('about');

  // Perch Target for Free-Roaming Companion
  const [perchTarget, setPerchTarget] = useState(null);
  const perchTimeoutRef = React.useRef(null);

  useEffect(() => {
    const sections = ['about', 'realms', 'houses', 'attributes', 'journey'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Active Mascot Speech state
  const [mascotSpeech, setMascotSpeech] = useState({
    title: companionChar === 'ren' ? "REN // HERO SCOUT" : "EMILY // CELESTIAL GUIDE",
    message: "Hiiii, Adventurer! I'm Emily, your free-roaming companion! Hover over any guild house, attribute, or realm to see me fly over and inspect it! ✨",
    mood: "SCOUT // ACTIVE",
    pose: "wave"
  });

  // Active selected house
  const [selectedHouse, setSelectedHouse] = useState('blossom');

  // Active selected attribute
  const [selectedAttribute, setSelectedAttribute] = useState('intellect');

  // Active map journey step hover/selection
  const [activeJourneyStep, setActiveJourneyStep] = useState(1);

  // Switch companion avatar with persistent memory
  const handleSelectCompanion = (charId) => {
    if (propOnSelectCompanion) {
      propOnSelectCompanion(charId);
    }
    setInternalCompanionChar(charId);
    try {
      localStorage.setItem('rpg_companion_char', charId);
    } catch {}
    setMascotSpeech({
      title: charId === 'ren' ? "REN // KNIGHT READY" : "EMILY // FAIRY READY",
      message: charId === 'ren'
        ? "Ren here! Cyber-armor calibrated, energy blade ignited! What boss are we conquering today? ⚔️⚡"
        : "Emily at your service! Wings fluttering, celestial magic primed! Let's radiate productivity! 🌸✨",
      mood: "ACTIVE // READY",
      pose: "jump"
    });
    triggerGameFX(charId === 'ren' ? 'cyberpunk' : 'cozy-pink', window.innerWidth / 2, window.innerHeight / 2);
  };

  // Card perching hover handlers for free-roaming companion
  const handleCardHover = (cardInfo, event) => {
    if (!event || !event.currentTarget) return;
    const element = event.currentTarget;
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';

    if (perchTimeoutRef.current) clearTimeout(perchTimeoutRef.current);
    perchTimeoutRef.current = setTimeout(() => {
      setPerchTarget({
        id: cardInfo.id,
        element,
        title: cardInfo.title || `${scoutName} // INSPECTING`,
        speech: cardInfo.message || cardInfo.speech || "Studying tactical parameters... 📜✨",
        pose: cardInfo.pose || 'read'
      });
    }, 180);
  };

  const handleCardLeave = () => {
    if (perchTimeoutRef.current) clearTimeout(perchTimeoutRef.current);
    perchTimeoutRef.current = setTimeout(() => {
      setPerchTarget(null);
    }, 600);
  };

  // Update mascot dialogue on theme changes
  useEffect(() => {
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
    if (currentTheme === 'dark-dungeon') {
      setMascotSpeech({
        title: `${scoutName} // DUNGEON SCOUT`,
        message: "Watch your step! Arcane dungeon runes hum through ancient slate halls. Slay the procrastination specters with focused sprints! 🏰🔮",
        mood: "ARCANE // MYSTIC",
        pose: "think"
      });
    } else if (currentTheme === 'cyberpunk-neon') {
      setMascotSpeech({
        title: `${scoutName} // CYBER SCOUT`,
        message: "Systems initialized! Time to jack into the Cyberpunk Grid! Boost your daily XP with neon overdrive! ⚡🕶️",
        mood: "OVERCLOCK // 99%",
        pose: "cyber"
      });
    } else if (currentTheme === 'cozy-pinkish') {
      setMascotSpeech({
        title: `${scoutName} // BLOSSOM FAIRY`,
        message: "A soft pastel sanctuary filled with gentle ambient kindness! Take a deep breath, drink water, and conquer your goals with joy! 🌸💖",
        mood: "HARMONY // TRANQUIL",
        pose: "wave"
      });
    } else if (currentTheme === 'billionaire-gold') {
      setMascotSpeech({
        title: `${scoutName} // VAULT SCOUT`,
        message: "Pure prestige and gold-plated ambition! Every task completed mints shiny gold coins into your adventurer treasury! 👑🪙",
        mood: "PRESTIGE // 24K",
        pose: "jump"
      });
    }
  }, [currentTheme, companionChar]);

  // Click companion for cheer reaction
  const handlePokeMascot = (e) => {
    const x = e?.clientX || window.innerWidth / 2;
    const y = e?.clientY || window.innerHeight / 2;
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';

    setMascotSpeech({
      title: `${scoutName} // CHEERING!`,
      message: companionChar === 'ren'
        ? "Haha! You tapped me! I'll stand vanguard on every quest today! Let's raid! ⚔️🔥"
        : "Kyaaa! You tapped me! I believe in you, hero! Let's conquer today's quest log together! 💖✨",
      mood: "HYPED // 100%",
      pose: "jump"
    });

    triggerGameFX('celebrate', x, y);
    setTimeout(() => {
      setMascotSpeech(prev => ({ ...prev, pose: 'idle' }));
    }, 2500);
  };

  // Lore data for the 3 Personality Houses
  const HOUSES = {
    blossom: {
      id: 'blossom',
      name: 'House Blossom',
      tagline: 'Strategic Leadership & Vision',
      leader: 'Commander Blossom',
      icon: '💖',
      color: 'border-pink-500',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
      lore: 'The ancient order of master strategists, tactical architects, and natural commanders. Adventurers of House Blossom channel disciplined intellect and calm vision, transforming chaotic workloads into clearly calculated, legendary victories.',
      buffTitle: 'Passive Aura: Commander\'s Clarity',
      buffDesc: '+15% bonus XP on deep work focus sprints & complex engineering quests.',
      virtues: ['Tactical Architecture', 'Mental Fortitude', 'Inspirational Leadership']
    },
    bubbles: {
      id: 'bubbles',
      name: 'House Bubbles',
      tagline: 'Creative Joy & Empathy',
      leader: 'Sprite Bubbles',
      icon: '🫧',
      color: 'border-cyan-500',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      lore: 'The luminous guardians of creative flow, emotional resilience, and radiant empathy. House Bubbles transforms essential self-care, mindfulness, hydration, and creative expression into effortless, joy-fueled daily power.',
      buffTitle: 'Passive Aura: Heartfelt Harmony',
      buffDesc: '+20% Vitality recovery on hydration, rest, and mindfulness streaks.',
      virtues: ['Creative Flow', 'Emotional Intelligence', 'Holistic Wellness']
    },
    buttercup: {
      id: 'buttercup',
      name: 'House Buttercup',
      tagline: 'Fearless Action & Raw Grit',
      leader: 'Berserker Buttercup',
      icon: '⚡',
      color: 'border-lime-500',
      badgeBg: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
      glow: 'shadow-[0_0_30px_rgba(132,204,22,0.3)]',
      lore: 'The unstoppable vanguard of decisive execution and unyielding tenacity. House Buttercup shatters procrastination with fearless brute momentum, confronting the most formidable boss quests first thing each morning.',
      buffTitle: 'Passive Aura: Iron Will Momentum',
      buffDesc: '+15% bonus Gold & critical hit rate when conquering Hard or Boss quests.',
      virtues: ['Decisive Execution', 'Physical Tenacity', 'Unstoppable Momentum']
    }
  };

  // Lore data for the 4 Core Attributes
  const ATTRIBUTES = {
    intellect: {
      id: 'intellect',
      name: 'Intellect',
      icon: Brain,
      color: 'text-indigo-400',
      border: 'border-indigo-500/60',
      bg: 'bg-indigo-500/10',
      meter: 88,
      rank: 'Tier IV // Master',
      mascotText: "An intellectual warrior! Slay procrastination to power your focus attribute! Deep coding sprints grant +15% intellect bonus! 🧠⚡",
      habits: ['25m Pomodoro sprints', 'Architecture & system design', 'Reading engineering docs'],
      summary: 'Powers your cognitive bandwidth, problem-solving speed, and uninterrupted deep focus.'
    },
    strength: {
      id: 'strength',
      name: 'Strength',
      icon: Sword,
      color: 'text-rose-400',
      border: 'border-rose-500/60',
      bg: 'bg-rose-500/10',
      meter: 76,
      rank: 'Tier III // Veteran',
      mascotText: "Strength powers physical workouts and gritty resilience! Heavy lifts and tough tasks forge legendary armor! ⚔️🔥",
      habits: ['Gym & resistance conditioning', 'Daily posture checks', 'Conquering the hardest task first'],
      summary: 'Forges physical endurance and the grit required to power through heavy friction.'
    },
    vitality: {
      id: 'vitality',
      name: 'Vitality',
      icon: Heart,
      color: 'text-emerald-400',
      border: 'border-emerald-500/60',
      bg: 'bg-emerald-500/10',
      meter: 92,
      rank: 'Tier V // Paragon',
      mascotText: "Vitality guards sleep, hydration, and nutrition! Self-care is your most powerful defensive buff! 💖🌿",
      habits: ['8 hours restorative sleep', 'Daily hydration alerts', 'Wholesome balanced nutrition'],
      summary: 'Sustains energy reservoirs, prevents burnout, and accelerates recovery between quest raids.'
    },
    mind: {
      id: 'mind',
      name: 'Mind',
      icon: Sparkles,
      color: 'text-cyan-400',
      border: 'border-cyan-500/60',
      bg: 'bg-cyan-500/10',
      meter: 82,
      rank: 'Tier IV // Master',
      mascotText: "Mind sharpens mindfulness, clarity, and inner tranquility! Breathe deeply before diving into the dungeon! 🧘✨",
      habits: ['Evening journaling & review', '10m breathwork meditation', 'Digital detox periods'],
      summary: 'Cultivates mindfulness, emotional balance, and unshakable situational clarity.'
    }
  };

  // 3-Step World Map Journey Nodes
  const JOURNEY_STEPS = [
    {
      step: 1,
      name: 'Guild Induction',
      icon: '🏛️',
      sub: 'Personality House Sorting',
      desc: 'Complete your soul alignment and choose between Blossom, Bubbles, or Buttercup to claim your innate combat blessings.',
      coords: 'West Gateway // Sector 01'
    },
    {
      step: 2,
      name: 'Avatar & Sanctuary Forge',
      icon: '🎨',
      sub: 'Chibi Sprite Customization',
      desc: 'Style your 2D pixel hero, select your visual realm aesthetic, and furnish your personal productivity sanctuary room.',
      coords: 'Heart Citadel // Sector 02'
    },
    {
      step: 3,
      name: 'World Map & Quest Raids',
      icon: '🗺️',
      sub: 'Multiplayer Party Lounges',
      desc: 'Enter 2D map portals (Town Square, Neon Citadel, Blossom Sanctuary, Gilded Vault), slay tasks for XP & Gold, and raid with friends.',
      coords: 'Nexus Portal // Sector 03'
    }
  ];

  // Companion reactions on user interaction
  const handleSelectAttribute = (key, event) => {
    setSelectedAttribute(key);
    const attr = ATTRIBUTES[key];
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';

    setMascotSpeech({
      title: `${scoutName} // ${attr.name.toUpperCase()} POINT`,
      message: attr.mascotText,
      mood: 'AHA! // POINTING',
      pose: 'point'
    });

    const x = event ? (event.currentTarget.getBoundingClientRect().left + event.currentTarget.getBoundingClientRect().width / 2) : (window.innerWidth / 2);
    const y = event ? (event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2) : (window.innerHeight / 2);
    triggerGameFX(key, x, y);
  };

  const handleSelectHouse = (key, event) => {
    setSelectedHouse(key);
    const house = HOUSES[key];
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';

    setMascotSpeech({
      title: `${scoutName} // ON ${house.name.toUpperCase()}`,
      message: `Scouting ${house.name}! Commanded by ${house.leader}. Passive Aura: ${house.buffDesc}`,
      mood: key === 'buttercup' ? 'BERSERK // 100%' : (key === 'bubbles' ? 'HARMONY // JOY' : 'TACTICAL // FOCUS'),
      pose: key === 'buttercup' ? 'jump' : (key === 'bubbles' ? 'wave' : 'think')
    });

    const x = event ? (event.currentTarget.getBoundingClientRect().left + event.currentTarget.getBoundingClientRect().width / 2) : (window.innerWidth / 2);
    const y = event ? (event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2) : (window.innerHeight / 2);
    const fxType = key === 'buttercup' ? 'strength' : (key === 'bubbles' ? 'cozy-pink' : 'intellect');
    triggerGameFX(fxType, x, y);
  };

  const handleSelectRealm = (themeId, event) => {
    setTheme(themeId);
    const th = themes.find(t => t.id === themeId);
    const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';

    setMascotSpeech({
      title: `${scoutName} // REALM CALIBRATION`,
      message: `Realm attuned to ${th.name}! ${th.description}`,
      mood: 'RE-SYNCED // 100%',
      pose: themeId === 'cyberpunk-neon' ? 'cyber' : (themeId === 'billionaire-gold' ? 'jump' : 'wave')
    });

    const x = event ? (event.currentTarget.getBoundingClientRect().left + event.currentTarget.getBoundingClientRect().width / 2) : (window.innerWidth / 2);
    const y = event ? (event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2) : (window.innerHeight / 2);
    triggerGameFX(themeId, x, y);
  };

  const activeHouseData = HOUSES[selectedHouse];
  const activeAttrData = ATTRIBUTES[selectedAttribute];

  return (
    <div className="relative overflow-hidden min-h-screen pb-32">
      
      {/* Full-Screen Theme-Reactive Vector Environmental Illustrations & Attribute Focus Washes */}
      <ThemeEnvironment 
        currentTheme={currentTheme} 
        selectedAttribute={selectedAttribute} 
        activeSection={activeSection}
        inspectedCard={perchTarget?.id}
      />
      
      {/* ================= 1. HERO SECTION ================= */}
      <section id="about" className="relative pt-12 sm:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Floating Futuristic HUD Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full game-card border border-rpg-border text-rpg-text shadow-theme-glow mb-8 select-none"
        >
          <Sparkles className="w-4 h-4 text-rpg-accent animate-spin" style={{ animationDuration: '5s' }} />
          <span className="font-tech font-bold text-xs tracking-widest uppercase text-rpg-accent">
            TACTICAL PRODUCTIVITY RPG REALM
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Epic Display Headline in Orbitron */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-wide text-rpg-text leading-[1.15] max-w-5xl mx-auto uppercase drop-shadow-lg"
        >
          Transform Tasks Into{' '}
          <span className="shimmer-text drop-shadow-[0_0_30px_var(--rpg-accent-glow)]">
            Epic RPG Quests
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 font-tech font-semibold text-lg sm:text-2xl text-rpg-muted max-w-3xl mx-auto tracking-wide leading-relaxed"
        >
          Level up your real-world stats. Conquer procrastination, harvest gold bounties, align with ancient personality guilds, and raid daily goals with friends.
        </motion.p>

        {/* Action Buttons with Tactile Spring Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              triggerGameFX('gold', rect.left + rect.width / 2, rect.top + rect.height / 2);
              openAuthModal('signup');
            }}
            className="game-btn-primary w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-tech font-black text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-3 shadow-theme-glow-lg cursor-pointer"
          >
            <Sword className="w-5 h-5 animate-pulse" />
            <span>Enter Virtual World</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('houses');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="game-card w-full sm:w-auto px-8 py-4 rounded-2xl border border-rpg-border text-rpg-text font-tech font-bold text-sm sm:text-base tracking-wider uppercase hover:border-rpg-accent transition-all flex items-center justify-center gap-2.5"
          >
            <BookOpen className="w-4 h-4 text-rpg-accent" />
            <span>Explore Lore & Guilds</span>
          </motion.button>
        </motion.div>

        {/* ================= 2. SELF-CONTAINED ANIME MASCOT COMPANION HUD ================= */}
        <motion.div
          className="game-card hud-frame max-w-3xl mx-auto p-5 sm:p-6 rounded-3xl border-2 border-rpg-border/90 flex flex-col my-12 backdrop-blur-2xl transition-all duration-500 hover:border-rpg-accent"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          {/* Top Companion Controls Bar: Avatar Switcher & Cursor Follow Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-rpg-border/60">
            <div className="flex items-center gap-2">
              <span className="font-tech text-xs uppercase font-bold text-rpg-muted mr-1">
                COMPANION:
              </span>
              <button
                onClick={() => handleSelectCompanion('emily')}
                className={`px-3 py-1 rounded-xl text-xs font-tech font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
                  (companionChar === 'emily' || companionChar === 'aiko')
                    ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-theme-glow'
                    : 'bg-rpg-bg border-rpg-border text-rpg-muted hover:border-rpg-muted'
                }`}
              >
                <span>🌸 Emily (Angel) ♀</span>
                {(companionChar === 'emily' || companionChar === 'aiko') && <Check className="w-3 h-3 text-pink-400" />}
              </button>

              <button
                onClick={() => handleSelectCompanion('ren')}
                className={`px-3 py-1 rounded-xl text-xs font-tech font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
                  companionChar === 'ren'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-theme-glow'
                    : 'bg-rpg-bg border-rpg-border text-rpg-muted hover:border-rpg-muted'
                }`}
              >
                <span>⚡ Ren (Knight) ♂</span>
                {companionChar === 'ren' && <Check className="w-3 h-3 text-cyan-400" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-tech font-bold uppercase tracking-wider bg-purple-500/15 border border-purple-400/40 text-purple-300 shadow-theme-glow">
              <Compass className="w-3.5 h-3.5 text-rpg-accent animate-spin" style={{ animationDuration: '8s' }} />
              <span>Right Margin Guide Active</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Mascot Avatar Stage */}
            <div 
              onClick={handlePokeMascot}
              className="relative flex-shrink-0 cursor-pointer group flex flex-col items-center"
              title="Click to interact with your companion!"
            >
              <div className="relative p-2 rounded-3xl bg-gradient-to-b from-rpg-card to-rpg-bg border-2 border-rpg-accent shadow-theme-glow group-hover:scale-105 transition-transform duration-300">
                {/* Scanline overlay */}
                <div className="absolute inset-0 scanline-texture opacity-30 pointer-events-none rounded-3xl" />
                
                {/* Anime Mascot Vector Graphic */}
                <AnimeMascot 
                  character={companionChar}
                  pose={mascotSpeech.pose} 
                  currentTheme={currentTheme} 
                  size={115} 
                />

                {/* Live Indicator Ping */}
                <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-rpg-secondary animate-ping" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rpg-secondary" />
              </div>

              <motion.span 
                className="mt-2 inline-flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rpg-bg border border-rpg-border text-rpg-accent group-hover:border-rpg-accent"
                whileHover={{ scale: 1.05 }}
              >
                <Radio className="w-2.5 h-2.5 animate-pulse" /> POKE COMPANION
              </motion.span>
            </div>

            {/* Tactical Speech Bubble Box */}
            <div className="flex-grow text-left w-full">
              {/* Top Status Strip */}
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-rpg-border/60">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-rpg-accent" />
                  <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-rpg-text uppercase">
                    {mascotSpeech.title}
                  </span>
                </div>
                
                <span className="font-tech font-bold text-[11px] px-2.5 py-0.5 rounded border border-rpg-accent/40 bg-rpg-accent/15 text-rpg-accent uppercase tracking-wider shadow-sm">
                  {mascotSpeech.mood}
                </span>
              </div>

            {/* Dynamic Dialogue Text */}
            <div className="min-h-[55px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={mascotSpeech.message}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="font-sans text-xs sm:text-sm text-rpg-text/90 leading-relaxed font-medium"
                >
                  "{mascotSpeech.message}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Quick Interaction Action Chips */}
            <div className="mt-3 pt-3 border-t border-rpg-border/40 flex flex-wrap items-center gap-2">
              <span className="font-tech text-[10px] uppercase font-bold text-rpg-muted mr-1">
                QUICK TRANSMISSION:
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSelectAttribute('intellect', e)}
                className="px-2.5 py-1 rounded-lg bg-rpg-bg/80 border border-rpg-border hover:border-rpg-accent text-[11px] font-tech font-bold tracking-wider text-rpg-text flex items-center gap-1 transition-colors"
              >
                <Brain className="w-3 h-3 text-indigo-400" />
                <span>Deep Work Tips</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSelectHouse('blossom', e)}
                className="px-2.5 py-1 rounded-lg bg-rpg-bg/80 border border-rpg-border hover:border-rpg-accent text-[11px] font-tech font-bold tracking-wider text-rpg-text flex items-center gap-1 transition-colors"
              >
                <Heart className="w-3 h-3 text-pink-400" />
                <span>House Blossom</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSelectHouse('buttercup', e)}
                className="px-2.5 py-1 rounded-lg bg-rpg-bg/80 border border-rpg-border hover:border-rpg-accent text-[11px] font-tech font-bold tracking-wider text-rpg-text flex items-center gap-1 transition-colors"
              >
                <Sword className="w-3 h-3 text-lime-400" />
                <span>House Buttercup</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('journey');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setMascotSpeech({
                    title: "PIXEL BUDDY // MAP SCOUT",
                    message: "Here is your 3-Step Heroic Roadmap! Follow the glowing celestial route to level up your real life! 🗺️✨",
                    mood: "EXPLORING",
                    pose: "jump"
                  });
                }}
                className="px-2.5 py-1 rounded-lg bg-rpg-bg/80 border border-rpg-border hover:border-rpg-accent text-[11px] font-tech font-bold tracking-wider text-rpg-text flex items-center gap-1 transition-colors"
              >
                <Compass className="w-3 h-3 text-amber-400" />
                <span>3-Step Map</span>
              </motion.button>
            </div>
          </div>
        </div>

        </motion.div>

      </section>

      {/* ================= 3. THE 4 DYNAMIC VISUAL REALMS ================= */}
      <section id="realms" className="relative mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-tech font-bold text-xs uppercase tracking-widest text-rpg-accent flex items-center justify-center gap-2">
            <Palette className="w-4 h-4" /> 4 VISUAL REALM PRESETS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-rpg-text mt-2 uppercase tracking-wide">
            Immerse In Your Aesthetic
          </h2>
          <p className="font-tech text-base text-rpg-muted mt-2 max-w-2xl mx-auto tracking-wide">
            Attune your interface to your mood. Switch themes to transform ambient lighting, particle effects, and background textures in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme) => {
            const isCurrent = currentTheme === theme.id;
            const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
            return (
              <motion.div
                key={theme.id}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={(e) => handleSelectRealm(theme.id, e)}
                onMouseEnter={(e) => handleCardHover({
                  id: theme.id,
                  title: `${scoutName} // REALM SCOUT`,
                  message: `${theme.name}: ${theme.description}`,
                  mood: "INSPECTING"
                }, e)}
                onMouseLeave={handleCardLeave}
                className={`game-card hud-frame p-6 rounded-3xl cursor-pointer transition-all border-2 relative overflow-hidden ${
                  isCurrent 
                    ? 'border-rpg-accent shadow-theme-glow-lg bg-rpg-card' 
                    : 'border-rpg-border/70 hover:border-rpg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 border-white/10 shadow-inner" style={{ backgroundColor: theme.bg }}>
                    {theme.icon}
                  </div>
                  <span 
                    className="w-4 h-4 rounded-full border border-white/50 shadow-[0_0_12px_var(--rpg-accent-glow)]"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>

                <h3 className="font-display font-extrabold text-base tracking-wider text-rpg-text flex items-center gap-2 uppercase">
                  {theme.name}
                  {isCurrent && <CheckCircle2 className="w-4 h-4 text-rpg-accent" />}
                </h3>
                <p className="font-sans text-xs text-rpg-muted mt-2 leading-relaxed">
                  {theme.description}
                </p>

                <div className="mt-5 pt-3 border-t border-rpg-border/60 flex items-center justify-between font-tech font-bold text-xs tracking-wider">
                  <span className="text-rpg-muted">{theme.badge}</span>
                  <span className={isCurrent ? 'text-rpg-accent' : 'text-rpg-muted hover:text-rpg-text'}>
                    {isCurrent ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. THE 3 PERSONALITY HOUSES ================= */}
      <section id="houses" className="relative mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-tech font-bold text-xs uppercase tracking-widest text-rpg-accent flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> THE 3 PERSONALITY GUILDS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-rpg-text mt-2 uppercase tracking-wide">
            Align With Your Destiny
          </h2>
          <p className="font-tech text-base text-rpg-muted mt-2 max-w-2xl mx-auto tracking-wide">
            Upon joining the realm, heroes align with one of three ancient sister houses, receiving unique combat blessings and guild challenges.
          </p>
        </div>

        {/* House Selection Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {Object.values(HOUSES).map((h) => {
            const isSelected = selectedHouse === h.id;
            const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
            return (
              <motion.button
                key={h.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSelectHouse(h.id, e)}
                onMouseEnter={(e) => handleCardHover({
                  id: h.id,
                  title: `${scoutName} // ${h.name.toUpperCase()}`,
                  message: `${h.buffTitle}: ${h.buffDesc}`,
                  mood: "GUILD SCOUT"
                }, e)}
                onMouseLeave={handleCardLeave}
                className={`px-6 py-3.5 rounded-2xl font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-3 border-2 cursor-pointer ${
                  isSelected
                    ? `${h.color} ${h.glow} bg-rpg-accent/20 text-rpg-text scale-105`
                    : 'border-rpg-border bg-rpg-card text-rpg-muted hover:border-rpg-muted'
                }`}
              >
                <span className="text-xl">{h.icon}</span>
                <span>{h.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive House Lore Card with 3D Depth */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeHouseData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onMouseEnter={(e) => {
              const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
              handleCardHover({
                id: activeHouseData.id,
                title: `${scoutName} // ${activeHouseData.name.toUpperCase()}`,
                message: `Leader: ${activeHouseData.leader}. ${activeHouseData.buffTitle}: ${activeHouseData.buffDesc}`,
                mood: "AURA ACTIVE"
              }, e);
            }}
            onMouseLeave={handleCardLeave}
            className={`game-card hud-frame p-7 sm:p-9 rounded-3xl border-2 ${activeHouseData.color} ${activeHouseData.glow}`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-6 mb-6 border-b border-rpg-border">
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-rpg-card border-2 border-rpg-border flex items-center justify-center text-4xl shadow-theme-glow">
                  {activeHouseData.icon}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-rpg-text uppercase tracking-wide">
                      {activeHouseData.name}
                    </h3>
                    <span className={`px-3 py-0.5 rounded-full font-tech font-bold text-xs uppercase tracking-wider border ${activeHouseData.badgeBg}`}>
                      {activeHouseData.tagline}
                    </span>
                  </div>
                  <p className="font-tech text-sm text-rpg-muted mt-1 tracking-wider">
                    GUILD LEADER: <span className="font-display font-bold text-rpg-text">{activeHouseData.leader.toUpperCase()}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeHouseData.virtues.map((v) => (
                  <span key={v} className="px-3 py-1 rounded-xl bg-rpg-bg border border-rpg-border font-tech font-bold text-xs text-rpg-text tracking-wider uppercase">
                    ⚔️ {v}
                  </span>
                ))}
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-rpg-muted leading-relaxed mb-6">
              {activeHouseData.lore}
            </p>

            {/* Passive RPG Aura Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rpg-bg/90 border border-rpg-border flex items-center justify-between gap-4 shadow-inner">
              <div>
                <span className="font-tech font-bold text-xs uppercase tracking-widest text-rpg-accent block">
                  {activeHouseData.buffTitle}
                </span>
                <p className="font-display font-bold text-xs sm:text-sm text-rpg-text mt-1 tracking-wide">
                  {activeHouseData.buffDesc}
                </p>
              </div>
              <Award className="w-8 h-8 text-rpg-accent flex-shrink-0 animate-pulse" />
            </div>

          </motion.div>
        </div>
      </section>

      {/* ================= 5. THE 4 ATTRIBUTE STAT SYSTEM ================= */}
      <section id="attributes" className="relative mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-tech font-bold text-xs uppercase tracking-widest text-rpg-accent flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> THE 4 HEROIC ATTRIBUTES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-rpg-text mt-2 uppercase tracking-wide">
            Level Up Your Real Capabilities
          </h2>
          <p className="font-tech text-base text-rpg-muted mt-2 max-w-2xl mx-auto tracking-wide">
            Every real-world habit, coding sprint, workout, and restful sleep directly charges your core adventurer stat matrix.
          </p>
        </div>

        {/* 4 Attributes Cards Grid with Tactile Tilts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(ATTRIBUTES).map((attr) => {
            const Icon = attr.icon;
            const isSelected = selectedAttribute === attr.id;
            const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
            return (
              <motion.div
                key={attr.id}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={(e) => handleSelectAttribute(attr.id, e)}
                onMouseEnter={(e) => handleCardHover({
                  id: attr.id,
                  title: `${scoutName} // ${attr.name.toUpperCase()} POINT`,
                  message: attr.mascotText,
                  mood: "AHA! // POINTING"
                }, e)}
                onMouseLeave={handleCardLeave}
                className={`game-card hud-frame p-6 rounded-3xl cursor-pointer transition-all border-2 relative overflow-hidden ${
                  isSelected 
                    ? `${attr.border} ${attr.bg} shadow-theme-glow-lg` 
                    : 'border-rpg-border/70 bg-rpg-card hover:border-rpg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${attr.bg} border-2 ${attr.border} flex items-center justify-center shadow-inner`}>
                    <Icon className={`w-7 h-7 ${attr.color}`} />
                  </div>
                  <span className="font-tech font-bold text-xs tracking-widest text-rpg-text uppercase px-2 py-0.5 rounded bg-rpg-bg border border-rpg-border">
                    {attr.rank}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-rpg-text uppercase tracking-wider">
                  {attr.name}
                </h3>
                <p className="font-sans text-xs text-rpg-muted mt-1 leading-relaxed">
                  {attr.summary}
                </p>

                {/* Animated Power Meter Bar */}
                <div className="mt-5 pt-3 border-t border-rpg-border/60">
                  <div className="flex justify-between font-tech font-bold text-xs text-rpg-muted mb-1 uppercase tracking-wider">
                    <span>CAPACITY METER</span>
                    <span className="text-rpg-text">{attr.meter} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-rpg-bg overflow-hidden border border-rpg-border/80">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-rpg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${attr.meter}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Habits Breakdown */}
                <div className="mt-4 space-y-1.5 font-tech text-xs text-rpg-muted">
                  {attr.habits.slice(0, 2).map((habit, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <span className="text-rpg-accent font-bold">▶</span>
                      <span className="truncate">{habit}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 6. 3-STEP ANIMATED WORLD MAP JOURNEY ================= */}
      <section id="journey" className="relative mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-tech font-bold text-xs uppercase tracking-widest text-rpg-accent flex items-center justify-center gap-2">
            <Compass className="w-4 h-4" /> 3-STEP INTERACTIVE MAP TRAIL
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-rpg-text mt-2 uppercase tracking-wide">
            The Hero's Expedition
          </h2>
          <p className="font-tech text-base text-rpg-muted mt-2 max-w-xl mx-auto tracking-wide">
            Follow the interconnected celestial route as you advance from recruit to master questmaster.
          </p>
        </div>

        {/* Interactive World Map Trail Card */}
        <div className="game-card hud-frame p-8 sm:p-12 rounded-3xl border-2 border-rpg-border relative overflow-hidden">
          
          {/* Subtle Map Topology Grid */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Interconnected Pulsing Route Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[92px] left-[18%] right-[18%] h-[3px] bg-rpg-border pointer-events-none">
            <motion.div 
              className="h-full bg-gradient-to-r from-rpg-accent via-rpg-secondary to-amber-400 shadow-[0_0_12px_var(--rpg-accent-glow)]"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {JOURNEY_STEPS.map((node) => {
              const isSelected = activeJourneyStep === node.step;
              const scoutName = companionChar === 'ren' ? 'REN' : 'EMILY';
              return (
                <motion.div
                  key={node.step}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={(e) => {
                    setActiveJourneyStep(node.step);
                    const rect = e.currentTarget.getBoundingClientRect();
                    triggerGameFX('celebrate', rect.left + rect.width / 2, rect.top + rect.height / 2);
                  }}
                  onMouseEnter={(e) => handleCardHover({
                    id: node.step,
                    title: `${scoutName} // STEP ${node.step}`,
                    message: `${node.name}: ${node.desc}`,
                    mood: "EXPEDITION"
                  }, e)}
                  onMouseLeave={handleCardLeave}
                  className={`p-6 rounded-2xl cursor-pointer transition-all border-2 text-center flex flex-col items-center ${
                    isSelected 
                      ? 'border-rpg-accent bg-rpg-card shadow-theme-glow-lg' 
                      : 'border-rpg-border/70 bg-rpg-bg/60 hover:border-rpg-muted'
                  }`}
                >
                  {/* Map Pin Icon Badge with Radar Ripple */}
                  <div className="relative mb-5">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rpg-accent/30 to-rpg-secondary/30 border-2 border-rpg-accent flex items-center justify-center text-3xl shadow-theme-glow relative"
                      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span>{node.icon}</span>
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rpg-secondary animate-ping" />
                    </motion.div>

                    {/* Step Stamp */}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-rpg-card border border-rpg-accent font-pixel font-bold text-[9px] text-rpg-accent uppercase shadow-sm">
                      STEP {node.step}
                    </span>
                  </div>

                  <span className="font-tech text-xs uppercase font-bold text-rpg-accent tracking-widest mt-2">
                    {node.coords}
                  </span>

                  <h3 className="font-display font-black text-lg text-rpg-text uppercase tracking-wide mt-1">
                    {node.name}
                  </h3>

                  <p className="font-tech font-bold text-xs text-rpg-secondary uppercase tracking-wider mb-2">
                    {node.sub}
                  </p>

                  <p className="font-sans text-xs text-rpg-muted leading-relaxed">
                    {node.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-rpg-border/50 w-full flex items-center justify-center gap-1 text-[11px] font-tech text-rpg-muted">
                    <MapPin className="w-3 h-3 text-rpg-accent" />
                    <span>{isSelected ? 'CURRENT INSPECTION' : 'CLICK TO INSPECT'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 7. CALL TO ACTION / REALM GATEWAY ================= */}
      <section className="mt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="game-card hud-frame rounded-3xl p-8 sm:p-16 border-2 border-rpg-border text-center relative overflow-hidden shadow-theme-glow-lg">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rpg-accent/20 border-2 border-rpg-accent text-3xl mb-4 shadow-theme-glow">
              ⚔️
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-rpg-text tracking-tight uppercase">
              The Virtual World Awaits
            </h2>
            <p className="mt-4 font-tech text-base sm:text-lg text-rpg-muted max-w-lg mx-auto tracking-wide">
              Leave monotonous to-do lists behind. Forge your character, attune your realm, and level up your life today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  triggerGameFX('gold', rect.left + rect.width / 2, rect.top + rect.height / 2);
                  openAuthModal('signup');
                }}
                className="game-btn-primary w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-tech font-black text-sm sm:text-base uppercase tracking-widest shadow-theme-glow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Forge Character & Enter</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuthModal('login')}
                className="game-card w-full sm:w-auto px-8 py-4 rounded-2xl border border-rpg-border text-rpg-text font-tech font-bold text-sm sm:text-base tracking-wider uppercase hover:border-rpg-accent transition-all"
              >
                Returning Adventurer? Log In
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 pt-8 border-t border-rpg-border/60 text-center font-tech text-xs text-rpg-muted max-w-7xl mx-auto px-4 tracking-wider uppercase">
        <p>© 2026 POWER PUFF RPG. BUILT WITH VITE + REACT + TAILWIND + FASTAPI.</p>
        <p className="mt-1 text-[10px] text-rpg-muted/70 font-display">
          DARK DUNGEON • CYBERPUNK NEON • COZY PINKISH • BILLIONAIRE GOLD
        </p>
      </footer>

      {/* ================= 8. FREE-ROAMING COMPANION AI & CONTEXTUAL GAMEFX ================= */}
      {/* 100% self-contained Canvas particle FX simulation */}
      <GameFXCanvas />

      {/* Free-roaming mascot companion: perches on inspected cards, autonomous wandering, 15s sleep */}
      <FloatingCompanion
        character={companionChar}
        onChangeCharacter={handleSelectCompanion}
        currentTheme={currentTheme}
        activeSection={activeSection}
        perchTarget={perchTarget}
        onDismissPerch={() => setPerchTarget(null)}
      />

    </div>
  );
}
