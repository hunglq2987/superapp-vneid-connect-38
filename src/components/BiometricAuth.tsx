
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BiometricAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState<'initial' | 'scanning' | 'success'>('initial');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (stage === 'scanning') {
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setStage('success');
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => clearInterval(timer);
  }, [stage]);
  
  const handleStartScan = () => {
    setStage('scanning');
  };
  
  const handleComplete = () => {
    // Determine where to navigate based on the flow
    if (location.pathname.includes('nfc')) {
      navigate('/detailed-registration', { 
        state: { 
          nationalId: '111111111111', 
          hasValidBiometric: true, 
          fromNfc: true 
        }
      });
    } else {
      navigate('/detailed-registration', {
        state: { 
          nationalId: '111111111111', 
          hasValidBiometric: true 
        }
      });
    }
  };
  
  const renderInitialStage = () => (
    <>
      <CardHeader>
        <CardTitle>Facial Verification</CardTitle>
        <CardDescription>We need to verify your identity using facial recognition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-48 w-48 bg-banking-lightGrey rounded-full border-2 border-dashed border-banking-grey flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-banking-grey">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        
        <div className="text-sm space-y-2">
          <p className="font-medium">Face verification guidelines:</p>
          <ul className="list-disc list-inside text-muted-foreground pl-2">
            <li>Ensure you are in a well-lit area</li>
            <li>Remove glasses, hats, or face coverings</li>
            <li>Look directly at the camera</li>
            <li>Keep a neutral expression</li>
          </ul>
        </div>
        
        <Button className="w-full" onClick={handleStartScan}>
          Start Face Scan
        </Button>
      </CardContent>
    </>
  );
  
  const renderScanningStage = () => (
    <>
      <CardHeader>
        <CardTitle>Scanning in Progress</CardTitle>
        <CardDescription>Please look at the camera and follow instructions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-48 w-48 bg-banking-lightGrey rounded-full border-2 border-banking-blue flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-banking-blue/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-banking-blue animate-pulse-soft">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            
            {/* Scanning effect */}
            <div 
              className="absolute left-0 w-full h-1 bg-banking-blue opacity-80" 
              style={{ 
                top: `${progress}%`,
                transition: 'top 0.1s ease-out'
              }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-full bg-banking-lightGrey rounded-full h-2.5">
            <div 
              className="bg-banking-blue h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {progress < 50 
              ? "Scanning your face..." 
              : progress < 90 
                ? "Analyzing features..." 
                : "Almost done..."}
          </p>
        </div>
        
        <p className="text-sm text-center text-banking-grey animate-pulse">
          Please don't move until scan completes
        </p>
      </CardContent>
    </>
  );
  
  const renderSuccessStage = () => (
    <>
      <CardHeader>
        <CardTitle>Verification Successful</CardTitle>
        <CardDescription>Your identity has been verified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-48 w-48 bg-banking-lightGrey rounded-full border-2 border-banking-green flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-banking-green">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-banking-green font-medium">
            Your face has been verified
          </p>
          <p className="text-sm text-muted-foreground">
            You can now proceed with the registration
          </p>
        </div>
        
        <Button className="w-full" onClick={handleComplete}>
          Continue
        </Button>
      </CardContent>
    </>
  );
  
  return (
    <Layout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Biometric Verification</h1>
        
        <Card className="shadow-md overflow-hidden">
          {stage === 'initial' && renderInitialStage()}
          {stage === 'scanning' && renderScanningStage()}
          {stage === 'success' && renderSuccessStage()}
        </Card>
      </div>
    </Layout>
  );
};

export default BiometricAuth;
