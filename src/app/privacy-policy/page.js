import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../about/page.module.css';

export const metadata = {
  title: 'Privacy Policy | Sidhe Naukri',
  description: 'Sidhe Naukri की Privacy Policy पढ़ें। हम आपकी निजी जानकारी की सुरक्षा को सर्वोच्च प्राथमिकता देते हैं।',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroSub}>गोपनीयता नीति</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>जानकारी का संग्रह</h2>
            <p>Sidhe Naukri आपकी व्यक्तिगत जानकारी जैसे नाम, ईमेल आदि तभी एकत्र करता है जब आप स्वेच्छा से हमारे Contact Form के माध्यम से प्रदान करते हैं। हम बिना आपकी अनुमति के कोई जानकारी एकत्र नहीं करते।</p>
          </section>

          <section className={styles.section}>
            <h2>Cookies का उपयोग</h2>
            <p>हमारी वेबसाइट बेहतर अनुभव प्रदान करने के लिए Cookies का उपयोग करती है। इनमें Google Analytics और Google AdSense से संबंधित Cookies शामिल हो सकती हैं। आप अपने Browser Settings से Cookies को नियंत्रित कर सकते हैं।</p>
          </section>

          <section className={styles.section}>
            <h2>Third Party Links</h2>
            <p>हमारी वेबसाइट पर सरकारी वेबसाइटों और अन्य स्रोतों के Links हो सकते हैं। इन वेबसाइटों की Privacy Policy हमसे अलग हो सकती है। हम इन Third Party वेबसाइटों की जानकारी या नीतियों के लिए जिम्मेदार नहीं हैं।</p>
          </section>

          <section className={styles.section}>
            <h2>Google AdSense</h2>
            <p>हम Google AdSense का उपयोग करते हैं जो Targeted Ads दिखाने के लिए Cookies का उपयोग करता है। Google की Privacy Policy अधिक जानकारी के लिए <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">यहाँ क्लिक करें</a>।</p>
          </section>

          <section className={styles.section}>
            <h2>जानकारी की सुरक्षा</h2>
            <p>हम आपकी व्यक्तिगत जानकारी को किसी तीसरे पक्ष को नहीं बेचते, न ही शेयर करते हैं। आपकी जानकारी केवल आपसे संपर्क करने के उद्देश्य से उपयोग की जाती है।</p>
          </section>

          <section className={styles.section}>
            <h2>नीति में बदलाव</h2>
            <p>हम समय-समय पर इस Privacy Policy को अपडेट कर सकते हैं। किसी भी बदलाव के लिए इस पेज को नियमित रूप से जांचते रहें। अंतिम अपडेट: मार्च 2026।</p>
          </section>

          <section className={styles.section}>
            <h2>संपर्क करें</h2>
            <p>Privacy Policy से संबंधित किसी भी प्रश्न के लिए हमसे <a href="/contact">संपर्क करें</a>।</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
