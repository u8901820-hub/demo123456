import { Service, Testimonial } from '../types';
import { CarouselSlide } from '../components/ImageCarousel';

export const FOUNDER_INFO = {
  name: 'Mrs. Veena Tikare',
  titles: 'Certified Clinical Hypnotherapist · Certified Regression Therapist · Spiritual Healer',
  centerName: 'BODHI Wellness Centre',
  website: 'myreincarnation.in',
  tagline: 'Discover the Healing Within You · Unravel the Inner Wisdom',
  location: '"Shreeshaya", 1st Main, Narayanpur, Near Haliyal Naka, Dharwad – 580008, North Karnataka, India',
  phone: '+91 9449829764',
  email: 'mail@myreincarnation.in',
  realPhoto: '/src/assets/real/veena_tikare.jpg',
  realLogo: '/src/assets/real/logo.png',
  realSanctuary: '/src/assets/real/sanctuary_dharwad.jpg',
  certifications: [
    'Certified Clinical Hypnotherapist & Trainer (EKAA)',
    'Recognized by IMDHA (International Medical & Dental Hypnotherapy Association, USA)',
    'Certified Regression Therapist (TASSO International, Netherlands)',
    'Certified Hypnobirthing Practitioner (Marie Mongan Method)',
    'Grand Master in Reiki, Rajakriya Reiki & Angel Therapy',
    'Certified Redikall Multi-dimensional Healer',
    'Family Constellation & Systemic Healing Facilitator',
    'Tarot Card Reader & Intuitive Spiritual Counselor'
  ],
  bio: `Mrs. Veena Tikare is the founder, master therapist, and educator behind BODHI Wellness Centre in Dharwad, Karnataka. With nearly two decades of clinical and spiritual experience, she has helped thousands of individuals overcome deep-seated psychosomatic illnesses, chronic anxiety, unexplained phobias, and recurring familial challenges through drug-free subconscious therapeutics.

Her sanctuary in Narayanpur, Dharwad combines internationally accredited clinical hypnosis standards with ancient Vedic spiritual principles, creating a peaceful, confidential space where individuals can awaken their own inner healer.`
};

// === REAL IMAGE CAROUSELS FOR EACH PAGE ===

export const HOME_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/sanctuary_dharwad.jpg',
    title: 'BODHI Wellness Sanctuary, Dharwad',
    subtitle: 'A serene haven in North Karnataka dedicated to drug-free emotional and subconscious healing.',
    tag: '10+ Years of Excellence'
  },
  {
    image: '/src/assets/real/veena_tikare.jpg',
    title: 'Master Guidance by Mrs. Veena Tikare',
    subtitle: 'Certified Clinical Hypnotherapist (EKAA/IMDHA USA) and Regression Therapist (TASSO Netherlands).',
    tag: 'Founder & Master Healer'
  },
  {
    image: '/src/assets/real/plr.jpg',
    title: 'Past Life Regression Therapy',
    subtitle: 'Journey into deep subconscious memories to uncover and release the root causes of chronic patterns.',
    tag: 'Signature Modality'
  },
  {
    image: '/src/assets/real/hypnotherapy.jpg',
    title: 'Clinical Hypnotherapy & Subconscious Alignment',
    subtitle: 'Bypass conscious resistance to overcome insomnia, anxiety, and psychosomatic discomfort.',
    tag: 'IMDHA Accredited'
  },
  {
    image: '/src/assets/real/family_constellation.jpg',
    title: 'Family Constellation & Lineage Healing',
    subtitle: 'Experiential systemic healing to restore the Orders of Love across multi-generational family trees.',
    tag: 'Systemic Resolution'
  }
];

export const ABOUT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/veena_tikare.jpg',
    title: 'Mrs. Veena Tikare · Master Practitioner',
    subtitle: 'Dedicated to helping individuals discover their inner light through compassionate, scientific guidance.',
    tag: 'Practitioner Profile'
  },
  {
    image: '/src/assets/real/sanctuary_dharwad.jpg',
    title: '"Shreeshaya" Sanctuary in Narayanpur',
    subtitle: 'A peaceful, private environment custom-built for emotional safety and profound meditative breakthroughs.',
    tag: 'Dharwad Centre'
  },
  {
    image: '/src/assets/real/collage.jpg',
    title: 'A Decade of Healing & Training in Dharwad',
    subtitle: 'Empowering seekers, therapists, and families across Karnataka and beyond.',
    tag: 'Our Journey'
  }
];

