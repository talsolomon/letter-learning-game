import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Card from '../../components/Card';
import BigButton from '../../components/BigButton';
import { typography, spacing, colors, commonStyles } from '../../styles/design-system';
import { flags } from '../../utils/flagData';
import { Flag } from '../../utils/types';

const LearnMode: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shuffledFlags, setShuffledFlags] = useState<Flag[]>([]);

  useEffect(() => {
    setShuffledFlags([...flags].sort(() => Math.random() - 0.5));
  }, []);

  const currentFlag = shuffledFlags[currentIndex] || flags[0];
  const isFirstFlag = currentIndex === 0;
  const isLastFlag = currentIndex === shuffledFlags.length - 1;

  const speakFlagInfo = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `This is the flag of ${currentFlag.country}. ${currentFlag.description}`
      );
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    speechSynthesis.cancel();
    setShowInfo(false);
    setCurrentIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background.gradient}`}>
      <Header title="Learn Flags" showBackButton />

      <main className={`container mx-auto px-4 ${spacing.section.marginTop}`}>
        <div className="flex flex-col items-center">
          <motion.div
            key={currentFlag.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`w-full max-w-2xl ${spacing.section.marginBottom}`}
          >
            <Card size="large" title={currentFlag.country}>
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <img
                  src={currentFlag.imageUrl}
                  alt={`Flag of ${currentFlag.country}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className={`${spacing.section.marginTop} flex flex-col ${spacing.gap.medium}`}>
                <p className={`${typography.body1} ${colors.text.primary}`}>
                  {currentFlag.description}
                </p>
                
                <div className={`flex justify-center ${spacing.gap.medium}`}>
                  <BigButton
                    onClick={() => speakFlagInfo()}
                    icon={isSpeaking ? "🔊" : "🔈"}
                    disabled={isSpeaking}
                    size="medium"
                  >
                    {isSpeaking ? "Speaking..." : "Speak"}
                  </BigButton>
                  
                  <BigButton
                    onClick={() => setShowInfo(!showInfo)}
                    icon="ℹ️"
                    size="medium"
                  >
                    {showInfo ? "Hide Info" : "More Info"}
                  </BigButton>
                </div>
              </div>
            </Card>
          </motion.div>

          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
              >
                <Card size="medium">
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${spacing.gap.medium}`}>
                    <div>
                      <h3 className={`${typography.h4} ${colors.text.secondary}`}>Region</h3>
                      <p className={`${typography.body2}`}>{currentFlag.region}</p>
                    </div>
                    <div>
                      <h3 className={`${typography.h4} ${colors.text.secondary}`}>Capital</h3>
                      <p className={`${typography.body2}`}>{currentFlag.capital}</p>
                    </div>
                    <div>
                      <h3 className={`${typography.h4} ${colors.text.secondary}`}>Population</h3>
                      <p className={`${typography.body2}`}>{currentFlag.population}</p>
                    </div>
                    <div>
                      <h3 className={`${typography.h4} ${colors.text.secondary}`}>Language</h3>
                      <p className={`${typography.body2}`}>{currentFlag.language}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <h3 className={`${typography.h4} ${colors.text.secondary}`}>Fun Fact</h3>
                      <p className={`${typography.body2}`}>{currentFlag.funFact}</p>
                      <a
                        href={currentFlag.funFactReference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${typography.body3} ${colors.text.accent} underline mt-2 inline-block`}
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex justify-center ${spacing.gap.large} ${spacing.section.marginTop}`}>
            <BigButton
              onClick={() => handleNavigation('prev')}
              disabled={isFirstFlag}
              icon="←"
              size="large"
              variant="secondary"
            >
              Previous
            </BigButton>
            
            <BigButton
              onClick={() => handleNavigation('next')}
              disabled={isLastFlag}
              icon="→"
              size="large"
              variant="secondary"
            >
              Next
            </BigButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnMode; 