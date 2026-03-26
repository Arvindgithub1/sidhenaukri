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
  title: 'Sidhe Naukri - बिना परीक्षा सीधी भर्ती और Latest Govt Jobs 2026',
  description: 'Sidhe Naukri पर पाएं 10वीं/12वीं पास के लिए बिना परीक्षा सीधी भर्ती, मेरिट आधारित सरकारी नौकरियां और ताज़ा भर्ती अपडेट्स सबसे पहले।',
  metadataBase: new URL('https://www.sidhenaukri.com'),
  openGraph: {
    title: 'Sidhe Naukri - Latest Govt Jobs 2026',
    description: 'Latest Government Jobs, Results, Admit Card aur Syllabus ki puri jankari.',
    url: 'https://www.sidhenaukri.com',
    siteName: 'Sidhe Naukri',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'SidheNaukri - Latest Govt Jobs' }],
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