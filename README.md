# rn-base-component

A comprehensive React Native component library with modern, customizable, and accessible components.

## Features

- 🎯 **Modern Components** - Built with the latest React Native patterns
- 🎨 **Highly Customizable** - Extensive theming and styling options
- ♿ **Accessible** - Full accessibility support with screen readers
- 🎮 **TypeScript Ready** - Complete type safety and IntelliSense
- 📱 **Mobile Optimized** - Optimized for both iOS and Android
- 🎪 **Storybook Integration** - Interactive component playground

## Installation

Before you install `rn-base-component`, make sure you have the following prerequisites installed:

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [styled-components](https://styled-components.com/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)

You can install these dependencies using npm or yarn (note: Current, we dont support react-native-reanimated v3 and styled-components 6.*):

```sh
npm install react-native-reanimated styled-components react-native-gesture-handler
```

Or

```sh
yarn add react-native-reanimated styled-components react-native-gesture-handler
```

Then

```sh
npm install rn-base-component
```

## Quick Start

```tsx
import React from 'react'
import { BaseProvider, Button, CodeInput } from 'rn-base-component'

export default function App() {
  return (
    <BaseProvider>
      <Button onPress={() => console.log('Pressed!')}>
        Click Me
      </Button>
      
      <CodeInput
        length={6}
        onSubmit={(code) => console.log('Code:', code)}
        autoFocus
      />
    </BaseProvider>
  )
}
```

## Components

### Input Components

#### CodeInput
A highly customizable and accessible code input component for OTP, PIN, and verification codes.

**Features:**
- 🎯 Flexible length (1-20 digits)
- 🔒 Secure text entry mode
- 🎨 Extensive styling options
- ♿ Full accessibility support
- 🎮 Controlled/uncontrolled modes
- 📱 Mobile-optimized keyboard handling

**Quick Example:**
```tsx
<CodeInput
  length={6}
  onSubmit={(code) => verifyOTP(code)}
  placeholderAsDot
  secureTextEntry
  autoFocus
/>
```

[📖 **Full CodeInput Documentation**](src/components/CodeInput/README.md)

### Form Components

#### Button
Customizable button component with multiple variants.

#### TextInput
Enhanced text input with validation and styling options.

#### Checkbox
Accessible checkbox component with custom styling.

#### RadioButton
Radio button component with group support.

### Layout Components

#### Card
Flexible card component for content organization.

#### Accordion
Collapsible content sections with smooth animations.

### Feedback Components

#### Progress
Progress indicators for loading states.

#### Slider
Interactive slider components for value selection.

### Display Components

#### Text
Enhanced text component with typography support.

#### Typography
Consistent typography system.

#### Icon
Icon component with customizable styles.

## Development

### Preview/Debug Components

```sh
yarn bootstrap
yarn example ios/android
```

### Update Storybook (Debug purpose only)

To update Storybook after running it on the Simulator and adding new components or updating existing ones, run the following command.

```sh
yarn example update-stories
```

## Documentation

### Component Documentation
- [CodeInput](src/components/CodeInput/README.md) - Code input component for OTP/PIN entry

### Development Guides
- [Jest Configuration](docs/jest-config.md) - Testing setup and configuration
- [Theme System](docs/theme.md) - Theming and customization guide
- [Component Text](docs/component-text.md) - Text component guidelines

## Theming

The library includes a comprehensive theming system:

```tsx
import { BaseProvider, extendTheme } from 'rn-base-component'

const customTheme = extendTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
})

export default function App() {
  return (
    <BaseProvider theme={customTheme}>
      {/* Your app components */}
    </BaseProvider>
  )
}
```

## TypeScript Support

All components are built with TypeScript and include comprehensive type definitions:

```tsx
import { CodeInputRef, CodeInputProps } from 'rn-base-component'

const codeInputRef = useRef<CodeInputRef>(null)

const handleSubmit = (code: string) => {
  // Full type safety
  codeInputRef.current?.clear()
}
```

## Accessibility

All components follow accessibility best practices:

- **Screen reader support** with proper labels
- **Keyboard navigation** where applicable
- **Focus management** with clear indicators
- **ARIA attributes** for complex components
- **High contrast** support

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
