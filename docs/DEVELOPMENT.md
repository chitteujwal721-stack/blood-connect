# BloodConnect Developer Guide

## Prerequisites

- **Node.js**: `v20.x` or higher (verified on Node `v24.x`)
- **npm**: `v10.x` or higher
- **Operating System**: Windows 10/11 x64 (for native desktop build & NSIS installer)

## Workspace Setup

Clone the repository and install all workspace dependencies from root:

```bash
npm install
```

## Running in Development

To start the Vite development server and spawn the Electron desktop client:

```bash
npm run dev
# or explicitly:
npm run dev --workspace=@blood-connect/desktop
```

This command executes `apps/desktop/scripts/dev.mjs`, which:
1. Compiles `src/main/main.ts` to `dist/main/main.js` using `esbuild`.
2. Compiles `src/preload/preload.ts` to `dist/preload/preload.js` using `esbuild`.
3. Starts the Vite development server on port `5173`.
4. Launches Electron pointed to the local Vite instance with Hot Module Replacement (HMR) active.

## Running Typechecks

Run TypeScript type validation across all monorepo packages:

```bash
npm run typecheck
```

## Production Desktop Build

To compile production bundles for main, preload, and renderer processes:

```bash
npm run build
# or explicitly:
npm run build --workspace=@blood-connect/desktop
```

Build outputs are saved to `apps/desktop/dist/`:
- `apps/desktop/dist/main/main.js`
- `apps/desktop/dist/preload/preload.js`
- `apps/desktop/dist/renderer/` (optimized static assets)

## Packaging Windows NSIS Installer

To package the Windows desktop application into an NSIS setup installer:

```bash
npm run package:win
# or explicitly:
npm run package:win --workspace=@blood-connect/desktop
```

Installer output is written to:
- `dist-installer/BloodConnect Setup 0.1.0.exe`

