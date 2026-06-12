import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'temporary screenshots');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const scrollY = parseInt(process.argv[2] || '0');
const label = process.argv[3] || `scroll${scrollY}`;

// Create a redirect page that scrolls before screenshotting
const tmpHtml = join(__dirname, '_scroll_tmp.html');
import { writeFileSync } from 'fs';
writeFileSync(tmpHtml, `<!DOCTYPE html>
<html><head>
<script>window.location.replace('http://localhost:3000/brand-guide.html');</script>
</head><body></body></html>`);

// Use a JS injection approach via meta refresh with scroll
const interceptHtml = `<!DOCTYPE html><html><head>
<script>
  window.onload = function() {
    const iframe = document.getElementById('f');
    iframe.onload = function() {
      iframe.contentWindow.scrollTo(0, ${scrollY});
    };
  };
</script>
</head><body style="margin:0;padding:0;overflow:hidden;">
<iframe id="f" src="http://localhost:3000/brand-guide.html" 
  style="width:1440px;height:900px;border:none;" scrolling="yes"></iframe>
</body></html>`; 
writeFileSync(join(__dirname, '_scroll_view.html'), interceptHtml);

const outLinux = join(dir, `screenshot-scroll-${label}.png`);
const outWin = execSync(`wslpath -w "${outLinux}"`).toString().trim();
const edge = '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
spawnSync(edge, ['--headless', `--screenshot=${outWin}`, '--window-size=1440,900', '--hide-scrollbars',
  `http://localhost:3000/_scroll_view.html`], { timeout: 15000 });
console.log(`Saved: ${outLinux}`);
