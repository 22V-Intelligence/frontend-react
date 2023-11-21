import Link from 'next/link';
import styled from 'styled-components';

export const GridCard = styled.article`
	background-color: white;
	padding: 2rem;
	border-radius: 1rem;
	display: flex;
	border: 2px solid;
	flex-direction: column;
	justify-content: space-between;
	aspect-ratio: 430/396;
	transition: 0.5s ease all;
	cursor: pointer;
	position: relative;

	& h2,
	& p {
		font-family: var(--sans-serif);
	}

	@media only screen and (max-width: 820px) {
		padding: 2rem;
		aspect-ratio: unset;

		& h2 {
			padding: 2rem 0;
		}
	}
`;

export const GridCardLink = styled(Link)`
	position: relative;

	&:hover,
	&:focus {
		${GridCard} {
			background: var(--darkblue);
			box-shadow: 0px 4px 40px 0px rgba(249, 255, 216, 0.3);

			&::after {
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
				content: '';
				z-index: -1;
				border-radius: 1rem;
			}

			h2,
			p,
			.text {
				color: var(--white);
			}

			img.angledArrow {
				filter: contrast(0) sepia(100%) hue-rotate(-15deg) saturate(3);
			}
		}
	}
`;
