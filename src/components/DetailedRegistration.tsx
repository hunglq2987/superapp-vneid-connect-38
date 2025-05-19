
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
  const { phoneNumber, nationalId, isExistingCustomer, isNewNationalId } = location.state || {};
  
  const [userData, setUserData] = useState<UserData>({
    nationalId: nationalId || '',
    fullName: isNewNationalId ? '' : 'Nguyen Van A',
    dateOfBirth: isNewNationalId ? '' : '01/01/1990',
    phone: phoneNumber || '',
    email: isNewNationalId ? '' : 'user@example.com',
    currentAddress: '',
    permanentAddress: '',
    accounts: isExistingCustomer ? [
      { type: 'payment', name: 'Checking Account', balance: '10,000,000 VND' },
      { type: 'deposit', name: 'Savings Account', balance: '50,000,000 VND' },
      { type: 'credit', name: 'Credit Card', limit: '20,000,000 VND', balance: '5,000,000 VND' }
    ] : []
  });

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
    
    // Required fields validation
    if (!userData.fullName) errors.fullName = 'Full name is required';
    if (!userData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!userData.email) errors.email = 'Email is required';
    if (!userData.currentAddress) errors.currentAddress = 'Current address is required';
    if (!userData.permanentAddress) errors.permanentAddress = 'Permanent address is required';
    
    // Simple email validation
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      toast.success("Registration details confirmed successfully!");
      navigate('/terms-conditions');
    } else {
      toast.error("Please complete all required fields");
    }
  };

  return (
    <Layout>
      <div className="py-4">
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
                Full Name <span className="text-banking-red">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                value={userData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={formErrors.fullName ? "border-banking-red" : ""}
                placeholder="Enter your full name"
              />
              {formErrors.fullName && (
                <p className="text-banking-red text-sm">{formErrors.fullName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                Date of Birth <span className="text-banking-red">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="text"
                value={userData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className={formErrors.dateOfBirth ? "border-banking-red" : ""}
                placeholder="DD/MM/YYYY"
              />
              {formErrors.dateOfBirth && (
                <p className="text-banking-red text-sm">{formErrors.dateOfBirth}</p>
              )}
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
                Email Address <span className="text-banking-red">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={formErrors.email ? "border-banking-red" : ""}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="text-banking-red text-sm">{formErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentAddress" className="text-sm font-medium">
                Current Address <span className="text-banking-red">*</span>
              </Label>
              <Input
                id="currentAddress"
                type="text"
                value={userData.currentAddress}
                onChange={(e) => handleChange('currentAddress', e.target.value)}
                className={formErrors.currentAddress ? "border-banking-red" : ""}
                placeholder="Enter your current address"
              />
              {formErrors.currentAddress && (
                <p className="text-banking-red text-sm">{formErrors.currentAddress}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permanentAddress" className="text-sm font-medium">
                Permanent Address <span className="text-banking-red">*</span>
              </Label>
              <Input
                id="permanentAddress"
                type="text"
                value={userData.permanentAddress}
                onChange={(e) => handleChange('permanentAddress', e.target.value)}
                className={formErrors.permanentAddress ? "border-banking-red" : ""}
                placeholder="Enter your permanent address"
              />
              {formErrors.permanentAddress && (
                <p className="text-banking-red text-sm">{formErrors.permanentAddress}</p>
              )}
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
