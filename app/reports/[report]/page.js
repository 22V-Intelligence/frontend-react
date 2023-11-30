import { getServerSession } from 'next-auth';
import getReportBySlug, { getReports } from '../../../lib/getReportBySlug';
import getPageSections from '@/lib/getPageSections';
import { ReportPage } from '@/app/components/collections/ReportPage';
import { notFound, redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export default async function Page({ params: { report } }) {
	const session = await getServerSession(authOptions);

	if (!session) redirect(`/sign-in?callbackUrl=/reports/${report}`);

	if (!report) notFound();

	const data = await getReportBySlug(report);
	// const sections = await getPageSections(data?.data[0]?.id, `reports`);
	const posts = await getReports(report);

	const title = data?.data[0]?.attributes?.Title;

	if (!title) notFound();

	const sections = data.data[0]?.attributes?.Sections;

	console.log('data: ', data);
	console.log('sections: ', sections);

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
