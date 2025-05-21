
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Fingerprint,
  ShieldCheck,
  Scan,
  X as XIcon,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const BiometricAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, hasBiometric, biometricSuccess: biometricPreset } = 
    location.state || {};
  
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);
  const [scanSuccess, setScanSuccess] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Redirect to home if required data is missing
    if (!phoneNumber) {
      navigate('/');
      toast.error('Missing required data. Please restart the registration process.');
    }
  }, [phoneNumber, navigate]);
  
  const startBiometricScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanSuccess(null);
    
    // Simulate the scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate biometric processing time
    setTimeout(() => {
      setScanCompleted(true);
      clearInterval(interval);
      setScanProgress(100);
      
      // Use the biometricSuccess from route state to determine success/failure
      // This allows the component to be used for both success and failure flows
      const success = biometricPreset !== undefined ? biometricPreset : Math.random() > 0.3;
      setScanSuccess(success);
      
      if (success) {
        toast.success("Biometric verification successful");
        // For successful verification (Case 4), wait briefly then proceed to detailed registration
        setTimeout(() => {
          navigate('/detailed-registration', { 
            state: { 
              phoneNumber, 
              nationalId,
              isExistingCustomer,
              hasValidBiometric: true
            } 
          });
        }, 1500);
      } else {
        toast.error("Biometric verification failed");
        // For failed verification (Case 3), wait briefly then go to verification failure screen
        setTimeout(() => {
          navigate('/verification-failure', {
            state: {
              phoneNumber,
              nationalId
            }
          });
        }, 1500);
      }
    }, 3000);
  };

  const cancelScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    setScanCompleted(false);
    setScanSuccess(null);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            disabled={isScanning}
            className="gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Biometric Verification</h1>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Facial Recognition</CardTitle>
            <CardDescription className="text-center">
              Verify your identity using facial biometrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!isScanning ? (
                <motion.div
                  key="start-scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-6"
                >
                  <div className="mb-6 h-32 w-32 bg-muted/30 rounded-full flex items-center justify-center">
                    <Scan className="h-16 w-16 text-muted-foreground" />
                  </div>
                  
                  <p className="text-center mb-8 text-sm text-muted-foreground max-w-xs">
                    Please make sure you're in a well-lit area and position your face within the frame
                  </p>
                  
                  <Button 
                    className="w-full bg-banking-blue hover:bg-banking-darkBlue"
                    onClick={startBiometricScan}
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Start Face Verification
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-6"
                >
                  <div className="relative mb-8">
                    <div className="h-48 w-48 relative bg-muted/30 rounded-full flex items-center justify-center overflow-hidden">
                      {scanCompleted ? (
                        scanSuccess ? (
                          <CheckCircle className="h-24 w-24 text-banking-green" />
                        ) : (
                          <AlertCircle className="h-24 w-24 text-banking-red" />
                        )
                      ) : (
                        <>
                          <Scan className="h-16 w-16 text-muted-foreground z-10" />
                          <div className="absolute inset-0">
                            <motion.div 
                              className="absolute bottom-0 w-full bg-blue-400/30"
                              initial={{ height: '0%' }}
                              animate={{ height: `${scanProgress}%` }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                          <motion.div
                            className="absolute inset-0 border-4 border-transparent border-t-banking-blue rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </>
                      )}
                    </div>
                    
                    {!scanCompleted && (
                      <div className="mt-4 text-center">
                        <p className="mb-1 font-medium">Scanning in progress...</p>
                        <p className="text-sm text-muted-foreground">Please hold still</p>
                      </div>
                    )}
                    
                    {scanCompleted && (
                      <div className="mt-4 text-center">
                        <p className="mb-1 font-medium">
                          {scanSuccess ? "Verification successful!" : "Verification failed"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {scanSuccess ? "Redirecting to registration details..." : "You will be redirected..."}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {!scanCompleted && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={cancelScan}
                    >
                      <XIcon className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BiometricAuth;
