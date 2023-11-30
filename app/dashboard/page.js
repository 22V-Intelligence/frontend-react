'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const DashboardMainSection = styled.section`
	margin-top: 12rem;
	min-height: 60vh;
`;
const InnerContainer = styled.div`
	background-color: white;
`;
const TopBarContainer = styled.div``;
const Label = styled.label``;
const TitleSection = styled.div``;
const PersonalDetailsSection = styled.form``;
const ChangePasswordSection = styled.div``;
const DeactivateYourAccountSection = styled.div``;
const SupportSection = styled.div``;
const FieldGroup = styled.div``;
const StyledInput = styled.input`
	width: 100%;
`;
const StyledLabel = styled.label``;
const StyledButton = styled.button`
	width: 100%;
`;
const ErrorMessage = styled.p`
	color: white;
`;

export default function SignInPage() {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		business: '',
		contactPreference: '',
	});
	const [currentTitle, setCurrentTitle] = useState('Account Settings');

	// use error state
	const [error, setError] = useState(null);

	// get currenct session
	const session = useSession();

	// redirect user to homepage if not logged in
	if (!session || session.data === null) redirect('/');

	console.log({ session });

	async function handleUserUpdate(e) {
		e.preventDefault();

		const res = await fetch('/api/user', {
			method: 'PUT',
			body: JSON.stringify(userData),
		});

		if (res.status === 200) {
			setError(null);
		}
	}

	async function handleChangePassword(e) {
		e.preventDefault();

		const res = await fetch('/api/user', {
			method: 'PUT',
			body: JSON.stringify(userData),
		});

		if (res.status === 200) {
			setError(null);
		}
	}

	return (
		<DashboardMainSection>
			<InnerContainer>
				<TopBarContainer>
					<Label onClick={() => setCurrentTitle('Account Settings')}>
						Account Settings
					</Label>
					<Label onClick={() => setCurrentTitle('Cookie Settings')}>
						Cookie Settings
					</Label>
					<StyledButton onClick={handleUserUpdate}></StyledButton>
				</TopBarContainer>
				<TitleSection>
					<h1>{currentTitle}</h1>
				</TitleSection>
				<PersonalDetailsSection>
					<FieldGroup>
						<StyledLabel>Full name</StyledLabel>
						<StyledInput
							aria-label="name input"
							name="name"
							type="text"
							placeholder="name"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									name: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>Email</StyledLabel>
						<StyledInput
							aria-label="email input"
							name="email"
							type="email"
							placeholder="email"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									email: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>Phone</StyledLabel>
						<StyledInput
							aria-label="phone input"
							name="phone"
							type="tel"
							placeholder="phone"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									phone: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>Business</StyledLabel>
						<StyledInput
							aria-label="business input"
							name="business"
							type="text"
							placeholder="business"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									business: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<legend>Contact Preference</legend>
						<input
							name="contactPreference"
							id="text-preference"
							type="radio"
						/>
						<label htmlFor="text-preference">Text</label>
						<input
							name="contactPreference"
							id="email-preference"
							type="radio"
						/>
						<label htmlFor="email-preference">Email</label>
					</FieldGroup>
				</PersonalDetailsSection>
				<ChangePasswordSection>
					<h1>Change Password</h1>
					<FieldGroup>
						<StyledLabel>Current Password</StyledLabel>
						<StyledInput
							aria-label="current password input"
							name="current-password"
							type="password"
							placeholder="current password"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>New Password</StyledLabel>
						<StyledInput
							aria-label="new password input"
							name="new-password"
							type="password"
							placeholder="new password"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>Confirm New Password</StyledLabel>
						<StyledInput
							aria-label="confirm new password input"
							name="confirm-new-password"
							type="password"
							placeholder="confirm new password"
							required
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
					</FieldGroup>
					<StyledButton onClick={handleChangePassword}>
						Change Password
					</StyledButton>
				</ChangePasswordSection>
				<DeactivateYourAccountSection>
					<h1>Deactivate Your Account</h1>
					<p>
						Deactivating your account will disable your profile and
						remove your name and photo from most things you've
						shared on our platform. Some information may still be
						visible to others, such as your name in their friends
						lists and messages you sent.
					</p>
					<StyledButton>Deactivate Account</StyledButton>
				</DeactivateYourAccountSection>
				<SupportSection>
					<h1>Support</h1>
					<p>
						Have a question or need help? Contact us at{' '}
						<a href="mailto:email">email</a>
					</p>
				</SupportSection>
			</InnerContainer>
		</DashboardMainSection>
	);
}