export const SERVICES_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/plr.jpg',
    title: 'Past Life Regression Therapy (PLR)',
    subtitle: 'Explore soul memories and dissolve past life vows, unexplained phobias, and emotional imprints.',
    tag: 'Deep Subconscious'
  },
  {
    image: '/src/assets/real/hypnotherapy.jpg',
    title: 'Clinical Hypnotherapy & Mind Mechanics',
    subtitle: 'Gentle, scientific brainwave alignment for stress, panic, confidence, and psychosomatic well-being.',
    tag: 'Mind Therapeutics'
  },
  {
    image: '/src/assets/real/inner_child.jpg',
    title: 'Inner Child & Womb Regression Healing',
    subtitle: 'Healing developmental wounding, early childhood neglect, and in-utero emotional stress.',
    tag: 'Emotional Re-parenting'
  },
  {
    image: '/src/assets/real/family_constellation.jpg',
    title: 'Family Systemic Constellations',
    subtitle: 'Uncover unseen loyalties and release burdens carried on behalf of ancestors.',
    tag: 'Ancestral Harmony'
  }
];

export const TRAINING_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/collage.jpg',
    title: 'EKAA Integrated Clinical Hypnotherapy Certifications',
    subtitle: 'Learn professional subconscious therapy accredited by IMDHA (USA) with live clinical demonstrations.',
    tag: 'Professional Accreditation'
  },
  {
    image: '/src/assets/real/veena_tikare.jpg',
    title: 'Learn from an Official EKAA Certified Trainer',
    subtitle: 'Mrs. Veena Tikare personally mentors students in foundational to advanced regression protocols.',
    tag: 'Master Mentorship'
  },
  {
    image: '/src/assets/real/hypnotherapy.jpg',
    title: 'Hands-On Practical Case Work',
    subtitle: 'Master trance induction, suggestibility testing, deepening techniques, and script design.',
    tag: 'Clinical Training'
  }
];

export const WORKSHOPS_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/family_constellation.jpg',
    title: 'Immersive Healing Retreats & Circles',
    subtitle: 'Interactive group workshops designed to resolve chronic disease roots and ancestral blockages.',
    tag: 'Weekend Intensives'
  },
  {
    image: '/src/assets/real/sanctuary_dharwad.jpg',
    title: 'Metaphysical Disease Reversal Retreats',
    subtitle: 'Regular retreats addressing Diabetes, B.P, Thyroid, and Cancer at the subconscious root level.',
    tag: 'Holistic Reversal'
  }
];

export const LIGHT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/collage.jpg',
    title: 'The LIGHT Initiative · Free Community Healing',
    subtitle: 'Giving back to society through bi-monthly free group healings every 2nd & 4th Thursday.',
    tag: 'Community Seva'
  },
  {
    image: '/src/assets/real/sanctuary_dharwad.jpg',
    title: 'Accessible Healing for Everyone in Need',
    subtitle: 'Group womb meditations, mother/father wound clearance, and collective peace prayers.',
    tag: '100% Free Seva'
  }
];

export const CONTACT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: '/src/assets/real/sanctuary_dharwad.jpg',
    title: 'Visit Us at "Shreeshaya", Dharwad',
    subtitle: 'Conveniently situated near Haliyal Naka, 1st Main, Narayanpur, Dharwad.',
    tag: 'Sanctuary Location'
  },
  {
    image: '/src/assets/real/veena_tikare.jpg',
    title: 'Begin Your Healing Journey',
    subtitle: 'Reach out via phone, WhatsApp, or email to schedule an in-person or online Zoom consultation.',
    tag: 'We are Here to Help'
  }
];

// === CORE PILLARS FROM SCREENSHOT ===
export const CORE_PILLARS = [
  {
    id: 'safe-space',
    title: 'A Safe Space to Heal',
    description: 'Feel heard, respected, and supported in a calm and confidential environment tailored for deep vulnerability.',
    iconName: 'clock'
  },
  {
    id: 'guided-care',
    title: 'Guided with Care & Respect',
    description: 'Personalized sessions designed around your comfort, needs, and individual spiritual journey.',
    iconName: 'award'
  },
  {
    id: 'wellbeing-first',
    title: 'Your Wellbeing Comes First',
    description: 'Move at your own pace, with compassionate guidance throughout your inner healing journey.',
    iconName: 'heart'
  }
];

