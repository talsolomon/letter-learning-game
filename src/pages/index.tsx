import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import BigButton from '../components/BigButton';
import { typography, spacing, colors } from '../styles/design-system';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background.gradient} flex flex-col items-center justify-center p-4 sm:p-8`}>
      <motion.div 
        className={`text-center ${spacing.section.marginBottom} w-full max-w-4xl px-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`${typography.h1} ${colors.text.accent} mb-4 child-friendly-text break-words`}>
          Fun Learning Games!
        </h1>
        <p className={`${typography.body1} ${colors.text.secondary} child-friendly-text break-words`}>
          Learn and play with flags, letters, and numbers! 🎮
        </p>
      </motion.div>
      
      <div className={`flex flex-col sm:flex-row ${spacing.gap.large} w-full max-w-6xl px-4`}>
        <BigButton
          onClick={() => router.push('/flags')}
          icon="🏳️"
          size="large"
          className="w-full"
        >
          Flags
        </BigButton>
        
        <BigButton
          onClick={() => router.push('/letters')}
          icon="ABC"
          size="large"
          className="w-full"
        >
          Letters
        </BigButton>

        <BigButton
          onClick={() => router.push('/numbers')}
          icon="123"
          size="large"
          className="w-full"
        >
          Numbers
        </BigButton>
      </div>

      <motion.div 
        className={`${spacing.section.marginTop} text-center px-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className={`${typography.body2} ${colors.text.secondary} child-friendly-text`}>
          Fun for kids of all ages! 🎈
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage; 