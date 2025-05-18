
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Fingerprint, Settings, Shield, Scan } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const handleViewDetails = () => {
    navigate('/registration-details', { state: { nationalId } });
  };

  const getTabIcon = (tabId: TabId, isActive: boolean) => {
    const iconProps = { 
      size: 20, 
      className: isActive ? 'text-banking-blue' : 'text-muted-foreground',
    };
    
    switch (tabId) {
      case 'biometric': return <Scan {...iconProps} />;
      case 'devices': return <Fingerprint {...iconProps} />;
      case 'security': return <Shield {...iconProps} />;
      case 'permissions': return <Settings {...iconProps} />;
    }
  };

  return (
    <Layout showBackButton={true}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackToHome} 
          className="mb-4"
        >
          Back to Home
        </Button>
        
        <motion.div 
          className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-banking-blue/5 cursor-pointer hover:bg-banking-blue/10 transition-colors"
          onClick={handleViewDetails}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <motion.div 
            className="h-16 w-16 rounded-full bg-banking-blue/10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <User size={32} className="text-banking-blue" />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Profile Management</h1>
            <p className="text-muted-foreground">National ID: {nationalId.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}</p>
          </div>
          <Button 
            variant="ghost" 
            className="text-banking-blue"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md dark:bg-slate-900/90 backdrop-blur-xl border border-white/10">
            <Tabs defaultValue="biometric" className="w-full" onValueChange={(value) => setActiveTab(value as TabId)}>
              <TabsList className="grid grid-cols-4 mb-2">
                {(['biometric', 'devices', 'security', 'permissions'] as TabId[]).map((tab) => (
                  <motion.div 
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger value={tab} className="flex flex-col items-center py-3">
                      {getTabIcon(tab, activeTab === tab)}
                      <span className="text-xs mt-1">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
              
              <TabsContent value="biometric" className="p-4 focus:outline-none">
                <BiometricConfig />
              </TabsContent>
              
              <TabsContent value="devices" className="p-4 focus:outline-none">
                <DeviceManagement />
              </TabsContent>
              
              <TabsContent value="security" className="p-4 focus:outline-none">
                <SecurityControls />
              </TabsContent>
              
              <TabsContent value="permissions" className="p-4 focus:outline-none">
                <FeatureAuthorization />
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProfileManagement;
