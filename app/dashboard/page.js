'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import Title from '../components/Title';
import { NextRequest } from 'next/server';

const RegisterMainSection = styled.section`
	height: 70vh;
`;
const RegisterFormContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
`;
const InnerContainer = styled.form``;
const FieldGroup = styled.div``;
const StyledInput = styled.input`
	width: 100%;
`;
const StyledButton = styled.button`
	width: 100%;
`;
const SubContent = styled.div`
	display: flex;
	gap: 1rem;
	color: #fff;
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

	async function handleSignIn(e) {
		e.preventDefault();

		const res = await signIn('credentials', {
			...userData,
			redirect: false,
			callbackUrl: '/sign-in',
		});

		if (res.status === 200) {
			setError(null);
		}

		if (res.status === 401) setError('Invalid Credential');
	}

	async function handleProviderSignIn(e) {
		e.preventDefault();
		signIn('google', {
			userData,
			redirect: false,
			callbackUrl: '/sign-in',
		}).then((response) => {
			console.log('provider sign in response: ', response);
		});
	}

	return (
		<RegisterMainSection>
			<RegisterFormContainer>
				<InnerContainer onSubmit={handleSignIn}>
					<Title>Sign In</Title>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<FieldGroup>
						<StyledInput
							aria-label="email input"
							name="email"
							type="email"
							placeholder="email"
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
						<StyledInput
							aria-label="password input"
							name="email"
							type="password"
							placeholder="password"
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
						Submit
					</StyledButton>
					<hr />
					<div key={`google-provider`}>
						<button onClick={(e) => handleProviderSignIn(e)}>
							Sign in with Google
						</button>
					</div>
					<SubContent>
						<p>Don't have an account?</p>
						<Link href="/register">Sign Up</Link>
					</SubContent>
				</InnerContainer>
			</RegisterFormContainer>
		</RegisterMainSection>
	);
}
