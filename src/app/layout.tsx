import './globals.css';
import type { Metadata, Viewport } from 'next';
import InstallPrompt from '../components/InstallPrompt';

export const metadata: Metadata = {
  title: 'Jewelry Pricing App',
  description: 'Scan jewelry QR codes and calculate prices instantly.',
};

export const viewport: Viewport = {
  themeColor: '#fbbf24',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
