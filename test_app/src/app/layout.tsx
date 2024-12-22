// src/app/layout.tsx
import './styles/globals.css';

export const metadata = {
  title: 'My App',
  description: 'Google login integration with JWT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
