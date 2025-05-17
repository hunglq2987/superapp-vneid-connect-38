
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ 
  length = 6, 
  onComplete, 
  className,
  autoFocus = true,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Init refs array with the correct length
  useEffect(() => {
    inputRefs.current = Array(length)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  }, [length]);

  // Focus on first input when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only accept digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP values array
    const newOtp = [...otp];
    // Take only the last character if more than one was somehow entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // If a value was entered, move to the next input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(v => v !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // On backspace, clear the current field and move focus to previous field
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // If current field has a value, just clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        // If current field is empty, move to previous field and clear it
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // On arrow left, move focus to previous field
    else if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // On arrow right, move focus to next field
    else if (e.key === 'ArrowRight' && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    // Filter out non-digits
    const digits = pastedData.replace(/\D/g, '');
    
    // Populate OTP fields with pasted digits
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(length, digits.length); i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    
    // Move focus to next empty field or last field
    const nextEmptyIndex = newOtp.findIndex(v => v === '');
    if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else if (inputRefs.current[length - 1]) {
      inputRefs.current[length - 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(v => v !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className={cn('flex justify-between gap-2', className)}>
      {Array.from({ length }, (_, index) => (
        <div key={index} className="relative flex-1">
          <input
            ref={el => { inputRefs.current[index] = el; }}
            type="text"
            value={otp[index]}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            maxLength={1}
            className="w-full h-14 text-center text-xl font-medium border rounded-lg bg-white focus:border-banking-blue focus:ring-1 focus:ring-banking-blue focus:outline-none"
            aria-label={`OTP digit ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
