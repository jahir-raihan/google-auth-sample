// src/app/page.tsx
'use client';

import GoogleLoginButton from './components/GoogleLoginButton';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default HomePage;
