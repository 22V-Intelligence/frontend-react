import sectionRenderer from '../utils/sectionRenderer';
import getPageBySlug from '../../lib/getPageBySlug';
import getPageSections from '../../lib/getPageSections';

export default async function Page({ params }) {
	const data = await getPageBySlug(params?.slug[0]);
	const sections = await getPageSections(data[0]?.id);

	return sectionRenderer(sections);
}
