'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Afacad } from 'next/font/google';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phone-input.css';

const afacad = Afacad({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-afacad',
});

// Custom styles for the phone input
const phoneInputCustomStyles = {
  containerStyle: {
    width: '100%',
    marginBottom: '1rem',
  },
  inputStyle: {
    width: '100%',
    height: '42px',
    fontSize: '16px',
    paddingLeft: '48px',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#111827',
    '&:focus': {
      border: '1px solid #6B7280',
      boxShadow: '0 0 0 2px rgba(107, 114, 128, 0.1)',
    },
  },
  buttonStyle: {
    border: '1px solid #E5E7EB',
    borderRadius: '6px 0 0 6px',
    backgroundColor: 'white',
    '&:focus': {
      border: '1px solid #6B7280',
    },
  },
  dropdownStyle: {
    width: '300px',
    maxHeight: '300px',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginTop: '4px',
  }
};

const supabaseUrl = 'https://fwcuguulstooyzkkxtvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3VndXVsc3Rvb3l6a2t4dHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzcyNTEsImV4cCI6MjA0MTAxMzI1MX0.DukHnchH5-5qs_F6c4jJtTWTw3CIaNHx2sWenhUnGFw';
const supabase = createClient(supabaseUrl, supabaseKey)

const EmailSignup = () => {
  const [displayText, setDisplayText] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isCallMeSubmitting, setIsCallMeSubmitting] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [callMeSubmitted, setCallMeSubmitted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const text = 'daily.';
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailSubmitting(true);
    setEmailMessage('');

    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([{ email, created_at: new Date().toISOString() }]);
      
      if (error) throw error;
      setEmailSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setEmailMessage('Something went wrong. Please try again.');
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCallMeSubmitting(true);
    setPhoneMessage('');

    try {
      // Check if consent is given
      if (!consentChecked) {
        throw new Error('Please consent to being contacted by daily on this number');
      }

      // Parse and validate the phone number
      const phoneNumber = parsePhoneNumberFromString("+" + phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error('Please enter a valid phone number with country code');
      }

      // Make the POST request to the server
      const futureDate = new Date(Date.now() + 30000); // 30 seconds in the future
      const formattedDate = futureDate.toISOString().split('.')[0] + 'Z'; // Remove milliseconds and ensure Z suffix

      const response = await fetch('https://daily-dev-server.onrender.com/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber.format('E.164'), // Format as E.164
          date: formattedDate,
          message: "Hey, its daily here. How's it going?",
          method: "call"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit phone number');
      }

      setCallMeSubmitted(true);
      setPhone('');
    } catch (error) {
      console.error('Error:', error);
      setPhoneMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsCallMeSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${afacad.className}`}>
      <div className="flex flex-col items-center justify-center w-[90%]">
        <div className="text-center">
          <h1 className="text-4xl mb-2 text-gray-900 h-12">
            {displayText}
          </h1>
          <p className="text-gray-600 mb-8">
            The future of journaling with voice and ai.
          </p>
        </div>
        
        {/* Version 0 highlight box */}
        <div className="w-[90%] max-w-md p-8 mb-8 rounded-lg shadow-lg text-center" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
            border: '2px solidrgb(81, 145, 247)',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)'
          }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">!!! Version 0 out now !!!</h2>
          
          <div className="flex space-x-6 items-center justify-center">
            <a
              href="https://www.instagram.com/dailyapp.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-700"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://apps.apple.com/gb/app/daily/id6741575634"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-700"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.nilestreet.daily"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-700"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Call me form */}
        <div className="w-[90%] max-w-md p-8 bg-white rounded-lg shadow-lg">
          {!callMeSubmitted ? (
            <>
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="relative">
                  <PhoneInput
                    country={'gb'}
                    value={phone}
                    onChange={setPhone}
                    containerStyle={phoneInputCustomStyles.containerStyle}
                    inputStyle={phoneInputCustomStyles.inputStyle}
                    buttonStyle={phoneInputCustomStyles.buttonStyle}
                    dropdownStyle={phoneInputCustomStyles.dropdownStyle}
                    enableSearch={true}
                    searchPlaceholder="Search countries..."
                    searchStyle={{
                      width: '100%',
                      height: '36px',
                      padding: '8px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                    countryCodeEditable={false}
                  />
                </div>
                
                <div className="flex items-start mt-2 mb-4">
                  <div className="flex items-center h-5 ml-2">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label htmlFor="consent" className="ml-2 text-sm font-medium text-gray-700">
                    I consent to being contacted by daily on this number
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isCallMeSubmitting}
                  className="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                >
                  {isCallMeSubmitting ? 'Calling...' : 'Get daily to call you now!'}
                </button>
                
                {phoneMessage && (
                  <p className="text-sm text-red-600 mt-2">
                    {phoneMessage}
                  </p>
                )}
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">daily will call you in a moment!</h2>
            </div>
          )}
        </div>
        
        {/* Email signup form */}
        <div className="w-[90%] max-w-md p-8 bg-white rounded-lg shadow-lg mt-8">
          {!emailSubmitted ? (
            <>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none text-gray-900"
                />
                
                <button 
                  type="submit" 
                  disabled={isEmailSubmitting}
                  className="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isEmailSubmitting ? 'Signing up...' : 'Get Early Access to Version 1'}
                </button>
                
                {emailMessage && (
                  <p className="text-sm text-gray-600 mt-2">
                    {emailMessage}
                  </p>
                )}
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Thanks for signing up!</h2>
              <p className="text-gray-600 mb-8">If you want hear more, please follow us on instagram or get in touch at <a href="mailto:daily@nile-street.com" className="text-blue-500 hover:underline">daily@nile-street.com</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;