async function getReportBySlug(pathname) {
	console.log('pathanme: ', pathname);
	const res = await fetch(
		`${process.env.APP_URL}/api/reports/?filters[slug][$eq]=${pathname}`,
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
