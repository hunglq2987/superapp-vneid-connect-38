
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Fingerprint, Settings, Shield, Scan } from 'lucide-react';
import BiometricConfig from './profile/BiometricConfig';
import DeviceManagement from './profile/DeviceManagement';
import SecurityControls from './profile/SecurityControls';
import FeatureAuthorization from './profile/FeatureAuthorization';

type TabId = 'biometric' | 'devices' | 'security' | 'permissions';

const ProfileManagement: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nationalId = location.state?.nationalId || '111111111111';
  const [activeTab, setActiveTab] = useState<TabId>('biometric');

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="py-4">
        <div className="flex items-center justify-between mb-4">
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
        
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-banking-lightGrey flex items-center justify-center">
            <User size={32} className="text-banking-grey" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Profile Management</h1>
            <p className="text-muted-foreground">National ID: {nationalId.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}</p>
          </div>
        </div>
        
        <Card className="shadow-md">
          <Tabs defaultValue="biometric" className="w-full" onValueChange={(value) => setActiveTab(value as TabId)}>
            <TabsList className="grid grid-cols-4 mb-2">
              <TabsTrigger value="biometric" className="flex flex-col items-center py-3">
                <Scan size={20} className={activeTab === 'biometric' ? 'text-banking-blue' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Biometric</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex flex-col items-center py-3">
                <Fingerprint size={20} className={activeTab === 'devices' ? 'text-banking-blue' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Devices</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex flex-col items-center py-3">
                <Shield size={20} className={activeTab === 'security' ? 'text-banking-blue' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Security</span>
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex flex-col items-center py-3">
                <Settings size={20} className={activeTab === 'permissions' ? 'text-banking-blue' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Permissions</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="biometric" className="p-4">
              <BiometricConfig />
            </TabsContent>
            
            <TabsContent value="devices" className="p-4">
              <DeviceManagement />
            </TabsContent>
            
            <TabsContent value="security" className="p-4">
              <SecurityControls />
            </TabsContent>
            
            <TabsContent value="permissions" className="p-4">
              <FeatureAuthorization />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileManagement;
