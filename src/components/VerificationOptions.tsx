
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Smartphone, CreditCard } from 'lucide-react';
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
    // Navigate to NFC verification
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
                <div className="flex items-center">
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationOptions;

