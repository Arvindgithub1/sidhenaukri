// src/lib/formatDate.js
// DD/MM/YYYY → "12 Mar 2026"

export function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = String(dateStr).split('/');
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
      if (isNaN(d)) return dateStr;
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return dateStr;
  } catch { return dateStr; }
}
