import { getJobs } from '@/lib/blogger';

const BASE_URL = 'https://www.sidhenaukri.in';

function getPrefix(category) {
  const cat = (category || '').toLowerCase();
  if (cat === 'result')     return 'result';
  if (cat === 'admit-card') return 'admit-card';
  if (cat === 'answer-key') return 'answer-key';
  if (cat === 'syllabus')   return 'syllabus';
  return 'jobs';
}

function parseDate(ddmmyyyy) {
  try {
    if (!ddmmyyyy) return new Date();
    const [d, m, y] = ddmmyyyy.split('/');
    const date = new Date(`${y}-${m}-${d}`);
    return isNaN(date) ? new Date() : date;
  } catch { return new Date(); }
}

export default async function sitemap() {
  const jobs = await getJobs();

  const staticPages = [
    { url: BASE_URL,                        lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/jobs`,              lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/result`,            lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/admit-card`,        lastModified: new Date(), changeFrequency: 'daily',  priority: 0.8 },
    { url: `${BASE_URL}/answer-key`,        lastModified: new Date(), changeFrequency: 'daily',  priority: 0.8 },
    { url: `${BASE_URL}/syllabus`,          lastModified: new Date(), changeFrequency: 'daily',  priority: 0.8 },
    { url: `${BASE_URL}/category`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/search`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/about`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms-conditions`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const dynamicPages = jobs.map((job) => ({
    url: `${BASE_URL}/${getPrefix(job.category)}/${job.id}`,
    lastModified: parseDate(job.created_at),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticPages, ...dynamicPages];
}