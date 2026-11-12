import React, { useState, useEffect } from 'react';
import { User, NavbarItem } from '../types';
import { Calendar, User as UserIcon, LogOut, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';
import { ThemedLogo } from './ThemedLogo';

export type ActivePage = 'home' | 'about' | 'services' | 'training' | 'workshops' | 'light' | 'contact';

interface NavbarProps {
  user: User | null;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenAuth: () => void;
  onOpenAdminLogin: () => void;
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activePage,
  onNavigate,
  onOpenAuth,
  onOpenAdminLogin,
  onOpenBooking,
  onOpenDashboard,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'light', label: 'LIGHT – Free Healing' },
    { id: 'training', label: 'Training' },
    { id: 'services', label: 'Services' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#FFF8EE]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20 w-full">
          
          {/* Zone 1: Authentic BODHI Logo (Clean, Light, No long tagline) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left group shrink-0 cursor-pointer"
          >
            <ThemedLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links matching myreincarnation.in screenshot */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700 shrink">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    isActive
                      ? 'text-[#5B2373] font-bold'
                      : 'text-slate-700 hover:text-[#5B2373]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B2373] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (On mobile device: only menu bar; on other devices: keep as it is) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {user ? (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={onOpenDashboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-50 border border-purple-200 text-[#5B2373] hover:bg-purple-100 transition-colors shadow-xs cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#5B2373]" />
                  <span>
                    {user.role === 'admin' ? 'Admin Hub' : 'Client Portal'}
                  </span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white transition-all shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-slate-500 hover:text-rose-600 transition-colors rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={onOpenAdminLogin}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono text-slate-600 hover:text-[#5B2373] hover:bg-amber-100/60 rounded-md transition-colors cursor-pointer"
                  title="Admin Gateway"
                >
                  <ShieldAlert className="w-3 h-3 text-[#D97706]" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 hover:text-[#5B2373] hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenBooking}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Bar (Only menu bar on mobile devices) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white border border-amber-200 text-slate-700 hover:text-[#5B2373] hover:bg-amber-50/80 transition-colors cursor-pointer"
              aria-label="Toggle menu bar"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Accessible from menu bar on mobile devices) */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FFFDF8] border-b border-amber-200 px-6 py-5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm font-medium py-2.5 border-b border-amber-100 transition-colors flex items-center justify-between cursor-pointer ${
                  activePage === link.id
                    ? 'text-[#5B2373] font-bold'
                    : 'text-slate-700 hover:text-[#5B2373]'
                }`}
              >
                <span>{link.label}</span>
                {activePage === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#5B2373]" />
                )}
              </button>
            ))}
          </nav>

          <div className="pt-4 mt-2 border-t border-amber-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-full bg-[#5B2373] hover:bg-[#4A154B] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {user ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="py-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs text-[#5B2373] font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#5B2373]" />
                  <span>{user.role === 'admin' ? 'Admin Hub' : 'My Portal'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs text-rose-700 font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-xs text-slate-700 font-medium cursor-pointer"
                >
                  Client Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs text-amber-900 font-medium flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Admin Panel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
