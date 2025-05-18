
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', animated = false }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16', // Reduced from w-20 h-20
  };

  if (animated) {
    return (
      <motion.div 
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-banking-blue to-banking-darkBlue flex items-center justify-center relative overflow-hidden shadow-lg`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.05, rotate: [0, -2, 0, 2, 0] }}
      >
        <motion.span 
          className="text-white font-display font-bold text-2xl"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          S
        </motion.span>
        <motion.div 
          className="absolute -right-1 top-0 w-5 h-5 bg-banking-yellow rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            boxShadow: ['0 0 0 rgba(250, 204, 21, 0)', '0 0 10px rgba(250, 204, 21, 0.7)', '0 0 5px rgba(250, 204, 21, 0.5)']
          }}
          transition={{ 
            scale: { delay: 0.3, duration: 0.5 },
            boxShadow: { repeat: Infinity, duration: 2, delay: 1 }
          }}
        >
          <Shield className="w-2.5 h-2.5 text-white" />
        </motion.div>
        <motion.div
          className="absolute -z-10 w-full h-full bg-gradient-to-tr from-transparent to-white/20"
          animate={{ 
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 8, ease: "linear" },
            opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
        />
      </motion.div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-banking-blue to-banking-lightBlue flex items-center justify-center relative overflow-hidden shadow-lg`}>
      <span className="text-white font-display font-bold text-2xl">S</span>
      <div className="absolute -right-1 top-0 w-5 h-5 bg-banking-yellow rounded-full flex items-center justify-center">
        <Shield className="w-2.5 h-2.5 text-white" />
      </div>
      <div className="absolute -z-10 w-full h-full bg-gradient-to-tr from-transparent to-white/20" />
    </div>
  );
};

export default Logo;
