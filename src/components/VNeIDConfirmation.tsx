
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VNeIDConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [agreed, setAgreed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const handleConfirmSharing = () => {
    navigate('/biometric-auth');
  };
  
  const renderSharedData = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-banking-lightGrey p-3 rounded-lg border border-border text-sm space-y-2 my-3"
      >
        <div>
          <span className="font-medium">Personal ID:</span> XXXXXXXX1234
        </div>
        <div>
          <span className="font-medium">Full name:</span> Nguyen Van A
        </div>
        <div>
          <span className="font-medium">Date of birth:</span> 01/01/1990
        </div>
        <div>
          <span className="font-medium">Digital ID level:</span> 2
        </div>
        <div>
          <span className="font-medium">Account type:</span> Personal
        </div>
      </motion.div>
    );
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6 text-center">VNeID Integration</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-center">Data Sharing Confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {/* VNeID Logo */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl"
                >
                  VNeID
                </motion.div>
                
                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center px-4">
                  <motion.div 
                    className="w-full h-0.5 bg-banking-grey relative"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      backgroundColor: ['#9ca3af', '#60a5fa', '#9ca3af'] 
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <motion.div 
                      className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-0.5 bg-banking-grey"
                      animate={{ backgroundColor: ['#9ca3af', '#60a5fa', '#9ca3af'] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <motion.div 
                      className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 -rotate-45 w-3 h-0.5 bg-banking-grey"
                      animate={{ backgroundColor: ['#9ca3af', '#60a5fa', '#9ca3af'] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                  </motion.div>
                </div>
                
                {/* SuperApp Logo */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 bg-gradient-to-br from-banking-blue to-banking-lightBlue rounded-xl flex items-center justify-center text-white font-bold text-xl"
                >
                  S
                </motion.div>
              </div>
              
              <div className="text-center mb-4">
                <p className="font-medium">Confirm information sharing to log in to SuperApp</p>
              </div>

              <div className="mb-5">
                <h3 className="font-medium mb-2">Mandatory shared information:</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground pl-2">
                  <motion.li 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Personal Identification Number
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Full name
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Date of birth
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Digital ID account level
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Account type
                  </motion.li>
                </ul>
              </div>
              
              <div className="mb-5">
                <h3 className="font-medium mb-2">Purpose of data sharing:</h3>
                <p className="text-sm text-muted-foreground">The above information fields are shared to perform SuperApp login and verification.</p>
              </div>
              
              {showInfo && renderSharedData()}
              
              <div className="flex items-center gap-2 my-4">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </motion.div>
                <label htmlFor="agreement" className="text-sm">
                  I have read and understood the purpose, rights and obligations of sharing data, and agree with the contents.
                </label>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  className="text-sm font-medium"
                  animate={countdown < 60 ? { 
                    color: ['#ef4444', '#ef4444', '#ef4444'],
                    scale: [1, 1.03, 1]
                  } : {}}
                  transition={{ repeat: countdown < 60 ? Infinity : 0, duration: 1 }}
                >
                  <span className="text-banking-red">Expiration time: </span>
                  <span>{formatTime(countdown)}</span>
                </motion.div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? 'Hide Information' : 'Show Information'}
                </Button>
              </div>
              
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full justify-center bg-gradient-to-r from-banking-blue to-banking-darkBlue"
                    onClick={handleConfirmSharing}
                    disabled={!agreed}
                  >
                    Confirm sharing
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full justify-center"
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Do not share
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
