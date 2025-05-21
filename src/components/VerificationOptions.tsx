
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Smartphone, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VerificationOptions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};

  const handleVNeID = () => {
    // Navigate to VNeID confirmation
    navigate('/vneid-confirmation', { 
      state: { 
        phoneNumber, 
        nationalId,
        isExistingCustomer,
        isNewNationalId,
        hasBiometric 
      } 
    });
  };

  const handleNFC = () => {
    // Navigate to NFC verification - updated to go directly to detailed registration after NFC
    navigate('/nfc-verification', { 
      state: { 
        phoneNumber, 
        nationalId,
        isExistingCustomer,
        isNewNationalId,
        hasBiometric
      } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout showBackButton={true}>
      <div className="py-6 max-w-md mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Choose Verification Method</h1>
        
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleVNeID}>
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 rounded-full bg-banking-blue/10 flex items-center justify-center mr-4">
                  <Smartphone className="h-6 w-6 text-banking-blue" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">VNeID Verification</h2>
                  <p className="text-sm text-muted-foreground">
                    Verify your identity using the VNeID app
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleNFC}>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">ID Card NFC</h2>
                    <p className="text-sm text-muted-foreground">
                      Scan your physical ID card via NFC
                    </p>
                  </div>
                </div>
                
                <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                    <CheckCircle size={12} className="inline mr-1" />
                    6-Step NFC Verification Process
                  </h3>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">1.</span> Initiate verification
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">2.</span> Capture front of ID
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">3.</span> NFC communication
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">4.</span> Data verification
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">5.</span> Biometric comparison
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1 font-medium">6.</span> Complete verification
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationOptions;
