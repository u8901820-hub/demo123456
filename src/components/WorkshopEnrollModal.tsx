import React, { useState } from 'react';
import { Workshop } from '../types';
import { X, Calendar, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface WorkshopEnrollModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const WorkshopEnrollModal: React.FC<WorkshopEnrollModalProps> = ({
  workshop,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !workshop) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/workshops/${workshop.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to enroll');

      setSuccess(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Enrollment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 space-y-4 my-8">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D97706]">
              Workshop Enrollment Desk
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A154B]">
              {workshop.title}
            </h3>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-xl font-bold text-[#4A154B]">
              Seat Reservation Confirmed
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              We have reserved your seat for <strong>{workshop.title}</strong> on <strong>{workshop.dates}</strong>. A confirmation and intake dossier have been dispatched to <strong>{email}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-[#5B2373] text-white font-semibold text-xs cursor-pointer"
              >
                Close Confirmation
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
                {error}
              </div>
            )}

            <div className="p-3 rounded-2xl bg-[#FFFDF8] border border-amber-200/80 space-y-1">
              <div className="flex items-center justify-between text-slate-800 font-semibold">
                <span>{workshop.dates}</span>
                <span className="text-[#D97706] font-bold">{workshop.fee}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#5B2373]" />
                <span>{workshop.venue}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Participant Full Name:</label>
              <input
                type="text"
                required
                placeholder="E.g., Priya Rao"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Email Address (for syllabus & access notes):</label>
              <input
                type="email"
                required
                placeholder="priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">WhatsApp / Phone Number:</label>
              <input
                type="tel"
                required
                placeholder="+91..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
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
                className="px-6 py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Confirming...' : 'Complete Enrollment'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
