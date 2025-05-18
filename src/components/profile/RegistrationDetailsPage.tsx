
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import RegistrationDetails from './RegistrationDetails';
import { motion } from 'framer-motion';

const RegistrationDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nationalId = location.state?.nationalId;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout showBackButton={false}>
      <div className="py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="mb-4 flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-bold mb-1">Registration Details</h1>
          <p className="text-muted-foreground">
            National ID: {nationalId ? nationalId.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3') : ''}
          </p>
        </motion.div>
        
        <RegistrationDetails />
      </div>
    </Layout>
  );
};

export default RegistrationDetailsPage;
