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
  title: 'Sidhe Naukri: Latest Govt Jobs, Sarkari Result & Admit Card 2026',
  description: 'Sidhe Naukri पर पाएं सभी Sarkari Result Latest Govt Jobs और Admit Cards की सबसे तेज़ अपडेट। 10th/12th pass सीधी भर्ती और सरकारी नौकरी की पक्की जानकारी यहाँ देखें।',
  metadataBase: new URL('https://www.sidhenaukri.in'),
  openGraph: {
    title: 'Sidhe Naukri - Latest Govt Jobs 2026',
    description: 'Latest Government Jobs, Results, Admit Card aur Syllabus ki puri jankari.',
    url: 'https://www.sidhenaukri.in',
    siteName: 'Sidhe Naukri',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SidheNaukri - Latest Govt Jobs',
      },
    ],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sidhe Naukri - Latest Govt Jobs 2026',
    description: 'Latest Government Jobs, Results, Admit Card aur Syllabus.',
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