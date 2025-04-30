export interface BigButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
} 