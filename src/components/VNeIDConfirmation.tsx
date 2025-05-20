
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Clock, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4 text-center">VNeID Verification</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Spinner size="lg" />
            <p className="mt-4 text-muted-foreground">Connecting to VNeID App...</p>
            <div className="w-full max-w-md mt-6">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-banking-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right mt-1">{progress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5 mb-4">
            <Card className="shadow-sm border-banking-blue/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-center">Confirm information sharing</CardTitle>
                <CardDescription className="text-center">to log in to SuperApp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="text-xs mt-1">VNeID</span>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <ArrowRight className="h-5 w-5 text-banking-blue mx-2" />
                    <ArrowLeft className="h-5 w-5 text-banking-blue mx-2" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-banking-blue/10 flex items-center justify-center">
                      <div className="font-bold text-banking-blue">S</div>
                    </div>
                    <span className="text-xs mt-1">SuperApp</span>
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
                      <h3 className="font-medium mb-2">Mandatory shared information:</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Personal Identification Number</li>
                        <li>• Full name</li>
                        <li>• Date of birth</li>
                        <li>• Digital ID account level</li>
                        <li>• Account type</li>
                      </ul>
                      
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Purpose of data sharing and processing:</h3>
                        <p className="text-muted-foreground text-sm">
                          The above information fields are shared to perform SuperApp login
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
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                    I have read and understood the purpose content (as stated above); Rights and obligations of the data subject and agree with the above contents.
                  </label>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>Data sharing expiration time: {formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShowInfo}
                  >
                    Show Information
                  </Button>
                  
                  <Button
                    className="w-full bg-banking-red hover:bg-banking-red/90 text-white"
                    onClick={handleConfirm}
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
