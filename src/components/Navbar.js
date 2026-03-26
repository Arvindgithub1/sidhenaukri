'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { navLinks } from '@/data/homeData';
import styles from './Navbar.module.css';

const Logo = () => (
  <svg width="160" height="40" viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sidhe Naukri - Latest Govt Jobs Portal"><title>Sidhe Naukri - Latest Govt Jobs Portal</title>
    <text x="0" y="48"
      fontFamily="'Poppins','Segoe UI',Arial,sans-serif"
      fontSize="42" fontWeight="800"
      fill="#ffffff" letterSpacing="-0.5">Sidhe<tspan fill="#fbbf24">Naukri</tspan></text>
    <path d="M78,56 Q148,70 218,56"
      fill="none" stroke="#fbbf24"
      strokeWidth="3" strokeLinecap="round"/>
    <line x1="218" y1="56" x2="207" y2="51"
      stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
    <line x1="218" y1="56" x2="208" y2="63"
      stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.elements?.search?.value?.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>

        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <Logo />
        </Link>

        {/* Desktop nav links */}
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={styles.link}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop search */}
        <form className={styles.searchBox} onSubmit={handleSearch}>
          <input name="search" className={styles.searchInput} type="text" placeholder="Search..." onClick={() => router.push('/search')} readOnly />
          <button type="submit" className={styles.searchBtn}><SearchIcon /></button>
        </form>

        {/* Mobile icons */}
        <div className={styles.mobileIcons}>
          <button className={styles.mobileSearchIcon}
            onClick={() => router.push('/search')}
            aria-label="Search">
            <SearchIcon />
          </button>
          <button className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

      </div>

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