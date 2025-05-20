
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fingerprint, Scan, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const RegistrationComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};
  
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [touchIdEnabled, setTouchIdEnabled] = useState(false);
  
  const handleEnableFaceId = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Setting up Face ID...',
        success: () => {
          setFaceIdEnabled(true);
          return 'Face ID has been successfully set up!';
        },
        error: 'Failed to set up Face ID. Please try again.',
      }
    );
  };
  
  const handleEnableTouchId = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Setting up Touch ID...',
        success: () => {
          setTouchIdEnabled(true);
          return 'Touch ID has been successfully set up!';
        },
        error: 'Failed to set up Touch ID. Please try again.',
      }
    );
  };
  
  const handleBackToHome = () => {
    navigate('/', { 
      state: { 
        registrationComplete: true 
      } 
    });
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="py-6 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-banking-green/10 mb-4">
            <CheckCircle size={32} className="text-banking-green" />
          </div>
          <h1 className="text-2xl font-bold">Registration Complete!</h1>
          <p className="text-muted-foreground mt-2">
            Your account has been successfully registered.
          </p>
        </motion.div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Set Up Biometric Authentication</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-banking-blue/10 flex items-center justify-center mr-4">
                    <Scan size={20} className="text-banking-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Face ID</h3>
                    <p className="text-xs text-muted-foreground">Log in quickly and securely with facial recognition</p>
                  </div>
                </div>
                <Button 
                  variant={faceIdEnabled ? "outline" : "default"}
                  onClick={handleEnableFaceId}
                  disabled={faceIdEnabled}
                >
                  {faceIdEnabled ? 'Enabled' : 'Enable'}
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-banking-blue/10 flex items-center justify-center mr-4">
                    <Fingerprint size={20} className="text-banking-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Touch ID</h3>
                    <p className="text-xs text-muted-foreground">Log in quickly and securely with fingerprint</p>
                  </div>
                </div>
                <Button 
                  variant={touchIdEnabled ? "outline" : "default"}
                  onClick={handleEnableTouchId}
                  disabled={touchIdEnabled}
                >
                  {touchIdEnabled ? 'Enabled' : 'Enable'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleBackToHome}
        >
          <Home size={18} />
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default RegistrationComplete;
