export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'therapist' | 'admin';
  phone?: string;
  city?: string;
  emergencyContact?: string;
  medicalNotes?: string;
  spiritualGoals?: string;
  avatar?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  durationMinutes: number;
  format: 'Both' | 'In-Person (Dharwad)' | 'Online (Zoom)';
  category: 'Regression & Mind' | 'Energy & Aura' | 'Divination & Intuitive' | 'Certifications';
  indications: string[];
  recommendedSessions: string;
  investment: string;
  badge?: string;
}

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  leadFacilitator: string;
  dates: string;
  duration: string;
  venue: string;
  format: 'In-Person Sanctuary (Dharwad)' | 'Online Live Zoom' | 'Hybrid';
  fee: string;
  seatsTotal: number;
  seatsBooked: number;
  syllabus: string[];
  badge?: string;
  status: 'Upcoming' | 'Enrolling' | 'Completed';
  createdAt?: string;
}

export interface NavbarItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
  isSpecial?: boolean;
  specialType?: 'audit' | 'quiz';
  createdAt?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  serviceTitle: string;
  sessionType: 'in_person_dharwad' | 'online_zoom';
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  intentions?: string;
  therapistNotes?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  title: string;
  category: 'Past Life Memory' | 'Inner Child Insight' | 'Dream & Vision' | 'Aura & Chakra';
  content: string;
  emotionalShift: string;
  synchronicities?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  serviceName: string;
  rating: number;
  title: string;
  quote: string;
  outcomeCategory: 'Chronic Stress & Anxiety' | 'Psychosomatic Healing' | 'Karmic & Relationship' | 'Spiritual Awakening';
  date: string;
  isGoogleReview?: boolean;
  googleReviewUrl?: string;
  verifiedSource?: string;
}

export interface SoulQuizResult {
  dominantNeed: string;
  recommendedModality: string;
  serviceId: string;
  explanation: string;
  energyFocus: string;
}
