
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Info, ArrowRight, Clock } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const VNeIDConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, nextRoute } = location.state || {};

  // Handle countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          toast.error("Session expired. Please try again.");
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVNeIDProcess = () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms to proceed");
      return;
    }
    
    setLoading(true);
    
    toast("Processing VNeID verification...", {
      duration: 3000,
    });
    
    // Simulate VNeID verification process
    setTimeout(() => {
      setLoading(false);
      
      toast.success("VNeID verification completed successfully!");
      
      // If the user needs biometric authentication
      if (phoneNumber === '0323456789' || phoneNumber === '0423456789') {
        navigate('/biometric-auth', { 
          state: { 
            phoneNumber, 
            nationalId,
            isExistingCustomer,
            hasBiometric: true,
            biometricSuccess: phoneNumber === '0423456789' // Only succeed for this phone number
          } 
        });
      } else if (nextRoute) {
        navigate(nextRoute, { 
          state: { 
            phoneNumber, 
            nationalId,
            isExistingCustomer,
            isNewNationalId,
            hasBiometric
          } 
        });
      } else {
        navigate('/verification-options', { 
          state: { 
            phoneNumber, 
            nationalId,
            isExistingCustomer,
            isNewNationalId,
            hasBiometric 
          } 
        });
      }
    }, 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDontShare = () => {
    toast.info("You chose not to share data. Returning to home screen.");
    navigate('/');
  };

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Layout>
      <div className="py-6 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={loading}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Card className="shadow-md max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold">Confirm Information Sharing</h1>
              <p className="text-muted-foreground text-sm mt-1">to log in to SuperApp</p>
            </div>
            
            <div className="flex items-center justify-center gap-5 my-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                <div className="text-lg font-bold text-banking-blue">VNeID</div>
              </div>
              
              <div className="flex flex-col items-center">
                <ArrowRight size={20} className="rotate-180 mb-1" />
                <ArrowRight size={20} className="mt-1" />
              </div>
              
              <div className="bg-banking-blue/10 w-16 h-16 rounded-full flex items-center justify-center">
                <div className="text-lg font-bold text-banking-blue">SuperApp</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h2 className="text-md font-medium mb-2">Mandatory shared information:</h2>
                <ul className="text-sm space-y-1 pl-1">
                  <li>• Personal Identification Number</li>
                  <li>• Full name</li>
                  <li>• Date of birth</li>
                  <li>• Digital ID account level</li>
                  <li>• Account type</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-md font-medium mb-1">Purpose of data sharing and processing:</h2>
                <p className="text-sm text-muted-foreground">The above information fields are shared to perform SuperApp login</p>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    setTermsAccepted(checked === true);
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-tight cursor-pointer"
                >
                  I have read and understood the purpose content (as stated above); Rights and obligations of the data subject and agree with the above contents.
                </label>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>Data sharing expiration time: {formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={handleDontShare}
              >
                Do not share
              </Button>
              
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={!termsAccepted || loading}
                onClick={handleVNeIDProcess}
              >
                {loading ? 'Processing...' : 'Confirm sharing'}
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-sm text-banking-blue"
                onClick={toggleShowInfo}
              >
                <Info size={14} className="mr-1" />
                {showInfo ? 'Hide Information' : 'Show Information'}
              </Button>
              
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-muted/50 text-sm rounded-md text-left"
                >
                  <p className="font-medium mb-1">Shared Information Details:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• ID Number: {nationalId || '444444444444'}</li>
                    <li>• Name: {isNewNationalId ? 'New User' : 'Nguyen Van A'}</li>
                    <li>• DOB: {isNewNationalId ? '01/01/1995' : '01/01/1990'}</li>
                    <li>• VNeID Level: Level 2</li>
                    <li>• Account Type: Personal</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
