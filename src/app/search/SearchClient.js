// src/app/search/SearchClient.js
'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './search.module.css';

const CATEGORIES = ['All', 'Jobs', 'result', 'admit-card', 'answer-key', 'syllabus'];

const CAT_COLORS = {
  jobs:         { bg: '#e8f5e9', color: '#2e7d32' },
  result:       { bg: '#fff3e0', color: '#e67e22' },
  'admit-card': { bg: '#e3f2fd', color: '#1565c0' },
  'answer-key': { bg: '#fce4ec', color: '#c62828' },
  syllabus:     { bg: '#f3e5f5', color: '#6a1b9a' },
};

function getPrefix(cat) {
  const c = (cat || '').toLowerCase();
  if (c === 'result')     return 'result';
  if (c === 'admit-card') return 'admit-card';
  if (c === 'answer-key') return 'answer-key';
  if (c === 'syllabus')   return 'syllabus';
  return 'jobs';
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = String(dateStr).split('/');
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      if (isNaN(d)) return dateStr;
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return dateStr;
  } catch { return dateStr; }
}

export default function SearchClient({ jobs = [] }) {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [query, setQuery]           = useState(searchParams.get('q') || '');
  const [category, setCategory]     = useState(searchParams.get('cat') || 'All');
  const [visibleCount, setVisibleCount] = useState(20);

  // URL sync
  useEffect(() => {
    const params = new URLSearchParams();
    if (query)              params.set('q',   query);
    if (category !== 'All') params.set('cat', category);
    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    router.replace(newUrl, { scroll: false });
  }, [query, category]);

  // Reset visible count on filter change
  useEffect(() => { setVisibleCount(20); }, [query, category]);

  // Filter
  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const q = query.toLowerCase().trim();
      const matchQ = !q ||
        job.title?.toLowerCase().includes(q) ||
        job.organization?.toLowerCase().includes(q) ||
        job.id?.toLowerCase().includes(q) ||
        (Array.isArray(job.tags) && job.tags.some(t => t.toLowerCase().includes(q)));
      const matchCat = category === 'All' || job.category?.toLowerCase() === category.toLowerCase();
      return matchQ && matchCat;
    });
  }, [jobs, query, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasFilters = query || category !== 'All';

  const handleClear = () => {
    setQuery(''); setCategory('All');
  };

  return (
    <div className={styles.wrap}>
      <Navbar />

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Sarkari Naukri <span>Search</span></h1>
        <p className={styles.heroSub}>Jobs, Results, Admit Card — sab ek jagah</p>

        <div className={styles.searchBox}>
          <div className={styles.searchRow}>
            <div className={styles.searchInputWrap}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search: SSC GD, Railway, Police, Bank..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
              {query && <button className={styles.clearBtn} onClick={() => setQuery('')}>✕</button>}
            </div>
          </div>

          <div className={styles.filters}>
            <select className={styles.filterSelect} value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
            {hasFilters && (
              <button className={styles.clearAllBtn} onClick={handleClear}>Clear All</button>
            )}
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.resultMeta}>
          <span className={styles.resultCount}>{filtered.length} results</span>
          {hasFilters && <span className={styles.resultFilter}> for your search</span>}
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>Koi result nahi mila</p>
            <button className={styles.clearAllBtn} onClick={handleClear}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div className={styles.resultList}>
              {visible.map(job => {
                const cat = (job.category || 'jobs').toLowerCase();
                const catStyle = CAT_COLORS[cat] || CAT_COLORS.jobs;
                const prefix = getPrefix(job.category);
                const lastDate   = formatDate(job.important_dates?.last_date);
                const resultDate = formatDate(job.important_dates?.result_date);
                const examDate   = formatDate(job.important_dates?.exam_date);
                return (
                  <Link key={job.id} href={`/${prefix}/${job.id}`} className={styles.jobCard}>
                    <div className={styles.cardLeft}>
                      <span className={styles.catBadge} style={{ background: catStyle.bg, color: catStyle.color }}>
                        {job.category}
                      </span>
                      <h2 className={styles.jobTitle}>{job.title}</h2>
                      <div className={styles.jobMeta}>
                        {job.organization && <span className={styles.org}>{job.organization}</span>}
                        {job.job_location  && <span className={styles.loc}>📍 {job.job_location}</span>}
                        {job.total_vacancy && <span className={styles.vacancy}>📋 {Number(job.total_vacancy).toLocaleString()} Posts</span>}
                      </div>
                      {(lastDate || resultDate || examDate) && (
                        <div className={styles.dates}>
                          {lastDate   && <span className={styles.dateChip}>⏰ Last Date: {lastDate}</span>}
                          {examDate   && !lastDate && <span className={styles.dateChip}>📅 Exam: {examDate}</span>}
                          {resultDate && <span className={styles.dateChipGreen}>✅ Result: {resultDate}</span>}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardRight}>
                      <span className={styles.viewBtn}>View →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            {hasMore && (
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount(v => v + 20)}
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}