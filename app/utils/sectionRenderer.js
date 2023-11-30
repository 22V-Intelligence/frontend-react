import BasicSlider from '../components/BasicSlider';
import Hero from '../components/Hero';
import TitleLeftTextCtaRight from '../components/TitleLeftTextCtaRight';
import AboutUsFeature from '../components/AboutUsFeature';
import MediaText from '../components/MediaText';
import ReportList from '../components/ReportList';
import Search from '../components/Search';
import ReportSection from '../components/ReportSection';
import ReportSummary from '../components/ReportSummary';
import ContentBlock from '../components/ContentBlock';
import CircleFeature from '../components/CircleFeature';
import FeatureList from '../components/FeatureList';
import Form from '../components/Form';
import EventList from '../components/EventList';
import AnalystsGrid from '../components/AnalystsGrid';
import WebinarList from '../components/WebinarList';
import PodcastDetails from '../components/PodcastDetails';
import EmbeddedMedia from '../components/EmbeddedMedia';
import VideoDetails from '../components/VideoDetails';

export default async function sectionRenderer(sections, index) {
	const sectionsToDisplay = [];

	sections?.map((section, index) => {
		switch (section.__component) {
			case 'layout.hero':
				sectionsToDisplay.push(
					<Hero key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.title-text-cta':
				sectionsToDisplay.push(
					<TitleLeftTextCtaRight
						key={`section-${index}`}
						{...section}
					/>
				);
				break;
			case 'layout.word-slider':
				sectionsToDisplay.push(
					<BasicSlider key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.about-us-feature':
				sectionsToDisplay.push(
					<AboutUsFeature key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.report-list':
				sectionsToDisplay.push(
					<ReportList key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.media-full-content':
				sectionsToDisplay.push(
					<MediaText key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.search-bar':
				sectionsToDisplay.push(
					<Search key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.report-summary':
				sectionsToDisplay.push(
					<ReportSummary key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.content-block':
				sectionsToDisplay.push(
					<ContentBlock key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.form':
				sectionsToDisplay.push(
					<Form key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.circle-feature':
				sectionsToDisplay.push(
					<CircleFeature key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.report-section':
				sectionsToDisplay.push(
					<ReportSection key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.feature-list':
				sectionsToDisplay.push(
					<FeatureList key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.event-list':
				sectionsToDisplay.push(
					<EventList key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.analysts-grid':
				sectionsToDisplay.push(
					<AnalystsGrid key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.webinar-list':
				sectionsToDisplay.push(
					<WebinarList key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.podcast-details':
				sectionsToDisplay.push(
					<PodcastDetails key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.video-details':
				sectionsToDisplay.push(
					<VideoDetails key={`section-${index}`} {...section} />
				);
				break;
			case 'layout.embedded-media':
				sectionsToDisplay.push(
					<EmbeddedMedia key={`section-${index}`} {...section} />
				);
				break;
			default:
				sectionsToDisplay.push(<div>Section not found</div>);
		}
	});

	return sectionsToDisplay;
}
