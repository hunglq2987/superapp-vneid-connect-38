
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, ArrowRight, ChevronsRight, HelpCircle, BookOpen, Info, Fingerprint, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
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
    
    // Simulate authentication process with animation
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
    }, 3000); // 3 seconds for authentication animation
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

  // Face ID scanning animation overlay
  const renderFaceIdAnimation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      >
        <motion.div className="bg-black/80 rounded-3xl h-40 w-40 flex flex-col items-center justify-center">
          <motion.div 
            className="border-2 border-blue-500 rounded-full h-24 w-24 mb-4 relative"
            animate={{ 
              borderColor: ['rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.5)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="absolute left-1/2 top-0 w-0.5 h-full bg-blue-500/50"
              initial={{ scaleY: 0, translateX: "-50%" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute left-0 top-1/2 w-full h-0.5 bg-blue-500/50"
              initial={{ scaleX: 0, translateY: "-50%" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-dashed border-blue-400"
              animate={{ 
                rotate: 360,
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <p className="text-blue-400 text-sm">Face ID Scanning...</p>
        </motion.div>
      </motion.div>
    );
  };

  // Touch ID animation overlay
  const renderTouchIdAnimation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      >
        <motion.div className="bg-black/80 rounded-3xl h-40 w-40 flex flex-col items-center justify-center">
          <motion.div 
            className="border-2 border-blue-500 rounded-full h-24 w-24 mb-4 flex items-center justify-center"
            animate={{ 
              borderColor: ['rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.5)'],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.div 
              className="bg-blue-400/30 rounded-full h-20 w-20 flex items-center justify-center"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Fingerprint className="h-12 w-12 text-blue-400" />
            </motion.div>
          </motion.div>
          <p className="text-blue-400 text-sm">Touch ID Scanning...</p>
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
              className="w-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 p-5 rounded-xl hover:shadow-blue-200/50"
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

        {/* Sign in section - reduced visual weight */}
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
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
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
                  className="h-7 w-7 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Fingerprint className="h-3.5 w-3.5 text-banking-blue" />
                </motion.div>
                <span className="text-xs font-medium">Face ID</span>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
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
                  className="h-7 w-7 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Lock className="h-3.5 w-3.5 text-banking-blue" />
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
      
      {/* Authentication animation overlays */}
      <AnimatePresence>
        {authInProgress === 'face' && renderFaceIdAnimation()}
        {authInProgress === 'touch' && renderTouchIdAnimation()}
      </AnimatePresence>
    </Layout>
  );
};

export default HomeScreen;
