import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://bdaley.github.io",
	base: '/dmd-1070-5070/',
	integrations: [
		starlight({
			title: 'DMD 1070/5070',
			social: {
				github: 'https://github.com/bdaley/dmd-1070-5070',
				twitter: 'https://twitter.com/uconnwebprof',
			},
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' }
				},
				{
					label: 'HTML Basics',
					autogenerate: { directory: 'html-basics' }
				},
				{
					label: 'Images',
					autogenerate: { directory: 'images' }
				},
				{
					label: 'HTML5 & Semantic Markup',
					autogenerate: { directory: 'html5-semantic-markup' }
				},
				{
					label: 'CSS Basics',
					autogenerate: { directory: 'css-basics' }
				},
				{
					label: 'The Box Model',
					autogenerate: { directory: 'the-box-model' }
				},
				{
					label: 'CSS Layout',
					autogenerate: { directory: 'css-layout' }
				},
				{
					label: 'Web Design Process',
					autogenerate: { directory: 'web-design-process' }
				},
				{
					label: 'DevTools',
					autogenerate: { directory: 'devtools' }
				},
				{
					label: 'Responsive Web Design',
					autogenerate: { directory: 'responsive-web-design' }
				},
				{
					label: 'Bootstrap',
					autogenerate: { directory: 'bootstrap' }
				},
				{
					label: "What's Next?",
					autogenerate: { directory: 'whats-next' }
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
