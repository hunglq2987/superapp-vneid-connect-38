
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, User, Calendar, Phone, Home, Mail, AlertTriangle } from 'lucide-react';

const RegistrationDetails = () => {
  const customerDetails = {
    personalInfo: {
      fullName: 'Nguyen Van A',
      dateOfBirth: '01/01/1990',
      gender: 'Male',
      idNumber: '111222333444',
      nationality: 'Vietnamese',
      phoneNumber: '+84 987 654 321',
      email: 'nguyen.van.a@email.com'
    },
    addressInfo: {
      currentAddress: '123 Le Loi Street, Ward 1, District 1, Ho Chi Minh City',
      permanentAddress: '123 Le Loi Street, Ward 1, District 1, Ho Chi Minh City'
    },
    registrationInfo: {
      registrationDate: '18/05/2025',
      verificationMethod: 'VNeID + Biometric',
      status: 'Verified',
      accountType: 'Personal',
      kycLevel: 'Full'
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-banking-blue/10 rounded-full flex items-center justify-center">
          <FileText className="h-5 w-5 text-banking-blue" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Registration Details</h3>
          <p className="text-sm text-muted-foreground">Personal information provided during registration</p>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="bg-banking-lightGrey/20 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium flex items-center gap-2">
            <User size={16} /> Personal Information
          </h4>
          <span className="text-xs px-2 py-1 bg-banking-green/10 text-banking-green rounded-full flex items-center gap-1">
            <CheckCircle size={12} /> Verified
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {Object.entries(customerDetails.personalInfo).map(([key, value], index) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="flex justify-between py-2 border-b border-border/30"
            >
              <span className="text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </span>
              <span className="font-medium">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-banking-lightGrey/20 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium flex items-center gap-2">
            <Home size={16} /> Address Information
          </h4>
        </div>
        
        <div className="space-y-3 text-sm">
          {Object.entries(customerDetails.addressInfo).map(([key, value], index) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="flex flex-col py-2 border-b border-border/30"
            >
              <span className="text-muted-foreground capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </span>
              <span className="font-medium">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-banking-lightGrey/20 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar size={16} /> Registration Information
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {Object.entries(customerDetails.registrationInfo).map(([key, value], index) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="flex justify-between py-2 border-b border-border/30"
            >
              <span className="text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </span>
              <span className={`font-medium ${key === 'status' ? 'text-banking-green' : ''}`}>{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-4 p-3 border border-amber-500/20 bg-amber-500/5 rounded-lg flex items-start gap-3"
      >
        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-medium text-amber-500">Important Notice</p>
          <p className="text-muted-foreground">Please ensure all your information is accurate and up to date. If you need to update any information, please contact customer support.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationDetails;
