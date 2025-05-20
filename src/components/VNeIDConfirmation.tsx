import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
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
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleShowInfo = () => {
    setShowInfo(true);
  };
  
  const handleConfirm = () => {
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
          <div className="space-y-6 mb-4">
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-banking-blue flex items-center justify-center mb-4">
                <Smartphone className="h-10 w-10 text-banking-blue" />
              </div>
              <h2 className="text-lg font-bold text-center">VNeID Consent</h2>
              <p className="text-sm text-center text-muted-foreground mt-1">
                Allow SuperApp to access your information from VNeID
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleShowInfo}
              >
                Show Information
              </Button>
              
              <Button
                className="w-full"
                onClick={handleConfirm}
              >
                Confirm Sharing
              </Button>
              
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleReject}
              >
                Do not share
              </Button>
            </div>
            
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 mt-4 text-xs"
              >
                <h3 className="font-medium mb-2">Information to be shared:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Full Name</li>
                  <li>• Date of Birth</li>
                  <li>• National ID Number</li>
                  <li>• Address Information</li>
                  <li>• Phone Number</li>
                  <li>• Biometric Data (Facial Recognition)</li>
                </ul>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
