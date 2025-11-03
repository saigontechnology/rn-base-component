// example/metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the parent directory (the library source code)
config.watchFolders = [workspaceRoot];

// Add aliases to resolve to source code during development
config.resolver.alias = {
  'rn-base-component': path.resolve(workspaceRoot, 'src'),
};

// Node modules resolution order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Include source extensions for better resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

// Disable hierarchical lookup for better performance
config.resolver.disableHierarchicalLookup = true;

// For better Metro performance with monorepo
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;