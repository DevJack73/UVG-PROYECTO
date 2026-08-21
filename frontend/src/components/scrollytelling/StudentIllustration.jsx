import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Vector University Student Character
 * State is driven by scroll progress: picking up box -> walking -> loading into truck
 */
export default function StudentIllustration({ progress, isCarrying = true }) {
  return (
    <div className="relative w-28 h-44 sm:w-36 sm:h-52 select-none pointer-events-none">
      <svg
        viewBox="0 0 140 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Soft shadow */}
        <ellipse cx="70" cy="192" rx="35" ry="6" fill="rgba(15, 23, 42, 0.15)" />

        {/* Left Leg */}
        <motion.path
          d="M60 120 L56 160 L50 188"
          stroke="#1e293b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left Shoe */}
        <path d="M44 188 C44 184 56 184 62 188 L44 192 Z" fill="#0f172a" />

        {/* Right Leg */}
        <motion.path
          d="M80 120 L84 158 L90 188"
          stroke="#1e293b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Shoe */}
        <path d="M84 188 C84 184 96 184 102 188 L84 192 Z" fill="#0f172a" />

        {/* Torso / UVG Green Hoodie */}
        <path
          d="M50 72 Q70 66 90 72 L96 122 Q70 128 44 122 Z"
          fill="#1b4332"
          className="transition-colors duration-300"
        />
        {/* UVG Emblem on chest */}
        <circle cx="62" cy="85" r="4" fill="#d97706" />
        <text x="69" y="87" fill="#ffffff" fontSize="5" fontWeight="bold" fontFamily="sans-serif">UVG</text>

        {/* Neck */}
        <rect x="65" y="58" width="10" height="12" rx="3" fill="#fbcfe8" />

        {/* Head */}
        <circle cx="70" cy="46" r="16" fill="#fbd5b5" />
        
        {/* Modern Hair */}
        <path
          d="M54 44 C54 30 65 24 76 24 C86 24 90 32 90 42 C84 40 78 38 68 40 C60 42 56 46 54 44 Z"
          fill="#1e1b18"
        />

        {/* Face details */}
        <circle cx="76" cy="46" r="1.8" fill="#1e293b" /> {/* Eye */}
        <path d="M74 52 Q77 55 80 52" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" /> {/* Smile */}

        {/* Back Arm */}
        <motion.path
          d="M52 74 L40 96 L60 102"
          stroke="#14532d"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Donation Package in hands */}
        {isCarrying && (
          <g transform="translate(68, 80)">
            {/* Cardboard Box */}
            <rect x="0" y="0" width="38" height="30" rx="3" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
            {/* Box Tape */}
            <rect x="16" y="0" width="6" height="30" fill="#fef3c7" opacity="0.8" />
            {/* Heart symbol on box */}
            <path
              d="M19 12 C17 10 13 11 13 14 C13 18 19 21 19 21 C19 21 25 18 25 14 C25 11 21 10 19 12 Z"
              fill="#ffffff"
            />
          </g>
        )}

        {/* Front Arm holding box */}
        <motion.path
          d="M86 76 L98 94 L82 104"
          stroke="#1b4332"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Hand */}
        <circle cx="82" cy="104" r="5" fill="#fbd5b5" />
      </svg>
    </div>
  );
}
