

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
  title: "Sarkari Result 2026 - Sidhe Naukri: Latest Govt Jobs, Admit Card & Results",
  description: "SidheNaukri.com पर पाएं सभी Sarkari Result, Latest Govt Jobs और Admit Card की सबसे तेज़ अपडेट। 10th, 12th और Graduate पास के लिए सीधी भर्ती (Direct Recruitment) की पक्की जानकारी यहाँ देखें।",
  keywords: "Sarkari Result, Sidhe Naukri, Latest Govt Jobs, Admit Card 2026, Online Form, Sarkari Exam Result, SidheNaukri.in, SidheNaukri.com",
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
  icons: {
    icon: '/og-image.svg',
    shortcut: '/og-image.svg',
    apple: '/og-image.svg',
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