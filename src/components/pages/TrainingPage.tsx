import React from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { TRAINING_CAROUSEL_SLIDES, TRAINING_LEVELS, FOUNDER_INFO } from '../../data/siteData';
import { Award, BookOpen, CheckCircle2, GraduationCap, Users, ArrowRight } from 'lucide-react';

interface TrainingPageProps {
  onOpenBooking: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Professional Certification & Master Mentorship
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            EKAA Clinical Hypnotherapy Training
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Gain international professional credentials in subconscious mind mechanics and transpersonal regression. Accredited by IMDHA (USA) and taught personally by Mrs. Veena Tikare.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={TRAINING_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* Trainer Credentials Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#5B2373] flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                Learn Directly from Certified EKAA Trainer Mrs. Veena Tikare
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Nearly two decades of clinical case work, IMDHA (USA) recognition, and hands-on guidance.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold whitespace-nowrap shadow-sm cursor-pointer"
          >
            Inquire for Next Batch
          </button>
        </div>

        {/* Levels Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A154B]">
              Integrated Training Curriculum
            </h2>
            <p className="text-xs text-slate-500">
              Progressive mastery from foundational trance mechanics to transpersonal past life regression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAINING_LEVELS.map((lvl, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-amber-200/70 p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#D97706] font-bold">
                      {lvl.duration}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5B2373] font-semibold text-[11px] border border-purple-200">
                      {lvl.credential}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                    {lvl.level}
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-semibold uppercase text-slate-700 tracking-wider">
                      Core Modules Covered:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {lvl.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Official Manual, Scripts & Certification Included
                  </span>
                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Register Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
