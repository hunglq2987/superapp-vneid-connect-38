
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { User, ArrowRight, Fingerprint, ChevronsRight, HelpCircle, BookOpen, Info, CheckCircle, XCircle } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAccountQuestion, setShowAccountQuestion] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    setShowAccountQuestion(true);
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

  const handleCloseAccountQuestion = () => {
    setShowAccountQuestion(false);
  };
  
  const handleHasAccount = () => {
    setShowAccountQuestion(false);
    navigate('/registration');
  };
  
  const handleNoAccount = () => {
    setShowAccountQuestion(false);
    // Navigate to a different flow for non-account holders
    navigate('/registration', { state: { hasAccount: false } });
  };
  
  return (
    <Layout footer={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-10 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="relative">
            <Logo size="lg" />
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
              <div className="animate-pulse-soft bg-banking-blue text-white px-2 py-1 rounded-full text-xs font-bold">
                Secure
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-banking-blue to-banking-darkBlue bg-clip-text text-transparent">SuperApp</h1>
          <p className="text-muted-foreground">Modern Banking Experience</p>
        </div>

        <div className="space-y-4 w-full max-w-xs">
          <Button 
            className="w-full hover:scale-105 transition-transform shadow-lg bg-gradient-to-r from-banking-blue to-banking-darkBlue"
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
            className="w-full hover:scale-105 transition-transform shadow-lg"
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
                  <Button 
                    onClick={handleLogin} 
                    className="bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:opacity-90 transition-opacity"
                  >
                    Login
                  </Button>
                  <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Dialog open={showAccountQuestion} onOpenChange={handleCloseAccountQuestion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Do you have a bank account at NCB?</DialogTitle>
            <DialogDescription>
              Please select one of the options below to continue with the appropriate registration process.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              onClick={handleHasAccount}
              className="flex justify-between items-center p-4 h-auto text-left"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-banking-green" />
                <div>
                  <p className="font-medium">Already have accounts</p>
                  <p className="text-sm text-muted-foreground">Continue with existing account</p>
                </div>
              </div>
              <ChevronsRight className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Button 
              onClick={handleNoAccount}
              className="flex justify-between items-center p-4 h-auto text-left"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-banking-red" />
                <div>
                  <p className="font-medium">Do not have an account</p>
                  <p className="text-sm text-muted-foreground">Create a new banking relationship</p>
                </div>
              </div>
              <ChevronsRight className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          
          <DialogFooter className="flex items-center justify-center">
            <Button variant="ghost" onClick={handleCloseAccountQuestion}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default HomeScreen;
