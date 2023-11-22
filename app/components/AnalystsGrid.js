'use client';
import { useState } from 'react';
import Title from './Title';
import { styled } from 'styled-components';
import Image from 'next/image';
import AngledArrowBlue from '../../public/images/icons/angledArrowBlue.svg?url';

const AnalystsSection = styled.section`
	width: 100%;
	background-color: var(--cool-grey);
	padding: 6rem 6rem;
	position: relative;
`;

const AnalystsCardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-top: 2rem;
`;

const AnalystsCard = styled.div`
	& h2,
	& p {
		font-family: var(--sans-serif);
		font-color: var(--darkblue);
	}
	& h2 {
		font-size: var(--sub-heading);
	}
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	cursor: pointer;

	& .analystData {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .arrow {
		width: 30px;
		position: relative;
	}

	& .arrow img {
		width: 100%;
		height: auto;
		maax-width: 100%;
		transition: all 0.3s ease-in-out;
	}
	&:hover .arrow img {
		filter: contrast(0) sepia(100%) hue-rotate(-15deg) saturate(3);
	}
`;

const AnalystsModal = styled.div`
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
`;
const AnalystsModalInnerContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80vw;
	height: 80vh;
`;
const MediaContainer = styled.div`
	width: 50%;
	height: 100%;
	background-image: url(${(props) => props.$bg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;
const ContentContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
	background-color: var(--darkblue);
`;

const CloseButton = styled.div`
	position: absolute;
	top: 2rem;
	right: 2rem;
	cursor: pointer;
`;

export default function AnalystsGrid(props) {
	const { Title: title, blurb, AnalystsCards } = props;
	const [currentAnalyst, setCurrentAnalyst] = useState(null);

	function openAnalystModal() {
		document.querySelector('#analyst-modal').style.display = 'block';
	}
	function closeAnalystModal() {
		document.querySelector('#analyst-modal').style.display = 'none';
	}

	return (
		<AnalystsSection>
			<Title
				as="h1"
				color="darkblue"
				weight="medium"
				size="heading"
				align="left"
			>
				{title}
			</Title>
			{blurb && <p>{blurb}</p>}
			<AnalystsCardContainer>
				{AnalystsCards?.map((analyst, index) => {
					return (
						<AnalystsCard
							key={`analyst-${index}`}
							onClick={() => {
								setCurrentAnalyst(props.AnalystsCards[index]);
								openAnalystModal();
							}}
						>
							<Image
								src={analyst.Image?.data.attributes.url}
								alt={
									analyst.Image?.data.attributes
										.alternativeText
								}
								width={329}
								height={323}
							/>
							<FlexContainer>
								<div className="analystData">
									<h2>{analyst.Name}</h2>
									<p>{analyst.JobTitle}</p>
								</div>
								<div className="arrow">
									<Image
										src={AngledArrowBlue}
										alt="angled arrow"
										width={15}
										height={15}
										className="rightArrow"
									/>
								</div>
							</FlexContainer>
						</AnalystsCard>
					);
				})}
			</AnalystsCardContainer>
			<AnalystsModal id="analyst-modal">
				<AnalystsModalInnerContainer>
					<MediaContainer
						$bg={currentAnalyst.Image.data.attributes.url}
					></MediaContainer>
					<ContentContainer>
						<CloseButton
							id="close"
							onClick={closeAnalystModal}
							style={{ color: 'white' }}
						>
							&#10005;
						</CloseButton>
						<Title
							as="h1"
							color="darkblue"
							weight="medium"
							size="heading"
						>
							{currentAnalyst?.Name}
						</Title>
						<p>{currentAnalyst?.JobTitle}</p>
						<p>{currentAnalyst?.Content}</p>
					</ContentContainer>
				</AnalystsModalInnerContainer>
			</AnalystsModal>
		</AnalystsSection>
	);
}