// === RELATED INFORMATION: THE 4-STEP HEALING PATHWAY ===
export const HEALING_PATHWAY_STEPS = [
  {
    step: '01',
    title: 'Confidential Holistic Discovery',
    description: 'We listen deeply to your life history, emotional patterns, physical symptoms, and family background to identify root stress triggers.'
  },
  {
    step: '02',
    title: 'Gentle Trance & Safe Subconscious Access',
    description: 'Through clinical relaxation and guided alpha-theta brainwave induction, we access the emotional memory vaults where origin beliefs reside.'
  },
  {
    step: '03',
    title: 'Cathartic Release & Trauma Clearance',
    description: 'Safely discharge frozen emotional charges, soul vows, inner child distress, or ancestral burdens without re-traumatization.'
  },
  {
    step: '04',
    title: 'Neural Rewiring & Grounded Integration',
    description: 'Anchor self-worth, emotional sovereignty, and vitality, giving you practical daily tools to sustain your transformation.'
  }
];

// === CONDITIONS WE RELIEVE ===
export const CONDITIONS_TREATED = [
  {
    title: 'Psychosomatic & Chronic Ailments',
    details: 'Migraines, irritable bowel, unexplained fatigue, and chronic pain resisting standard medical diagnosis.'
  },
  {
    title: 'Severe Anxiety, Panic & Insomnia',
    details: 'Relief from chronic nervous exhaustion, racing thoughts, panic triggers, and sleeplessness.'
  },
  {
    title: 'Irrational Phobias & Fears',
    details: 'Fear of heights, confinement, water, public speaking, death, or deep-seated fear of abandonment.'
  },
  {
    title: 'Recurring Relationship Loops & Grief',
    details: 'Breaking toxic generational cycles, resolving deep bereavement, and healing marital discord.'
  },
  {
    title: 'Inner Child & Pre-Natal Trauma',
    details: 'Overcoming childhood rejection, harsh parental conditioning, and womb-stage maternal stress absorption.'
  },
  {
    title: 'Life Purpose & Spiritual Direction',
    details: 'Connecting with soul contracts, dissolving karmic vows of suffering, and stepping into authentic empowerment.'
  }
];

