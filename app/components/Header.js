'use client';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchIcon from '../../public/images/icons/searchIcon.svg?url';
import AngledArrow from '../../public/images/icons/angledArrow.svg?url';
import Logo from '../../public/images/logoWhite.svg?url';
import LinkedIn from '../../public/images/icons/LinkedInWhite.svg?url';
import CloseIcon from '../../public/images/icons/closeIconBlack.svg?url';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Search from './Search';
import { SearchResult } from './SearchResult';
import useDebouncedState from './../hooks/useDebouncedState';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

gsap.registerPlugin(ScrollTrigger);

const StyledHeader = styled.header`
	width: 100%;
	display: inline-block;

	&.sitebranding {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}

	&.sitebranding.sticky {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background: var(--darkblue);
	}
`;

const TopBar = styled.div`
	width: 100%;
	margin: auto;
	position: relative;
`;

const AnnoucementBar = styled.div`
	background: linear-gradient(
		45deg,
		rgba(1, 4, 60, 1) 0%,
		rgba(32, 58, 113, 1) 100%
	);
	width: 100%;
	padding: 0.5rem 2rem;
	position: relative;

	& p {
		margin: auto;
		color: var(--white);
		text-align: center;
		font-size: var(--nav);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-style: normal;
		display: block;
	}
`;
const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 1.5rem 2rem 1rem 2rem;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	background: transparent;
	transition: 0.3s ease all;

	.sitebranding.sticky & {
		padding: 1.5rem 2rem;
		align-items: center;
	}
`;
const LogoImage = styled.div`
	position: absolute;
	top: 2rem;
	left: 0rem;
	width: 150px;
	padding: 1rem 2rem;
	transition: 0.3s ease all;

	& .headerLogo {
		width: 100%;
		max-width: 100%;
		height: auto;
	}
	.sitebranding.sticky & {
		top: 2.7rem;
		left: 2rem;
		padding: 0;
		width: 50px;
	}
`;
const NavContainerLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 4rem;
	width: calc(33.33% - 0.5rem);
	transition: 0.3s ease all;
`;
const NavContainerCenter = styled.div`
	width: calc(33.33% - 0.5rem);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
`;
const NavContainerRight = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
	width: 100%;

	@media only screen and (max-width: 868px) {
		& .mainLink {
			display: none;
		}
	}

	@media only screen and (max-width: 600px) {
		& nav {
			display: none;
		}
	}
`;
const NavSection = styled.nav`
	display: flex;
	align-items: center;
	gap: 2rem;
	color: var(--white);
	font-size: var(--nav);
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-family: var(--sans-serif);
	font-weight: 400;
	font-style: normal;

	& .linkwbtn {
		display: flex;
		gap: 0.5rem;
		color: var(--white);
		font-size: var(--nav);
		font-weight: 500;
		align-items: center;
		transition: 0.3s ease all;
	}
	& .linkwbtn:hover img {
		filter: invert(0.4) sepia(1) saturate(20) hue-rotate(360deg)
			brightness(1.04);
	}
	& .primaryBtn {
		position: relative;
		color: var(--white);
		padding: 0.5rem 1.5rem;
		background: transparent !important;
	}

	& .primaryBtn,
	& .primaryBtn .background,
	& .primaryBtn .border {
		border-radius: 9.2rem;
	}

	& .primaryBtn::before {
		background: linear-gradient(
				163deg,
				rgba(255, 185, 1, 1) 0%,
				rgba(255, 127, 0, 1) 45%,
				rgba(254, 99, 18, 1) 89%,
				rgba(253, 98, 32, 1) 100%
			)
			border-box;
	}

	& .primaryBtn .background,
	& .primaryBtn .border {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	& .primaryBtn .background {
		background: var(--orange-gradient-linear) border-box;
		opacity: 1;
		transition: 0.3s ease all;
	}

	& .primaryBtn:hover .background {
		box-shadow: 0rem 0.5rem 1rem rgba(255, 255, 255, 0.3);
	}

	& .primaryBtn .border {
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

	& .primaryBtn span {
		color: #fff;
		font-family: var(--sans-serif);
		font-weight: 500;
		font-size: var(--nav);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}
`;
const Hamburger = styled.div`
	margin: 0rem 1rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	height: 1.1rem;
	width: 2rem;
	min-width: 2rem;
	cursor: pointer;

	& .barTop {
		height: 1px;
		background: var(--white);
		border-radius: 0px;
		margin: 0 0 3px 0;
		transform-origin: left;
		transition: all 0.5s;
	}
	& .barMiddle {
		height: 1px;
		background: var(--white);
		border-radius: 0px;
		margin: 0 0 3px 0;
		transform-origin: left;
		transition: all 0.5s;
	}
`;
const MobileMenu = styled.div`
	position: fixed;
	right: -100%;
	top: 1rem;
	bottom: 1rem;
	z-index: 100;
	width: 40%;
	height: calc(100vh - 2rem);
	background: var(--white);
	border-radius: 1rem;
	transition: 0.5s ease all;

	&.open {
		right: 1rem;
	}

	& .closeContainer {
		position: absolute;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
		width: calc(1.5vw * 1);
	}

	& .closeContainer img {
		width: 100%;
		height: auto;
	}

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 450px;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			max-width: 80%;
			width: 100%;
		}
		& .closeContainer {
			position: absolute;
			top: 1rem;
			right: 1rem;
			cursor: pointer;
			width: 1.5rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			max-width: 100%;
			width: 90%;
		}
	}
