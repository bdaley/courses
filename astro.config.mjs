import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { remarkYouTube } from './src/plugins/remark-youtube';
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	site: "https://bdaley.github.io",
	base: '/dmd-1070-5070/',
	integrations: [
		react(),
		unified({ remarkPlugins: [remarkYouTube] }),
		starlight({
			title: 'DMD 1070/5070',
			plugins: [starlightQuiz()],
			customCss: ['./src/styles/video-embed.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bdaley/dmd-1070-5070' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/uconnwebprof' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [{ autogenerate: { directory: 'getting-started' } }]
				},
				{
					label: 'HTML Basics',
					items: [{ autogenerate: { directory: 'html-basics' } }]
				},
				{
					label: 'Images',
					items: [{ autogenerate: { directory: 'images' } }]
				},
				{
					label: 'HTML5 & Semantic Markup',
					items: [{ autogenerate: { directory: 'html5-semantic-markup' } }]
				},
				{
					label: 'CSS Basics',
					items: [{ autogenerate: { directory: 'css-basics' } }]
				},
				{
					label: 'The Box Model',
					items: [{ autogenerate: { directory: 'the-box-model' } }]
				},
				{
					label: 'CSS Layout',
					items: [{ autogenerate: { directory: 'css-layout' } }]
				},
				{
					label: 'Web Design Process',
					items: [{ autogenerate: { directory: 'web-design-process' } }]
				},
				{
					label: 'DevTools',
					items: [{ autogenerate: { directory: 'devtools' } }]
				},
				{
					label: 'Responsive Web Design',
					items: [{ autogenerate: { directory: 'responsive-web-design' } }]
				},
				{
					label: 'Bootstrap',
					items: [{ autogenerate: { directory: 'bootstrap' } }]
				},
				{
					label: "What's Next?",
					items: [{ autogenerate: { directory: 'whats-next' } }]
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
