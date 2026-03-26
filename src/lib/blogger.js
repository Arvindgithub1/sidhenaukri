// src/lib/blogger.js  (MAIN SITE)

const BLOG_ID = "4760900627062932844";
const POST_ID = "1971014663745817119";
const API_KEY = "AIzaSyBcomLK77PJdaM7CXysztVxeAg8iVbF6c0";

// // ✅ Saari posts — 1 hour cache
// export async function getJobs() {
//   const res = await fetch(
//     `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
//     { next: { revalidate: 3600 } } // 1 hour cache
//   );
//   const data = await res.json();
//   console.log("api call")
//   const jobs = JSON.parse(data.content);
//   return Array.isArray(jobs) ? jobs : [];
// }






export async function getJobs() {
  console.log('🔥 Blogger API call hua:', new Date().toISOString());
  
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const jobs = JSON.parse(data.content);
  console.log('✅ Data mila:', jobs.length, 'posts');
  return Array.isArray(jobs) ? jobs : [];
}

// Single post by id
export async function getJobById(id) {
  const jobs = await getJobs();
  return jobs.find((job) => String(job.id) === String(id)) || null;
}

// Category wise posts
export async function getJobsByCategory(category) {
  const jobs = await getJobs();
  return jobs.filter(j => j.category?.toLowerCase() === category.toLowerCase());
}

// Latest N posts
export async function getLatestJobs(limit = 10) {
  const jobs = await getJobs();
  return jobs.slice(0, limit);
}