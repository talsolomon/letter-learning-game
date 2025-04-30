// Font Sizes
export const typography = {
  // Headers
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl', // Main page titles
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl', // Section headers
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl', // Sub-section headers
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl', // Card headers
  
  // Body text
  body1: 'text-base sm:text-lg md:text-xl lg:text-2xl', // Large body text
  body2: 'text-sm sm:text-base md:text-lg lg:text-xl', // Regular body text
  body3: 'text-xs sm:text-sm md:text-base lg:text-lg', // Small body text
  
  // Button text
  buttonLarge: 'text-sm sm:text-base md:text-lg lg:text-xl',
  buttonMedium: 'text-xs sm:text-sm md:text-base lg:text-lg',
  buttonSmall: 'text-xs sm:text-xs md:text-sm lg:text-base',
} as const;

// Spacing
export const spacing = {
  // Padding
  buttonPadding: {
    large: 'px-4 py-2 sm:px-5 sm:py-3',
    medium: 'px-3 py-2 sm:px-4 sm:py-2',
    small: 'px-2 py-1 sm:px-3 sm:py-2',
  },
  
  // Margins
  section: {
    marginTop: 'mt-8 sm:mt-12 md:mt-16 lg:mt-20',
    marginBottom: 'mb-8 sm:mb-12 md:mb-16 lg:mb-20',
  },
  
  // Gaps
  gap: {
    small: 'gap-2 sm:gap-3 md:gap-4',
    medium: 'gap-4 sm:gap-6 md:gap-8',
    large: 'gap-6 sm:gap-8 md:gap-12',
  },
} as const;

// Colors
export const colors = {
  // Brand Colors
  primary: {
    light: 'from-pink-400 to-purple-400',
    default: 'from-pink-500 to-purple-500',
    dark: 'from-pink-600 to-purple-600',
  },
  
  // Text Colors
  text: {
    primary: 'text-purple-800',
    secondary: 'text-purple-600',
    accent: 'text-pink-600',
  },
  
  // Background Colors
  background: {
    gradient: 'from-pink-200 via-yellow-100 to-purple-100',
    card: 'bg-white bg-opacity-90',
    overlay: 'bg-black bg-opacity-50',
  },
} as const;

// Component Sizes
export const sizes = {
  // Button sizes
  button: {
    small: 'h-6 sm:h-7 md:h-8',
    medium: 'h-8 sm:h-9 md:h-10',
    large: 'h-10 sm:h-11 md:h-12',
  },
  
  // Card sizes
  card: {
    small: 'w-64 sm:w-72 md:w-80',
    medium: 'w-72 sm:w-80 md:w-96',
    large: 'w-80 sm:w-96 md:w-[28rem]',
  },
  
  // Icon sizes
  icon: {
    small: 'w-6 h-6 sm:w-8 sm:h-8',
    medium: 'w-8 h-8 sm:w-10 sm:h-10',
    large: 'w-10 h-10 sm:w-12 sm:h-12',
  },
} as const;

// Common styles
export const commonStyles = {
  // Shadows
  shadow: {
    small: 'shadow-md',
    medium: 'shadow-lg',
    large: 'shadow-xl',
  },
  
  // Rounded corners
  rounded: {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    full: 'rounded-full',
  },
  
  // Transitions
  transition: {
    default: 'transition-all duration-300',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-500',
  },
  
  // Animations
  animation: {
    hover: 'hover:scale-105',
    tap: 'active:scale-95',
    bounce: 'animate-bounce',
  },
} as const; 