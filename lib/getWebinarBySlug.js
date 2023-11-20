async function getWebinarBySlug(pathname) {
	if (!pathname) return;

	const res = await fetch(
		`${process.env.APP_URL}/api/webinars/?filters[Slug][$eq]=${pathname}&populate=*`,
		{
			next: {
				revalidate: 100,
			},
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	return data;
}

export default getWebinarBySlug;
