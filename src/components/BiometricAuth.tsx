
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, UserCheck, Fingerprint } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const BiometricAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const { 
    phoneNumber, 
    nationalId, 
    isExistingCustomer, 
    hasBiometric, 
    biometricSuccess, 
    isLogin,
    authMethod = 'face',
    fromVNeID 
  } = location.state || {};
  
  const isTouchId = authMethod === 'touch';
  
  useEffect(() => {
    // Don't auto-start scanning, wait for user to press button
  }, []);
  
  const handleStartScan = () => {
    setScanning(true);
    
    // Simulate face/touch scanning process (3 seconds)
    setTimeout(() => {
      setScanComplete(true);
      setScanning(false);
      
      // Process scan result after a short delay
      setTimeout(() => {
        processBiometricResult();
      }, 1000);
    }, 3000);
  };
  
  const processBiometricResult = () => {
    // For case 3: biometric verification fails
    if (phoneNumber === '0323456789' || biometricSuccess === false) {
      toast.error(`${isTouchId ? 'Fingerprint' : 'Facial'} verification failed`, {
        duration: 4000,
      });
      
      // Navigate to verification failure screen
      setTimeout(() => {
        navigate('/verification-failure', {
          state: { authMethod }
        });
      }, 1500);
      return;
    }
    
    // For login flow
    if (isLogin) {
      toast.success(`${isTouchId ? 'Touch ID' : 'Face ID'} authentication successful!`);
      
      // Navigate to profile management
      setTimeout(() => {
        navigate('/profile-management', { 
          state: { 
            nationalId: '777777777777', // Default login ID
            fromLogin: true 
          } 
        });
      }, 1500);
      return;
    }
    
    // For case 4: biometric verification succeeds
    if (phoneNumber === '0423456789' || biometricSuccess === true) {
      toast.success(`${isTouchId ? 'Touch ID' : 'Face ID'} authentication successful!`);
      
      // Navigate to OTP verification
      setTimeout(() => {
        navigate('/otp-verification', {
          state: {
            phoneNumber,
            nationalId,
            isExistingCustomer,
            hasBiometric: true,
            biometricSuccess: true
          }
        });
      }, 1500);
      return;
    }
    
    // Coming from VNeID flow, go to OTP
    if (fromVNeID) {
      toast.success(`${isTouchId ? 'Touch ID' : 'Face ID'} authentication successful!`);
      
      setTimeout(() => {
        navigate('/otp-verification', {
          state: {
            phoneNumber,
            nationalId,
            isExistingCustomer,
            hasBiometric: true
          }
        });
      }, 1500);
      return;
    }
    
    // Default case - navigate to OTP
    toast.success(`${isTouchId ? 'Touch ID' : 'Face ID'} authentication successful!`);
    
    setTimeout(() => {
      navigate('/otp-verification', { 
        state: { 
          phoneNumber, 
          nationalId,
          isExistingCustomer,
          hasBiometric: true 
        } 
      });
    }, 1500);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const circleVariants = {
    scanning: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0)",
        "0 0 0 15px rgba(59, 130, 246, 0.3)",
        "0 0 0 0 rgba(59, 130, 246, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    success: {
      scale: [1, 1.2, 1],
      backgroundColor: ["#3b82f6", "#10b981", "#10b981"],
      transition: { duration: 0.5 }
    },
    error: {
      scale: [1, 1.2, 1],
      backgroundColor: ["#3b82f6", "#ef4444", "#ef4444"],
      transition: { duration: 0.5 }
    }
  };
  
  const getCircleVariant = () => {
    if (scanning) return "scanning";
    if (scanComplete) {
      if (phoneNumber === '0323456789' || biometricSuccess === false) {
        return "error";
      }
      return "success";
    }
    return "";
  };

  return (
    <Layout>
      <div className="py-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={scanning}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">
            {isTouchId ? 'Touch ID Authentication' : 'Facial Verification'}
          </h1>
          <p className="text-muted-foreground max-w-xs mx-auto">
            {scanning 
              ? isTouchId 
                ? "Place your finger on the scanner" 
                : "Please look at your camera"
              : scanComplete 
                ? "Verification complete" 
                : isTouchId 
                  ? "Prepare to scan your fingerprint"
                  : "Prepare for facial scan"
            }
          </p>
          
          <div className="flex flex-col items-center justify-center py-10">
            <motion.div
              className="h-32 w-32 bg-banking-blue/20 rounded-full flex items-center justify-center"
              variants={circleVariants}
              animate={getCircleVariant()}
            >
              <div className="h-24 w-24 bg-banking-blue rounded-full flex items-center justify-center">
                {scanComplete ? (
                  phoneNumber === '0323456789' || biometricSuccess === false ? (
                    <Shield className="h-12 w-12 text-white" />
                  ) : (
                    <UserCheck className="h-12 w-12 text-white" />
                  )
                ) : (
                  isTouchId ? (
                    <Fingerprint className="h-12 w-12 text-white" />
                  ) : (
                    <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 15C8.5 15.5 9.5 16 12 16C14.5 16 15.5 15.5 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1" fill="currentColor" />
                      <circle cx="15" cy="10" r="1" fill="currentColor" />
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )
                )}
              </div>
            </motion.div>
            
            <div className="mt-10 max-w-xs mx-auto w-full">
              {!scanning && !scanComplete && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    className="w-full" 
                    onClick={handleStartScan}
                  >
                    Start {isTouchId ? 'Touch ID' : 'Face Scan'}
                  </Button>
                </motion.div>
              )}
              
              {scanning && (
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-banking-blue"
                    ></motion.div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">Scanning in progress...</p>
                </div>
              )}
              
              {scanComplete && (
                <p className="text-sm text-center">
                  {phoneNumber === '0323456789' || biometricSuccess === false ? 
                    "Verification failed. Redirecting..." : 
                    "Verification successful. Redirecting..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BiometricAuth;
