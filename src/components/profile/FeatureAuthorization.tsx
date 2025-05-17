
import React, { useState } from 'react';
import { CreditCard, FileText, User, Users, Calendar, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FeatureSetting {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  valueLimit?: string;
}

interface FeatureCategory {
  title: string;
  features: FeatureSetting[];
}

const FeatureAuthorization: React.FC = () => {
  const [categories, setCategories] = useState<FeatureCategory[]>([
    {
      title: "Application Access",
      features: [
        {
          id: 'app_login',
          name: 'Application Login',
          icon: <Lock className="h-5 w-5" />,
          description: 'Use biometrics to login to the application',
          enabled: true
        },
        {
          id: 'profile_access',
          name: 'Profile Information',
          icon: <User className="h-5 w-5" />,
          description: 'Access personal profile information',
          enabled: true
        }
      ]
    },
    {
      title: "Transactions & Payments",
      features: [
        {
          id: 'transactions',
          name: 'Transaction Authorization',
          icon: <CreditCard className="h-5 w-5" />,
          description: 'Authorize transactions using biometrics',
          enabled: true,
          valueLimit: '₫10,000,000'
        },
        {
          id: 'recurring',
          name: 'Recurring Payments',
          icon: <Calendar className="h-5 w-5" />,
          description: 'Authorize recurring payment setup',
          enabled: false
        },
        {
          id: 'beneficiary',
          name: 'Beneficiary Management',
          icon: <Users className="h-5 w-5" />,
          description: 'Add/modify payment beneficiaries',
          enabled: true
        }
      ]
    },
    {
      title: "Documents & Information",
      features: [
        {
          id: 'statements',
          name: 'Statement Download',
          icon: <FileText className="h-5 w-5" />,
          description: 'Download account statements',
          enabled: true
        },
        {
          id: 'passwords',
          name: 'View Passwords/PINs',
          icon: <Lock className="h-5 w-5" />,
          description: 'View masked passwords or PINs',
          enabled: false
        }
      ]
    }
  ]);

  const handleToggle = (categoryIndex: number, featureId: string) => {
    setCategories(prev => 
      prev.map((category, idx) => 
        idx === categoryIndex 
          ? {
              ...category,
              features: category.features.map(feature => 
                feature.id === featureId 
                  ? { ...feature, enabled: !feature.enabled } 
                  : feature
              )
            }
          : category
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-2">Feature Authorization</h2>
        <p className="text-muted-foreground">Control which features can use biometric authentication</p>
      </div>

      {categories.map((category, categoryIndex) => (
        <div key={category.title} className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground">{category.title}</h3>
          
          {category.features.map(feature => (
            <div key={feature.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${feature.enabled ? 'bg-banking-blue/10 text-banking-blue' : 'bg-banking-lightGrey text-banking-grey'}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{feature.name}</h4>
                    <Switch 
                      checked={feature.enabled}
                      onCheckedChange={() => handleToggle(categoryIndex, feature.id)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                  {feature.valueLimit && (
                    <div className="mt-1 text-xs bg-banking-blue/5 text-banking-blue px-2 py-0.5 rounded inline-block">
                      Limit: {feature.valueLimit}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="p-4 border rounded-lg bg-banking-lightGrey">
        <h3 className="font-medium mb-2">Fallback Options</h3>
        <div className="space-y-1 text-sm">
          <p><span className="text-muted-foreground">Default fallback method:</span> MPIN</p>
          <p><span className="text-muted-foreground">After failed attempts:</span> 3</p>
          <p><span className="text-muted-foreground">Temporary bypass:</span> Requires verification code</p>
          <p><span className="text-muted-foreground">Emergency access:</span> Contact support</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureAuthorization;
