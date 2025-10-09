const fs = require('fs');
const path = require('path');

async function main() {
  const src = path.resolve(__dirname, '..', 'dist', 'viam-web', 'browser');
  const dest = path.resolve(__dirname, '..', 'browser');

  if (!fs.existsSync(src)) {
    console.error('Source folder does not exist:', src);
    process.exit(1);
  }

  // Use fs.promises.cp when available (Node 16.7+). Fallback to manual copy if needed.
  const { cp, mkdir } = require('fs/promises');
  try {
    await mkdir(dest, { recursive: true });
    await cp(src, dest, { recursive: true, force: true });
    console.log('Copied', src, 'to', dest);
  } catch (err) {
    console.error('Copy failed:', err);
    process.exit(1);
  }
}

main();
