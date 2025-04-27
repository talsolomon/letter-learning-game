import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import BigButton from '@/components/BigButton';
import { flags } from '@/utils/flagData';
import { Flag } from '@/utils/types';

const LearnMode: React.FC = () => {
  const router = useRouter();
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFlagInfo, setShowFlagInfo] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showReferenceUrl, setShowReferenceUrl] = useState("");
  
  // Use shuffled flags directly without region filtering
  const [shuffledFlags, setShuffledFlags] = useState<Flag[]>(shuffleArray([...flags]));

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array: Flag[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const currentFlag = shuffledFlags[currentFlagIndex];
  const isFirstFlag = currentFlagIndex === 0;
  const isLastFlag = currentFlagIndex === shuffledFlags.length - 1;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowFunFact(false);
      setShowReference(false);
      setShowFlagInfo(false);
    }
  };

  const speakFlagInfo = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const flagToSpeak = currentFlag; // Capture the current flag to prevent issue
    const utterance = new SpeechSynthesisUtterance(`${flagToSpeak.country}. ${flagToSpeak.description}`);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (!isLastFlag) {
      setCurrentFlagIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (!isFirstFlag) {
      setCurrentFlagIndex(prev => prev - 1);
    }
  };

  const handleFlagClick = () => {
    setShowFlagInfo(true);
  };

  const handleCloseInfo = () => {
    setShowFlagInfo(false);
  };

  const handleFunFactClick = () => {
    setShowFunFact(true);
  };

  const handleReferenceClick = () => {
    if (currentFlag.funFactReference) {
      window.open(currentFlag.funFactReference, '_blank');
    }
  };

  const handleRestartWithNewOrder = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setShuffledFlags(shuffleArray([...flags]));
    setCurrentFlagIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-4 flex flex-col items-center">
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4 flex gap-3">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 text-lg font-bold hover:scale-105 transform flex items-center gap-2"
        >
          <span>🏠</span> Home
        </button>
        <button
          onClick={() => router.push('/flags')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 text-lg font-bold hover:scale-105 transform flex items-center gap-2"
        >
          <span>←</span> Back
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-pink-600 mb-8 animate-bounce-slow">
          📚 Learn Flags! 📚
        </h1>

        <div className="flex flex-col items-center w-full">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mb-6 flex flex-col items-center justify-between min-h-[380px] sm:min-h-[420px]">
            <motion.div
              key={currentFlagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative cursor-pointer w-full flex flex-col items-center"
              onClick={handleFlagClick}
            >
              <img
                src={currentFlag.flagUrl}
                alt={`Flag of ${currentFlag.country}`}
                className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto rounded-lg shadow-md mb-6"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
            </motion.div>

            <div className="text-center w-full max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4 break-words">
                {currentFlag.country}
              </h2>
              <p className="text-xl text-gray-600 break-words leading-relaxed mb-4">
                {currentFlag.description}
              </p>
              <div className="w-full border-t border-gray-200 pt-3 mt-3">
                <p className="text-lg text-purple-600 font-medium">
                  Continent: {currentFlag.region}
                </p>
              </div>
            </div>
            
            <div className="flex-grow"></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center w-full max-w-2xl mb-4">
            <BigButton
              icon="⬅️"
              onClick={handlePrevious}
              disabled={isFirstFlag}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-xl px-8 py-4"
            >
              Previous
            </BigButton>
            <BigButton
              icon="🔊"
              onClick={speakFlagInfo}
              className={`shadow-md hover:scale-105 transform transition-all duration-200 text-xl px-8 py-4 ${
                isSpeaking 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              }`}
            >
              {isSpeaking ? "Stop" : "Listen"}
            </BigButton>
            <BigButton
              icon="➡️"
              onClick={handleNext}
              disabled={isLastFlag}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-xl px-8 py-4"
            >
              Next
            </BigButton>
          </div>
        </div>

        <AnimatePresence>
          {showFlagInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm z-50"
              onClick={handleOverlayClick}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-5xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseInfo}
                  className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-3xl z-10 transition-colors duration-200"
                >
                  ✕
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-4">
                  {/* Left Column: Info */}
                  <div className="space-y-6 flex flex-col">
                    <div>
                      <h3 className="text-4xl font-bold text-purple-800 mb-4">{currentFlag.country}</h3>
                      <p className="text-xl text-gray-700 leading-relaxed">{currentFlag.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <h4 className="text-xl font-semibold text-purple-700 mb-2">Region</h4>
                        <p className="text-lg text-purple-600">{currentFlag.region}</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                        <h4 className="text-xl font-semibold text-yellow-700 mb-2">Fun Fact</h4>
                        <p className="text-lg text-yellow-600">{currentFlag.funFact}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Flag and Learn More Button */}
                  <div className="flex flex-col items-center justify-start space-y-6 pt-4 md:pt-0">
                    <img
                      src={currentFlag.flagUrl}
                      alt={`Flag of ${currentFlag.country}`}
                      className="w-full max-w-md h-auto rounded-xl shadow-xl border-4 border-white"
                    />
                    
                    <div className="w-full max-w-md pt-4">
                      <div className="flex gap-4 justify-center">
                        <BigButton 
                          icon="🌐" 
                          onClick={handleReferenceClick}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-sm px-4"
                        >
                          Learn More
                        </BigButton>
                        <BigButton
                          icon="🔊"
                          onClick={speakFlagInfo}
                          className={`shadow-md hover:scale-105 transform transition-all duration-200 text-sm px-4 ${
                            isSpeaking 
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                              : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          }`}
                        >
                          {isSpeaking ? "Stop" : "Listen"}
                        </BigButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnMode; 