
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
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
      toast.error('Please enter a valid phone number');
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
        // Case 3: Phone exists, has biometric but facial verification fails
        navigate('/biometric-auth', { state: { 
          phoneNumber, 
          nationalId: '666666666666',
          isExistingCustomer: true,
          hasBiometric: true,
          biometricSuccess: false
        }});
        break;
      case '0423456789':
        // Case 4: Phone exists, has biometric and facial verification succeeds
        navigate('/biometric-auth', { state: { 
          phoneNumber, 
          nationalId: '777777777777',
          isExistingCustomer: true,
          hasBiometric: true,
          biometricSuccess: true
        }});
        break;
      case '0523456789':
        // Case 5: Phone exists, no biometric data available
        navigate('/verification-options', { state: { 
          phoneNumber, 
          nationalId: '666666666666',
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

  return (
    <Layout showBackButton={true}>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Customer Registration</h1>
        
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
                  whileHover={{ scale: isValidPhone ? 1.02 : 1 }}
                  whileTap={{ scale: isValidPhone ? 0.98 : 1 }}
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default RegistrationFlow;
