// src/lib/blogger.js

const BLOG_ID = '2842912977848904218';
const POST_ID = '677255062058506731';
const API_KEY = 'AIzaSyALruA3pculIf5zjHeam_wq3fOHQSUJZ7o';

async function getAllData() {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
    // { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return JSON.parse(data.content);
}

// Sab jobs — koi filter nahi
export async function getJobs() {
  return await getAllData();
}

// id se single job dhundo
export async function getJobById(id) {
  const all = await getAllData();
  return all.find((item) => String(item.id) === String(id)) || null;
}
