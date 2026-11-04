/**
 * Secure IPC channels and contract types between Electron Main and Renderer
 */

export const IPC_CHANNELS = {
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_CLOSE: 'window:close',
  WINDOW_IS_MAXIMIZED: 'window:isMaximized',
  APP_GET_INFO: 'app:getInfo',
  APP_PING: 'app:ping',
  SYSTEM_GET_DIAGNOSTICS: 'system:getDiagnostics',
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export interface AppInfo {
  name: string;
  version: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  isPackaged: boolean;
}

export interface SystemDiagnostics {
  secureIpc: boolean;
  contextIsolation: boolean;
  nodeIntegrationDisabled: boolean;
  sandboxEnabled: boolean;
  platform: string;
  arch: string;
  totalMemoryMb: number;
  freeMemoryMb: number;
  uptimeSeconds: number;
  processCpuUsagePercent: number;
}

export interface PingResponse {
  timestamp: number;
  status: 'ok';
  latencyMs?: number;
}

/**
 * Strongly typed interface exposed on `window.bloodConnectAPI`
 */
export interface BloodConnectBridgeAPI {
  // Window controls
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<boolean>;
  closeWindow: () => Promise<void>;
  isWindowMaximized: () => Promise<boolean>;

  // System & Application metadata
  getAppInfo: () => Promise<AppInfo>;
  getDiagnostics: () => Promise<SystemDiagnostics>;
  ping: () => Promise<PingResponse>;
}

