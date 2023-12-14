'use client';

import styled from 'styled-components';
import { remark } from 'remark';
import html from 'remark-html';
// import sectionRenderer from '../../utils/sectionRenderer';
import Hero from '@/app/components/Hero';
import Image from 'next/image';
import AngledArrow from '../../../public/images/icons/angledArrow.svg?url';

export const EventPage = async ({ pageData }) => {
	const {
		Title: title,
		publishedAt,
		EventDetails,
		Blurb,
		Content,
	} = pageData;

	// TODO: wire function with FormData
	const handleSubmit = () => {};

	return (
		<>
			<Hero Title={title} Type="postSingle" publishedAt={publishedAt} />
			<InnerContainer>
				<ContentContainer>
					<MetaDetails>
						<h3>Event Details</h3>
						<div className="MetaContainer">
							<p>
								<span className="uppercase">
									<strong>Date:</strong>
								</span>{' '}
								{EventDetails.date}
							</p>
							<p>
								<span className="uppercase">
									<strong>Time:</strong>
								</span>{' '}
								{EventDetails.time}
							</p>
							<p>
								<span className="uppercase">
									<strong>Location:</strong>
								</span>{' '}
								{EventDetails.location}
							</p>
						</div>

						<div className="blurbContainer">
							<p>{Blurb}</p>
						</div>
					</MetaDetails>
					<Divider />
					{/* Convert to html string */}
					<MainDetails
						dangerouslySetInnerHTML={{
							__html: (
								await remark().use(html).process(Content)
							).toString(),
						}}
					/>
				</ContentContainer>
				<SidebarContainer>
					<Sidebar>
						<h3>Register Here</h3>
						<sub>
							<span>*</span> indicates required field
						</sub>
						<form>
							{/* name field group */}
							<FieldGroup>
								<Label htmlFor="First">
									First Name<span>*</span>
								</Label>
								<StyledInput
									aria-label="first name input"
									name="firstname"
									type="text"
									placeholder="First Name*"
									required
								/>
							</FieldGroup>
							{/* last name field group */}
							<FieldGroup>
								<Label htmlFor="lastname">
									Last Name<span>*</span>
								</Label>
								<StyledInput
									aria-label="last name input"
									name="lastname"
									type="text"
									placeholder="Last Name*"
									required
								/>
							</FieldGroup>
							{/* email field group */}
							<FieldGroup>
								<Label htmlFor="email">
									Email<span>*</span>
								</Label>
								<StyledInput
									aria-label="email input"
									name="email"
									type="email"
									placeholder="Enter Email*"
									required
								/>
							</FieldGroup>
							{/* register button */}
							<FieldGroup>
								<StyledButton type="submit">
									<span>
										Register
										<Image
											src={AngledArrow}
											alt="angled arrow"
											width={15}
											height={15}
										/>
									</span>
									<div className="border"></div>
									<div className="background"></div>
								</StyledButton>
							</FieldGroup>
						</form>
					</Sidebar>
				</SidebarContainer>
			</InnerContainer>
		</>
	);
};

const InnerContainer = styled.div`
	padding: 0 0 3rem 0;
	background: var(--white);
	width: 100%;
	padding: 6rem;
	display: flex;
	gap: 6rem;
	align-items: flex-start;
	justify-content: space-between;
`;

const ContentContainer = styled.div`
	width: calc(60% - 3rem);
`;

const MetaDetails = styled.div`
	padding: 0;

	h3 {
		font-family: var(--sans-serif);
		font-weight: 600;
		font-size: var(--reportsheading);
		color: var(--darkblue);
	}

	.MetaContainer {
		padding: 1rem 0 0 0;
	}

	.MetaContainer p {
		font-weight: 400;
		font-family: var(--sans-serif);
		font-size: var(--body);
		line-height: 1.5;
		color: var(--darkblue);
	}
	.MetaContainer p strong {
		font-weight: 700 !important;
	}

	.MetaContainer p .uppercase {
		text-transform: uppercase;
		letter-spacing: 0.08rem;
	}

	.blurbContainer {
		padding: 2rem 0 0 0;
	}

	.blurbContainer p {
		color: var(--darkblue);
		font-weight: 400;
		font-family: var(--sans-serif);
		font-size: var(--body);
		line-height: 1.5;
	}
`;
const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: var(--cool-grey);
	margin: 3rem 0 3rem 0;
