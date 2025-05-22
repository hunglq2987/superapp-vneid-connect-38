
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const EmailRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric } = location.state || {};

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value, confirmEmail);
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
    validateEmail(email, e.target.value);
  };

  const validateEmail = (email: string, confirmEmail: string) => {
    if (email && !(/^\S+@\S+\.\S+$/.test(email))) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    if (confirmEmail && email !== confirmEmail) {
      setEmailError('Email addresses do not match');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const handleSubmit = () => {
    if (email && !validateEmail(email, confirmEmail)) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Email registration successful!");
      
      // Navigate to registration complete
      navigate('/registration-complete', { 
        state: { 
          phoneNumber, 
          nationalId,
          isExistingCustomer,
          isNewNationalId,
          hasBiometric,
          email
        } 
      });
    }, 1000);
  };

  const handleSkip = () => {
    toast.info("You can add an email later in your profile settings");
    
    // Navigate to registration complete
    navigate('/registration-complete', { 
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
    <Layout>
      <div className="py-6 px-4 flex flex-col min-h-[80vh]">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="mb-6 self-start flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold">Email Registration</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-md mx-auto">
            Register your email address to receive important notifications and statements from the bank
          </p>
        </motion.div>
        
        <Card className="mb-6 mx-auto w-full max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Email Details</CardTitle>
            <CardDescription>
              Get timely updates about your account activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={handleEmailChange}
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirm Email Address</Label>
              <Input 
                id="confirmEmail" 
                type="email" 
                value={confirmEmail} 
                onChange={handleConfirmEmailChange}
                placeholder="Confirm your email address"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {emailError}
                </p>
              )}
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms} 
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-tight">
                I agree to receive communication from the bank via this email address, 
                including statements, notifications, and promotional offers
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/30 p-3 rounded-lg mb-6 mx-auto w-full max-w-md">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium">Benefits of registering your email:</span>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• Instant transaction notifications</li>
                <li>• Monthly e-statements</li>
                <li>• Important account alerts</li>
                <li>• Special offers and promotions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-auto space-y-3 mx-auto w-full max-w-md">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              disabled={isSubmitting || (!!email && (!confirmEmail || !!emailError))}
            >
              {isSubmitting ? 'Registering...' : 'Register Email'}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleSkip} 
              variant="outline"
              className="w-full"
              disabled={isSubmitting}
            >
              Skip for Now
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailRegistration;
