import React, { useState } from 'react';

interface ThemedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const ThemedLogo: React.FC<ThemedLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle
}) => {
  const [imgError, setImgError] = useState(false);

  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16'
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      {!imgError ? (
        <img
          src="/src/assets/real/logo.png"
          alt="BODHI - Unravel The Inner Wisdom"
          onError={() => setImgError(true)}
          className={`${heights[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
        />
      ) : (
        /* Vector SVG Fallback with exact Caduceus and Bodhi Typography */
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 48 70"
            className="h-10 w-auto text-[#5B2373]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Caduceus Staff & Kundalini Wings */}
            <path d="M24 2 C23 2 22 3 22 4 L22 66 C22 67 23 68 24 68 C25 68 26 67 26 66 L26 4 C26 3 25 2 24 2 Z" fill="#5B2373" />
            <circle cx="24" cy="5" r="4" fill="#D97706" />
            {/* Serpent / Energy Waves */}
            <path
              d="M12 16 C18 14 30 14 36 16 C42 18 42 26 34 28 C26 30 14 32 12 38 C10 44 20 48 24 50 C28 48 38 44 36 38"
              fill="none"
              stroke="#5B2373"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M36 16 C30 14 18 14 12 16 C6 18 6 26 14 28 C22 30 34 32 36 38 C38 44 28 48 24 50 C20 48 10 44 12 38"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#5B2373] leading-none">
              BODHI
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.22em] text-[#5B2373]/90 uppercase mt-0.5 whitespace-nowrap">
              UNRAVEL THE INNER WISDOM
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
