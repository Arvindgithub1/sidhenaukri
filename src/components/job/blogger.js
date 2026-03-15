// src/lib/blogger.js

const BLOG_ID = '2842912977848904218';
const POST_ID = '677255062058506731';
const API_KEY = 'AIzaSyALruA3pculIf5zjHeam_wq3fOHQSUJZ7o';

// Get all jobs (array from single blogger post)
export async function getJobs() {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const jobs = JSON.parse(data.content);
  return jobs;
}

// Get single job by id
export async function getJobById(id) {
  const jobs = await getJobs();
  return jobs.find((job) => job.id === id) || null;
}
