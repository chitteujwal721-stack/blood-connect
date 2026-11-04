import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { createMainWindow } from './window';
import { registerIpcHandlers } from './ipc';
import { configureSecurity } from './security';

let mainWindow: BrowserWindow | null = null;

// Enforce single instance lock for desktop client integrity
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  console.warn('[BloodConnect Main] Another instance is already running. Quitting.');
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(async () => {
    mainWindow = createMainWindow();

    // Harden runtime security and Content-Security-Policy
    configureSecurity(mainWindow);

    // Register typed IPC bridge channels
    registerIpcHandlers(mainWindow);

    const devServerUrl = process.env.VITE_DEV_SERVER_URL;

    if (devServerUrl) {
      console.log(`[BloodConnect Main] Loading development server: ${devServerUrl}`);
      await mainWindow.loadURL(devServerUrl);
      // Open DevTools in dev mode
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
      const indexPath = path.join(__dirname, '../renderer/index.html');
      console.log(`[BloodConnect Main] Loading production bundle: ${indexPath}`);
      await mainWindow.loadFile(indexPath);
    }

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createMainWindow();
        configureSecurity(mainWindow);
        registerIpcHandlers(mainWindow);
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

