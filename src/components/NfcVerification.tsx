
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verificationStep, setVerificationStep] = useState<number>(1);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVerifying) {
      timer = setTimeout(() => {
        setIsVerifying(false);
        
        if (verificationStep < 3) {
          setVerificationStep(prev => prev + 1);
        } else {
          setVerificationComplete(true);
          toast.success("NFC Verification completed successfully!");
          // Wait 2 seconds before navigating back to home
          setTimeout(() => {
            navigate('/', { state: { nfcSuccess: true } });
          }, 2000);
        }
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [isVerifying, verificationStep, navigate]);
  
  const handleStartScan = () => {
    setIsVerifying(true);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const getStepContent = () => {
    switch (verificationStep) {
      case 1:
        return {
          title: "Place ID Card",
          description: "Place your ID card on the back of your phone",
          action: "Start Scanning"
        };
      case 2:
        return {
          title: "Scan ID Information",
          description: "Hold steady while we verify your ID information",
          action: "Continue Verification"
        };
      case 3:
        return {
          title: "Verify Biometrics",
          description: "We'll verify your biometric information from the ID card",
          action: "Complete Verification"
        };
      default:
        return {
          title: "Place ID Card",
          description: "Place your ID card on the back of your phone",
          action: "Start Scanning"
        };
    }
  };
  
  const currentStep = getStepContent();
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToHome}
            className="gap-1"
          >
            <ArrowLeft size={16} />
            Back to home
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">NFC Verification</h1>
        
        <Card className="shadow-md max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>{currentStep.title}</CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center justify-center py-8">
            {verificationComplete ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-banking-green/10 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-banking-green" />
                </div>
                <p className="text-lg font-medium">Verification Complete!</p>
                <p className="text-center text-muted-foreground">
                  Your identity has been successfully verified.
                  Redirecting to homepage...
                </p>
              </div>
            ) : (
              <div className={`relative ${isVerifying ? 'animate-pulse' : ''}`}>
                <div className="h-40 w-64 bg-banking-lightGrey rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center">
                  <Smartphone className="h-20 w-20 text-muted-foreground" />
                </div>
                
                {isVerifying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border-4 border-banking-blue border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          {!verificationComplete && (
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full"
                onClick={handleStartScan}
                disabled={isVerifying}
              >
                {isVerifying ? "Scanning..." : currentStep.action}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleGoBack}
                className="w-full"
                disabled={isVerifying}
              >
                Cancel
              </Button>
            </CardFooter>
          )}
        </Card>
        
        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Make sure NFC is enabled on your device.</p>
          <p className="mt-2">Position your ID card directly on the back of your phone.</p>
        </div>
      </div>
    </Layout>
  );
};

export default NfcVerification;
