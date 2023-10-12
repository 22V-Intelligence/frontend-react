"use client";

import styled from "styled-components";
import Title from "./Title";
import Image from "next/image";

const StyledReportSection = styled.section`
	background: var(--white);

	&:after {
		content: "";
		padding: 0;
		display: block;
		clear: both;
		height: 3rem;
		background: var(--white);
		background: rgb(255,255,255);
		background: -moz-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,233,235,1) 48%, rgba(255,255,255,1) 100%);
		background: -webkit-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,233,235,1) 48%, rgba(255,255,255,1) 100%);
		background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,233,235,1) 48%, rgba(255,255,255,1) 100%);
	}

	&:last-child:after {
		content: "";
		display: none;
	}
`;
const ReportSectionContainer = styled.div`
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

const Top = styled.div`
	& h2 {
		line-height: 1.2;
		padding: 0 0 0.5rem 0;
	}
`;

const SubtitleContainer = styled.h3`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--reportsheading);
	padding: 0 0 1rem 0;
	line-height: 1.2;
`;

const BlockContent = styled.div`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body);
	font-weight: 600;
`;

const Content = styled.p`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body);
	font-weight: 400;
`;

const Bottom = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 4rem;
	padding: 4rem 0 0 0;

	@media only screen and (max-width: 800px) {
		& {
			flex-direction: column;
		}
	}
`;

const BottomImagesContainer = styled.div``;

const GradientDivider = styled.div`
height: 3px;
max-width: 50%;
width: 100%;
text-align: left;
margin: 0 0 2rem 0;
background: rgb(255,185,1);
background: linear-gradient(0deg, rgba(255,185,1,1) 0%, rgba(255,127,0,1) 45%, rgba(254,99,18,1) 89%, rgba(253,98,32,1) 100%);
background: -moz-linear-gradient(0deg, rgba(255,185,1,1) 0%, rgba(255,127,0,1) 45%, rgba(254,99,18,1) 89%, rgba(253,98,32,1) 100%);
background: -webkit-linear-gradient(0deg, rgba(255,185,1,1) 0%, rgba(255,127,0,1) 45%, rgba(254,99,18,1) 89%, rgba(253,98,32,1) 100%);

@media only screen and (max-width: 800px) {
	& {
		max-width: 100px;
	}
}
`;

const ContentLeftContainer = styled.div`
	width: calc(40% - 2rem);

	& p {
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body);
	}
	@media only screen and (max-width: 800px) {
		& {
			width: 100%;
		}
	}
`;
const ImageContainer = styled.div`
	width: calc(60% - 2rem);
	position: relative;

	& img {
		width: 100%;
		height: auto;
		max-width: 100%;
	}
	@media only screen and (max-width: 800px) {
		& {
			width: 100%;
		}
	}
`;
const BottomContent = styled.div``;
const BottomImage = styled.div``;
const BottomImages = styled.div`
	width: 100%;
	padding: 4rem 0 0 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;

	@media only screen and (max-width: 800px) {
		& {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}
`;

export default function ReportSection(props) {
	const {
		Title: title,
		Subtitle,
		Blurb,
		ContentLeft,
		Type,
		ImageRight,
		imageLeft,
	} = props;
	switch (Type) {
		case "doubleImage":
			return (
				<StyledReportSection>
					<ReportSectionContainer>
						<Top>
							<Title as="h2" color="darkblue" weight="medium" size="smallheading">{title}</Title>
							<SubtitleContainer>{Subtitle}</SubtitleContainer>
							<Content
								dangerouslySetInnerHTML={{ __html: Blurb }}
							/>
						</Top>
						<BottomImagesContainer>
							<BottomImages>
								<Image
									src={imageLeft?.data?.attributes?.url}
									width={624}
									height={464}
									style={{ width: "100%", height: "auto" }}
								/>
								<Image
									src={ImageRight?.data?.attributes?.url}
									width={624}
									height={464}
									style={{ width: "100%", height: "auto" }}
								/>
							</BottomImages>
						</BottomImagesContainer>
					</ReportSectionContainer>
				</StyledReportSection>
			);
		default:
			return (
				<StyledReportSection>
					<ReportSectionContainer>
						<Top>
							<Title as="h2" color="darkblue" weight="medium" size="smallheading">{title}</Title>
							<SubtitleContainer>{Subtitle}</SubtitleContainer>
							<Content
								dangerouslySetInnerHTML={{ __html: Blurb }}
							/>
						</Top>
						<Bottom>
							<ContentLeftContainer>
								<GradientDivider />
								<BlockContent>{ContentLeft}</BlockContent>
							</ContentLeftContainer>
							<ImageContainer>
							<Image
								src={ImageRight.data.attributes.url}
								width={940}
								height={464}
							/>
							</ImageContainer>
						</Bottom>
					</ReportSectionContainer>
				</StyledReportSection>
			);
	}
}
