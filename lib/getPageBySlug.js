async function getPageBySlug(pathname) {
    const res = await fetch(
        `${process.env.APP_URL}/api/pages?filters[slug][$eq]=${
            pathname == "/" ? "home" : pathname
        }&populate=deep`,
        {
            next: {
                revalidate: 100,
            },
            // headers: {
            //     Authorization: `Bearer ${process.env.STRAPI_NEXT_READ_API_KEY}`,
            // },
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    const pageData = data?.data.filter((item) => {
        if (item.attributes.Slug == pathname) {
            return item;
        } else if (item.attributes.Slug == "home" && pathname == "/") {
            return item;
        }
    });

    return pageData;
}

export default getPageBySlug;
