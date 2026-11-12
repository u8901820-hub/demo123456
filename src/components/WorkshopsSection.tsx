import React, { useState } from 'react';
import { Workshop } from '../types';
import { Calendar, MapPin, Users, CheckCircle2, Clock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface WorkshopsSectionProps {
  workshops: Workshop[];
  onRegisterWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({
  workshops,
  onRegisterWorkshop
}) => {
  return (
    <section id="workshops" className="py-20 bg-[#0A1C17] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
            <span>Immersive Retreats & Certified Training</span>
            <span aria-hidden="true">·</span>
            <span>BODHI Academy Dharwad</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-50">
            Workshops & Healing Retreats
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
            Gain transformative practical skills, uncover metaphysical roots of chronic illness, and earn international credentials in Clinical Hypnosis and Family Systemic Constellations.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((ws) => {
            const seatsLeft = ws.seatsTotal - ws.seatsBooked;
            const isFull = seatsLeft <= 0;

            return (
              <div
                key={ws.id}
                className="rounded-2xl bg-[#102D26] border border-emerald-900/70 hover:border-[#D28A38]/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Badges & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#0A1C17] text-amber-300 border border-[#D28A38]/30">
                        {ws.format}
                      </span>
                      {ws.badge && (
                        <span className="text-[11px] font-semibold text-[#D28A38]">
                          ★ {ws.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      ws.status === 'Enrolling' 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700' 
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    }`}>
                      {ws.status} · {seatsLeft > 0 ? `${seatsLeft} Seats Remaining` : 'Fully Booked'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-amber-50 leading-snug">
                      {ws.title}
                    </h3>
                    <div className="text-xs text-emerald-300/80 mt-1 font-light">
                      {ws.subtitle}
                    </div>
                  </div>

                  <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
                    {ws.description}
                  </p>

                  {/* Metadata pill-less row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-emerald-200/90 pt-2 border-t border-emerald-900/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D28A38] shrink-0" />
                      <span>{ws.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D28A38] shrink-0" />
                      <span>{ws.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D28A38] shrink-0" />
                      <span className="truncate">{ws.venue}</span>
                    </div>
                  </div>

                  {/* Syllabus / Key Highlights */}
                  {ws.syllabus && ws.syllabus.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-200/90">
                        What You Will Experience:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {ws.syllabus.map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D28A38] shrink-0 mt-0.5" />
                            <span className="text-emerald-100/80">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Card Action footer */}
                <div className="pt-5 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-amber-200">
                      {ws.fee}
                    </div>
                    <div className="text-[11px] text-emerald-300/70">
                      Facilitator: {ws.leadFacilitator}
                    </div>
                  </div>

                  <button
                    onClick={() => onRegisterWorkshop(ws)}
                    disabled={isFull}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <span>{isFull ? 'Waitlist Only' : 'Enroll in Workshop'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
