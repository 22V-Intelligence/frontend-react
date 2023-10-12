"use client";
import Link from "next/link";
import { styled } from "styled-components";
import Title from "./Title";
import BodyCopy from "./BodyCopy";
import Image from "next/image";
import AngledArrowBlue from "../../public/images/icons/angledArrowBlue.svg?url";
import ArrowRightOrange from "../../public/images/icons/arrowRightOrange.svg?url";
import { useEffect, useState } from "react";

import { DateTime } from "luxon";

const ReportListSection = styled.section`
	width: 100%;
	background: var(--cool-grey);
	padding: 4rem 0rem;
`;

const ReportGridSection = styled.div`
	width: 100%;
	padding: 4rem 6rem;
	@media only screen and (max-width: 1100px) {
		& {
			padding: 4rem 4rem;
		}
	}
	@media only screen and (max-width: 655px) {
		& {
			padding: 4rem 2rem 4rem 2rem;
		}
	}
`;

const ReportGridInnerContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: max-content;
	gap: 2rem;

	@media only screen and (max-width: 1100px) {
		& {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			grid-template-columns: repeat(1, 1fr);
		}
	}
`;

const ReportGridCard = styled.article`
	background-color: white;
	padding: 1.5rem;
	border-radius: 1rem;
	display: flex;
	border: 2px solid;
	flex-direction: column;
	justify-content: space-between;
	aspect-ratio: 430/396;
	transition: 0.5s ease all;
	cursor: pointer;
	position: relative;

	&:hover {
		background: var(--darkblue);
	}

	&:hover::after {
		position: absolute;
		top: -4px;
		bottom: -4px;
		left: -4px;
		right: -4px;
		background: linear-gradient(
			90deg,
			rgba(32, 58, 113, 1) 0%,
			rgba(50, 119, 223, 1) 100%
		);
		content: "";
		z-index: -1;
		border-radius: 1rem;
	}

	&:hover h2,
	&:hover p {
		color: var(--white);
		font-family: var(--sans-serif);
	}

	&:hover img.angledArrow {
		filter: contrast(0) sepia(100%) hue-rotate(-15deg) saturate(3);
	}

	@media only screen and (max-width: 820px) {
		& {
			aspect-ratio: unset;
		}
		& h2 {
			padding: 2rem 0;
		}
	}
`;

const ReportsTopContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	justify-content: space-between;
	padding: 4rem 6rem 3rem 6rem;

	@media only screen and (max-width: 820px) {
		& {
			display: block;
			padding: 4rem 4rem 3rem 4rem;
		}
		& a.primaryBtnBlue {
			margin-top: 2rem;
		}
	}
`;

const ReportCard = styled.article`
	border-top: 1px solid var(--darkblue);
	width: 100%;
	display: flex;
	padding: 3rem 6rem;

	&:last-child {
		border-bottom: 1px solid var(--darkblue);
	}

	&:hover img.rightArrow {
		opacity: 1;
	}

	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			padding: 3rem 4rem;
		}
	}
`;

const MetaContainer = styled.div`
	width: 100%;
`;

const MetaContainerList = styled.div`
	width: 30%;
	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
		}
	}
`;

const Date = styled.p`
	font-family: var(--sans-serif);
	font-weight: 400;
	font-size: var(--body);
	color: var(--darkblue);
`;

const DateList = styled.p`
	font-weight: 600;
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

const AuthorContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const AuthorList = styled.p`
	font-weight: 400;
	font-family: var(--sans-serif);
	font-size: var(--body);
	color: var(--darkblue);
	padding: 0px;
`;

const Author = styled.p`
	font-weight: 400;
	font-family: var(--sans-serif);
	font-size: var(--body);
	color: var(--darkblue);
`;

const TitleContainer = styled.h2`
	font-family: var(--sans-serif);
	line-height: 1.2;

	& a {
		font-family: var(--sans-serif);
		font-weight: 600;
		font-size: var(--reportsheading);
		text-decoration: none;
		line-height: 1.1;
		color: var(--darkblue);
	}
`;

const TitleContainerList = styled.div`
	font-size: var(--sub-heading);
	font-weight: 600;
	width: 60%;
	color: var(--darkblue);
	font-family: var(--sans-serif);

	& .mobileArrow {
		display: none;
	}

	@media only screen and (max-width: 820px) {
		& {
			display: flex;
			width: 100%;
			gap: 2rem;
			justify-content: space-between;
			align-items: center;
			padding: 2rem 0 0 0;
		}

		& .mobileArrow {
			display: block;
			width: 40px;
			position: relative;
		}

		& .mobileArrow img {
			transition: 0.3s ease all;
			width: 100%;
			max-width: 40px;
			height: auto;
			opacity: 0;
			margin: auto;
			text-align: right;
			display: block;
		}
	}
`;

const Arrow = styled.div`
	width: 10%;

	& img {
		transition: 0.3s ease all;
		width: 100%;
		max-width: 40px;
		height: auto;
		margin: auto;
		display: block;
		text-align: right;
		opacity: 0;
	}
	@media only screen and (max-width: 820px) {
		& {
			display: none;
		}
	}
`;

export default function ReportList(props) {
	// isloading state
	const [isLoading, setIsLoading] = useState(true);

	let win;

	let formatDate = function (win, report) {
		let date = new win.Date(report.attributes.publishedAt);
		console.log("date", date);
		return date.toLocaleString("default", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	switch (props.Type) {
		case "grid":
			return (
				<ReportGridSection>
					<ReportGridInnerContainer>
						{props?.reports?.data?.map((report, index) => {
							let date = DateTime.now(
								report.attributes.publishedAt
							);
							return (
								<Link
									key={`rcardlink-${index}`}
									href={
										`/reports/${report?.attributes?.slug}` ||
										""
									}>
									<ReportGridCard key={`rcard-${index}`}>
										<MetaContainer>
											<Date>
												{Intl.DateTimeFormat("en-us", {
													month: "long",
													day: "numeric",
													year: "numeric",
												}).format(date)}
											</Date>
										</MetaContainer>
										<TitleContainer>
												{report?.attributes?.Title}
										</TitleContainer>
										<AuthorContainer>
											<Author>Author</Author>
											<Image
												src={AngledArrowBlue}
												alt="angled arrow"
												width={30}
												height={30}
												className="angledArrow"
											/>
										</AuthorContainer>
									</ReportGridCard>
								</Link>
							);
						})}
					</ReportGridInnerContainer>
				</ReportGridSection>
			);
		default:
			return (
				<ReportListSection>
					<ReportsTopContainer>
						<Title
							size="heading"
							weight="medium"
							color="darkblue"
							as="h2">
							{props.Title}
						</Title>
						<Link
							className="primaryBtnBlue"
							href={props.MainCTAurl}>
							<span>{props.MainCTAtext}</span>
							<Image
								src={AngledArrowBlue}
								alt="angled arrow"
								width={15}
								height={15}
							/>
						</Link>
					</ReportsTopContainer>
					{props?.reports?.data?.map((report, index) => {
						let date = DateTime.now(report.attributes.publishedAt);
						return (
							<ReportCard key={`rcard-${index}`}>
								<MetaContainerList>
									<DateList>
										{Intl.DateTimeFormat("en-us", {
											month: "long",
											day: "numeric",
											year: "numeric",
										}).format(date)}
									</DateList>
									<AuthorList>Author</AuthorList>
								</MetaContainerList>
								<TitleContainerList>
									<Link href={report?.CTAurl || ""}>
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
							</ReportCard>
						);
					})}
				</ReportListSection>
			);
	}
}
