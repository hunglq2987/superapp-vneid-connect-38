
import React, { useState } from 'react';
import { Check, Smartphone, Laptop, Tablet, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  os: string;
  registered: string;
  lastUsed: string;
  isPrimary: boolean;
  isCurrentDevice: boolean;
  biometrics: string[];
  status: 'active' | 'suspicious' | 'inactive';
}

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'device1',
      name: 'iPhone 14 Pro',
      icon: <Smartphone className="h-5 w-5" />,
      type: 'Mobile',
      os: 'iOS 16.5',
      registered: '15 May 2023',
      lastUsed: 'Current session',
      isPrimary: true,
      isCurrentDevice: true,
      biometrics: ['Face ID', 'Touch ID'],
      status: 'active'
    },
    {
      id: 'device2',
      name: 'MacBook Pro',
      icon: <Laptop className="h-5 w-5" />,
      type: 'Laptop',
      os: 'MacOS 14.2',
      registered: '23 Jan 2023',
      lastUsed: '3 days ago',
      isPrimary: false,
      isCurrentDevice: false,
      biometrics: ['Touch ID'],
      status: 'active'
    },
    {
      id: 'device3',
      name: 'iPad Air',
      icon: <Tablet className="h-5 w-5" />,
      type: 'Tablet',
      os: 'iPadOS 16.3',
      registered: '10 Mar 2023',
      lastUsed: '2 weeks ago',
      isPrimary: false,
      isCurrentDevice: false,
      biometrics: ['Touch ID'],
      status: 'inactive'
    },
    {
      id: 'device4',
      name: 'Unknown Android Device',
      icon: <Smartphone className="h-5 w-5" />,
      type: 'Mobile',
      os: 'Android 12',
      registered: '2 days ago',
      lastUsed: '1 day ago',
      isPrimary: false,
      isCurrentDevice: false,
      biometrics: ['Fingerprint'],
      status: 'suspicious'
    }
  ]);

  const handleDeactivate = (deviceId: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'inactive' as const } 
          : device
      )
    );
  };

  const handleSetPrimary = (deviceId: string) => {
    setDevices(prev => 
      prev.map(device => ({
        ...device,
        isPrimary: device.id === deviceId
      }))
    );
  };

  const getStatusBadge = (status: Device['status']) => {
    switch (status) {
      case 'active':
        return <span className="text-banking-green flex items-center gap-1">
          <Check className="h-3 w-3" /> Active
        </span>;
      case 'inactive':
        return <span className="text-banking-grey flex items-center gap-1">
          <X className="h-3 w-3" /> Inactive
        </span>;
      case 'suspicious':
        return <span className="text-banking-red flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> Suspicious
        </span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-2">Device Management</h2>
        <p className="text-muted-foreground">Manage the devices that can access your account</p>
      </div>

      <div className="space-y-4">
        {devices.map(device => (
          <div key={device.id} className={`p-4 border rounded-lg ${
            device.status === 'suspicious' ? 'border-banking-red/20 bg-banking-red/5' :
            device.isCurrentDevice ? 'border-banking-blue/20 bg-banking-blue/5' : 'bg-white'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className={`p-2 rounded-full ${
                  device.status === 'suspicious' ? 'bg-banking-red/10 text-banking-red' :
                  device.status === 'inactive' ? 'bg-banking-grey/10 text-banking-grey' :
                  'bg-banking-blue/10 text-banking-blue'
                } mr-3`}>
                  {device.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{device.name}</p>
                    {device.isPrimary && (
                      <span className="ml-2 px-2 py-0.5 bg-banking-blue/10 text-banking-blue rounded-full text-xs">Primary</span>
                    )}
                    {device.isCurrentDevice && (
                      <span className="ml-2 px-2 py-0.5 bg-banking-blue/10 text-banking-blue rounded-full text-xs">Current</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{device.type} • {device.os}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Registered:</span> {device.registered}
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Last used:</span> {device.lastUsed}
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {device.biometrics.map((bio, index) => (
                      <span key={index} className="text-xs bg-banking-lightGrey px-2 py-0.5 rounded">
                        {bio}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-sm text-right">
                {getStatusBadge(device.status)}
              </div>
            </div>

            {device.status !== 'inactive' && (
              <div className="mt-3 flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Biometric authentication:</span>
                  <Switch checked={device.status === 'active'} disabled={device.status !== 'active'} />
                </div>
                <div className="flex gap-2">
                  {!device.isPrimary && device.status === 'active' && (
                    <Button size="sm" variant="outline" onClick={() => handleSetPrimary(device.id)}>
                      Set as primary
                    </Button>
                  )}
                  {!device.isCurrentDevice && (
                    <Button size="sm" variant="destructive" onClick={() => handleDeactivate(device.id)}>
                      Deactivate
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceManagement;
