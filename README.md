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

You can install these dependencies using npm or yarn (note: Current, we dont support react-native-reanimated v3 and styled-components 6.\*):

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
import {BaseProvider, Button, CodeInput} from 'rn-base-component'

export default function App() {
  return (
    <BaseProvider>
      <Button onPress={() => console.log('Pressed!')}>Click Me</Button>

      <CodeInput length={6} onSubmit={code => console.log('Code:', code)} autoFocus />
    </BaseProvider>
  )
}
```

## Components

🔗 **[📚 Complete Component Documentation](src/components/README.md)** - Comprehensive guide to all components with examples, API references, and best practices.

### Input Components

#### CodeInput

A highly customizable and accessible code input component for OTP, PIN, and verification codes.

**Features:**

- 🎯 Flexible length (1-20 digits) • 🔒 Secure text entry mode • 🎨 Extensive styling options
- ♿ Full accessibility support • 🎮 Controlled/uncontrolled modes • 📱 Mobile-optimized keyboard handling

```tsx
<CodeInput length={6} onSubmit={code => verifyOTP(code)} placeholderAsDot secureTextEntry autoFocus />
```

[📖 **CodeInput Documentation**](src/components/CodeInput/README.md)

#### TextInput

Enhanced text input with multiple variants, validation, and icon support.

```tsx
<TextInput.Outlined label="Email" placeholder="Enter email" errorText={error} />
```

[📖 **TextInput Documentation**](src/components/TextInput/README.md)

#### Checkbox

Animated checkbox component with custom styling and label support.

```tsx
<Checkbox label="Accept terms" onChange={setAccepted} />
```

[📖 **Checkbox Documentation**](src/components/Checkbox/README.md)

#### RadioButton

Radio button component for mutually exclusive selections.

```tsx
<RadioButton text="Option 1" value={selected === 'option1'} onPressButton={() => setSelected('option1')} />
```

[📖 **RadioButton Documentation**](src/components/RadioButton/README.md)

#### Slider

Interactive slider for value selection with single and range variants.

```tsx
<Slider minimumValue={0} maximumValue={100} onValueChange={setValue} />
<Slider.Range initialLowValue={20} initialHighValue={80} onValueChange={(low, high) => setRange({low, high})} />
```

[📖 **Slider Documentation**](src/components/Slider/README.md)

### UI Components

#### Button

Customizable button component with multiple variants and icon support.

```tsx
<Button onPress={handlePress}>Primary Button</Button>
<ButtonOutline onPress={handlePress}>Outline Button</ButtonOutline>
```

[📖 **Button Documentation**](src/components/Button/README.md)

#### Card

Flexible card container for content organization with optional touch interactions.

```tsx
<Card onPress={navigateToDetails}>
  <Text>Card content</Text>
</Card>
```

[📖 **Card Documentation**](src/components/Card/README.md)

#### Icon

Versatile icon component with touch interactions and customizable styling.

```tsx
<Icon source={require('./icon.png')} size={24} onPress={handlePress} />
```

[📖 **Icon Documentation**](src/components/Icon/README.md)

### Layout Components

#### Accordion

Collapsible content sections with smooth animations and custom rendering.

```tsx
<Accordion sections={faqSections} expandMultiple={false} />
```

[📖 **Accordion Documentation**](src/components/Accordion/README.md)

### Feedback Components

#### Progress

Progress indicators for loading states with determinate and indeterminate modes.

```tsx
<Progress value={65} filledTrackColor="#4CAF50" />
<Progress isIndeterminateProgress />
```

[📖 **Progress Documentation**](src/components/Progress/README.md)

### Typography Components

#### Text

Enhanced text component with theme integration and multiple variants.

```tsx
<Text color="#007AFF">Colored text</Text>
<TextBold>Bold text</TextBold>
```

[📖 **Text Documentation**](src/components/Text/README.md)

#### Typography

Consistent typography system with predefined variants.

```tsx
<Typography variant="h1">Large Heading</Typography>
<Typography variant="regular">Body text</Typography>
```

[📖 **Typography Documentation**](src/components/Typography/README.md)

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

### 📚 Component Documentation

🔗 **[Complete Components Guide](src/components/README.md)** - Comprehensive overview of all components

#### Individual Component Documentation

**Input Components:**

- [CodeInput](src/components/CodeInput/README.md) - OTP/PIN code input component
- [TextInput](src/components/TextInput/README.md) - Enhanced text input with variants
- [Checkbox](src/components/Checkbox/README.md) - Animated checkbox component
- [RadioButton](src/components/RadioButton/README.md) - Radio button for single selection
- [Slider](src/components/Slider/README.md) - Interactive value slider

**UI Components:**

- [Button](src/components/Button/README.md) - Customizable button with variants
- [Card](src/components/Card/README.md) - Flexible content container
- [Icon](src/components/Icon/README.md) - Versatile icon component

**Layout Components:**

- [Accordion](src/components/Accordion/README.md) - Collapsible content sections

**Feedback Components:**

- [Progress](src/components/Progress/README.md) - Progress indicators

**Typography Components:**

- [Text](src/components/Text/README.md) - Enhanced text component
- [Typography](src/components/Typography/README.md) - Typography system

### 🛠️ Development Guides

- [Jest Configuration](docs/jest-config.md) - Testing setup and configuration
- [Theme System](docs/theme.md) - Theming and customization guide
- [Component Text](docs/component-text.md) - Text component guidelines

## Theming

The library includes a comprehensive theming system:

```tsx
import {BaseProvider, extendTheme} from 'rn-base-component'

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
  return <BaseProvider theme={customTheme}>{/* Your app components */}</BaseProvider>
}
```

## TypeScript Support

All components are built with TypeScript and include comprehensive type definitions:

```tsx
import {CodeInputRef, CodeInputProps} from 'rn-base-component'

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
