'use client';
import { styled } from 'styled-components';
import Section from './Section';
import Title from './Title';
import CenteredTextHero from './CenteredTextHero';
import PostFilters from './PostFilters';
import { ArchiveHeroContent, ArchiveContentContainer } from './HeroComponents';
import { DateTime } from "luxon";
import { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const HeroContent = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
	width: 100%;
	text-align: center;

	& h1 {
		padding: 0 6rem;
		line-height: 1.2;
	}
	@media only screen and (max-width: 820px) {
		& h1 {
			font-size: 3rem;
			padding: 0 2rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& h1 {
			font-size: 2.5rem;
		}
	}
`;

const ScrollContent = styled.div`
	position: absolute;
	bottom: -1rem;
	left: 0rem;
	right: 0rem;
	z-index: 2;

	& .scrollIcon {
		position: relative;
		color: var(--white);
		padding: 4.5rem 1.5rem;
		background: transparent !important;
		width: 100%;
		max-width: 184px;
		height: 184px;
		margin: auto;
		text-align: center;
	}

	& .scrollIcon,
	& .scrollIcon .background,
	& .scrollIcon .border {
		border-radius: 184px;
	}

	& .scrollIcon span {
		color: var(--white);
		font-size: var(--nav);
		font-family: var(--sans-serif);
		font-weight: 400;
		letter-spacing: 0.1rem;
		text-transform: uppercase;
		text-align: center;
		margin: 1rem 0 0 0;
	}

	& .scrollIcon::before {
		background: linear-gradient(
				90deg,
				rgba(32, 58, 113, 1) 0%,
				rgba(50, 119, 223, 1) 100%
			)
			border-box;
	}

	& .scrollIcon .background,
	& .scrollIcon .border {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	& .scrollIcon .background {
		background: var(--orange-gradient-linear) border-box;
		opacity: 0;
	}

	& .scrollIcon .border {
		border: 1px solid transparent;
		background: linear-gradient(
				90deg,
				rgba(32, 58, 113, 1) 0%,
				rgba(50, 119, 223, 1) 100%
			)
			border-box;
		background: linear-gradient(
				90deg,
				rgba(32, 58, 113, 1) 0%,
				rgba(50, 119, 223, 1) 100%
			)
			border-box;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
	}

	@media only screen and (max-width: 600px) {
		bottom: 2rem;
		& .scrollIcon {
			position: relative;
			color: var(--white);
			padding: 3.5rem 1.5rem;
			background: transparent !important;
			width: 100%;
			max-width: 150px;
			height: 150px;
			margin: auto;
			text-align: center;
		}
	}
`;

const ThreeQuarters = styled.div`
	width: 100%;
	padding: 15rem 6rem 0 6rem;
	max-width: 70%;
	& h1 {
		line-height: 1.2;
		padding: 0 0 2rem 0;
	}
	& p {
		color: var(--white);
		font-family: var(--sans-serif);
		font-size: var(--body);
		font-weight: 400;
		line-height: 1.5;
	}
	@media only screen and (max-width: 1280px) {
		& {
			max-width: 80%;
		}
	}
	@media only screen and (max-width: 1024px) {
		& {
			max-width: 100%;
		}
	}
	@media only screen and (max-width: 820px) {
		padding: 15rem 4rem 0 4rem;
	}
	@media only screen and (max-width: 600px) {
		padding: 15rem 3rem 0 3rem;
	}
`;

export default function Hero(props) {
	const {
		Title: title,
		Content,
		Image,
		Type,
		publishedAt,
		// reportTitle,
	} = props;

	useEffect(() => {
		const boxes = gsap.utils.toArray('.scrollIcon');
		boxes.forEach((box) => {
			gsap.to(box, {
				autoAlpha: 0,
				scrollTrigger: {
					trigger: box,
					start: 'bottom bottom',
					end: 'top 20%',
					scrub: true,
				},
			});
		});
	}, []);

	switch (Type) {
		case 'home':
			return (
				<Section bgimage={`${Image.data.attributes.url}`}>
					<HeroContent>
						<Title
							as="h1"
							color="white"
							size="heading"
							weight="medium"
							align="center"
						>
							{title}
						</Title>
					</HeroContent>
					<ScrollContent>
						<div className="scrollIcon" data-speed="1.2">
							<span>Scroll</span>
							<div className="border"></div>
							<div className="background"></div>
						</div>
					</ScrollContent>
				</Section>
			);
		case 'full':
		case 'threeQuarters':
			return (
				<Section none={true}>
					<ThreeQuarters>
						<Title
							as="h1"
							color="white"
							size="heading"
							weight="medium"
							align="left"
						>
							{title}
						</Title>
						<p>{Content}</p>
					</ThreeQuarters>
				</Section>
			);
		case 'postArchive':
			return (
				<Section none={true}>
					<ArchiveHeroContent>
						<ArchiveContentContainer>
							<Title
								as="h1"
								color="white"
								size="xlheading"
								weight="bold"
								align="center"
							>
								{title}
							</Title>
							<p>{Content}</p>
						</ArchiveContentContainer>
						<PostFilters />
					</ArchiveHeroContent>
				</Section>
			);
		case 'postSingle':
			let date = new Date(publishedAt);
			// TODO - Pass formatted date into "text" prop as needed

			return <CenteredTextHero title={title} text={""} />;
		default:
			break;
	}
}
