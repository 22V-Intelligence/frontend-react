'use client';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Section from './Section';
import Title from './Title';
import {
	ArchiveHeroContent,
	ArchiveContentContainerSingle,
} from './HeroComponents';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ title, smallTextTop, smallTextBottom }) {
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
			<ArchiveHeroContent>
				<ArchiveContentContainerSingle>
					<Title
						as="h1"
						color="white"
						size="heading"
						weight="medium"
						align="center"
					>
						{title}
					</Title>
				</ArchiveContentContainerSingle>
			</ArchiveHeroContent>
		</Section>
	);
}
