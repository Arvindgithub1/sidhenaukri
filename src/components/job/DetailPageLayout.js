import Navbar            from '@/components/Navbar';
import Footer            from '@/components/Footer';
import Breadcrumb        from '@/components/job/Breadcrumb';
import JobHero           from '@/components/job/JobHero';
import ShortInfo         from '@/components/job/ShortInfo';
import SectionBlock      from '@/components/job/SectionBlock';
import KeyValueTable     from '@/components/job/KeyValueTable';
import VacancyGrid       from '@/components/job/VacancyGrid';
import ContentBlock      from '@/components/job/ContentBlock';
import ImportantLinks    from '@/components/job/ImportantLinks';
import QualificationList from '@/components/job/QualificationList';
import SchemaMarkup      from '@/components/job/SchemaMarkup';
import AdSlot            from '@/components/job/AdSlot';
import VideoEmbed        from '@/components/job/VideoEmbed';
import styles            from './DetailPageLayout.module.css';

function hasData(obj) {
  if (!obj) return false;
  if (Array.isArray(obj)) return obj.length > 0;
  if (typeof obj === 'object')
    return Object.values(obj).some((v) => v !== null && v !== undefined && v !== '');
  return Boolean(obj);
}

const SECTION_LABELS = {
  jobs:         'Latest Jobs',
  result:       'Results',
  'admit-card': 'Admit Card',
  'answer-key': 'Answer Key',
  syllabus:     'Syllabus',
};

const SECTION_HREFS = {
  jobs:         '/jobs',
  result:       '/result',
  'admit-card': '/admit-card',
  'answer-key': '/answer-key',
  syllabus:     '/syllabus',
};

export default function DetailPageLayout({ item, section = 'jobs' }) {
  const breadcrumbLabel = SECTION_LABELS[section] || 'Jobs';
  const breadcrumbHref  = SECTION_HREFS[section]  || '/jobs';

  return (
    <div className={styles.page}>
      <SchemaMarkup item={item} section={section} />
      <Navbar />
      <main className={styles.main}>

        <Breadcrumb items={[
          { label: 'Home',          href: '/' },
          { label: breadcrumbLabel, href: breadcrumbHref },
          { label: item.title }
        ]} />

        <JobHero job={item} />

        <SectionBlock title="Short Information">
          <ShortInfo item={item} />
        </SectionBlock>

        <AdSlot />

        {/* Important Dates */}
        {hasData(item.important_dates) && (
          <SectionBlock title="Important Dates">
            <KeyValueTable data={item.important_dates} />
          </SectionBlock>
        )}

        {/* Qualification */}
        {Array.isArray(item.qualification1) && item.qualification1.length > 0 && (
          <SectionBlock title="Qualification">
            <QualificationList data={item.qualification1} />
          </SectionBlock>
        )}

        {/* Type1 */}
        {Array.isArray(item.type1) && item.type1.map((grid, i) =>
          (grid?.rows?.length || grid?.oneline?.length) ? (
            <SectionBlock key={i} title={grid.title || 'Details'}>
              <VacancyGrid data={[grid]} />
            </SectionBlock>
          ) : null
        )}

        {/* Type2 */}
        {Array.isArray(item.type2) && item.type2.map((grid, i) =>
          (grid?.rows?.length || grid?.oneline?.length) ? (
            <SectionBlock key={i} title={grid.title || 'Details'}>
              <VacancyGrid data={[grid]} />
            </SectionBlock>
          ) : null
        )}

        {/* Type3 */}
        {Array.isArray(item.type3) && item.type3.map((block, i) =>
          block?.title ? (
            <SectionBlock key={i} title={block.title}>
              <ContentBlock data={[block]} />
            </SectionBlock>
          ) : null
        )}

        {/* Video */}
        {item.video?.url && (
          <SectionBlock title={item.video.title || 'Video'}>
            <VideoEmbed url={item.video.url} />
          </SectionBlock>
        )}

        {/* Important Links */}
        <SectionBlock title="Important Links">
          <ImportantLinks item={item} section={section} />
        </SectionBlock>

      </main>
      <Footer />
    </div>
  );
}