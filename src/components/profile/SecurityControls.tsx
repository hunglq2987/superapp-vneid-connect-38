
import React from 'react';
import { Lock, Key, ShieldCheck, ShieldX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const SecurityControls: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-2">Security Controls</h2>
        <p className="text-muted-foreground">Manage your account security settings</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-banking-blue/10 text-banking-blue">
              <Key className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Authentication Requirements</h3>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Require password/MPIN verification before changing biometric settings
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-banking-blue/10 text-banking-blue">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Device Security Check</h3>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Automatic security check after device OS updates
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-banking-blue/10 text-banking-blue">
              <ShieldX className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Jailbreak Detection</h3>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Restrict access on jailbroken/rooted devices
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-banking-blue/10 text-banking-blue">
              <Lock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Fingerprint Enrollment Limit</h3>
                <span className="font-medium">5</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Maximum number of fingerprints per device
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-full h-2 bg-banking-lightGrey rounded-full">
                  <div className="h-full bg-banking-blue rounded-full" style={{ width: '60%' }} />
                </div>
                <span className="text-sm text-banking-blue font-medium">3/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-banking-lightGrey">
          <h3 className="font-medium mb-2">Security Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biometric template storage:</span>
              <span className="font-medium">Secure Element</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hardware security module:</span>
              <span className="font-medium text-banking-green">Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last security scan:</span>
              <span className="font-medium">Today, 10:45 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device trust score:</span>
              <span className="font-medium text-banking-blue">High (98/100)</span>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4">Run Security Check</Button>
      </div>
    </div>
  );
};

export default SecurityControls;
