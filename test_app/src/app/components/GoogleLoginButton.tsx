/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/GoogleLoginButton.tsx
'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const GoogleLoginButton = () => {
  //const { login } = useAuth();

  const handleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential;
      console.log(googleToken)

      // Send Google token to the backend for verification
      const { data } = await axios.post('http://localhost:8000/api/auth/google/', {
        access_token: googleToken,  // Pass it as access_token in the body
      }, {
        headers: {
          'Content-Type': 'application/json',  // Ensure the correct content type
        },
      });

      // Call login method to store tokens
      //login(data.access_token);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.error('Google login failed')}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