`;
const MobileMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;
	height: 100%;
`;
const LogInMenu = styled.ul`
	display: flex;
	gap: 0.8rem;
	flex-direction: column;
	list-style: none;
	justify-content: flex-start;
	margin-block-start: 0em;
	margin-block-end: 2rem;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 0px;

	.linkwbtn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.1rem;
		font-size: var(--nav);
		text-transform: uppercase;
		color: var(--white);
	}

	.linkwbtn img {
		filter: invert(0);
	}
`;
const TopMenu = styled.div`
	padding: 4rem 2rem 0 2rem;

	.largeMenu,
	.smallMenu {
		list-style: none;
	}

	.smallMenu {
		border-top: 1px solid var(--slate);
		margin-top: 1rem;
		padding-top: 1rem;
	}

	.largeMenu li {
		font-size: var(--sub-heading);
		font-weight: 500;
		line-height: 2;
	}
	.largeMenu li,
	.smallMenu li {
		font-family: var(--sans-serif);
	}
	.smallMenu li {
		font-size: var(--body-large);
		line-height: 2.5;
	}
`;
const BottomMenu = styled.div`
	width: 100%;
	display: flex;
	padding: 2rem 2rem;
	gap: 2rem;
	align-items: flex-start;
	justify-content: space-between;
	position: relative;
	border-radius: 0 0 1rem 1rem;
	background: var(--darkblue-gradient-linear);
	background: var(--darkblue-gradient-moz);
	background: var(--darkblue-gradient-webkit);

	& address {
		color: var(--white);
		font-style: normal;
		font-weight: 400;
		font-size: var(--nav);
		font-family: var(--sans-serif);
		line-height: 1.5;
	}

	& .socialContainer {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 1rem 0 0 0;
	}

	& .policyMenu {
		list-style: none;
	}
	& .policyMenu li {
		color: var(--white);
		font-size: var(--nav);
		font-family: var(--sans-serif);
		font-weight: 400;
		font-style: normal;
		text-transform: uppercase;
		line-height: 2;
		letter-spacing: 0.1rem;
	}
`;
const Underlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	display: none;
	z-index: -1;
	background: rgba(0, 0, 0, 0.7);
	transition: opacity 0.5s ease;

	&.open {
		z-index: 99;
		opacity: 1;
		display: block;
	}
`;
const IconAction = styled.button`
	display: inline-flex;
`;
const SearchContainer = styled.div`
	padding: 2rem 2rem 1rem;
	position: fixed;
	flex: 0 0 100%;
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	top: 0;
	left: 0;
	background: var(--darkblue);
	z-index: 99;

	opacity: ${(props) => (props.$isSearchVisible ? 1 : 0)};
	pointer-events: ${(props) => (props.$isSearchVisible ? 'auto' : 'none')};
	transition: 0.2s opacity ease-out;

	${IconAction} {
		position: relative;
		margin-bottom: 1rem;
	}
`;
const SearchResultsContainer = styled.div`
	position: fixed;
	left: 2rem;
	top: 7rem;
	height: calc(100% - 9.5rem);
	max-height: 37rem;
	overflow-y: auto;
	width: calc(100% - 4rem);
	z-index: 99;

	/* Gradient Scroll Bar */

	/* width */
	&::-webkit-scrollbar {
		width: 0.625rem;
	}

	/* Track */
	&::-webkit-scrollbar-track {
		background: var(--cool-grey);
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		border-radius: 0.625rem;
		background: var(
			--Orange-Gradient,
			linear-gradient(
				113deg,
				#ffb901 1.18%,
				#ff7f00 46.59%,
				#fe6312 80.48%,
				#fd6220 98.21%
			)
		);
	}
