import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json());

// Helper to hash passwords securely with salt
function hashPassword(password: string, salt = 'bodhi_sacred_salt_2026'): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}

// Generate session tokens
function generateToken(userId: string): string {
  return Buffer.from(`${userId}:${Date.now()}:${crypto.randomBytes(16).toString('hex')}`).toString('base64');
}

function parseToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId] = decoded.split(':');
    return userId || null;
  } catch {
    return null;
  }
}

// Interfaces for Database
export interface DBWorkshop {
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
  createdAt: string;
}

export interface DBNavbarItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
  isSpecial?: boolean;
  specialType?: 'audit' | 'quiz';
  createdAt: string;
}

interface DBStructure {
  users: Array<{
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'client' | 'therapist' | 'admin';
    phone: string;
    city: string;
    emergencyContact: string;
    medicalNotes: string;
    spiritualGoals: string;
    avatar: string;
    createdAt: string;
  }>;
  workshops: DBWorkshop[];
  navbarItems: DBNavbarItem[];
  appointments: Array<{
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
  }>;
  journalEntries: Array<{
    id: string;
    userId: string;
    date: string;
    title: string;
    category: string;
    content: string;
    emotionalShift: string;
    synchronicities?: string;
    createdAt: string;
  }>;
  contactInquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    modalityInterest: string;
    createdAt: string;
  }>;
}

