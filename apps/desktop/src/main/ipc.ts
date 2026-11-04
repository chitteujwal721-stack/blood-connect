import { ipcMain, BrowserWindow, app } from 'electron';
import os from 'node:os';
import {
  IPC_CHANNELS,
  AppInfo,
  SystemDiagnostics,
  PingResponse,
} from '@blood-connect/shared';

/**
 * Register secure IPC handlers with main process
 */
export function registerIpcHandlers(mainWindow: BrowserWindow): void {
  // Window controls
  ipcMain.handle(IPC_CHANNELS.WINDOW_MINIMIZE, () => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW_MAXIMIZE, () => {
    if (!mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
        return false;
      } else {
        mainWindow.maximize();
        return true;
      }
    }
    return false;
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW_CLOSE, () => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.close();
    }
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW_IS_MAXIMIZED, () => {
    return !mainWindow.isDestroyed() && mainWindow.isMaximized();
  });

  // App information
  ipcMain.handle(IPC_CHANNELS.APP_GET_INFO, (): AppInfo => {
    return {
      name: app.getName() || 'BloodConnect',
      version: app.getVersion() || '0.1.0',
      electronVersion: process.versions.electron,
      chromeVersion: process.versions.chrome,
      nodeVersion: process.versions.node,
      platform: process.platform,
      arch: process.arch,
      isPackaged: app.isPackaged,
    };
  });

  // Health ping
  ipcMain.handle(IPC_CHANNELS.APP_PING, (): PingResponse => {
    return {
      timestamp: Date.now(),
      status: 'ok',
      latencyMs: 0,
    };
  });

  // System Diagnostics
  ipcMain.handle(IPC_CHANNELS.SYSTEM_GET_DIAGNOSTICS, (): SystemDiagnostics => {
    const totalMem = Math.round(os.totalmem() / (1024 * 1024));
    const freeMem = Math.round(os.freemem() / (1024 * 1024));
    const uptime = Math.round(process.uptime());
    const cpuUsage = process.cpuUsage();
    const cpuPercent = Math.min(
      100,
      Math.round(((cpuUsage.user + cpuUsage.system) / 1000000 / (uptime || 1)) * 10) / 10
    );

    return {
      secureIpc: true,
      contextIsolation: true,
      nodeIntegrationDisabled: true,
      sandboxEnabled: true,
      platform: `${os.type()} ${os.release()} (${os.arch()})`,
      arch: process.arch,
      totalMemoryMb: totalMem,
      freeMemoryMb: freeMem,
      uptimeSeconds: uptime,
      processCpuUsagePercent: cpuPercent,
    };
  });
}

