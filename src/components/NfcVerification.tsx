
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

// Define steps for the NFC verification process - 6 steps
enum VerificationStep {
  INITIATE = 0,         // Step 1: Initiate verification
  CAPTURE_ID = 1,       // Step 2: Capture front of ID
  NFC_SCAN = 2,         // Step 3: NFC communication
  DATA_VERIFICATION = 3, // Step 4: Data verification
  BIOMETRIC_COMPARISON = 4, // Step 5: Biometric comparison
  COMPLETE = 5          // Step 6: Complete verification
}

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, fromVNeID } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState<VerificationStep>(VerificationStep.INITIATE);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to verify your ID');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [cardReadSuccess, setCardReadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [showPulse, setShowPulse] = useState<boolean>(false);
  
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
    setCurrentStep(VerificationStep.INITIATE);
    setError(null);
  };

  // Step 1: Initiate verification - much faster loading time (500ms)
  const startVerificationProcess = () => {
    setIsScanning(true);
    setCurrentStep(VerificationStep.INITIATE);
    setStatusMessage('Preparing for ID verification...');
    setScanProgress(10);
    
    // Much faster transition to next step (500ms)
    setTimeout(() => {
      setCurrentStep(VerificationStep.CAPTURE_ID);
      setStatusMessage('Please capture the front of your ID card');
      setScanProgress(20);
    }, 500); 
  };

  // Step 2: Capture front of ID - faster loading time (800ms)
  const simulateIdCapture = () => {
    setShowPulse(true);
    setStatusMessage('Processing ID image...');
    setScanProgress(30);
    
    // Simulate camera flash effect
    setTimeout(() => {
      setShowPulse(false);
      setIdImage('/placeholder.svg'); // Placeholder for captured ID
      
      // Simulate extracted data
      setExtractedData({
        idNumber: nationalId || "123456789012",
        name: "Nguyen Van A",
        dob: "01/01/1990",
        issueDate: "01/01/2021"
      });
      
      setCurrentStep(VerificationStep.NFC_SCAN);
      setStatusMessage('Now place your ID card near the back of your phone');
      setScanProgress(40);
    }, 800);
  };
  
  // Step 3: NFC communication - faster loading times
  const simulateNfcScan = () => {
    setStatusMessage('Scanning NFC chip. Please hold your phone near your ID card...');
    setScanProgress(50);
    
    // Simulate detecting NFC chip even faster
    setTimeout(() => {
      setStatusMessage('ID card detected. Reading data from chip...');
      
      // Simulate reading data faster
      setTimeout(() => {
        setStatusMessage('Retrieving biometric data and personal information...');
        setScanProgress(60);
        setCurrentStep(VerificationStep.DATA_VERIFICATION);
        
        // Move to data verification faster (800ms)
        setTimeout(() => {
          setStatusMessage('Cross-checking chip information with declared data...');
          setScanProgress(70);
          
          // Move to biometric comparison stage faster (600ms)
          setTimeout(() => {
            setCurrentStep(VerificationStep.BIOMETRIC_COMPARISON);
            setStatusMessage('Please take a selfie for biometric verification');
          }, 600);
        }, 800);
      }, 800);
    }, 700);
  };

  // Step 5: Biometric comparison - even faster loading time (800ms)
  const simulateSelfieCapture = () => {
    setShowPulse(true);
    setStatusMessage('Processing selfie for facial comparison...');
    setScanProgress(80);
    
    // Simulate selfie capture with camera flash effect
    setTimeout(() => {
      setShowPulse(false);
      setSelfieImage('/placeholder.svg'); // Placeholder for captured selfie
      setStatusMessage('Comparing your face with the ID photo using AI...');
      setScanProgress(90);
      
      // Simulate biometric comparison faster (800ms)
      setTimeout(() => {
        setStatusMessage('Biometric verification successful!');
        setCurrentStep(VerificationStep.COMPLETE);
        setScanProgress(100);
        setCardReadSuccess(true);
        
        // Move to completion after a shorter delay (800ms)
        setTimeout(() => {
          handleVerificationSuccess();
        }, 800);
      }, 800);
    }, 800);
  };

  // Step 6: Complete verification
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
      case VerificationStep.INITIATE:
        return (
          <div className="flex flex-col items-center py-6">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 bg-blue-50 dark:bg-blue-900/20 h-32 w-32 rounded-full flex items-center justify-center"
            >
              <CreditCard size={64} className="text-blue-500" />
            </motion.div>
            
            <h3 className="text-lg font-medium mb-2">Step 1: Initiate Verification</h3>
            
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Please prepare your ID card and ensure NFC is enabled on your device
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={startVerificationProcess}
              >
                <Wifi className="mr-2 h-5 w-5" />
                Start NFC Verification
              </Button>
            </motion.div>
          </div>
        );
        
      case VerificationStep.CAPTURE_ID:
        return (
          <div className="flex flex-col items-center py-6">
            <motion.div 
              className="mb-6 relative"
              animate={showPulse ? { 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 0 0 rgba(59, 130, 246, 0)'
                ]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="h-32 w-32 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Camera size={48} className="text-blue-500" />
              </div>
            </motion.div>
            
            <h3 className="text-lg font-medium mb-2">Step 2: Capture ID Front</h3>
            
            <p className="text-center mb-4 text-sm text-muted-foreground">
              Take a photo of the front side of your ID card to extract:
            </p>
            
            <ul className="text-sm text-muted-foreground mb-6 space-y-1">
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                12-digit ID number
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Name, date of birth
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Issue date
              </li>
            </ul>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={simulateIdCapture}
              >
                <Camera className="mr-2 h-5 w-5" />
                Capture ID
              </Button>
            </motion.div>
          </div>
        );
        
      case VerificationStep.NFC_SCAN:
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
            
            <h3 className="text-lg font-medium mb-2">Step 3: NFC Communication</h3>
            
            <div className="mb-4 bg-blue-100 dark:bg-blue-900/20 h-32 w-32 rounded-full flex items-center justify-center relative overflow-hidden">
              <CreditCard size={48} className="text-blue-600 dark:text-blue-400 z-10" />
              <motion.div
                className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            
            <p className="text-center mb-4 text-sm text-muted-foreground">
              Hold your ID card against the back of your phone. The app will retrieve:
            </p>
            
            <ul className="text-sm text-muted-foreground mb-6 space-y-1">
              <li className="flex items-center">
                <Fingerprint size={16} className="mr-2 text-blue-500" />
                Biometric data (photo, fingerprint)
              </li>
              <li className="flex items-center">
                <User size={16} className="mr-2 text-blue-500" />
                Personal information
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-blue-500" />
                Digital signature and validation
              </li>
            </ul>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={simulateNfcScan}
              >
                <Wifi className="mr-2 h-5 w-5" />
                Start NFC Scan
              </Button>
            </motion.div>
          </div>
        );
        
      case VerificationStep.DATA_VERIFICATION:
        return (
          <div className="flex flex-col items-center py-6">
            <h3 className="text-lg font-medium mb-2">Step 4: Data Verification</h3>
            
            <motion.div 
              className="mb-6 relative"
              animate={{
                rotateY: [0, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="h-32 w-32 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <CheckCircle size={48} className="text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>
            
            <p className="text-center mb-4 text-sm text-muted-foreground">
              Cross-checking chip information with declared data
            </p>
            
            {extractedData && (
              <div className="w-full mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Extracted Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Number:</span>
                    <span className="font-medium">{extractedData.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{extractedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Birth:</span>
                    <span className="font-medium">{extractedData.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issue Date:</span>
                    <span className="font-medium">{extractedData.issueDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-blue-500"
                style={{ width: `${scanProgress}%` }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center mb-4">
              {['Personal Info', 'Digital Signature', 'Security Features'].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full text-xs text-green-700 dark:text-green-400 flex items-center"
                >
                  <CheckCircle size={12} className="mr-1 text-green-500" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case VerificationStep.BIOMETRIC_COMPARISON:
        return (
          <div className="flex flex-col items-center py-6">
            <h3 className="text-lg font-medium mb-2">Step 5: Biometric Comparison</h3>
            
            <motion.div 
              className="mb-6 relative"
              animate={showPulse ? { 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 0 0 rgba(59, 130, 246, 0)'
                ]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="h-32 w-32 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <User size={48} className="text-blue-500" />
              </div>
            </motion.div>
            
            <p className="text-center mb-4 text-sm text-muted-foreground">
              Take a selfie for facial comparison with your ID photo using AI/ML
            </p>
            
            <p className="text-center mb-6 text-xs text-blue-600 dark:text-blue-400">
              Your face will be compared with the photo stored in your ID's chip
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={simulateSelfieCapture}
              >
                <Camera className="mr-2 h-5 w-5" />
                Take Selfie
              </Button>
            </motion.div>
          </div>
        );
        
      case VerificationStep.COMPLETE:
        return (
          <div className="flex flex-col items-center py-6">
            <h3 className="text-lg font-medium mb-2">Step 6: Complete Verification</h3>
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 bg-green-100 dark:bg-green-900/20 h-32 w-32 rounded-full flex items-center justify-center"
            >
              <CheckCircle size={64} className="text-green-600 dark:text-green-400" />
            </motion.div>
            
            <p className="text-center mb-2 font-medium text-xl">Verification Complete!</p>
            <p className="text-center mb-6 text-sm text-muted-foreground">
              Your identity has been successfully verified. Session saved.
            </p>
            
            <div className="w-full p-4 mb-4 rounded-lg bg-green-50 dark:bg-green-900/10">
              <h4 className="text-sm font-medium mb-2">What's Next?</h4>
              <ul className="text-xs space-y-1.5">
                <li className="flex items-center">
                  <CheckCircle size={14} className="mr-2 text-green-500" />
                  Account opening access granted
                </li>
                <li className="flex items-center">
                  <CheckCircle size={14} className="mr-2 text-green-500" />
                  Profile submission enabled
                </li>
              </ul>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleVerificationSuccess}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Continue
              </Button>
            </motion.div>
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
          disabled={isScanning && currentStep > VerificationStep.INITIATE && currentStep < VerificationStep.COMPLETE}
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
            
            {/* Step indicators - with smoother transition */}
            <div className="mt-3">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${i === currentStep ? 'bg-blue-500' : i < currentStep ? 'bg-green-500' : 'bg-muted'}`}
                    initial={{ width: i === currentStep ? 3 : 12 }}
                    animate={{ 
                      width: i === currentStep ? 24 : 12,
                      backgroundColor: i === currentStep ? '#3b82f6' : i < currentStep ? '#22c55e' : '#e5e7eb' 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <motion.p 
                key={currentStep} // Force animation on step change
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-center mt-2 text-muted-foreground"
              >
                Step {currentStep + 1} of 6: {
                  ['Initiate Verification', 'Capture ID Front', 'NFC Communication', 'Data Verification', 'Biometric Comparison', 'Complete Verification'][currentStep]
                }
              </motion.p>
            </div>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
