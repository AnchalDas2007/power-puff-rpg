import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who is eligible to participate in IGNITE 2026?",
      answer: "Any bona fide student currently enrolled in an undergraduate (UG) or postgraduate (PG) program across engineering, sciences, arts, commerce, or medicine from any recognized institution in India or abroad is welcome to participate."
    },
    {
      question: "Are there any entry or registration fees?",
      answer: "General campus entry and flagship events like HackMatrix 36H are completely free! Certain specialized competitions or band/dance team showcases have nominal fees (₹100 - ₹500) to cover equipment, audio setups, and tournament servers. Star celebrity pro-nights are free for all registered event delegates."
    },
    {
      question: "Is accommodation provided for outstation participants?",
      answer: "Yes! Complimentary hostel lodging and dining facilities are provided for participants traveling from outside the district for 2 or more days. Make sure to toggle 'Hostel Accommodation Needed' in your registration form."
    },
    {
      question: "Can I register for multiple events across different categories?",
      answer: "Absolutely! You can participate in multiple events as long as their scheduled timings do not clash. You will receive an official digital delegate badge that permits multiple event entries."
    },
    {
      question: "What documents do I need to bring on the day of the fest?",
      answer: "You must carry your physical College Student ID card and the digital Entry Pass (with QR code) generated upon submitting your registration form on this website."
    },
    {
      question: "When will certificates and prize money be distributed?",
      answer: "Cash prize winners will receive awards during the Grand Valedictory on Day 3, followed by direct bank NEFT transfers within 48 hours. Digital verifiable certificates of merit and participation will be emailed to all participants."
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Everything you need to know about registrations, rules, and campus amenities.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
