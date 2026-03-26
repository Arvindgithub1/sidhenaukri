// src/components/job/SchemaMarkup.js

function formatDateForSchema(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = String(dateStr).split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
    }
    return null;
  } catch { return null; }
}

const BASE_URL = 'https://www.sidhenaukri.in';

function getPrefix(cat) {
  const c = (cat || '').toLowerCase();
  if (c === 'result')     return 'result';
  if (c === 'admit-card') return 'admit-card';
  if (c === 'answer-key') return 'answer-key';
  if (c === 'syllabus')   return 'syllabus';
  return 'jobs';
}

export default function SchemaMarkup({ item, section = 'jobs' }) {
  if (!item) return null;

  const prefix  = getPrefix(item.category);
  const pageUrl = `${BASE_URL}/${prefix}/${item.id}`;
  const year    = new Date().getFullYear();

  // 1. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: item.category,    item: `${BASE_URL}/${prefix}` },
      { '@type': 'ListItem', position: 3, name: item.title,       item: pageUrl },
    ],
  };

  // 2. JobPosting Schema — sirf Jobs category ke liye
  const jobPostingSchema = section === 'jobs' ? {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: item.title,
    description: `${item.title} ${year} — Qualification, Age Limit, Application Fee aur Online Apply ki puri jankari. ${item.organization ? `Bharti karne wala: ${item.organization}.` : ''}`,
    hiringOrganization: {
      '@type': 'Organization',
      name: item.organization || 'Government of India',
      sameAs: item.important_links?.official_website || BASE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: item.job_location || 'India',
      },
    },
    datePosted: formatDateForSchema(item.created_at) || new Date().toISOString().split('T')[0],
    validThrough: formatDateForSchema(item.important_dates?.last_date) || null,
    employmentType: 'FULL_TIME',
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: { '@type': 'QuantitativeValue', unitText: 'MONTH' },
    },
    totalJobOpenings: item.total_vacancy || null,
    url: pageUrl,
  } : null;

  // 3. FAQPage Schema — common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...(item.important_dates?.last_date ? [{
        '@type': 'Question',
        name: `${item.title} ki last date kya hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.title} ke liye apply karne ki last date ${item.important_dates.last_date} hai.`,
        },
      }] : []),
      ...(item.total_vacancy ? [{
        '@type': 'Question',
        name: `${item.title} mein kitni vacancy hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.title} mein kul ${item.total_vacancy} vacancies hain.`,
        },
      }] : []),
      ...(item.age_limit?.rows?.length ? [{
        '@type': 'Question',
        name: `${item.title} ke liye age limit kya hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.age_limit.rows.map(r => `${r.title}: ${r.age}`).join(', '),
        },
      }] : []),
      ...(item.application_fee?.general !== undefined ? [{
        '@type': 'Question',
        name: `${item.title} ka application fee kitna hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `General/OBC ke liye ₹${item.application_fee.general}, SC/ST ke liye ₹${item.application_fee.sc} application fee hai.`,
        },
      }] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {jobPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      )}
      {faqSchema.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}