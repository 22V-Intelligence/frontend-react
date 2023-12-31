'use client';

import Title from './Title';
import styled from 'styled-components';

const Section = styled.section`
	width: 100%;
	background-color: var(--white);
	padding: 6rem 6rem;
	position: relative;

	.embed {
		margin-top: 1rem;
	}

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

const EmbeddedMedia = ({ Title: title, EmbedCode }) => {
	return (
		<Section>
			{title && (
				<Title
					as="h2"
					color="darkblue"
					weight="medium"
					size="sectionHeading"
				>
					{title}
				</Title>
			)}

			<div
				className="embed"
				dangerouslySetInnerHTML={{ __html: EmbedCode }}
			></div>
		</Section>
	);
};

export default EmbeddedMedia;
