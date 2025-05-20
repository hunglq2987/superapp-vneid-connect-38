
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, ArrowRight, ChevronsRight, HelpCircle, BookOpen, Info, Fingerprint, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleLoginClick = (method: 'face' | 'touch') => {
    // Go directly to biometric authentication for login with the specific method
    navigate('/biometric-auth', { 
      state: { 
        isLogin: true,
        authMethod: method 
      }
    });
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
  
  return (
    <Layout>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center space-y-2"
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
            className="text-muted-foreground text-sm"
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
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button 
              className="w-full shadow-lg bg-gradient-to-r from-banking-blue to-banking-darkBlue p-5"
              size="lg" 
              onClick={handleRegistration}
            >
              <motion.div 
                className="flex items-center justify-between w-full"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Register Now
                </div>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Sign in section */}
        <motion.div 
          className="w-full max-w-xs px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center mb-2">
            <p className="text-sm text-muted-foreground font-medium">Already have an account?</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-3 items-center justify-center gap-1 shadow-sm"
                onClick={() => handleLoginClick('face')}
              >
                <motion.div 
                  className="h-8 w-8 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Fingerprint className="h-4 w-4 text-banking-blue" />
                </motion.div>
                <span className="text-xs font-medium">Face ID</span>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-3 items-center justify-center gap-1 shadow-sm"
                onClick={() => handleLoginClick('touch')}
              >
                <motion.div 
                  className="h-8 w-8 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center"
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Lock className="h-4 w-4 text-banking-blue" />
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
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default HomeScreen;