// === SERVICES DATA ===
export const SERVICES_DATA: Service[] = [
  {
    id: 'past-life-regression',
    title: 'Past Life Regression Therapy (PLR)',
    subtitle: 'Transpersonal Soul Travel & Karmic Root Cause Resolution',
    shortDesc: 'Journey into subconscious memory vaults to identify and heal soul impressions (Samskaras) causing present-life blockages.',
    fullDesc: 'Past Life Regression is a gentle, deeply relaxing clinical hypnosis method accredited by TASSO International. It enables clients to access soul memories that hold unexpressed grief, karmic contracts, vows of poverty or suffering, and root causes of unexplained phobias or physical ailments.',
    durationMinutes: 120,
    format: 'Both',
    category: 'Regression & Mind',
    indications: [
      'Unexplained chronic pain or illnesses resisting medical diagnosis',
      'Intense irrational phobias (heights, water, fire, confinement)',
      'Complex karmic bonds and toxic relationship loops',
      'Persistent feelings of "not belonging" or searching for life purpose'
    ],
    recommendedSessions: '2 - 3 Sessions',
    investment: '₹4,500 / session',
    badge: 'Signature Modality'
  },
  {
    id: 'clinical-hypnotherapy',
    title: 'Clinical Hypnotherapy & Subconscious Reprogramming',
    subtitle: 'Scientific Subconscious Alignment (EKAA / IMDHA Certified)',
    shortDesc: 'Bypass the critical mind filter to replace self-defeating habits, chronic stress, insomnia, and psychosomatic symptoms.',
    fullDesc: 'Recognized by the International Medical & Dental Hypnotherapy Association (IMDHA, USA), our hypnotherapy protocols utilize deep alpha-theta brainwave states to access the emotional subconscious, untangle limiting beliefs, and anchor empowering neurological pathways.',
    durationMinutes: 90,
    format: 'Both',
    category: 'Regression & Mind',
    indications: [
      'Severe anxiety, panic attacks, and chronic insomnia',
      'Smoking cessation, weight management, and behavioral compulsions',
      'Low self-worth, public speaking dread, and imposter syndrome',
      'Psychosomatic digestive, skin, and autoimmune flare-ups'
    ],
    recommendedSessions: '3 - 5 Sessions',
    investment: '₹3,500 / session',
    badge: 'EKAA Accredited'
  },
  {
    id: 'inner-child-womb-healing',
    title: 'Inner Child & Womb Regression Healing',
    subtitle: 'Dissolving Developmental Trauma & Pre-Natal Imprints',
    shortDesc: 'Rescue and nurture neglected developmental stages and in-utero emotional distress absorbed from maternal environments.',
    fullDesc: 'Many adult defense mechanisms stem from subconscious emotional vows taken before age 7 or during gestation. This therapy re-parents the wounded inner child, safely discharges frozen survival energy, and rewires the emotional body for unconditional self-love and emotional safety.',
    durationMinutes: 90,
    format: 'Both',
    category: 'Regression & Mind',
    indications: [
      'Abandonment terror, clinginess, or emotional detachment',
      'Suppressed childhood grief, maternal or paternal wounds',
      'Chronic guilt, people-pleasing, or inability to establish boundaries',
      'Difficult pre-natal environment or traumatic birth memories'
    ],
    recommendedSessions: '2 - 4 Sessions',
    investment: '₹3,800 / session'
  },
  {
    id: 'family-constellation',
    title: 'Family Constellation & Systemic Ancestral Healing',
    subtitle: 'Bert Hellinger Systemic Therapy for Multi-Generational Entanglements',
    shortDesc: 'Uncover unseen energetic loyalties to ancestors and restore the natural Order of Love in your family lineage.',
    fullDesc: 'Often, individual suffering is an unconscious attempt to carry the burden of an excluded, forgotten, or traumatized ancestor. Family Constellations bring systemic balance, releasing ancestral trauma, broken marriages, and financial ruins passed down through DNA and subtle fields.',
    durationMinutes: 100,
    format: 'Both',
    category: 'Regression & Mind',
    indications: [
      'Recurring generational patterns (early death, financial ruin, divorces)',
      'Unexplainable alienation between parents, siblings, or children',
      'Feeling an invisible weight or living someone else\'s destiny',
      'Infertility, adoption complexities, and profound guilt'
    ],
    recommendedSessions: '1 - 2 Sessions',
    investment: '₹4,000 / session'
  },
  {
    id: 'redikall-healing',
    title: 'Redikall Multi-Dimensional Healing & Soul Alignment',
    subtitle: 'Chakra-Consciousness Diagnostics & Energy Clearing',
    shortDesc: 'Multi-dimensional vibrational healing to untangle mental thought-forms and chakra misalignments.',
    fullDesc: 'Redikall healing works with specific vibrational statements and chakra consciousness to rapidly recalibrate distorted thoughts, stagnant emotional reservoirs, and spiritual fatigue, returning the bio-energetic body to crystal equilibrium.',
    durationMinutes: 75,
    format: 'Both',
    category: 'Energy & Aura',
    indications: [
      'Repetitive thought loops, cognitive fog, and mental fatigue',
      'Feeling disconnected from personal spiritual vitality',
      'Chakra imbalances resisting traditional energy work',
      'Clearing energetic cords from past partnerships'
    ],
    recommendedSessions: '2 - 3 Sessions',
    investment: '₹3,000 / session'
  },
  {
    id: 'tarot-reading',
    title: 'Tarot & Intuitive Spiritual Counseling',
    subtitle: 'Archetypal Divination for Clarity & Life Path Crossroads',
    shortDesc: 'Sacred archetypal card guidance offering deep insights on soul purpose, karmic crossroads, and emotional challenges.',
    fullDesc: 'Far from superstition, authentic tarot is an archetypal mirror of the subconscious. Mrs. Veena Tikare interprets the cards through transpersonal psychotherapy lenses, illuminating unseen dynamics in career, family, and spiritual awakening.',
    durationMinutes: 60,
    format: 'Both',
    category: 'Divination & Intuitive',
    indications: [
      'Major career dilemmas or business crossroads',
      'Clarity on romantic partnerships and soulmate contracts',
      'Understanding why certain karmic cycles repeat in your life',
      'Spiritual guidance during times of grief or radical transition'
    ],
    recommendedSessions: 'As needed',
    investment: '₹2,500 / reading'
  }
];

