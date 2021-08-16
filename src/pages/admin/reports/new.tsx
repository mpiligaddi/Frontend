import { AdminLayout } from '@/components/common';
import { ensureAuth } from '@/lib/auth';
import { Page } from '@/typings';

const NewReport: Page = () => {
  return <p>New Report</p>;
};

NewReport.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default NewReport;
