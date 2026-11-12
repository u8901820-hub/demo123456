import React, { useState } from 'react';
import { Camera, Activity, Zap, CheckCircle2 } from 'lucide-react';

interface AuraProps {
  onBookAura: () => void;
}

export const AuraPhotographySection: React.FC<AuraProps> = ({ onBookAura }) => {
  const [activeView, setActiveView] = useState<'before' | 'after'>('after');

  return (
    <section id="aura-biofield" className="py-20 bg-[#071612] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Authentic Real Before/After Kirlian Biofield Photographs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#D28A38]/40 shadow-2xl bg-[#0A1C17]">
              
              <img
                src={activeView === 'before' ? '/src/assets/real/kirlian_before.png' : '/src/assets/real/kirlian_after.png'}
                alt={`Real Kirlian biofield photography ${activeView} therapy at BODHI Dharwad`}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-[420px] object-contain bg-black p-4"
              />
              
              {/* Overlay Interactive Switch */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0A1C17]/90 backdrop-blur-md border border-emerald-800 text-xs">
                  <button
                    onClick={() => setActiveView('before')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeView === 'before'
                        ? 'bg-rose-900/70 text-rose-100 border border-rose-700/50 font-medium'
                        : 'text-emerald-300 hover:text-white'
                    }`}
                  >
                    Real Pre-Therapy Scan
                  </button>
                  <button
                    onClick={() => setActiveView('after')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeView === 'after'
                        ? 'bg-[#D28A38] text-[#0A1C17] font-semibold'
                        : 'text-emerald-300 hover:text-white'
                    }`}
                  >
                    Real Post-Therapy Biofield
                  </button>
                </div>

                <div className="text-[11px] font-mono text-amber-200 bg-[#0A1C17]/90 px-2.5 py-1 rounded-md border border-emerald-800">
                  Real Bio-Photonic Hardware
                </div>
              </div>

              {/* Dynamic State Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0A1C17]/95 backdrop-blur-md border border-emerald-800 text-xs">
                {activeView === 'before' ? (
                  <div className="space-y-1">
                    <span className="text-rose-400 font-semibold block">Real Pre-Therapy Kirlian Photograph:</span>
                    <p className="text-emerald-100/90 leading-relaxed">
                      Actual electro-photographic imaging from Dharwad clinic revealing electromagnetic asymmetry, depleted solar plexus charge, and energy boundary leakage.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-semibold block">Real Post-Regression Kirlian Photograph:</span>
                    <p className="text-emerald-100/90 leading-relaxed">
                      Actual post-therapy scan demonstrating harmonious coronal discharge, expanded heart biofield, and restored chakra symmetry following regression.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-300/80 px-2">
              <span>Actual Kirlian photographs from myreincarnation.in</span>
              <span aria-hidden="true">·</span>
              <span>Available exclusively at Dharwad Sanctuary</span>
            </div>
          </div>

          {/* Right: Scientific & Spiritual Explanation */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
              <span>Objective Bio-Energetic Evidence</span>
              <span aria-hidden="true">·</span>
              <span>Kirlian Biofield Diagnostic</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-amber-50">
              See Your Subtle Body Before and After Healing
            </h2>

            <p className="text-sm text-emerald-100/90 font-light leading-relaxed">
              BODHI Wellness Centre is one of the few spiritual facilities in Karnataka equipped with authentic electro-photonic Kirlian diagnostic equipment. By photographing the electromagnetic coronal discharge of your fingertips and energy meridians, we render your invisible emotional knots into concrete visual truth.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#144A3F] border border-[#D28A38]/40 text-[#D28A38] shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-100">Pinpoint Pre-Somatic Imbalances</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5 leading-relaxed">
                    Physical illness often manifests in the etheric body 6–12 months before appearing in medical pathology. Aura scans identify depleted chakras early.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#144A3F] border border-[#D28A38]/40 text-[#D28A38] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-100">Verify Regression Efficacy</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5 leading-relaxed">
                    Compare your aura photograph taken before your Past Life Regression with one taken 10 days post-session to witness concrete biofield expansion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#144A3F] border border-[#D28A38]/40 text-[#D28A38] shrink-0 mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-100">Personalized 12-Page Aura Report</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5 leading-relaxed">
                    Receive your full chakra breakdown, color frequencies, boundary thickness analysis, and personalized spiritual practice recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onBookAura}
                className="px-6 py-3 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-medium text-xs transition-colors shadow-md"
              >
                Schedule an Aura Scanning Session
              </button>
              <span className="text-xs text-emerald-300/80">
                ₹2,500 <span className="text-emerald-400/60">· 60 mins (Dharwad Sanctuary)</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
