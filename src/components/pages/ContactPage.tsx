import React, { useState } from 'react';
import { ImageCarousel } from '../ImageCarousel';
import { CONTACT_CAROUSEL_SLIDES, FOUNDER_INFO } from '../../data/siteData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modalityInterest, setModalityInterest] = useState('Past Life Regression');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, modalityInterest, message })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            We Are Here to Help
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A154B]">
            Contact BODHI Wellness Centre
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Reach out to us for appointments, training inquiries, or gentle guidance. We are delighted to assist your healing journey in person at Dharwad or globally online.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <ImageCarousel slides={CONTACT_CAROUSEL_SLIDES} aspectRatio="standard" autoPlayInterval={6000} />
        </div>

        {/* Two-Column Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details & Sanctuary Info */}
          <div className="lg:col-span-5 space-y-6 bg-white rounded-3xl p-8 border border-amber-200/80 shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-[#4A154B]">
              Sanctuary Contact Details
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5B2373] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Physical Sanctuary Address:</div>
                  <div className="text-slate-600 leading-relaxed mt-0.5">
                    {FOUNDER_INFO.location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#5B2373] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Direct Telephone / WhatsApp:</div>
                  <a
                    href="tel:+919449829764"
                    className="text-[#5B2373] hover:underline font-mono font-medium block mt-0.5"
                  >
                    {FOUNDER_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#5B2373] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Email Inquiries:</div>
                  <a
                    href="mailto:mail@myreincarnation.in"
                    className="text-[#5B2373] hover:underline font-mono font-medium block mt-0.5"
                  >
                    {FOUNDER_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#5B2373] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Consultation Timings:</div>
                  <div className="text-slate-600 mt-0.5">
                    Monday to Saturday: 10:00 AM – 06:30 PM (Prior Appointment Mandatory)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-amber-200/80 space-y-1.5 text-xs">
              <div className="font-semibold text-[#D97706] uppercase tracking-wide">
                Directions for In-Person Visitors:
              </div>
              <p className="text-slate-600 leading-relaxed">
                Located near Haliyal Naka, 1st Main, Narayanpur, Dharwad. Conveniently accessible from Dharwad Railway Station (~10 mins) and Hubli Airport (~35 mins).
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-amber-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#4A154B]">
                Send an Inquiry or Healing Request
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our team responds to all confidential inquiries within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your message regarding <strong>{modalityInterest}</strong> has been received by Mrs. Veena Tikare and the BODHI team. We will contact you via {email} or {phone} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-[#5B2373] text-white text-xs font-semibold"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-700 font-medium">Full Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 font-medium">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-700 font-medium">WhatsApp / Phone:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 font-medium">Modality of Interest:</label>
                    <select
                      value={modalityInterest}
                      onChange={(e) => setModalityInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                    >
                      <option value="Past Life Regression">Past Life Regression Therapy</option>
                      <option value="Clinical Hypnotherapy">Clinical Hypnotherapy</option>
                      <option value="Inner Child Healing">Inner Child & Womb Regression</option>
                      <option value="Family Constellation">Family Constellation</option>
                      <option value="EKAA Training Certification">EKAA Training Certification</option>
                      <option value="Workshops & Retreats">Workshops & Healing Retreats</option>
                      <option value="General Spiritual Inquiry">General Spiritual Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Your Message or Confidential Concerns:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you are looking to heal or understand..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Transmitting Note...' : 'Send Message to BODHI Sanctuary'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
