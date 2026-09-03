import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { remarkYouTube } from './src/plugins/remark-youtube';
import starlightImageZoom from 'starlight-image-zoom';
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	site: "https://bdaley.github.io",
	base: '/courses/',
	markdown: {
		processor: unified({ remarkPlugins: [remarkYouTube] }),
	},
	integrations: [
		react(),
		starlight({
			title: "Prof. Daley's Course Materials",
			plugins: [starlightQuiz(), starlightImageZoom()],
			customCss: ['./src/styles/video-embed.css', './src/styles/custom.css'],
			components: {
				Sidebar: './src/components/CourseSidebar.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bdaley/courses' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/uconnwebprof' },
			],
			sidebar: [
				{
					label: 'DMD 1070 · Web Design I',
					items: [
						{ slug: 'dmd-1070' },
						{
							label: 'Getting Started',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/getting-started' } }],
						},
						{
							label: 'HTML Basics',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/html-basics' } }],
						},
						{
							label: 'Images',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/images' } }],
						},
						{
							label: 'HTML5 & Semantic Markup',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/html5-semantic-markup' } }],
						},
						{
							label: 'CSS Basics',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/css-basics' } }],
						},
						{
							label: 'The Box Model',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/the-box-model' } }],
						},
						{
							label: 'CSS Layout',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/css-layout' } }],
						},
						{
							label: 'Web Design Process',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/web-design-process' } }],
						},
						{
							label: 'DevTools',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/devtools' } }],
						},
						{
							label: 'Responsive Web Design',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/responsive-web-design' } }],
						},
						{
							label: 'CSS Frameworks',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/css-frameworks' } }],
						},
						{
							label: "What's Next?",
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-1070/whats-next' } }],
						},
					],
				},
				{
					label: 'DMD 4025 · Putting It All Together',
					items: [
						{ slug: 'dmd-4025' },
						{
							label: 'Introductions + Onboarding',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/introductions-onboarding/how-to-design-your-life-video' },
								{
									slug: 'dmd-4025/topics/introductions-onboarding/career-research-lab',
									badge: { text: 'Lab', variant: 'success' },
								},
								{
									slug: 'dmd-4025/assignments/professional-goals',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'Resumes',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/resumes' },
								{
									slug: 'dmd-4025/assignments/resume',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'Portfolio Website',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/portfolio-website' },
								{
									slug: 'dmd-4025/assignments/portfolio-website',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'LinkedIn Profiles',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/linkedin-profiles' },
								{ slug: 'dmd-4025/topics/linkedin-profiles/creating-linkedin-profile-video' },
								{
									slug: 'dmd-4025/assignments/linkedin-profile',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'Graduate Education',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/graduate-education' },
								{ slug: 'dmd-4025/topics/graduate-education/understanding-graduate-education-video' },
								{ slug: 'dmd-4025/topics/graduate-education/researching-graduate-education-video' },
								{ slug: 'dmd-4025/topics/graduate-education/funding-graduate-education-video' },
								{ slug: 'dmd-4025/topics/graduate-education/application-timeline-video' },
								{ slug: 'dmd-4025/topics/graduate-education/application-materials-video' },
								{ slug: 'dmd-4025/topics/graduate-education/letters-of-recommendation-video' },
								{ slug: 'dmd-4025/topics/graduate-education/preparing-graduate-interview-video' },
								{ slug: 'dmd-4025/topics/graduate-education/questions-for-interviewer-video' },
								{ slug: 'dmd-4025/topics/graduate-education/programs-in-the-visual-arts' },
							],
						},
						{
							label: 'Show Reels',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/show-reels' },
								{ slug: 'dmd-4025/topics/show-reels/tips-for-cutting-better-show-reels-video' },
								{ slug: 'dmd-4025/topics/show-reels/25-tips-demo-reel-video' },
								{ slug: 'dmd-4025/topics/show-reels/demo-reel-tips-hired-video' },
								{ slug: 'dmd-4025/topics/show-reels/show-reel-inspirations' },
								{
									slug: 'dmd-4025/assignments/show-reel',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'The Job Search',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/the-job-search' },
								{ slug: 'dmd-4025/topics/the-job-search/types-of-employment-agencies-video' },
								{ slug: 'dmd-4025/topics/the-job-search/hidden-job-market-video' },
								{ slug: 'dmd-4025/topics/the-job-search/job-search-checklist-video' },
								{ slug: 'dmd-4025/topics/the-job-search/safe-job-search-video' },
								{
									slug: 'dmd-4025/assignments/job-search-and-cover-letter',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'Interviewing',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/interviewing' },
								{ slug: 'dmd-4025/topics/interviewing/human-behavior-ace-interview-video' },
								{ slug: 'dmd-4025/topics/interviewing/how-to-ace-next-interview-video' },
								{ slug: 'dmd-4025/topics/interviewing/types-of-interviews' },
								{ slug: 'dmd-4025/topics/interviewing/all-day-interviews-video' },
								{ slug: 'dmd-4025/topics/interviewing/phone-interviews-video' },
								{ slug: 'dmd-4025/topics/interviewing/preparing-group-interviews-video' },
								{ slug: 'dmd-4025/topics/interviewing/virtual-interviews-video' },
								{
									slug: 'dmd-4025/assignments/mock-interview',
									badge: { text: 'Assignment', variant: 'caution' },
								},
								{ slug: 'dmd-4025/assignments/mock-interview-developing-questions-video' },
							],
						},
						{
							label: 'Elevator Pitch',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/elevator-pitch' },
								{ slug: 'dmd-4025/topics/elevator-pitch/introduction-video' },
								{ slug: 'dmd-4025/topics/elevator-pitch/tell-me-about-yourself-1-video' },
								{ slug: 'dmd-4025/topics/elevator-pitch/tell-me-about-yourself-2-video' },
								{ slug: 'dmd-4025/topics/elevator-pitch/elevator-pitch-examples-1-video' },
								{ slug: 'dmd-4025/topics/elevator-pitch/elevator-pitch-examples-2-video' },
								{
									slug: 'dmd-4025/assignments/elevator-pitch-and-portfolio-piece',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							label: 'Financial Literacy',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/financial-literacy' },
								{ slug: 'dmd-4025/topics/financial-literacy/budgeting' },
								{ slug: 'dmd-4025/topics/financial-literacy/budgeting-50-30-20-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/budgeting-basics-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/emergency-fund-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/investing' },
								{ slug: 'dmd-4025/topics/financial-literacy/investing-stocks-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/tax-forms-filing-options' },
								{ slug: 'dmd-4025/topics/financial-literacy/credit-and-debt-payoff' },
								{ slug: 'dmd-4025/topics/financial-literacy/debt-payoff-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/build-credit-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/housing' },
								{ slug: 'dmd-4025/topics/financial-literacy/rent-afford-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/rent-vs-buy-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/transportation' },
								{ slug: 'dmd-4025/topics/financial-literacy/automobile-ownership-video' },
								{ slug: 'dmd-4025/topics/financial-literacy/additional-resources' },
							],
						},
						{
							label: 'Cover Letters',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics/cover-letters' },
								{ slug: 'dmd-4025/topics/cover-letters/what-is-a-cover-letter-video' },
								{
									slug: 'dmd-4025/assignments/job-search-and-cover-letter',
									badge: { text: 'Assignment', variant: 'caution' },
								},
							],
						},
						{
							slug: 'dmd-4025/assignments/putting-yourself-out-there',
							badge: { text: 'Assignment', variant: 'caution' },
						},
						{
							slug: 'dmd-4025/assignments/final-presentation',
							badge: { text: 'Assignment', variant: 'caution' },
						},
					],
				},
				{
					label: 'DMD 3440/5440 · Introduction to Mobile Application Development',
					items: [
						{ slug: 'dmd-3440' },
						{ slug: 'dmd-3440/syllabus' },
						{
							label: 'Introduction',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/introduction' } }],
						},
						{
							label: 'React Native Fundamentals',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/react-native-fundamentals' } }],
						},
						{
							label: 'User-Centered Design',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/user-centered-design' } }],
						},
						{
							label: 'Wireframing & Prototyping',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/wireframing-prototyping' } }],
						},
						{
							label: 'Navigation & App Architecture',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/navigation-architecture' } }],
						},
						{
							label: 'Coding with AI',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/ai-assisted-development' } }],
						},
						{
							label: 'State Management & Data Flow',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/state-management' } }],
						},
						{
							label: 'Local Data & Persistence',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/local-data-persistence' } }],
						},
						{
							label: 'APIs & External Data',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/apis-and-external-data' } }],
						},
						{
							label: 'Device Features & Native Capabilities',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/device-features' } }],
						},
						{
							label: 'Accessibility & Inclusive Design',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/accessibility' } }],
						},
						{
							label: 'Testing & User Feedback',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/testing-and-user-feedback' } }],
						},
						{
							label: 'Deployment & Publishing',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/deployment-and-publishing' } }],
						},
						{
							label: 'Final Project Presentations',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/final-project' } }],
						},
						{
							label: 'Assignments',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-3440/assignments' } }],
						},
					],
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
