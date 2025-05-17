
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Phone, Video, MousePointer, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

enum SupportChannel {
  CHAT = 'chat',
  CALL = 'call',
  VIDEO = 'video',
  COBROWSE = 'cobrowse',
}

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState<SupportChannel>(SupportChannel.CHAT);
  const [query, setQuery] = useState('');
  const [isCobrowsingRequested, setCobrowsingRequested] = useState(false);
  const [cobrowsingCode, setCobrowsingCode] = useState('');
  const [customerConsent, setCustomerConsent] = useState(false);
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter your question or issue");
      return;
    }
    
    toast.success("Your request has been submitted. A support agent will assist you shortly.");
    setQuery('');
  };
  
  const handleCobrowsingRequest = () => {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCobrowsingCode(code);
    setCobrowsingRequested(true);
    
    toast.success("Co-browsing session ready to start. Share this code with the support agent.");
  };
  
  const handleStartCobrowsing = () => {
    if (!customerConsent) {
      toast.error("You must consent to the terms before starting a co-browsing session");
      return;
    }
    
    toast.success("Co-browsing session initiated. An agent will join shortly.");
    // Here you would implement the actual co-browsing connection
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
          <div className="h-14 w-14 rounded-full bg-banking-lightGrey flex items-center justify-center">
            <Users size={26} className="text-banking-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-banking-blue via-banking-darkBlue to-banking-blue bg-clip-text text-transparent">Customer Support</h1>
            <p className="text-muted-foreground">How can we assist you today?</p>
          </div>
        </div>
        
        <Tabs defaultValue={activeChannel} onValueChange={(v) => setActiveChannel(v as SupportChannel)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value={SupportChannel.CHAT} className="flex flex-col items-center py-3">
              <MessageCircle size={18} className={activeChannel === SupportChannel.CHAT ? "text-banking-blue" : "text-muted-foreground"} />
              <span className="text-xs mt-1">Chat</span>
            </TabsTrigger>
            <TabsTrigger value={SupportChannel.CALL} className="flex flex-col items-center py-3">
              <Phone size={18} className={activeChannel === SupportChannel.CALL ? "text-banking-blue" : "text-muted-foreground"} />
              <span className="text-xs mt-1">Call</span>
            </TabsTrigger>
            <TabsTrigger value={SupportChannel.VIDEO} className="flex flex-col items-center py-3">
              <Video size={18} className={activeChannel === SupportChannel.VIDEO ? "text-banking-blue" : "text-muted-foreground"} />
              <span className="text-xs mt-1">Video</span>
            </TabsTrigger>
            <TabsTrigger value={SupportChannel.COBROWSE} className="flex flex-col items-center py-3">
              <MousePointer size={18} className={activeChannel === SupportChannel.COBROWSE ? "text-banking-blue" : "text-muted-foreground"} />
              <span className="text-xs mt-1">Co-Browse</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={SupportChannel.CHAT}>
            <Card>
              <CardHeader>
                <CardTitle>Chat with Support</CardTitle>
                <CardDescription>
                  Tell us about your issue and a customer support agent will assist you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuery}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="query" className="text-sm font-medium">Your question or issue</label>
                      <Input
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="How can we help you today?"
                        className="h-24"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitQuery} className="w-full">
                  Start Chat Support
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value={SupportChannel.CALL}>
            <Card>
              <CardHeader>
                <CardTitle>Call Support</CardTitle>
                <CardDescription>
                  Connect with a support agent by phone for immediate assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-lg font-medium">Support Hotline</p>
                  <p className="text-2xl font-bold text-banking-blue">1800-123-4567</p>
                  <p className="text-sm text-muted-foreground mt-2">Available 24/7</p>
                </div>
                
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Request a callback</p>
                  <p className="text-sm text-muted-foreground mb-2">We'll call you back as soon as possible</p>
                  <Button className="w-full mt-2">Request Callback</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value={SupportChannel.VIDEO}>
            <Card>
              <CardHeader>
                <CardTitle>Video Support</CardTitle>
                <CardDescription>
                  Schedule a video call with our support team for face-to-face assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Schedule a video appointment</p>
                  <p className="text-sm text-muted-foreground mb-2">Select a date and time that works for you</p>
                  <Button className="w-full mt-2">Schedule Now</Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Immediate video assistance</p>
                  <p className="text-sm text-muted-foreground mb-2">Connect with the next available agent</p>
                  <Button variant="secondary" className="w-full mt-2">Connect Now</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value={SupportChannel.COBROWSE}>
            <Card>
              <CardHeader>
                <CardTitle>Co-Browsing Support</CardTitle>
                <CardDescription>
                  Allow a support agent to view your screen and guide you through the process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isCobrowsingRequested ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">How Co-Browsing Works:</h3>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-banking-green mt-0.5" />
                          <span>Agent can only see what's on your banking app screen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-banking-green mt-0.5" />
                          <span>Sensitive information is automatically masked</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-banking-green mt-0.5" />
                          <span>You can end the session at any time</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Button onClick={handleCobrowsingRequest} className="w-full">
                      Request Co-Browsing Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 text-center">
                      <p className="text-lg font-medium">Your Co-Browsing Code</p>
                      <p className="text-3xl font-bold tracking-widest mt-2 text-banking-blue">
                        {cobrowsingCode}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Share this code with the support agent
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        checked={customerConsent}
                        onChange={(e) => setCustomerConsent(e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="consent" className="text-sm">
                        I consent to allow the support agent to view my screen and guide me through the banking application. I understand I can end the session at any time.
                      </label>
                    </div>
                    
                    <Button 
                      onClick={handleStartCobrowsing} 
                      disabled={!customerConsent}
                      className="w-full"
                    >
                      Start Co-Browsing Session
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
