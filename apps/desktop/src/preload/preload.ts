import { contextBridge, ipcRenderer } from 'electron';
import {
  IPC_CHANNELS,
  BloodConnectBridgeAPI,
  AppInfo,
  SystemDiagnostics,
  PingResponse,
} from '@blood-connect/shared';

/**
 * Secure Preload Script
 * Exposes strictly typed, sandboxed bridge methods to the renderer process.
 * Node integration is disabled; direct ipcRenderer is never exposed.
 */
const api: BloodConnectBridgeAPI = {
  // Window control methods
  minimizeWindow: (): Promise<void> => {
    return ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MINIMIZE);
  },
  maximizeWindow: (): Promise<boolean> => {
    return ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MAXIMIZE);
  },
  closeWindow: (): Promise<void> => {
    return ipcRenderer.invoke(IPC_CHANNELS.WINDOW_CLOSE);
  },
  isWindowMaximized: (): Promise<boolean> => {
    return ipcRenderer.invoke(IPC_CHANNELS.WINDOW_IS_MAXIMIZED);
  },

  // System & Application metadata
  getAppInfo: (): Promise<AppInfo> => {
    return ipcRenderer.invoke(IPC_CHANNELS.APP_GET_INFO);
  },
  getDiagnostics: (): Promise<SystemDiagnostics> => {
    return ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_GET_DIAGNOSTICS);
  },
  ping: (): Promise<PingResponse> => {
    return ipcRenderer.invoke(IPC_CHANNELS.APP_PING);
  },
};

// Expose safe API to the renderer under window.bloodConnectAPI
contextBridge.exposeInMainWorld('bloodConnectAPI', api);

