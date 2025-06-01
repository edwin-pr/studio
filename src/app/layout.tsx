
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tenant Haven',
  description: 'Find your next home with Tenant Haven',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Next.js will automatically inject metadata and other head elements here */}
      </head>
      <body className="antialiased font-sans">
        <FavoritesProvider>
          {children}
          <Toaster />
        </FavoritesProvider>
      </body>
    </html>
  );
}