`;

export default function Header() {
	const minSearchTermLength = 2;
	const pathname = usePathname();
	const [navIsOpen, setNavIsOpen] = useState(false);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [searchResults, setSearchResults] = useState({});
	const [searchTerm, setSearchTerm] = useDebouncedState('', 500);
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const session = useSession();

	useEffect(() => {
		// Hide search when route changes
		setIsSearchVisible(false);
	}, [pathname]);

	function toggleNav() {
		setNavIsOpen(!navIsOpen);
	}

	const fetchGlobalSearchResults = async (searchTerm = '') => {
		setSearchIsLoading(true);

		const res = await fetch(
			`${process.env.APP_URL}/api/fuzzy-search/search?query=${searchTerm}&[publishedAt][$notNull]=true`
		);
		const results = await res.json();

		setSearchResults(results);
		setSearchIsLoading(false);
	};

	const mergedSearchResults = (obj) => {
		// Create an empty array to store all the items
		const mergedArray = [];
		// const resultTypeMap = {};

		// Loop through each property (array) in the object
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				// Concatenate the current array to the mergedArray
				mergedArray.push(
					...obj[key].map((item) => {
						const itemSlug = item.slug || item.Slug;
						return {
							...item,
							resultType: key,
							url: `${key === 'pages' ? '' : key}/${
								itemSlug === 'home' ? '/' : itemSlug
							}`,
						};
					})
				);
			}
		}

		// Sort the merged array by date
		mergedArray.sort(
			(a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
		);

		// Simply hide items from search
		return mergedArray.filter((result) => {
			return !result.HideFromSearch;
		});
	};

	useEffect(() => {
		ScrollTrigger.create({
			start: '0px 0px',
			end: 99999,
			toggleClass: { className: 'sticky', targets: '.sitebranding' },
		});
	}, []);

	useEffect(() => {
		// Min length search term
		if (searchTerm.trim().length >= minSearchTermLength) {
			fetchGlobalSearchResults(searchTerm);
		}
	}, [searchTerm]);

	console.log(session);

	return (
		<StyledHeader className="sitebranding">
			<AnnoucementBar>
				<p>Optional Announcement Text</p>
			</AnnoucementBar>
			<TopBar>
				<SearchContainer $isSearchVisible={isSearchVisible}>
					<Search
						isLoading={searchIsLoading}
						handleSearch={setSearchTerm}
						isVisible={isSearchVisible}
					/>
					<IconAction
						className="button-reset"
						onClick={() => setIsSearchVisible(false)}
						aria-label="close search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
						>
							<path
								d="M15.5437 15L25.8697 4.662C25.9415 4.58954 25.9817 4.4917 25.9817 4.38975C25.9817 4.28779 25.9415 4.18996 25.8697 4.1175C25.7962 4.04741 25.6985 4.00838 25.597 4.00851C25.4954 4.00865 25.3978 4.04796 25.3245 4.11825L15 14.4555L4.67399 4.1175C4.60045 4.04787 4.50302 4.00907 4.40174 4.00907C4.30047 4.00907 4.20304 4.04787 4.12949 4.1175C4.05782 4.18983 4.0176 4.28754 4.0176 4.38937C4.0176 4.4912 4.05782 4.58892 4.12949 4.66125L14.4562 15L4.13024 25.338C4.09235 25.3732 4.06195 25.4157 4.04084 25.4629C4.01974 25.5101 4.00837 25.5611 4.00742 25.6128C4.00647 25.6645 4.01595 25.7159 4.0353 25.7638C4.05465 25.8118 4.08347 25.8554 4.12005 25.8919C4.15662 25.9285 4.20018 25.9573 4.24814 25.9767C4.29611 25.996 4.34748 26.0055 4.39919 26.0046C4.4509 26.0036 4.50188 25.9923 4.5491 25.9711C4.59632 25.95 4.63879 25.9196 4.67399 25.8817L15 15.5445L25.3252 25.8825C25.3609 25.9182 25.4033 25.9466 25.45 25.966C25.4967 25.9854 25.5467 25.9953 25.5972 25.9954C25.6478 25.9954 25.6978 25.9855 25.7445 25.9662C25.7912 25.9469 25.8336 25.9186 25.8694 25.8829C25.9051 25.8472 25.9335 25.8048 25.9529 25.7581C25.9722 25.7114 25.9822 25.6614 25.9822 25.6109C25.9823 25.5604 25.9724 25.5103 25.9531 25.4636C25.9338 25.4169 25.9054 25.3745 25.8697 25.3387L15.5437 15Z"
								fill="#FBFBFB"
							/>
						</svg>
					</IconAction>
					{mergedSearchResults(searchResults).length && (
						<SearchResultsContainer>
							{mergedSearchResults(searchResults).map(
								(result) => {
									return (
										<SearchResult
											result={result}
											key={`${result.resultType}-${result.id}`}
										/>
									);
								}
							)}
						</SearchResultsContainer>
					)}
				</SearchContainer>
			</TopBar>
			<LogoImage>
				<Link href="/">
					<Image
						className="headerLogo"
						src={Logo}
						alt="22VI Logo"
						width={68}
						height={92}
					/>
				</Link>
			</LogoImage>
			<HeaderContainer>
				<NavContainerLeft></NavContainerLeft>
				<NavContainerRight>
					<NavSection>
						<Link href="/reports" className="mainLink">
							Reports
						</Link>
						<Link href="/webinars" className="mainLink">
							Webinars
						</Link>
						{!session.data ? (
							<>
								<Link className="linkwbtn" href="/sign-in">
									Log In{' '}
									<Image
										src={AngledArrow}
										alt="angled arrow"
										width={15}
										height={15}
									/>
								</Link>
								<Link href="/register">
									<div className="primaryBtn">
										<span>
											Sign Up{' '}
											<Image
												src={AngledArrow}
												alt="angled arrow"
												width={15}
												height={15}
											/>
										</span>
										<div className="border"></div>
										<div className="background"></div>
									</div>
								</Link>
							</>
						) : (
							<>
								<Link
									className="linkwbtn"
									href="/sign-out"
									onClick={() =>
										signOut({ callbackUrl: '/' })
									}
								>
									Sign Out{' '}
									<Image
										src={AngledArrow}
										alt="angled arrow"
										width={15}
										height={15}
									/>
								</Link>
								<Link href="/register">
									<div className="primaryBtn">
										<span>
											{session?.data?.user
												? session?.data?.user.username.slice(
														0,
														1
												  )
												: ''}{' '}
											<Image
												src={AngledArrow}
												alt="angled arrow"
												width={15}
												height={15}
											/>
										</span>
										<div className="border"></div>
										<div className="background"></div>
									</div>
								</Link>
							</>
						)}
						<IconAction
							className="button-reset"
							onClick={() => setIsSearchVisible(true)}
							aria-label="display search box"
						>
							<Image
								src={SearchIcon}
								alt="search icon"
								width={20}
								height={20}
							/>
						</IconAction>
					</NavSection>
					<Hamburger onClick={() => toggleNav()}>
						<div className="barTop"></div>
						<div className="barMiddle"></div>
					</Hamburger>
				</NavContainerRight>
			</HeaderContainer>

			<MobileMenu className={navIsOpen ? 'open' : ''}>
				<div className="closeContainer" onClick={() => toggleNav()}>
					<Image
						src={CloseIcon}
						alt="close icon"
						width={20}
						height={20}
					/>
				</div>

				<MobileMenuContainer>
					<TopMenu>
						<ul className="largeMenu">
							<li>
								<Link href="/reports">Reports</Link>
							</li>
							<li>
								<Link href="/webinars">Webinars</Link>
							</li>
							<li>
								<Link href="/events">Events</Link>
							</li>
						</ul>
						<ul className="smallMenu">
							<li>
								<Link href="/company">About</Link>
							</li>
							<li>
								<Link href="/contact">Contact Us</Link>
							</li>
						</ul>
					</TopMenu>

					<BottomMenu>
						<div className="column">
							<LogInMenu>
								<li>
									<Link className="linkwbtn" href="#">
										Sign Up{' '}
										<Image
											src={AngledArrow}
											alt="angled arrow"
											width={15}
											height={15}
										/>
									</Link>
								</li>
								<li>
									<Link className="linkwbtn" href="#">
										Log In{' '}
										<Image
											src={AngledArrow}
											alt="angled arrow"
											width={15}
											height={15}
										/>
									</Link>
								</li>
							</LogInMenu>
							<address>
								1234 Main Street
								<br />
								Anytown, USA 12345
							</address>

							<div className="socialContainer">
								<Image
									src={LinkedIn}
									alt="linkedin icon"
									width={20}
									height={20}
								/>
							</div>
						</div>
						<div className="column">
							<ul className="policyMenu">
								<li>
									<Link href="/terms">Terms of Use</Link>
								</li>

								<li>
									<Link href="/privacy-policy">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link href="/ada-statement">
										Accessibility
									</Link>
								</li>
								<li>
									<Link href="/disclosures">Disclosures</Link>
								</li>
							</ul>
						</div>
					</BottomMenu>
				</MobileMenuContainer>
			</MobileMenu>

			<Underlay className={navIsOpen ? 'open' : ''}></Underlay>
		</StyledHeader>
	);
}
