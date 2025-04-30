import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { typography, spacing, colors, commonStyles } from '../styles/design-system';
import BigButton from './BigButton';

interface HeaderProps {
  title: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showHomeButton = true,
  showBackButton = false,
  className = '',
}) => {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full
        flex items-center justify-between
        ${spacing.buttonPadding.medium}
        ${commonStyles.shadow.small}
        bg-white bg-opacity-90
        ${className}
      `}
    >
      <div className="flex items-center gap-4">
        {showBackButton && (
          <BigButton
            size="small"
            variant="secondary"
            icon="←"
            onClick={() => router.back()}
          >
            Back
          </BigButton>
        )}
        <h1 className={`${typography.h2} ${colors.text.primary}`}>
          {title}
        </h1>
      </div>

      {showHomeButton && (
        <BigButton
          size="small"
          variant="primary"
          icon="🏠"
          onClick={() => router.push('/')}
        >
          Home
        </BigButton>
      )}
    </motion.header>
  );
};

export default Header; 