
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Phone, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface PhoneOption {
  id: string;
  number: string;
  type: string;
}

const PhoneSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [showNoMatchDialog, setShowNoMatchDialog] = useState(false);
  const nationalId = location.state?.nationalId || '222222222222';
  
  // Demo phone data - for case with National ID 222222222222
  const phoneOptions: PhoneOption[] = nationalId === '222222222222' 
    ? [
        { id: 'phone1', number: '+84 901 234 567', type: 'Personal' },
        { id: 'phone2', number: '+84 902 345 678', type: 'Work' },
      ] 
    : [];
  
  const handleNext = () => {
    if (selectedPhone) {
      const selectedPhoneNumber = phoneOptions.find(p => p.id === selectedPhone)?.number || "";
      navigate('/otp-verification', { 
        state: { 
          nationalId,
          phone: selectedPhoneNumber // Using 'phone' as the key to match what OtpVerification expects
        } 
      });
    } else {
      // If no phone is selected, show the "No phone matched" dialog
      setShowNoMatchDialog(true);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleRegisterWithVNeID = () => {
    navigate('/vneid-confirmation', { state: { hasAccount: false } });
  };

  const closeNoMatchDialog = () => {
    setShowNoMatchDialog(false);
  };
  
  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Select Phone Number</h1>
            <p className="text-muted-foreground">
              Select a phone number for verification
            </p>
          </div>
          
          {phoneOptions.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <RadioGroup
                  value={selectedPhone || ""}
                  onValueChange={setSelectedPhone}
                  className="space-y-3"
                >
                  {phoneOptions.map(phone => (
                    <motion.div 
                      key={phone.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center space-x-2 cursor-pointer border rounded-lg p-3 hover:bg-secondary"
                      onClick={() => setSelectedPhone(phone.id)}
                    >
                      <RadioGroupItem value={phone.id} id={phone.id} />
                      <Label 
                        htmlFor={phone.id} 
                        className="flex-1 flex items-center cursor-pointer"
                      >
                        <div className="rounded-full bg-secondary p-2 mr-3">
                          <Phone size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">{phone.number}</div>
                          <div className="text-sm text-muted-foreground">{phone.type}</div>
                        </div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-10 space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center"
              >
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </motion.div>
              <h2 className="text-xl font-semibold">No phone matched</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                We couldn't find any registered phone numbers for your National ID.
              </p>
              <motion.div 
                className="pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button onClick={handleRegisterWithVNeID} variant="outline" className="text-banking-blue">
                  Register with VNeID instead
                </Button>
              </motion.div>
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              onClick={handleNext} 
              className="w-full"
            >
              Continue to Verification
            </Button>
          </div>
        </div>
      </div>

      {/* No Phone Match Dialog */}
      <Dialog open={showNoMatchDialog} onOpenChange={setShowNoMatchDialog}>
        <DialogContent className="apple-dialog">
          <DialogHeader>
            <DialogTitle className="apple-title">No Phone Matched</DialogTitle>
            <DialogDescription className="apple-text pt-2">
              None of the phone numbers on your device match our records. Would you like to register with VNeID instead?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={closeNoMatchDialog}
              className="apple-button w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegisterWithVNeID}
              className="apple-button w-full sm:w-auto"
            >
              Register with VNeID
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PhoneSelection;
