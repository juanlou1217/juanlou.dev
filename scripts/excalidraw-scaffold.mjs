#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [, , articleSlugArg, diagramNameArg] = process.argv;

if (!articleSlugArg || !diagramNameArg) {
  console.error('Usage: pnpm excalidraw:new <article-slug> <diagram-name>');
  process.exit(1);
}

const toSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const articleSlug = toSlug(articleSlugArg);
const diagramSlug = toSlug(diagramNameArg);

if (!articleSlug || !diagramSlug) {
  console.error('Both article slug and diagram name must contain letters or numbers.');
  process.exit(1);
}

const outputDir = path.join(process.cwd(), 'public', 'static', 'images', 'blogs', 'excalidraw', articleSlug);
const sourcePath = path.join(outputDir, `${diagramSlug}.excalidraw`);
const svgPath = path.join(outputDir, `${diagramSlug}.svg`);

const starter = {
  type: 'excalidraw',
  version: 2,
  source: 'https://excalidraw.com',
  elements: [],
  appState: {
    gridSize: null,
    viewBackgroundColor: '#ffffff',
  },
  files: {},
};

await mkdir(outputDir, { recursive: true });
await writeFile(sourcePath, `${JSON.stringify(starter, null, 2)}\n`, { flag: 'wx' });

console.log('Created Excalidraw starter file:');
console.log(`- ${sourcePath}`);
console.log('');
console.log('Next steps:');
console.log(`1. Open ${sourcePath} in Excalidraw or import it into excalidraw.com.`);
console.log(`2. Draw the diagram and export SVG to ${svgPath}.`);
console.log('3. Paste this MDX snippet into your post and adjust caption/size:');
console.log('');
console.log('<ExcalidrawFigure');
console.log(`  src="/static/images/blogs/excalidraw/${articleSlug}/${diagramSlug}.svg"`);
console.log(`  alt="${diagramNameArg}"`);
console.log('  width={1600}');
console.log('  height={900}');
console.log(`  caption="${diagramNameArg}"`);
console.log(`  sourceHref="/static/images/blogs/excalidraw/${articleSlug}/${diagramSlug}.excalidraw"`);
console.log('/>');
