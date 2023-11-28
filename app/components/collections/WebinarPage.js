'use client';

import sectionRenderer from '../../utils/sectionRenderer';
import MediaThumbnailHero from '@/app/components/MediaThumbnailHero';
import CenteredTextHero from '../CenteredTextHero';
import RelatedPosts from '../RelatedPosts';

export const WebinarPage = ({
	title,
	thumbnail,
	description,
	type,
	sections,
	posts,
}) => {
	return (
		<>
			{type === 'Podcast' ? (
				<MediaThumbnailHero
					title={title}
					thumbnail={thumbnail}
					smallTextTop="New Podcast Episode"
					smallTextBottom="22VI Macro Fast Break"
				/>
			) : (
				<CenteredTextHero title={title} description={description} />
			)}
			{sectionRenderer(sections)}

			<RelatedPosts
				title="Heading About Webinars"
				subtitle="Latest Webinars"
				viewAllText="View all Webinars"
				slug="webinars"
				displayPublishedAt={false}
				posts={posts}
			/>
		</>
	);
};
