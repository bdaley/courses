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
						{
							label: 'Career Planning',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-4025/career-planning' } }],
						},
						{
							label: 'Portfolio',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-4025/portfolio' } }],
						},
						{
							label: 'Networking & Online Presence',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-4025/networking-online-presence' } }],
						},
						{
							label: 'Job Hunt',
							collapsed: true,
							items: [{ autogenerate: { directory: 'dmd-4025/job-hunt' } }],
						},
					],
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
