
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

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
        
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-full bg-banking-lightGrey flex items-center justify-center">
            <Info size={22} className="text-banking-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xs text-muted-foreground">Find answers to common questions</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs py-1 h-8"
            />
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap text-xs py-0 h-7 px-3"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader 
                  className="p-3 cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>{faq.question}</span>
                    {expandedQuestions.has(index) ? (
                      <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedQuestions.has(index) && (
                  <CardContent className="p-3 pt-0 bg-muted/20">
                    <p className="text-xs">{faq.answer}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-0.5 bg-muted text-[10px] rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground">No matching FAQs found. Try adjusting your search.</p>
            </Card>
          )}
        </div>
        
        <Card className="mt-5">
          <CardHeader className="p-3">
            <CardTitle className="text-base">Still have questions?</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">
              If you couldn't find the answer you were looking for, our support team is ready to help.
            </p>
          </CardContent>
          <CardFooter className="p-3">
            <Button 
              onClick={() => navigate('/support')}
              className="w-full bg-gradient-to-r from-banking-blue to-banking-darkBlue text-sm"
              size="sm"
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
