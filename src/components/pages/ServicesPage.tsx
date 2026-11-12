import React, { useState } from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { SERVICES_CAROUSEL_SLIDES, SERVICES_DATA } from '../../data/siteData';
import { Service } from '../../types';
import { CheckCircle2, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Regression & Mind', 'Energy & Aura', 'Divination & Intuitive'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Comprehensive Clinical & Spiritual Menu
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            Healing Services & Modalities
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Choose from internationally accredited subconscious therapies, ancestral systemic clearings, and multi-dimensional energy re-alignment. Available in-person at Dharwad Sanctuary and globally via live Zoom.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={SERVICES_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5B2373] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white border border-amber-200/70 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#D97706] uppercase tracking-wide">
                    {service.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-mono text-[11px] border border-amber-200">
                    {service.format}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#4A154B] leading-snug">
                    {service.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {service.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Indications list */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">
                    Key Indications & When to Seek This:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {service.indications.map((ind, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Session specs */}
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5B2373]" />
                    <span>{service.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#5B2373]" />
                    <span>{service.recommendedSessions}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-[#4A154B]">
                    {service.investment}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Inclusive of intake & post-session guidance
                  </div>
                </div>
                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
