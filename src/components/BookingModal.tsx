import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, AlertCircle } from 'lucide-react';
import { SERVICES_DATA, FOUNDER_INFO } from '../data/siteData';
import { Service, User } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
  user: User | null;
  onRequireAuth: () => void;
  onBookingSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  user,
  onRequireAuth,
  onBookingSuccess
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || SERVICES_DATA[0].id
  );
  const [sessionType, setSessionType] = useState<'in_person_dharwad' | 'online_zoom'>('in_person_dharwad');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM - 12:30 PM');
  const [intentions, setIntentions] = useState<string>('');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      onRequireAuth();
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('bodhi_token');
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: currentService.id,
          serviceTitle: currentService.title,
          sessionType,
          date,
          timeSlot,
          intentions,
          clientPhone: phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm booking');
      }

      setIsSuccess(true);
      onBookingSuccess();
    } catch (err: any) {
      setError(err.message || 'Error occurred while scheduling');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-amber-200 rounded-3xl shadow-2xl text-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-amber-100 bg-[#FFFDF8]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              Sanctuary Appointment Desk
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4A154B]">
              Schedule Your Healing Session
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#4A154B]">
                Session Appointment Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your appointment for <strong>{currentService.title}</strong> has been secured for <strong>{date}</strong> at <strong>{timeSlot}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-amber-200/80 max-w-sm mx-auto text-xs text-slate-700 text-left space-y-1">
                <div><strong>Format:</strong> {sessionType === 'in_person_dharwad' ? 'In-Person at Dharwad Sanctuary ("Shreeshaya", Narayanpur)' : 'Online Video via Zoom'}</div>
                <div><strong>Lead Practitioner:</strong> Mrs. Veena Tikare</div>
                <div><strong>Status:</strong> Recorded in Client Portal</div>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#5B2373] text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close & View in Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {!user && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-3">
                  <span>Sign in or create a member account to book and view your session in your sanctuary portal.</span>
                  <button
                    type="button"
                    onClick={onRequireAuth}
                    className="px-4 py-1.5 rounded-full bg-[#5B2373] text-white font-semibold whitespace-nowrap cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Modality Selector */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Select Healing Modality:
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} ({service.durationMinutes} mins · {service.investment})
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Format Choice */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Delivery Format:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessionType('in_person_dharwad')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      sessionType === 'in_person_dharwad'
                        ? 'bg-purple-50 border-[#5B2373] text-[#5B2373]'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#5B2373] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">In-Person (Dharwad)</div>
                      <div className="text-[10px] text-slate-500">Narayanpur Sanctuary</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType('online_zoom')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      sessionType === 'online_zoom'
                        ? 'bg-purple-50 border-[#5B2373] text-[#5B2373]'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#5B2373] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Online Video (Zoom)</div>
                      <div className="text-[10px] text-slate-500">Worldwide Live Audio/Video</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Appointment Date:</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Time Slot:</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  >
                    <option value="10:30 AM - 12:30 PM">Morning: 10:30 AM – 12:30 PM</option>
                    <option value="02:30 PM - 04:30 PM">Afternoon: 02:30 PM – 04:30 PM</option>
                    <option value="05:00 PM - 07:00 PM">Evening: 05:00 PM – 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Intentions Note */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  What are you seeking to resolve or understand?
                </label>
                <textarea
                  rows={3}
                  placeholder="E.g., chronic back pain resisting diagnosis, irrational water phobia, childhood grief..."
                  value={intentions}
                  onChange={(e) => setIntentions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#4A154B]">
                    {currentService.investment}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Lead Practitioner: Mrs. Veena Tikare
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Confirming...' : 'Confirm Appointment'}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
