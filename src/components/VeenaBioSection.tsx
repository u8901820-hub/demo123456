import React from 'react';
import { FOUNDER_INFO } from '../data/siteData';
import { CheckCircle, MapPin, Phone, Mail, Award, ShieldCheck } from 'lucide-react';

interface VeenaBioProps {
  onBookConsult: () => void;
}

export const VeenaBioSection: React.FC<VeenaBioProps> = ({ onBookConsult }) => {
  return (
    <section id="founder" className="py-20 bg-[#0A1C17] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Real Portrait of Mrs. Veena Tikare */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D28A38]/40 shadow-2xl bg-[#102D26] max-w-md mx-auto lg:max-w-none">
              <img
                src="/src/assets/real/veena_tikare.jpg"
                alt="Real photograph of Mrs. Veena Tikare - Master Clinical Hypnotherapist and Founder of BODHI"
                referrerPolicy="no-referrer"
                className="w-full h-96 sm:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C17] via-[#0A1C17]/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0A1C17]/95 backdrop-blur-md border border-[#D28A38]/40 text-xs">
                <div className="font-serif text-lg font-semibold text-amber-200">
                  {FOUNDER_INFO.name}
                </div>
                <div className="text-[11px] text-emerald-200/90 mt-0.5">
                  Certified Clinical Hypnotherapist & Trainer (EKAA) · TASSO Regression Therapist (Netherlands)
                </div>
                <div className="text-[10px] text-amber-300 font-mono mt-1">
                  Founder of BODHI Wellness Centre · Dharwad
                </div>
              </div>
            </div>

            {/* Clinic Direct Details */}
            <div className="p-4 rounded-xl bg-[#102D26] border border-emerald-800 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-emerald-100/90">
                <MapPin className="w-4 h-4 text-[#D28A38] shrink-0 mt-0.5" />
                <span>{FOUNDER_INFO.location}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60">
                <a href={`tel:${FOUNDER_INFO.phone}`} className="flex items-center gap-1.5 text-amber-300 hover:text-white font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{FOUNDER_INFO.phone}</span>
                </a>
                <a href={`mailto:${FOUNDER_INFO.email}`} className="flex items-center gap-1.5 text-emerald-300 hover:text-white">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{FOUNDER_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
              <span>Master Practitioner & Founder</span>
              <span aria-hidden="true">·</span>
              <span>BODHI Wellness Centre Dharwad</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-50">
              Healing the Unspoken Roots of Human Suffering
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
              With over two decades of immersion in clinical hypnosis, metaphysical healing, and transpersonal regression, <strong>Mrs. Veena Tikare</strong> brings an uncompromising level of clinical precision combined with profound maternal compassion.
            </p>

            <p className="text-xs sm:text-sm text-emerald-200/80 font-light leading-relaxed">
              Having trained directly under international pioneers at TASSO International (Netherlands) and EKAA Institute of Hypnotherapy, her clinical practice in Dharwad draws clients from across India, the Middle East, and Europe seeking answers to complex psychosomatic and karmic blockages.
            </p>

            {/* Certifications Matrix */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                Certified Professional Credentials:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {FOUNDER_INFO.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#102D26] border border-emerald-900/60">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D28A38] shrink-0 mt-0.5" />
                    <span className="leading-tight text-emerald-100/90">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookConsult}
                className="px-6 py-3 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors shadow-md"
              >
                Schedule Consultation with Mrs. Veena
              </button>
              <div className="text-xs text-emerald-300/80">
                Second & Fourth Thursdays reserved for <span className="text-amber-200 font-medium">LIGHT Free Seva</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
