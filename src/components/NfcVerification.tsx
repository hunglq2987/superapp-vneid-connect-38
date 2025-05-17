
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const NfcVerification: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleInitiateScan = () => {
    setIsScanning(true);
    setError(null);
    
    // Simulate NFC scanning progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setStep(step + 1);
        }, 500);
      }
    }, 200);
  };
  
  const handleCaptureId = () => {
    setStep(3);
  };
  
  const handleNfcComplete = () => {
    setStep(4);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleCompleteVerification = () => {
    toast.success("NFC verification completed successfully!");
    navigate('/', { state: { nfcVerified: true } });
  };

  const renderStep1 = () => (
    <>
      <CardHeader>
        <CardTitle>NFC Verification</CardTitle>
        <CardDescription>
          Verify your identity using your National ID card via NFC
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-banking-blue">
              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <rect x="8" y="6" width="8" height="4" rx="1" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-banking-blue absolute top-0 right-0 transform -translate-y-1/4">
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <line x1="16" y1="8" x2="2" y2="22" />
              <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="font-medium">NFC Verification Steps:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="bg-banking-blue text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Prepare your National ID card</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-banking-blue text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Make sure your device has NFC enabled</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-banking-blue text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Place your ID on the back of your phone</span>
            </li>
          </ul>
        </div>

        <Button 
          className="w-full" 
          onClick={handleInitiateScan}
        >
          Start Verification
        </Button>
      </CardContent>
    </>
  );

  const renderStep2 = () => (
    <>
      <CardHeader>
        <CardTitle>Capture ID Document</CardTitle>
        <CardDescription>
          Please take a photo of the front side of your ID
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-banking-lightGrey rounded-lg aspect-[3/2] flex items-center justify-center border-2 border-dashed border-banking-grey">
          <div className="text-center text-banking-grey">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M20.4 14.5L16 10 4 20" />
            </svg>
            <p className="text-sm font-medium">Tap to capture</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Guidelines:</p>
          <ul className="list-disc list-inside text-muted-foreground pl-2">
            <li>Ensure all corners are visible</li>
            <li>Make sure text is clear and readable</li>
            <li>Use good lighting conditions</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={handleCaptureId}
          >
            Capture ID Photo
          </Button>
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={() => setStep(3)}
          >
            Skip this step
          </Button>
        </div>
      </CardContent>
    </>
  );

  const renderStep3 = () => (
    <>
      <CardHeader>
        <CardTitle>NFC Scanning</CardTitle>
        <CardDescription>
          {isScanning
            ? "Reading your ID card. Please don't move your card."
            : "Place your ID card on the back of your device"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center py-4">
          <div className="relative">
            <div className={`w-64 h-40 bg-white border-2 rounded-lg shadow-lg flex items-center justify-center ${isScanning ? 'border-banking-blue' : 'border-banking-grey border-dashed'}`}>
              <div className="text-xs text-center font-medium text-banking-grey">
                NATIONAL ID
              </div>
              
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-12 w-12 text-banking-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            
            <div className={`w-16 h-24 bg-gray-700 rounded-lg absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white text-xs font-medium ${isScanning ? 'border-banking-blue border-2' : ''}`}>
              PHONE
              {isScanning && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-banking-blue animate-pulse-soft"></div>
              )}
            </div>
          </div>
        </div>
        
        {isScanning && (
          <div className="space-y-2">
            <div className="w-full bg-banking-lightGrey rounded-full h-2">
              <div 
                className="bg-banking-blue h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {progress < 30 
                ? "Establishing connection..." 
                : progress < 60 
                  ? "Reading chip data..." 
                  : progress < 90 
                    ? "Verifying data..." 
                    : "Almost done..."}
            </p>
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-red-50 border border-banking-red rounded text-banking-red text-sm">
            {error}
          </div>
        )}
        
        <Button 
          className="w-full"
          onClick={isScanning ? () => {} : handleInitiateScan}
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Start NFC Scan'}
        </Button>
        
        {!isScanning && (
          <Button 
            className="w-full"
            variant="outline"
            onClick={handleNfcComplete}
          >
            Continue without NFC
          </Button>
        )}
      </CardContent>
    </>
  );

  const renderStep4 = () => (
    <>
      <CardHeader>
        <CardTitle>Verification Successful</CardTitle>
        <CardDescription>
          Your ID was successfully verified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center py-6">
          <div className="h-24 w-24 bg-banking-green/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-banking-green">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        
        <div className="space-y-1 text-center">
          <h3 className="font-semibold text-banking-green">ID Verified</h3>
          <p className="text-sm text-muted-foreground">
            We've successfully verified your ID information
          </p>
        </div>
        
        <div className="bg-banking-lightGrey p-4 rounded-lg text-sm space-y-2">
          <div>
            <span className="font-medium">ID Number:</span> XXXXXXXX5678
          </div>
          <div>
            <span className="font-medium">Full Name:</span> Nguyen Van A
          </div>
          <div>
            <span className="font-medium">Date of Birth:</span> 01/01/1990
          </div>
          <div>
            <span className="font-medium">Issue Date:</span> 01/01/2020
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleCompleteVerification}
        >
          Complete Verification
        </Button>
      </CardContent>
    </>
  );
  
  return (
    <Layout>
      <div className="py-4">
        <div className="flex items-center mb-4">
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
        
        <Card className="shadow-md">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </Card>
      </div>
    </Layout>
  );
};

export default NfcVerification;
