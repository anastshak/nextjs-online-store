import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import CategoriesSidebar from '@/components/CategoriesSidebar';
import Header from '@/components/Header';

import { AuthProvider } from '@/lib/providers/AuthProvider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Store',
  description: 'An e-commerce website using DummyJson/products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <AuthProvider>
          <Header />

          <SidebarProvider className="min-h-[calc(100vh-88px)]">
            <CategoriesSidebar />
            <main className="flex-1 overflow-y-auto">
              <SidebarTrigger />
              <section className="px-6 h-[calc(100vh-116px)]">{children}</section>
            </main>
            <Toaster />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
