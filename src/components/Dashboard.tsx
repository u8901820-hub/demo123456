import React, { useState, useEffect } from 'react';
import { User, Appointment, JournalEntry } from '../types';
import { 
  Calendar, BookOpen, User as UserIcon, Shield, Activity, 
  Plus, Trash2, Clock, CheckCircle2, AlertCircle, Volume2, 
  VolumeX, Play, Pause, Save, Lock, MapPin, Video, Phone
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onClose: () => void;
  onBookNewSession: () => void;
  onOpenAdminPanel?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onUpdateUser,
  onClose,
  onBookNewSession,
  onOpenAdminPanel
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'journal' | 'meditation' | 'profile' | 'therapist_admin'>(
    user.role === 'therapist' ? 'therapist_admin' : 'appointments'
  );

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile Form States
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [city, setCity] = useState(user.city || '');
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact || '');
  const [medicalNotes, setMedicalNotes] = useState(user.medicalNotes || '');
  const [spiritualGoals, setSpiritualGoals] = useState(user.spiritualGoals || '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  // New Journal Entry
  const [showNewJournal, setShowNewJournal] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalCategory, setJournalCategory] = useState<'Past Life Memory' | 'Inner Child Insight' | 'Dream & Vision' | 'Aura & Chakra'>('Past Life Memory');
  const [journalContent, setJournalContent] = useState('');
  const [journalShift, setJournalShift] = useState('');
  const [journalSync, setJournalSync] = useState('');

  // Built-in Ambient Meditation Audio Player
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPacerSeconds, setAudioPacerSeconds] = useState(4);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  const token = localStorage.getItem('bodhi_token');

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [aptRes, jrnRes] = await Promise.all([
        fetch('/api/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/journal', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (aptRes.ok) {
        const aptData = await aptRes.json();
        setAppointments(aptData.appointments || []);
      }
      if (jrnRes.ok) {
        const jrnData = await jrnRes.json();
        setJournalEntries(jrnData.entries || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Breathing pacer effect
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          phone,
          city,
          emergencyContact,
          medicalNotes,
          spiritualGoals
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      onUpdateUser(data.user);
      setMessage({ type: 'success', text: 'Sanctuary profile updated successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Profile save failed' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPass(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setCurrentPassword('');
      setNewPassword('');
      setMessage({ type: 'success', text: 'Password changed successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Password update failed' });
    } finally {
      setChangingPass(false);
    }
  };

  const handleCreateJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle || !journalContent) return;

    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: journalTitle,
          category: journalCategory,
          content: journalContent,
          emotionalShift: journalShift,
          synchronicities: journalSync
        })
      });

      if (res.ok) {
        setJournalTitle('');
        setJournalContent('');
        setJournalShift('');
        setJournalSync('');
        setShowNewJournal(false);
        fetchData();
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteJournal = async (id: string) => {
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setJournalEntries(prev => prev.filter(j => j.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#5B2373] font-serif text-xl font-bold shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#4A154B]">
                  {user.name}
                </h1>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5B2373] border border-purple-200">
                  {user.role === 'therapist' ? 'Master Therapist Desk' : 'Verified Client Portal'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {user.city ? `${user.city} · ` : ''}{user.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
            {(user.role === 'admin' || user.role === 'therapist') && onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Admin Suite (Workshops & Nav)</span>
              </button>
            )}
            <button
              onClick={onBookNewSession}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white transition-all shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Modality</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap border border-slate-300 cursor-pointer"
            >
              Back to Main Sanctuary
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {message && (
          <div className={`p-4 rounded-2xl text-xs flex items-center justify-between gap-2 ${
            message.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="hover:opacity-75">✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2 overflow-x-auto">
          {user.role === 'therapist' && (
            <button
              onClick={() => setActiveTab('therapist_admin')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'therapist_admin'
                  ? 'bg-[#5B2373] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-amber-50'
              }`}
            >
              Therapist Desk (All Appointments)
            </button>
          )}
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-[#5B2373] text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            My Sessions ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'journal'
                ? 'bg-[#D28A38] text-[#0A1C17] font-semibold'
                : 'text-emerald-300/80 hover:text-white'
            }`}
          >
            Spiritual Diary & Regression Notes ({journalEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('meditation')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'meditation'
                ? 'bg-[#D28A38] text-[#0A1C17] font-semibold'
                : 'text-emerald-300/80 hover:text-white'
            }`}
          >
            Session Preparation & Sound Bath
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#D28A38] text-[#0A1C17] font-semibold'
                : 'text-emerald-300/80 hover:text-white'
            }`}
          >
            Profile & Medical History
          </button>
        </div>

        {/* Tab 1: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold text-amber-100">
                  Scheduled Healing Sessions
                </h3>
                <p className="text-xs text-slate-400">
                  Review upcoming clinical regression, hypnotherapy, and biofield aura appointments.
                </p>
              </div>
              <button
                onClick={onBookNewSession}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-[#121C3B] hover:bg-[#1A264F] border border-[#C59B27]/40 text-amber-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Booking</span>
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-[#0B132B] border border-slate-800 text-slate-400 space-y-3">
                <Calendar className="w-8 h-8 mx-auto text-[#C59B27]/60" />
                <div className="text-sm font-medium text-slate-300">No sessions scheduled yet</div>
                <p className="text-xs max-w-sm mx-auto">
                  Begin your healing journey by booking a Past Life Regression or Clinical Hypnotherapy session with Mrs. Veena Tikare.
                </p>
                <button
                  onClick={onBookNewSession}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-[#C59B27] text-[#070D1E]"
                >
                  Book Your First Session
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 rounded-xl bg-[#0B132B] border border-slate-800 space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#C59B27] font-semibold">{apt.serviceTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                          : apt.status === 'completed'
                          ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Date: <strong>{apt.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Slot: <strong>{apt.timeSlot}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        {apt.sessionType === 'in_person_dharwad' ? (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>In-Person: BODHI Sanctuary ("Shreeshaya", Narayanpur, Dharwad)</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>Online Zoom Link: (Sent to {apt.clientEmail})</span>
                          </>
                        )}
                      </div>
                    </div>

                    {apt.intentions && (
                      <div className="p-3 rounded-lg bg-[#070D1E] text-xs text-slate-400">
                        <strong className="text-slate-300 block mb-0.5">Your Intentions / Symptoms:</strong>
                        {apt.intentions}
                      </div>
                    )}

                    {apt.therapistNotes && (
                      <div className="p-3 rounded-lg bg-[#121C3B] border border-[#C59B27]/30 text-xs text-amber-200/90">
                        <strong className="text-amber-100 block mb-0.5">Note from Mrs. Veena Tikare:</strong>
                        {apt.therapistNotes}
                      </div>
                    )}

                    {apt.status === 'confirmed' && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt.id, 'cancelled')}
                          className="text-[11px] text-rose-400 hover:text-rose-300 hover:underline"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Spiritual Diary & Regression Journal */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold text-amber-100">
                  Spiritual Diary & Post-Session Reflections
                </h3>
                <p className="text-xs text-slate-400">
                  Document regression insights, dream synchronicities, and emotional shifts following therapy.
                </p>
              </div>
              <button
                onClick={() => setShowNewJournal(!showNewJournal)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-[#C59B27] hover:bg-[#D4A936] text-[#070D1E] font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showNewJournal ? 'Close Form' : 'Add Reflection'}</span>
              </button>
            </div>

            {/* New Journal Form */}
            {showNewJournal && (
              <form onSubmit={handleCreateJournal} className="p-5 rounded-xl bg-[#0B132B] border border-[#C59B27]/40 space-y-4">
                <div className="font-serif text-base font-semibold text-amber-200">
                  New Sacred Journal Entry
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Reflection Title:</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Coastal Tower Memory & Shoulder Relief"
                      value={journalTitle}
                      onChange={(e) => setJournalTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Category:</label>
                    <select
                      value={journalCategory}
                      onChange={(e: any) => setJournalCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="Past Life Memory">Past Life Memory</option>
                      <option value="Inner Child Insight">Inner Child Insight</option>
                      <option value="Dream & Vision">Dream & Vision</option>
                      <option value="Aura & Chakra">Aura & Chakra</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Session or Dream Experience:</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what surfaced during your trance regression or in subsequent dreams..."
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Emotional or Somatic Shift:</label>
                    <input
                      type="text"
                      placeholder="E.g., Released tension in neck, feeling deeper peacefulness"
                      value={journalShift}
                      onChange={(e) => setJournalShift(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Observed Synchronicities:</label>
                    <input
                      type="text"
                      placeholder="E.g., Number patterns, unexpected phone call, book discovery"
                      value={journalSync}
                      onChange={(e) => setJournalSync(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewJournal(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-medium rounded-lg bg-[#C59B27] hover:bg-[#D4A936] text-[#070D1E]"
                  >
                    Save to Private Diary
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            {journalEntries.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-[#0B132B] border border-slate-800 text-slate-400 space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-[#C59B27]/60" />
                <div className="text-sm font-medium text-slate-300">Your Spiritual Diary is empty</div>
                <p className="text-xs max-w-sm mx-auto">
                  After your first regression session, record symbols, emotional shifts, and recurring dreams here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {journalEntries.map((jrn) => (
                  <div
                    key={jrn.id}
                    className="p-5 rounded-xl bg-[#0B132B] border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-semibold text-amber-100">
                          {jrn.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121C3B] text-amber-300 border border-slate-700">
                          {jrn.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{jrn.date}</span>
                        <button
                          onClick={() => handleDeleteJournal(jrn.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap">
                      {jrn.content}
                    </p>

                    {(jrn.emotionalShift || jrn.synchronicities) && (
                      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {jrn.emotionalShift && (
                          <div className="text-slate-400">
                            <strong className="text-slate-300">Shift:</strong> {jrn.emotionalShift}
                          </div>
                        )}
                        {jrn.synchronicities && (
                          <div className="text-slate-400">
                            <strong className="text-slate-300">Synchronicity:</strong> {jrn.synchronicities}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Session Preparation & Sound Bath Meditation */}
        {activeTab === 'meditation' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-[#C59B27]/30 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#C59B27] font-semibold uppercase tracking-wider">
                  <span>Therapeutic Preparation Tool</span>
                  <span aria-hidden="true">·</span>
                  <span>Alpha-Theta Brainwave Attunement</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-amber-50 mt-1">
                  Guided Breath Pacer & Tibetan Singing Bowl Sound Bath
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  For optimal Past Life Regression and hypnotherapy, clients are advised to practice relaxing the autonomic nervous system. Use this interactive 4-4-4 harmonic breathing pacer before your scheduled session.
                </p>
              </div>

              {/* Interactive Breathing Circle */}
              <div className="py-8 flex flex-col items-center justify-center space-y-4">
                <div 
                  className={`w-44 h-44 rounded-full border-2 border-[#C59B27] flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl ${
                    isPlayingAudio ? (
                      breathPhase === 'Inhale' 
                        ? 'scale-110 bg-[#121C3B]/80 shadow-[#C59B27]/30' 
                        : breathPhase === 'Hold' 
                        ? 'scale-110 bg-[#1A264F] shadow-amber-500/40' 
                        : 'scale-90 bg-[#070D1E] shadow-none'
                    ) : 'bg-[#070D1E]'
                  }`}
                >
                  <span className="font-serif text-2xl font-bold text-amber-200">
                    {isPlayingAudio ? breathPhase : 'Ready'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-1">
                    {isPlayingAudio ? '4 Seconds' : 'Click Play'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#C59B27] hover:bg-[#D4A936] text-[#070D1E] font-semibold text-xs transition-colors shadow-md"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlayingAudio ? 'Pause Sound Bath Pacer' : 'Start 4-4-4 Breathing Attunement'}</span>
                  </button>
                </div>
              </div>

              {/* Preparation Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="font-semibold text-amber-200 mb-1">1. Fasting Guidelines</div>
                  <p className="text-slate-400">Avoid heavy meals and excessive caffeine 2 hours prior to regression to maintain clear subtle perception.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="font-semibold text-amber-200 mb-1">2. Comfortable Clothing</div>
                  <p className="text-slate-400">Wear loose, natural cotton fabrics. Remove tight watches and belts before relaxing onto the lounger.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="font-semibold text-amber-200 mb-1">3. Clear Spiritual Intent</div>
                  <p className="text-slate-400">Formulate one primary soul intention (e.g., "Show me the origin of this fear") without forcing preconceived answers.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Profile Management & Confidential Intake */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 cols: Personal & Medical Details */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-amber-100">
                    Comprehensive Profile & Intake
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your confidential medical and spiritual notes are reviewed exclusively by Mrs. Veena Tikare.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Full Legal Name:</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Account Email (Verified):</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E]/50 border border-slate-800 text-slate-500 text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Phone / WhatsApp:</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">City / State of Residence:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Emergency Contact Name & Phone:</label>
                  <input
                    type="text"
                    placeholder="E.g., Spouse or Parent (+91...)"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Medical Notes & Physical Diagnoses (Confidential):</label>
                  <textarea
                    rows={2}
                    placeholder="Any chronic conditions, heart pacemaker, epilepsy, or ongoing medications..."
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Spiritual Goals & Aspirations:</label>
                  <textarea
                    rows={2}
                    placeholder="What are you hoping to resolve, discover, or anchor in this lifetime?"
                    value={spiritualGoals}
                    onChange={(e) => setSpiritualGoals(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#C59B27] hover:bg-[#D4A936] text-[#070D1E] font-semibold text-xs transition-colors shadow-md disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingProfile ? 'Saving Changes...' : 'Save Profile Details'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right 5 cols: Security & Password */}
            <div className="lg:col-span-5 space-y-6">
              <form onSubmit={handleChangePassword} className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-200">
                  <Lock className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Security & Credentials</span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-amber-50">
                  Update Account Password
                </h4>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Current Password:</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">New Secure Password:</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D1E] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={changingPass}
                  className="w-full py-2.5 rounded-lg bg-[#121C3B] hover:bg-[#1A264F] border border-[#C59B27]/40 text-amber-200 font-medium text-xs transition-colors disabled:opacity-50"
                >
                  {changingPass ? 'Updating...' : 'Update Password'}
                </button>
              </form>

              {/* Data Privacy & Security Assurance */}
              <div className="p-5 rounded-2xl bg-[#070D1E] border border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Shield className="w-4 h-4 text-[#C59B27]" />
                  <span>Confidentiality Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  All session recordings, hypnosis transcripts, and regression memories are kept strictly confidential under TASSO and EKAA medical hypnotherapy ethics codes.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 5: Therapist Desk (if user is therapist) */}
        {activeTab === 'therapist_admin' && user.role === 'therapist' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-[#C59B27]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-amber-100">
                    BODHI Centre Clinical Appointments Schedule
                  </h3>
                  <p className="text-xs text-slate-400">
                    Therapist view: manage patient intake, update statuses, and write clinical notes.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-300 bg-[#070D1E] px-3 py-1.5 rounded-lg border border-slate-700">
                  Total Bookings: {appointments.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Modality</th>
                      <th className="py-3 px-3">Date & Slot</th>
                      <th className="py-3 px-3">Format</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-amber-100">{apt.clientName}</div>
                          <div className="text-[11px] text-slate-400">{apt.clientEmail}</div>
                          {apt.clientPhone && <div className="text-[10px] text-slate-500">{apt.clientPhone}</div>}
                        </td>
                        <td className="py-3 px-3 text-slate-200">
                          {apt.serviceTitle}
                        </td>
                        <td className="py-3 px-3 font-mono">
                          <div>{apt.date}</div>
                          <div className="text-[11px] text-slate-400">{apt.timeSlot}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[11px]">
                            {apt.sessionType === 'in_person_dharwad' ? 'Dharwad Clinic' : 'Online Zoom'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            apt.status === 'confirmed' 
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' 
                              : apt.status === 'completed' 
                              ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800'
                              : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateAppointmentStatus(apt.id, 'completed')}
                              className="px-2.5 py-1 rounded bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800 text-[11px]"
                            >
                              Mark Completed
                            </button>
                          )}
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, 'cancelled')}
                            className="px-2.5 py-1 rounded bg-rose-900/40 text-rose-300 hover:bg-rose-900 text-[11px]"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
