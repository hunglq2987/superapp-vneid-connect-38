
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasAccount = location.state?.hasAccount;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  
  const validatePhoneNumber = (phone: string): boolean => {
    // Validation rules:
    // - Start with 0
    // - Length: 10 numbers
    // - Number format only
    return /^0\d{9}$/.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }
    
    setPhoneNumber(value);
    
    // Check if the phone number is valid
    const isValid = validatePhoneNumber(value);
    setIsValidPhone(isValid);
    
    if (value && !isValid) {
      setError('Please enter a valid 10-digit phone number starting with 0');
    } else {
      setError('');
    }
  };

  const handleNextStep = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number starting with 0');
      return;
    }
    
    setError('');

    // Route to different flows based on Phone Number
    switch (phoneNumber) {
      case '0123456789':
        // Case 1: Phone number is not existing to bank, National ID from VNeID is new to bank
        navigate('/verification-options', { state: { 
          phoneNumber, 
          nationalId: '444444444444',
          isExistingCustomer: false,
          isNewNationalId: true
        }});
        break;
      case '0223456789':
        // Case 2: Phone number is not existing to bank, National ID from VNeID is existing to bank
        navigate('/verification-options', { state: { 
          phoneNumber, 
          nationalId: '555555555555',
          isExistingCustomer: false,
          isNewNationalId: false
        }});
        break;
      case '0323456789':
        // Case 3: Phone number exists in bank, has biometric but facial verification fails
        navigate('/biometric-auth', { state: { 
          phoneNumber, 
          nationalId: '666666666666',
          isExistingCustomer: true,
          hasBiometric: true,
          biometricSuccess: false
        }});
        break;
      case '0423456789':
        // Case 3: Phone number exists in bank, has biometric and facial verification succeeds
        navigate('/biometric-auth', { state: { 
          phoneNumber, 
          nationalId: '777777777777',
          isExistingCustomer: true,
          hasBiometric: true,
          biometricSuccess: true
        }});
        break;
      case '0523456789':
        // Case 4: Phone number exists in bank, no biometric data available
        navigate('/verification-options', { state: { 
          phoneNumber, 
          nationalId: '888888888888',
          isExistingCustomer: true,
          hasBiometric: false
        }});
        break;
      default:
        // For demo purposes, default to Case 1
        navigate('/verification-options', { state: { 
          phoneNumber, 
          nationalId: '444444444444',
          isExistingCustomer: false,
          isNewNationalId: true
        }});
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRegisterVNeID = () => {
    // In a real app, this would redirect to the VNeID app or website
    toast("Redirecting to VNeID application...", {
      description: "You'll be redirected to download or open the VNeID application for registration.",
      action: {
        label: "Open App",
        onClick: () => console.log("Opening VNeID app")
      }
    });
    
    // Navigate to VNeID confirmation
    navigate('/vneid-confirmation');
  };

  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Customer Registration</h1>
        
        {hasAccount === false ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-center">New Account Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5 py-4">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      To create a new banking account, you'll need to register with VNeID first.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center py-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6"
                    >
                      VNeID
                    </motion.div>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowLeft className="rotate-180 text-banking-blue" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Benefits of VNeID registration:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <motion.li 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                        Secure digital identity verification
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                        Faster approval for banking services
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                        Access to multiple government services
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                        Enhanced security for your personal data
                      </motion.li>
                    </ul>
                  </div>
                  
                  <div className="pt-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform"
                        onClick={handleRegisterVNeID}
                      >
                        Register with VNeID
                      </Button>
                    </motion.div>
                    
                    <div className="text-center mt-4">
                      <Button 
                        variant="ghost"
                        onClick={handleBackToHome}
                        className="text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-center">Enter Phone Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Please enter your phone number"
                      className="input-field"
                      maxLength={10}
                    />
                    {error && <p className="text-banking-red text-sm mt-1">{error}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      For testing: Use 0123456789, 0223456789, 0323456789, 0423456789, 0523456789
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={!isValidPhone ? 'opacity-70' : ''}
                  >
                    <Button 
                      className="w-full mt-6 bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform"
                      onClick={handleNextStep}
                      disabled={!isValidPhone}
                    >
                      Next
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default RegistrationFlow;
