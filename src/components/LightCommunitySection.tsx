import React, { useState } from 'react';
import { Heart, Calendar, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

export const LightCommunitySection: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setRegistered(true);
    }
  };

  return (
    <section id="light-seva" className="py-20 bg-[#0A1C17] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-gradient-to-br from-[#102D26] to-[#071612] border border-[#D28A38]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-6 relative z-10">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
              <span>Charitable Seva Platform</span>
              <span aria-hidden="true">·</span>
              <span>Every 2nd & 4th Thursday</span>
              <span aria-hidden="true">·</span>
              <span>100% Free</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-50">
              The LIGHT Initiative: Healing Without Barriers
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
              BODHI was founded with a spiritual pledge: everyone deserves access to energetic healing regardless of financial capability. Through our bi-monthly <strong>LIGHT</strong> gatherings, Mrs. Veena Tikare and local senior therapists offer free group guided meditations, maternal/paternal wound dissolution, and collective healing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0A1C17]/80 border border-emerald-900/60">
                <div className="font-serif text-lg font-semibold text-amber-200 mb-1">
                  Womb & Birth Healing
                </div>
                <p className="text-xs text-emerald-200/80">
                  Dissolve stress and trauma absorbed in-utero during gestation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A1C17]/80 border border-emerald-900/60">
                <div className="font-serif text-lg font-semibold text-amber-200 mb-1">
                  Mother & Father Wound
                </div>
                <p className="text-xs text-emerald-200/80">
                  Release subconscious resentment and reclaim parental blessing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A1C17]/80 border border-emerald-900/60">
                <div className="font-serif text-lg font-semibold text-amber-200 mb-1">
                  Ancestral Peace
                </div>
                <p className="text-xs text-emerald-200/80">
                  Collective systemic prayers for peace across familial lineages.
                </p>
              </div>
            </div>

            {/* Registration Box */}
            <div className="pt-4">
              {registered ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    Thank you, {name}! You have been registered for the upcoming <strong>Thursday LIGHT Seva Session</strong>. Meeting details sent to {email}.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-[#0A1C17] border border-emerald-700/60 text-slate-100 placeholder-emerald-400/50 text-xs focus:outline-none focus:border-[#D28A38]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-[#0A1C17] border border-emerald-700/60 text-slate-100 placeholder-emerald-400/50 text-xs focus:outline-none focus:border-[#D28A38]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs whitespace-nowrap transition-colors"
                  >
                    Join Next Free Thursday Session
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
