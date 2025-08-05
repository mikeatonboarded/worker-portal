'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

function VerifyPageContent() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const phone = searchParams.get('phone') || '';
  const isSignup = searchParams.get('signup') === 'true';

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Auto-submit when all digits are entered
  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [code]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      setError('');
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Mock verification logic
    setTimeout(() => {
      if (verificationCode === '123456') {
        // Success - log in user and redirect to dashboard
        const userData = isSignup ? {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        } : {};
        
        login(phone, userData);
        router.push('/dashboard');
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setTimeLeft(60);
    setError('');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // Mock resend API call
    console.log('Resending code to:', phone);
  };

  const formatPhone = (phoneNumber: string) => {
    if (phoneNumber.startsWith('+1') && phoneNumber.length === 12) {
      const digits = phoneNumber.slice(2);
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phoneNumber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-primary-600 mb-4 block">
            Worker Portal
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your phone</h1>
          <p className="text-gray-600">
            We&apos;ve sent a 6-digit code to{' '}
            <span className="font-medium text-gray-900">{formatPhone(phone)}</span>
          </p>
        </div>

        {/* Verification Form */}
        <div className="card">
          <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-6">
            {/* Verification Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-2 sm:space-x-3" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                ))}
              </div>
              
              {error && (
                <p className="text-red-600 text-sm text-center mt-3">{error}</p>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                💡 For demo purposes, use code: <span className="font-mono font-bold">123456</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || code.some(digit => digit === '')}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Resend verification code
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend code in {timeLeft}s
              </p>
            )}
          </div>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link 
              href="/auth/login" 
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Having trouble? Contact{' '}
            <Link href="/support" className="text-primary-600 hover:underline">
              support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}