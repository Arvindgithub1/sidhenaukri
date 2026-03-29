// src/app/layout.js
import { Poppins } from 'next/font/google';
import FloatingButtons from '@/components/FloatingButtons';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Sarkari Result 2026 - Sidhe Naukri: Latest Govt Jobs, Admit Card, Results, SSC, Railway, & All Govt Jobs Updates",
  description: "SidheNaukri.in पर पाएं सभी Sarkari Result, Latest Govt Jobs और Admit Card की सबसे तेज़ अपडेट। SSC, Railway, Bank, UPSC, और Defense भर्ती के ऑनलाइन फॉर्म (Direct Recruitment) की पक्की जानकारी यहाँ देखें।",
  keywords: "Sarkari Result, Sidhe Naukri, SSC GD 2026, Railway Recruitment, Bank Jobs, UPSC Online Form, Admit Card 2026, Answer Key 2026, Govt Jobs for Graduates, SidheNaukri.in",
  metadataBase: new URL('https://www.sidhenaukri.in'),
  openGraph: {
    title: 'Sarkari Result 2026 - Sidhe Naukri: Latest Govt Jobs (SSC, Railway, Bank)',
    description: 'Latest Government Jobs, Results, Admit Card aur Syllabus ki puri jankari.',
    url: 'https://www.sidhenaukri.in',
    siteName: 'Sidhe Naukri',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'SidheNaukri - Latest Govt Jobs' }],
    locale: 'hi_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico',        sizes: '32x32',   type: 'image/x-icon' },
      { url: '/favicon-32x32.png',  sizes: '32x32',   type: 'image/png' },
    ],
    apple:   { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png', rel: 'icon' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sidhe Naukri - Latest Govt Jobs 2026',
    description: 'Latest Government Jobs, Admit Card and Results updates in one click.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={poppins.variable}>
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}