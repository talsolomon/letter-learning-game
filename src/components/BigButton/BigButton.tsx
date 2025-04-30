import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, colors, sizes, commonStyles } from '../../styles/design-system';
import { BigButtonProps } from './BigButton.types';

export const BigButton: React.FC<BigButtonProps> = ({ 
  children, 
  onClick, 
  icon, 
  className = '', 
  disabled = false,
  size = 'medium',
  variant = 'primary'
}) => {
  // Get styles based on size
  const sizeStyles = {
    small: `${typography.buttonSmall} ${spacing.buttonPadding.small} ${sizes.button.small}`,
    medium: `${typography.buttonMedium} ${spacing.buttonPadding.medium} ${sizes.button.medium}`,
    large: `${typography.buttonLarge} ${spacing.buttonPadding.large} ${sizes.button.large}`,
  }[size];

  // Get styles based on variant
  const variantStyles = {
    primary: `bg-gradient-to-r ${colors.primary.default} hover:${colors.primary.dark}`,
    secondary: `bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500`,
  }[variant];

  // Icon size based on button size
  const iconSize = {
    small: sizes.icon.small,
    medium: sizes.icon.medium,
    large: sizes.icon.large,
  }[size];

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`
        flex items-center justify-center ${spacing.gap.small}
        ${sizeStyles}
        ${variantStyles}
        ${commonStyles.rounded.full}
        ${commonStyles.shadow.medium}
        ${commonStyles.transition.default}
        text-white font-bold
        ${disabled ? 'cursor-not-allowed opacity-50 hover:opacity-50' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      {icon && (
        <span className={iconSize}>
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">
        {children}
      </span>
    </motion.button>
  );
}; 