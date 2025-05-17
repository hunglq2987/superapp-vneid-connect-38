
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, CheckCircle, Camera, ShieldCheck, Shield, ScanLine, Fingerprint } from 'lucide-react';
import { toast } from 'sonner';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Stepper, StepperContent, StepperItem } from '@/components/ui/stepper';

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verificationStep, setVerificationStep] = useState<number>(1);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);
  const [capturedId, setCapturedId] = useState<string>('');
  const [idInfo, setIdInfo] = useState({
    idNumber: '',
    name: '',
    dob: '',
    issueDate: ''
  });
  const [showIdPreview, setShowIdPreview] = useState<boolean>(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVerifying) {
      timer = setTimeout(() => {
        setIsVerifying(false);
        
        if (verificationStep < 6) {
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
    if (verificationStep === 2 && !capturedId) {
      toast.warning("Please capture or skip ID photo");
      return;
    }
    setIsVerifying(true);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleCaptureId = () => {
    // Simulate ID capture
    setCapturedId("captured_id_photo");
    setIdInfo({
      idNumber: '123456789012',
      name: 'Nguyen Van A',
      dob: '01/01/1990',
      issueDate: '01/01/2020'
    });
    setShowIdPreview(true);
    toast.success("ID captured successfully");
  };
  
  const handleSkipCapture = () => {
    // Skip ID capture and move to next step
    setVerificationStep(3);
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Initiate Verification";
      case 2: return "Capture ID Front (Optional)";
      case 3: return "NFC Communication";
      case 4: return "Data Verification";
      case 5: return "Biometric Comparison";
      case 6: return "Complete Verification";
      default: return "Verification";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return "Prepare your ID card and ensure NFC is enabled on your device";
      case 2:
        return "Take a photo of your ID to extract basic information";
      case 3:
        return "Place your ID card on the back of your phone to read chip data";
      case 4:
        return "System is verifying the data from your ID chip";
      case 5:
        return "Take a selfie to compare with your ID photo";
      case 6:
        return "Finalizing your verification process";
      default:
        return "Follow the instructions to complete verification";
    }
  };

  const getStepAction = (step: number) => {
    switch (step) {
      case 1: return "Begin Verification";
      case 2: return capturedId ? "Continue" : "Capture ID";
      case 3: return "Start NFC Scan";
      case 4: return "Continue";
      case 5: return "Take Selfie";
      case 6: return "Complete";
      default: return "Continue";
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-banking-blue/10 flex items-center justify-center animate-pulse-soft">
              <ShieldCheck className="h-12 w-12 text-banking-blue" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium">Welcome to NFC ID Verification</p>
              <p className="text-sm text-muted-foreground">
                This process will verify your identity using your NFC-enabled ID card.
                Please ensure your device has NFC enabled.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center space-y-4">
            {showIdPreview ? (
              <div className="space-y-4 w-full">
                <div className="h-40 w-full bg-banking-lightGrey rounded-lg border-2 border-dashed border-banking-blue flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-banking-blue/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-banking-green" />
                  </div>
                </div>
                <div className="bg-banking-lightGrey p-3 rounded-lg text-sm space-y-2">
                  <div><span className="font-medium">ID Number:</span> {idInfo.idNumber}</div>
                  <div><span className="font-medium">Name:</span> {idInfo.name}</div>
                  <div><span className="font-medium">Date of Birth:</span> {idInfo.dob}</div>
                  <div><span className="font-medium">Issue Date:</span> {idInfo.issueDate}</div>
                </div>
              </div>
            ) : (
              <div className="h-40 w-full bg-banking-lightGrey rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className={`relative ${isVerifying ? 'animate-pulse' : ''}`}>
              <div className="h-40 w-64 bg-banking-lightGrey rounded-lg border-2 border-dashed border-banking-blue flex items-center justify-center relative">
                <Smartphone className="h-20 w-20 text-banking-blue" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-banking-blue rounded-full flex items-center justify-center">
                  <ScanLine className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {isVerifying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full border-4 border-banking-blue border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Place your ID card directly on the back of your phone and hold steady
            </p>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-4 w-full">
              <div className="relative h-32 flex items-center justify-center">
                {isVerifying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-banking-blue border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="h-16 w-16 text-banking-blue animate-pulse-soft" />
                    <p className="font-medium">Verifying data...</p>
                  </div>
                )}
              </div>
              
              <div className="bg-banking-lightGrey p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>ID Data Integrity</span>
                    <CheckCircle className="h-5 w-5 text-banking-green" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Digital Signature</span>
                    <CheckCircle className="h-5 w-5 text-banking-green" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Issuer Validation</span>
                    <CheckCircle className="h-5 w-5 text-banking-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-40 w-40 rounded-full bg-banking-lightGrey border-2 border-dashed border-muted-foreground flex items-center justify-center relative">
              {isVerifying ? (
                <div className="absolute inset-0 rounded-full bg-banking-blue/10 flex items-center justify-center animate-pulse">
                  <div className="h-16 w-16 rounded-full border-4 border-banking-blue border-t-transparent animate-spin"></div>
                </div>
              ) : (
                <>
                  <Fingerprint className="h-16 w-16 text-muted-foreground" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-banking-blue rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Position your face in the frame for biometric comparison
            </p>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-banking-green/10 flex items-center justify-center animate-pulse-soft">
              <CheckCircle className="h-12 w-12 text-banking-green" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium">Verification Complete!</p>
              <p className="text-sm text-muted-foreground">
                Your identity has been successfully verified.
                You can now proceed with your application.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
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
        
        <Stepper value={verificationStep} className="mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <StepperItem key={i} className={verificationStep > i + 1 ? "bg-banking-blue text-white" : ""} />
          ))}
        </Stepper>
        
        <Card className="shadow-md max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>{getStepTitle(verificationStep)}</CardTitle>
            <CardDescription>{getStepDescription(verificationStep)}</CardDescription>
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
              getStepContent(verificationStep)
            )}
          </CardContent>
          
          {!verificationComplete && (
            <CardFooter className="flex flex-col space-y-4">
              {verificationStep === 2 && !showIdPreview ? (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue"
                    onClick={handleCaptureId}
                    disabled={isVerifying}
                  >
                    Capture ID
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleSkipCapture}
                    disabled={isVerifying}
                    className="w-full"
                  >
                    Skip
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform"
                  onClick={handleStartScan}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Processing..." : getStepAction(verificationStep)}
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                onClick={handleGoBack}
                className="w-full hover:bg-banking-lightGrey"
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
