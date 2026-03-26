// src/app/search/page.js
import { Suspense } from 'react';
import { getJobs } from '@/lib/blogger';
import SearchClient from './SearchClient';

export default async function SearchPage() {
  const jobs = await getJobs();
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', color: '#1a3fa3' }}>Loading...</div>}>
      <SearchClient jobs={jobs} />
    </Suspense>
  );
}