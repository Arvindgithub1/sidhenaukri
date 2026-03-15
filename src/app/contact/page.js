'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../about/page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSub}>हमसे संपर्क करें</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>संपर्क जानकारी</h2>
            <div className={styles.infoBox}>
              <p>📧 Email: contact@sidhenaukri.in</p>
            </div>
            <p>किसी भी गलत जानकारी, सुझाव या शिकायत के लिए नीचे दिए गए फॉर्म को भरें। हम 24-48 घंटों में जवाब देने की कोशिश करते हैं।</p>
          </section>

          <section className={styles.section}>
            <h2>संदेश भेजें</h2>
            {submitted ? (
              <div className={styles.infoBox}>
                <p>✅ आपका संदेश मिल गया! हम जल्द ही आपसे संपर्क करेंगे।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.contactGrid}>
                  <div className={styles.formGroup}>
                    <label>आपका नाम *</label>
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email *</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Subject</label>
                    <input type="text" placeholder="Subject" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input type="tel" placeholder="Mobile Number" />
                  </div>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label>संदेश *</label>
                    <textarea placeholder="अपना संदेश यहाँ लिखें..." required />
                  </div>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  संदेश भेजें →
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
