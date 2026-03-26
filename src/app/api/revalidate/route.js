// src/app/api/revalidate/route.js  (MAIN SITE — alag Next.js project)
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'sidhenaukri-secret-2026';

export async function POST(request) {
  try {
    const { secret, paths } = await request.json();

    // Secret check
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: 'Paths required' }, { status: 400 });
    }

    // Har path revalidate karo
    const revalidated = [];
    for (const path of paths) {
      try {
        revalidatePath(path);
        revalidated.push(path);
      } catch (e) {
        console.error(`Failed to revalidate ${path}:`, e.message);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated,
      message: `${revalidated.length} path(s) revalidated successfully`,
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}