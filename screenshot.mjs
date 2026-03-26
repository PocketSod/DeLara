import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'temporary screenshots');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const nums = readdirSync(dir).filter(f => f.endsWith('.png'))
  .map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? +m[1] : 0; });
const n = nums.length ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outLinux = join(dir, filename);
const outWin = execSync(`wslpath -w "${outLinux}"`).toString().trim();

// Windows Edge CLI — reliable from WSL2, supports standard viewport screenshots
const edge = '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
spawnSync(edge, [
  '--headless',
  `--screenshot=${outWin}`,
  '--window-size=1440,900',
  '--hide-scrollbars',
  url
], { timeout: 15000 });

console.log(`Saved: ${outLinux}`);