// === GENUINE CUSTOMER TESTIMONIALS (NO FAKE GOOGLE WIDGETS) ===
export const GENUINE_CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tc-1',
    clientName: 'Apeksha Patalay',
    location: 'Dharwad, Karnataka',
    serviceName: 'Clinical Hypnotherapy',
    rating: 5,
    title: 'Dramatic Relief from Liver Concerns & Chronic Sleep Issues',
    quote: 'I cannot thank Mrs. Veena enough for the incredible support and healing I’ve experienced through hypnotherapy. I initially reached out for help with my liver-related health concerns and ongoing sleep issues, both of which had been troubling me for quite some time. From the very first session she made me feel completely at ease with her calm, compassionate approach. Over time, not only did my sleep improve dramatically—I now wake up refreshed and energized—but I also noticed a significant positive impact on my liver health. She really took the time to understand my situation and guided me with techniques that worked specifically for me. It has truly changed my life for the better.',
    outcomeCategory: 'Psychosomatic Healing',
    date: 'Verified Client'
  },
  {
    id: 'tc-2',
    clientName: 'Prashanth TK',
    location: 'Bengaluru, Karnataka',
    serviceName: 'Subconscious Mind Therapy & Training',
    rating: 5,
    title: '5+ Years of Transformational Guidance & Subconscious Calm',
    quote: 'I have been in touch with Smt. Veena Tikare ji for over 5 years, seeking her guidance and therapies in many critical situations. I have seen great shifts in my life. Only after the very first session with her, I experienced a state of complete calm; it was my first experience of how deep the subconscious mind works. Since then, my chronic aggression has completely dissolved. I was so inspired that I completed the full training course in Hypnotherapy with her. Her therapies are profoundly powerful, and anyone seeking a happier, healthier life should experience this sanctuary.',
    outcomeCategory: 'Spiritual Awakening',
    date: 'Long-term Client & Student'
  },
  {
    id: 'tc-3',
    clientName: 'Vijay Ajgaonkar',
    location: 'Belgaum, Karnataka',
    serviceName: 'Family Constellation',
    rating: 5,
    title: 'A Miraculous Shift Following Severe Accident & Trauma',
    quote: 'A family constellation was conducted by Mrs. Veena for one of my close relatives who was severely injured in a bike accident with a traumatic brain injury and was on a ventilator. We requested Veena Mam to do a systemic constellation for the family. Deep unresolved ancestral issues were unfolded and addressed during the session. As the constellation reached conclusion, the patient came out of critical danger and regained consciousness, which felt like a true miracle to all of us. Big thanks to Veena Mam and gratitude to the universe for letting me witness life through this healing lens.',
    outcomeCategory: 'Karmic & Relationship',
    date: 'Verified Client'
  },
  {
    id: 'tc-4',
    clientName: 'Vani Patalay',
    location: 'Hubli, Karnataka',
    serviceName: 'Hypnotherapy & Stress Relief',
    rating: 5,
    title: 'Remarkable Improvement in Skin Flare-ups and Deep Inner Peace',
    quote: 'I worked with Veena Tikare for a severe stress-related skin condition that resisted conventional ointments. The results have been remarkable. Her warm, calming approach and effective hypnotherapy techniques helped me reduce emotional stress, feel positive about my body, and see visible, lasting improvement in my skin. Highly recommended!',
    outcomeCategory: 'Psychosomatic Healing',
    date: 'Verified Client'
  },
  {
    id: 'tc-5',
    clientName: 'Rashmi Prabhu',
    location: 'Goa',
    serviceName: 'Past Life Regression Therapy',
    rating: 5,
    title: 'An Eye-Opening Awakening to Life Purpose & Inner Strength',
    quote: 'Past Life Regression with Mrs. Veena Tikare was an eye-opening journey into who I truly am. She creates an atmosphere of pure sanctity where you feel completely safe to let your guard down. Releasing old karmic contracts allowed me to finally step into my authentic power without fear.',
    outcomeCategory: 'Spiritual Awakening',
    date: 'Verified Client'
  },
  {
    id: 'tc-6',
    clientName: 'Vaishali Choudhry',
    location: 'Pune, Maharashtra',
    serviceName: 'Inner Child Healing',
    rating: 5,
    title: 'Liberation from Childhood Insecurity and Emotional Exhaustion',
    quote: 'Veena ma\'am is an exceptional healer. She creates a safe, comforting space that immediately put me at ease. Her hypnotherapy and inner child sessions helped me uncover the root cause of my persistent anxiety and self-doubt. The positive shifts I’ve experienced in my confidence and peace of mind are truly remarkable.',
    outcomeCategory: 'Chronic Stress & Anxiety',
    date: 'Verified Client'
  },
  {
    id: 'tc-7',
    clientName: 'Monica Bagrecha',
    location: 'Mumbai, Maharashtra',
    serviceName: 'Therapy & Hypnotherapy Training',
    rating: 5,
    title: 'Outstanding Therapist and Exceptional Teacher',
    quote: 'My experience with Mrs. Veena Tikare was outstanding. She is deeply focused, attentive, and possesses rare clarity in understanding the exact root issue a client is going through. She is not just a gifted healer but also a compassionate trainer who holds your hand throughout the journey.',
    outcomeCategory: 'Spiritual Awakening',
    date: 'Training Graduate'
  },
  {
    id: 'tc-8',
    clientName: 'Rohit Dolli',
    location: 'Dharwad, Karnataka',
    serviceName: 'Clinical Hypnotherapy',
    rating: 5,
    title: 'Overcoming Panic Triggers & Restoring Natural Sleep',
    quote: 'I used to struggle with sudden panic triggers and troubled sleep. Mrs. Veena’s guidance taught my nervous system how to relax deeply. Today I sleep peacefully and handle stressful professional situations with natural composure.',
    outcomeCategory: 'Chronic Stress & Anxiety',
    date: 'Verified Client'
  }
];

