import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
	loader: glob({ pattern: '**/*.md{,x}', base: './src/content/docs' }),
	schema: docsSchema(),
});

const i18n = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/i18n' }),
	schema: i18nSchema(),
});

export const collections = { docs, i18n };
