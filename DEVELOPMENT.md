# Development Setup

This document explains how to set up the development environment for hot reloading between the library source code and the example app.

## Problem Solved

Previously, when making changes to components in `src/components/`, the example app wouldn't reflect changes immediately. You had to:

1. Remove `node_modules` in the example directory
2. Run `yarn install` again
3. Wait for the rebuild process

This was time-consuming and disrupted the development flow.

## Solution

The development setup now directly resolves to the source code in `src/` instead of the built version in `lib/`, enabling hot reloading.

## Configuration Changes

### 1. Metro Configuration (`example/metro.config.js`)

```javascript
// Add aliases to resolve to source code during development
config.resolver.alias = {
  'rn-base-component': path.resolve(workspaceRoot, 'src'),
}

// Watch the parent directory (the library source code)
config.watchFolders = [workspaceRoot]
```

This tells Metro to:

- Resolve `rn-base-component` imports to `../src` instead of the built package
- Watch the entire workspace for changes

### 2. TypeScript Configuration (`example/tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "rn-base-component": ["../src"],
      "rn-base-component/*": ["../src/*"]
    }
  },
  "include": ["../src/**/*.ts", "../src/**/*.tsx"]
}
```

This ensures TypeScript:

- Resolves types correctly from the source
- Includes the source files in type checking

## How It Works

1. **Import Resolution**: When the example app imports `from 'rn-base-component'`, Metro resolves it to `../src/index.tsx` instead of the built package.

2. **Hot Reloading**: Since Metro watches the source directory, any changes to components in `src/components/` trigger a hot reload in the example app.

3. **Type Safety**: TypeScript can now provide accurate IntelliSense and type checking based on the actual source code.

## Development Workflow

1. **Start the example app**:

   ```bash
   cd example
   npx expo start --clear
   ```

2. **Make changes to components** in `src/components/`:

   - Edit any component file
   - Save the file
   - The example app will hot reload automatically

3. **No more manual rebuilds** required during development!

## File Structure

```
rn-base-component/
├── src/                          # Source code (development)
│   ├── components/
│   │   ├── CountDown/
│   │   ├── Button/
│   │   └── ...
│   └── index.tsx
├── lib/                          # Built code (production)
│   ├── commonjs/
│   ├── module/
│   └── typescript/
└── example/                      # Example app
    ├── metro.config.js           # Configured for source resolution
    ├── tsconfig.json             # Configured for source types
    └── app/
        └── index.tsx             # Uses components from source
```

## Dependencies

Make sure all dependencies used by the source code are also available in the example app. For instance, if components use `dayjs`, add it to the example app:

```bash
cd example
yarn add dayjs
```

## Troubleshooting

### Metro Cache Issues

If you encounter import issues, clear the Metro cache:

```bash
cd example
npx expo start --clear
```

### TypeScript Errors

If TypeScript can't find types, restart the TypeScript server in your IDE or run:

```bash
yarn typecheck
```

### Module Resolution Issues

Ensure the alias in `metro.config.js` points to the correct path:

```javascript
'rn-base-component': path.resolve(workspaceRoot, 'src')
```

## Production Build

When building for production, the library still uses the built version in `lib/`. The development setup only affects the example app during development.

To build the library:

```bash
yarn prepack  # Builds to lib/
```

The published package will use the built version, not the source code.
