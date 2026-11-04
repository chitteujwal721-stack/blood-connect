# BloodConnect — Commercial Blood Bank Management System

![Release Stage](https://img.shields.io/badge/Release_Stage-Phase_1:_Desktop_Foundation-crimson)
![Electron](https://img.shields.io/badge/Electron-33.x-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Platform](https://img.shields.io/badge/Platform-Windows_x64-0078d4)

BloodConnect is a high-reliability commercial Windows desktop application designed for blood banks, donor registries, and hospital transfusion centers.

---

## Phase 1: Desktop Foundation

Phase 1 establishes the verified desktop workstation foundation, Electron runtime configuration, secure IPC channels, clinical layout, and reusable UI components.

### Highlights

- **npm Workspaces Monorepo**: Clean modular architecture separating `@blood-connect/desktop`, `@blood-connect/api`, `@blood-connect/shared`, and `@blood-connect/config`.
- **Electron Security Hardening**: Strict Context Isolation (`contextIsolation: true`), Disabled Node Integration in Renderer (`nodeIntegration: false`), Sandboxed Preload scripts, and comprehensive Content Security Policy (CSP).
- **Secure Typed IPC Bridge**: Strict whitelisted communication channels between Electron Main and Renderer under `window.bloodConnectAPI`.
- **Clinical Desktop Layout**: Custom Windows frameless title bar with window controls, responsive sidebar navigation, operational header with live clock, and telemetry status bar.
- **10 Core Workstation Modules**:
  1. **Dashboard**: Operational telemetry, emergency requisition triage, and readiness monitors.
  2. **Donors**: Donor registry shell with blood group filters (`A+`, `B+`, etc.) and search.
  3. **Import Donors**: Batch CSV / Excel ingestion specification and validation dropzone.
  4. **Blood Requests**: Hospital requisition triage queue with urgency indicators.
  5. **Donor Matching**: Haematological ABO & Rh compatibility calculation matrix.
  6. **Communication History**: Outbound notification dispatch log shell.
  7. **Donation History**: Phlebotomy session log and unit serialization shell.
  8. **Reports**: Clinical stock audit, expiry tracking, and regulatory export suites.
  9. **Staff Management**: Role-based access control (RBAC) definitions and operator directory.
  10. **Settings**: Real-time Electron runtime telemetry, memory usage, CPU load, and IPC latency diagnostics.
- **Robust Component States**: Standardized Loading, Empty, and Error states across all modules with a live state switcher.
- **Electron Builder NSIS Packaging**: Pre-configured Windows installer distribution.

---

## Monorepo Layout

```text
blood-connect/
├── apps/
│   ├── desktop/               # Electron + React + Vite + Tailwind desktop application
│   └── api/                   # NestJS Central Backend (Scheduled for Phase 2)
├── packages/
│   ├── shared/                # Shared types, blood contracts, navigation, IPC channels
│   └── config/                # Shared tsconfig compiler presets
├── docs/                      # Architecture, Security, and Developer documentation
├── scripts/                   # Workspace helper scripts
├── package.json               # Root workspaces configuration
├── package-lock.json
├── .gitignore
├── .env.example
└── README.md
```

---

## Architecture Restrictions & Verification

Phase 1 strictly follows the non-negotiable architecture decisions:

- **No SQLite**: Local database drivers are excluded.
- **No local donor database**: Zero client-side storage of donor data.
- **No offline functionality**: Offline synchronizer engines are omitted.
- **No synchronization engine**: Synchronization logic will be driven centrally in Phase 2.
- **No SMS integration**: SMS gateways and telephony integrations are deferred.
- **No fake authentication**: No mock login credentials or simulated user databases.
- **No fake donor management**: Views display authentic empty and readiness states awaiting API link.
- **No secrets in frontend**: All credentials and sensitive keys are excluded from renderer code.

---

## Quickstart

### Prerequisites

- **Node.js**: `v20.x` or higher (verified on Node `v24.x`)
- **npm**: `v10.x` or higher
- **OS**: Windows 10/11 x64

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Development Mode

```bash
npm run dev
```

### 3. TypeScript Type Validation

```bash
npm run typecheck
```

### 4. Production Build

```bash
npm run build
```

### 5. Package Windows NSIS Installer

```bash
npm run package:win
```

---

## Security Verification Checklist

- [x] Context Isolation enabled (`contextIsolation: true`)
- [x] Node Integration disabled in Renderer (`nodeIntegration: false`)
- [x] Sandboxed preload execution (`sandbox: true`)
- [x] Preload exposes only explicit methods via `contextBridge`
- [x] Content Security Policy (CSP) headers enforced in session & HTML
- [x] Blocked unauthorized URL navigations (`will-navigate`)
- [x] Blocked popups and child windows (`setWindowOpenHandler` denies all)
- [x] Webview attachment blocked
- [x] Hardware permission requests denied
- [x] Single instance lock enforced (`requestSingleInstanceLock`)

---

## Next Steps: Phase 2

Phase 2 will implement the Central Backend API (`apps/api`) using **NestJS**, PostgreSQL database models, JWT authentication, and bi-directional synchronization with the desktop client.
