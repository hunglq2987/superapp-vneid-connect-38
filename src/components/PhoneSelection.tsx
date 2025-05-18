
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const PhoneSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nationalId, phones } = location.state || {};
  const [selectedPhone, setSelectedPhone] = useState('');
  
  const handlePhoneSelection = (phone: string) => {
    setSelectedPhone(phone);
  };

  const handleNextStep = () => {
    navigate('/otp-verification', { 
      state: { 
        nationalId,
        phone: selectedPhone
      } 
    });
  };

  const handleVNeIDRegistration = () => {
    navigate('/vneid-confirmation');
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Phone Number</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-center">Phone Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <p className="text-center text-muted-foreground">
                  Please select a phone number to receive OTP verification code
                </p>
                
                <div className="space-y-3 py-4">
                  {phones && phones.map((phone: string, index: number) => (
                    <motion.div
                      key={phone}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={selectedPhone === phone ? "default" : "outline"}
                        className={`w-full flex items-center justify-start gap-3 h-14 text-left ${
                          selectedPhone === phone 
                            ? "bg-banking-blue text-white"
                            : "hover:border-banking-blue/50"
                        }`}
                        onClick={() => handlePhoneSelection(phone)}
                      >
                        <div className={`w-10 h-10 rounded-full ${selectedPhone === phone ? "bg-white/20" : "bg-banking-lightGrey/20"} flex items-center justify-center`}>
                          <Phone size={20} />
                        </div>
                        <span>{phone}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue"
                      onClick={handleNextStep}
                      disabled={!selectedPhone}
                    >
                      <span>Continue</span>
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </motion.div>
                  
                  <div className="text-center mt-4">
                    <Button 
                      variant="link" 
                      onClick={handleVNeIDRegistration}
                      className="text-banking-blue"
                    >
                      Register with VNeID instead
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PhoneSelection;
