
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertCircle, ArrowRight, ShieldCheck, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import Layout from './Layout';
import OtpInput from './ui/OtpInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, biometricSuccess, fromNfc } = location.state || {};
  const [otp, setOtp] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0); // Added to force re-render of OtpInput
  
  useEffect(() => {
    if (!phoneNumber) {
      navigate('/registration');
      return;
    }
    
    // Start OTP timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [phoneNumber, navigate]);
  
  // Handle resend cooldown
  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout;
    
    if (resendCooldown > 0) {
      cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (cooldownTimer) clearInterval(cooldownTimer);
    };
  }, [resendCooldown]);
  
  const handleOtpComplete = (value: string) => {
    setOtp(value);
  };
  
  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP code");
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification (for demo use 123456 as valid OTP)
    setTimeout(() => {
      if (otp === '123456') {
        toast.success("OTP verification successful!");
        
        // Navigate based on the case scenarios
        if (fromNfc) {
          // If coming from NFC, go straight to detailed registration
          navigate('/detailed-registration', { 
            state: { 
              phoneNumber,
              nationalId, 
              isExistingCustomer,
              isNewNationalId,
              hasValidBiometric: true,
              fromNfc: true
            }
          });
        } else if (isExistingCustomer && hasBiometric) {
          // Case 3 & 4: Existing customer with biometric info
          navigate('/biometric-auth', {
            state: {
              phoneNumber,
              nationalId,
              isExistingCustomer,
              hasBiometric,
              biometricSuccess
            }
          });
        } else {
          // Case 1, 2, & 5: Either new customer or existing without biometric
          // Offer verification options (VNeID or NFC)
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
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          toast.error("Maximum attempts reached. Please try again later.");
          navigate('/');
        } else {
          toast.error(`Invalid OTP. ${3 - newAttempts} attempts remaining.`);
          setOtp('');
          // Reset the OTP input by changing the key
          setResetKey(prev => prev + 1);
        }
      }
      setIsVerifying(false);
    }, 1500);
  };
  
  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    
    // Reset OTP timer
    setTimeLeft(180);
    // Set resend cooldown to 1 minute
    setResendCooldown(60);
    
    toast.success(`OTP sent to ${phoneNumber}`);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">OTP Verification</h1>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Enter OTP Code</CardTitle>
            <CardDescription>
              A 6-digit code has been sent to <span className="font-medium">{phoneNumber}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <OtpInput 
                length={6} 
                onComplete={handleOtpComplete}
                className="mb-6"
                key={resetKey} // Add key prop to force re-render when invalid OTP is entered
              />
              
              <div className="flex items-center justify-between">
                <div>
                  {timeLeft > 0 ? (
                    <div className="text-sm flex items-center gap-2">
                      <span className="text-muted-foreground">OTP expires in:</span>
                      <span className="font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-banking-red flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>OTP expired</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={resendCooldown > 0}
                  onClick={handleResendOtp}
                  className="text-banking-blue flex items-center gap-2"
                >
                  <RefreshCcw size={16} />
                  {resendCooldown > 0 ? `Resend in ${formatTime(resendCooldown)}` : 'Resend OTP'}
                </Button>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full"
                  onClick={handleVerify}
                  disabled={otp.length !== 6 || timeLeft === 0 || isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                  {!isVerifying && <ShieldCheck size={18} className="ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OtpVerification;