function initDB(): DBStructure {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultWorkshops: DBWorkshop[] = [
    {
      id: 'ws_metaphysical_retreat',
      title: 'Metaphysical Disease Healing & Reversal Retreat',
      subtitle: 'Decoding Diabetes, B.P, Thyroid & Cancer at the Subconscious Level',
      description: 'We regularly conduct healing retreats in Dharwad to uncover and permanently resolve the metaphysical and subconscious root causes of severe diseases, including hereditary patterns.',
      leadFacilitator: 'Mrs. Veena Tikare',
      dates: 'December 12 - 14, 2026',
      duration: '3 Days Full Immersion',
      venue: 'BODHI Wellness Sanctuary, "Shreeshaya", Dharwad',
      format: 'In-Person Sanctuary (Dharwad)',
      fee: '₹12,500 (Includes Organic Meals & Healing Biofield Scan)',
      seatsTotal: 25,
      seatsBooked: 18,
      syllabus: [
        'Metaphysical origin mapping of Diabetes, Thyroid and Cellular Inflammation',
        'Clearing hereditary emotional trauma passed through ancestral DNA',
        'Cellular forgiveness meditation & subconscious immune system reset',
        'Personalized Kirlian biofield scan before and after the retreat'
      ],
      badge: 'Flagship Retreat',
      status: 'Enrolling',
      createdAt: '2026-11-01T00:00:00.000Z'
    },
    {
      id: 'ws_ekaa_hypnotherapy',
      title: 'EKAA Integrated Clinical Hypnotherapy Certification (Level 1)',
      subtitle: 'Official Certification Accredited by IMDHA (USA)',
      description: 'Comprehensive foundational training in subconscious mind mechanics, trance induction, suggestibility testing, self-hypnosis, and clinical relaxation techniques.',
      leadFacilitator: 'Mrs. Veena Tikare (Certified EKAA Trainer)',
      dates: 'November 28 - 29, 2026',
      duration: '2 Days Intensive',
      venue: 'BODHI Wellness Sanctuary (Dharwad) & Zoom Hybrid',
      format: 'Hybrid',
      fee: '₹15,000 (Includes EKAA Manual, Scripts & Official Certificate)',
      seatsTotal: 20,
      seatsBooked: 14,
      syllabus: [
        'Theory of Mind and Conscious vs Subconscious filtration filters',
        'Physical and Emotional Suggestibility profiling',
        'Authoritarian vs Permissive trance inductions and deepening',
        'Self-hypnosis programming for stress, confidence, and anxiety management'
      ],
      badge: 'IMDHA Accredited',
      status: 'Enrolling',
      createdAt: '2026-11-02T00:00:00.000Z'
    },
    {
      id: 'ws_family_constellation',
      title: 'Family Constellation & Systemic Lineage Healing Circle',
      subtitle: 'Releasing Inherited Family Burdens & Restoring the Orders of Love',
      description: 'An experiential systemic workshop where participants represent familial elements to resolve ancestral grief, early deaths, and financial blockages.',
      leadFacilitator: 'Mrs. Veena Tikare',
      dates: 'December 6, 2026',
      duration: '1 Full Day (10:00 AM - 06:00 PM)',
      venue: 'BODHI Sanctuary, Dharwad',
      format: 'In-Person Sanctuary (Dharwad)',
      fee: '₹4,500',
      seatsTotal: 18,
      seatsBooked: 12,
      syllabus: [
        'The 3 Orders of Love according to Bert Hellinger',
        'Identifying systemic exclusion in the maternal and paternal lineages',
        'Live group constellation representative sessions',
        'Ancestral reconciliation ritual and blessing transfer'
      ],
      badge: 'Systemic Healing',
      status: 'Enrolling',
      createdAt: '2026-11-03T00:00:00.000Z'
    },
    {
      id: 'ws_kirlian_masterclass',
      title: 'Kirlian Biofield Diagnostic & Chakra Awakening Masterclass',
      subtitle: 'Hands-on Electro-Photonic Bio-Energetic Imaging & Interpretation',
      description: 'Learn to photograph, analyze, and interpret human electromagnetic auras, coronal discharges, and pre-somatic chakra deficiencies using clinical Kirlian apparatus.',
      leadFacilitator: 'Mrs. Veena Tikare',
      dates: 'January 16 - 17, 2027',
      duration: '2 Days Hands-On',
      venue: 'BODHI Sanctuary, Dharwad',
      format: 'In-Person Sanctuary (Dharwad)',
      fee: '₹9,000',
      seatsTotal: 15,
      seatsBooked: 8,
      syllabus: [
        'Principles of High-Voltage High-Frequency Bio-Electrography',
        'Analyzing fingertip corona discharges and 12 organ meridian links',
        'Differentiating physical exhaustion from psychic / empathic energy leaks',
        'Live participant scans and report generation'
      ],
      badge: 'Hardware Bio-Scan',
      status: 'Upcoming',
      createdAt: '2026-11-04T00:00:00.000Z'
    }
  ];

  const defaultNavbarItems: DBNavbarItem[] = [
    { id: 'nav_modalities', label: 'Healing Modalities', href: '#modalities', order: 1, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_workshops', label: 'Workshops & Retreats', href: '#workshops', order: 2, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_aura', label: 'Aura & Kirlian', href: '#aura-biofield', order: 3, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_founder', label: 'Mrs. Veena Tikare', href: '#founder', order: 4, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_reviews', label: 'Google Reviews (4.8★)', href: '#testimonials', order: 5, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_light', label: 'LIGHT Initiative', href: '#light-seva', order: 6, isVisible: true, createdAt: '2026-01-01' },
    { id: 'nav_audit', label: 'UX Audit', href: '#audit', order: 7, isVisible: true, isSpecial: true, specialType: 'audit', createdAt: '2026-01-01' },
    { id: 'nav_quiz', label: 'Soul Quiz', href: '#quiz', order: 8, isVisible: true, isSpecial: true, specialType: 'quiz', createdAt: '2026-01-01' }
  ];

  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      // Ensure new collections exist if old db file exists
      if (!data.workshops) data.workshops = defaultWorkshops;
      if (!data.navbarItems) data.navbarItems = defaultNavbarItems;
      if (!data.users.find((u: any) => u.email === 'admin@myreincarnation.in')) {
        data.users.push({
          id: 'user_admin',
          name: 'BODHI Centre Admin',
          email: 'admin@myreincarnation.in',
          passwordHash: hashPassword('bodhisanctuary'),
          role: 'admin',
          phone: '+91 9449829764',
          city: 'Dharwad, Karnataka',
          emergencyContact: 'Sanctuary Desk',
          medicalNotes: 'System Administrator & Workshop Coordinator.',
          spiritualGoals: 'Supporting global seekers with drug-free regression access.',
          avatar: '/src/assets/real/veena_tikare.jpg',
          createdAt: '2026-01-01T00:00:00.000Z'
        });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return data;
    } catch {
      // fallback
    }
  }

  const initialDB: DBStructure = {
    users: [
      {
        id: 'user_admin',
        name: 'BODHI Centre Admin',
        email: 'admin@myreincarnation.in',
        passwordHash: hashPassword('bodhisanctuary'),
        role: 'admin',
        phone: '+91 9449829764',
        city: 'Dharwad, Karnataka',
        emergencyContact: 'Sanctuary Desk',
        medicalNotes: 'System Administrator & Workshop Coordinator.',
        spiritualGoals: 'Supporting global seekers with drug-free regression access.',
        avatar: '/src/assets/real/veena_tikare.jpg',
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'user_veena',
        name: 'Mrs. Veena Tikare',
        email: 'veena@myreincarnation.in',
        passwordHash: hashPassword('bodhisanctuary'),
        role: 'therapist',
        phone: '+91 9449829764',
        city: 'Dharwad, Karnataka',
        emergencyContact: 'Centre Reception (+91 9449829764)',
        medicalNotes: 'Master Clinical Hypnotherapist & Center Founder. TASSO / EKAA certified.',
        spiritualGoals: 'Guiding seekers to drug-free soul resolution & karmic liberation.',
        avatar: '/src/assets/real/veena_tikare.jpg',
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'user_demo',
        name: 'Arjun Deshpande',
        email: 'demo@myreincarnation.in',
        passwordHash: hashPassword('password123'),
        role: 'client',
        phone: '+91 9845012345',
        city: 'Hubballi, Karnataka',
        emergencyContact: 'Sunita Deshpande (+91 9845054321)',
        medicalNotes: 'History of chronic right shoulder tension and recurrent claustrophobia dreams.',
        spiritualGoals: 'Seeking Past Life Regression therapy to release karmic patterns and explore childhood emotional imprints.',
        avatar: '',
        createdAt: '2026-02-15T09:30:00.000Z'
      }
    ],
    workshops: defaultWorkshops,
    navbarItems: defaultNavbarItems,
    appointments: [
      {
        id: 'apt_demo_1',
        userId: 'user_demo',
        clientName: 'Arjun Deshpande',
        clientEmail: 'demo@myreincarnation.in',
        clientPhone: '+91 9845012345',
        serviceId: 'past-life-regression',
        serviceTitle: 'Past Life Regression Therapy (PLR)',
        sessionType: 'in_person_dharwad',
        date: '2026-11-20',
        timeSlot: '10:30 AM - 12:30 PM',
        status: 'confirmed',
        intentions: 'Resolve recurring claustrophobia sensation and explore karmic soul contracts.',
        therapistNotes: 'Intake form reviewed. Recommended light fasting 2 hours prior.',
        createdAt: '2026-11-05T14:20:00.000Z'
      }
    ],
    journalEntries: [
      {
        id: 'jrn_1',
        userId: 'user_demo',
        date: '2026-10-19',
        title: 'Post-Aura Scan Insights & Dream Vision',
        category: 'Aura & Chakra',
        content: 'Following the Kirlian biofield scan with Mrs. Veena, I noticed how accurate the solar plexus blockage diagnosis felt. That night I had a vivid dream of standing in an ancient coastal tower in heavy fog.',
        emotionalShift: 'Calmer breathing, less tension in stomach',
        synchronicities: 'Came across a historical photograph that matched the tower exactly.',
        createdAt: '2026-10-19T08:00:00.000Z'
      }
    ],
    contactInquiries: []
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), 'utf-8');
  return initialDB;
}

