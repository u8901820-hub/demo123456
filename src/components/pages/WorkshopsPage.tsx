import React from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { WORKSHOPS_CAROUSEL_SLIDES } from '../../data/siteData';
import { Workshop } from '../../types';
import { Calendar, MapPin, Users, CheckCircle2, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface WorkshopsPageProps {
  workshops: Workshop[];
  onEnrollWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({
  workshops,
  onEnrollWorkshop
}) => {
  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Immersive Retreats & Certified Circles
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            Workshops & Healing Retreats
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We regularly conduct experiential retreats in Dharwad on chronic disease reversal, ancestral reconciliation, and advanced mind mechanics. Join small, intimate groups for intensive personal transformation.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={WORKSHOPS_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* Workshops Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A154B]">
              Active Workshop Calendar
            </h2>
            <p className="text-xs text-slate-500">
              Persistent database-managed schedule with live seat availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((ws) => {
              const seatsLeft = ws.seatsTotal - ws.seatsBooked;
              const isFull = seatsLeft <= 0;

              return (
                <div
                  key={ws.id}
                  className="rounded-3xl bg-white border border-amber-200/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                        {ws.format}
                      </span>
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium ${
                        ws.status === 'Enrolling'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {ws.status} · {seatsLeft > 0 ? `${seatsLeft} Seats Left` : 'Waitlist Only'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#4A154B] leading-snug">
                        {ws.title}
                      </h3>
                      {ws.subtitle && (
                        <div className="text-xs text-slate-500 mt-1 font-medium">
                          {ws.subtitle}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {ws.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#5B2373]" />
                        <span><strong>Dates:</strong> {ws.dates}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#5B2373]" />
                        <span><strong>Duration:</strong> {ws.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-[#5B2373]" />
                        <span className="truncate"><strong>Venue:</strong> {ws.venue}</span>
                      </div>
                    </div>

                    {ws.syllabus && ws.syllabus.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-semibold uppercase text-slate-800 tracking-wider">
                          Key Workshop Highlights:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {ws.syllabus.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#4A154B]">
                        {ws.fee}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Facilitator: {ws.leadFacilitator}
                      </div>
                    </div>

                    <button
                      onClick={() => onEnrollWorkshop(ws)}
                      disabled={isFull}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>{isFull ? 'Join Waitlist' : 'Enroll in Workshop'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
