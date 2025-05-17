
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";
import HomeScreen from '../components/HomeScreen';

const Index: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Show registration success message if redirected from registration
    if (location.state?.registrationComplete) {
      toast.success("Registration completed successfully! You can now login to your account.");
    }
    
    // Show NFC verification success message if redirected from NFC verification
    if (location.state?.nfcSuccess) {
      toast.success("NFC Verification completed successfully!", {
        description: "Your identity has been verified using your ID card."
      });
    }
  }, [location.state]);

  return <HomeScreen />;
};

export default Index;
