
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const Faq: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };
  
  const categories = ['All', 'Registration', 'Security', 'Biometrics', 'Account'];
  
  const faqItems: FaqItem[] = [
    {
      question: "How do I register using my National ID?",
      answer: "Registration is simple. From the home screen, tap 'Register Now' and enter your 12-digit National ID. Follow the on-screen instructions to complete verification.",
      category: "Registration"
    },
    {
      question: "What if I have multiple phone numbers registered?",
      answer: "If you have multiple phone numbers on record, you'll be prompted to select which one should receive the OTP code for verification.",
      category: "Registration"
    },
    {
      question: "Can I use biometric authentication?",
      answer: "Yes, you can enable biometric authentication including fingerprint, facial recognition, and other supported methods in the Profile Management section.",
      category: "Biometrics"
    },
    {
      question: "What should I do if I forget my National ID?",
      answer: "Your National ID is issued by the government and cannot be recovered through the app. Please contact your local ID issuing authority for assistance.",
      category: "Account"
    },
    {
      question: "How secure is NFC verification?",
      answer: "NFC verification is highly secure as it reads encrypted data directly from your ID card's chip, which contains tamper-proof information verified by government authorities.",
      category: "Security"
    },
    {
      question: "What happens if OTP verification fails?",
      answer: "If OTP verification fails after 3 attempts, your account will be temporarily locked for security reasons. You can try again after 30 minutes or use alternative verification methods.",
      category: "Security"
    },
  ];
  
  const filteredFaqs = faqItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) && 
    (item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
            <Info size={26} className="text-banking-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Find answers to common questions</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{faq.question}</span>
                    {expandedQuestions.has(index) ? (
                      <ChevronUp size={18} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={18} className="text-muted-foreground" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedQuestions.has(index) && (
                  <CardContent className="p-4 pt-0 bg-muted/20">
                    <p>{faq.answer}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-muted text-xs rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No matching FAQs found. Try adjusting your search.</p>
            </Card>
          )}
        </div>
        
        <Card className="mt-6">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Still have questions?</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground">
              If you couldn't find the answer you were looking for, our support team is ready to help.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Button 
              onClick={() => navigate('/support')}
              className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue"
            >
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Faq;
