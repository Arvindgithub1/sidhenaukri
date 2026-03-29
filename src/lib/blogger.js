// src/lib/blogger.js
import { unstable_cache } from 'next/cache';

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const POST_ID = process.env.BLOGGER_POST_ID;
const API_KEY = process.env.BLOGGER_API_KEY;

// Fetch with cache tag — revalidateTag se refresh hoga
const fetchJobs = unstable_cache(
  async () => {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    const jobs = JSON.parse(data.content);
    return Array.isArray(jobs) ? jobs : [];
  },
  ['blogger-jobs'],
  {
    tags: ['blogger-jobs'],
    revalidate: 86400, // 24 ghante cache
  }
);

export async function getJobs() {
  return await fetchJobs();
}

export async function getJobById(id) {
  const jobs = await getJobs();
  return jobs.find((job) => String(job.id) === String(id)) || null;
}

export async function getJobsByCategory(category) {
  const jobs = await getJobs();
  return jobs.filter(j => j.category?.toLowerCase() === category.toLowerCase());
}

export async function getLatestJobs(limit = 10) {
  const jobs = await getJobs();
  return jobs.slice(0, limit);
}