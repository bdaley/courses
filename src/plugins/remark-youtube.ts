import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Link, Text } from 'mdast';

export function remarkYouTube() {
	return (tree: Root, file: any) => {
		// Only auto-embed on dedicated video pages (filenames ending with -video)
		// Host/lesson pages should link to video pages via LinkCard instead
		const filePath: string = file?.history?.[0] ?? file?.path ?? '';
		if (!filePath.includes('-video.')) return;

		const replacements: Array<{
			videoId: string;
			title: string;
			index: number;
			parent: any;
		}> = [];

		visit(tree, 'paragraph', (node: Paragraph, index: number, parent: any) => {
			const link = findYouTubeLink(node);
			if (!link) return;

			const videoId = extractYouTubeId(link.url);
			if (!videoId) return;

			const title = collectText(link);
			replacements.push({ videoId, title, index, parent });
		});

		for (const { videoId, title, index, parent } of replacements.reverse()) {
			parent.children[index] = {
				type: 'html',
				value: createEmbedHtml(videoId, title),
			} as any;
		}
	};
}

function findYouTubeLink(node: Paragraph): Link | null {
	if (node.children.length !== 1) return null;
	const child = node.children[0];
	if (child.type !== 'link') return null;
	const link = child as Link;
	if (!isYouTubeUrl(link.url)) return null;
	return link;
}

function isYouTubeUrl(url: string): boolean {
	try {
		const parsed = new URL(url);
		return (
			parsed.hostname.includes('youtube.com') ||
			parsed.hostname === 'youtu.be'
		);
	} catch {
		return false;
	}
}

function extractYouTubeId(url: string): string | null {
	try {
		const parsed = new URL(url);
		if (parsed.hostname.includes('youtube.com')) {
			return parsed.searchParams.get('v');
		} else if (parsed.hostname === 'youtu.be') {
			return parsed.pathname.slice(1).split('/')[0] || null;
		}
	} catch {}
	return null;
}

function collectText(link: Link): string {
	return (link.children as Text[])
		.map((child) => child.value || '')
		.join('');
}

function createEmbedHtml(videoId: string, title: string): string {
	const safeTitle = title
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" title="${safeTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
}
