
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, GitBranch, Phone, MessageSquare, Laptop, BarChart2, Share2 } from 'lucide-react';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Support = () => {
  const navigate = useNavigate();
  const [activeSupportTab, setActiveSupportTab] = useState('connect');
  const [isCoBrowsingActive, setIsCoBrowsingActive] = useState(false);
  
  const handleStartCoBrowsing = () => {
    toast.success("Co-browsing session initiated", {
      description: "A support agent will connect to your session shortly."
    });
    setIsCoBrowsingActive(true);
  };
  
  const handleEndCoBrowsing = () => {
    toast("Co-browsing session ended", {
      description: "Thank you for using our co-browsing support."
    });
    setIsCoBrowsingActive(false);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Customer Support</h1>

        {isCoBrowsingActive && (
          <div className="bg-banking-yellow/20 border border-banking-yellow rounded-lg p-3 mb-6 animate-pulse-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-banking-yellow" />
                <p className="font-medium text-sm">Co-browsing session active</p>
              </div>
              <Button size="sm" variant="outline" onClick={handleEndCoBrowsing}>End Session</Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="connect" value={activeSupportTab} onValueChange={setActiveSupportTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connect" className="data-[state=active]:bg-banking-blue data-[state=active]:text-white">
              Connect
            </TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:bg-banking-blue data-[state=active]:text-white">
              Tracking
            </TabsTrigger>
            <TabsTrigger value="co-browse" className="data-[state=active]:bg-banking-blue data-[state=active]:text-white">
              Co-Browse
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connect" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Customer Data Connection</CardTitle>
                <CardDescription>
                  Connect with our systems for seamless assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-banking-lightGrey p-4 rounded-lg transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-banking-blue/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">CRM Integration</h3>
                        <p className="text-sm text-muted-foreground">Bi-directional data flow with core CRM systems</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-banking-lightGrey p-4 rounded-lg transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-banking-blue/10 p-2 rounded-full">
                        <GitBranch className="h-5 w-5 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Pipeline Integration</h3>
                        <p className="text-sm text-muted-foreground">Funnel stage mapping to CRM pipeline stages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-banking-lightGrey p-4 rounded-lg transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-banking-blue/10 p-2 rounded-full">
                        <BarChart2 className="h-5 w-5 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Lead Scoring</h3>
                        <p className="text-sm text-muted-foreground">Lead scoring adjustments based on funnel progression</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform">
                  Connect to Support Agent
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracking" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Cross-Channel Tracking</CardTitle>
                <CardDescription>
                  Track your customer journey across channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-banking-lightGrey p-4 rounded-lg transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-banking-blue/10 p-2 rounded-full">
                        <Laptop className="h-5 w-5 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Device Tracking</h3>
                        <p className="text-sm text-muted-foreground">Track customer journey across different devices</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-banking-lightGrey p-4 rounded-lg transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="bg-banking-blue/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Channel Attribution</h3>
                        <p className="text-sm text-muted-foreground">Track journey initiation and completion across channels</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-banking-blue/5 p-4 rounded-lg border border-banking-blue/20">
                  <p className="text-sm font-medium">Your Unified Customer ID</p>
                  <p className="text-banking-blue font-mono mt-1">CID-284751936</p>
                  <p className="text-xs text-muted-foreground mt-2">This unique identifier follows you across all our channels and services</p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform">
                  View Journey History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="co-browse" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Co-Browsing Capability</CardTitle>
                <CardDescription>
                  Get real-time help from our support agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isCoBrowsingActive ? (
                  <>
                    <div className="bg-banking-lightGrey p-4 rounded-lg">
                      <h3 className="font-medium">Session Initiation</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start a co-browsing session to get real-time assistance from our support team.
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="consent" className="mr-2" />
                          <label htmlFor="consent" className="text-sm">
                            I consent to sharing my screen with the support agent
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="terms" className="mr-2" />
                          <label htmlFor="terms" className="text-sm">
                            I agree to the co-browsing terms and conditions
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">What to expect:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                          A support agent will see your screen
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                          Sensitive information will be automatically masked
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-banking-blue"></span>
                          You can end the session at any time
                        </li>
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue hover:scale-105 transition-transform" onClick={handleStartCoBrowsing}>
                      Start Co-Browsing
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-banking-green/10 p-4 rounded-lg border border-banking-green/30 animate-pulse-soft">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-banking-green"></div>
                          <p className="font-medium">Session Active</p>
                        </div>
                        <p className="text-sm">Agent: John D.</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Co-browsing session ID: SES-57291034</p>
                    </div>
                    
                    <div className="bg-banking-lightGrey p-4 rounded-lg">
                      <h3 className="font-medium">Interaction Controls</h3>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">View-only mode</label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-banking-grey transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-banking-green">
                            <span className="pointer-events-none block h-5 w-5 translate-x-1 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Mask sensitive fields</label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-banking-green">
                            <span className="pointer-events-none block h-5 w-5 translate-x-6 rounded-full bg-background shadow-lg ring-0 transition-transform"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-banking-blue mr-2" />
                      <p className="text-sm">Agent is requesting to chat with you</p>
                    </div>
                    
                    <Button variant="destructive" className="w-full" onClick={handleEndCoBrowsing}>
                      End Co-Browsing Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Support;
