import React, { useState } from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { LIGHT_CAROUSEL_SLIDES, FOUNDER_INFO } from '../../data/siteData';
import { Heart, Sparkles, Calendar, CheckCircle2, Users, Send } from 'lucide-react';

export const LightPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            <span>100% Free Healing Seva</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            LIGHT – Free Healing Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            "I have been working in this healing field for nearly two decades. Now, I have decided to give back to society by organizing free group healings and therapy sessions for anyone in need." — Mrs. Veena Tikare
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={LIGHT_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* The Story of LIGHT Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-amber-200/80 shadow-xs">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              A Spiritual Pledge
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A154B]">
              Healing Rooted in Love, Accessible to All
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At BODHI Wellness Centre, we hold the conviction that healing is a universal human right. Economic hardship should never prevent a soul from releasing deep grief, breaking ancestral loops, or finding mental clarity.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Many of Mrs. Veena’s graduated hypnotherapists and healers have also joined in this noble seva, offering their hearts and hands to facilitate these community gatherings every month.
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-800">
                What We Focus on in Free Thursday Sessions:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                  <span><strong>Mother & Father Wound Healing:</strong> Guided meditations to release subconscious resentment and reclaim parental blessings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                  <span><strong>Womb Consciousness & In-Utero Re-parenting:</strong> Calming pre-natal distress and restoring nervous system safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                  <span><strong>Collective Lineage Peace:</strong> Group energetic prayers to bring closure to deceased ancestors and family disharmony.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Free Sign-up Form */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#D97706] uppercase tracking-wide">
                Next Upcoming Session
              </div>
              <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                Join the Next Free Thursday Gathering
              </h3>
              <p className="text-xs text-slate-500">
                Held online via Zoom and in-person at Dharwad Sanctuary. Zero fees required.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <Heart className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Welcome to the LIGHT Circle!
                </h4>
                <p className="text-xs text-emerald-800">
                  Thank you, <strong>{name}</strong>. The Zoom link and preparatory notes for the upcoming Thursday session have been recorded. We look forward to holding space with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Ananya Deshpande"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Email Address (for session Zoom link):</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">WhatsApp Number (for session reminder):</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer mt-2"
                >
                  Confirm Free Thursday Spot
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
