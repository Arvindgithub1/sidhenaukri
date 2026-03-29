import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';
export const revalidate = 864000;
export const metadata = {
  title: "About Us - Sidhe Naukri: India's Trusted Govt Jobs Portal",
  description: "SidheNaukri.in के बारे में जानें। हम आपको SSC, Railway, Bank and All Government Jobs (Sarkari Result) की सबसे तेज़ और सटीक जानकारी प्रदान करते हैं।"
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSub}>Sidhe Naukri के बारे में</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>हम कौन हैं?</h2>
            <p>Sidhe Naukri एक भरोसेमंद सरकारी नौकरी पोर्टल है जो भारत के लाखों युवाओं को सरकारी भर्तियों की सबसे तेज़ और सटीक जानकारी प्रदान करता है। हमारा मुख्य उद्देश्य है कि हर उम्मीदवार को सही समय पर सही जानकारी मिले।</p>
          </section>

          <section className={styles.section}>
            <h2>हमारा उद्देश्य</h2>
            <p>हम उन युवाओं के लिए काम करते हैं जो सरकारी नौकरी पाना चाहते हैं लेकिन सही जानकारी के अभाव में पीछे रह जाते हैं। Sidhe Naukri पर आपको मिलता है:</p>
            <ul>
              <li>Latest Government Jobs की तुरंत जानकारी</li>
              <li>Admit Card, Result और Answer Key के Direct Links</li>
              <li>Syllabus और Exam Pattern की पूरी जानकारी</li>
              <li>10वीं, 12वीं और Graduate सभी के लिए अलग-अलग भर्तियां</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Disclaimer</h2>
            <p>Sidhe Naukri किसी भी सरकारी विभाग का आधिकारिक पोर्टल नहीं है। हम केवल सार्वजनिक रूप से उपलब्ध जानकारी को एक जगह प्रस्तुत करते हैं। किसी भी भर्ती के लिए आधिकारिक वेबसाइट से ही आवेदन करें।</p>
          </section>

          <section className={styles.section}>
            <h2>हमसे जुड़ें</h2>
            <p>अगर आपके कोई सुझाव हैं या आप हमसे संपर्क करना चाहते हैं तो हमारे <a href="/contact">Contact Us</a> पेज पर जाएं।</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
