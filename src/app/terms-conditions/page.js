import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../about/page.module.css';
export const revalidate = 864000;

export const metadata = {
  title: 'Terms & Conditions | Sidhe Naukri',
  description: 'Sidhe Naukri के उपयोग की शर्तें और नियम पढ़ें।',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Terms & Conditions</h1>
          <p className={styles.heroSub}>उपयोग की शर्तें</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>स्वीकृति</h2>
            <p>Sidhe Naukri वेबसाइट का उपयोग करके आप इन Terms & Conditions से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं तो कृपया इस वेबसाइट का उपयोग न करें।</p>
          </section>

          <section className={styles.section}>
            <h2>वेबसाइट का उपयोग</h2>
            <ul>
              <li>यह वेबसाइट केवल सूचना के उद्देश्य से है</li>
              <li>किसी भी जानकारी का Commercial उपयोग प्रतिबंधित है</li>
              <li>वेबसाइट की सामग्री को बिना अनुमति Copy करना मना है</li>
              <li>किसी भी प्रकार की Spam या Harmful Activity प्रतिबंधित है</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Intellectual Property</h2>
            <p>Sidhe Naukri पर प्रकाशित सभी Content, Logo, Design और Trademark हमारी Intellectual Property हैं। इनका बिना अनुमति उपयोग कानूनी कार्रवाई का कारण बन सकता है।</p>
          </section>

          <section className={styles.section}>
            <h2>जिम्मेदारी की सीमा</h2>
            <p>हम किसी भी प्रत्यक्ष, अप्रत्यक्ष या परिणामी नुकसान के लिए जिम्मेदार नहीं हैं जो इस वेबसाइट के उपयोग से हो सकता है। सभी जानकारी "As Is" आधार पर प्रदान की जाती है।</p>
          </section>

          <section className={styles.section}>
            <h2>बदलाव का अधिकार</h2>
            <p>हम किसी भी समय इन Terms & Conditions को बदलने का अधिकार रखते हैं। बदलाव इस पेज पर प्रकाशित होने के बाद तुरंत प्रभावी हो जाते हैं। अंतिम अपडेट: मार्च 2026।</p>
          </section>

          <section className={styles.section}>
            <h2>Governing Law</h2>
            <p>ये Terms & Conditions भारतीय कानून के अनुसार संचालित होती हैं। किसी भी विवाद की स्थिति में Rajasthan की अदालतों का अधिकार क्षेत्र मान्य होगा।</p>
          </section>

          <section className={styles.section}>
            <h2>संपर्क करें</h2>
            <p>Terms & Conditions से संबंधित किसी भी प्रश्न के लिए हमसे <a href="/contact">संपर्क करें</a>।</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
