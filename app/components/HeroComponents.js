import styled from 'styled-components';

export const ArchiveHeroContent = styled.div`
	width: 100%;
	padding: 15rem 6rem 0 6rem;
	display: flex;
	gap: 4rem;
	align-items: center;
	justify-content: space-between;

	& h1 {
		text-align: left;
	}

	@media only screen and (max-width: 1100px) {
		padding: 14rem 4rem 0 4rem;
		flex-direction: column;

		& h1,
		& p {
			text-align: center;
		}
	}

	@media only screen and (max-width: 655px) {
		padding: 14rem 2rem 0rem 2rem;
	}
`;

export const ArchiveContentContainer = styled.div`
	color: var(--white);

	& h1 {
		font-family: var(--sans-serif);
	}

	& p {
		font-family: var(--sans-serif);
		color: var(--white);
		font-weight: 400;
		font-size: var(--body);
	}
`;

export const ArchiveContentContainerSingle = styled.div`
	color: var(--white);
	padding: 0 0 4rem 0;
	width: 100%;
	text-align: center;

	& h1 {
		font-family: var(--sans-serif);
		line-height: 1.2;
		margin: auto;
		text-align: center;
	}

	& p {
		font-family: var(--sans-serif);
		color: var(--white);
		font-weight: 400;
		font-size: var(--body);
		line-height: 1.5;
		padding: 2rem 0 0 0;
		text-align: center;
	}

	@media only screen and (max-width: 820px) {
		& h1 {
			font-family: var(--sans-serif);
			line-height: 1.2;
			margin: auto;
			text-align: center;
			font-size: 3.5rem;
		}
	}
`;
