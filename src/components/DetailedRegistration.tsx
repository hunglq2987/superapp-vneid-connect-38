import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserData {
  nationalId: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
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
  const [userData, setUserData] = useState<UserData>({
    nationalId: location.state?.nationalId || '',
    fullName: 'Nguyen Van A',
    dateOfBirth: '01/01/1990',
    phone: '+84981234567',
    email: 'user@example.com',
    accounts: [
      { type: 'payment', name: 'Checking Account', balance: '10,000,000 VND' },
      { type: 'deposit', name: 'Savings Account', balance: '50,000,000 VND' },
      { type: 'credit', name: 'Credit Card', limit: '20,000,000 VND', balance: '5,000,000 VND' }
    ]
  });

  useEffect(() => {
    // Initialize data from location state if available
    if (location.state?.nationalId) {
      setUserData(prev => ({
        ...prev,
        nationalId: location.state.nationalId
      }));
    }
  }, [location.state]);

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    navigate('/terms-conditions');
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
              <label className="text-sm font-medium">National ID Number</label>
              <input
                type="text"
                value={userData.nationalId}
                disabled
                className="input-field bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">ID number cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <input
                type="text"
                value={userData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="input-field"
              />
            </div>
            
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
            
            <div className="pt-4">
              <Button
                fullWidth
                onClick={handleConfirm}
                className="mt-2"
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
