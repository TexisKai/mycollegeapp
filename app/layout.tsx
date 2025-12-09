import './globals.css';
import React from 'react';

export const metadata = {
  title: 'MyCollege',
  description: 'Delhi University student platform',
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
