import Navbar           from '@/components/Navbar';
import Footer           from '@/components/Footer';
import Breadcrumb       from '@/components/job/Breadcrumb';
import JobHero          from '@/components/job/JobHero';
import SectionBlock     from '@/components/job/SectionBlock';
import KeyValueTable    from '@/components/job/KeyValueTable';
import VacancyGrid      from '@/components/job/VacancyGrid';
import ContentBlock     from '@/components/job/ContentBlock';
import SelectionProcess from '@/components/job/SelectionProcess';
import ImportantLinks   from '@/components/job/ImportantLinks';
import QualificationList from '@/components/job/QualificationList';
import AdSlot           from '@/components/job/AdSlot';
import styles           from './DetailPageLayout.module.css';

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

export default function DetailPageLayout({ item, section = 'jobs' }) {
  const breadcrumb = SECTION_LABELS[section] || 'Jobs';

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>

        <Breadcrumb items={['Home', breadcrumb, item.title]} />
        <JobHero job={item} />
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

        {/* Application Fee */}
        {hasData(item.application_fee) && (
          <SectionBlock title="Application Fee">
            <KeyValueTable data={item.application_fee} showRupee={true} />
          </SectionBlock>
        )}

        {/* Age Limit */}
        {hasData(item.age_limit) && (
          <SectionBlock title="Age Limit">
            <KeyValueTable data={item.age_limit} />
          </SectionBlock>
        )}

        {/* Vacancy Details */}
        {hasData(item.vacancy_details) && (
          <SectionBlock title="Vacancy Details">
            <KeyValueTable data={item.vacancy_details} />
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