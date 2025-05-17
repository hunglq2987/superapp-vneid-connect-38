
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Scan, Fingerprint, Mic, Eye, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BiometricMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  supported: boolean;
  enabled: boolean;
  lastUsed?: string;
  successRate?: number;
}

const BiometricConfig: React.FC = () => {
  const [biometricMethods, setBiometricMethods] = useState<BiometricMethod[]>([
    {
      id: 'fingerprint',
      name: 'Fingerprint (Touch ID)',
      icon: <Fingerprint className="h-5 w-5" />,
      supported: true,
      enabled: true,
      lastUsed: '2 hours ago',
      successRate: 95
    },
    {
      id: 'faceid',
      name: 'Facial Recognition (Face ID)',
      icon: <Scan className="h-5 w-5" />,
      supported: true,
      enabled: false,
      lastUsed: '1 day ago',
      successRate: 90
    },
    {
      id: 'voice',
      name: 'Voice Recognition',
      icon: <Mic className="h-5 w-5" />,
      supported: false,
      enabled: false
    },
    {
      id: 'iris',
      name: 'Iris Scanning',
      icon: <Eye className="h-5 w-5" />,
      supported: false,
      enabled: false
    },
    {
      id: 'palm',
      name: 'Palm/Vein Recognition',
      icon: <Hand className="h-5 w-5" />,
      supported: false,
      enabled: false
    }
  ]);

  const handleToggle = (id: string) => {
    setBiometricMethods(prev => 
      prev.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-2">Biometric Configuration</h2>
        <p className="text-muted-foreground">Manage how you authenticate using biometric methods</p>
      </div>

      <div className="space-y-4">
        {biometricMethods.map(method => (
          <div key={method.id} className={`p-4 border rounded-lg ${method.supported ? 'bg-white' : 'bg-muted'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${method.enabled && method.supported ? 'bg-banking-blue/10 text-banking-blue' : 'bg-muted text-muted-foreground'}`}>
                  {method.icon}
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {method.supported 
                      ? method.enabled 
                        ? 'Enabled' 
                        : 'Supported but disabled' 
                      : 'Not supported on this device'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={method.enabled} 
                onCheckedChange={() => method.supported && handleToggle(method.id)}
                disabled={!method.supported}
              />
            </div>
            
            {method.enabled && method.supported && (
              <div className="mt-3 pl-10 space-y-2 text-sm">
                {method.lastUsed && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last used:</span>
                    <span>{method.lastUsed}</span>
                  </div>
                )}
                {method.successRate && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Success rate:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-banking-lightGrey rounded-full">
                        <div 
                          className="h-full bg-banking-blue rounded-full" 
                          style={{ width: `${method.successRate}%` }}
                        />
                      </div>
                      <span>{method.successRate}%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4">
          Run Biometric Setup Wizard
        </Button>
      </div>

      <div className="p-4 border rounded-lg bg-banking-lightGrey">
        <h3 className="font-medium mb-2">Troubleshooting</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Make sure your device is running the latest OS version</li>
          <li>Clean your fingerprint sensor or camera lens</li>
          <li>Try registering your biometrics again in device settings</li>
          <li>Ensure there are no physical obstructions</li>
        </ul>
      </div>
    </div>
  );
};

export default BiometricConfig;
