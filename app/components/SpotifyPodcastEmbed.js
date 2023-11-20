'use client';

import Title from './Title';
import styled from 'styled-components';

const Section = styled.section`
	width: 100%;
	background-color: var(--white);
	padding: 6rem 6rem;
	position: relative;

	@media only screen and (max-width: 1100px) {
		& {
			padding: 6rem 4rem;
		}
	}

	@media only screen and (max-width: 600px) {
		& {
			padding: 6rem 3rem;
		}
	}
`;

const SpotifyPodcastEmbed = ({
	Title: title = 'More from 22VI on Spotify',
	EmbedCode,
}) => {
	return (
		<Section>
			<Title>{title}</Title>

			<div dangerouslySetInnerHTML={{ __html: EmbedCode }}></div>
		</Section>
	);
};

export default SpotifyPodcastEmbed;
