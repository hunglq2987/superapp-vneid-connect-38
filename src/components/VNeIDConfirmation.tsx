
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Clock, Check, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

const VNeIDConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};
  
  // Timer for data sharing expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  
  const handleConfirm = () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms before continuing");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading and progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful confirmation
        setTimeout(() => {
          setIsLoading(false);
          toast.success("VNeID Verification completed successfully!");
          
          // Navigate to biometric authentication
          navigate('/biometric-auth', { 
            state: { 
              phoneNumber, 
              nationalId,
              isExistingCustomer,
              isNewNationalId,
              hasBiometric,
              fromVNeID: true
            } 
          });
        }, 1000);
      }
    }, 50);
  };
  
  const handleReject = () => {
    toast.warning("You rejected sharing information from VNeID");
    navigate(-1);
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={isLoading}
          className="mb-4 flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4 text-center">VNeID Verification</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6"
            >
              <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Spinner size="lg" className="text-banking-blue" />
              </div>
            </motion.div>
            
            <p className="mb-2 font-medium">Connecting to VNeID App...</p>
            <p className="text-muted-foreground text-sm mb-6">Please wait while we establish a secure connection</p>
            
            <div className="w-full max-w-md">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Connecting</span>
                <span>Verifying</span>
                <span>Completing</span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            className="space-y-5 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-sm border-banking-blue/20">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">Confirm information sharing</CardTitle>
                <CardDescription className="text-center">to log in to SuperApp</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                    </div>
                    <span className="text-xs mt-1">VNeID</span>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <motion.div 
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5 text-banking-blue mx-1" />
                    </motion.div>
                    <motion.div 
                      animate={{ x: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <ArrowLeft className="h-5 w-5 text-banking-blue mx-1" />
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-banking-blue/10 dark:bg-banking-blue/30 flex items-center justify-center">
                      <div className="font-bold text-banking-blue">S</div>
                    </div>
                    <span className="text-xs mt-1">SuperApp</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-700 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm">Secure Data Sharing</h3>
                      <p className="text-xs text-muted-foreground">
                        Your information is securely shared and will only be used for verification purposes
                      </p>
                    </div>
                  </div>
                </div>
                
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="border rounded-lg p-4 text-sm">
                      <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Shared information:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-green-600" />
                          <span>Personal Identification Number</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-green-600" />
                          <span>Full name</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-green-600" />
                          <span>Date of birth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-green-600" />
                          <span>Digital ID account level</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-green-600" />
                          <span>Account type</span>
                        </li>
                      </ul>
                      
                      <Separator className="my-3" />
                      
                      <div>
                        <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Purpose of data sharing:</h3>
                        <p className="text-muted-foreground text-sm">
                          The above information fields are shared to perform SuperApp login and verification
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-start gap-2 mb-4">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="terms" className="text-sm cursor-pointer">
                      I have read and understood the purpose content
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      I agree with the rights and obligations of the data subject and the above contents
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-amber-600" />
                    <span>Data sharing request expires in: <span className="font-medium">{formatTime(timeLeft)}</span></span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShowInfo}
                  >
                    {showInfo ? 'Hide Information' : 'Show Information'}
                  </Button>
                  
                  <Button
                    className="w-full bg-banking-blue hover:bg-banking-blue/90"
                    onClick={handleConfirm}
                    disabled={!termsAccepted}
                  >
                    <Check className="mr-1 h-4 w-4" /> Confirm sharing
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReject}
                  >
                    Do not share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
