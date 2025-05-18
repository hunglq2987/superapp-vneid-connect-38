
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { Fingerprint, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DeviceManagement: React.FC = () => {
  const handleDeleteDevice = (deviceId: number) => {
    toast.success(`Device removed successfully`);
  };

  const handleSetPrimary = (deviceId: number) => {
    toast.success(`Device set as primary successfully`);
  };

  const handleDeactivate = (deviceId: number) => {
    toast.success(`Biometric authentication deactivated`);
  };

  // Mock data for devices
  const devices = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      lastUsed: '2 hours ago',
      status: 'active',
      isPrimary: true
    },
    {
      id: 2,
      name: 'MacBook Pro',
      lastUsed: 'Today, 10:45 AM',
      status: 'active',
      isPrimary: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Biometric Authentication</h2>
        <p className="text-muted-foreground text-sm">Manage your biometric authentication methods</p>
        
        <div className="mt-4 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 py-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center">
                <Fingerprint className="mr-2 h-4 w-4" />
                Facial Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium">Face ID</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last used 2 hours ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleSetPrimary(1)}
                    className="text-xs h-8"
                  >
                    Set as primary
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeactivate(1)}
                    className="text-xs h-8 border-destructive/20 text-destructive hover:bg-destructive/10"
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 py-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center">
                <Fingerprint className="mr-2 h-4 w-4" />
                Fingerprint
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium">Touch ID</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      Secondary
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last used yesterday</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleSetPrimary(2)}
                    className="text-xs h-8"
                  >
                    Set as primary
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeactivate(2)}
                    className="text-xs h-8 border-destructive/20 text-destructive hover:bg-destructive/10"
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-1">Registered Devices</h2>
        <p className="text-muted-foreground text-sm">Manage your registered devices</p>
        
        <div className="mt-4 space-y-3">
          {devices.map((device) => (
            <motion.div
              key={device.id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{device.name}</h3>
                    {device.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Last active: {device.lastUsed}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteDevice(device.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <AlertTriangle className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-muted/30 p-4">
        <div className="flex items-start space-x-4">
          <div className="mt-0.5">
            <CheckCircle className="h-5 w-5 text-banking-blue" />
          </div>
          <div>
            <h3 className="font-medium">Security Tip</h3>
            <p className="text-sm text-muted-foreground">
              We recommend setting up at least two biometric authentication methods for improved account security and recovery options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
