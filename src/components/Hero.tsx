import React from 'react';
import { Calendar, Compass, ShieldCheck, Star, ExternalLink, MapPin } from 'lucide-react';
import { FOUNDER_INFO, GOOGLE_REVIEWS_URL } from '../data/siteData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onOpenAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz, onOpenAnalysis }) => {
  return (
    <section className="relative bg-[#0A1C17] text-slate-100 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#D28A38]/20">
      {/* Subtle ambient lighting with emerald and warm saffron */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E6554]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D28A38]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Google Review Trust Kicker */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D26] border border-[#D28A38]/40 text-amber-200 hover:bg-[#15483B] transition-colors shadow-sm"
              >
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.8 / 5.0</span>
                <span className="text-emerald-300">Google Customer Feedback</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
              <span className="text-emerald-300/80">· Dharwad Sanctuary · TASSO & EKAA Certified</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-amber-50 leading-[1.12]" style={{ textWrap: 'balance' }}>
              Unlock subconscious wisdom. Dissolve trauma across lifetimes.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-light">
              Founded by master hypnotherapist <strong>Mrs. Veena Tikare</strong>, BODHI provides drug-free transpersonal therapies to resolve psychosomatic pain, deep-seated emotional knots, and karmic contracts through scientific regression and biofield aura diagnostics.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-medium text-sm transition-all shadow-md hover:shadow-xl whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Therapy Consultation</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#144A3F] hover:bg-[#1E6554] border border-[#D28A38]/40 text-amber-100 font-medium text-sm transition-colors whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#D28A38]" />
                <span>Soul Alignment Finder (2 min)</span>
              </button>
            </div>

            {/* Quick trust note */}
            <div className="pt-2 flex items-center gap-4 text-xs text-emerald-300/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D28A38]" />
                <span>100% Confidential & Drug-Free</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>In-Clinic (Dharwad Sanctuary) or Global Live Sessions</span>
            </div>

          </div>

          {/* Right Column: Real Photographic Asset of BODHI Sanctuary */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D28A38]/30 shadow-2xl bg-[#102D26]">
              <img
                src={FOUNDER_INFO.realSanctuary}
                alt="Real photograph of BODHI Wellness Centre in Dharwad, Karnataka"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C17] via-[#0A1C17]/25 to-transparent" />
              
              {/* Overlay with real official BODHI brand lockup */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0A1C17]/90 backdrop-blur-md border border-[#D28A38]/40 shadow-lg flex items-center gap-3">
                <div className="bg-white p-1 rounded-md shrink-0">
                  <img
                    src={FOUNDER_INFO.realLogo}
                    alt="Real BODHI Logo"
                    className="w-16 h-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-amber-200 truncate">BODHI Wellness Sanctuary</div>
                  <div className="text-[11px] text-emerald-200/90 truncate">"Shreeshaya", Narayanpur, Dharwad</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip below hero split */}
        <div className="mt-14 pt-8 border-t border-[#D28A38]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-amber-100 tabular-nums">
              4.8 ★ Google
            </div>
            <div className="text-xs font-medium text-emerald-300/80">
              Verified Customer Reviews
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-amber-100">
              TASSO & EKAA
            </div>
            <div className="text-xs font-medium text-emerald-300/80">
              International Regression Credentials
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-amber-100">
              Real Biofield
            </div>
            <div className="text-xs font-medium text-emerald-300/80">
              Kirlian Chakra & Aura Photography
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-amber-100">
              LIGHT Initiative
            </div>
            <div className="text-xs font-medium text-emerald-300/80">
              Free Community Seva (2nd & 4th Thu)
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
