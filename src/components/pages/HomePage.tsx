import React from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { 
  HOME_CAROUSEL_SLIDES, CORE_PILLARS, HEALING_PATHWAY_STEPS, 
  CONDITIONS_TREATED, SERVICES_DATA, GENUINE_CLIENT_TESTIMONIALS 
} from '../../data/siteData';
import { Service, Workshop } from '../../types';
import { ArrowRight, Clock, Award, Smile, CheckCircle2, Calendar, Star, Sparkles, Heart } from 'lucide-react';

interface HomePageProps {
  onOpenBooking: () => void;
  onSelectService: (service: Service) => void;
  workshops: Workshop[];
  onEnrollWorkshop: (workshop: Workshop) => void;
  onNavigate: (page: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onSelectService,
  workshops,
  onEnrollWorkshop,
  onNavigate
}) => {
  const getPillarIcon = (name: string) => {
    if (name === 'clock') return <Clock className="w-6 h-6 text-white" />;
    if (name === 'award') return <Award className="w-6 h-6 text-white" />;
    return <Smile className="w-6 h-6 text-white" />;
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800">
      
      {/* 1. HERO SECTION (MATCHING SCREENSHOT FROM MYREINCARNATION.IN) */}
      <section className="relative pt-12 sm:pt-16 pb-20 bg-gradient-to-b from-[#FFF5E6] via-[#FFF9F2] to-[#FAF8F5] border-b border-amber-200/40 overflow-hidden">
        
        {/* Subtle Warm Spiritual Aura Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-br from-amber-200/30 via-purple-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Centered Typography Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            
            {/* Pill: 10+ YEARS OF EXCELLENCE */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-amber-300/80 shadow-xs text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              <span>10+ Years of Excellence</span>
            </div>

            {/* Main Headline from Screenshot */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#4A154B] leading-tight">
              Discover the Healing Within You
            </h1>

            {/* Subtitle from Screenshot */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              A journey of self-discovery, healing and inner transformation through holistic practices that reconnect you with your mind, body and inner self.
            </p>

            {/* Action CTA Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-[#5B2373] font-semibold text-sm shadow-md hover:shadow-lg border border-purple-200/80 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#5B2373]" />
              </button>
            </div>

          </div>

          {/* Hero Image Carousel with Real Indian Photographs */}
          <div className="max-w-5xl mx-auto">
            <ImageCarousel
              slides={HOME_CAROUSEL_SLIDES}
              aspectRatio="hero"
              autoPlayInterval={6000}
            />
          </div>

          {/* 3 Core Floating Pillars (Exact replica from Screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-amber-100 flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#5B2373] flex items-center justify-center shadow-sm shrink-0">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. THE 4-STEP HEALING PATHWAY (REPLACES TECHNICAL BIO/HARDWARE) */}
      <section className="py-20 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              Subconscious Transformation Methodology
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B]">
              The 4-Step Healing Pathway
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Every session at BODHI is crafted with clinical precision, honoring your nervous system, emotional pacing, and spiritual sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEALING_PATHWAY_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#FFFDF8] border border-amber-200/60 space-y-3 hover:border-purple-300 transition-colors shadow-xs"
              >
                <div className="font-mono text-2xl font-bold text-[#D97706]">
                  {step.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#4A154B] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CONDITIONS WE RELIEVE & TRANSFORM */}
      <section className="py-20 bg-[#FAF8F5] border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              Targeted Therapeutic Scope
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B]">
              Conditions We Relieve & Restore
            </h2>
            <p className="text-sm text-slate-600">
              Drug-free subconscious therapeutics designed to dissolve recurring root triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONDITIONS_TREATED.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#4A154B]">
                    {c.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {c.details}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURED MODALITIES PREVIEW */}
      <section className="py-20 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
                Core Healing Practices
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B] mt-1">
                Transpersonal Healing Modalities
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-semibold text-[#5B2373] hover:text-[#4A154B] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Modalities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="rounded-2xl bg-[#FFFDF8] border border-amber-200/60 p-6 flex flex-col justify-between space-y-4 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <div className="text-[11px] font-semibold text-[#D97706] uppercase tracking-wide">
                    {service.category}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#4A154B] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    {service.investment}
                  </span>
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-3.5 py-1.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-medium transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WORKSHOPS & RETREATS TEASER */}
      {workshops && workshops.length > 0 && (
        <section className="py-20 bg-[#FAF8F5] border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
                  Immersive Group Healing
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B] mt-1">
                  Upcoming Workshops & Retreats
                </h2>
              </div>
              <button
                onClick={() => onNavigate('workshops')}
                className="text-xs font-semibold text-[#5B2373] hover:text-[#4A154B] flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Calendar & Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.slice(0, 2).map((ws) => (
                <div
                  key={ws.id}
                  className="rounded-2xl bg-white border border-amber-200/70 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#D97706] font-semibold">
                      <span>{ws.format}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px]">
                        {ws.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                      {ws.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {ws.description}
                    </p>
                    <div className="text-xs text-slate-500 pt-1">
                      <strong>Dates:</strong> {ws.dates} · <strong>Duration:</strong> {ws.duration}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4A154B]">
                      {ws.fee}
                    </span>
                    <button
                      onClick={() => onEnrollWorkshop(ws)}
                      className="px-4 py-2 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      Enroll in Workshop
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. GENUINE CUSTOMER TESTIMONIALS (REAL PATIENTS, NO FAKE BADGES) */}
      <section className="py-20 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              Real People · Real Healing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B]">
              Genuine Patient Stories & Outcomes
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Words shared directly by individuals and families whose lives shifted through transpersonal guidance at BODHI Wellness Centre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENUINE_CLIENT_TESTIMONIALS.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-[#FFFDF8] border border-amber-200/60 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#4A154B] leading-snug">
                    "{t.title}"
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100/80">
                  <div className="font-serif text-sm font-bold text-[#4A154B]">
                    {t.clientName}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{t.location}</span>
                    <span className="text-[#D97706] font-medium">{t.serviceName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. THE LIGHT INITIATIVE BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5E6] to-[#FFFBF5] border-b border-amber-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <span>Free Community Seva</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B]">
            The LIGHT Initiative: Healing Without Barriers
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Free community healing sessions conducted on the 2nd & 4th Thursday of every month by Mrs. Veena Tikare and the BODHI collective. Open to all who seek peace, emotional relief, and ancestral blessings.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('light')}
              className="px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold transition-all shadow-sm"
            >
              Explore Free Thursday Sessions
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
