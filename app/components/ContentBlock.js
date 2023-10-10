"use client";
import styled from "styled-components";

const ContentBlockSection = styled.section`
	min-height: 50vh;
	color: var(--white);
	max-width: 80%;
	margin: auto;
	padding: 12rem 6rem;
	font-family: var(--sans-serif);

	& hr {
		height: 1px;
		width: 100%;
		background: rgba(255,255,255,0.2);
		margin: 3rem 0;
		display: block;
		border: 0px;
	}
	& h1 {
		font-size: var(--heading);
		line-height: 1.2;
	}
	& h2 {
		font-size: var(--quote);
		line-height: 1.2;
		margin: 0 0 0.5rem 0;
	}
	& h3 {
		font-size: var(--sub-heading);
		line-height: 1.2;
		margin: 0 0 0.5rem 0;
	}
	& p {
		font-weight: 300;
		font-size: var(--body);
		display: block;
		width: 100%;
		line-height: 1.5;
		margin: auto auto 1.5rem auto;
	}
	& p strong {
		font-weight: 600;
	}
	& p a,
	& p a:visited {
		border-bottom: 1px solid var(--orange);
		transition: all 0.3s ease-in-out;
	}
	& p a:hover {
		color: var(--orange);
	}
	& ol,
	& ul {
		margin: 0 0 1.5rem 2rem;
		list-style: none;
		font-weight: 300;
	}
	& ol li,
	& ul li {
		font-size: var(--body);
		padding: 0 0 1rem 0;
	}

	& ol li:before {
		content: "counter(item)";
		counter-increment: item;
		color: var(--orange);
		font-size: var(--body);
		margin-right: 0.5rem;
	}

	& ul li:before {
		content:"•";
		color: var(--orange);
		font-size: var(--body);
		margin-right: 0.5rem;
	}
	@media only screen and (max-width: 1100px) {
		& {
			max-width: 100%;
			padding: 16rem 4rem 6rem 4rem;
		}
		& h1 {
			font-size: 2.5rem;
			line-height: 1.2;
		}
	}
	@media only screen and (max-width: 700px) {
		& {padding: 16rem 2rem 6rem 2rem;}
	}
`;
const ContentBlockInnerContainer = styled.div``;

export default function ContentBlock(props) {
	return (
		<ContentBlockSection>
			<ContentBlockInnerContainer
				dangerouslySetInnerHTML={{ __html: props.Content }}
			/>
		</ContentBlockSection>
	);
}
