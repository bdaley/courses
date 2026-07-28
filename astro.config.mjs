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
	base: '/dmd-1070-5070/',
	markdown: {
		processor: unified({ remarkPlugins: [remarkYouTube] }),
	},
	integrations: [
		react(),
		starlight({
			title: 'DMD 1070/5070',
			plugins: [starlightQuiz(), starlightImageZoom()],
			customCss: ['./src/styles/video-embed.css', './src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bdaley/dmd-1070-5070' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/uconnwebprof' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					collapsed: true,
					items: [{ autogenerate: { directory: 'getting-started' } }]
				},
				{
					label: 'HTML Basics',
					collapsed: true,
					items: [{ autogenerate: { directory: 'html-basics' } }]
				},
				{
					label: 'Images',
					collapsed: true,
					items: [{ autogenerate: { directory: 'images' } }]
				},
				{
					label: 'HTML5 & Semantic Markup',
					collapsed: true,
					items: [{ autogenerate: { directory: 'html5-semantic-markup' } }]
				},
				{
					label: 'CSS Basics',
					collapsed: true,
					items: [{ autogenerate: { directory: 'css-basics' } }]
				},
				{
					label: 'The Box Model',
					collapsed: true,
					items: [{ autogenerate: { directory: 'the-box-model' } }]
				},
				{
					label: 'CSS Layout',
					collapsed: true,
					items: [{ autogenerate: { directory: 'css-layout' } }]
				},
				{
					label: 'Web Design Process',
					collapsed: true,
					items: [{ autogenerate: { directory: 'web-design-process' } }]
				},
				{
					label: 'DevTools',
					collapsed: true,
					items: [{ autogenerate: { directory: 'devtools' } }]
				},
				{
					label: 'Responsive Web Design',
					collapsed: true,
					items: [{ autogenerate: { directory: 'responsive-web-design' } }]
				},
				{
					label: 'CSS Frameworks',
					collapsed: true,
					items: [{ autogenerate: { directory: 'css-frameworks' } }]
				},
				{
					label: "What's Next?",
					collapsed: true,
					items: [{ autogenerate: { directory: 'whats-next' } }]
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
