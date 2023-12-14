'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styled from 'styled-components';

const DashboardMainSection = styled.section`
	margin-top: 12rem;
	min-height: 60vh;

	a {
		color: var(--orange);
		text-decoration: underline;
	}
`;
const InnerContainer = styled.div`
	background-color: white;
	width: 96vw;
	max-width: 1200px;
	margin-inline: auto;
	border-radius: 20px;
	margin-bottom: 5rem;
`;
const Divider = styled.hr`
	width: 96%;
	margin-inline: auto;
	margin-bottom: 2rem;
	background: var(--cool-grey);
	apperance: none;
	height: 2px;
	border: none;
`;
const TopBarContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 2rem 3.25rem 0;

	@media (max-width: 768px) {
		flex-direction: column;

		button {
			margin-top: 1.25rem;
		}
	}
`;
const Label = styled.label`
	color: ${(props) => (props.$active ? 'black' : 'grey')};
	border-bottom: ${(props) => (props.$active ? '2px solid black' : 'none')};
	padding: 1rem 0.5rem;
	text-transform: uppercase;
`;
const TitleSection = styled.div`
	padding: 2rem 3.25rem;
`;
const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--darkblue);
`;
const PersonalDetailsSection = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 1rem;
	margin-bottom: 3rem;
	padding: 1rem 3.25rem 0;

	@media (max-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
`;
const ChangePasswordSection = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 3.25rem 2rem;
`;
const ChangePasswordGrid = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: 1fr 1fr 1fr 170px;
	margin-top: 2.25rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
const DeactivateYourAccountSection = styled.div`
	background-color: var(--cool-grey);
	padding: 3rem 3.25rem;
`;
const SupportSection = styled.div`
	padding: 2rem 3.25rem 4rem;
`;
const FieldGroup = styled.div`
	max-width: 375px;
	width: 100%;

	legend {
		padding-bottom: 0.75rem;
	}
`;
const StyledInput = styled.input`
	width: 100%;
	min-height: 60px;
	max-height: 60px;
	border-radius: 30px;
	color: var(--darkblue);
	padding: 0.5rem 0 0.5rem 1.25rem;
	display: block;
	border: 1px solid var(--darkblue);
	&::placeholder {
		color: var(--darkblue);
		text-transform: capitalize;
	}
`;
const StyledLabel = styled.label`
	font-family: var(--sans-serif);
	color: var(--darkblue);
	padding-bottom: 0.75rem;
	display: block;
`;
const StyledButton = styled.button`
	width: 100%;
	max-width: 170px;
	max-height: 55px;
	margin-left: auto;
	background: var(--orange-gradient-linear);
	color: white;
	text-transform: uppercase;
	font-family: var(--sans-serif);
	border: none;
	border-radius: 30px;
	min-height: 55px;
`;
const ErrorMessage = styled.p`
	color: white;
`;
const CookieSettingsSection = styled.section`
	padding: 2rem 3.25rem 4rem;
`;
const RadioButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 2rem;
	height: 60px;
	> div {
		display: flex;
		gap: 0.5rem;
	}
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

	function handleDeactivate(e) {
		e.preventDefault();
		if (confirm('Are you sure you want to deactivate your account?')) {
			console.log('deactivatng account');
		}
	}

	return (
		<DashboardMainSection>
			<InnerContainer>
				<TopBarContainer>
					<Label
						$active={
							currentTitle === 'Account Settings' ? true : false
						}
						onClick={() => setCurrentTitle('Account Settings')}
					>
						Account Settings
					</Label>
					<Label
						$active={
							currentTitle === 'Cookie Settings' ? true : false
						}
						onClick={() => setCurrentTitle('Cookie Settings')}
					>
						Cookie Settings
					</Label>
					<StyledButton onClick={handleUserUpdate}>Save</StyledButton>
				</TopBarContainer>

				<TitleSection>
					<h1>{currentTitle}</h1>
				</TitleSection>

				<Divider />

				{currentTitle === 'Account Settings' ? (
					<>
						<PersonalDetailsSection>
							<FieldGroup>
								<StyledLabel>First & Last Name</StyledLabel>
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
								<RadioButtonContainer>
									<div>
										<input
											name="contactPreference"
											id="text-preference"
											type="radio"
										/>
										<label htmlFor="text-preference">
											Phone
										</label>
									</div>
									<div>
										<input
											name="contactPreference"
											id="email-preference"
											type="radio"
										/>
										<label htmlFor="email-preference">
											Email
										</label>
									</div>
								</RadioButtonContainer>
							</FieldGroup>
						</PersonalDetailsSection>

						<Divider />

						<ChangePasswordSection>
							<h1>Change Password</h1>
							<ChangePasswordGrid>
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
									<StyledLabel>
										Confirm New Password
									</StyledLabel>
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
							</ChangePasswordGrid>
						</ChangePasswordSection>

						<DeactivateYourAccountSection>
							<Title>Deactivate Your Account</Title>
							<p>
								Deactivating your account will disable your
								profile and remove your name and photo from most
								things you've shared on our platform. Some
								information may still be visible to others, such
								as your name in their friends lists and messages
								you sent.{' '}
								<a href="#" onClick={handleDeactivate}>
									Deactivate My Account
								</a>
							</p>
						</DeactivateYourAccountSection>

						<SupportSection>
							<Title>Support</Title>
							<p>
								Lorem ipsum sed ed et lorem ipsum. Lorem ipsum
								sed ed et lorem ipsum. Lorem ipsum sed ed et
								lorem ipsum. Lorem ipsum sed ed et lorem ipsum.
								Lorem ipsum sed ed et lorem ipsum. Lorem ipsum
								sed ed et lorem ipsum.{' '}
								<a href="mailto:email">Contact Us</a>
							</p>
						</SupportSection>
					</>
				) : (
					<CookieSettingsSection>
						<p>
							Proident id mollit id in incididunt. Ad duis ipsum
							sint eu voluptate Lorem magna adipisicing ullamco.
							Eu Lorem aliqua culpa sunt aliquip sint aliquip
							consectetur ullamco. Sunt mollit labore pariatur
							duis quis consequat et exercitation aliquip ad est
							ad.
						</p>
						<br />
						<br />
						<p>
							Duis nostrud nisi nulla laborum ad proident
							incididunt deserunt exercitation. Culpa quis officia
							laboris culpa laborum irure enim enim. Labore
							nostrud consequat aute id. Eiusmod amet eiusmod enim
							minim qui ad. Qui dolor magna esse occaecat
							consectetur ea aliquip. Cupidatat elit irure fugiat
							occaecat ex minim sunt officia consequat ad.
						</p>
					</CookieSettingsSection>
				)}
			</InnerContainer>
		</DashboardMainSection>
	);
}
