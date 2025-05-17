
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Logo from './ui/Logo';
import { Button } from '@/components/ui/button';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleNfcVerification = () => {
    navigate('/nfc-verification');
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
            className="w-full"
            size="lg" 
            onClick={handleRegistration}
          >
            Register Now
          </Button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-3 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <Button 
            className="w-full"
            variant="secondary" 
            size="lg" 
            onClick={handleNfcVerification}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 16C6.79086 16 5 17.7909 5 20H19C19 17.7909 17.2091 16 15 16H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            NFC Verification
          </Button>
        </div>

        <div className="text-sm text-muted-foreground text-center mt-8">
          <p>Already have an account? <button className="text-banking-blue font-medium" onClick={() => alert("Login functionality will be available soon!")}>Sign In</button></p>
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
