const qs = require('qs');

const query = qs.stringify(
	{
		populate: {
			EventDetails: {
				populate: '*',
			},
			Sections: {
				on: {
					'layout.hero': {
						populate: '*',
					},
					'layout.title-text-cta': {
						populate: '*',
					},
					'layout.word-slider': {
						populate: '*',
					},
					'layout.about-us-feature': {
						populate: '*',
					},
					'layout.report-list': {
						populate: '*',
						reports: {
							fields: ['author'],
							populate: '*',
						},
					},
					'layout.media-full-content': {
						populate: '*',
					},
					'layout.feature-list': {
						populate: '*',
					},
					'layout.form': {
						populate: '*',
					},
					'layout.circle-feature': {
						populate: '*',
					},
					'layout.search-bar': {
						populate: '*',
					},
					'layout.report-summary': {
						populate: '*',
					},
					'layout.content-block': {
						populate: '*',
					},
					'layout.report-section': {
						populate: '*',
					},
					'layout.event-list': {
						populate: '*',
						events: {
							fields: ['author'],
							populate: '*',
						},
					},
					'layout.analysts-grid': {
						populate: {
							AnalystsCards: {
								populate: '*',
							},
						},
						fields: ['Title', 'blurb'],
					},
					'layout.webinar-list': {
						populate: '*',
					},
					'layout.podcast-details': {
						populate: '*',
					},
					'layout.video-details': {
						populate: '*',
					},
					'layout.embedded-media': {
						populate: '*',
					},
				},
			},
		},
	},
	{
		encodeValuesOnly: true,
	}
);

async function getReportBySlug(pathname) {
	console.log('pathanme: ', pathname);
	const res = await fetch(
		`${process.env.APP_URL}/api/reports/?filters[slug][$eq]=${pathname}&${query}`,
		{
			next: {
				revalidate: 100,
			},
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	return await res.json();
}

export const getReports = async (pathname) => {
	const res = await fetch(
		`${process.env.APP_URL}/api/reports?populate=*&pagination[limit]=6&sort[0]=createdAt:desc&filters[slug][$ne]=${pathname}`
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	return data;
};

export default getReportBySlug;
