const fs = require('fs');
const path = require('path');

async function main() {
  const src = path.resolve(__dirname, '..', 'dist', 'viam-web', 'browser');
  const destRoot = path.resolve(__dirname, '..', 'browser');
  const destVercel = path.resolve(__dirname, '..', '.vercel', 'output', 'static');
  const destStatic = path.resolve(__dirname, '..', 'static');

  if (!fs.existsSync(src)) {
    console.error('Source folder does not exist:', src);
    process.exit(1);
  }

  // Use fs.promises.cp when available (Node 16.7+). Fallback to manual copy if needed.
  const { cp, mkdir } = require('fs/promises');
  try {
  // copy to root-level browser
  await mkdir(destRoot, { recursive: true });
  await cp(src, destRoot, { recursive: true, force: true });
  console.log('Copied', src, 'to', destRoot);

  // copy to .vercel/output/static for Vercel Build Output API
  await mkdir(destVercel, { recursive: true });
  await cp(src, destVercel, { recursive: true, force: true });
  console.log('Copied', src, 'to', destVercel);

  // copy to root-level static for Dashboard override expecting 'static'
  await mkdir(destStatic, { recursive: true });
  await cp(src, destStatic, { recursive: true, force: true });
  console.log('Copied', src, 'to', destStatic);
  } catch (err) {
    console.error('Copy failed:', err);
    process.exit(1);
  }
}

main();
