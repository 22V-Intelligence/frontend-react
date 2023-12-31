"use client";
import { styled } from "styled-components";
import Anchor from "./Anchor";

const StyledSection = styled.section`
	position: relative;
	height: ${(props) => (props.$half ? "50vh" : props.$none ? "auto" : "100vh")};
	background-image: url(${(props) => `${props.$bg}`});
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center;
	background-repeat: no-repeat;
`;

export default function Section(props) {
	const { anchor, bgimage = "none", half, none } = props;

	return (
		<StyledSection $bg={bgimage} $half={props.half} $none={props.none}>
			{props.children}
		</StyledSection>
	);
}
