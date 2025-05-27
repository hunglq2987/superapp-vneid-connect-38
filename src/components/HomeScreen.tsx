import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, ArrowRight, ChevronsRight, HelpCircle, BookOpen, Info, Fingerprint, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [authInProgress, setAuthInProgress] = useState<'face' | 'touch' | null>(null);

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleLoginClick = (method: 'face' | 'touch') => {
    setAuthInProgress(method);
    
    // Simulate authentication process with improved animation
    const authTime = method === 'face' ? 2500 : 2000; // Face ID takes a bit longer than Touch ID
    
    setTimeout(() => {
      // Simulate success
      toast.success(`${method === 'face' ? 'Face ID' : 'Touch ID'} authentication successful`);
      setAuthInProgress(null);
      
      // Navigate to profile management after successful authentication
      navigate('/profile-management', { 
        state: { 
          nationalId: '111111111111'
        }
      });
    }, authTime);
  };
  
  const handleSupportClick = () => {
    navigate('/support');
  };
  
  const handleUserGuideClick = () => {
    navigate('/user-guide');
  };
  
  const handleFaqClick = () => {
    navigate('/faq');
  };
  
  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: {
      scale: 0.98,
    }
  };
  
  const iconButtonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 0.1)"
    },
    tap: { 
      scale: 0.95,
      backgroundColor: "rgba(59, 130, 246, 0.2)" 
    }
  };

  // Animation for pulsating effect
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };

  // Enhanced Face ID scanning animation overlay
  const renderFaceIdAnimation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm"
      >
        <motion.div 
          className="bg-black/90 rounded-3xl h-48 w-48 flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="border-2 border-blue-500 rounded-full h-28 w-28 mb-4 relative"
            animate={{ 
              borderColor: ['rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.9)', 'rgba(59, 130, 246, 0.5)'],
              boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(59, 130, 246, 0)'],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {/* Horizontal scanning line */}
            <motion.div 
              className="absolute left-0 top-1/2 w-full h-0.5 bg-blue-500"
              initial={{ scaleX: 0, translateY: "-50%", opacity: 0.6 }}
              animate={{ 
                scaleX: [0, 1, 0],
                translateY: "-50%",
                opacity: [0.6, 0.9, 0.6] 
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
            
            {/* Vertical scanning line */}
            <motion.div 
              className="absolute left-1/2 top-0 w-0.5 h-full bg-blue-500"
              initial={{ scaleY: 0, translateX: "-50%", opacity: 0.6 }}
              animate={{ 
                scaleY: [0, 1, 0],
                translateX: "-50%",
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
            />
            
            {/* Face outline */}
            <motion.div
              className="absolute h-14 w-14 border-2 border-dashed border-blue-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                rotate: 360,
                scale: [0.9, 1, 0.9]
              }}
              transition={{ 
                opacity: { duration: 2, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            />
            
            {/* Points detection animation */}
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute h-1.5 w-1.5 bg-blue-400 rounded-full"
                style={{ 
                  top: `${30 + Math.sin(i / 8 * 2 * Math.PI) * 30}%`,
                  left: `${30 + Math.cos(i / 8 * 2 * Math.PI) * 30}%`
                }}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15 
                }}
              />
            ))}
          </motion.div>
          <motion.p 
            className="text-blue-400 text-sm font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Face ID Scanning...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced Touch ID animation overlay
  const renderTouchIdAnimation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm"
      >
        <motion.div 
          className="bg-black/90 rounded-3xl h-48 w-48 flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="border-2 border-blue-500 rounded-full h-28 w-28 mb-4 flex items-center justify-center overflow-hidden"
            animate={{ 
              borderColor: ['rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.9)', 'rgba(59, 130, 246, 0.5)'],
              boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(59, 130, 246, 0)'],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <motion.div 
              className="relative h-24 w-24 flex items-center justify-center"
            >
              {/* Fingerprint scan effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Fingerprint icon with pulsating effect */}
              <motion.div
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Fingerprint className="h-16 w-16 text-blue-400" strokeWidth={1.5} />
              </motion.div>
              
              {/* Scanning line animation */}
              <motion.div
                className="absolute w-full h-0.5 bg-blue-500"
                initial={{ top: '0%', opacity: 0.7 }}
                animate={{ 
                  top: ['0%', '100%', '0%'],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
          <motion.p 
            className="text-blue-400 text-sm font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Touch ID Scanning...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  };
  
  return (
    <Layout>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[80vh] space-y-9 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center space-y-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative flex justify-center">
            <Logo size="md" animated={true} />
          </div>
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-banking-blue to-banking-darkBlue bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            SuperApp
          </motion.h1>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Modern Banking Experience
          </motion.p>
        </motion.div>

        <div className="space-y-4 w-full max-w-xs px-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={pulseAnimation}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button 
              className="w-full shadow-lg bg-gradient-to-r from-red-500 to-red-700 p-5 rounded-xl hover:shadow-red-200/50"
              size="lg" 
              onClick={handleRegistration}
            >
              <motion.div 
                className="flex items-center justify-between w-full"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center gap-2.5">
                  <User className="h-5.5 w-5.5" />
                  <span className="text-base">Register Now</span>
                </div>
                <ArrowRight className="h-4.5 w-4.5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        <div className="w-full max-w-xs px-4">
          <Separator className="my-2 bg-gray-200" />
        </div>

        {/* Sign in section - with enhanced hover effects */}
        <motion.div 
          className="w-full max-w-xs px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center mb-1.5">
            <p className="text-sm text-muted-foreground font-medium">Already have an account?</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="col-span-1"
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-2 items-center justify-center gap-1 shadow-sm rounded-lg"
                onClick={() => handleLoginClick('face')}
                disabled={authInProgress !== null}
              >
                <motion.div 
                  className="h-9 w-9 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  whileHover={{ 
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User className="h-4 w-4 text-banking-blue" />
                </motion.div>
                <span className="text-xs font-medium">Face ID</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="col-span-1"
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-2 items-center justify-center gap-1 shadow-sm rounded-lg"
                onClick={() => handleLoginClick('touch')}
                disabled={authInProgress !== null}
              >
                <motion.div 
                  className="h-9 w-9 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  whileHover={{ 
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Fingerprint className="h-4 w-4 text-banking-blue" />
                </motion.div>
                <span className="text-xs font-medium">Touch ID</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-8 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="flex flex-col items-center text-muted-foreground text-xs"
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUserGuideClick}
                >
                  <motion.div 
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <BookOpen className="h-4 w-4" />
                  </motion.div>
                  Guide
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View user guides and tutorials</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="flex flex-col items-center text-muted-foreground text-xs"
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSupportClick}
                >
                  <motion.div 
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </motion.div>
                  Support
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact customer support</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className="flex flex-col items-center text-muted-foreground text-xs"
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFaqClick}
                >
                  <motion.div 
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <Info className="h-4 w-4" />
                  </motion.div>
                  FAQ
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Frequently asked questions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.div>
      
      {/* Authentication animation overlays with enhanced animations */}
      <AnimatePresence>
        {authInProgress === 'face' && renderFaceIdAnimation()}
        {authInProgress === 'touch' && renderTouchIdAnimation()}
      </AnimatePresence>
    </Layout>
  );
};

export default HomeScreen;
