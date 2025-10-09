const fs = require('fs');
const path = require('path');

async function main() {
  const src = path.resolve(__dirname, '..', 'dist', 'viam-web', 'browser');
  const dest = path.resolve(__dirname, '..', '.vercel', 'output', 'static');

  if (!fs.existsSync(src)) {
    console.error('Source folder does not exist:', src);
    process.exit(1);
  }

  const { cp, mkdir } = require('fs/promises');
  try {
    await mkdir(dest, { recursive: true });
    await cp(src, dest, { recursive: true, force: true });
    console.log('Exported static files from', src, 'to', dest);
  } catch (err) {
    console.error('Export failed:', err);
    process.exit(1);
  }
}

main();
