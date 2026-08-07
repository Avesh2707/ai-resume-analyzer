/**
 * Shared types used across the client and server workspaces.
 *
 * Phase 1 only defines the Health Check contract.
 * Future phases (auth, resume upload, AI analysis, etc.) will extend this file.
 */

export interface HealthResponse {
  status: 'ok';
}
