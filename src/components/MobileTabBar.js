'use client';
import { useState } from 'react';
import styles from './MobileTabBar.module.css';

const TABS = [
  { id: 'jobs',      label: 'Jobs' },
  { id: 'category',  label: 'Category' },
  { id: 'results',   label: 'Results' },
  { id: 'admitcard', label: 'Admit Card' },
  { id: 'answerkey', label: 'Answer Key' },
  { id: 'syllabus',  label: 'Syllabus' },
];

export default function MobileTabBar() {
  const [activeTab, setActiveTab] = useState('jobs');

  const handleClick = (id) => {
    setActiveTab(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const offset = 62 + 46 + 12;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.tabBar}>
      <div className={styles.scroll}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => handleClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
