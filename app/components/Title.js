"use client";
import { styled } from "styled-components";

const TitleStyled = styled.h1`
	color: ${(props) =>
		props.color === "white"
			? "var(--white)"
			: props.color === "coolgrey"
			? "var(--cool-grey)"
			: props.color === "darkblue"
			? "var(--darkblue)"
			: "var(--white)"};
	font-size: ${(props) =>
		props.size === "xlheading"
			? "var(--xlheading)"
			: props.size === "reportsheading"
			? "var(--reportsheading)"
			: props.size === "sectionHeading"
			? "var(--sectionHeading)"
			: props.size === "smallheading"
			? "var(--smallheading)"
			: props.size === "heading"
			? "var(--heading)"
			: props.size === "quote"
			? "var(--quote)"
			: props.size === "sub-heading"
			? "var(--sub-heading)"
			: props.size === "nav"
			? "var(--nav)"
			: "var(--body)"};
	text-align: ${(props) =>
		props.align === "left"
			? "left"
			: props.align === "center"
			? "center"
			: "left"};
	font-family: var(--sans-serif);
	font-weight: ${(props) => props.weight === "bold"
			? "700"
			: props.weight === "medium"
			? "600"
			: "400"};
	line-height: 1.3;
`;

export default function Title(props) {
	const { as, size, color, align, weight } = props;

	return (
		<TitleStyled
			as={as}
			size={size}
			color={color}
			align={align}
			weight={weight}>
			{props.children}
		</TitleStyled>
	);
}
