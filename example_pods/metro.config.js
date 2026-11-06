const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root],
  
  resolver: {
    // Make Metro look for modules in both the example's node_modules and the root node_modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
    
    // Include the root directory for module resolution
    platforms: ['ios', 'android', 'native', 'web'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
