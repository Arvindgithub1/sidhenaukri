import Navbar            from '@/components/Navbar';
import Footer            from '@/components/Footer';
import Breadcrumb        from '@/components/job/Breadcrumb';
import JobHero           from '@/components/job/JobHero';
import ShortInfo         from '@/components/job/ShortInfo';
import SectionBlock      from '@/components/job/SectionBlock';
import KeyValueTable     from '@/components/job/KeyValueTable';
import VacancyGrid       from '@/components/job/VacancyGrid';
import ContentBlock      from '@/components/job/ContentBlock';
import SelectionProcess  from '@/components/job/SelectionProcess';
import ImportantLinks    from '@/components/job/ImportantLinks';
import QualificationList from '@/components/job/QualificationList';
import SchemaMarkup      from '@/components/job/SchemaMarkup';
import AdSlot            from '@/components/job/AdSlot';
import styles            from './DetailPageLayout.module.css';

function hasData(obj) {
  if (!obj) return false;
  if (Array.isArray(obj)) return obj.length > 0;
  if (typeof obj === 'object')
    return Object.values(obj).some((v) => v !== null && v !== undefined && v !== '');
  return Boolean(obj);
}

function hasAge(age) {
  if (!age) return false;
  if (age.rows) return Array.isArray(age.rows) && age.rows.length > 0;
  if (Array.isArray(age)) return age.length > 0;
  return hasData(age);
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
      {/* Schema Markup — SEO */}
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

        {/* Post Name */}
        {Array.isArray(item.post_name) && item.post_name.map((grid, i) => (
          grid?.title || grid?.rows?.length ? (
            <SectionBlock key={i} title={grid.title || 'Post Name'}>
              <VacancyGrid data={[grid]} />
            </SectionBlock>
          ) : null
        ))}

        {/* Qualification */}
        {Array.isArray(item.qualification1) && item.qualification1.length > 0 && (
          <SectionBlock title="Qualification">
            <QualificationList data={item.qualification1} />
          </SectionBlock>
        )}

        {/* Application Fee */}
        {hasData(item.application_fee) && (
          <SectionBlock title="Application Fee">
            <KeyValueTable data={item.application_fee} type="fee" />
          </SectionBlock>
        )}

        {/* Age Limit */}
        {hasAge(item.age_limit) && (
          <SectionBlock title="Age Limit">
            <KeyValueTable data={item.age_limit} type="age" />
          </SectionBlock>
        )}

        {/* tablev */}
        {Array.isArray(item.tablev) && item.tablev.map((grid, i) => (
          grid?.title || grid?.rows?.length ? (
            <SectionBlock key={i} title={grid.title || 'Vacancy Details'}>
              <VacancyGrid data={[grid]} />
            </SectionBlock>
          ) : null
        ))}

        {/* Selection Process */}
        {hasData(item.selection_process) && (
          <SectionBlock title="Selection Process">
            <SelectionProcess steps={item.selection_process} />
          </SectionBlock>
        )}

        {/* table1 */}
        {Array.isArray(item.table1) && item.table1.map((block, i) => (
          block?.title ? (
            <SectionBlock key={i} title={block.title}>
              <ContentBlock data={[block]} />
            </SectionBlock>
          ) : null
        ))}

        {/* Important Links */}
        <SectionBlock title="Important Links">
          <ImportantLinks item={item} section={section} />
        </SectionBlock>

      </main>
      <Footer />
    </div>
  );
}