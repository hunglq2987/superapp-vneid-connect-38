
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NoPhoneFound: React.FC = () => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate('/vneid-confirmation');
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Phone Verification</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <motion.div 
                className="mx-auto mb-4 w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AlertTriangle size={40} className="text-amber-500" />
              </motion.div>
              <CardTitle className="text-center text-xl">No Phone Number Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  We couldn't find any registered phone number for your account. To proceed with the registration, we need to verify your identity using VNeID.
                </p>
                
                <div className="flex items-center justify-center py-4">
                  <div className="w-14 h-14 bg-banking-blue/10 rounded-full flex items-center justify-center">
                    <Phone size={24} className="text-banking-blue" />
                  </div>
                  <div className="mx-3 text-3xl text-banking-grey">→</div>
                  <div className="w-14 h-14 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                    VNeID
                  </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue"
                    onClick={handleContinue}
                  >
                    <span>Continue with VNeID</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </motion.div>
                
                <p className="text-xs text-muted-foreground pt-3">
                  VNeID is Vietnam's National Digital Identity system that provides secure identity verification
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NoPhoneFound;
