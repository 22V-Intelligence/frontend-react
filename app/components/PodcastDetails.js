'use client';

import Title from './Title';
import styled from 'styled-components';

const Section = styled.section`
	width: 100%;
	background-color: var(--cool-grey);
	padding: 6rem 6rem;
	position: relative;

	@media only screen and (max-width: 1100px) {
		& {
			padding: 6rem 4rem;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			gap: 4rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			padding: 6rem 3rem;
		}
	}
`;

const Content = styled.p`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body);
	font-weight: 400;
`;

export default function PodcastDetails(props) {
	const {
		Description,
		Title: title,
		EpisodeLink,
		ShareLink,
		FollowLink,
		ReleaseDate,
		DurationInMs,
	} = props;
	return (
		<Section>
			<Title
				as="h2"
				color="darkblue"
				weight="medium"
				size="sectionHeading"
			>
				{title || 'Episode Description'}
			</Title>
			<Content>{Description}</Content>
			<p>{EpisodeLink}</p>
			<p>{ShareLink}</p>
			<p>{FollowLink}</p>
			<p>{ReleaseDate}</p>
			<p>{DurationInMs}</p>
		</Section>
	);
}
