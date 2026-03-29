// src/app/contact/page.js
import ContactForm from './ContactForm';
export const revalidate = 864000;
export const metadata = {
  title: 'Contact Us | Sidhe Naukri',
  description: 'SidheNaukri.in se sampark karein. Koi bhi sawaal, sujhav ya shikayat ke liye hamse contact karein.',
};

export default function ContactPage() {
  return <ContactForm />;
}