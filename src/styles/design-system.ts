// Font Sizes
export const typography = {
  // Headers
  h1: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl', // Main page titles
  h2: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl', // Section headers
  h3: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl', // Sub-section headers
  h4: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl', // Card headers
  
  // Body text
  body1: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl', // Large body text
  body2: 'text-lg sm:text-xl md:text-2xl lg:text-3xl', // Regular body text
  body3: 'text-base sm:text-lg md:text-xl lg:text-2xl', // Small body text
  
  // Button text
  buttonLarge: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  buttonMedium: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  buttonSmall: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
} as const;

// Spacing
export const spacing = {
  // Padding
  buttonPadding: {
    large: 'px-8 py-6 sm:px-10 sm:py-8',
    medium: 'px-6 py-4 sm:px-8 sm:py-6',
    small: 'px-4 py-3 sm:px-6 sm:py-4',
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
    small: 'h-16 sm:h-20 md:h-24',
    medium: 'h-20 sm:h-24 md:h-28',
    large: 'h-24 sm:h-28 md:h-32',
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