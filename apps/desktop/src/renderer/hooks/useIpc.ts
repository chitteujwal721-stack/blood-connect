import { useState, useEffect, useCallback } from 'react';
import type {
  AppInfo,
  SystemDiagnostics,
  PingResponse,
} from '@blood-connect/shared';

export function useIpc() {
  const [isElectron, setIsElectron] = useState<boolean>(false);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [diagnostics, setDiagnostics] = useState<SystemDiagnostics | null>(null);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = window.bloodConnectAPI;
    if (api) {
      setIsElectron(true);
      // Fetch initial info
      api
        .getAppInfo()
        .then(setAppInfo)
        .catch((err) => setError(`Failed to fetch app info: ${err.message}`));

      api
        .getDiagnostics()
        .then(setDiagnostics)
        .catch((err) => setError(`Failed to fetch diagnostics: ${err.message}`));

      api
        .isWindowMaximized()
        .then(setIsMaximized)
        .catch(console.error);

      // Perform initial ping
      const start = performance.now();
      api
        .ping()
        .then(() => {
          setLatency(Math.round(performance.now() - start));
        })
        .catch((err) => setError(`Ping failed: ${err.message}`));
    }
  }, []);

  const refreshDiagnostics = useCallback(async () => {
    const api = window.bloodConnectAPI;
    if (!api) return;
    try {
      const data = await api.getDiagnostics();
      setDiagnostics(data);
      const start = performance.now();
      await api.ping();
      setLatency(Math.round(performance.now() - start));
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'IPC error');
    }
  }, []);

  const minimize = useCallback(async () => {
    await window.bloodConnectAPI?.minimizeWindow();
  }, []);

  const maximize = useCallback(async () => {
    const max = await window.bloodConnectAPI?.maximizeWindow();
    if (typeof max === 'boolean') {
      setIsMaximized(max);
    }
  }, []);

  const close = useCallback(async () => {
    await window.bloodConnectAPI?.closeWindow();
  }, []);

  return {
    isElectron,
    appInfo,
    diagnostics,
    isMaximized,
    latency,
    error,
    refreshDiagnostics,
    minimize,
    maximize,
    close,
  };
}

