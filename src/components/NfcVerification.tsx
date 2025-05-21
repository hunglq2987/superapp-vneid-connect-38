
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  CheckCircle,
  CreditCard,
  HelpCircle,
  Phone,
  Smartphone,
  Wifi,
  X,
  User,
  Fingerprint,
} from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface NfcVerificationProps {
  phoneNumber?: string;
  nationalId?: string;
  isExistingCustomer?: boolean;
  isNewNationalId?: boolean;
  hasBiometric?: boolean;
  fromVNeID?: boolean;
}

// Define steps for the NFC verification process
enum VerificationStep {
  PREPARE = 0,
  CAPTURE_ID = 1,
  SCAN_NFC = 2,
  VERIFY_DATA = 3,
  TAKE_SELFIE = 4,
  COMPARE_BIOMETRIC = 5,
  COMPLETE = 6
}

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, fromVNeID } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState<VerificationStep>(VerificationStep.PREPARE);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to verify your ID');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [cardReadSuccess, setCardReadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect to home if required data is missing
    if (!phoneNumber) {
      navigate('/');
      toast.error('Missing required data. Please restart the registration process.');
    }
  }, [phoneNumber, navigate]);

  const handleBack = () => {
    if (isScanning) {
      // If in scanning process, just cancel the scan
      handleCancelScan();
    } else {
      navigate(-1);
    }
  };

  const handleCancelScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    setStatusMessage('Scan cancelled');
    setCurrentStep(VerificationStep.PREPARE);
    setError(null);
  };

  const startVerificationProcess = () => {
    setIsScanning(true);
    setCurrentStep(VerificationStep.PREPARE);
    setStatusMessage('Preparing for ID verification...');
    
    // Move to ID capture step after a delay
    setTimeout(() => {
      setCurrentStep(VerificationStep.CAPTURE_ID);
      setStatusMessage('Please capture the front of your ID card');
    }, 1500);
  };

  const simulateIdCapture = () => {
    setStatusMessage('Processing ID image...');
    setScanProgress(20);
    
    // Simulate ID capture processing
    setTimeout(() => {
      setIdImage('/placeholder.svg'); // Placeholder for captured ID
      setCurrentStep(VerificationStep.SCAN_NFC);
      setStatusMessage('Now place your ID card near the back of your phone');
      setScanProgress(30);
    }, 2000);
  };
  
  const simulateNfcScan = () => {
    setStatusMessage('Scanning NFC chip. Please hold your phone near your ID card...');
    setScanProgress(40);
    
    // Simulate detecting NFC chip
    setTimeout(() => {
      setStatusMessage('ID card detected. Reading data...');
      setScanProgress(50);
      
      // Simulate reading data
      setTimeout(() => {
        setStatusMessage('Reading personal information and biometric data...');
        setScanProgress(60);
        setCurrentStep(VerificationStep.VERIFY_DATA);
        
        // Simulate verification
        setTimeout(() => {
          setStatusMessage('Verifying data with database...');
          setScanProgress(70);
          
          // Move to selfie capture stage
          setTimeout(() => {
            setCurrentStep(VerificationStep.TAKE_SELFIE);
            setStatusMessage('Please take a selfie for biometric verification');
            setScanProgress(80);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const simulateSelfieCapture = () => {
    setStatusMessage('Processing selfie...');
    
    // Simulate selfie processing
    setTimeout(() => {
      setSelfieImage('/placeholder.svg'); // Placeholder for captured selfie
      setCurrentStep(VerificationStep.COMPARE_BIOMETRIC);
      setStatusMessage('Comparing your face with the ID photo...');
      setScanProgress(90);
      
      // Simulate biometric comparison
      setTimeout(() => {
        setStatusMessage('Biometric verification successful!');
        setCurrentStep(VerificationStep.COMPLETE);
        setScanProgress(100);
        setCardReadSuccess(true);
        
        // Navigate after successful verification
        setTimeout(() => {
          handleVerificationSuccess();
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const handleVerificationSuccess = () => {
    setIsScanning(false);
    
    // Show success message
    toast.success("NFC Verification completed successfully!");
    
    // Navigate to detailed registration after NFC scan
    navigate('/detailed-registration', { 
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

  const renderStepContent = () => {
    switch (currentStep) {
      case VerificationStep.PREPARE:
        return (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 bg-muted/50 h-32 w-32 rounded-full flex items-center justify-center">
              <CreditCard size={64} className="text-muted-foreground" />
            </div>
            
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Place your ID card near the back of your device to read its chip
            </p>
            
            <Button 
              className="w-full"
              onClick={startVerificationProcess}
            >
              <Wifi className="mr-2 h-5 w-5" />
              Start NFC Verification
            </Button>
          </div>
        );
        
      case VerificationStep.CAPTURE_ID:
        return (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 bg-muted/50 h-32 w-32 rounded-full flex items-center justify-center">
              <Camera size={48} className="text-muted-foreground" />
            </div>
            
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Take a photo of the front side of your ID card
            </p>
            
            <Button 
              className="w-full"
              onClick={simulateIdCapture}
            >
              <Camera className="mr-2 h-5 w-5" />
              Capture ID
            </Button>
          </div>
        );
        
      case VerificationStep.SCAN_NFC:
        return (
          <div className="flex flex-col items-center py-6">
            {idImage && (
              <div className="mb-4 relative">
                <div className="h-40 w-64 bg-muted/30 rounded-md overflow-hidden flex items-center justify-center mb-2">
                  <img src={idImage} alt="ID Card" className="h-24 w-24 opacity-50" />
                </div>
                <p className="text-xs text-center text-muted-foreground">ID captured</p>
              </div>
            )}
            
            <div className="mb-6 bg-blue-100 dark:bg-blue-900/20 h-32 w-32 rounded-full flex items-center justify-center relative overflow-hidden">
              <CreditCard size={48} className="text-blue-600 dark:text-blue-400 z-10" />
              <motion.div
                className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Hold your ID card against the back of your phone
            </p>
            
            <Button 
              className="w-full"
              onClick={simulateNfcScan}
            >
              <Wifi className="mr-2 h-5 w-5" />
              Start NFC Scan
            </Button>
          </div>
        );
        
      case VerificationStep.VERIFY_DATA:
        return (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 relative">
              <div className="h-32 w-32 rounded-full flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-full h-full absolute"
                  animate={{
                    background: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <CheckCircle size={48} className="text-blue-600 dark:text-blue-400 z-10" />
              </div>
            </div>
            
            <p className="text-center mb-2 font-medium">Verifying ID data</p>
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Please wait while we verify your information
            </p>
            
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-blue-500"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center mb-4">
              {['Personal Info', 'Digital Signature', 'Security Features'].map((item, index) => (
                <div 
                  key={index}
                  className="px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground flex items-center"
                >
                  <CheckCircle size={12} className="mr-1 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
        
      case VerificationStep.TAKE_SELFIE:
        return (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 bg-muted/50 h-32 w-32 rounded-full flex items-center justify-center">
              <User size={48} className="text-muted-foreground" />
            </div>
            
            <p className="text-center mb-2 font-medium">Biometric Verification</p>
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Take a selfie for facial comparison with your ID
            </p>
            
            <Button 
              className="w-full"
              onClick={simulateSelfieCapture}
            >
              <Camera className="mr-2 h-5 w-5" />
              Take Selfie
            </Button>
          </div>
        );
        
      case VerificationStep.COMPARE_BIOMETRIC:
        return (
          <div className="flex flex-col items-center py-6">
            {selfieImage && (
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-24 w-24 bg-muted/30 rounded-full overflow-hidden flex items-center justify-center mb-2">
                      <img src={idImage || '/placeholder.svg'} alt="ID Card" className="h-16 w-16 opacity-50" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">ID Photo</p>
                  </div>
                  <div>
                    <div className="h-24 w-24 bg-muted/30 rounded-full overflow-hidden flex items-center justify-center mb-2">
                      <img src={selfieImage} alt="Selfie" className="h-16 w-16 opacity-50" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">Your Selfie</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-6 relative">
              <div className="h-32 w-32 rounded-full flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-full h-full absolute"
                  animate={{
                    background: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Fingerprint size={48} className="text-blue-600 dark:text-blue-400 z-10" />
              </div>
            </div>
            
            <p className="text-center mb-2 font-medium">Comparing biometric data</p>
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Please wait while we verify your identity
            </p>
            
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-blue-500"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        );
        
      case VerificationStep.COMPLETE:
        return (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 bg-green-100 dark:bg-green-900/20 h-32 w-32 rounded-full flex items-center justify-center">
              <CheckCircle size={64} className="text-green-600 dark:text-green-400" />
            </div>
            
            <p className="text-center mb-2 font-medium text-xl">Verification Complete!</p>
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Your identity has been successfully verified
            </p>
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleVerificationSuccess}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Continue
            </Button>
          </div>
        );
    }
  };

  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={isScanning && currentStep > VerificationStep.PREPARE && currentStep < VerificationStep.COMPLETE}
          className="mb-4 flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4 text-center">ID Verification</h1>
        
        <Card className="shadow-md mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>NFC Verification</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8" onClick={() => setShowTips(!showTips)}>
                      <HelpCircle size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn how NFC verification works</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Verify your identity using your ID card's NFC chip</CardDescription>
            
            {/* Step indicators */}
            <div className="mt-3">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 ${i === currentStep ? 'w-6 bg-blue-500' : 'w-3 bg-muted'} rounded-full transition-all duration-300`}
                  />
                ))}
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Step {currentStep + 1} of 7: {
                  ['Prepare', 'Capture ID', 'Scan NFC', 'Verify Data', 'Take Selfie', 'Compare Biometric', 'Complete'][currentStep]
                }
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
            
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-4 border-t"
                >
                  <h3 className="font-medium mb-2 text-sm">Tips for successful scanning:</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start">
                      <Phone className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Remove your phone case if you have trouble scanning</span>
                    </li>
                    <li className="flex items-start">
                      <Smartphone className="mr-2 h-4 w-4 mt-0.5" />
                      <span>The NFC reader is typically located at the upper back of your device</span>
                    </li>
                    <li className="flex items-start">
                      <CreditCard className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Place the ID card flat against your device</span>
                    </li>
                    <li className="flex items-start">
                      <Wifi className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Hold still until the scan is complete</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NfcVerification;
