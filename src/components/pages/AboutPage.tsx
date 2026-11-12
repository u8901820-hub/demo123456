import React from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { ABOUT_CAROUSEL_SLIDES, FOUNDER_INFO } from '../../data/siteData';
import { Award, CheckCircle2, Heart, Shield, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Our Foundation & Philosophy
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            About BODHI Wellness Centre
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            For over a decade, BODHI has stood as a sanctuary of hope, clinical excellence, and sacred transpersonal exploration in Dharwad, Karnataka.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={ABOUT_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* Founder Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-amber-200/60 shadow-xs">
          
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden shadow-md border-4 border-amber-100">
              <img
                src={FOUNDER_INFO.realPhoto}
                alt={FOUNDER_INFO.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#4A154B]">
                {FOUNDER_INFO.name}
              </h2>
              <div className="text-xs text-[#D97706] font-semibold mt-1">
                Founder, Master Hypnotherapist & Trainer
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                BODHI Wellness Centre, Dharwad
              </div>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold shadow-sm transition-all"
            >
              Consult with Mrs. Veena
            </button>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
                Clinical & Spiritual Dedication
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A154B]">
                "Every Human Being Carries the Blueprint for Their Own Wholeness."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {FOUNDER_INFO.bio}
              </p>
            </div>

            {/* Accreditations Grid */}
            <div className="space-y-2 pt-2 border-t border-amber-100">
              <div className="text-xs font-semibold uppercase text-slate-800">
                Official Credentials & Certifications:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {FOUNDER_INFO.certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Sanctuary Values & Ethics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-amber-200/60 space-y-3">
            <Shield className="w-8 h-8 text-[#5B2373]" />
            <h4 className="font-serif text-xl font-bold text-[#4A154B]">Absolute Confidentiality</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your regression memories, subconscious disclosures, and personal challenges are held in sacred trust with zero judgment and strict medical-grade discretion.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-amber-200/60 space-y-3">
            <Sparkles className="w-8 h-8 text-[#D97706]" />
            <h4 className="font-serif text-xl font-bold text-[#4A154B]">Drug-Free Healing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on untangling emotional roots and neurological stress pathways, restoring balance without pharmaceutical dependencies or synthetic suppression.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-amber-200/60 space-y-3">
            <Heart className="w-8 h-8 text-[#5B2373]" />
            <h4 className="font-serif text-xl font-bold text-[#4A154B]">Seva & Compassion</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Through the LIGHT initiative, our doors remain open to all segments of society, ensuring financial hardship never stands between a soul and healing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
