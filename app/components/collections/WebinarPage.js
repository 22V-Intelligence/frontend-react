'use client';

import sectionRenderer from '../../utils/sectionRenderer';
import MediaThumbnailHero from '@/app/components/MediaThumbnailHero';
import CenteredTextHero from '../CenteredTextHero';

export const WebinarPage = ({
	title,
	thumbnail,
	description,
	type,
	sections,
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
		</>
	);
};
