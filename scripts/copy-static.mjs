import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

await mkdir(path.join(dist, 'popup'), { recursive: true });

await cp(path.join(root, 'manifest.json'), path.join(dist, 'manifest.json'));
await cp(path.join(root, 'icons'), path.join(dist, 'icons'), { recursive: true });
await cp(path.join(root, 'popup', 'popup.html'), path.join(dist, 'popup', 'popup.html'));
await cp(path.join(root, 'popup', 'popup.css'), path.join(dist, 'popup', 'popup.css'));
