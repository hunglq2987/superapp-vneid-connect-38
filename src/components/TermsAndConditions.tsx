import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accepted, setAccepted] = useState(false);
  const userData = location.state || {};
  
  const handleAcceptTerms = () => {
    if (!accepted) {
      toast.error("Please accept the terms and conditions to proceed");
      return;
    }
    
    // Navigate to Email Registration after accepting terms and conditions
    navigate('/email-registration', { 
      state: userData
    });
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4 text-center">Terms & Conditions</h1>
        
        <Card className="mb-6 max-h-[60vh] overflow-y-auto">
          <CardContent className="pt-6">
            <div className="prose prose-sm dark:prose-invert text-xs">
              <h3 className="text-base font-medium">Terms and Conditions for SuperApp</h3>
              <p className="text-sm">Please read these terms and conditions carefully before using SuperApp services.</p>
              
              <h4 className="text-sm font-medium mt-3">1. User Agreement</h4>
              <p className="text-xs">By accessing or using SuperApp services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>
              
              <h4 className="text-sm font-medium mt-3">2. Account Registration</h4>
              <p className="text-xs">Users must register with accurate, complete, and updated information. You are solely responsible for maintaining the confidentiality of your account and password.</p>
              
              <h4 className="text-sm font-medium mt-3">3. Privacy Policy</h4>
              <p className="text-xs">Your use of SuperApp is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Our Privacy Policy outlines how we collect, use, and share your personal information.</p>
              
              <h4 className="text-sm font-medium mt-3">4. Service Modifications</h4>
              <p className="text-xs">SuperApp reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
              
              <h4 className="text-sm font-medium mt-3">5. User Obligations</h4>
              <p className="text-xs">You agree not to use the service for any illegal or unauthorized purpose. You must not transmit worms or viruses or any code of a destructive nature.</p>
              
              <h4 className="text-sm font-medium mt-3">6. Service Availability</h4>
              <p className="text-xs">SuperApp will strive to ensure that its services are available 24 hours a day. However, we will not be liable if for any reason the service is unavailable at any time or for any period.</p>
              
              <h4 className="text-sm font-medium mt-3">7. Security</h4>
              <p className="text-xs">While we strive to protect your personal information, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures.</p>
              
              <h4 className="text-sm font-medium mt-3">8. Biometric Authentication</h4>
              <p className="text-xs">SuperApp offers biometric authentication features. You understand that by enabling these features, your biometric data will be processed by your device and/or our application. The biometric data collected will be used solely for the purpose of authenticating your identity when accessing your account.</p>
              
              <h4 className="text-sm font-medium mt-3">9. VNeID Integration</h4>
              <p className="text-xs">SuperApp may integrate with VNeID for identity verification purposes. By using this feature, you consent to the sharing of personal information between VNeID and SuperApp as specified during the verification process.</p>
              
              <h4 className="text-sm font-medium mt-3">10. Termination</h4>
              <p className="text-xs">SuperApp reserves the right to terminate or suspend your account at any time without prior notice for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
              
              <h4 className="text-sm font-medium mt-3">11. Governing Law</h4>
              <p className="text-xs">These Terms shall be governed and construed in accordance with the laws of Vietnam, without regard to its conflict of law provisions.</p>
              
              <h4 className="text-sm font-medium mt-3">12. Changes to Terms</h4>
              <p className="text-xs">We reserve the right to modify these terms at any time. You are responsible for reviewing these Terms periodically to ensure you are aware of any changes.</p>
              
              <h4 className="text-sm font-medium mt-3">13. Contact Information</h4>
              <p className="text-xs">If you have any questions about these Terms, please contact us at support@superapp.com.</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="terms" 
            checked={accepted}
            onCheckedChange={(checked) => {
              setAccepted(checked === true);
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm leading-none cursor-pointer"
          >
            I have read and agree to the terms and conditions
          </label>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full"
            disabled={!accepted}
            onClick={handleAcceptTerms}
          >
            Accept and Continue
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
