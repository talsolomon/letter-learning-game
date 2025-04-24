import React from 'react';
import { useRouter } from 'next/router';
import BigButton from '../components/BigButton';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center mb-8 sm:mb-16 animate-bounce-slow w-full max-w-4xl px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-pink-600 mb-4 child-friendly-text break-words">
          Fun Learning Games!
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple-700 child-friendly-text break-words">
          Learn and play with flags, letters, and numbers! 🎮
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-6xl px-4">
        <BigButton
          onClick={() => router.push('/flags')}
          icon="🏳️"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl child-friendly-button w-full py-8 sm:py-10"
        >
          Flags
        </BigButton>
        
        <BigButton
          onClick={() => router.push('/letters')}
          icon="ABC"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl child-friendly-button w-full py-8 sm:py-10"
        >
          Letters
        </BigButton>

        <BigButton
          onClick={() => router.push('/numbers')}
          icon="123"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl child-friendly-button w-full py-8 sm:py-10"
        >
          Numbers
        </BigButton>
      </div>

      <div className="mt-8 sm:mt-16 text-center px-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-700 child-friendly-text">
          Fun for kids of all ages! 🎈
        </p>
      </div>
    </div>
  );
};

export default LandingPage; 