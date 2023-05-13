
import React from 'react';
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-sm container mx-auto">
          <div className="flex flex-col mt-8 items-center">
            <h3 className='text-5xl'>B7Delivery</h3>
            <h4>Painel do Estabelecimento</h4>
        {children}
          </div>
        </main>
      </body>
    </html>
  );
}
