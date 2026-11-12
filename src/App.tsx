/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { User, Service, Workshop } from './types';
import { Navbar, ActivePage } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { WorkshopsPage } from './components/pages/WorkshopsPage';
import { LightPage } from './components/pages/LightPage';
import { ContactPage } from './components/pages/ContactPage';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { WorkshopEnrollModal } from './components/WorkshopEnrollModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Active Multi-Page Router State
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Dynamic Database State
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  // Modals & Panels State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Workshop Registration Modal
  const [selectedWorkshopForEnroll, setSelectedWorkshopForEnroll] = useState<Workshop | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Hydrate Workshops from Database
  const fetchWorkshops = useCallback(async () => {
    try {
      const res = await fetch('/api/workshops');
      if (res.ok) {
        const data = await res.json();
        if (data.workshops) {
          setWorkshops(data.workshops);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Hydrate user on mount
  useEffect(() => {
    fetchWorkshops();

    const token = localStorage.getItem('bodhi_token');
    if (!token) {
      setLoadingUser(false);
      return;
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem('bodhi_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('bodhi_token');
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [fetchWorkshops]);

  const handleLogout = () => {
    localStorage.removeItem('bodhi_token');
    setUser(null);
    setIsDashboardOpen(false);
    setIsAdminPanelOpen(false);
  };

  const handleSelectServiceFromSection = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleEnrollWorkshop = (workshop: Workshop) => {
    setSelectedWorkshopForEnroll(workshop);
    setIsEnrollModalOpen(true);
  };

  const handleNavigate = (page: ActivePage) => {
    setIsDashboardOpen(false);
    setIsAdminPanelOpen(false);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-[#5B2373]/15 selection:text-[#5B2373]">
      
      {/* Top Navigation with Authentic BODHI Logo & Multi-Page Links */}
      <Navbar
        user={user}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminLogin={() => setIsAdminPanelOpen(true)}
        onOpenBooking={() => {
          setSelectedService(null);
          setIsBookingOpen(true);
        }}
        onOpenDashboard={() => {
          if (user?.role === 'admin') {
            setIsAdminPanelOpen(true);
          } else {
            setIsDashboardOpen(true);
          }
        }}
        onLogout={handleLogout}
      />

      {/* Main View Router: Admin Suite, Client Dashboard, or Respective Public Page */}
      {isAdminPanelOpen ? (
        <AdminPanel
          currentUser={user}
          onLoginSuccess={(loggedAdmin) => {
            setUser(loggedAdmin);
            fetchWorkshops();
          }}
          onClose={() => setIsAdminPanelOpen(false)}
          onNavbarUpdated={() => {}}
          onWorkshopsUpdated={fetchWorkshops}
        />
      ) : isDashboardOpen && user ? (
        <Dashboard
          user={user}
          onUpdateUser={(updated) => setUser(updated)}
          onClose={() => setIsDashboardOpen(false)}
          onBookNewSession={() => {
            setSelectedService(null);
            setIsBookingOpen(true);
          }}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />
      ) : (
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {activePage === 'home' && (
            <HomePage
              onOpenBooking={() => {
                setSelectedService(null);
                setIsBookingOpen(true);
              }}
              onSelectService={handleSelectServiceFromSection}
              workshops={workshops}
              onEnrollWorkshop={handleEnrollWorkshop}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'about' && (
            <AboutPage
              onOpenBooking={() => {
                setSelectedService(null);
                setIsBookingOpen(true);
              }}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage
              onSelectService={handleSelectServiceFromSection}
            />
          )}

          {activePage === 'training' && (
            <TrainingPage
              onOpenBooking={() => {
                setSelectedService(null);
                setIsBookingOpen(true);
              }}
            />
          )}

          {activePage === 'workshops' && (
            <WorkshopsPage
              workshops={workshops}
              onEnrollWorkshop={handleEnrollWorkshop}
            />
          )}

          {activePage === 'light' && (
            <LightPage />
          )}

          {activePage === 'contact' && (
            <ContactPage />
          )}
        </main>
      )}

      {/* Footer (Rendered on all public pages) */}
      {!isAdminPanelOpen && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={() => {
            setSelectedService(null);
            setIsBookingOpen(true);
          }}
        />
      )}

      {/* Client Sign In / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setIsAuthOpen(false);
          if (loggedUser.role === 'admin') {
            setIsAdminPanelOpen(true);
          } else {
            setIsDashboardOpen(true);
          }
        }}
      />

      {/* Patient Therapy Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
        user={user}
        onRequireAuth={() => {
          setIsBookingOpen(false);
          setIsAuthOpen(true);
        }}
        onBookingSuccess={() => {
          setIsDashboardOpen(true);
        }}
      />

      {/* Workshop Enrollment Modal */}
      <WorkshopEnrollModal
        workshop={selectedWorkshopForEnroll}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onSuccess={() => {
          fetchWorkshops();
        }}
      />

    </div>
  );
}
