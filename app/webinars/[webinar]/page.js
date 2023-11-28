import getWebinarBySlug, { getWebinars } from '../../../lib/getWebinarBySlug';
import getPageSections from '@/lib/getPageSections';
import { WebinarPage } from '@/app/components/collections/WebinarPage';

export default async function Page({ params }) {
	const data = await getWebinarBySlug(params?.webinar);
	const posts = await getWebinars(params?.report);

	if (!data.data || !data?.data[0]) return 'Webinar not found';
	const { attributes, id } = data?.data[0];
	const sections = await getPageSections(id, `webinars`);

	return (
		<WebinarPage
			title={attributes?.Title}
			description={attributes?.Description}
			thumbnail={attributes?.Thumbnail}
			type={attributes?.Type}
			publishedAt={attributes?.publishedAt}
			sections={sections}
			posts={posts.data}
		/>
	);
}
