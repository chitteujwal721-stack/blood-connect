import { session, BrowserWindow } from 'electron';

/**
 * Configure Content Security Policy and Electron runtime security hardening
 */
export function configureSecurity(mainWindow: BrowserWindow): void {
  const isDev = process.env.NODE_ENV === 'development' || !mainWindow.webContents.session;

  // Intercept response headers to enforce strict Content-Security-Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ws://localhost:* http://localhost:* ws://127.0.0.1:* http://127.0.0.1:*;"
      : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';";

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
        'X-Content-Type-Options': ['nosniff'],
        'X-Frame-Options': ['DENY'],
        'Referrer-Policy': ['strict-origin-when-cross-origin'],
      },
    });
  });

  // Deny all permission requests (camera, microphone, geolocation, notifications, etc.)
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });

  // Prevent navigation to unverified external domains
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const parsedUrl = new URL(url);
    const isLocalhost = parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1';
    const isFile = parsedUrl.protocol === 'file:';

    if (!isLocalhost && !isFile) {
      console.warn(`[Security] Blocked unauthorized navigation attempt to: ${url}`);
      event.preventDefault();
    }
  });

  // Block creation of unexpected new windows / popups
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.warn(`[Security] Blocked window.open attempt to: ${url}`);
    return { action: 'deny' };
  });

  // Disable webview creation
  mainWindow.webContents.on('will-attach-webview', (event) => {
    console.warn('[Security] Webview attachment blocked');
    event.preventDefault();
  });
}

