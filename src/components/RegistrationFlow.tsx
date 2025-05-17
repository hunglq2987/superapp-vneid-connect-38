
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');
  
  const handleHasAccountSelection = (value: boolean) => {
    setHasAccount(value);
    
    if (!value) {
      // Redirect to VNeID if they don't have a bank account
      navigate('/vneid-confirmation');
    }
  };

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
        navigate('/otp-verification', { state: { nationalId, phones: ['+84981234567', '+84987654321'] } });
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

  const renderInitialQuestion = () => {
    return (
      <div className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl text-center">Account Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">Do you have a bank account at NCB?</p>
          <div className="space-y-3">
            <Button
              fullWidth
              onClick={() => handleHasAccountSelection(true)}
              className="justify-center"
            >
              Yes, I have an NCB account
            </Button>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => handleHasAccountSelection(false)}
              className="justify-center"
            >
              No, I don't have an account
            </Button>
          </div>
        </CardContent>
      </div>
    );
  };

  const renderNationalIdInput = () => {
    return (
      <div className="animate-fade-in">
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
                For testing: Use 111111111111, 222222222222, or 333333333333
              </p>
            </div>

            <Button 
              fullWidth
              onClick={handleNextStep}
              disabled={!nationalId}
              className="mt-6"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </div>
    );
  };

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Customer Registration</h1>
        <Card className="shadow-md">
          {hasAccount === null ? renderInitialQuestion() : renderNationalIdInput()}
        </Card>
      </div>
    </Layout>
  );
};

export default RegistrationFlow;
