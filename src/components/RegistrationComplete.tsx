import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Fingerprint, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const RegistrationComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};
  
  // Add state for biometric setup
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [touchIdEnabled, setTouchIdEnabled] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  
  // Handle biometric setup
  const handleEnableFaceId = () => {
    setFaceIdEnabled(true);
    toast.success("Face ID successfully enabled!");
  };
  
  const handleEnableTouchId = () => {
    setTouchIdEnabled(true);
    toast.success("Touch ID successfully enabled!");
  };
  
  // Complete setup and navigate to home
  const handleCompleteSetup = () => {
    setSetupComplete(true);
    toast.success("Setup complete!");
    
    // Navigate to home with success message
    setTimeout(() => {
      navigate('/', { state: { registrationComplete: true } });
    }, 1000);
  };
  
  // Skip setup and navigate to home
  const handleSkipSetup = () => {
    toast.info("You can enable biometric authentication later in profile settings");
    
    // Navigate to home with success message
    navigate('/', { state: { registrationComplete: true } });
  };

  return (
    <Layout>
      <div className="py-6 px-4 flex flex-col min-h-[80vh]">
        <h1 className="text-2xl font-bold text-center mb-2">Registration Complete</h1>
        
        <div className="flex-1 flex flex-col">
          <div className="my-6 text-center">
            <div className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <CheckCircle size={48} className="text-green-500" />
              </motion.div>
            </div>
            <h2 className="text-xl font-semibold">Success!</h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs mx-auto">
              Your account has been successfully registered with SuperApp
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Set Up Biometric Authentication</CardTitle>
              <CardDescription className="text-xs">
                Enable biometric authentication for faster and more secure login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className={`border ${faceIdEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center mb-3">
                      <Fingerprint className="h-5 w-5 text-banking-blue" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">Face ID</h3>
                    {faceIdEnabled ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <Check size={12} className="mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs mt-2"
                        onClick={handleEnableFaceId}
                      >
                        Enable
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className={`border ${touchIdEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-banking-lightGrey/20 backdrop-blur-md flex items-center justify-center mb-3">
                      <Lock className="h-5 w-5 text-banking-blue" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">Touch ID</h3>
                    {touchIdEnabled ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <Check size={12} className="mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs mt-2"
                        onClick={handleEnableTouchId}
                      >
                        Enable
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-auto space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleCompleteSetup} 
                className="w-full"
                disabled={setupComplete}
              >
                Complete Setup
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleSkipSetup} 
                variant="outline"
                className="w-full"
                disabled={setupComplete}
              >
                Skip for Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationComplete;
