// src/lib/blogger.js

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const POST_ID = process.env.BLOGGER_POST_ID;
const API_KEY = process.env.BLOGGER_API_KEY;

export async function getJobs() {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  try {
    const jobs = JSON.parse(data.content);
    return Array.isArray(jobs) ? jobs : [];
  } catch {
    return [];
  }
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