
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const VNeIDConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { hasAccount, phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, nextRoute } = location.state || {};

  const handleVNeIDProcess = () => {
    setLoading(true);
    
    toast("Opening VNeID application for verification...", {
      duration: 3000,
    });
    
    // Simulate VNeID verification process
    setTimeout(() => {
      setLoading(false);
      
      toast.success("VNeID verification completed successfully!");
      
      // Determine next route based on state
      if (nextRoute) {
        navigate(nextRoute, { 
          state: { 
            phoneNumber, 
            nationalId,
            isExistingCustomer,
            isNewNationalId,
            hasBiometric
          } 
        });
      } else if (hasAccount === false) {
        navigate('/registration', { state: { hasAccount: true } });
      } else {
        navigate('/otp-verification', { 
          state: { 
            phoneNumber, 
            nationalId 
          } 
        });
      }
    }, 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Automatically start the VNeID process after a short delay for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleVNeIDProcess();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="py-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          disabled={loading}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="text-center space-y-6">
          <div className="bg-blue-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
            <div className="text-2xl font-bold text-banking-blue">VNeID</div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">VNeID Verification</h1>
            <p className="text-muted-foreground mt-2">
              Opening VNeID application for secure verification
            </p>
          </div>
          
          <div className="max-w-xs mx-auto pt-4">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                <div 
                  className="animate-pulse shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-banking-blue"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {loading ? "Verifying your identity..." : "Connecting to VNeID..."}
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6">
              The VNeID app will open automatically to complete the verification process.
              Please follow the instructions in the app.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VNeIDConfirmation;
