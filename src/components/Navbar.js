'use client';
import { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/data/homeData';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>

        {/* Brand — left */}
        <Link href="/" className={styles.brand}>
          <span className={styles.brandIcon}>🎓</span>
          <span className={styles.brandName}>Sarkari Naukri</span>
        </Link>

        {/* Desktop nav links — middle */}
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={styles.link}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop search — right */}
        <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search..." />
          <button className={styles.searchBtn}><SearchIcon /></button>
        </div>

        {/* Mobile icons — right side */}
        <div className={styles.mobileIcons}>
          <button className={styles.mobileSearchIcon}
            onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
            aria-label="Search">
            <SearchIcon />
          </button>
          <button className={styles.hamburger}
            onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
            aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className={styles.mobileSearchBar}>
          <input className={styles.mobileSearchInput}
            type="text" placeholder="Search jobs / exam name..." autoFocus />
          <button className={styles.mobileSearchBtn}><SearchIcon /></button>
        </div>
      )}

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
