import getWebinarBySlug from '../../../lib/getWebinarBySlug';
import getPageSections from '@/lib/getPageSections';
import { WebinarPage } from '@/app/components/collections/WebinarPage';

export default async function Page({ params }) {
	const data = await getWebinarBySlug(params?.webinar);
	const { attributes, id } = data?.data[0];
	const sections = await getPageSections(id, `webinars`);

	return (
		<WebinarPage
			title={attributes?.Title}
			thumbnail={attributes?.Thumbnail}
			type={attributes?.Type}
			publishedAt={attributes?.publishedAt}
			sections={sections}
		/>
	);
}
