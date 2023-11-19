'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import AngledArrowBlue from '../../public/images/icons/angledArrowBlue.svg?url';
import { SearchMessage } from './SearchMessage';
import { GridCard, GridCardLink } from './GridCard';
import {
	TitleContainer,
	PostGridSection,
	PostGridInnerContainer,
} from './PostList';
import { useFilteredSearch } from '../hooks/useFilteredSearch';

const WebinarCardHeader = styled.div`
	position: relative;
`;

const WebinarCardFooter = styled.div`
	position: relative;
	text-align: right;
`;

const WebinarCardExcerpt = styled.p`
	font-size: var(--body);
	margin-top: 1.5rem;
	position: relative;
`;

const WebinarCardCategory = styled.p`
	font-size: var(--body);
	margin-bottom: 2rem;
`;

export default function WebinarList(props) {
	const { isLoading, items } = useFilteredSearch('webinars', '', true);

	return (
		<>
			{!isLoading && items?.data?.length > 0 ? (
				<PostGridSection>
					<PostGridInnerContainer>
						{items?.data?.map((item, index) => {
							return (
								<GridCardLink
									key={`rcardlink-${index}`}
									href={
										`/webinars/${item?.attributes?.Slug}` ||
										'#'
									}
								>
									<GridCard key={`rcard-${index}`}>
										<WebinarCardHeader>
											<WebinarCardCategory>
												{item?.attributes?.Type}
											</WebinarCardCategory>
											<TitleContainer>
												{item?.attributes?.Title}
											</TitleContainer>
											<WebinarCardExcerpt>
												{item?.attributes?.Description}
											</WebinarCardExcerpt>
										</WebinarCardHeader>
										<WebinarCardFooter>
											<Image
												src={AngledArrowBlue}
												alt=""
												width={30}
												height={30}
												className="angledArrow"
											/>
										</WebinarCardFooter>
									</GridCard>
								</GridCardLink>
							);
						})}
					</PostGridInnerContainer>
				</PostGridSection>
			) : (
				<SearchMessage>
					{isLoading ? (
						<p>Gathering Webinars</p>
					) : (
						<div>
							<p>Sorry, we couldn't find any webinars.</p>
						</div>
					)}
				</SearchMessage>
			)}
		</>
	);
}
