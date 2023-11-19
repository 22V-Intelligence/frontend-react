import getWebinarBySlug from '../../../lib/getWebinarBySlug';
import getPageSections from '@/lib/getPageSections';
import { WebinarPage } from '@/app/components/collections/WebinarPage';

export default async function Page({ params }) {
	const data = await getWebinarBySlug(params?.webinar);
	const sections = await getPageSections(data?.data[0]?.id, `webinars`);

	const title = data?.data[0]?.attributes?.Title;
	const publishedAt = data?.data[0]?.attributes?.publishedAt;

	return (
		<WebinarPage
			title={title}
			publishedAt={publishedAt}
			sections={sections}
		/>
	);
}
