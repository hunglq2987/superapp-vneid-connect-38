
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasAccount = location.state?.hasAccount;
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');
  
  const validateNationalId = (id: string): boolean => {
    // Simple validation for 12-digit ID
    return /^\d{12}$/.test(id);
  };

  const handleNextStep = () => {
    if (!validateNationalId(nationalId)) {
      setError('Please enter a valid 12-digit National ID');
      return;
    }
    
    setError('');

    // Route to different flows based on National ID
    switch (nationalId) {
      case '111111111111':
        // Biometric data exists
        navigate('/detailed-registration', { state: { nationalId, hasValidBiometric: true } });
        break;
      case '222222222222':
        // Multiple phone numbers, needs OTP
        navigate('/otp-verification', { state: { 
          nationalId, 
          phones: ['+84 981 234 567', '+84 987 654 321'] 
        }});
        break;
      case '333333333333':
        // No data, redirect to VNeID
        navigate('/vneid-confirmation');
        break;
      default:
        // For demo purposes, let's assume it's case 1 (biometric exists)
        navigate('/detailed-registration', { state: { nationalId, hasValidBiometric: true } });
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
    
    // Simulate app redirection after a short delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToHome}
            className="gap-1"
          >
            <ArrowLeft size={16} />
            Back to home
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Customer Registration</h1>
        
        {hasAccount === false ? (
          <Card className="shadow-md">
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
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                    VNeID
                  </div>
                  <ArrowLeft className="rotate-180 text-banking-blue animate-pulse-soft" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-center">Benefits of VNeID registration:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                      Secure digital identity verification
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                      Faster approval for banking services
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                      Access to multiple government services
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                      Enhanced security for your personal data
                    </li>
                  </ul>
                </div>
                
                <div className="pt-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform"
                    onClick={handleRegisterVNeID}
                  >
                    Register with VNeID
                  </Button>
                  
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
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-center">Enter National ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="nationalId" className="text-sm font-medium">
                    National ID Number
                  </label>
                  <input
                    id="nationalId"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter your 12-digit ID"
                    className="input-field"
                    maxLength={12}
                  />
                  {error && <p className="text-banking-red text-sm mt-1">{error}</p>}
                  <p className="text-xs text-muted-foreground mt-1">
                    For testing: Use 111111111111 (biometric), 222222222222 (multiple phones), or 333333333333 (VNeID)
                  </p>
                </div>

                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform"
                  onClick={handleNextStep}
                  disabled={!nationalId}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default RegistrationFlow;
