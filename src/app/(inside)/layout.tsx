
import { Header } from '@/components/Header';
import React from 'react';
export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className="container mx-auto">
          
        {children}
        </main>
      </body>
    </html>
  );
}
