import React, { useState } from 'react';
import { X, Compass, ArrowRight, CheckCircle2, RotateCcw, Calendar } from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';
import { Service } from '../types';

interface SoulQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService: (service: Service) => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    targetServiceId: string;
    archetype: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the primary blockage or challenge currently weighing on your soul?",
    options: [
      {
        text: "Unexplained physical pain, migraines, or severe irrational phobias (water, fire, heights, claustrophobia)",
        targetServiceId: "past-life-regression",
        archetype: "Karmic & Past Life Residue"
      },
      {
        text: "Anxiety, panic attacks, insomnia, stage fright, or self-sabotaging behavioral loops",
        targetServiceId: "clinical-hypnotherapy",
        archetype: "Subconscious Neurological Conditioning"
      },
      {
        text: "Recurring relationship heartbreak, family alienation, or carrying an invisible generational curse",
        targetServiceId: "family-constellation",
        archetype: "Systemic Ancestral Entanglement"
      },
      {
        text: "Chronic mental exhaustion, psychic burnout, feeling disconnected from my energetic vitality",
        targetServiceId: "kirlian-aura-photography",
        archetype: "Subtle Energy Biofield Depletion"
      }
    ]
  },
  {
    id: 2,
    question: "How long has this sensation or pattern persisted in your life?",
    options: [
      {
        text: "As long as I can remember — feels like I was born with this instinct or fear",
        targetServiceId: "past-life-regression",
        archetype: "Soul Memory Vault"
      },
      {
        text: "Since early childhood, following a specific emotional reprimand or difficult home environment",
        targetServiceId: "inner-child-womb-healing",
        archetype: "Inner Child Trauma"
      },
      {
        text: "It echoes the exact struggles my parents, grandparents, or ancestors also endured",
        targetServiceId: "family-constellation",
        archetype: "Ancestral DNA Pattern"
      },
      {
        text: "Recent months or year due to overwhelming stress, career pressure, or spiritual awakening",
        targetServiceId: "reiki-rajakriya-angel",
        archetype: "High-Vibrational Fatigue"
      }
    ]
  },
  {
    id: 3,
    question: "What kind of verification or outcome feels most empowering to you?",
    options: [
      {
        text: "Reliving and completing unresolved memories in a deep trance to free my soul contract",
        targetServiceId: "past-life-regression",
        archetype: "Transpersonal Catharsis"
      },
      {
        text: "Seeing objective, photographic electromagnetic proof of my aura and chakra vitality",
        targetServiceId: "kirlian-aura-photography",
        archetype: "Scientific Biofield Proof"
      },
      {
        text: "Rewiring my subconscious beliefs so I wake up feeling confident, rested, and calm",
        targetServiceId: "clinical-hypnotherapy",
        archetype: "Subconscious Alignment"
      },
      {
        text: "Restoring peace between family members and feeling deep forgiveness across lineages",
        targetServiceId: "family-constellation",
        archetype: "Systemic Order of Love"
      }
    ]
  }
];

export const SoulQuizModal: React.FC<SoulQuizModalProps> = ({ isOpen, onClose, onBookService }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultService, setResultService] = useState<Service | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (targetServiceId: string) => {
    const updated = [...answers, targetServiceId];
    setAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant target
      const counts: Record<string, number> = {};
      updated.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });
      let highestId = updated[0];
      let maxCount = 0;
      Object.entries(counts).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestId = id;
        }
      });

      const matched = SERVICES_DATA.find(s => s.id === highestId) || SERVICES_DATA[0];
      setResultService(matched);
      setCurrentStep(QUIZ_QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultService(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A1C17] border border-[#D28A38]/40 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D28A38]/20 bg-[#071612]">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D28A38]" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D28A38]">
                Self-Assessment Navigator
              </div>
              <h3 className="font-serif text-xl font-semibold text-amber-50">
                What Healing Modality Does Your Soul Need?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#102D26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6">
          {currentStep < QUIZ_QUESTIONS.length ? (
            <div className="space-y-6">
              
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-[#C59B27] font-medium">BODHI Soul Diagnostic</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#C59B27] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h4 className="font-serif text-xl sm:text-2xl text-amber-100 font-normal leading-relaxed">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {QUIZ_QUESTIONS[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(option.targetServiceId)}
                    className="w-full text-left p-4 rounded-xl bg-[#070D1E] border border-slate-800 hover:border-[#C59B27] hover:bg-[#121C3B] transition-all group flex items-start justify-between gap-3"
                  >
                    <span className="text-xs sm:text-sm text-slate-200 group-hover:text-amber-100 leading-relaxed">
                      {option.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#C59B27] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Result Screen */
            resultService && (
              <div className="space-y-6 text-center sm:text-left">
                
                <div className="p-6 rounded-2xl bg-[#070D1E] border border-[#C59B27]/50 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#C59B27] font-medium border-b border-slate-800 pb-3">
                    <span>Soul Diagnostic Completed</span>
                    <span>High Resonance Match</span>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400">
                      Recommended Modality for Your Journey:
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-amber-100 mt-1">
                      {resultService.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {resultService.subtitle}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {resultService.shortDesc}
                  </p>

                  <div className="p-3 rounded-lg bg-[#121C3B] border border-slate-800 text-xs text-slate-300">
                    <strong className="text-amber-200 block mb-1">Why this fits your profile:</strong>
                    Based on your responses, your current challenges stem from deep memory vaults rather than surface conscious habits. Mrs. Veena Tikare's {resultService.title} protocol is structured to release this specific subconscious charge drug-free.
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2">
                    <span className="text-amber-200 font-medium">
                      Duration: {resultService.durationMinutes} mins · Format: {resultService.format}
                    </span>
                    <span className="text-[#C59B27] font-semibold">{resultService.investment}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Soul Quiz</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs text-slate-300 hover:text-white"
                    >
                      Browse All Modalities
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onBookService(resultService);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D28A38] hover:bg-[#E59E4C] text-[#0A1C17] font-semibold text-xs transition-colors shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book {resultService.title.split('(')[0].trim()}</span>
                    </button>
                  </div>
                </div>

              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};
