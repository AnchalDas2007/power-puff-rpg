import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, QrCode, Printer, RotateCcw, User, Mail, Phone, Building, BookOpen, Layers, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS_DATA } from '../data/eventsData';

export default function RegistrationForm({ preselectedEventId, onResetPreselected }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: 'Computer Science & Engg',
    yearOfStudy: '3rd Year',
    eventId: preselectedEventId || 'hackmatrix-2026',
    participationType: 'team',
    teamName: '',
    teamSize: '3',
    accommodation: 'no',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Synchronize when preselectedEventId changes from clicking card
  useEffect(() => {
    if (preselectedEventId) {
      setFormData((prev) => ({ ...prev, eventId: preselectedEventId }));
      setTicketData(null);
    }
  }, [preselectedEventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College or University name is required.';
    }

    if (formData.participationType === 'team' && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required for team participation.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the fest rules and code of conduct.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      const selectedEvent = EVENTS_DATA.find((ev) => ev.id === formData.eventId) || EVENTS_DATA[0];
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const regId = `IGNT-2026-${randomCode}`;

      const generatedTicket = {
        registrationId: regId,
        participantName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        eventTitle: selectedEvent.title,
        eventCategory: selectedEvent.category,
        eventDate: selectedEvent.date,
        eventVenue: selectedEvent.venue,
        eventTime: selectedEvent.time,
        participationType: formData.participationType,
        teamName: formData.teamName,
        teamSize: formData.teamSize,
        accommodation: formData.accommodation,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setTicketData(generatedTicket);
      setIsSubmitting(false);

      // Trigger confetti celebrate
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback if confetti isn't supported in environment
      }
    }, 800);
  };

  const handleReset = () => {
    setTicketData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      department: 'Computer Science & Engg',
      yearOfStudy: '3rd Year',
      eventId: 'hackmatrix-2026',
      participationType: 'team',
      teamName: '',
      teamSize: '3',
      accommodation: 'no',
      agreeTerms: false
    });
    setErrors({});
    if (onResetPreselected) onResetPreselected();
  };

  return (
    <section id="register" className="py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span>Fast & Seamless Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Claim Your Spot at IGNITE 2026
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Fill in your details to secure your entry pass. Instant digital ticket generated upon registration.
          </p>
        </div>

        {/* Display Digital Ticket if submitted, otherwise render Form */}
        {ticketData ? (
          /* DIGITAL ENTRY PASS / TICKET */
          <div className="animate-in zoom-in-95 duration-300 max-w-2xl mx-auto">
            <div className="glass-card rounded-3xl border-2 border-brand-500/40 p-6 sm:p-8 shadow-2xl shadow-brand-950/80 relative overflow-hidden bg-slate-900/90">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-500 via-accent-pink to-accent-amber" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white">IGNITE 2026</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Official Festival Delegate Pass</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Pass ID</div>
                  <div className="text-sm sm:text-base font-mono font-extrabold text-brand-400">
                    {ticketData.registrationId}
                  </div>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Participant</span>
                  <span className="text-sm font-bold text-white block">{ticketData.participantName}</span>
                  <span className="text-slate-400">{ticketData.college}</span>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Registered Event</span>
                  <span className="text-sm font-bold text-accent-pink block">{ticketData.eventTitle}</span>
                  <span className="text-slate-400">{ticketData.eventCategory} Track</span>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Schedule & Venue</span>
                  <span className="font-semibold text-white block">{ticketData.eventDate} • {ticketData.eventTime}</span>
                  <span className="text-slate-400 truncate block">{ticketData.eventVenue}</span>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Participation Type</span>
                  <span className="font-semibold text-white block">
                    {ticketData.participationType === 'team'
                      ? `Team: ${ticketData.teamName} (${ticketData.teamSize} members)`
                      : 'Solo Participant'}
                  </span>
                  <span className="text-slate-400">
                    Accommodation: {ticketData.accommodation === 'yes' ? 'Requested' : 'Not required'}
                  </span>
                </div>
              </div>

              {/* QR Code and Instructions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-brand-950/30 border border-brand-500/20 mb-6">
                <div className="w-20 h-20 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <QrCode className="w-16 h-16 text-slate-950" />
                </div>
                <div className="text-xs text-slate-300 text-center sm:text-left">
                  <p className="font-bold text-white mb-1">Present this QR at the Main Campus Gate</p>
                  <p className="text-slate-400">
                    Carry your valid College Student ID card for physical verification and delegate wristband collection.
                  </p>
                </div>
              </div>

              {/* Ticket Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Pass</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-pink text-xs font-bold text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Register Another Participant</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* INTERACTIVE REGISTRATION FORM */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl bg-slate-900/80"
          >
            <div className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-accent-pink">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Aditi Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-accent-pink">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. aditi@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Mobile Number <span className="text-accent-pink">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    College / University <span className="text-accent-pink">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="college"
                      placeholder="e.g. National Institute of Technology"
                      value={formData.college}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.college
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {errors.college && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.college}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Department & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Department / Stream
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="Computer Science & Engg">Computer Science & Engg</option>
                      <option value="Information Science">Information Science</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Mechanical / Mechatronics">Mechanical / Mechatronics</option>
                      <option value="Arts, Media & Design">Arts, Media & Design</option>
                      <option value="Commerce & Management">Commerce & Management</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Event Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Event <span className="text-accent-pink">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  >
                    {EVENTS_DATA.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        [{ev.category}] {ev.title} — {ev.date} ({ev.prizePool} Prize)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Participation Type & Team Name */}
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Participation Format
                  </span>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                      <input
                        type="radio"
                        name="participationType"
                        value="team"
                        checked={formData.participationType === 'team'}
                        onChange={handleChange}
                        className="text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900 border-slate-700"
                      />
                      <span>Team Entry</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                      <input
                        type="radio"
                        name="participationType"
                        value="solo"
                        checked={formData.participationType === 'solo'}
                        onChange={handleChange}
                        className="text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900 border-slate-700"
                      />
                      <span>Solo / Individual</span>
                    </label>
                  </div>
                </div>

                {formData.participationType === 'team' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Team Name <span className="text-accent-pink">*</span>
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        placeholder="e.g. Byte Bandits"
                        value={formData.teamName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          errors.teamName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-700 focus:border-brand-500 focus:ring-brand-500'
                        }`}
                      />
                      {errors.teamName && (
                        <p className="mt-1 text-xs text-red-400">{errors.teamName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Team Size (including team lead)
                      </label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1"
                      >
                        <option value="2">2 Members</option>
                        <option value="3">3 Members</option>
                        <option value="4">4 Members</option>
                        <option value="5+">5+ Members</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 6: Campus Accommodation Radio */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <div>
                  <span className="text-sm font-semibold text-white block">
                    Campus Hostel Accommodation Needed?
                  </span>
                  <span className="text-xs text-slate-400">
                    Complimentary for participants traveling from outside the district/state.
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input
                      type="radio"
                      name="accommodation"
                      value="yes"
                      checked={formData.accommodation === 'yes'}
                      onChange={handleChange}
                      className="text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <span>Yes, Please</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input
                      type="radio"
                      name="accommodation"
                      value="no"
                      checked={formData.accommodation === 'no'}
                      onChange={handleChange}
                      className="text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Row 7: Terms Agreement Checkbox */}
              <div>
                <label className="inline-flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded bg-slate-950 border-slate-700 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-xs text-slate-400 leading-normal">
                    I confirm that the details provided are genuine and agree to abide by the festival code of conduct, campus regulations, and the decisions of event judges.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-pink hover:opacity-95 shadow-xl shadow-brand-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Digital Delegate Pass...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-accent-amber" />
                      <span>Complete Registration & Generate Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
