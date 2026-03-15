import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../about/page.module.css';

export const metadata = {
  title: 'Disclaimer | Sidhe Naukri',
  description: 'Sidhe Naukri का Disclaimer पढ़ें। हम किसी भी सरकारी विभाग के आधिकारिक प्रतिनिधि नहीं हैं।',
};

export default function DisclaimerPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Disclaimer</h1>
          <p className={styles.heroSub}>अस्वीकरण</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>सामान्य जानकारी</h2>
            <p>Sidhe Naukri (sidhenaukri.in) किसी भी सरकारी विभाग, मंत्रालय या भर्ती बोर्ड का आधिकारिक पोर्टल नहीं है। यह एक स्वतंत्र सूचना पोर्टल है जो सार्वजनिक रूप से उपलब्ध जानकारी को एकत्र करके प्रस्तुत करता है।</p>
          </section>

          <section className={styles.section}>
            <h2>जानकारी की सटीकता</h2>
            <p>हम अपनी वेबसाइट पर दी गई जानकारी को सटीक और अद्यतन रखने का प्रयास करते हैं। हालांकि, किसी भी भर्ती की अंतिम और आधिकारिक जानकारी के लिए कृपया संबंधित विभाग की आधिकारिक वेबसाइट ही देखें।</p>
            <ul>
              <li>आवेदन की अंतिम तिथि आधिकारिक वेबसाइट से ही कन्फर्म करें</li>
              <li>Vacancy संख्या में बदलाव हो सकता है</li>
              <li>Exam Date बदल सकती है</li>
              <li>हमेशा Official Notification पढ़ें</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>आधिकारिक वेबसाइट देखें</h2>
            <p>किसी भी भर्ती के लिए आवेदन करने से पहले संबंधित विभाग की आधिकारिक वेबसाइट पर जाकर पूरी जानकारी पढ़ें। हम किसी भी आवेदन में हुई त्रुटि या नुकसान के लिए जिम्मेदार नहीं होंगे।</p>
          </section>

          <section className={styles.section}>
            <h2>Copyright</h2>
            <p>Sidhe Naukri पर प्रकाशित सामग्री हमारी अपनी है। किसी भी सामग्री को बिना अनुमति के Copy या Reproduce करना प्रतिबंधित है।</p>
          </section>

          <section className={styles.section}>
            <h2>संपर्क करें</h2>
            <p>Disclaimer से संबंधित किसी भी प्रश्न के लिए हमसे <a href="/contact">संपर्क करें</a>।</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
