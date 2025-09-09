# React Native Base Components

A comprehensive collection of reusable, customizable, and accessible React Native components built with modern best practices and seamless theme integration.

## 🚀 Quick Start

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

```tsx
import React from 'react'
import {Button, Card, TextInput} from 'rn-base-component'

export default function App() {
  return (
    <Card>
      <TextInput.Outlined label="Email" placeholder="Enter your email" />
      <Button onPress={() => console.log('Pressed!')}>Submit</Button>
    </Card>
  )
}
```

## 📋 Components Overview

| Component                                  | Description                                | Key Features                                                                         |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| [**Button**](./Button/README.md)           | Customizable button with multiple variants | Primary, Secondary, Outline, Transparent variants • Icon support • Theme integration |
| [**Card**](./Card/README.md)               | Flexible container for content             | Touch interactions • Consistent styling • Accessibility ready                        |
| [**Checkbox**](./Checkbox/README.md)       | Animated checkbox with label support       | Custom animations • Label integration • Form validation ready                        |
| [**Icon**](./Icon/README.md)               | Versatile icon component                   | Touch interactions • Hit area optimization • Image source flexibility                |
| [**Progress**](./Progress/README.md)       | Animated progress indicator                | Determinate & indeterminate modes • Smooth animations • Customizable styling         |
| [**RadioButton**](./RadioButton/README.md) | Single selection radio button              | Smooth animations • Custom styling • Form integration                                |
| [**Slider**](./Slider/README.md)           | Interactive value selector                 | Single/Range variants • Track points • Gesture handling                              |
| [**Text**](./Text/README.md)               | Styled text component                      | Multiple variants • Theme integration • Custom fonts                                 |
| [**TextInput**](./TextInput/README.md)     | Advanced input component                   | Multiple variants • Validation • Icon support                                        |
| [**Typography**](./Typography/README.md)   | Typography system                          | Predefined variants • Consistent scaling • Accessibility                             |
| [**Accordion**](./Accordion/README.md)     | Collapsible content sections               | Custom animations • Multiple expansion • Flexible rendering                          |
| [**CodeInput**](./CodeInput/README.md)     | OTP/PIN input component                    | Customizable length • Secure input • Accessibility ready                             |

## 🎨 Design System

### Theme Integration

All components integrate seamlessly with a centralized theme system:

```tsx
import {BaseProvider} from 'rn-base-component'

const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    cardBackground: '#FFFFFF',
    textColor: '#333333',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: 8,
}

export default function App() {
  return <BaseProvider theme={theme}>{/* Your app components */}</BaseProvider>
}
```

### Typography Scale

```tsx
import {Typography} from 'rn-base-component'

<Typography variant="h1">Large Heading</Typography>      // 28px, weight: 700
<Typography variant="h2">Medium Heading</Typography>     // 24px, weight: 700
<Typography variant="regular">Body Text</Typography>     // 16px, weight: 400
<Typography variant="bold">Bold Text</Typography>        // 16px, weight: bold
```

### Color Palette

```tsx
// Semantic colors
primary: '#007AFF' // Primary actions and highlights
secondary: '#5856D6' // Secondary actions
success: '#34C759' // Success states
warning: '#FF9500' // Warning states
error: '#FF3B30' // Error states
gray: '#8E8E93' // Subtle text and borders
```

## 🏗️ Component Categories

### Form Components

Perfect for building forms with validation and user input:

- **TextInput** - Text input with variants (Default, Outlined, Flat)
- **Checkbox** - Single or multiple selection checkboxes
- **RadioButton** - Mutually exclusive option selection
- **Slider** - Value selection with single or range modes
- **CodeInput** - OTP, PIN, and verification code input

```tsx
// Form example
<View style={styles.form}>
  <TextInput.Outlined label="Full Name" isRequire placeholder="Enter your name" />

  <RadioButton text="Subscribe to newsletter" onPressButton={checked => setSubscribed(checked)} />

  <Slider minimumValue={0} maximumValue={100} onValueChange={setValue} />

  <Button onPress={handleSubmit}>Submit</Button>
</View>
```

