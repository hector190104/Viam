const fs = require('fs');
const path = require('path');

async function main() {
  const src = path.resolve(__dirname, '..', 'dist', 'viam-web', 'browser');
  const dest = path.resolve(__dirname, '..', '.vercel', 'output', 'static');
  const destRootStatic = path.resolve(__dirname, '..', 'static');

  if (!fs.existsSync(src)) {
    console.error('Source folder does not exist:', src);
    process.exit(1);
  }

  const { cp, mkdir } = require('fs/promises');
  try {
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true });
  console.log('Exported static files from', src, 'to', dest);

  // also copy to root-level 'static' for Dashboard overrides that expect 'static'
  await mkdir(destRootStatic, { recursive: true });
  await cp(src, destRootStatic, { recursive: true, force: true });
  console.log('Also copied static files to root-level', destRootStatic);
  } catch (err) {
    console.error('Export failed:', err);
    process.exit(1);
  }
}

main();
