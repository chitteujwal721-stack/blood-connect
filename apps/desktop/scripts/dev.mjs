import { createServer } from 'vite';
import { build } from 'esbuild';
import { spawn } from 'node:child_process';
import path from 'node:path';
import electronPath from 'electron';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function compileMainAndPreload() {
  await build({
    entryPoints: [path.join(root, 'src/main/main.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: path.join(root, 'dist/main/main.js'),
    external: ['electron'],
    sourcemap: true,
  });

  await build({
    entryPoints: [path.join(root, 'src/preload/preload.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: path.join(root, 'dist/preload/preload.js'),
    external: ['electron'],
    sourcemap: true,
  });
}

async function start() {
  console.log('[BloodConnect Dev] Compiling Main and Preload bundles...');
  await compileMainAndPreload();

  console.log('[BloodConnect Dev] Starting Vite dev server...');
  const server = await createServer({
    root,
    server: { port: 5173 },
  });
  await server.listen();
  const address = server.httpServer?.address();
  const port = typeof address === 'object' && address ? address.port : 5173;
  const devUrl = `http://localhost:${port}`;
  console.log(`[BloodConnect Dev] Vite renderer ready at ${devUrl}`);

  console.log('[BloodConnect Dev] Spawning Electron runtime...');
  const electronProcess = spawn(electronPath, ['.'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      VITE_DEV_SERVER_URL: devUrl,
    },
  });

  electronProcess.on('close', async (code) => {
    console.log(`[BloodConnect Dev] Electron terminated (code: ${code})`);
    await server.close();
    process.exit(code ?? 0);
  });
}

start().catch((err) => {
  console.error('[BloodConnect Dev] Failed to start desktop environment:', err);
  process.exit(1);
});

