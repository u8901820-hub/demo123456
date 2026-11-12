import React, { useState } from 'react';
import { REAL_GOOGLE_TESTIMONIALS, GOOGLE_REVIEWS_URL } from '../data/siteData';
import { Testimonial } from '../types';
import { Star, ExternalLink, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now (Live Sync)');

  const categories = [
    'All',
    'Psychosomatic Healing',
    'Chronic Stress & Anxiety',
    'Karmic & Relationship',
    'Spiritual Awakening'
  ];

  const filteredTestimonials = filter === 'All'
    ? REAL_GOOGLE_TESTIMONIALS
    : REAL_GOOGLE_TESTIMONIALS.filter((t: Testimonial) => t.outcomeCategory === filter);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/google-reviews');
      if (res.ok) {
        setLastRefreshed(`Synced at ${new Date().toLocaleTimeString()}`);
      }
    } catch {
      // fallback
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-[#071612] text-slate-100 border-b border-[#D28A38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Reviews Hub Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A1C17] border border-[#D28A38]/40 shadow-xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            
            {/* Google Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-white p-3 shadow-md flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-serif text-3xl font-bold text-amber-50">4.8</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-emerald-300 font-medium">· 9 Reviews</span>
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                BODHI Wellness Centre Dharwad on Google Reviews
              </div>
              <div className="text-xs text-emerald-200/80 mt-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span>Verified by Trustindex</span>
                <span>·</span>
                <span>{lastRefreshed}</span>
              </div>
            </div>

          </div>

          {/* Action Area: Check Google Account Directly + Refresh */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#102D26] hover:bg-[#144A3F] border border-emerald-700/60 text-emerald-200 text-xs font-medium transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Live</span>
            </button>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <span>Check Customer Feedback on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
            <span>Authentic Client Reviews from myreincarnation.in</span>
            <span aria-hidden="true">·</span>
            <span>Unedited Testimonials</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-50">
            Real Stories of Healing with Mrs. Veena Tikare
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
            Read unedited feedback directly from patients treated for psychosomatic illness, chronic stress, liver health, skin conditions, and multi-generational family blockages.
          </p>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#D28A38] text-[#0A1C17] font-semibold shadow-sm'
                    : 'bg-[#102D26] text-emerald-200 hover:text-white hover:bg-[#15483B] border border-emerald-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Real Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t: Testimonial) => (
            <div
              key={t.id}
              className="rounded-xl bg-[#0A1C17] border border-emerald-900/70 hover:border-[#D28A38]/50 p-6 flex flex-col justify-between space-y-4 transition-all shadow-md hover:shadow-xl"
            >
              <div className="space-y-3">
                
                {/* Header with Google icon and stars */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <span className="font-medium text-[#D28A38]">{t.serviceName}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-amber-50">
                  "{t.title}"
                </h3>

                <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
                  "{t.quote}"
                </p>

              </div>

              {/* Attribution footer with Google verification */}
              <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-amber-100">{t.clientName}</div>
                  <div className="text-[11px] text-emerald-300/80 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#D28A38]" />
                    <span>{t.location}</span>
                  </div>
                </div>

                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#D28A38] hover:text-[#E59E4C] flex items-center gap-1"
                  title="Check review on Google"
                >
                  <span>Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Adjacency Proof Callout with direct Google Link */}
        <div className="mt-12 p-6 rounded-2xl bg-[#102D26] border border-[#D28A38]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-xl font-semibold text-amber-100">
              Have you experienced a breakthrough with Mrs. Veena Tikare?
            </h4>
            <p className="text-xs text-emerald-200/80 font-light max-w-xl">
              Share your healing experience to help fellow seekers across Karnataka and India discover drug-free subconscious therapies.
            </p>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
