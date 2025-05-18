
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { CheckCircle, Info, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [showingSection, setShowingSection] = useState<string | null>('general');
  const [showCompletion, setShowCompletion] = useState(false);
  
  const handleAcceptTerms = () => {
    if (!accepted) {
      toast.error("Please accept the terms and conditions to continue");
      return;
    }
    
    // Show completion screen
    setShowCompletion(true);
    
    // Navigate to home with success message after a delay
    setTimeout(() => {
      navigate('/', { 
        state: { registrationComplete: true } 
      });
    }, 3000);
  };

  const renderTermsSection = () => {
    if (showingSection === 'general') {
      return (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-semibold text-lg">General Terms & Conditions</h3>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="mb-4">
              These Terms and Conditions govern your use of the SuperApp banking mobile application 
              (the "App") and related services provided by SuperApp Financial Institution ("we", "us", or "our").
            </p>
            
            <h4 className="font-medium text-base mt-4 text-banking-blue">1. Acceptance of Terms</h4>
            <p className="mb-2 pl-4">
              By registering, accessing or using the App, you agree to be bound by these Terms and Conditions. 
              If you do not agree, please do not use the App.
            </p>
            
            <h4 className="font-medium text-base mt-4 text-banking-blue">2. Account Registration</h4>
            <p className="mb-2 pl-4">
              2.1 To use our services, you must register for an account. You agree to provide accurate and 
              complete information during the registration process.
            </p>
            <p className="mb-2 pl-4">
              2.2 You are responsible for maintaining the confidentiality of your account credentials and for 
              all activities that occur under your account.
            </p>
            
            <h4 className="font-medium text-base mt-4 text-banking-blue">3. Services</h4>
            <p className="mb-2 pl-4">
              3.1 The App provides banking services which may include viewing account balances, transferring funds, 
              making payments, and applying for financial products.
            </p>
            <p className="mb-2 pl-4">
              3.2 We reserve the right to modify, suspend, or discontinue any service at any time without notice.
            </p>
            
            <h4 className="font-medium text-base mt-4 text-banking-blue">4. Privacy</h4>
            <p className="mb-2 pl-4">
              4.1 Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
              your personal information.
            </p>
            <p className="mb-2 pl-4">
              4.2 By using the App, you agree to our collection and use of your information as described in our Privacy Policy.
            </p>
          </div>
        </motion.div>
      );
    } else if (showingSection === 'security') {
      return (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-semibold text-lg">Security Terms</h3>
          
          <p>
            At SuperApp, we implement robust security measures to protect your banking data and transactions.
          </p>
          
          <h4 className="font-medium text-base mt-4">1. Biometric Authentication</h4>
          <p>
            1.1 The App uses biometric authentication methods including facial recognition and fingerprint 
            verification to ensure secure access to your account.
          </p>
          <p>
            1.2 You agree to maintain the security of your biometric data and not allow others to register 
            their biometrics for your account.
          </p>
          
          <h4 className="font-medium text-base mt-4">2. NFC Technology</h4>
          <p>
            2.1 Our App uses Near Field Communication (NFC) technology to securely read data from your 
            identification documents.
          </p>
          <p>
            2.2 You consent to the App accessing your device's NFC capabilities to process your identification 
            information during registration and verification.
          </p>
          
          <h4 className="font-medium text-base mt-4">3. Security Obligations</h4>
          <p>
            3.1 You agree to install updates promptly when available, as they may contain critical security patches.
          </p>
          <p>
            3.2 You must notify us immediately of any unauthorized use of your account or any other security breach.
          </p>
        </motion.div>
      );
    } else if (showingSection === 'compliance') {
      return (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-semibold text-lg">Regulatory Compliance</h3>
          
          <p>
            SuperApp adheres to all applicable banking regulations and compliance requirements.
          </p>
          
          <h4 className="font-medium text-base mt-4">1. Vietnam Civil Code Compliance</h4>
          <p>
            1.1 These Terms form an electronic contract in accordance with the Vietnam Civil Code.
          </p>
          <p>
            1.2 Your acceptance of these Terms constitutes a legally binding agreement between you and SuperApp.
          </p>
          
          <h4 className="font-medium text-base mt-4">2. Consumer Protection</h4>
          <p>
            2.1 You have rights under consumer protection laws, which these Terms do not limit or exclude.
          </p>
          <p>
            2.2 We provide transparent fee structures and service information in compliance with consumer protection regulations.
          </p>
          
          <h4 className="font-medium text-base mt-4">3. State Bank of Vietnam (SBV) Policy</h4>
          <p>
            3.1 Our services comply with all SBV regulations regarding digital banking and financial transactions.
          </p>
          <p>
            3.2 Any updates to SBV policies that affect our services will be communicated to you promptly.
          </p>
        </motion.div>
      );
    }
    
    return null;
  };

  if (showCompletion) {
    return (
      <Layout showBackButton={true}>
        <div className="py-4 flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 bg-banking-green/10 text-banking-green rounded-full mb-6"
              animate={{ 
                boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 20px rgba(34, 197, 94, 0.5)', '0 0 0 rgba(34, 197, 94, 0)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <CheckCircle size={48} />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
            <p className="text-muted-foreground mb-8">Your account has been successfully registered.</p>
            <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
          </motion.div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Terms & Conditions</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md dark:bg-slate-800/95 backdrop-blur-xl border border-white/10">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">Terms of Service</CardTitle>
                <div className="flex items-center space-x-2 text-xs">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full ${language === 'en' ? 'bg-banking-blue text-white' : 'bg-secondary'}`}
                    onClick={() => setLanguage('en')}
                  >
                    English
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full ${language === 'vi' ? 'bg-banking-blue text-white' : 'bg-secondary'}`}
                    onClick={() => setLanguage('vi')}
                  >
                    Tiếng Việt
                  </motion.button>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex border-b">
              {['general', 'security', 'compliance'].map((section) => (
                <motion.button 
                  key={section}
                  className={`flex-1 py-3 text-center text-sm font-medium tracking-wide ${
                    showingSection === section 
                      ? 'text-banking-blue border-b-2 border-banking-blue' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setShowingSection(section)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>
            
            <CardContent className="py-4">
              <div className="h-64 overflow-y-auto pr-2 text-sm glass-scrollbar">
                <AnimatePresence mode="wait">
                  {renderTermsSection()}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-3 mt-6 bg-muted/20 p-4 rounded-lg">
                <motion.div 
                  className={`w-5 h-5 border rounded flex items-center justify-center ${
                    accepted ? 'bg-banking-blue border-banking-blue' : 'border-gray-300'
                  }`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAccepted(!accepted)}
                >
                  {accepted && <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white"
                  >
                    <CheckCircle size={12} />
                  </motion.div>}
                </motion.div>
                <label htmlFor="acceptTerms" className="text-sm font-medium flex items-center cursor-pointer" onClick={() => setAccepted(!accepted)}>
                  I have read and agree to the Terms and Conditions
                  <motion.div 
                    className="ml-1 text-muted-foreground cursor-help"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Info size={14} />
                  </motion.div>
                </label>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 text-center bg-muted/10 p-2 rounded">
                By accepting, you confirm your agreement to version 1.0 of our Terms and Conditions, dated May 18, 2025.
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between space-x-2 border-t border-border/30 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="w-full dark:bg-transparent dark:hover:bg-slate-700/50"
                >
                  Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  className="w-full bg-banking-blue flex items-center justify-center gap-1"
                  onClick={handleAcceptTerms}
                >
                  Accept & Continue
                  <ChevronRight size={16} />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
