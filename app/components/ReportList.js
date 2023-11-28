'use client';
import Link from 'next/link';
import { styled } from 'styled-components';
import Title from './Title';

import Image from 'next/image';
import AngledArrowBlue from '../../public/images/icons/angledArrowBlue.svg?url';
import ArrowRightOrange from '../../public/images/icons/arrowRightOrange.svg?url';

import Search from './Search';
import { SearchMessage } from './SearchMessage';
import { GridCard, GridCardLink } from './GridCard';
import {
	TitleContainer,
	TitleContainerList,
	Arrow,
	PostGridSection,
	PostCard,
	PostTopContainer,
	PostGridInnerContainer,
	SearchContainer,
} from './PostList';
import useDebouncedState from './../hooks/useDebouncedState';
import { useFilteredSearch } from '../hooks/useFilteredSearch';
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ReportListSection = styled.section`
	width: 100%;
	background: var(--cool-grey);
	padding: 4rem 0rem;
`;

const MetaContainerList = styled.div`
	width: 30%;
	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
		}
	}
`;

const DateList = styled.p`
	font-weight: 400;
	font-family: var(--sans-serif);
	padding: 0 0 1rem 0;
	font-size: var(--body);
	color: var(--darkblue);

	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
		}
	}
`;

const ReportGridCardFooter = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& span.text {
		font-weight: 400;
		font-family: var(--sans-serif);
		font-size: var(--body);
		color: var(--darkblue);
	}
`;

export default function ReportList(props) {
	const [searchTerm, setSearchTerm] = useDebouncedState('', 500);
	const { isLoading, items } = useFilteredSearch('reports', searchTerm);

	useEffect(() => {
		var listfades = gsap.utils.toArray(".listfade");

		listfades.forEach((section) => {
			gsap.fromTo(
				section,
				{ autoAlpha: 0, y: 50 },
				{ autoAlpha: 1,
				  y: 0,
				  duration: 1,
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						markers: false,
						toggleActions: "play none none reset",
					},
				}
			);
		});
	}, []);

	switch (props.Type) {
		case 'grid':
			return (
				<>
					<SearchContainer>
						<Search
							isLoading={isLoading}
							handleSearch={setSearchTerm}
						/>
					</SearchContainer>
					{!isLoading && items?.data?.length > 0 ? (
						<PostGridSection>
							<PostGridInnerContainer>
								{items?.data?.map((report, index) => {
									const publishedAt = new Date(
										report?.attributes.publishedAt.substring(
											0,
											10
										)
									);

									const formattedPublishedAt =
										publishedAt.toLocaleString('default', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										});

									return (
										<GridCardLink
											key={`rcardlink-${index}`}
											href={
												`/reports/${report?.attributes?.slug}` ||
												''
											}
										>
											<GridCard>
												<TitleContainer>
													{report?.attributes?.Title}
												</TitleContainer>
												<ReportGridCardFooter>
													<span className="text">
														{formattedPublishedAt}
													</span>
													<Image
														src={AngledArrowBlue}
														alt="angled arrow"
														width={30}
														height={30}
														className="angledArrow"
													/>
												</ReportGridCardFooter>
											</GridCard>
										</GridCardLink>
									);
								})}
							</PostGridInnerContainer>
						</PostGridSection>
					) : (
						<SearchMessage>
							{isLoading ? (
								<p>Gathering Reports</p>
							) : (
								<div>
									<p>
										Sorry, nothing matches your search
										criteria.
									</p>
									<p>
										Please try refiing your search or
										contact us for more information.
									</p>
								</div>
							)}
						</SearchMessage>
					)}
				</>
			);
		default:
			return (
				<ReportListSection>
					<PostTopContainer>
						<Title
							size="heading"
							weight="medium"
							color="darkblue"
							as="h2"
						>
							{props.Title}
						</Title>
						<Link
							className="primaryBtnBlue"
							href={props.MainCTAurl || '#'}
						>
							<span>{props.MainCTAtext}</span>
							<Image
								src={AngledArrowBlue}
								alt="angled arrow"
								width={15}
								height={15}
							/>
						</Link>
					</PostTopContainer>
					{props?.reports?.data?.map((report, index) => {
						const publishedAt = new Date(
							report?.attributes.publishedAt.substring(0, 10)
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
							<PostCard key={`rcard-${index}`} className="listfade">
								<MetaContainerList>
									<DateList>{formattedPublishedAt}</DateList>
								</MetaContainerList>
								<TitleContainerList>
									<Link href={report?.CTAurl || '#'}>
										{report?.attributes?.Title}
									</Link>
									<div className="mobileArrow">
										<Image
											src={ArrowRightOrange}
											alt="angled arrow"
											width={15}
											height={15}
											className="rightArrow"
										/>
									</div>
								</TitleContainerList>
								<Arrow>
									<Image
										src={ArrowRightOrange}
										alt="angled arrow"
										width={15}
										height={15}
										className="rightArrow"
									/>
								</Arrow>
							</PostCard>
						);
					})}
				</ReportListSection>
			);
	}
}
