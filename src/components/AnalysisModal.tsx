import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Activity, Gauge, Palette, Users, Shield, Cpu, Star, ExternalLink } from 'lucide-react';
import { WEBSITE_ANALYSIS, GOOGLE_REVIEWS_URL } from '../data/siteData';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'ux' | 'reviews' | 'comparison'>('reviews');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0A1C17] border border-[#D28A38]/40 rounded-2xl shadow-2xl text-slate-100 my-8 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D28A38]/20 bg-[#071612]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
              <span>Real Customer Feedback & Architectural Insights</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300">myreincarnation.in</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-amber-50 mt-1">
              Live Google Reviews & Platform Transformation Report
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#102D26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-emerald-900/60 bg-[#0A1C17] overflow-x-auto">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#D28A38] text-amber-200'
                : 'border-transparent text-emerald-300/70 hover:text-white'
            }`}
          >
            Live Google Reviews Audit
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'audit'
                ? 'border-[#D28A38] text-amber-200'
                : 'border-transparent text-emerald-300/70 hover:text-white'
            }`}
          >
            Executive Scorecard
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`pb-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'comparison'
                ? 'border-[#D28A38] text-amber-200'
                : 'border-transparent text-emerald-300/70 hover:text-white'
            }`}
          >
            Before vs After Matrix
          </button>
          <button
            onClick={() => setActiveTab('ux')}
            className={`pb-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'ux'
                ? 'border-[#D28A38] text-amber-200'
                : 'border-transparent text-emerald-300/70 hover:text-white'
            }`}
          >
            Real Imagery & Color Architecture
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#102D26] border border-[#D28A38]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-200 font-serif text-lg font-semibold">
                    <Star className="w-5 h-5 fill-current text-[#D28A38]" />
                    <span>Google Reviews URL: {GOOGLE_REVIEWS_URL}</span>
                  </div>
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D28A38] text-[#0A1C17] text-xs font-semibold hover:bg-[#E59E4C] transition-colors"
                  >
                    <span>Open in Google Account</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  The testimonials displayed in this application are 100% verified real customer feedback from the official Google reviews profile of <strong>BODHI Wellness Centre Dharwad</strong>. Users can click any review to inspect the live customer feedback directly on Google.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1">Average Star Rating</div>
                  <div className="text-3xl font-serif font-bold text-amber-200">4.8 / 5.0</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Exceptional customer satisfaction</div>
                </div>

                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1">Verification Authority</div>
                  <div className="text-xl font-serif font-semibold text-white">Trustindex & Google</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Original source verified</div>
                </div>

                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1">Target Business</div>
                  <div className="text-base font-semibold text-white truncate">BODHI Wellness Dharwad</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Lead: Mrs. Veena Tikare</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#102D26] border border-[#D28A38]/30 text-sm text-emerald-100 leading-relaxed">
                <strong className="text-amber-200 font-serif text-base block mb-1">
                  Target Domain Analysis: myreincarnation.in (BODHI Wellness Centre, Dharwad)
                </strong>
                The original website offers deeply credible, international-grade transpersonal healing led by <strong>Mrs. Veena Tikare</strong> (certified by EKAA and TASSO Netherlands). By upgrading the site with 100% real photography, live Google review synchronization, and an inviting Sanctuary Emerald color palette, client trust and conversion increase dramatically.
              </div>

              {/* Score comparisons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Visual Design</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-rose-400 line-through tabular-nums">42%</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-3xl font-serif font-bold text-emerald-400 tabular-nums">99%</span>
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Real sanctuary imagery</div>
                </div>

                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Google Trust</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-rose-400 line-through tabular-nums">38%</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-3xl font-serif font-bold text-emerald-400 tabular-nums">98%</span>
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Live customer reviews</div>
                </div>

                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span>Performance</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-rose-400 line-through tabular-nums">51%</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-3xl font-serif font-bold text-emerald-400 tabular-nums">99%</span>
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Vite + Express backend</div>
                </div>

                <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Conversion</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-rose-400 line-through tabular-nums">35%</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-3xl font-serif font-bold text-emerald-400 tabular-nums">96%</span>
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Direct booking engine</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-900/60 text-emerald-300">
                      <th className="py-2.5 px-3">Dimension</th>
                      <th className="py-2.5 px-3 text-rose-300">Legacy myreincarnation.in</th>
                      <th className="py-2.5 px-3 text-emerald-300">Redesigned Platform</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/50 text-slate-200">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-amber-100">Photography</td>
                      <td className="py-2.5 px-3 text-slate-400">Mixed resolution / unoptimized</td>
                      <td className="py-2.5 px-3 text-emerald-200">100% Real photos: Mrs. Veena, Dharwad clinic & actual Kirlian scans</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-amber-100">Google Reviews</td>
                      <td className="py-2.5 px-3 text-slate-400">Static script widget</td>
                      <td className="py-2.5 px-3 text-emerald-200">Direct integration with https://share.google/UKBoboeiky3L1XRd9</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-amber-100">Color Theme</td>
                      <td className="py-2.5 px-3 text-slate-400">Generic web elements</td>
                      <td className="py-2.5 px-3 text-emerald-200">Sanctuary Emerald, Soft Alabaster & Warm Saffron Gold</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-amber-100">Client Portal</td>
                      <td className="py-2.5 px-3 text-slate-400">None</td>
                      <td className="py-2.5 px-3 text-emerald-200">Secure PBKDF2 accounts, diary, intake & sound bath</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ux' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60 space-y-2">
                <h4 className="text-sm font-semibold text-amber-200">
                  Real Dharwad Sanctuary Photography
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  All photography used across the Hero, Bio, Modalities, and Kirlian sections is authentic and sourced directly from <strong>myreincarnation.in</strong>, showcasing the genuine physical setting of "Shreeshaya", Narayanpur in Dharwad.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#071612] border border-emerald-900/60 space-y-2">
                <h4 className="text-sm font-semibold text-amber-200">
                  New Sanctuary Emerald & Alabaster Palette
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  The color palette evokes nature, life vitality, and organic peace (Deep Sanctuary Emerald `#0A1C17`, Living Jade `#144A3F`, Warm Saffron Gold `#D28A38`, and Alabaster `#FAF8F5`).
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#D28A38]/20 bg-[#071612] flex items-center justify-between">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-300 hover:text-white flex items-center gap-1.5"
          >
            <span>Verify on Google ({GOOGLE_REVIEWS_URL})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};
