
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  footer?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false, footer = true }) => {
  return (
    <div className="mobile-container">
      <main className={`flex-1 ${!fullWidth ? 'safe-area' : ''}`}>
        {children}
      </main>
      
      {footer && (
        <footer className="py-4 px-6 border-t border-border mt-auto">
          <nav className="flex justify-around">
            <FooterLink icon="help-circle" label="Support" />
            <FooterLink icon="file-text" label="User Guide" />
            <FooterLink icon="help" label="FAQs" />
          </nav>
        </footer>
      )}
    </div>
  );
};

interface FooterLinkProps {
  icon: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, label }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'help-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    'file-text': (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    'help': (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  };

  return (
    <button className="flex flex-col items-center space-y-1 text-banking-grey hover:text-banking-blue transition-colors">
      <span className="text-current">
        {iconMap[icon]}
      </span>
      <span className="text-xs">{label}</span>
    </button>
  );
};

export default Layout;
