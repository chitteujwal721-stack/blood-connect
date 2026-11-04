# BloodConnect Desktop Security Specification

This document details the security posture and hardening configurations implemented for the BloodConnect commercial desktop client.

## Core Electron Security Checkpoints

### 1. Context Isolation
- **Setting:** `contextIsolation: true`
- **Location:** `apps/desktop/src/main/window.ts`
- **Effect:** Completely separates Electron internal APIs and preload scripts from the website/renderer context. Prototypes cannot be modified by malicious renderer scripts.

### 2. Node Integration Disabled
- **Setting:** `nodeIntegration: false`, `nodeIntegrationInWorker: false`, `nodeIntegrationInSubFrames: false`
- **Location:** `apps/desktop/src/main/window.ts`
- **Effect:** Prevents renderer code from accessing Node's `require()`, `process`, or file system modules.

### 3. Preload Bridge Sandboxing
- **Setting:** `sandbox: true`
- **Location:** `apps/desktop/src/main/window.ts` and `apps/desktop/src/preload/preload.ts`
- **Effect:** The preload script runs in an isolated sandbox. Only explicit, whitelisted methods are exposed to `window.bloodConnectAPI` via `contextBridge.exposeInMainWorld()`. The raw `ipcRenderer` is never passed to renderer code.

### 4. Content Security Policy (CSP)
- **HTML Meta Tag:** Defined in `apps/desktop/index.html`.
- **Session Header Interception:** Enforced in `apps/desktop/src/main/security.ts` via `session.defaultSession.webRequest.onHeadersReceived`.
- **Production Policy:**
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';
  ```
- **Security Headers:** Injected on every response:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 5. Navigation & Window Lockdown
- **External Navigation Block:** `mainWindow.webContents.on('will-navigate', ...)` rejects any URL outside the local app bundle or dev server.
- **Window Open Block:** `mainWindow.webContents.setWindowOpenHandler(...)` returns `{ action: 'deny' }` for all popup requests.
- **Webview Block:** `mainWindow.webContents.on('will-attach-webview', ...)` blocks embedded webviews.
- **Permission Requests Denied:** `session.defaultSession.setPermissionRequestHandler(...)` rejects all client hardware requests (camera, microphone, geolocation, screen capture).

### 6. Single Instance Lock
- **Implementation:** `app.requestSingleInstanceLock()` ensures only one instance of the blood bank workstation runs at any time, focusing existing windows if a second attempt is launched.