let db = initDB();

function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// Authentication Middleware
function authMiddleware(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const userId = parseToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return;
  }
  (req as any).user = user;
  next();
}

function adminMiddleware(req: Request, res: Response, next: () => void) {
  authMiddleware(req, res, () => {
    const user = (req as any).user;
    if (user.role !== 'admin' && user.role !== 'therapist') {
      res.status(403).json({ error: 'Admin permission required' });
      return;
    }
    next();
  });
}

// === AUTH ROUTES ===

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, phone, city } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are required' });
    return;
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.status(400).json({ error: 'An account with this email already exists' });
    return;
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: hashPassword(password),
    role: 'client' as const,
    phone: phone || '',
    city: city || '',
    emergencyContact: '',
    medicalNotes: '',
    spiritualGoals: '',
    avatar: '',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB();

  const token = generateToken(newUser.id);
  const { passwordHash: _, ...userSafe } = newUser;
  res.json({ user: userSafe, token });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = generateToken(user.id);
  const { passwordHash: _, ...userSafe } = user;
  res.json({ user: userSafe, token });
});

app.get('/api/auth/me', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { passwordHash: _, ...userSafe } = user;
  res.json({ user: userSafe });
});

app.put('/api/auth/profile', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { name, phone, city, emergencyContact, medicalNotes, spiritualGoals } = req.body;

  const target = db.users.find(u => u.id === user.id);
  if (!target) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  if (name !== undefined) target.name = name.trim();
  if (phone !== undefined) target.phone = phone.trim();
  if (city !== undefined) target.city = city.trim();
  if (emergencyContact !== undefined) target.emergencyContact = emergencyContact;
  if (medicalNotes !== undefined) target.medicalNotes = medicalNotes;
  if (spiritualGoals !== undefined) target.spiritualGoals = spiritualGoals;

  saveDB();
  const { passwordHash: _, ...userSafe } = target;
  res.json({ user: userSafe });
});

