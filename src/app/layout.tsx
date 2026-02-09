import type { Metadata } from 'next';
import { Syne, Space_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/providers';
import { Header, Footer } from '@/components/layout';
import { APP_CONFIG } from '@/lib/constants';
import './globals.css';

// Syne for headings (bold)
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
  variable: '--font-syne',
});

// Space Mono for body (monospace)
const spaceMono = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: APP_CONFIG.title,
  description: APP_CONFIG.description,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} ${syne.variable} font-mono grid-bg min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
