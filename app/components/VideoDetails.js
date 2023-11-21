'use client';

import Title from './Title';
import styled from 'styled-components';
import { formatDuration } from '../utils/helpers';

const Section = styled.section`
	width: 100%;
	background-color: var(--cool-grey);
	padding: 3rem 6rem 6rem;
	position: relative;

	@media only screen and (max-width: 1100px) {
		& {
			padding: 3rem 4rem 6rem 4rem;
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
			padding: 3rem 3rem 6rem 3rem;
		}
	}

	.share-link {
		color: var(--darkblue);
		font-size: var(--body);
		text-transform: uppercase;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.media-meta {
		color: var(--darkblue);
		font-size: var(--body);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		@media only screen and (min-width: 536px) {
			align-content: center;
			flex-direction: row;
			> * {
				&::after {
					content: '•';
					display: inline-block;
					margin-left: 1.5rem;
				}

				&:last-of-type {
					&::after {
						content: none;
					}
				}
			}
		}
	}

	.media-content {
		margin-top: 4.5rem;
	}

	.share-link {
		margin-left: auto;

		@media only screen and (max-width: 820px) {
			margin-left: 0;
		}
	}
`;

const Content = styled.p`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body-large);
	font-weight: 400;
	margin-top: 1.75rem;
`;

export default function VideoDetails(props) {
	const {
		Description,
		Title: title,
		ShareLink,
		ReleaseDate,
		DurationInMs,
	} = props;
	return (
		<Section>
			<div className="media-meta">
				<span className="media-meta-item">
					{Intl.DateTimeFormat('en-us', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					}).format(new Date(ReleaseDate))}
				</span>
				<span className="media-meta-item">
					{formatDuration(DurationInMs)}
				</span>
				<a className="share-link" href={ShareLink} target="_blank">
					Share
				</a>
			</div>

			<div className="media-content">
				<Title
					as="h2"
					color="darkblue"
					weight="medium"
					size="sectionHeading"
				>
					{title || 'Episode Description'}
				</Title>
				<Content>{Description}</Content>
			</div>
		</Section>
	);
}
