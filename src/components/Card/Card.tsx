import React from 'react';
import { motion } from 'framer-motion';
import { typography, spacing, colors, sizes, commonStyles } from '../../styles/design-system';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  children,
  title,
  size = 'medium',
  className = '',
  onClick,
  interactive = false,
}) => {
  // Get size styles
  const sizeStyles = {
    small: sizes.card.small,
    medium: sizes.card.medium,
    large: sizes.card.large,
  }[size];

  // Get title size based on card size
  const titleSize = {
    small: typography.h4,
    medium: typography.h3,
    large: typography.h2,
  }[size];

  const cardContent = (
    <>
      {title && (
        <h2 className={`${titleSize} ${colors.text.primary} mb-4`}>
          {title}
        </h2>
      )}
      {children}
    </>
  );

  const cardStyles = `
    ${sizeStyles}
    ${spacing.buttonPadding.medium}
    ${colors.background.card}
    ${commonStyles.rounded.large}
    ${commonStyles.shadow.medium}
    ${commonStyles.transition.default}
    ${interactive ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''}
    ${className}
  `;

  return interactive ? (
    <motion.div
      onClick={onClick}
      className={cardStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {cardContent}
    </motion.div>
  ) : (
    <div className={cardStyles}>
      {cardContent}
    </div>
  );
}; 