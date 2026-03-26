// src/lib/metadata.js
const BASE_URL = 'https://www.sidhenaukri.in';

const SEO_TITLES = {
  Jobs: (title, year) =>
    `${title} Recruitment ${year}: Online Form Kaise Bhare? | Sidhe Naukri`,
  result: (title, year) =>
    `${title} Result ${year} Out: Scorecard Kaise Check Kare? | Sidhe Naukri`,
  'admit-card': (title, year) =>
    `${title} Admit Card ${year} Download: Hall Ticket Kaise Nikale? | Sidhe Naukri`,
  'answer-key': (title, year) =>
    `${title} Answer Key ${year} PDF: Answer Sheet Kaise Dekhe? | Sidhe Naukri`,
  syllabus: (title, year) =>
    `${title} Syllabus ${year} in Hindi: Exam Pattern aur Topics PDF | Sidhe Naukri`,
};

const SEO_DESCRIPTIONS = {
  Jobs: (title, year) =>
    `${title} भर्ती ${year} का Notification जारी। Qualification, Age Limit और Online Apply करने की पूरी जानकारी यहाँ देखें। सीधी भर्ती की पक्की सूचना - SidheNaukri.in`,
  result: (title, year) =>
    `${title} का Result और Merit List घोषित कर दी गई है। अपना Scorecard और Cut-off marks चेक करने के लिए Direct Link यहाँ देखें। सबसे तेज़ अपडेट - SidheNaukri.in`,
  'admit-card': (title, year) =>
    `${title} परीक्षा के Admit Card और Exam City details जारी। अपना हॉल टिकट डाउनलोड करने और Exam Date चेक करने के लिए यहाँ क्लिक करें - SidheNaukri.in`,
  'answer-key': (title, year) =>
    `${title} की Official Answer Key जारी। अपने उत्तरों का मिलान करें और PDF डाउनलोड करें। Objection दर्ज करने का Direct Link यहाँ है - SidheNaukri.in`,
  syllabus: (title, year) =>
    `${title} का नया Syllabus और Exam Pattern हिंदी में PDF डाउनलोड करें। जानें कौन-से विषय से कितने सवाल आएंगे और तैयारी कैसे करें - SidheNaukri.in`,
};

export function generatePostMetadata(post) {
  if (!post) return {};

  const year   = new Date().getFullYear();
  const cat    = post.category || 'Jobs';
  const prefix = cat === 'result' ? 'result' : cat === 'admit-card' ? 'admit-card' : cat === 'answer-key' ? 'answer-key' : cat === 'syllabus' ? 'syllabus' : 'jobs';

  const titleFn = SEO_TITLES[cat]       || SEO_TITLES['Jobs'];
  const descFn  = SEO_DESCRIPTIONS[cat] || SEO_DESCRIPTIONS['Jobs'];

  const seoTitle = titleFn(post.title, year);
  const seoDesc  = descFn(post.title, year);
  const url      = `${BASE_URL}/${prefix}/${post.id}`;
  const image    = `${BASE_URL}/og-image.svg`;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [
      post.title,
      `${post.title} ${year}`,
      post.organization,
      cat,
      'sarkari naukri',
      'govt jobs',
      'sidhe naukri',
    ].filter(Boolean).join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url,
      siteName: 'Sidhe Naukri',
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      locale: 'hi_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: [image],
    },
  };
}