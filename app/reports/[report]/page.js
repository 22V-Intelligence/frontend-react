import getReportBySlug, { getReports } from '../../../lib/getReportBySlug';
import getPageSections from '@/lib/getPageSections';
import { ReportPage } from '@/app/components/collections/ReportPage';

export default async function Page({ params }) {
	const data = await getReportBySlug(params?.report);
	const sections = await getPageSections(data?.data[0]?.id, `reports`);
	const posts = await getReports(params?.report);

	const title = data?.data[0]?.attributes?.Title;
	const publishedAt = data?.data[0]?.attributes?.publishedAt;

	return (
		<ReportPage
			title={title}
			publishedAt={publishedAt}
			sections={sections}
			posts={posts.data}
		/>
	);
}
