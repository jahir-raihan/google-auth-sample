// src/app/page.tsx
'use client';

import GoogleLoginButton from './components/GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <GoogleOAuthProvider clientId="1071218854822-l5gce0oia4rp7tv1mmo6gode8a2ae43e.apps.googleusercontent.com">
        <GoogleLoginButton />
      </GoogleOAuthProvider>
      
    </div>
  );
};

export default HomePage;
