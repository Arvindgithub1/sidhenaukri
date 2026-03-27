// src/components/job/VideoEmbed.js
import styles from './VideoEmbed.module.css';

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
  } catch {}
  return null;
}

export default function VideoEmbed({ url }) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.iframeWrap}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
      </div>
    </div>
  );
}