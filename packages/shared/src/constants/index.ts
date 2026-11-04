/**
 * Application constants
 */

export const APP_METADATA = {
  NAME: 'BloodConnect',
  ORGANIZATION: 'BloodConnect Commercial Systems',
  DESCRIPTION: 'Commercial Windows Desktop Application for Blood Bank Operations',
  VERSION: '0.1.0',
  RELEASE_STAGE: 'Phase 1 - Desktop Foundation',
} as const;

export const SECURITY_POLICIES = {
  STRICT_CONTEXT_ISOLATION: true,
  NODE_INTEGRATION_RENDERER: false,
  CSP_POLICY: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws://localhost:* http://localhost:*;",
} as const;

