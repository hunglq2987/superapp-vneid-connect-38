
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, ArrowRight, Fingerprint } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleNfcVerification = () => {
    navigate('/nfc-verification');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    if (!/^\d{12}$/.test(nationalId)) {
      setError('Please enter a valid 12-digit National ID');
      return;
    }

    setError('');
    navigate('/profile-management', { state: { nationalId }});
    setShowLoginModal(false);
  };
  
  const handleCloseModal = () => {
    setShowLoginModal(false);
    setNationalId('');
    setError('');
  };
  
  return (
    <Layout footer={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Logo size="lg" />
          <h1 className="text-3xl font-bold mt-6">SuperApp</h1>
          <p className="text-muted-foreground">Modern Banking Experience</p>
        </div>

        <div className="space-y-4 w-full max-w-xs">
          <Button 
            className="w-full hover:scale-105 transition-transform shadow-md"
            size="lg" 
            onClick={handleRegistration}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Register Now
              </div>
              <ArrowRight className="h-4 w-4 animate-pulse-soft" />
            </div>
          </Button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-3 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <Button 
            className="w-full hover:scale-105 transition-transform shadow-md"
            variant="secondary" 
            size="lg" 
            onClick={handleNfcVerification}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  <rect x="8" y="6" width="8" height="4" rx="1" />
                </svg>
                NFC Verification
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground text-center mt-8">
          <p>Already have an account? <button className="text-banking-blue font-medium hover:underline" onClick={handleLoginClick}>Sign In</button></p>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">Login</h2>
                  <p className="text-muted-foreground">Enter your National ID to continue</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="nationalId" className="text-sm font-medium">National ID</label>
                  <input
                    id="nationalId"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter your 12-digit ID"
                    className="input-field"
                    maxLength={12}
                  />
                  {error && <p className="text-banking-red text-sm">{error}</p>}
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <Button onClick={handleLogin}>Login</Button>
                  <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default HomeScreen;
