import { BrowserWindow } from 'electron';
import path from 'node:path';

export function createMainWindow(): BrowserWindow {
  const isDev = process.env.NODE_ENV === 'development';
  const preloadPath = path.join(__dirname, '../preload/preload.js');

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 680,
    frame: false, // Custom frameless title bar for modern desktop UI
    title: 'BloodConnect — Blood Bank Management System',
    backgroundColor: '#090d16',
    show: false,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: isDev,
    },
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  return win;
}

