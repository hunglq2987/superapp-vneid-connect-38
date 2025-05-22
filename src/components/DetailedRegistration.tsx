import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

interface UserData {
  nationalId: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  accounts: Array<{
    type: string;
    name: string;
    balance?: string;
    limit?: string;
  }>;
}

const DetailedRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId, hasBiometric, fromVNeID, fromNfc } = location.state || {};
  
  // Get user data based on phoneNumber
  const getUserData = () => {
    // Case 2: Existing customer with existing National ID
    if (phoneNumber === '0223456789' || nationalId === '555555555555') {
      return {
        nationalId: nationalId || '555555555555',
        fullName: "Nguyen Van B",
        dateOfBirth: "01/01/1992",
        phone: phoneNumber || '0223456789',
        email: "",
        currentAddress: "123 Nguyen Hue, District 1, HCMC",
        permanentAddress: "123 Nguyen Hue, District 1, HCMC",
        accounts: [
          { type: "Payment", name: "Premium Checking Account", balance: "25,000,000 VND", limit: "N/A" },
          { type: "Deposit", name: "High Yield Savings", balance: "75,000,000 VND", limit: "N/A" },
          { type: "Credit", name: "Platinum Credit Card", balance: "8,500,000 VND", limit: "50,000,000 VND" },
          { type: "Investment", name: "Stock Portfolio", balance: "120,000,000 VND", limit: "N/A" }
        ]
      };
    }
    
    // Case 4, 5: Existing customer with biometric or without biometric
    if (phoneNumber === '0423456789' || phoneNumber === '0523456789' || 
        nationalId === '666666666666') {
      return {
        nationalId: nationalId || (phoneNumber === '0523456789' ? '666666666666' : '444444444444'),
        fullName: phoneNumber === '0423456789' ? "Nguyen Van D" : "Nguyen Van E",
        dateOfBirth: "01/01/1990",
        phone: phoneNumber || (phoneNumber === '0423456789' ? '0423456789' : '0523456789'),
        email: "",
        currentAddress: "456 Le Loi, District 1, HCMC",
        permanentAddress: "456 Le Loi, District 1, HCMC",
        accounts: [
          { type: "Payment", name: "Checking Account", balance: "15,000,000 VND", limit: "N/A" },
          { type: "Deposit", name: "Savings Account", balance: "75,000,000 VND", limit: "N/A" },
          { type: "Credit", name: "Platinum Card", balance: "2,500,000 VND", limit: "50,000,000 VND" }
        ]
      };
    }
    
    // Case 1: New customer with new National ID
    return {
      nationalId: nationalId || '444444444444',
      fullName: "Nguyen Van A",
      dateOfBirth: "01/01/1995",
      phone: phoneNumber || '0123456789',
      email: "",
      currentAddress: "",
      permanentAddress: "",
      accounts: []
    };
  };

  const [userData, setUserData] = useState<UserData>(getUserData());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // No need to validate read-only fields anymore
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    if (validateForm()) {
      toast.success("Registration details confirmed successfully!");
      navigate('/email-registration', { 
        state: { 
          phoneNumber, 
          nationalId,
          isExistingCustomer,
          isNewNationalId,
          hasBiometric,
          fromVNeID,
          fromNfc
        } 
      });
    } else {
      toast.error("Please complete all required fields");
    }
  };

  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Details</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nationalId" className="text-sm font-medium">National ID Number</Label>
              <Input
                id="nationalId"
                type="text"
                value={userData.nationalId}
                disabled
                className="bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">ID number cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={userData.fullName}
                disabled
                className="bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Full name cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="text"
                value={userData.dateOfBirth}
                disabled
                className="bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Date of birth cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={userData.phone}
                disabled
                className="bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Phone number cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email address (optional)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentAddress" className="text-sm font-medium">
                Living Address
              </Label>
              <Input
                id="currentAddress"
                type="text"
                value={userData.currentAddress}
                onChange={(e) => handleChange('currentAddress', e.target.value)}
                placeholder="Enter your living address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permanentAddress" className="text-sm font-medium">
                Permanent Address
              </Label>
              <Input
                id="permanentAddress"
                type="text"
                value={userData.permanentAddress}
                onChange={(e) => handleChange('permanentAddress', e.target.value)}
                placeholder="Enter your permanent address"
              />
            </div>
            
            {userData.accounts.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-medium">Your Accounts</h3>
                
                {userData.accounts.map((account, index) => (
                  <div key={index} className="p-3 bg-banking-lightGrey rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
                      </div>
                      <div className="text-right">
                        {account.balance && (
                          <p className="font-semibold">{account.balance}</p>
                        )}
                        {account.limit && (
                          <p className="text-xs text-muted-foreground">Limit: {account.limit}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="pt-4">
              <Button
                className="w-full mt-2"
                onClick={handleConfirm}
              >
                Confirm Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DetailedRegistration;
