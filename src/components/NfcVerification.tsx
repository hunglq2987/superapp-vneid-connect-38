
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, CreditCard, Fingerprint, Camera, Check, X, ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stepper, StepperItem } from './ui/stepper';
import { toast } from 'sonner';

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captureMode, setCaptureMode] = useState<'front' | 'nfc' | 'selfie' | null>(null);
  const [verificationResult, setVerificationResult] = useState<'success' | 'fail' | null>(null);
  const totalSteps = 5;
  
  useEffect(() => {
    if (captureMode === 'nfc') {
      // Simulate NFC reading process
      setIsProcessing(true);
      const timer = setTimeout(() => {
        setIsProcessing(false);
        setCaptureMode(null);
        // Move to next step after NFC reading
        if (currentStep === 3) {
          setCurrentStep(4);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [captureMode, currentStep]);
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete verification and navigate to OTP verification screen
      navigate('/otp-verification', { 
        state: { 
          phoneNumber, 
          nationalId,
          isExistingCustomer,
          isNewNationalId,
          hasBiometric,
          fromNfc: true
        } 
      });
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };
  
  const startCapture = (mode: 'front' | 'nfc' | 'selfie') => {
    setCaptureMode(mode);
    // Simulate camera/nfc capture process
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCaptureMode(null);
      
      // For biometric verification in step 4, we'll simulate success/fail
      if (mode === 'selfie' && currentStep === 4) {
        // 90% chance of success for demo purposes
        const isSuccess = Math.random() < 0.9;
        setVerificationResult(isSuccess ? 'success' : 'fail');
        
        // If success, proceed to final step after a delay
        if (isSuccess) {
          setTimeout(() => {
            setVerificationResult(null);
            setCurrentStep(5); // Move to completion step
          }, 1500);
        }
      } else if (mode === 'front') {
        // Automatically proceed to step 3 after capturing front
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);
      }
    }, 2000);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                className="w-20 h-20 bg-banking-blue/10 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Smartphone className="h-10 w-10 text-banking-blue" />
              </motion.div>
            </div>
            <h3 className="text-xl font-medium">Initiate NFC Verification</h3>
            <p className="text-muted-foreground">To verify your identity using your ID card, we'll use NFC technology to securely read your information.</p>
            <div className="space-y-3 text-sm text-left text-muted-foreground">
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Ensure your phone supports NFC technology
              </motion.p>
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Keep your ID card ready for scanning
              </motion.p>
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Enable NFC on your device before proceeding
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue" onClick={handleNextStep}>
                Start Verification
              </Button>
            </motion.div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                className="w-20 h-20 bg-banking-blue/10 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Camera className="h-10 w-10 text-banking-blue" />
              </motion.div>
            </div>
            <h3 className="text-xl font-medium">Capture ID Card</h3>
            <p className="text-muted-foreground">Take a photo of the front side of your ID card.</p>
            <div className="space-y-3 text-sm text-left text-muted-foreground">
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Ensure all four corners are visible
              </motion.p>
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Avoid glare or shadows on the card
              </motion.p>
              <motion.p 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                Place card on a dark, non-reflective surface
              </motion.p>
            </div>
            
            {captureMode === 'front' ? (
              <div className="relative h-40 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    y: [-10, 10],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                  }}
                  className="absolute w-full h-1 bg-banking-blue"
                />
                <p className="text-white text-sm">Scanning ID card...</p>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue" 
                  onClick={() => startCapture('front')}
                >
                  Capture Image
                </Button>
              </motion.div>
            )}
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                className="w-20 h-20 bg-banking-blue/10 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <CreditCard className="h-10 w-10 text-banking-blue" />
              </motion.div>
            </div>
            <h3 className="text-xl font-medium">NFC Communication</h3>
            <p className="text-muted-foreground">Place your ID card against the back of your phone to read the embedded chip.</p>
            
            {captureMode === 'nfc' ? (
              <div className="relative bg-black/5 p-6 rounded-lg">
                <motion.div 
                  className="flex flex-col items-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Smartphone className="h-16 w-16 text-banking-grey mb-2" />
                  <motion.div 
                    className="h-1 w-20 bg-banking-blue rounded-full"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <CreditCard className="h-12 w-12 text-banking-blue my-2" />
                </motion.div>
                <p className="text-sm text-muted-foreground mt-4">Reading data from chip...</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-banking-blue h-2.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3 text-sm text-left text-muted-foreground">
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Position your ID card against the NFC reader on your phone
                  </motion.p>
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Hold still until the reading is complete
                  </motion.p>
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Do not move your phone during the process
                  </motion.p>
                </div>
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue" 
                      onClick={() => startCapture('nfc')}
                    >
                      Start NFC Reading
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline"
                      onClick={handleNextStep}
                      className="px-4"
                    >
                      Skip for Demo
                    </Button>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                className="w-20 h-20 bg-banking-blue/10 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Fingerprint className="h-10 w-10 text-banking-blue" />
              </motion.div>
            </div>
            <h3 className="text-xl font-medium">Biometric Verification</h3>
            <p className="text-muted-foreground">Take a selfie to compare with your ID photo.</p>
            
            {verificationResult ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-6 rounded-lg ${verificationResult === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <div className="flex justify-center mb-4">
                  {verificationResult === 'success' ? (
                    <motion.div 
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                      animate={{ 
                        boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 15px rgba(34, 197, 94, 0.5)', '0 0 0 rgba(34, 197, 94, 0)']
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Check className="h-8 w-8 text-banking-green" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
                      animate={{ 
                        boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 15px rgba(239, 68, 68, 0.5)', '0 0 0 rgba(239, 68, 68, 0)']
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <X className="h-8 w-8 text-banking-red" />
                    </motion.div>
                  )}
                </div>
                
                <h4 className="text-lg font-medium">
                  {verificationResult === 'success' ? 'Verification Successful' : 'Verification Failed'}
                </h4>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {verificationResult === 'success' 
                    ? 'Your selfie matched with your ID photo.' 
                    : 'Your selfie did not match with your ID photo. Please try again.'}
                </p>
                
                {verificationResult === 'fail' && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue" 
                      onClick={() => {
                        setVerificationResult(null);
                        setCaptureMode(null);
                      }}
                    >
                      Try Again
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : captureMode === 'selfie' ? (
              <div className="relative h-40 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                    borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(59, 130, 246, 1)", "rgba(59, 130, 246, 0.5)"]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                  }}
                  className="absolute w-32 h-32 rounded-full border-2 border-banking-blue"
                />
                <p className="text-white text-sm">Capturing selfie...</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 text-sm text-left text-muted-foreground">
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Ensure good lighting for clear capture
                  </motion.p>
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Center your face in the frame
                  </motion.p>
                  <motion.p 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Check className="h-4 w-4 text-banking-green shrink-0 mt-1" />
                    Remove glasses or accessories that cover your face
                  </motion.p>
                </div>
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue" 
                      onClick={() => startCapture('selfie')}
                    >
                      Take Selfie
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline"
                      onClick={handleNextStep}
                      className="px-4"
                    >
                      Skip for Demo
                    </Button>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 mx-auto bg-banking-green/10 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 15px rgba(34, 197, 94, 0.5)', '0 0 0 rgba(34, 197, 94, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Check className="h-10 w-10 text-banking-green" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-medium">Verification Complete</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm">Your identity has been successfully verified using your ID card and biometrics.</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Verification Details:</p>
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">Nguyen Van A</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">ID Type</span>
                  <span className="font-medium">National ID</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Verification Method</span>
                  <span className="font-medium">NFC + Biometric</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-banking-green font-medium">Verified</span>
                </div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue"
                onClick={() => navigate('/', { state: { nfcSuccess: true } })}
              >
                Complete
              </Button>
            </motion.div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };
  
  const processScanResult = () => {
    // Show success message
    toast.success("NFC Verification completed successfully!");
    
    // Navigate to OTP verification after NFC scan
    navigate('/otp-verification', { 
      state: { 
        phoneNumber, 
        nationalId,
        isExistingCustomer,
        isNewNationalId,
        hasBiometric,
        fromNfc: true
      } 
    });
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6 text-center">NFC ID Verification</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
            <CardHeader className="pb-0">
              <Stepper value={currentStep} className="mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <StepperItem key={i} />
                ))}
              </Stepper>
              <CardTitle className="text-lg text-center mt-3">
                Step {currentStep} of {totalSteps}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NfcVerification;
