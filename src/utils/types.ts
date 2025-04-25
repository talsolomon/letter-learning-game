// Base interface for all learning items
export interface LearningItem {
  id: string;
  name: string;
  funFact?: string;
  funFactReference?: string;
}

// Specific types for different learning areas
export interface Flag {
  id: string;
  type: 'flag';
  name: string;
  country: string;
  flagUrl: string;
  imageUrl: string;
  description: string;
  region: string;
  capital?: string;
  population?: string;
  language?: string;
  funFact?: string;
  funFactReference?: string;
}

export interface Number extends LearningItem {
  type: 'number';
  value: number;
  representation: string; // Visual representation (e.g., "●●●" for 3)
  word: string; // Word form (e.g., "three")
}

export type Letter = {
  type: 'letter';
  name: string;
  character: string;
  upperCase: string;
  lowerCase: string;
  phonetic: string;
  example: string;
  funFact: string;
  funFactReference?: string;
};

// Learning area configuration
export interface LearningArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  type: 'flags' | 'numbers' | 'letters';
  color: string;
} 