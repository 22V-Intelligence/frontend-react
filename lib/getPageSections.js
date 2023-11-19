const qs = require('qs');

async function getPageSections(id, type = `pages`) {
	if (!id) return;

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
					},
				},
			},
		},
		{
			encodeValuesOnly: true,
		}
	);

	// Degud for Query URL
	// console.log(`${process.env.APP_URL}/api/${type}/${id}?${query}`);

	const res = await fetch(
		`${process.env.APP_URL}/api/${type}/${id}?${query}`,
		{
			next: {
				revalidate: 100,
			},
		}
	);

	const data = await res.json();
	console.log('data', data);

	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	const sections = data.data.attributes.Sections;

	return type === 'events' ? data : sections;
}

export default getPageSections;
