const BASE_URL = 'https://sidhenaukri.in'; // apna domain yahan rakho

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
