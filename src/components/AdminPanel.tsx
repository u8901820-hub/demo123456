import React, { useState, useEffect } from 'react';
import { User, Workshop, NavbarItem, Appointment } from '../types';
import { ThemedLogo } from './ThemedLogo';
import { 
  ShieldAlert, BookOpen, Menu as MenuIcon, Plus, Trash2, Edit2, 
  Check, X, Calendar, Clock, MapPin, Users, Save, Lock, ArrowLeft, RefreshCw, Eye, EyeOff
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User | null;
  onLoginSuccess: (user: User, token: string) => void;
  onClose: () => void;
  onNavbarUpdated: () => void;
  onWorkshopsUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  onLoginSuccess,
  onClose,
  onNavbarUpdated,
  onWorkshopsUpdated
}) => {
  // Admin Login States
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'workshops' | 'navbar' | 'appointments'>('workshops');

  // Data States
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [navItems, setNavItems] = useState<NavbarItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Workshop Form Modal State
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [editingWorkshopId, setEditingWorkshopId] = useState<string | null>(null);
  const [wsTitle, setWsTitle] = useState('');
  const [wsSubtitle, setWsSubtitle] = useState('');
  const [wsDesc, setWsDesc] = useState('');
  const [wsFacilitator, setWsFacilitator] = useState('Mrs. Veena Tikare');
  const [wsDates, setWsDates] = useState('');
  const [wsDuration, setWsDuration] = useState('Weekend Intensive');
  const [wsVenue, setWsVenue] = useState('BODHI Wellness Sanctuary, Dharwad');
  const [wsFormat, setWsFormat] = useState<'In-Person Sanctuary (Dharwad)' | 'Online Live Zoom' | 'Hybrid'>('In-Person Sanctuary (Dharwad)');
  const [wsFee, setWsFee] = useState('₹4,500');
  const [wsSeatsTotal, setWsSeatsTotal] = useState(20);
  const [wsSyllabusText, setWsSyllabusText] = useState('');
  const [wsStatus, setWsStatus] = useState<'Upcoming' | 'Enrolling' | 'Completed'>('Enrolling');
  const [wsBadge, setWsBadge] = useState('');

  // Navbar Item Form Modal State
  const [showNavModal, setShowNavModal] = useState(false);
  const [editingNavId, setEditingNavId] = useState<string | null>(null);
  const [navLabel, setNavLabel] = useState('');
  const [navHref, setNavHref] = useState('');
  const [navOrder, setNavOrder] = useState(1);
  const [navVisible, setNavVisible] = useState(true);

  const token = localStorage.getItem('bodhi_token');
  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'therapist');

  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [wsRes, navRes, aptRes] = await Promise.all([
        fetch('/api/workshops'),
        fetch('/api/navbar-items'),
        fetch('/api/appointments', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (wsRes.ok) {
        const wsData = await wsRes.json();
        setWorkshops(wsData.workshops || []);
      }
      if (navRes.ok) {
        const navData = await navRes.json();
        setNavItems(navData.items || []);
      }
      if (aptRes.ok) {
        const aptData = await aptRes.json();
        setAppointments(aptData.appointments || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  // Admin Login Handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Admin credentials invalid');
      }

      if (data.user.role !== 'admin' && data.user.role !== 'therapist') {
        throw new Error('This account does not have Administrative clearance.');
      }

      localStorage.setItem('bodhi_token', data.token);
      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    setAdminEmail(email);
    setAdminPassword(pass);
  };

  // Workshop CRUD Handlers
  const openNewWorkshopModal = () => {
    setEditingWorkshopId(null);
    setWsTitle('');
    setWsSubtitle('');
    setWsDesc('');
    setWsFacilitator('Mrs. Veena Tikare');
    setWsDates('');
    setWsDuration('Weekend Intensive');
    setWsVenue('BODHI Wellness Sanctuary, Dharwad');
    setWsFormat('In-Person Sanctuary (Dharwad)');
    setWsFee('₹5,000');
    setWsSeatsTotal(20);
    setWsSyllabusText('');
    setWsStatus('Enrolling');
    setWsBadge('');
    setShowWorkshopModal(true);
  };

  const openEditWorkshopModal = (ws: Workshop) => {
    setEditingWorkshopId(ws.id);
    setWsTitle(ws.title);
    setWsSubtitle(ws.subtitle || '');
    setWsDesc(ws.description);
    setWsFacilitator(ws.leadFacilitator);
    setWsDates(ws.dates);
    setWsDuration(ws.duration);
    setWsVenue(ws.venue);
    setWsFormat(ws.format);
    setWsFee(ws.fee);
    setWsSeatsTotal(ws.seatsTotal);
    setWsSyllabusText(ws.syllabus ? ws.syllabus.join('\n') : '');
    setWsStatus(ws.status);
    setWsBadge(ws.badge || '');
    setShowWorkshopModal(true);
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    const syllabusArray = wsSyllabusText.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      title: wsTitle,
      subtitle: wsSubtitle,
      description: wsDesc,
      leadFacilitator: wsFacilitator,
      dates: wsDates,
      duration: wsDuration,
      venue: wsVenue,
      format: wsFormat,
      fee: wsFee,
      seatsTotal: Number(wsSeatsTotal),
      syllabus: syllabusArray,
      badge: wsBadge,
      status: wsStatus
    };

    const url = editingWorkshopId ? `/api/workshops/${editingWorkshopId}` : '/api/workshops';
    const method = editingWorkshopId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowWorkshopModal(false);
        setActionMessage(editingWorkshopId ? 'Workshop updated successfully.' : 'New workshop created and saved to database.');
        fetchAdminData();
        onWorkshopsUpdated();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteWorkshop = async (id: string) => {
    if (!confirm('Are you sure you want to remove this workshop from the database?')) return;

    try {
      const res = await fetch(`/api/workshops/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setActionMessage('Workshop deleted from database.');
        fetchAdminData();
        onWorkshopsUpdated();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch {
      // ignore
    }
  };

  // Navbar CRUD Handlers
  const openNewNavModal = () => {
    setEditingNavId(null);
    setNavLabel('');
    setNavHref('#');
    setNavOrder(navItems.length + 1);
    setNavVisible(true);
    setShowNavModal(true);
  };

  const openEditNavModal = (item: NavbarItem) => {
    setEditingNavId(item.id);
    setNavLabel(item.label);
    setNavHref(item.href);
    setNavOrder(item.order);
    setNavVisible(item.isVisible);
    setShowNavModal(true);
  };

  const handleSaveNavItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      label: navLabel,
      href: navHref,
      order: Number(navOrder),
      isVisible: navVisible
    };

    const url = editingNavId ? `/api/navbar-items/${editingNavId}` : '/api/navbar-items';
    const method = editingNavId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowNavModal(false);
        setActionMessage(editingNavId ? 'Navbar item updated.' : 'Navbar item added to database.');
        fetchAdminData();
        onNavbarUpdated();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteNavItem = async (id: string) => {
    if (!confirm('Are you sure you want to remove this item from the navbar?')) return;

    try {
      const res = await fetch(`/api/navbar-items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setActionMessage('Navbar item removed from navigation.');
        fetchAdminData();
        onNavbarUpdated();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch {
      // ignore
    }
  };

  const handleToggleNavVisibility = async (item: NavbarItem) => {
    try {
      const res = await fetch(`/api/navbar-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isVisible: !item.isVisible })
      });
      if (res.ok) {
        fetchAdminData();
        onNavbarUpdated();
      }
    } catch {
      // ignore
    }
  };

  // Appointment Status Updater
  const handleUpdateAppointment = async (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch {
      // ignore
    }
  };

  // 1. RENDER LIGHT THEMED ADMIN LOGIN GATEWAY IF NOT AUTHENTICATED
  if (!isAdmin) {
    return (
      <div className="min-h-screen w-full max-w-full bg-[#FAF8F5] text-slate-800 flex flex-col justify-center items-center p-4 sm:p-6 overflow-x-hidden">
        <div className="w-full max-w-md bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <ThemedLogo size="lg" className="justify-center" />
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97706] mt-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Administrative Gateway</span>
            </div>
            <p className="text-xs text-slate-500">
              Sign in to manage workshops, navbar items, patient bookings, and database records.
            </p>
          </div>

          {/* Quick Credential Helpers */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-amber-200/70 space-y-2 text-xs">
            <span className="text-[11px] font-semibold uppercase text-slate-700 block">
              Quick Admin Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@myreincarnation.in', 'bodhisanctuary')}
                className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-left text-[11px] border border-purple-200 cursor-pointer"
              >
                <div className="font-semibold text-[#5B2373]">System Admin</div>
                <div className="text-[10px] text-slate-500">admin@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('veena@myreincarnation.in', 'bodhisanctuary')}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-left text-[11px] border border-amber-200 cursor-pointer"
              >
                <div className="font-semibold text-amber-900">Mrs. Veena Tikare</div>
                <div className="text-[10px] text-slate-500">veena@...</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-medium">Admin Email Address:</label>
              <input
                type="email"
                required
                placeholder="admin@myreincarnation.in"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#5B2373]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-medium">Admin Secure Password:</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#5B2373]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? 'Authenticating Clearance...' : 'Access Admin Control Suite'}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-[#5B2373] flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Sanctuary</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. RENDER FULL LIGHT THEMED ADMIN DASHBOARD SUITE
  return (
    <div className="min-h-screen w-full max-w-full bg-[#FAF8F5] text-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <ThemedLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#4A154B]">
                  Admin Control Suite
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Database Active
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Logged in as <strong>{currentUser?.name}</strong> ({currentUser?.email})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={fetchAdminData}
              className="p-2.5 text-slate-600 hover:text-[#5B2373] bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-[#5B2373] text-white hover:bg-[#4A154B] transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              View Sanctuary Website
            </button>
          </div>
        </div>

        {/* Global Action Message */}
        {actionMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)}>✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('workshops')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'workshops'
                ? 'bg-[#5B2373] text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            Workshops & Retreats ({workshops.length})
          </button>
          <button
            onClick={() => setActiveTab('navbar')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'navbar'
                ? 'bg-[#5B2373] text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            Navbar Items CRUD ({navItems.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-[#5B2373] text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            Patient Appointments ({appointments.length})
          </button>
        </div>

        {/* TAB 1: WORKSHOPS CRUD */}
        {activeTab === 'workshops' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                  Workshops & Retreats Management
                </h3>
                <p className="text-xs text-slate-500">
                  Create, edit, or remove workshops stored persistently in data/db.json.
                </p>
              </div>
              <button
                onClick={openNewWorkshopModal}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#D97706] hover:bg-[#B45309] text-white transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Workshop</span>
              </button>
            </div>

            <div className="space-y-3">
              {workshops.map((ws) => (
                <div
                  key={ws.id}
                  className="p-5 rounded-2xl bg-white border border-amber-200/80 hover:border-purple-300 space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-bold text-[#4A154B]">{ws.title}</h4>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {ws.format}
                        </span>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                          ws.status === 'Enrolling' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {ws.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{ws.subtitle}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditWorkshopModal(ws)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-purple-50 hover:bg-purple-100 text-[#5B2373] flex items-center gap-1 border border-purple-200"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteWorkshop(ws.id)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1 border border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-normal">{ws.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div><strong>Dates:</strong> {ws.dates}</div>
                    <div><strong>Fee:</strong> {ws.fee}</div>
                    <div><strong>Seats:</strong> {ws.seatsBooked} / {ws.seatsTotal} enrolled</div>
                    <div><strong>Facilitator:</strong> {ws.leadFacilitator}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: NAVBAR ITEMS CRUD */}
        {activeTab === 'navbar' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                  Dynamic Navbar Items CRUD Manager
                </h3>
                <p className="text-xs text-slate-500">
                  Add, edit, reorder, or remove navigation links from the persistent database.
                </p>
              </div>
              <button
                onClick={openNewNavModal}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#D97706] hover:bg-[#B45309] text-white transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Navbar Item</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-amber-200/80 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-amber-200 bg-[#FFFDF8] text-slate-700">
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Label</th>
                    <th className="py-3 px-4">Anchor / Target URL</th>
                    <th className="py-3 px-4">Visibility</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {navItems.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#D97706]">{item.order}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {item.label}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{item.href}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleNavVisibility(item)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${
                            item.isVisible 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-500 border border-slate-300'
                          }`}
                        >
                          {item.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{item.isVisible ? 'Visible' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditNavModal(item)}
                          className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 text-[#5B2373] text-[11px] border border-purple-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNavItem(item.id)}
                          className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] border border-rose-200"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PATIENT APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#4A154B]">
              Clinic Patient Appointments
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-amber-200/80 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-amber-200 bg-[#FFFDF8] text-slate-700">
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Modality</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{apt.clientName}</div>
                        <div className="text-[11px] text-slate-500">{apt.clientEmail}</div>
                      </td>
                      <td className="py-3 px-4">{apt.serviceTitle}</td>
                      <td className="py-3 px-4 font-mono">{apt.date} · {apt.timeSlot}</td>
                      <td className="py-3 px-4">{apt.sessionType === 'in_person_dharwad' ? 'Dharwad Clinic' : 'Online Zoom'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                          apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateAppointment(apt.id, 'completed')}
                            className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px]"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateAppointment(apt.id, 'cancelled')}
                          className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-[11px]"
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
        )}

      </div>

      {/* WORKSHOP CREATE/EDIT MODAL */}
      {showWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-amber-200 rounded-3xl p-6 shadow-2xl text-slate-800 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#4A154B]">
                {editingWorkshopId ? 'Edit Workshop' : 'Create New Workshop'}
              </h3>
              <button onClick={() => setShowWorkshopModal(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleSaveWorkshop} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Workshop Title:</label>
                  <input
                    type="text"
                    required
                    value={wsTitle}
                    onChange={(e) => setWsTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Subtitle / Target Scope:</label>
                  <input
                    type="text"
                    value={wsSubtitle}
                    onChange={(e) => setWsSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Detailed Description:</label>
                <textarea
                  rows={3}
                  required
                  value={wsDesc}
                  onChange={(e) => setWsDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Dates:</label>
                  <input
                    type="text"
                    required
                    placeholder="Dec 12 - 14, 2026"
                    value={wsDates}
                    onChange={(e) => setWsDates(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Duration:</label>
                  <input
                    type="text"
                    value={wsDuration}
                    onChange={(e) => setWsDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Investment Fee:</label>
                  <input
                    type="text"
                    required
                    value={wsFee}
                    onChange={(e) => setWsFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Delivery Format:</label>
                  <select
                    value={wsFormat}
                    onChange={(e: any) => setWsFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  >
                    <option value="In-Person Sanctuary (Dharwad)">In-Person Sanctuary (Dharwad)</option>
                    <option value="Online Live Zoom">Online Live Zoom</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Total Seats Capacity:</label>
                  <input
                    type="number"
                    value={wsSeatsTotal}
                    onChange={(e) => setWsSeatsTotal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Enrollment Status:</label>
                  <select
                    value={wsStatus}
                    onChange={(e: any) => setWsStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  >
                    <option value="Enrolling">Enrolling</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Syllabus Highlights (one per line):</label>
                <textarea
                  rows={3}
                  placeholder="Metaphysical disease roots...&#10;Subconscious immune reset..."
                  value={wsSyllabusText}
                  onChange={(e) => setWsSyllabusText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowWorkshopModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#5B2373] text-white font-semibold cursor-pointer"
                >
                  Save Workshop to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NAVBAR ITEM CREATE/EDIT MODAL */}
      {showNavModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-amber-200 rounded-3xl p-6 shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#4A154B]">
                {editingNavId ? 'Edit Navbar Item' : 'Add Navbar Item'}
              </h3>
              <button onClick={() => setShowNavModal(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleSaveNavItem} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Display Label:</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Special Retreats"
                  value={navLabel}
                  onChange={(e) => setNavLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Target Anchor / URL:</label>
                <input
                  type="text"
                  required
                  placeholder="#workshops or https://..."
                  value={navHref}
                  onChange={(e) => setNavHref(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Display Order:</label>
                  <input
                    type="number"
                    value={navOrder}
                    onChange={(e) => setNavOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Visibility:</label>
                  <select
                    value={navVisible ? 'yes' : 'no'}
                    onChange={(e) => setNavVisible(e.target.value === 'yes')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                  >
                    <option value="yes">Visible on Navbar</option>
                    <option value="no">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNavModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#5B2373] text-white font-semibold cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
