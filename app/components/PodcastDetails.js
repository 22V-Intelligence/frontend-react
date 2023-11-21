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

	.play-link {
		display: flex;
		align-items: center;
		gap: 1rem;

		&:hover,
		&:focus {
			svg {
				transform: scale(1.05);
			}
		}

		svg {
			transition: transform 0.2s ease-in-out;
		}

		.play-link-text {
			color: var(--darkblue);
			font-size: var(--body);
		}
	}

	.follow-link,
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
		margin-bottom: 1rem;
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

	.media-details {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		@media only screen and (max-width: 820px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}

	.follow-link {
		margin-left: 6.5rem;

		@media only screen and (max-width: 820px) {
			margin-left: 0;
		}
	}

	.share-link {
		margin-left: auto;

		@media only screen and (max-width: 820px) {
			margin-left: 0;
		}
	}

	.media-content {
		margin-top: 4.5rem;
	}
`;

const Content = styled.p`
	color: var(--darkblue);
	font-family: var(--sans-serif);
	font-size: var(--body-large);
	font-weight: 400;
	margin-top: 1.75rem;
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
			</div>
			<div className="media-details">
				<a className="play-link" href={EpisodeLink} target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="77"
						height="77"
						viewBox="0 0 77 77"
						fill="none"
						aria-hidden
					>
						<path
							d="M38.4999 0.583496C31.0007 0.583496 23.6699 2.80727 17.4346 6.97361C11.1992 11.1399 6.33933 17.0617 3.4695 23.9901C0.599681 30.9184 -0.151196 38.5422 1.31183 45.8973C2.77485 53.2524 6.38606 60.0086 11.6888 65.3113C16.9915 70.614 23.7477 74.2253 31.1028 75.6883C38.4579 77.1513 46.0817 76.4004 53.01 73.5306C59.9384 70.6608 65.8602 65.8009 70.0265 59.5655C74.1928 53.3302 76.4166 45.9994 76.4166 38.5002C76.4166 33.5209 75.4359 28.5903 73.5304 23.9901C71.6249 19.3898 68.832 15.2099 65.3111 11.689C61.7902 8.16814 57.6103 5.37522 53.01 3.46973C48.4098 1.56424 43.4792 0.583496 38.4999 0.583496ZM30.9166 55.5627V21.4377L53.6666 38.5002L30.9166 55.5627Z"
							fill="url(#paint0_linear_889_437)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_889_437"
								x1="0.583251"
								y1="3.55535"
								x2="89.3899"
								y2="41.6333"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#FFB901" />
								<stop offset="0.468032" stop-color="#FF7F00" />
								<stop offset="0.81734" stop-color="#FE6312" />
								<stop offset="1" stop-color="#FD6220" />
							</linearGradient>
						</defs>
					</svg>
					<span className="play-link-text">Play on Spotify</span>
				</a>
				<div className="follow-link">
					<a href={FollowLink} target="_blank">
						Follow us on Spotify
					</a>
				</div>
				<div className="share-link">
					<a href={ShareLink} target="_blank">
						Share
					</a>
				</div>
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
