'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import Title from '../components/Title';
import { NextRequest } from 'next/server';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import AngledArrow from '../../public/images/icons/angledArrow.svg?url';

const RegisterMainSection = styled.section`
	width: 100%;
	margin: 0 auto;
	height: auto;
	padding: 12rem 4rem 6rem 4rem;
`;
const RegisterFormContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
`;
const InnerContainer = styled.form`
	width: 100%;
	max-width: 500px;
	padding: 2rem;
	border-radius: 1rem;
	background: var(--darkblue);
	box-shadow: 0rem 0.5rem 1rem rgba(255, 255, 255, 0.2);
	h2 {
		padding: 1rem 0 0rem 0;
	}
	hr {
		border: 0;
		height: 1px;
		background: rgba(255, 255, 255, 0.2);
		margin: 1.5rem 0;
	}
`;

const FieldGroup = styled.div`
	margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
	display: block;
	font-size: var(--nav);
	font-weight: 400;
	color: var(--white);
	margin-bottom: 0.5rem;
	& span {
		color: var(--orange);
	}
`;

const StyledInput = styled.input`
	width: 100%;
	background: var(--white);
	color: var(--black);
	padding: 0.7rem;
	border: 0px;
	border-radius: 1.5rem;
`;

const StyledButton = styled.button`
	margin: 2rem auto 0 auto;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
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
		) border-box;
		background: linear-gradient(
			163deg,
			rgba(255, 185, 1, 1) 0%,
			rgba(255, 127, 0, 1) 45%,
			rgba(254, 99, 18, 1) 89%,
			rgba(253, 98, 32, 1) 100%
		) border-box;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out; 
		mask-composite: exclude;
	}
	span {
		color: #fff;
		font-family: var(--sans-serif);
		font-weight: 500;
		font-size: var(--nav);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		letter-spacing: 0.1rem;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}
`;

const SubContent = styled.div`
	display: flex;
	gap: 0.5rem;
	padding: 0.5rem 0 1rem 0;
	color: #fff;
	& p {
		font-size: var(--nav);
	}
	& a {
		font-size: var(--nav);
		text-transform: uppercase;
		font-weight: 600;
	}
`;

const ErrorMessage = styled.p`
	color: white;
`;

export default function SignInPage() {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
	});
	// use error state
	const [error, setError] = useState(null);

	const session = useSession();
	const params = useSearchParams();
	console.log(params.get('callbackUrl'));

	async function handleSignIn(e) {
		e.preventDefault();

		const res = await signIn('credentials', {
			...userData,
			redirect: true,
			callbackUrl: params.get('callbackUrl'),
		});

		if (res.status === 200) {
			setError(null);
		}

		console.log(res);

		if (res.status === 401) setError('Invalid Credential');
	}

	async function handleProviderSignIn(e) {
		e.preventDefault();
		signIn('google', {
			userData,
			redirect: false,
			callbackUrl: params.get('callbackUrl'),
		}).then((response) => {
			// console.log('provider sign in response: ', response);
		});
	}

	return (
		<RegisterMainSection>
			<RegisterFormContainer>
				<InnerContainer onSubmit={handleSignIn}>
					<Title as="h1" transform="uppercase" size="body" align="left" weight="medium">Log In</Title>
					<SubContent>
						<p>Don't have an account?</p>
						<Link href="/register">Sign Up</Link>
					</SubContent>
					<div key={`google-provider`}>
						<button onClick={(e) => handleProviderSignIn(e)}>
							Sign in with Google
						</button>
					</div>
					<hr />
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<FieldGroup>
						<StyledLabel htmlFor="email">
							Email <span>*</span>
						</StyledLabel>
						<StyledInput
							aria-label="email input"
							name="email"
							type="email"
							placeholder="Enter Email*"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									username: e.target.value,
									email: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel htmlFor="password">
							Password <span>*</span>
						</StyledLabel>
						<StyledInput
							aria-label="password input"
							name="password"
							type="password"
							placeholder="Enter Password*"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<StyledButton type="submit" value="Submit">
						<span>Submit
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
				</InnerContainer>
			</RegisterFormContainer>
		</RegisterMainSection>
	);
}
