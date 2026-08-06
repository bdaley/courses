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
			title: 'UConn DMD Course Resources',
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
						{ slug: 'dmd-4025/syllabus' },
						{
							label: 'Topics',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/topics' },
								{
									label: 'Introductions + Onboarding',
									collapsed: true,
									items: [
										{ slug: 'dmd-4025/topics/introductions-onboarding' },
										{ slug: 'dmd-4025/topics/introductions-onboarding/about-brian' },
										{
											label: 'Career Research with Vault',
											collapsed: true,
											items: [
												{ slug: 'dmd-4025/topics/introductions-onboarding/career-research-with-vault' },
												{ slug: 'dmd-4025/topics/introductions-onboarding/career-research-with-vault/getting-started' },
												{ slug: 'dmd-4025/topics/introductions-onboarding/career-research-with-vault/research-your-profession' },
											],
										},
										{ slug: 'dmd-4025/topics/introductions-onboarding/how-to-design-your-life' },
									],
								},
								{ slug: 'dmd-4025/topics/resumes' },
								{ slug: 'dmd-4025/topics/portfolio-website' },
								{ slug: 'dmd-4025/topics/linkedin-profiles' },
								{
									label: 'Graduate Education',
									collapsed: true,
									items: [
										{ slug: 'dmd-4025/topics/graduate-education' },
										{ slug: 'dmd-4025/topics/graduate-education/programs-in-the-visual-arts' },
									],
								},
								{
									label: 'Show Reels',
									collapsed: true,
									items: [
										{ slug: 'dmd-4025/topics/show-reels' },
										{ slug: 'dmd-4025/topics/show-reels/show-reel-inspirations' },
									],
								},
								{ slug: 'dmd-4025/topics/the-job-search' },
								{
									label: 'Interviewing',
									collapsed: true,
									items: [
										{ slug: 'dmd-4025/topics/interviewing' },
										{ slug: 'dmd-4025/topics/interviewing/types-of-interviews' },
									],
								},
								{ slug: 'dmd-4025/topics/elevator-pitch' },
								{
									label: 'Financial Literacy',
									collapsed: true,
									items: [
										{ slug: 'dmd-4025/topics/financial-literacy' },
										{ slug: 'dmd-4025/topics/financial-literacy/budgeting' },
										{ slug: 'dmd-4025/topics/financial-literacy/investing' },
										{ slug: 'dmd-4025/topics/financial-literacy/tax-forms-filing-options' },
										{ slug: 'dmd-4025/topics/financial-literacy/credit-and-debt-payoff' },
										{ slug: 'dmd-4025/topics/financial-literacy/housing' },
										{ slug: 'dmd-4025/topics/financial-literacy/transportation' },
										{ slug: 'dmd-4025/topics/financial-literacy/additional-resources' },
									],
								},
								{ slug: 'dmd-4025/topics/cover-letters' },
							],
						},
						{
							label: 'Assignments',
							collapsed: true,
							items: [
								{ slug: 'dmd-4025/assignments' },
								{ slug: 'dmd-4025/assignments/professional-goals' },
								{ slug: 'dmd-4025/assignments/portfolio-website' },
								{ slug: 'dmd-4025/assignments/resume' },
								{ slug: 'dmd-4025/assignments/linkedin-profile' },
								{ slug: 'dmd-4025/assignments/show-reel' },
								{ slug: 'dmd-4025/assignments/putting-yourself-out-there' },
								{ slug: 'dmd-4025/assignments/job-search-and-cover-letter' },
								{ slug: 'dmd-4025/assignments/elevator-pitch-and-portfolio-piece' },
								{ slug: 'dmd-4025/assignments/mock-interview' },
								{ slug: 'dmd-4025/assignments/final-presentation' },
							],
						},
					],
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