### Layout Components

Building blocks for structuring your app layout:

- **Card** - Content containers with optional interactions
- **Accordion** - Collapsible content sections

```tsx
// Layout example
<ScrollView>
  <Card onPress={navigateToDetails}>
    <Typography variant="h2">Card Title</Typography>
    <Text>Card content goes here...</Text>
  </Card>

  <Accordion sections={faqSections} expandMultiple={false} />
</ScrollView>
```

### Interactive Components

Components that respond to user interactions:

- **Button** - Primary interaction component
- **Icon** - Interactive icons with touch support
- **Progress** - Visual feedback for operations

```tsx
// Interactive example
<View style={styles.toolbar}>
  <Icon source={require('./icons/menu.png')} onPress={openMenu} />

  <Progress value={uploadProgress} filledTrackColor="#4CAF50" />

  <Button variant="primary" onPress={handleAction}>
    Action
  </Button>
</View>
```

### Typography Components

For consistent text rendering across your app:

- **Text** - Basic styled text component
- **Typography** - Predefined text hierarchy

```tsx
// Typography example
<View>
  <Typography variant="h1">Page Title</Typography>
  <Typography variant="h2">Section Title</Typography>
  <Text color="#666">Supporting text</Text>
  <TextBold>Important information</TextBold>
</View>
```

## 🎯 Common Patterns

### Form Validation

```tsx
import React, {useState} from 'react'
import {TextInput, Button, Checkbox} from 'rn-base-component'

function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!form.email.includes('@')) {
      newErrors.email = 'Invalid email address'
    }

    if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!form.terms) {
      newErrors.terms = 'You must accept the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      // Submit form
    }
  }

  return (
    <View>
      <TextInput.Outlined
        label="Email"
        value={form.email}
        onChangeText={email => setForm({...form, email})}
        errorText={errors.email}
        keyboardType="email-address"
      />

      <TextInput.Outlined
        label="Password"
        value={form.password}
        onChangeText={password => setForm({...form, password})}
        errorText={errors.password}
        secureTextEntry
      />

      <Checkbox
        label="I accept the terms and conditions"
        isChecked={form.terms}
        onChange={terms => setForm({...form, terms})}
      />

      <Button onPress={handleSubmit}>Sign Up</Button>
    </View>
  )
}
```

### Settings Screen

```tsx
function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    volume: 75,
  })

  const settingsSections = [
    {
      title: 'Notifications',
      content: 'Manage your notification preferences',
    },
    {
      title: 'Privacy',
      content: 'Control your privacy settings',
    },
    {
      title: 'About',
      content: 'App version and information',
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.settingsCard}>
        <Typography variant="h2">Quick Settings</Typography>

        <Checkbox
          label="Enable notifications"
          isChecked={settings.notifications}
          onChange={notifications => setSettings({...settings, notifications})}
        />

        <RadioButton
          text="Dark mode"
          value={settings.darkMode}
          onPressButton={darkMode => setSettings({...settings, darkMode})}
        />

        <View style={styles.sliderContainer}>
          <Text>Volume</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            onValueChange={volume => setSettings({...settings, volume})}
          />
        </View>
      </Card>

      <Accordion sections={settingsSections} style={styles.accordion} />
    </ScrollView>
  )
}
```

### Dashboard Layout

