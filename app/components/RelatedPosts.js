import { styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { TitleContainer, PostGridInnerContainer } from './PostList';
import { GridCard, GridCardLink } from './GridCard';
import AngledArrow from '../../public/images/icons/angledArrow.svg?url';
import AngledArrowBlue from '../../public/images/icons/angledArrowBlue.svg?url';

const RelatedPosts = ({
	title,
	subtitle,
	viewAllText = 'View All',
	slug,
	displayPublishedAt,
	posts = [],
}) => {
	return (
		<Section>
			<Header>
				<div>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
				</div>
				<Link className="primaryBtnWhite" href={`/${slug}`}>
					{viewAllText}

					<Image src={AngledArrow} alt="" width={15} height={15} />
				</Link>
			</Header>
			<PostGridInnerContainer>
				{posts.map((post) => {
					const postSlug =
						post?.attributes?.slug || post?.attributes?.Slug;

					const publishedAt = new Date(
						post?.attributes.publishedAt.substring(0, 10)
					);

					const formattedPublishedAt = publishedAt.toLocaleString(
						'default',
						{
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						}
					);

					return (
						<GridCardLink
							key={post.id}
							href={postSlug ? `/${slug}/${postSlug}` : ''}
						>
							<GridCard>
								<GridCardHeader>
									{post?.attributes?.Type && (
										<Category>
											{post?.attributes?.Type}
										</Category>
									)}
									<TitleContainer>
										{post?.attributes?.Title}
									</TitleContainer>
									<Excerpt>
										{post?.attributes?.Description}
									</Excerpt>
								</GridCardHeader>
								<GridCardFooter>
									{displayPublishedAt && (
										<span className="text">
											{formattedPublishedAt}
										</span>
									)}
									<Image
										src={AngledArrowBlue}
										alt=""
										width={30}
										height={30}
										className="angledArrow"
									/>
								</GridCardFooter>
							</GridCard>
						</GridCardLink>
					);
				})}
			</PostGridInnerContainer>
		</Section>
	);
};

const Section = styled.section`
	padding: 4rem 6rem;

	@media only screen and (max-width: 1100px) {
		& {
			padding: 4rem 4rem;
		}
	}

	@media only screen and (max-width: 600px) {
		& {
			padding: 4rem 3rem;
		}
	}
`;

const Category = styled.p`
	font-size: var(--body);
	margin-bottom: 2rem;
`;

const Excerpt = styled.p`
	font-size: var(--body);
	margin-top: 1.5rem;
	position: relative;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4.5rem;

	@media only screen and (max-width: 1100px) {
		gap: 1rem;
		flex-wrap: wrap;
	}
`;

const Title = styled.h1`
	color: var(--white);
	line-height: 1.2;
	font-weight: 600;
	font-family: var(--sans-serif);
	font-size: var(--smallheading);
`;

const Subtitle = styled.h2`
	color: var(--white);
	font-family: var(--sans-serif);
	font-size: var(--sectionHeading);
`;

const GridCardHeader = styled.div`
	position: relative;
`;

const GridCardFooter = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.angledArrow {
		margin-left: auto;
	}

	& span.text {
		font-weight: 400;
		font-family: var(--sans-serif);
		font-size: var(--body);
		color: var(--darkblue);
	}
`;

export default RelatedPosts;
