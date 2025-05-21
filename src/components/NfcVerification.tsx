
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  HelpCircle,
  Phone,
  Smartphone,
  Wifi,
  X,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface NfcVerificationProps {
  phoneNumber?: string;
  nationalId?: string;
  isExistingCustomer?: boolean;
  isNewNationalId?: boolean;
  hasBiometric?: boolean;
  fromVNeID?: boolean;
}

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, fromVNeID } = location.state || {};
  
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to scan ID card');
  const [scanStage, setScanStage] = useState<number>(0);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [cardReadSuccess, setCardReadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if required data is missing
    if (!phoneNumber) {
      navigate('/');
      toast.error('Missing required data. Please restart the registration process.');
    }
  }, [phoneNumber, navigate]);

  const simulateNfcScan = () => {
    setIsScanning(true);
    setStatusMessage('Scanning. Please hold your phone near your ID card...');
    setScanStage(1);
    
    // Simulate detecting NFC chip
    setTimeout(() => {
      setStatusMessage('ID card detected. Reading data...');
      setScanStage(2);
      
      // Simulate reading data
      setTimeout(() => {
        setStatusMessage('Reading personal information...');
        setScanStage(3);
        
        // Simulate verification
        setTimeout(() => {
          setStatusMessage('Verifying data with VNeID database...');
          setScanStage(4);
          
          // Complete verification and navigate directly to detailed registration
          setTimeout(() => {
            setStatusMessage('Verification complete!');
            setScanStage(5);
            setCardReadSuccess(true);
            
            // Navigate to detailed registration after successful NFC verification
            setTimeout(() => {
              handleVerificationSuccess();
            }, 1000);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleCancelScan = () => {
    setIsScanning(false);
    setStatusMessage('Scan cancelled');
    setScanStage(0);
    setError(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleVerificationSuccess = () => {
    setIsScanning(false);
    
    // Show success message
    toast.success("NFC Verification completed successfully!");
    
    // Navigate directly to detailed registration after NFC scan
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

  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={isScanning}
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
            <CardDescription>Scan your ID card using your device's NFC reader</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!isScanning ? (
                <motion.div
                  key="scan-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-6"
                >
                  <div className="mb-6 bg-muted/50 h-32 w-32 rounded-full flex items-center justify-center">
                    <CreditCard size={64} className="text-muted-foreground" />
                  </div>
                  
                  <p className="text-center mb-6 text-sm text-muted-foreground">
                    Place your ID card near the back of your device to read its chip
                  </p>
                  
                  <Button 
                    className="w-full"
                    onClick={simulateNfcScan}
                  >
                    <Wifi className="mr-2 h-5 w-5" />
                    Start NFC Scan
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
                  <div className={`relative mb-6 bg-muted/50 h-32 w-32 rounded-full flex items-center justify-center overflow-hidden ${cardReadSuccess ? 'bg-green-100' : ''}`}>
                    {cardReadSuccess ? (
                      <CheckCircle size={64} className="text-green-500" />
                    ) : (
                      <>
                        <CreditCard size={48} className="text-muted-foreground z-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-blue-400/10 absolute">
                            <motion.div
                              className="w-full bg-blue-400/20 h-1.5"
                              animate={{
                                y: ['0%', '100%', '0%']
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                          </div>
                        </div>
                        <div className="absolute inset-0">
                          <motion.div
                            className="h-full w-full rounded-full border-4 border-transparent border-t-primary"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  {error ? (
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center text-banking-red mb-2">
                        <AlertCircle className="mr-2" size={18} />
                        <p className="font-medium">Error</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                  ) : (
                    <div className="text-center mb-6">
                      <p className="font-medium mb-1">{statusMessage}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i === scanStage ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!cardReadSuccess && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleCancelScan}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel Scan
                    </Button>
                  )}
                </motion.div>
              )}
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