app.post('/api/auth/change-password', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current and new password are required' });
    return;
  }

  const target = db.users.find(u => u.id === user.id);
  if (!target || target.passwordHash !== hashPassword(currentPassword)) {
    res.status(400).json({ error: 'Current password does not match' });
    return;
  }

  target.passwordHash = hashPassword(newPassword);
  saveDB();
  res.json({ success: true, message: 'Password updated successfully' });
});

// === NAVBAR ITEMS CRUD ROUTES ===

app.get('/api/navbar-items', (_req: Request, res: Response) => {
  const items = [...db.navbarItems].sort((a, b) => a.order - b.order);
  res.json({ items });
});

app.post('/api/navbar-items', adminMiddleware, (req: Request, res: Response) => {
  const { label, href, order, isVisible, isSpecial, specialType } = req.body;
  if (!label || !href) {
    res.status(400).json({ error: 'Label and href are required' });
    return;
  }

  const newItem: DBNavbarItem = {
    id: `nav_${Date.now()}`,
    label: label.trim(),
    href: href.trim(),
    order: Number(order) || (db.navbarItems.length + 1),
    isVisible: isVisible !== false,
    isSpecial: Boolean(isSpecial),
    specialType: specialType || undefined,
    createdAt: new Date().toISOString()
  };

  db.navbarItems.push(newItem);
  saveDB();
  res.status(201).json({ item: newItem });
});

app.put('/api/navbar-items/:id', adminMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const { label, href, order, isVisible, isSpecial, specialType } = req.body;

  const item = db.navbarItems.find(n => n.id === id);
  if (!item) {
    res.status(404).json({ error: 'Navbar item not found' });
    return;
  }

  if (label !== undefined) item.label = label.trim();
  if (href !== undefined) item.href = href.trim();
  if (order !== undefined) item.order = Number(order);
  if (isVisible !== undefined) item.isVisible = Boolean(isVisible);
  if (isSpecial !== undefined) item.isSpecial = Boolean(isSpecial);
  if (specialType !== undefined) item.specialType = specialType;

  saveDB();
  res.json({ item });
});

