"use client";
import { styled } from "styled-components";
import Section from "./Section";
import Title from "./Title";

const HeroContent = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
	width: 100%;
	text-align: center;
`;

export default function Hero(props) {
	return (
		<Section bgimage={`${props.Image.data.attributes.url}`}>
			<HeroContent>
				<Title as="h1">{props.Title}</Title>
			</HeroContent>
		</Section>
	);
}
