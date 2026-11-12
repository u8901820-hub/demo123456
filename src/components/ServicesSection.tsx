import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/siteData';
import { Service } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Regression & Mind', 'Energy & Aura', 'Divination & Intuitive', 'Certifications'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  // Map real service photos from myreincarnation.in
  const getRealServicePhoto = (id: string) => {
    switch (id) {
      case 'past-life-regression':
        return '/src/assets/real/plr.jpg';
      case 'clinical-hypnotherapy':
        return '/src/assets/real/hypnotherapy.jpg';
      case 'inner-child-womb-healing':
        return '/src/assets/real/inner_child.jpg';
      case 'family-constellation':
        return '/src/assets/real/family_constellation.jpg';
      case 'kirlian-aura-photography':
        return '/src/assets/real/kirlian_before.png';
      default:
        return '/src/assets/real/collage.jpg';
    }
  };

  return (
    <section id="modalities" className="py-20 bg-[#0A1C17] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
            <span>Therapeutic Taxonomy & Healing Arts</span>
            <span aria-hidden="true">·</span>
            <span>Real Clinical Modalities</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-50">
            Sacred Modalities Guided by Mrs. Veena Tikare
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
            Every session at BODHI is customized to your unique soul blueprint—combining scientific subconscious hypnosis with subtle energy medicine to resolve root causes rather than mask symptoms.
          </p>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#D28A38] text-[#0A1C17] shadow-sm font-semibold'
                    : 'bg-[#102D26] text-emerald-100 hover:text-white hover:bg-[#15483B] border border-emerald-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee Featured Card (Past Life Regression with Real Photo) */}
        {activeCategory === 'All' && (
          <div className="mb-10 rounded-2xl bg-[#102D26] border border-[#D28A38]/40 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
              <img
                src="/src/assets/real/plr.jpg"
                alt="Real photograph of Past Life Regression therapy at BODHI Dharwad"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102D26] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#102D26]" />
              <div className="absolute bottom-3 left-3 bg-[#0A1C17]/80 backdrop-blur-sm text-[11px] px-2 py-0.5 rounded text-amber-200 border border-emerald-800">
                Real Clinical Photo · Dharwad
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#D28A38] font-medium">
                  <span>Signature Modality</span>
                  <span aria-hidden="true">·</span>
                  <span>TASSO International Accredited</span>
                  <span aria-hidden="true">·</span>
                  <span>120 Minutes</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-amber-50">
                  Past Life Regression Therapy (PLR)
                </h3>

                <p className="text-sm text-emerald-100/90 leading-relaxed font-light">
                  Journey safely beyond the linear timeline into the cellular and soul memory repositories. By accessing the specific lifetime where your current chronic pain, deep fear, or toxic relationship contract originated, Mrs. Veena Tikare guides the resolution and release of unresolved energetic trauma.
                </p>

                {/* Key Indications with subtle unboxed styling */}
                <div className="pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2">
                    Primary Clinical Indications:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D28A38]" />
                      <span>Unexplained chronic aches & migraines</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D28A38]" />
                      <span>Severe claustrophobia & water phobias</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D28A38]" />
                      <span>Recurring karmic relationship loops</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D28A38]" />
                      <span>Existential longing & life purpose block</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-emerald-200/80">
                  <span className="text-amber-200 font-semibold text-sm">₹4,500</span> per session
                  <span className="mx-2">·</span>
                  <span>In Dharwad Sanctuary or Zoom</span>
                </div>

                <button
                  onClick={() => onSelectService(SERVICES_DATA[0])}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Regression Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid with Real Photography Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            if (activeCategory === 'All' && service.id === 'past-life-regression') return null;

            return (
              <div
                key={service.id}
                className="rounded-xl bg-[#102D26] border border-emerald-900/60 hover:border-[#D28A38]/50 overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 duration-200 shadow-md hover:shadow-xl"
              >
                {/* Real photo header for card */}
                <div className="relative h-44 overflow-hidden bg-[#0A1C17]">
                  <img
                    src={getRealServicePhoto(service.id)}
                    alt={`Real photo for ${service.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102D26] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#0A1C17]/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-amber-200 border border-emerald-800">
                    {service.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0A1C17]/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-emerald-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D28A38]" />
                    <span>{service.durationMinutes}m</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-amber-50 mb-0.5">
                        {service.title}
                      </h3>
                      <div className="text-xs text-emerald-300/80 font-light">
                        {service.subtitle}
                      </div>
                    </div>

                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Indications */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-200/80">
                        Who It Helps:
                      </div>
                      <ul className="space-y-0.5 text-xs text-slate-300">
                        {service.indications.slice(0, 2).map((ind, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#D28A38] mt-0.5">•</span>
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-amber-200 font-semibold">{service.investment}</span>
                      <div className="text-[10px] text-emerald-300/70">{service.format}</div>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      className="px-3.5 py-2 text-xs font-medium rounded-lg bg-[#144A3F] hover:bg-[#D28A38] hover:text-[#0A1C17] text-amber-200 border border-[#D28A38]/40 transition-all whitespace-nowrap"
                    >
                      Select Modality
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
