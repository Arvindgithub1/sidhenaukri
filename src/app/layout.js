import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Sidhe Naukri - बिना परीक्षा सीधी भर्ती और Latest Govt Jobs 2026',
  description: 'Sidhe Naukri पर पाएं 10वीं/12वीं पास के लिए बिना परीक्षा सीधी भर्ती (Direct Recruitment), मेरिट आधारित सरकारी नौकरियां और ताज़ा भर्ती अपडेट्स सबसे पहले।',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}