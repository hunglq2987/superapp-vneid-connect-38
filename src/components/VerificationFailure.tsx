
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VerificationFailure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authMethod = 'face' } = location.state || {};
  
  const isTouchId = authMethod === 'touch';
  
  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleTryAgain = () => {
    navigate('/registration');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="py-6 flex flex-col items-center h-full">
        <div className="w-full flex justify-start mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToHome}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
        
        <motion.div 
          className="flex flex-col items-center justify-center text-center space-y-6 px-4 flex-1 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center text-red-500"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          >
            <AlertTriangle size={40} />
          </motion.div>
          
          <h1 className="text-2xl font-bold">Verification Failed</h1>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertTitle className="text-red-600 font-medium">{isTouchId ? 'Touch ID' : 'Facial'} Verification Not Matched</AlertTitle>
            <AlertDescription className="text-sm">
              We couldn't verify your identity using {isTouchId ? 'fingerprint' : 'facial'} recognition. Please try again or use another verification method.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-muted-foreground">
            <p>Possible reasons for failure:</p>
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Biometric data doesn't match our records</li>
              <li>Poor lighting or camera conditions</li>
              <li>The registered account uses different biometric data</li>
            </ul>
          </div>
          
          <div className="space-y-3 w-full mt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                onClick={handleTryAgain}
                className="w-full bg-banking-blue"
              >
                Try Registration Again
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                onClick={handleBackToHome}
                variant="outline"
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </motion.div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              You will be redirected to the home screen automatically in a few seconds
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default VerificationFailure;
