
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Fingerprint, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const RegistrationComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, email } = location.state || {};
  
  // Add state for biometric setup
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [touchIdEnabled, setTouchIdEnabled] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [showFaceIdAnimation, setShowFaceIdAnimation] = useState(false);
  const [showTouchIdAnimation, setShowTouchIdAnimation] = useState(false);
  
  // Handle biometric setup with animations
  const handleEnableFaceId = () => {
    if (faceIdEnabled) return;
    
    setShowFaceIdAnimation(true);
    
    // Simulate Face ID setup process
    setTimeout(() => {
      setShowFaceIdAnimation(false);
      setFaceIdEnabled(true);
      toast.success("Face ID successfully enabled!");
    }, 2000);
  };
  
  const handleEnableTouchId = () => {
    if (touchIdEnabled) return;
    
    setShowTouchIdAnimation(true);
    
    // Simulate Touch ID setup process
    setTimeout(() => {
      setShowTouchIdAnimation(false);
      setTouchIdEnabled(true);
      toast.success("Touch ID successfully enabled!");
    }, 2000);
  };
  
  // Complete setup and navigate to home
  const handleCompleteSetup = () => {
    setSetupComplete(true);
    toast.success("Setup complete!");
    
    // Navigate to home with success message
    setTimeout(() => {
      navigate('/', { 
        state: { 
          registrationComplete: true,
          biometricMethod: faceIdEnabled ? 'Face ID' : touchIdEnabled ? 'Touch ID' : null,
          biometricSuccess: faceIdEnabled || touchIdEnabled
        } 
      });
    }, 1000);
  };
  
  // Skip setup and navigate to home
  const handleSkipSetup = () => {
    toast.info("You can enable biometric authentication later in profile settings");
    
    // Navigate to home with success message
    navigate('/', { state: { registrationComplete: true } });
  };

  return (
    <Layout>
      <div className="py-6 px-4 flex flex-col min-h-[80vh]">
        <h1 className="text-2xl font-bold text-center mb-2">Registration Complete</h1>
        
        <div className="flex-1 flex flex-col">
          <div className="my-6 text-center">
            <div className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <CheckCircle size={48} className="text-green-500" />
              </motion.div>
            </div>
            <h2 className="text-xl font-semibold">Success!</h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs mx-auto">
              Your account has been successfully registered with SuperApp
            </p>
            {email && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-flex items-center"
              >
                <Check size={12} className="mr-1 text-blue-600" />
                <span className="text-xs text-blue-700 dark:text-blue-300">Email registered: {email}</span>
              </motion.div>
            )}
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Set Up Biometric Authentication</CardTitle>
              <CardDescription className="text-xs">
                Enable biometric authentication for faster and more secure login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className={`border ${faceIdEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4 flex flex-col items-center">
                    <AnimatePresence>
                      {showFaceIdAnimation ? (
                        <motion.div
                          key="faceIdAnimation"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-32 w-32 bg-blue-50 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <motion.circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#3b82f6" 
                                strokeWidth="3"
                                strokeDasharray="251"
                                initial={{ strokeDashoffset: 251 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 1.5 }}
                              />
                              <motion.path 
                                d="M30,50 L45,65 L70,35" 
                                stroke="#3b82f6"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                              />
                            </svg>
                          </div>
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: [
                                'rgba(59, 130, 246, 0.1)',
                                'rgba(59, 130, 246, 0.3)',
                                'rgba(59, 130, 246, 0.1)'
                              ]
                            }}
                            transition={{ duration: 1, repeat: 2 }}
                          />
                          <motion.div
                            className="absolute h-1 bg-blue-500 w-full top-1/2"
                            initial={{ left: '-100%' }}
                            animate={{ left: '100%' }}
                            transition={{ repeat: 2, duration: 1, repeatType: 'reverse' }}
                          />
                          <motion.div
                            className="absolute text-center bottom-2 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <p className="text-xs text-blue-700">Scanning...</p>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center mb-3">
                          <Fingerprint className="h-5 w-5 text-banking-blue" />
                        </div>
                      )}
                    </AnimatePresence>
                    <h3 className="text-sm font-medium mb-1">Face ID</h3>
                    {faceIdEnabled ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <Check size={12} className="mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs mt-2"
                        onClick={handleEnableFaceId}
                        disabled={showFaceIdAnimation || showTouchIdAnimation}
                      >
                        Enable
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className={`border ${touchIdEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4 flex flex-col items-center">
                    <AnimatePresence>
                      {showTouchIdAnimation ? (
                        <motion.div
                          key="touchIdAnimation"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-32 w-32 bg-blue-50 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
                        >
                          <motion.div
                            className="h-20 w-20 rounded-full border-4 border-blue-400 flex items-center justify-center"
                            animate={{
                              scale: [1, 1.1, 1],
                              borderColor: [
                                'rgba(59, 130, 246, 0.4)',
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(59, 130, 246, 0.4)'
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: 1 }}
                          >
                            <motion.svg 
                              width="40" 
                              height="40" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              animate={{
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{ duration: 1.5, repeat: 1 }}
                            >
                              <path 
                                d="M12,4 C14,4 16,5 16,8 C16,10 15,12 12,12 C9,12 8,10 8,8 C8,5 10,4 12,4 Z" 
                                stroke="#3b82f6"
                                strokeWidth="2"
                                fill="none"
                              />
                              <motion.path 
                                d="M12,12 C16,12 20,14 20,18 L20,20 L4,20 L4,18 C4,14 8,12 12,12 Z" 
                                stroke="#3b82f6"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                              />
                            </motion.svg>
                          </motion.div>
                          <motion.div
                            className="absolute inset-0"
                            initial={{ backdropFilter: "blur(0px)" }}
                            animate={{ 
                              backdropFilter: ["blur(0px)", "blur(5px)", "blur(0px)"],
                              background: [
                                'rgba(59, 130, 246, 0.1)',
                                'rgba(59, 130, 246, 0.2)',
                                'rgba(59, 130, 246, 0.1)'
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: 1 }}
                          />
                          <motion.div
                            className="absolute text-center bottom-2 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <p className="text-xs text-blue-700">Touch registered</p>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center mb-3">
                          <Lock className="h-5 w-5 text-banking-blue" />
                        </div>
                      )}
                    </AnimatePresence>
                    <h3 className="text-sm font-medium mb-1">Touch ID</h3>
                    {touchIdEnabled ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <Check size={12} className="mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs mt-2"
                        onClick={handleEnableTouchId}
                        disabled={showTouchIdAnimation || showFaceIdAnimation}
                      >
                        Enable
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-auto space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleCompleteSetup} 
                className="w-full"
                disabled={setupComplete}
              >
                Complete Setup
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleSkipSetup} 
                variant="outline"
                className="w-full"
                disabled={setupComplete}
              >
                Skip for Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationComplete;
