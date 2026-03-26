// src/app/contact/ContactForm.js
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Something went wrong');
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <Navbar />
      <main className={styles.main}>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSub}>Koi sawaal ya sujhav? Hamse sampark karein</p>
        </div>

        <div className={styles.container}>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <h3 className={styles.infoTitle}>Email</h3>
                <p className={styles.infoText}>sidhenaukri@gmail.com</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>💬</span>
              <div>
                <h3 className={styles.infoTitle}>WhatsApp</h3>
                <a href="https://whatsapp.com/channel/0029Vb7fACrKgsNpEBwQ8n0W" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>Join Channel</a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📱</span>
              <div>
                <h3 className={styles.infoTitle}>Telegram</h3>
                <a href="https://t.me/sidhenaukri" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>@sidhenaukri</a>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Message</h2>

            {success ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>✅</span>
                <h3>Message Send Ho Gaya!</h3>
                <p>Aapka message mil gaya hai. Hum jald hi reply karenge।</p>
                <button className={styles.resetBtn} onClick={() => setSuccess(false)}>
                  Aur Message Bhejein
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label>Naam *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                  </div>
                  <div className={styles.field}>
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" required />
                </div>
                <div className={styles.field}>
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Apna sawaal ya sujhav likhein..." rows={5} required />
                </div>
                {error && <div className={styles.errorBox}>{error}</div>}
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending....' : ' Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}