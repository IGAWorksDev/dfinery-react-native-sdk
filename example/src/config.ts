// Dfinery SDK Configuration
// 
// Option 1: Create config.local.ts with your actual credentials (git-ignored)
// Option 2: Edit this file directly for testing (not recommended for commits)
//
// config.local.ts example:
// export const DfineryConfig = {
//   serviceId: 'your_actual_service_id',
// };

// Try to import local config, fallback to placeholder values
let config = {
  serviceId: 'YOUR_SERVICE_ID',
};

try {
  // @ts-ignore - config.local.ts may not exist
  const localConfig = require('./config.local');
  if (localConfig?.DfineryConfig) {
    config = localConfig.DfineryConfig;
  }
} catch (e) {
  // config.local.ts not found, using placeholder values
  console.warn('[Dfinery] config.local.ts not found. Using placeholder values.');
  console.warn('[Dfinery] Create src/config.local.ts with your actual credentials.');
}

export const DfineryConfig = config;
