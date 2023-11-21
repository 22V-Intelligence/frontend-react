import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';

export const useFilteredEventSearch = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);
	const searchParams = useSearchParams();

	const fetchItems = async () => {
		let filters = {};
		const andFilters = [];

		if (searchParams.get('dateFrom') || searchParams.get('dateTo')) {
			let nestedDateFilters = {};

			if (searchParams.get('dateFrom')) {
				andFilters.push({
					EventStart: {
						$gte: searchParams.get('dateFrom'),
					},
				});
			}

			if (searchParams.get('dateTo')) {
				andFilters.push({
					...nestedDateFilters,
					EventStart: {
						$lte: searchParams.get('dateTo'),
					},
				});
			}
		}

		if (searchParams.get('category')) {
			andFilters.push({
				categories: {
					Name: {
						$contains: searchParams.get('category'),
					},
				},
			});
		}

		// Add the $and condition if it's not empty
		if (andFilters.length > 0) {
			filters['$and'] = andFilters;
		}

		const query = qs.stringify(
			{
				publicationState: 'live',
				populate: '*',
				filters,
			},
			{
				encodeValuesOnly: true,
			}
		);

		setIsLoading(true);

		const res = await fetch(`${process.env.APP_URL}/api/events?${query}`);
		const items = await res.json();

		setItems(items);
		setIsLoading(false);

		return items;
	};

	useEffect(() => {
		// Load all our items
		fetchItems();
	}, [searchParams]);

	return {
		isLoading,
		refetchItems: fetchItems,
		items,
	};
};

export const useFilteredSearch = (
	itemTypeUrlSegment,
	searchTerm = '',
	hasCategories = false
) => {
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);
	const searchParams = useSearchParams();

	const fetchItems = async (searchTerm) => {
		let filters = {};
		const andFilters = [];

		if (searchParams.get('dateFrom') || searchParams.get('dateTo')) {
			let nestedDateFilters = {};

			if (searchParams.get('dateFrom')) {
				andFilters.push({
					publishedAt: {
						$gte: searchParams.get('dateFrom'),
					},
				});
			}

			if (searchParams.get('dateTo')) {
				andFilters.push({
					...nestedDateFilters,
					publishedAt: {
						$lte: searchParams.get('dateTo'),
					},
				});
			}
		}

		if (hasCategories && searchParams.get('category')) {
			andFilters.push({
				categories: {
					Name: {
						$contains: searchParams.get('category'),
					},
				},
			});
		}

		// Add the $and condition if it's not empty
		if (andFilters.length > 0) {
			filters['$and'] = andFilters;
		}

		const query = qs.stringify(
			{
				_q: searchTerm || '',
				publicationState: 'live',
				populate: '*',
				sort: [`publishedAt:${searchParams.get('sort') || 'asc'}`],
				filters,
			},
			{
				encodeValuesOnly: true,
			}
		);

		setIsLoading(true);

		const res = await fetch(
			`${process.env.APP_URL}/api/${itemTypeUrlSegment}?${query}`
		);
		const items = await res.json();

		setItems(items);
		setIsLoading(false);

		return items;
	};

	useEffect(() => {
		// Load all our items
		fetchItems(searchTerm);
	}, [searchTerm, searchParams]);

	return {
		isLoading,
		refetchItems: fetchItems,
		items,
	};
};
