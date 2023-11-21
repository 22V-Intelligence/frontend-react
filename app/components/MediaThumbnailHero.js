'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Section from './Section';
import Title from './Title';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.div`
	width: 100%;
	padding: 15rem 6rem 3rem 6rem;
	display: flex;
	align-items: center;
	gap: 4rem;

	@media only screen and (max-width: 1100px) {
		padding: 14rem 4rem 2rem 4rem;
		flex-direction: column;
	}

	@media only screen and (max-width: 655px) {
		padding: 14rem 2rem 1rem 2rem;
	}

	.title {
		margin: 0.5rem 0;
	}
`;

const HeroText = styled.div`
	color: var(--white);
`;

export default function MediaThumbnailHero({
	title,
	smallTextTop,
	smallTextBottom,
	thumbnail,
}) {
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

	return (
		<Section none={true}>
			<HeroContainer>
				<Image
					src={thumbnail.data.attributes.url}
					alt=""
					width={300}
					height={300}
					className="thumbnail"
				/>
				<div>
					<HeroText>{smallTextTop}</HeroText>
					<div className="title">
						<Title
							as="h1"
							color="white"
							size="heading"
							weight="medium"
							align="left"
						>
							{title}
						</Title>
					</div>
					<HeroText>{smallTextBottom}</HeroText>
				</div>
			</HeroContainer>
		</Section>
	);
}
