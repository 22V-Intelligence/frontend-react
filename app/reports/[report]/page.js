import getReportBySlug from '../../../lib/getReportBySlug';
import { getServerSession } from 'next-auth';
import { ReportPage } from '@/app/components/collections/ReportPage';
import { notFound, redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

// 'use client';

// export async function generateStaticParams() {
// 	const res = await fetch(`${process.env.APP_URL}/api/reports`);
// 	const data = await res.json();

// 	if (!res.ok) {
// 		throw new Error('Failed to fetch');
// 	}

// 	const paths = data?.data.map((item) => {
// 		return {
// 			params: {
// 				report: item.attributes.Slug,
// 			},
// 		};
// 	});

// 	return paths;
// }

export default async function Page({ params: { report } }) {
	const session = await getServerSession(authOptions);

	const data = await getReportBySlug(report);
	console.log('report: ', report);

	if (!session) redirect(`/sign-in?callbackUrl=/reports/${report}`);

	if (!report) notFound();

	const title = data?.data[0]?.attributes?.Title;

	if (!title) notFound();

	// if (session) {
	console.log('session here');
	console.log(session?.user);
	// }

	const sections = data[0]?.attributes?.Sections;

	const publishedAt = data?.data[0]?.attributes?.publishedAt;

	return (
		<ReportPage
			title={title}
			publishedAt={publishedAt}
			sections={sections}
		/>
	);
}
