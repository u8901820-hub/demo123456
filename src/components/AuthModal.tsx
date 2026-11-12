import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login' 
      ? { email, password } 
      : { name, email, password, phone, city };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('bodhi_token', data.token);
      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: demoEmail, password: demoPass })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token && data.user) {
          localStorage.setItem('bodhi_token', data.token);
          onLoginSuccess(data.user, data.token);
          onClose();
        } else {
          setError(data.error || 'Quick login failed');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border border-amber-200 rounded-3xl shadow-2xl text-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-amber-100 bg-[#FFFDF8]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
              BODHI Sanctuary Member Access
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A154B]">
              {mode === 'login' ? 'Client & Practitioner Sign In' : 'Create Sanctuary Profile'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-2 p-1 m-6 mb-4 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`py-2 rounded-full transition-colors cursor-pointer ${
              mode === 'login' ? 'bg-[#5B2373] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`py-2 rounded-full transition-colors cursor-pointer ${
              mode === 'register' ? 'bg-[#5B2373] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Member
          </button>
        </div>

        {/* 1-Click Demo Testing Buttons */}
        <div className="px-6 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Instant 1-Click Testing:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('demo@myreincarnation.in', 'password123')}
              className="p-2.5 text-left rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs transition-colors cursor-pointer"
            >
              <div className="text-[#5B2373] font-bold truncate">Client Portal</div>
              <div className="text-[10px] text-slate-500 truncate">Arjun Deshpande</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@myreincarnation.in', 'bodhisanctuary')}
              className="p-2.5 text-left rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs transition-colors cursor-pointer"
            >
              <div className="text-[#D97706] font-bold truncate">Admin Hub</div>
              <div className="text-[10px] text-slate-500 truncate">System Clearance</div>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name:</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Priya Deshmukh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Phone:</label>
                  <input
                    type="tel"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">City / Country:</label>
                  <input
                    type="text"
                    placeholder="Dharwad / Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#5B2373]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Portal' : 'Register Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
