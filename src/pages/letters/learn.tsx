import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import BigButton from '@/components/BigButton';
import { letters } from '@/utils/letterData';
import { Letter } from '@/utils/types';

const LearnLetters: React.FC = () => {
  const router = useRouter();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showLetterInfo, setShowLetterInfo] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showReferenceUrl, setShowReferenceUrl] = useState("");
  
  // Use shuffled letters
  const [shuffledLetters, setShuffledLetters] = useState<Letter[]>(shuffleArray([...letters]));

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array: Letter[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const currentLetter = shuffledLetters[currentLetterIndex];
  const isFirstLetter = currentLetterIndex === 0;
  const isLastLetter = currentLetterIndex === shuffledLetters.length - 1;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowFunFact(false);
      setShowReference(false);
      setShowLetterInfo(false);
    }
  };

  const speakLetterInfo = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const letterToSpeak = currentLetter;
    const utterance = new SpeechSynthesisUtterance(`${letterToSpeak.character}. As in ${letterToSpeak.example}. ${letterToSpeak.funFact}`);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (!isLastLetter) {
      setCurrentLetterIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (!isFirstLetter) {
      setCurrentLetterIndex(prev => prev - 1);
    }
  };

  const handleLetterClick = () => {
    setShowLetterInfo(true);
  };

  const handleCloseInfo = () => {
    setShowLetterInfo(false);
  };

  const handleFunFactClick = () => {
    setShowFunFact(true);
  };

  const handleReferenceClick = () => {
    if (currentLetter.funFactReference) {
      window.open(currentLetter.funFactReference, '_blank');
    }
  };

  const handleRestartWithNewOrder = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setShuffledLetters(shuffleArray([...letters]));
    setCurrentLetterIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-4 flex flex-col items-center">
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-6 rounded-full shadow-lg transition-all duration-200 text-7xl font-bold hover:scale-105 transform flex items-center gap-3"
        >
          <span>🏠</span> Home
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-pink-600 mb-8 animate-bounce-slow">
          📚 Learn Letters! 📚
        </h1>

        <div className="flex flex-col items-center w-full">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mb-6 flex flex-col items-center justify-between min-h-[380px] sm:min-h-[420px]">
            <motion.div
              key={currentLetterIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative cursor-pointer w-full flex flex-col items-center"
              onClick={handleLetterClick}
            >
              <div className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-bold text-purple-600 mb-8">
                {currentLetter.character}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
            </motion.div>

            <div className="text-center w-full max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-3 break-words">
                {currentLetter.example}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 break-words leading-relaxed mb-3">
                {currentLetter.funFact}
              </p>
            </div>
            
            <div className="flex-grow"></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center w-full max-w-2xl mb-4">
            <BigButton
              icon="⬅️"
              onClick={handlePrevious}
              disabled={isFirstLetter}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-8xl px-14 py-8"
            >
              Previous
            </BigButton>
            <BigButton
              icon="🔊"
              onClick={speakLetterInfo}
              className={`shadow-md hover:scale-105 transform transition-all duration-200 text-8xl px-14 py-8 ${
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
              disabled={isLastLetter}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-8xl px-14 py-8"
            >
              Next
            </BigButton>
          </div>
        </div>

        <AnimatePresence>
          {showLetterInfo && (
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
                      <h3 className="text-5xl font-bold text-purple-800 mb-6">{currentLetter.character}</h3>
                      <p className="text-2xl text-gray-700 leading-relaxed">{currentLetter.funFact}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <h4 className="text-2xl font-semibold text-purple-700 mb-3">Example</h4>
                        <p className="text-xl text-purple-600">{currentLetter.example}</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                        <h4 className="text-2xl font-semibold text-yellow-700 mb-3">Fun Fact</h4>
                        <p className="text-xl text-yellow-600">{currentLetter.funFact}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Letter and Learn More Button */}
                  <div className="flex flex-col items-center justify-start space-y-6 pt-4 md:pt-0">
                    <div className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-bold text-purple-600 mb-8">
                      {currentLetter.character}
                    </div>
                    
                    <div className="w-full max-w-md pt-4">
                      <div className="flex gap-4 justify-center">
                        <BigButton 
                          icon="🌐" 
                          onClick={handleReferenceClick}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200 text-7xl px-14 py-8"
                        >
                          Learn More
                        </BigButton>
                        <BigButton
                          icon="🔊"
                          onClick={speakLetterInfo}
                          className={`shadow-md hover:scale-105 transform transition-all duration-200 text-7xl px-14 py-8 ${
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

export default LearnLetters; 