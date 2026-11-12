import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  aspectRatio?: 'hero' | 'standard' | 'wide';
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  slides,
  autoPlayInterval = 5000,
  aspectRatio = 'standard',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval, slides.length]);

  if (!slides || slides.length === 0) return null;

  const aspectClasses = {
    hero: 'h-[360px] sm:h-[460px] lg:h-[520px]',
    standard: 'h-[280px] sm:h-[360px] lg:h-[420px]',
    wide: 'h-[240px] sm:h-[300px] lg:h-[340px]'
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-amber-200/50 bg-[#FFFDF8] group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Viewport */}
      <div className={`relative w-full ${aspectClasses[aspectRatio]}`}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Gentle Warm Contrast Scrim for Light/Dark Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-20">
              {slide.tag && (
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1.5 font-sans">
                  {slide.tag}
                </div>
              )}
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug drop-shadow-sm text-white">
                {slide.title}
              </h3>
              {slide.subtitle && (
                <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl font-light line-clamp-2">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#5B2373] shadow-md transition-all hover:scale-105 opacity-80 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#5B2373] shadow-md transition-all hover:scale-105 opacity-80 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 right-4 sm:right-6 z-30 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-amber-400'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