`;
const MainDetails = styled.div`
	p {
		font-weight: 400;
		font-family: var(--sans-serif);
		font-size: var(--body);
		line-height: 1.5;
		margin-bottom: 1.5rem;
	}
`;

const SidebarContainer = styled.div`
	width: calc(40% - 3rem);
	position: relative;
`;

const Sidebar = styled.div`
	width: 100%;
	background: rgb(1, 4, 60);
	background: linear-gradient(
		45deg,
		rgba(1, 4, 60, 1) 0%,
		rgba(32, 58, 113, 1) 100%
	);
	background: -moz-linear-gradient(
		45deg,
		rgba(1, 4, 60, 1) 0%,
		rgba(32, 58, 113, 1) 100%
	);
	background: -webkit-linear-gradient(
		45deg,
		rgba(1, 4, 60, 1) 0%,
		rgba(32, 58, 113, 1) 100%
	);
	border-radius: 1rem;
	padding: 2rem;

	sub,
	h3 {
		color: var(--white);
		font-weight: 400;
		font-family: var(--sans-serif);
	}
	h3 {
		font-size: var(--reportsheading);
	}

	sub {
		font-size: var(--body);
		font-style: italic;
		padding: 0 0 2rem 0;
		width: 100%;
		margin: 0 auto;
		display: block;
	}
	sub span {
		color: var(--orange);
	}
`;

const FieldGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	padding: 0 0 1rem 0;
`;

const StyledInput = styled.input`
	border-radius: 2rem;
	width: 100%;
	background: var(--white);
	font-family: var(--sans-serif);
	font-weight: 400;
	color: var(--darkblue);
	appearance: none;
	font-size: var(--body);
	webkit-appearance: none;
	moz-appearance: none;
	o-appearance: none;
	padding: 0.8rem 1rem;
	border-style: none;

	&::-webkit-input-placeholder {
		color: var(--darkblue);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-size: var(--body);
	}
	&::-moz-placeholder {
		color: var(--darkblue);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-size: var(--body);
	}
	&:-ms-input-placeholder {
		color: var(--darkblue);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-size: var(--body);
	}
	&:-moz-placeholder {
		color: var(--darkblue);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-size: var(--body);
	}
`;

const Label = styled.label`
	color: var(--white);
	font-weight: 400;
	font-family: var(--sans-serif);
	font-size: var(--nav);
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	padding: 0 0 0.5rem 0;

	span {
		color: var(--orange);
	}
`;
const StyledButton = styled.button`
	margin: 1rem 0 0 0;
	position: relative;
	color: var(--white);
	padding: 0.7rem 2rem;
	background: transparent !important;
	transition: 0.3s ease all;
	appearance: none;
	cursor: pointer;
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	border-style: none;

	&::before {
		background: linear-gradient(
				163deg,
				rgba(255, 185, 1, 1) 0%,
				rgba(255, 127, 0, 1) 45%,
				rgba(254, 99, 18, 1) 89%,
				rgba(253, 98, 32, 1) 100%
			)
			border-box;
	}

	&:hover .background {
		box-shadow: 0rem 0.5rem 1rem rgba(255, 255, 255, 0.3);
	}

	.background,
	.border {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 9.2rem;
	}

	.background {
		background: var(--orange-gradient-linear) border-box;
		opacity: 1;
		transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.border {
		border: 1px solid transparent;
		background: linear-gradient(
				163deg,
				rgba(255, 185, 1, 1) 0%,
				rgba(255, 127, 0, 1) 45%,
				rgba(254, 99, 18, 1) 89%,
				rgba(253, 98, 32, 1) 100%
			)
			border-box;
		background: linear-gradient(
				163deg,
				rgba(255, 185, 1, 1) 0%,
				rgba(255, 127, 0, 1) 45%,
				rgba(254, 99, 18, 1) 89%,
				rgba(253, 98, 32, 1) 100%
			)
			border-box;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
	}

	span {
		color: #fff;
		font-family: var(--sans-serif);
		font-weight: 500;
		font-size: var(--body);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		letter-spacing: 0.1rem;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}
`;
