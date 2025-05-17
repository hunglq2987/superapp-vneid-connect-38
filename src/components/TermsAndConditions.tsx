
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [showingSection, setShowingSection] = useState<string | null>('general');
  
  const handleAcceptTerms = () => {
    if (!accepted) {
      toast.error("Please accept the terms and conditions to continue");
      return;
    }
    
    // Simulate successful registration
    toast.success("Registration successful!");
    
    // Navigate to home with success message
    setTimeout(() => {
      navigate('/', { 
        state: { registrationComplete: true } 
      });
    }, 1500);
  };

  const renderTermsSection = () => {
    if (showingSection === 'general') {
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">General Terms & Conditions</h3>
          
          <p>
            These Terms and Conditions govern your use of the SuperApp banking mobile application 
            (the "App") and related services provided by SuperApp Financial Institution ("we", "us", or "our").
          </p>
          
          <h4 className="font-medium text-base mt-4">1. Acceptance of Terms</h4>
          <p>
            By registering, accessing or using the App, you agree to be bound by these Terms and Conditions. 
            If you do not agree, please do not use the App.
          </p>
          
          <h4 className="font-medium text-base mt-4">2. Account Registration</h4>
          <p>
            2.1 To use our services, you must register for an account. You agree to provide accurate and 
            complete information during the registration process.
          </p>
          <p>
            2.2 You are responsible for maintaining the confidentiality of your account credentials and for 
            all activities that occur under your account.
          </p>
          
          <h4 className="font-medium text-base mt-4">3. Services</h4>
          <p>
            3.1 The App provides banking services which may include viewing account balances, transferring funds, 
            making payments, and applying for financial products.
          </p>
          <p>
            3.2 We reserve the right to modify, suspend, or discontinue any service at any time without notice.
          </p>
          
          <h4 className="font-medium text-base mt-4">4. Privacy</h4>
          <p>
            4.1 Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
            your personal information.
          </p>
          <p>
            4.2 By using the App, you agree to our collection and use of your information as described in our Privacy Policy.
          </p>
        </div>
      );
    } else if (showingSection === 'security') {
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Security Terms</h3>
          
          <p>
            At SuperApp, we implement robust security measures to protect your banking data and transactions.
          </p>
          
          <h4 className="font-medium text-base mt-4">1. Biometric Authentication</h4>
          <p>
            1.1 The App uses biometric authentication methods including facial recognition and fingerprint 
            verification to ensure secure access to your account.
          </p>
          <p>
            1.2 You agree to maintain the security of your biometric data and not allow others to register 
            their biometrics for your account.
          </p>
          
          <h4 className="font-medium text-base mt-4">2. NFC Technology</h4>
          <p>
            2.1 Our App uses Near Field Communication (NFC) technology to securely read data from your 
            identification documents.
          </p>
          <p>
            2.2 You consent to the App accessing your device's NFC capabilities to process your identification 
            information during registration and verification.
          </p>
          
          <h4 className="font-medium text-base mt-4">3. Security Obligations</h4>
          <p>
            3.1 You agree to install updates promptly when available, as they may contain critical security patches.
          </p>
          <p>
            3.2 You must notify us immediately of any unauthorized use of your account or any other security breach.
          </p>
        </div>
      );
    } else if (showingSection === 'compliance') {
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Regulatory Compliance</h3>
          
          <p>
            SuperApp adheres to all applicable banking regulations and compliance requirements.
          </p>
          
          <h4 className="font-medium text-base mt-4">1. Vietnam Civil Code Compliance</h4>
          <p>
            1.1 These Terms form an electronic contract in accordance with the Vietnam Civil Code.
          </p>
          <p>
            1.2 Your acceptance of these Terms constitutes a legally binding agreement between you and SuperApp.
          </p>
          
          <h4 className="font-medium text-base mt-4">2. Consumer Protection</h4>
          <p>
            2.1 You have rights under consumer protection laws, which these Terms do not limit or exclude.
          </p>
          <p>
            2.2 We provide transparent fee structures and service information in compliance with consumer protection regulations.
          </p>
          
          <h4 className="font-medium text-base mt-4">3. State Bank of Vietnam (SBV) Policy</h4>
          <p>
            3.1 Our services comply with all SBV regulations regarding digital banking and financial transactions.
          </p>
          <p>
            3.2 Any updates to SBV policies that affect our services will be communicated to you promptly.
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Layout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Terms & Conditions</h1>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Terms of Service</CardTitle>
              <div className="flex items-center space-x-2 text-sm">
                <button 
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-banking-blue text-white' : 'bg-secondary'}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button 
                  className={`px-2 py-1 rounded ${language === 'vi' ? 'bg-banking-blue text-white' : 'bg-secondary'}`}
                  onClick={() => setLanguage('vi')}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>
          </CardHeader>
          
          <div className="flex border-b">
            <button 
              className={`flex-1 py-2 text-center text-sm font-medium ${showingSection === 'general' ? 'text-banking-blue border-b-2 border-banking-blue' : 'text-muted-foreground'}`}
              onClick={() => setShowingSection('general')}
            >
              General
            </button>
            <button 
              className={`flex-1 py-2 text-center text-sm font-medium ${showingSection === 'security' ? 'text-banking-blue border-b-2 border-banking-blue' : 'text-muted-foreground'}`}
              onClick={() => setShowingSection('security')}
            >
              Security
            </button>
            <button 
              className={`flex-1 py-2 text-center text-sm font-medium ${showingSection === 'compliance' ? 'text-banking-blue border-b-2 border-banking-blue' : 'text-muted-foreground'}`}
              onClick={() => setShowingSection('compliance')}
            >
              Compliance
            </button>
          </div>
          
          <CardContent className="py-4">
            <div className="h-64 overflow-y-auto pr-2 text-sm">
              {renderTermsSection()}
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                I have read and agree to the Terms and Conditions
              </label>
            </div>
            
            <div className="text-xs text-muted-foreground mt-2">
              By accepting, you confirm your agreement to version 1.0 of our Terms and Conditions, dated May 17, 2025.
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              className="flex-1"
              onClick={handleAcceptTerms}
            >
              Accept & Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
