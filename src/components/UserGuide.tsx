
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

const UserGuide: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const guideTopics = [
    { title: "Getting Started", description: "Learn how to set up your account and navigate the app" },
    { title: "Registration Process", description: "Step-by-step guide to completing registration" },
    { title: "Using Biometric Login", description: "How to set up and use Touch ID and Face ID" },
    { title: "Managing Your Profile", description: "Update your information and security settings" },
    { title: "NFC Verification", description: "How to use your ID card with NFC verification" },
    { title: "Troubleshooting", description: "Solutions to common issues and questions" },
  ];
  
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
          <div className="h-14 w-14 rounded-full bg-banking-lightGrey flex items-center justify-center">
            <BookOpen size={26} className="text-banking-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Guide</h1>
            <p className="text-muted-foreground">Everything you need to know</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {guideTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{topic.title}</span>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-6">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Need more help?</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground">
              If you can't find what you're looking for in the user guide, our support team is here to help.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Button 
              onClick={() => navigate('/support')}
              className="w-full"
            >
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default UserGuide;