app.delete('/api/navbar-items/:id', adminMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.navbarItems.findIndex(n => n.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Navbar item not found' });
    return;
  }

  db.navbarItems.splice(idx, 1);
  saveDB();
  res.json({ success: true, message: 'Navbar item removed successfully' });
});

// === WORKSHOPS CRUD ROUTES ===

app.get('/api/workshops', (_req: Request, res: Response) => {
  res.json({ workshops: db.workshops });
});

app.post('/api/workshops', adminMiddleware, (req: Request, res: Response) => {
  const {
    title, subtitle, description, leadFacilitator, dates, duration,
    venue, format, fee, seatsTotal, syllabus, badge, status
  } = req.body;

  if (!title || !description || !dates || !fee) {
    res.status(400).json({ error: 'Title, description, dates, and fee are required' });
    return;
  }

  const newWorkshop: DBWorkshop = {
    id: `ws_${Date.now()}`,
    title: title.trim(),
    subtitle: subtitle || '',
    description: description.trim(),
    leadFacilitator: leadFacilitator || 'Mrs. Veena Tikare',
    dates: dates.trim(),
    duration: duration || 'Weekend Intensive',
    venue: venue || 'BODHI Wellness Sanctuary, Dharwad',
    format: format || 'In-Person Sanctuary (Dharwad)',
    fee: fee.trim(),
    seatsTotal: Number(seatsTotal) || 20,
    seatsBooked: 0,
    syllabus: Array.isArray(syllabus) ? syllabus : [],
    badge: badge || '',
    status: status || 'Upcoming',
    createdAt: new Date().toISOString()
  };

  db.workshops.unshift(newWorkshop);
  saveDB();
  res.status(201).json({ workshop: newWorkshop });
});

app.put('/api/workshops/:id', adminMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const ws = db.workshops.find(w => w.id === id);
  if (!ws) {
    res.status(404).json({ error: 'Workshop not found' });
    return;
  }

  const fields = req.body;
  if (fields.title) ws.title = fields.title.trim();
  if (fields.subtitle !== undefined) ws.subtitle = fields.subtitle.trim();
  if (fields.description) ws.description = fields.description.trim();
  if (fields.leadFacilitator) ws.leadFacilitator = fields.leadFacilitator.trim();
  if (fields.dates) ws.dates = fields.dates.trim();
  if (fields.duration) ws.duration = fields.duration.trim();
  if (fields.venue) ws.venue = fields.venue.trim();
  if (fields.format) ws.format = fields.format;
  if (fields.fee) ws.fee = fields.fee.trim();
  if (fields.seatsTotal !== undefined) ws.seatsTotal = Number(fields.seatsTotal);
  if (fields.seatsBooked !== undefined) ws.seatsBooked = Number(fields.seatsBooked);
  if (fields.syllabus && Array.isArray(fields.syllabus)) ws.syllabus = fields.syllabus;
  if (fields.badge !== undefined) ws.badge = fields.badge;
  if (fields.status) ws.status = fields.status;

  saveDB();
  res.json({ workshop: ws });
});

app.delete('/api/workshops/:id', adminMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.workshops.findIndex(w => w.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Workshop not found' });
    return;
  }

  db.workshops.splice(idx, 1);
  saveDB();
  res.json({ success: true, message: 'Workshop deleted successfully' });
});

app.post('/api/workshops/:id/register', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const ws = db.workshops.find(w => w.id === id);
  if (!ws) {
    res.status(404).json({ error: 'Workshop not found' });
    return;
  }

  if (ws.seatsBooked >= ws.seatsTotal) {
    res.status(400).json({ error: 'This workshop is fully booked.' });
    return;
  }

  ws.seatsBooked += 1;
  saveDB();

  res.json({
    success: true,
    message: `Thank you ${name || 'Seeker'}! Your seat is reserved for ${ws.title}. Confirmation sent to ${email || 'your email'}.`,
    workshop: ws
  });
});

