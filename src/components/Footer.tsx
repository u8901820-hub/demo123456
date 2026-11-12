import React from 'react';
import { FOUNDER_INFO } from '../data/siteData';
import { ThemedLogo } from './ThemedLogo';
import { MapPin, Phone, Mail, Clock, Heart, ArrowRight } from 'lucide-react';
import { ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#FFF8EE] text-slate-700 border-t border-amber-200/80 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ThemedLogo size="md" />

            <p className="text-slate-600 leading-relaxed font-normal">
              Empowering individuals to resolve psychosomatic distress, ancestral burdens, and deep-seated emotional wounds through clinical hypnotherapy, regression therapy, and sacred transpersonal exploration in Dharwad.
            </p>

            <div className="text-xs text-slate-500 space-y-1 pt-1">
              <div>Lead Practitioner: <strong>Mrs. Veena Tikare</strong></div>
              <div>Certified Clinical Hypnotherapist & Trainer (EKAA / IMDHA USA)</div>
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-semibold uppercase tracking-wider text-[#4A154B] text-xs">
              Quick Links
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  Healing Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  Training & Certifications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshops')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  Workshops & Retreats
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('light')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  LIGHT – Free Healing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#5B2373] transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Core Modalities (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-semibold uppercase tracking-wider text-[#4A154B] text-xs">
              Healing Modalities
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>Past Life Regression (PLR)</li>
              <li>Clinical Hypnotherapy (EKAA)</li>
              <li>Inner Child & Womb Regression</li>
              <li>Family Systemic Constellations</li>
              <li>Redikall Multi-Dimensional Healing</li>
              <li>Reiki & Chakra Balancing</li>
              <li>Tarot & Spiritual Guidance</li>
            </ul>
          </div>

          {/* Physical Sanctuary & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-semibold uppercase tracking-wider text-[#4A154B] text-xs">
              Dharwad Sanctuary
            </div>
            <div className="space-y-2.5 text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5B2373] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {FOUNDER_INFO.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5B2373] shrink-0" />
                <a href="tel:+919449829764" className="hover:text-[#5B2373] font-mono font-medium">
                  {FOUNDER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5B2373] shrink-0" />
                <a href="mailto:mail@myreincarnation.in" className="hover:text-[#5B2373]">
                  {FOUNDER_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Medical Hypnotherapy Disclaimer */}
        <div className="mt-12 pt-8 border-t border-amber-200/60 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Therapeutic Disclaimer:</strong> The therapies offered by BODHI Wellness Centre and Mrs. Veena Tikare, including Past Life Regression, Clinical Hypnotherapy, and Energy Healing, are complementary holistic modalities aimed at subconscious wellness and emotional growth. They are not intended to substitute for conventional medical advice or psychiatric treatment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              © 2026 BODHI Wellness Centre (myreincarnation.in). All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <span>Dharwad, Karnataka</span>
              <span>·</span>
              <span>EKAA / IMDHA USA</span>
              <span>·</span>
              <span>Unravel the Inner Wisdom</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
