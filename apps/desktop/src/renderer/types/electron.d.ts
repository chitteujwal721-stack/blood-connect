import { BloodConnectBridgeAPI } from '@blood-connect/shared';

declare global {
  interface Window {
    bloodConnectAPI?: BloodConnectBridgeAPI;
  }
}

export {};