// === APPOINTMENTS ROUTES ===

app.get('/api/appointments', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role === 'therapist' || user.role === 'admin') {
    res.json({ appointments: db.appointments });
  } else {
    const userApts = db.appointments.filter(a => a.userId === user.id);
    res.json({ appointments: userApts });
  }
});

app.post('/api/appointments', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { serviceId, serviceTitle, sessionType, date, timeSlot, intentions, clientPhone } = req.body;

  if (!serviceId || !serviceTitle || !sessionType || !date || !timeSlot) {
    res.status(400).json({ error: 'Please select a modality, session format, date, and time slot.' });
    return;
  }

  const newAppointment = {
    id: `apt_${Date.now()}`,
    userId: user.id,
    clientName: user.name,
    clientEmail: user.email,
    clientPhone: clientPhone || user.phone || '',
    serviceId,
    serviceTitle,
    sessionType,
    date,
    timeSlot,
    status: 'confirmed' as const,
    intentions: intentions || '',
    therapistNotes: 'Booking confirmed. Sanctuary intake received.',
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newAppointment);
  saveDB();

  res.status(201).json({ appointment: newAppointment });
});

app.put('/api/appointments/:id', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { status, therapistNotes, date, timeSlot } = req.body;

  const apt = db.appointments.find(a => a.id === id);
  if (!apt) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  if (user.role === 'client' && apt.userId !== user.id) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  if (status) apt.status = status;
  if (date) apt.date = date;
  if (timeSlot) apt.timeSlot = timeSlot;
  if (therapistNotes !== undefined && (user.role === 'therapist' || user.role === 'admin')) {
    apt.therapistNotes = therapistNotes;
  }

  saveDB();
  res.json({ appointment: apt });
});

// === JOURNAL ROUTES ===

app.get('/api/journal', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const entries = db.journalEntries.filter(j => j.userId === user.id);
  res.json({ entries });
});

app.post('/api/journal', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { date, title, category, content, emotionalShift, synchronicities } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'Title and reflection content are required' });
    return;
  }

  const newEntry = {
    id: `jrn_${Date.now()}`,
    userId: user.id,
    date: date || new Date().toISOString().split('T')[0],
    title,
    category: category || 'Past Life Memory',
    content,
    emotionalShift: emotionalShift || '',
    synchronicities: synchronicities || '',
    createdAt: new Date().toISOString()
  };

  db.journalEntries.unshift(newEntry);
  saveDB();
  res.status(201).json({ entry: newEntry });
});

app.delete('/api/journal/:id', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const idx = db.journalEntries.findIndex(j => j.id === id && j.userId === user.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Entry not found' });
    return;
  }

  db.journalEntries.splice(idx, 1);
  saveDB();
  res.json({ success: true });
});

// === GOOGLE REVIEWS ENDPOINT ===

app.get('/api/google-reviews', (_req: Request, res: Response) => {
  res.json({
    googleUrl: 'https://share.google/UKBoboeiky3L1XRd9',
    rating: 4.8,
    totalReviews: 9,
    provider: 'Trustindex Verified Google Business Profile',
    location: 'BODHI Wellness Centre, Dharwad',
    timestamp: new Date().toISOString()
  });
});

// === STATS ENDPOINT ===

app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    totalSessionsConducted: 4200,
    activePractitioners: 4,
    freeLightSessionsCompleted: 180,
    dharwadCentreEstablishedYear: 2014,
    totalRegisteredClients: db.users.filter(u => u.role === 'client').length + 3480,
    upcomingBookingsCount: db.appointments.filter(a => a.status === 'confirmed').length,
    activeWorkshopsCount: db.workshops.filter(w => w.status !== 'Completed').length,
    activeNavItemsCount: db.navbarItems.filter(n => n.isVisible).length
  });
});

// Set up dev/production static or Vite middleware
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BODHI · My Reincarnation Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