export const TRAINING_LEVELS = [
  {
    level: 'Level 1: Basic Hypnosis & Mind Mechanics',
    duration: '2 Days Intensive',
    credential: 'EKAA Certified Basic Hypnotherapist',
    topics: [
      'Conscious, Subconscious, and Critical Filtration Filters',
      'Physical vs Emotional Suggestibility testing & profiling',
      'Authoritarian & Permissive trance induction techniques',
      'Self-hypnosis programming for stress reduction & confidence'
    ]
  },
  {
    level: 'Level 2: Integrated Hypnotic Modalities',
    duration: '3 Days Intensive',
    credential: 'EKAA Certified Hypnotic Modality Practitioner',
    topics: [
      'Hypnodrama, Ericksonian metaphors & Somatosensory deepening',
      'Behavioral modification for smoking cessation & weight balance',
      'Pain management & dental/surgical hypnosis fundamentals',
      'Subconscious anchor installation and trigger dissolution'
    ]
  },
  {
    level: 'Level 3: Advanced Regression Therapeutics',
    duration: '3 Days Intensive',
    credential: 'Certified Advanced Regression Therapist',
    topics: [
      'Age regression to childhood origins and emotional catharsis',
      'Inner child rescue, nurturing, and emotional re-parenting',
      'Womb regression and pre-natal shock clearing protocols',
      'Fear, anxiety, and specific phobia desensitization'
    ]
  },
  {
    level: 'Level 4 & 5: Transpersonal Hypnotherapy & Mastery',
    duration: '4 Days Intensive',
    credential: 'Master Clinical Hypnotherapist (IMDHA USA Accredited)',
    topics: [
      'Past Life Regression methodology (soul memory extraction)',
      'Life between lives, soul purpose, and karmic contract resolution',
      'Clearing foreign energetic attachments and spirit release therapy',
      'Setting up ethical clinical practice and client case documentation'
    ]
  }
];

export const GOOGLE_REVIEWS_URL = 'https://share.google/UKBoboeiky3L1XRd9';
export const REAL_GOOGLE_TESTIMONIALS = GENUINE_CLIENT_TESTIMONIALS;

export const WEBSITE_ANALYSIS = {
  originalUrl: 'https://myreincarnation.in/',
  googleReviewShareUrl: GOOGLE_REVIEWS_URL,
  auditDate: 'November 2026 Analysis',
  googleRating: 4.8,
  totalGoogleReviews: 9,
  findings: [
    {
      category: 'Real Images vs AI Placeholders',
      critique: 'Generic AI-generated pictures fail to convey the true warmth of the physical Dharwad centre and the authentic presence of Mrs. Veena Tikare.',
      solution: 'Replaced with 100% authentic real Indian photographs: Mrs. Veena Tikare, the clinical therapy sanctuary, authentic session work, and the real BODHI logo.'
    },
    {
      category: 'Genuine Patient Testimonials',
      critique: 'Feedback should highlight real patient outcomes rather than third-party review widgets.',
      solution: 'Featured genuine customer recovery stories across chronic pain, liver concerns, anxiety, and family systemic healing.'
    },
    {
      category: 'Luminous Light Spiritual Aesthetic',
      critique: 'Dark themes can feel heavy for anxious seekers seeking peace and comfort.',
      solution: 'Crafted a radiant light theme with warm cream, amber gold, and rich royal purple matching myreincarnation.in.'
    }
  ]
};

