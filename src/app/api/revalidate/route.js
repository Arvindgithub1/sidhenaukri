

// src/app/api/revalidate/route.js  (SITE)
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const SECRET   = process.env.REVALIDATE_SECRET ;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function warmCache(paths) {
  for (const path of paths) {
    fetch(`${SITE_URL}${path}`, { cache: 'no-store' }).catch(() => {});
  }
}

export async function POST(request) {
  try {
    const { secret, paths } = await request.json();

    if (secret !== SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }


    revalidateTag('blogger-jobs');

    if (Array.isArray(paths) && paths.length > 0) {
      paths.forEach(path => revalidatePath(path));
      warmCache(paths);
    } else {
      revalidatePath('/');
      revalidatePath('/jobs');
      revalidatePath('/result');
      revalidatePath('/admit-card');
      revalidatePath('/answer-key');
      revalidatePath('/syllabus');
      revalidatePath('/search');
      warmCache(['/', '/jobs', '/result', '/admit-card', '/answer-key', '/syllabus', '/search']);
    }

    return NextResponse.json({ success: true, revalidated: paths, total: paths?.length || 0 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}