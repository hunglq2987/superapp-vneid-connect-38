
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { User, ArrowRight, Fingerprint, ChevronsRight, HelpCircle, BookOpen, Info, CheckCircle, XCircle, Scan } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAccountQuestion, setShowAccountQuestion] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    setShowAccountQuestion(true);
  };

  const handleNfcVerification = () => {
    navigate('/nfc-verification');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    if (!/^\d{12}$/.test(nationalId)) {
      setError('Please enter a valid 12-digit National ID');
      return;
    }

    setError('');
    navigate('/profile-management', { state: { nationalId }});
    setShowLoginModal(false);
  };
  
  const handleCloseModal = () => {
    setShowLoginModal(false);
    setNationalId('');
    setError('');
  };

  const handleCloseAccountQuestion = () => {
    setShowAccountQuestion(false);
  };
  
  const handleHasAccount = () => {
    setShowAccountQuestion(false);
    navigate('/registration');
  };
  
  const handleNoAccount = () => {
    setShowAccountQuestion(false);
    // Navigate to a different flow for non-account holders
    navigate('/registration', { state: { hasAccount: false } });
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
    <Layout footer={true}>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[80vh] space-y-10"
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
              className="w-full shadow-lg bg-gradient-to-r from-banking-blue to-banking-darkBlue"
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
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-3 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              className="w-full shadow-lg bg-gradient-to-r from-banking-lightGrey to-muted"
              variant="secondary" 
              size="lg" 
              onClick={handleNfcVerification}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-banking-blue" />
                  NFC Verification
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="text-sm text-muted-foreground text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Already have an account? <button className="text-banking-blue font-medium hover:underline" onClick={handleLoginClick}>Sign In</button></p>
        </motion.div>
      </motion.div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="w-full max-w-md shadow-lg">
              <CardContent className="pt-6 pb-4">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <p className="text-muted-foreground">Enter your National ID to continue</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nationalId" className="text-sm font-medium">National ID</label>
                    <input
                      id="nationalId"
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="Enter your 12-digit ID"
                      className="input-field"
                      maxLength={12}
                    />
                    {error && <p className="text-banking-red text-sm">{error}</p>}
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        onClick={handleLogin} 
                        className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:opacity-90 transition-opacity"
                      >
                        Login
                      </Button>
                    </motion.div>
                    <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
      
      <Dialog open={showAccountQuestion} onOpenChange={handleCloseAccountQuestion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Do you have a bank account at NCB?</DialogTitle>
            <DialogDescription>
              Please select one of the options below to continue with the appropriate registration process.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleHasAccount}
                className="flex justify-between items-center p-4 h-auto text-left w-full bg-gradient-to-r from-white to-banking-lightGrey border-banking-blue/20 hover:border-banking-blue"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-banking-green/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-banking-green" />
                  </div>
                  <div>
                    <p className="font-medium">Already have accounts</p>
                    <p className="text-sm text-muted-foreground">Continue with existing account</p>
                  </div>
                </div>
                <ChevronsRight className="h-5 w-5 text-banking-blue" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleNoAccount}
                className="flex justify-between items-center p-4 h-auto text-left w-full bg-gradient-to-r from-white to-banking-lightGrey border-banking-blue/20 hover:border-banking-blue"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-banking-red/10 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-banking-red" />
                  </div>
                  <div>
                    <p className="font-medium">Do not have an account</p>
                    <p className="text-sm text-muted-foreground">Create a new banking relationship</p>
                  </div>
                </div>
                <ChevronsRight className="h-5 w-5 text-banking-blue" />
              </Button>
            </motion.div>
          </div>
          
          <DialogFooter className="flex items-center justify-center">
            <Button variant="ghost" onClick={handleCloseAccountQuestion}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default HomeScreen;
