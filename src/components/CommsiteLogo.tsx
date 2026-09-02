import React from 'react';

interface CommsiteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  dark?: boolean;
}

export const CommsiteLogo: React.FC<CommsiteLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  dark = false,
}) => {
  // Vector SVG emblem matching the exact COMMSITE brand asset:
  // - Stylized skyscraper buildings (navy blue & teal)
  // - Location pin at the top center
  // - Dynamic upward-trending green/cyan growth arrow crossing the buildings
  const renderEmblem = (emblemSizeClass: string) => (
    <div className={`relative flex-shrink-0 flex items-center justify-center ${emblemSizeClass}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="commsite_navy_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B3C68" />
            <stop offset="100%" stopColor="#0F2B48" />
          </linearGradient>
          <linearGradient id="commsite_teal_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099A8" />
            <stop offset="100%" stopColor="#0B557C" />
          </linearGradient>
          <linearGradient id="commsite_green_arrow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007799" />
            <stop offset="40%" stopColor="#00A896" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="commsite_pin_grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Left Skyscraper Building */}
        <path
          d="M58 88 L84 64 V150 H58 Z"
          fill="url(#commsite_navy_grad)"
        />

        {/* Center Skyscraper Tower with Pin */}
        <path
          d="M84 56 L116 56 V150 H84 Z"
          fill="url(#commsite_navy_grad)"
        />

        {/* Right Skyscraper Building */}
        <path
          d="M116 68 L142 88 V150 H116 Z"
          fill="url(#commsite_teal_grad)"
        />

        {/* Center Location Map Pin */}
        <path
          d="M100 24 C89 24 80 33 80 44 C80 58 100 78 100 78 C100 78 120 58 120 44 C120 33 111 24 100 24 Z"
          fill="url(#commsite_pin_grad)"
        />
        {/* Pin Center Hole */}
        <circle cx="100" cy="44" r="6" fill="#FFFFFF" />

        {/* Bottom Horizon Wings */}
        <path
          d="M38 150 C50 150 58 145 68 138 L84 150 H38 Z"
          fill="#0B3C68"
        />
        <path
          d="M162 150 C150 150 142 145 132 138 L116 150 H162 Z"
          fill="#10B981"
        />

        {/* Dynamic Upward Growth Zigzag Arrow */}
        <path
          d="M38 148 L68 142 L94 100 L118 122 L150 68 L160 84 L162 48 L126 50 L136 66 L114 104 L92 82 L58 134 Z"
          fill="url(#commsite_green_arrow)"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    const sizeClasses = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`} title="COMMSITE">
        {renderEmblem(sizeClasses[size])}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm ${
          dark
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        } ${className}`}
      >
        {renderEmblem('w-6 h-6')}
        <div className="flex flex-col leading-none">
          <span className="font-black text-sm tracking-wider uppercase text-blue-900 dark:text-blue-200">
            COMMSITE
          </span>
          <span className="text-[9px] font-bold text-slate-500 tracking-tight">
            SITE FINDER
          </span>
        </div>
      </div>
    );
  }

  // Full brand variant with wordmark and tagline
  const sizeMap = {
    sm: {
      emblem: 'w-8 h-8',
      title: 'text-base',
      subtitle: 'text-[9px]',
    },
    md: {
      emblem: 'w-10 h-10',
      title: 'text-xl',
      subtitle: 'text-[10px]',
    },
    lg: {
      emblem: 'w-14 h-14',
      title: 'text-2xl',
      subtitle: 'text-xs',
    },
    xl: {
      emblem: 'w-20 h-20',
      title: 'text-3xl',
      subtitle: 'text-sm',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderEmblem(currentSize.emblem)}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h1
            className={`font-black tracking-tight uppercase leading-none font-sans ${currentSize.title} ${
              dark ? 'text-white' : 'text-[#0B3C68]'
            }`}
          >
            COMMSITE
          </h1>
        </div>
        <span
          className={`font-bold tracking-tight uppercase leading-tight mt-1 ${currentSize.subtitle} ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          COMMERCIAL MARKET OPPORTUNITY <span className="text-emerald-600 font-extrabold">|</span> BUSINESS SITE FINDER
        </span>
      </div>
    </div>
  );
};
