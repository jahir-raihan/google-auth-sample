// src/app/layout.tsx
import './styles/globals.css';
import { AuthProvider } from './components/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: 'My App',
  description: 'Google login integration with JWT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId="1071218854822-l5gce0oia4rp7tv1mmo6gode8a2ae43e.apps.googleusercontent.com">
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
