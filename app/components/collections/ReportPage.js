'use client';

import sectionRenderer from '../../utils/sectionRenderer';
import Hero from '@/app/components/Hero';
import RelatedPosts from '../RelatedPosts';

export const ReportPage = ({ title, publishedAt, sections, posts }) => {
	return (
		<>
			<Hero Title={title} Type="postSingle" publishedAt={publishedAt} />
			{sectionRenderer(sections)}

			<RelatedPosts
				title="More From Our Newsroom"
				subtitle="Latest Reports"
				viewAllText="View all Reports"
				slug="reports"
				displayPublishedAt={true}
				posts={posts}
			/>
		</>
	);
};
