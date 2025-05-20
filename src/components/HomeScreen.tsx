
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

  const handleLoginClick = () => {
    // Go directly to biometric authentication for login
    navigate('/biometric-auth', { state: { isLogin: true }});
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
  
  return (
    <Layout>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[80vh] space-y-10 py-8"
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
          <div className="relative">
            <Logo size="lg" animated={true} />
          </div>
          <motion.h1 
            className="text-3xl font-bold mt-6 bg-gradient-to-r from-banking-blue to-banking-darkBlue bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            SuperApp
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Modern Banking Experience
          </motion.p>
        </motion.div>

        <div className="space-y-4 w-full max-w-xs">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              className="w-full shadow-lg bg-gradient-to-r from-banking-blue to-banking-darkBlue p-6"
              size="lg" 
              onClick={handleRegistration}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Register Now
                </div>
                <ArrowRight className="h-4 w-4 animate-pulse-soft" />
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Sign in section */}
        <motion.div 
          className="w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Already have an account?</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-4 items-center justify-center gap-2"
                onClick={handleLoginClick}
              >
                <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center">
                  <Fingerprint className="h-5 w-5 text-banking-blue" />
                </div>
                <span className="text-xs">Face ID</span>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                className="w-full flex flex-col h-auto py-4 items-center justify-center gap-2"
                onClick={handleLoginClick}
              >
                <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center">
                  <Lock className="h-5 w-5 text-banking-blue" />
                </div>
                <span className="text-xs">Touch ID</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            className="flex flex-col items-center text-muted-foreground text-xs"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            onClick={handleUserGuideClick}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all hover:bg-banking-blue/10">
              <BookOpen className="h-5 w-5" />
            </div>
            Guide
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center text-muted-foreground text-xs"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            onClick={handleSupportClick}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all hover:bg-banking-blue/10">
              <HelpCircle className="h-5 w-5" />
            </div>
            Support
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center text-muted-foreground text-xs"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            onClick={handleFaqClick}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-1 transition-all hover:bg-banking-blue/10">
              <Info className="h-5 w-5" />
            </div>
            FAQ
          </motion.button>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default HomeScreen;
