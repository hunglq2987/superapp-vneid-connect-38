
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const VerificationFailure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId } = location.state || {};
  
  useEffect(() => {
    // Redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // 10 seconds
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <Layout showBackButton={false}>
      <div className="py-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="mb-4 flex justify-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200, 
                damping: 15,
                duration: 0.8
              }}
              className="h-24 w-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <AlertCircle size={48} className="text-red-600 dark:text-red-400" />
              </motion.div>
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
          <p className="text-muted-foreground">Facial verification was not matched</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Unable to Verify Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-muted-foreground">
                <p>The facial verification process could not confirm your identity.</p>
                <p className="mt-2">Please visit your nearest bank branch with your ID for in-person verification.</p>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  For security reasons, you will be redirected to the home screen in 10 seconds.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="default"
                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-700"
                  onClick={handleBackToHome}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default VerificationFailure;
