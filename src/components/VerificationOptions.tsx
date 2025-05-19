
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Scan, User, ChevronsRight } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const VerificationOptions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleVNeIDVerification = () => {
    // Route to VNeID confirmation first
    navigate('/vneid-confirmation', { 
      state: { 
        phoneNumber, 
        nationalId,
        isExistingCustomer,
        isNewNationalId,
        hasBiometric,
        nextRoute: '/otp-verification'
      } 
    });
  };

  const handleNFCVerification = () => {
    // Route to NFC verification
    navigate('/nfc-verification', { 
      state: { 
        phoneNumber, 
        nationalId,
        isExistingCustomer,
        isNewNationalId,
        hasBiometric,
        nextRoute: '/otp-verification'
      } 
    });
  };
  
  return (
    <Layout>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-2">Choose Verification Method</h1>
        <p className="text-muted-foreground mb-6">
          Select your preferred method to verify your identity
        </p>
        
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="overflow-hidden border-0 shadow-md">
              <Button 
                variant="ghost" 
                className="w-full p-0 h-auto block"
                onClick={handleVNeIDVerification}
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-banking-blue" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">VNeID Verification</h3>
                      <p className="text-sm text-muted-foreground">Verify your identity using VNeID</p>
                    </div>
                    <ChevronsRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="overflow-hidden border-0 shadow-md">
              <Button 
                variant="ghost" 
                className="w-full p-0 h-auto block"
                onClick={handleNFCVerification}
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Scan className="h-6 w-6 text-banking-blue" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">NFC Verification</h3>
                      <p className="text-sm text-muted-foreground">Verify using your ID card via NFC</p>
                    </div>
                    <ChevronsRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationOptions;
