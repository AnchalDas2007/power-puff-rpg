# IGNITE 2026 — National College Tech & Cultural Fest Website

A responsive, high-performance, modern web application for a flagship national collegiate festival built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Features

1. **Responsive Navbar & Navigation**
   - Sticky header with glassmorphism blur on scroll.
   - Mobile navigation drawer with hamburger toggle.
   - Smooth scroll anchor links to all major page sections.
   - Gradient CTA button with pulsing fest flame logo.

2. **Hero Section**
   - High-impact typography with animated gradient text.
   - Live real-time countdown timer ticking down to the festival launch date (November 14, 2026).
   - Event metadata highlights: Venue, Dates, ₹5 Lakhs+ Prize Pool, 6,000+ Attendees, 25+ Events, and 3 Celebrity Pro-Nights.
   - Quick action buttons ("Register for Events" & "Explore 25+ Events").

3. **Highlights & Experience Showcase**
   - 4 feature tracks: Cutting-Edge Tech Arenas, Electrifying Stage Arts, Esports & LAN Battles, and Industry Mentors & Internships.
   - Announcement banner for 3 Star Celebrity Pro-Nights (Rock Band Arena, Sunburn Campus EDM Stage, and Bollywood Mega Star Concert).

4. **Interactive Events Grid & Filtering**
   - Category filtering pills: *All*, *Technical*, *Cultural*, *Gaming*, and *Workshops* with live count indicators.
   - Real-time search bar filtering across title, description, category, and venue with instant reset.
   - Glassmorphic event cards showing category tags, prize pool, date, time, venue, team size, and image thumbnails.

5. **Detailed Event Modal Dialog**
   - Accessible modal popup with keyboard Escape key listener and backdrop click-to-close.
   - Full event briefing, official rules & guidelines checklist, round-by-round timeline, and direct coordinator contact information (phone & email).
   - Direct "Register For This Event" CTA that automatically closes the modal and pre-fills the registration form.

6. **Festival Itinerary & Schedule**
   - Interactive day-by-day tabs for Day 1, Day 2, and Day 3.
   - Detailed session timeline cards with start time badges, venues, and colored category tags.

7. **Registration Form & Digital Ticket Generation**
   - Input fields for Full Name, Email, Phone, College/University, Department, and Year of Study.
   - Dynamic participation format toggle (Solo vs. Team) with team name and team size selection.
   - Complimentary hostel accommodation request toggle for outstation participants.
   - Client-side validation with real-time feedback and error messages.
   - Instant digital entry ticket generation with unique Pass ID (`IGNT-2026-XXXX`), scannable QR code, participant and event summary, celebratory confetti animation, and one-click "Print / Save Pass" and "Register Another" actions.

8. **Frequently Asked Questions (FAQ)**
   - Interactive collapsible accordion answering common queries about eligibility, fees, accommodation, certificates, and ID requirements.

9. **Comprehensive Footer**
   - Festival branding and mission statement.
   - Social media links (Instagram, LinkedIn, YouTube, Twitter).
   - Helpdesk contacts, venue address, and phone lines.
   - Interactive newsletter subscription with instant confirmation.

---

## 🚀 Running the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Quick Start
1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your web browser.

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── index.html                  # HTML entry point with Inter font & metadata
├── package.json                # Project dependencies and Vite build scripts
├── postcss.config.js           # PostCSS Tailwind config
├── tailwind.config.js          # Tailwind CSS theme, colors, and keyframe animations
├── vite.config.js              # Vite configuration with @vitejs/plugin-react
└── src/
    ├── main.jsx                # React DOM root mounting
    ├── App.jsx                 # Main application layout & global state coordination
    ├── index.css               # Global Tailwind directives & glassmorphic utility classes
    ├── data/
    │   ├── eventsData.js       # Curated catalog of fest competitions, rules, prizes & coordinators
    │   └── scheduleData.js     # 3-day chronological festival itinerary
    └── components/
        ├── Navbar.jsx           # Responsive top header & mobile drawer
        ├── Hero.jsx             # Hero banner with headlines & stats
        ├── CountdownTimer.jsx   # Dynamic live countdown clock
        ├── Highlights.jsx       # Fest attractions & pro-night showcase
        ├── Events.jsx           # Filterable & searchable event catalog
        ├── EventCard.jsx        # Individual event card presentation
        ├── EventModal.jsx       # Modal dialog for event details & rules
        ├── Schedule.jsx         # 3-Day tabbed festival schedule
        ├── RegistrationForm.jsx # Registration form & digital ticket generator
        ├── FAQ.jsx              # Collapsible FAQ accordion
        └── Footer.jsx           # Footer with links, contacts & newsletter
```
