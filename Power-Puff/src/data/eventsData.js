export const EVENT_CATEGORIES = [
  "All",
  "Technical",
  "Cultural",
  "Gaming",
  "Workshops"
];

export const EVENTS_DATA = [
  {
    id: "hackmatrix-2026",
    title: "HackMatrix 36H",
    category: "Technical",
    tagline: "36-Hour National Flagship Hackathon",
    description: "Build cutting-edge AI, Web3, and IoT solutions to solve real-world industry problems. Mentorship and food included.",
    fullDescription: "HackMatrix is our flagship 36-hour non-stop hackathon bringing together the brightest minds across the country. Participants will receive problem statements spanning AI/ML, Decentralized Systems, Healthcare Tech, and Smart Cities. Mentors from top tech companies will guide teams throughout the event.",
    rules: [
      "Teams must consist of 2 to 4 members.",
      "All code must be written during the hackathon period. Pre-built templates are strictly prohibited.",
      "Open-source libraries and public APIs are permitted with proper attribution.",
      "Final submission includes GitHub repo link, 2-minute video pitch, and live presentation to judges."
    ],
    rounds: [
      { name: "Round 1: Idea Pitching", time: "Day 1 - 2:00 PM" },
      { name: "Round 2: Mid-Evaluation & Mentorship", time: "Day 2 - 10:00 AM" },
      { name: "Round 3: Final Demo & Grand Finale", time: "Day 2 - 6:00 PM" }
    ],
    date: "Nov 14-15, 2026",
    time: "Starts 10:00 AM (36 hrs)",
    venue: "Turing Central Auditorium & Tech Labs",
    teamSize: "2 - 4 Members",
    prizePool: "₹1,50,000",
    registrationFee: "Free",
    featured: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Arjun Verma", phone: "+91 98765 43210", email: "arjun.hack@ignitefest.edu" },
      { name: "Sneha Patel", phone: "+91 98765 43211", email: "sneha.patel@ignitefest.edu" }
    ]
  },
  {
    id: "battle-of-bands",
    title: "Symphony of Chaos",
    category: "Cultural",
    tagline: "National Battle of the Bands",
    description: "The ultimate rock and fusion battle. Unleash raw energy, thumping basslines, and electrifying guitar solos on the mega stage.",
    fullDescription: "Symphony of Chaos is one of South India's premier band wars. Whether your genre is progressive rock, heavy metal, indie folk, or Indian fusion, the main arena stage is equipped with professional concert sound, monitors, and lighting.",
    rules: [
      "Band size: 3 to 8 members.",
      "Total stage time: 18 minutes (12 mins performance + 6 mins sound check).",
      "At least one original composition is highly encouraged and awards bonus points.",
      "Drum kit and standard audio amps will be provided; bands must bring their own guitars, processors, and keys."
    ],
    rounds: [
      { name: "Preliminary Soundcheck & Qualifying", time: "Day 1 - 4:00 PM" },
      { name: "Grand Concert Finals", time: "Day 1 - 7:30 PM" }
    ],
    date: "Nov 14, 2026",
    time: "4:00 PM - 9:30 PM",
    venue: "Open Air Amphitheatre",
    teamSize: "3 - 8 Members",
    prizePool: "₹80,000",
    registrationFee: "₹500 / Band",
    featured: true,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Rohan Iyer", phone: "+91 98765 43212", email: "rohan.music@ignitefest.edu" }
    ]
  },
  {
    id: "robowars-clash",
    title: "RoboWars: Steel Carnage",
    category: "Technical",
    tagline: "Heavyweight & Lightweight Robot Combat",
    description: "Witness custom-engineered battlebots clash with spinners, flippers, and steel armor in an enclosed bulletproof arena.",
    fullDescription: "Designed for hardcore robotics enthusiasts, RoboWars tests engineering durability, pneumatic flippers, flywheel energy, and tactical driving in an armored battle cage built to international standards.",
    rules: [
      "Weight categories: 15kg Featherweight and 30kg Middleweight.",
      "Bots must operate on 2.4 GHz spread spectrum wireless controllers with fail-safe circuits.",
      "Arena hazards include pneumatic flippers and grinder pit areas.",
      "Matches are 3 minutes of pure active combat scored on Aggression, Damage, and Control."
    ],
    rounds: [
      { name: "Technical Inspection & Safety Check", time: "Day 2 - 9:00 AM" },
      { name: "Knockout Brackets", time: "Day 2 - 11:30 AM" },
      { name: "The Steel Final", time: "Day 2 - 4:00 PM" }
    ],
    date: "Nov 15, 2026",
    time: "10:00 AM - 5:00 PM",
    venue: "Mechanical Arena Quadrangle",
    teamSize: "2 - 5 Members",
    prizePool: "₹75,000",
    registrationFee: "₹400 / Team",
    featured: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Karthik Nair", phone: "+91 98765 43213", email: "karthik.robo@ignitefest.edu" }
    ]
  },
  {
    id: "valorant-showdown",
    title: "Valorant Radiant Arena",
    category: "Gaming",
    tagline: "5v5 Tactical PC Esports Tournament",
    description: "Lock in your agents, execute precision lineups, and clutch the spike defusal in our LAN tournament setup on high-refresh rigs.",
    fullDescription: "Competitors will battle in a double-elimination bracket using professional gaming monitors and ultra-low latency optical fiber LAN. Casted live on Twitch and YouTube by national collegiate esports casters.",
    rules: [
      "5 Main players + up to 1 optional substitute.",
      "Standard competitive tournament rules, best of 1 until Semi-Finals; Semi-Finals and Grand Finals are Best of 3.",
      "Personal peripherals (mouse, keyboard, headset) are welcomed.",
      "Any form of exploit, ghosting, or third-party assistance will result in instant team disqualification."
    ],
    rounds: [
      { name: "Group Stage Swiss Brackets", time: "Day 1 - 11:00 AM" },
      { name: "Quarter & Semi-Finals", time: "Day 2 - 1:00 PM" },
      { name: "Grand Final on Mega Screen", time: "Day 2 - 6:30 PM" }
    ],
    date: "Nov 14-15, 2026",
    time: "11:00 AM onwards",
    venue: "Advanced Computing Centre & LAN Hall",
    teamSize: "5 Members",
    prizePool: "₹50,000",
    registrationFee: "₹300 / Team",
    featured: false,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Devansh Rao", phone: "+91 98765 43214", email: "esports@ignitefest.edu" }
    ]
  },
  {
    id: "rhythm-riot-dance",
    title: "Rhythm Riot",
    category: "Cultural",
    tagline: "Inter-Collegiate Mega Group Dance Championship",
    description: "Synchronized steps, thrilling acrobatics, cinematic visuals, and infectious groove in South Asia's favorite dance competition.",
    fullDescription: "From high-energy hip-hop and urban choreography to vibrant contemporary and Indo-Western fusion, Rhythm Riot celebrates the art of movement with professional lighting, haze, and sound production.",
    rules: [
      "Team size: 8 to 25 dancers.",
      "Performance duration: 8 to 12 minutes including entry and exit.",
      "Props are allowed provided they do not damage the stage or endanger safety.",
      "Judged on Choreography, Synchronization, Theme Execution, and Overall Impact."
    ],
    rounds: [
      { name: "Main Stage Showcases & Judging", time: "Day 3 - 3:00 PM" }
    ],
    date: "Nov 16, 2026",
    time: "3:00 PM - 7:30 PM",
    venue: "Main Convocation Hall",
    teamSize: "8 - 25 Members",
    prizePool: "₹70,000",
    registrationFee: "₹600 / Team",
    featured: false,
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Pooja Sharma", phone: "+91 98765 43215", email: "pooja.dance@ignitefest.edu" }
    ]
  },
  {
    id: "genai-masterclass",
    title: "Hands-on GenAI & LLM Masterclass",
    category: "Workshops",
    tagline: "Build Autonomous Agents & Multimodal Apps",
    description: "A deep dive into prompt engineering, fine-tuning, RAG architectures, and deploying production-ready AI apps with industry veterans.",
    fullDescription: "Conducted by AI research scientists and industry lead engineers, this workshop provides hands-on labs on deploying open-source models, vector databases, and multi-agent coordination frameworks.",
    rules: [
      "Open to individual participants from any academic stream.",
      "Participants must bring their own laptop with a modern web browser and Python 3.10+ installed.",
      "Free cloud compute credits and API tokens will be provided.",
      "Official certificate of participation and swag pack awarded to all attendees."
    ],
    rounds: [
      { name: "Session 1: Architecture of Modern LLMs", time: "Day 1 - 10:00 AM" },
      { name: "Session 2: Hands-on RAG & Vector Stores", time: "Day 1 - 2:00 PM" },
      { name: "Session 3: Agentic Workflows & Mini Project", time: "Day 1 - 4:00 PM" }
    ],
    date: "Nov 14, 2026",
    time: "10:00 AM - 5:30 PM",
    venue: "Seminar Complex - Hall B",
    teamSize: "Solo (1 Person)",
    prizePool: "Certificates & Swag Kits",
    registrationFee: "₹200",
    featured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Dr. Ananya Sen", phone: "+91 98765 43216", email: "ai.workshop@ignitefest.edu" }
    ]
  },
  {
    id: "codeclash-speed",
    title: "CodeClash: Algorithmic Duel",
    category: "Technical",
    tagline: "Speed Coding & DSA Sprint",
    description: "Solve complex algorithmic puzzles against the ticking clock. Accuracy, optimal big-O complexity, and speed determine the champion.",
    fullDescription: "Inspired by Codeforces and ICPC style contests, CodeClash puts your problem-solving prowess, data structure knowledge, and algorithmic speed to the ultimate test in a high-stakes arena.",
    rules: [
      "Solo participation.",
      "Supported programming languages: C++, Java, Python, and Rust.",
      "Penalty for incorrect submissions: 10 minutes added to solve time.",
      "Internet access will be restricted to documentation only."
    ],
    rounds: [
      { name: "Online Qualification Round", time: "Day 2 - 11:00 AM" },
      { name: "1v1 Head-to-Head Speed Final", time: "Day 2 - 3:00 PM" }
    ],
    date: "Nov 15, 2026",
    time: "11:00 AM - 4:30 PM",
    venue: "Software Engineering Lab 4",
    teamSize: "Solo (1 Person)",
    prizePool: "₹40,000",
    registrationFee: "₹100",
    featured: false,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Nikhil Joshi", phone: "+91 98765 43217", email: "nikhil.code@ignitefest.edu" }
    ]
  },
  {
    id: "vogue-royale",
    title: "Vogue Royale: Fashion Gala",
    category: "Cultural",
    tagline: "Thematic Runway Fashion Show",
    description: "Express your style, haute couture, sustainable designs, and runway confidence under the theme 'Futuristic Retro'.",
    fullDescription: "Vogue Royale is the glamour centerpiece of IGNITE 2026. Teams blend innovative garment design, theatrical music, and poised choreography to tell a story on the runway.",
    rules: [
      "Team size: 10 to 18 members including models, stylists, and choreographers.",
      "Time limit: 12 minutes on stage.",
      "Theme adherence and originality account for 40% of the judging score."
    ],
    rounds: [
      { name: "Runway Presentation & Designer Interview", time: "Day 2 - 7:00 PM" }
    ],
    date: "Nov 15, 2026",
    time: "7:00 PM - 9:30 PM",
    venue: "Main Convocation Auditorium",
    teamSize: "10 - 18 Members",
    prizePool: "₹60,000",
    registrationFee: "₹500 / Team",
    featured: false,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    coordinators: [
      { name: "Meera Sen", phone: "+91 98765 43218", email: "fashion@ignitefest.edu" }
    ]
  }
];
