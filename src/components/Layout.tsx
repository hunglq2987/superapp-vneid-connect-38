
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, BookOpen, Bell, Info, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, footer = false, showBackButton = false }) => {
  const navigate = useNavigate();
  
  const handleSupportClick = () => {
    navigate('/support');
  };
  
  const handleUserGuideClick = () => {
    navigate('/user-guide');
  };
  
  const handleFaqClick = () => {
    navigate('/faq');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="mobile-container">
      {showBackButton && (
        <div className="border-b p-3">
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
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="safe-area">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="border-t py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <button 
                className="flex flex-col items-center text-banking-grey hover:text-banking-blue transition-colors"
                onClick={handleSupportClick}
              >
                <HelpCircle size={20} className="mb-1" />
                <span className="text-xs">Support</span>
              </button>
              <button 
                className="flex flex-col items-center text-banking-grey hover:text-banking-blue transition-colors"
                onClick={handleUserGuideClick}
              >
                <BookOpen size={20} className="mb-1" />
                <span className="text-xs">User Guide</span>
              </button>
              <button 
                className="flex flex-col items-center text-banking-grey hover:text-banking-blue transition-colors"
                onClick={handleFaqClick}
              >
                <Info size={20} className="mb-1" />
                <span className="text-xs">FAQs</span>
              </button>
            </div>
            <button className="relative">
              <Bell size={24} className="text-banking-grey hover:text-banking-blue transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-banking-red rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
