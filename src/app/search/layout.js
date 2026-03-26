// src/app/search/layout.js
export const metadata = {
  title: 'Sarkari Naukri Search 2026 - Jobs, Results, Admit Card | Sidhe Naukri',
  description: 'SidheNaukri.in पर SSC, Railway, Police, Bank सभी सरकारी नौकरियां, Results और Admit Card एक जगह Search करें। Title, Category, Tag और Location से Filter करें।',
  alternates: {
    canonical: 'https://www.sidhenaukri.in/search',
  },
  openGraph: {
    title: 'Sarkari Naukri Search - Sidhe Naukri',
    description: 'SSC, Railway, Police, Bank — sab govt jobs ek jagah search karo.',
    url: 'https://www.sidhenaukri.in/search',
  },
};

export default function SearchLayout({ children }) {
  return children;
}