```tsx
function Dashboard() {
  const [progress, setProgress] = useState(65)

  const stats = [
    {title: 'Total Users', value: '1,234', color: '#007AFF'},
    {title: 'Revenue', value: '$45.6K', color: '#34C759'},
    {title: 'Orders', value: '892', color: '#FF9500'},
    {title: 'Growth', value: '+12%', color: '#FF6B6B'},
  ]

  return (
    <ScrollView style={styles.dashboard}>
      <View style={styles.header}>
        <Typography variant="h1">Dashboard</Typography>
        <Icon source={require('./icons/settings.png')} onPress={openSettings} />
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Typography variant="h2" color={stat.color}>
              {stat.value}
            </Typography>
            <Text color="#666">{stat.title}</Text>
          </Card>
        ))}
      </View>

      <Card style={styles.progressCard}>
        <Typography variant="h2">Project Progress</Typography>
        <Progress value={progress} filledTrackColor="#007AFF" style={styles.progress} />
        <Text>{progress}% Complete</Text>
      </Card>
    </ScrollView>
  )
}
```

## ♿ Accessibility

All components are built with accessibility in mind:

### Screen Reader Support

- Proper accessibility labels and hints
- Semantic roles and states
- Announcements for state changes

### Keyboard Navigation

- Focus management
- Proper tab order
- Keyboard shortcuts where applicable

### Visual Accessibility

- Sufficient color contrast ratios
- Scalable text support
- Clear focus indicators

```tsx
// Accessibility example
<Button
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the registration form"
  accessibilityRole="button"
  onPress={handleSubmit}>
  Submit
</Button>
```

## 🎨 Theming

### Custom Theme Creation

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  colors: {
    primary: '#6366F1',
    secondary: '#EC4899',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      accent: '#6366F1',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    h1: {fontSize: 32, fontWeight: '700'},
    h2: {fontSize: 24, fontWeight: '600'},
    body: {fontSize: 16, fontWeight: '400'},
    caption: {fontSize: 12, fontWeight: '400'},
  },
})
```

### Dark Mode Support

```tsx
const lightTheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
  },
}

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#1C1C1E',
    text: '#FFFFFF',
  },
}

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <BaseProvider theme={isDark ? darkTheme : lightTheme}>
      <YourApp />
    </BaseProvider>
  )
}
```

## 📱 Platform Considerations

### iOS Specific

- Native shadow support
- SF Symbols integration
- Safe area handling

### Android Specific

- Material Design guidelines
- Elevation and shadows
- Hardware back button support

```tsx
// Platform-specific styling
import {Platform} from 'react-native'

const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
})
```

## 🚀 Performance

### Optimization Tips

1. **Use React.memo** for components that don't change frequently
2. **Lazy loading** for complex components
3. **Image optimization** for icons and assets
4. **Gesture handling** optimization for interactive components

```tsx
// Performance example
const OptimizedCard = React.memo(({data, onPress}) => (
  <Card onPress={onPress}>
    <Text>{data.title}</Text>
  </Card>
))

// Lazy loading
const LazyAccordion = React.lazy(() => import('./Accordion'))
```

## 🧪 Testing

### Component Testing

```tsx
import {render, fireEvent} from '@testing-library/react-native'
import {Button} from 'rn-base-component'

test('button calls onPress when pressed', () => {
  const mockPress = jest.fn()
  const {getByText} = render(<Button onPress={mockPress}>Press me</Button>)

  fireEvent.press(getByText('Press me'))
  expect(mockPress).toHaveBeenCalled()
})
```

### Accessibility Testing

```tsx
import {render} from '@testing-library/react-native'

test('button has proper accessibility', () => {
  const {getByRole} = render(<Button accessibilityLabel="Submit form">Submit</Button>)

  expect(getByRole('button')).toHaveAccessibilityLabel('Submit form')
})
```

## 📚 Resources

### Documentation

- [Component API Reference](./components/)
- [Theme Configuration](../theme/)
- [Accessibility Guidelines](../docs/)

### Examples

- [Storybook Examples](../example/)
- [Integration Examples](../docs/)
- [Custom Theme Examples](../docs/theme.md)

### Migration

- [v1 to v2 Migration Guide](../docs/migration.md)
- [Breaking Changes](../CHANGELOG.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/rn-base-component.git

# Install dependencies
yarn install

# Run the example app
cd example
yarn ios  # or yarn android
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

Built with ❤️ for the React Native community
