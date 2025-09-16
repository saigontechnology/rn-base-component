# RadioButton Component

A customizable radio button component for React Native applications with smooth animations, flexible styling, and comprehensive form integration capabilities.

## Features

- 🎨 **Customizable Styling** - Configurable sizes, colors, and visual states
- ⚡ **Smooth Animations** - Bounce effects and state transitions
- 🏷️ **Label Support** - Built-in text labels with custom styling
- 🎯 **Theme Integration** - Seamlessly integrates with the design system
- 📱 **Touch Optimized** - Responsive touch interactions with proper feedback
- ♿ **Accessibility Ready** - Full accessibility support for screen readers
- 🔧 **Flexible State Management** - Controlled and uncontrolled modes

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React, {useState} from 'react'
import {RadioButton} from 'rn-base-component'

export default function App() {
  const [selected, setSelected] = useState(false)

  return <RadioButton label="Accept terms and conditions" value={selected} onPressButton={setSelected} />
}
```

## Advanced Usage

### Radio Button Group

```tsx
const RadioGroup = () => {
  const [selectedOption, setSelectedOption] = useState('option1')

  const options = [
    {id: 'option1', label: 'Option 1'},
    {id: 'option2', label: 'Option 2'},
    {id: 'option3', label: 'Option 3'},
  ]

  return (
    <View>
      {options.map(option => (
        <RadioButton
          key={option.id}
          label={option.label}
          value={selectedOption === option.id}
          onPressButton={() => setSelectedOption(option.id)}
          wrapperStyle={styles.radioOption}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  radioOption: {
    marginVertical: 8,
  },
})
```

### Custom Styling

```tsx
;<RadioButton
  label="Custom styled radio"
  outerSize={60}
  innerSize={30}
  ringColor="#FF6B6B"
  innerBackgroundColor="#FF6B6B"
  style={styles.customRadio}
  textStyle={styles.customText}
  wrapperStyle={styles.customWrapper}
/>

const styles = StyleSheet.create({
  customRadio: {
    borderWidth: 3,
  },
  customText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  customWrapper: {
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
})
```

### Disabled State

```tsx
<RadioButton label="Disabled option" disabled={true} disableOpacity={0.3} value={false} />
```

### Form Integration

```tsx
const SubscriptionForm = () => {
  const [plan, setPlan] = useState('')

  const plans = [
    {id: 'basic', name: 'Basic Plan', price: '$9.99/month'},
    {id: 'premium', name: 'Premium Plan', price: '$19.99/month'},
    {id: 'enterprise', name: 'Enterprise Plan', price: '$49.99/month'},
  ]

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Choose Your Plan</Text>

      {plans.map(planOption => (
        <View key={planOption.id} style={styles.planOption}>
          <RadioButton
            value={plan === planOption.id}
            onPressButton={() => setPlan(planOption.id)}
            outerSize={40}
            innerSize={20}
            ringColor="#007AFF"
            innerBackgroundColor="#007AFF"
          />
          <View style={styles.planDetails}>
            <Text style={styles.planName}>{planOption.name}</Text>
            <Text style={styles.planPrice}>{planOption.price}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  planDetails: {
    marginLeft: 15,
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    color: '#666',
    marginTop: 2,
  },
})
```

## API Reference

### RadioButtonProps

| Prop                   | Type                          | Default     | Description                                       |
| ---------------------- | ----------------------------- | ----------- | ------------------------------------------------- |
| `outerSize`            | `number`                      | Theme       | Size of the outer ring (overrides theme)          |
| `innerSize`            | `number`                      | Theme       | Size of the inner circle (overrides theme)        |
| `ringColor`            | `string`                      | Theme       | Color of the outer ring (overrides theme)         |
| `innerBackgroundColor` | `string`                      | Theme       | Color of the inner circle when selected           |
| `disabled`             | `boolean`                     | Theme       | Disable the radio button (overrides theme)        |
| `disableOpacity`       | `number`                      | Theme       | Opacity when disabled (overrides theme)           |
| `initial`              | `boolean`                     | Theme       | Initial selected state (overrides theme)          |
| `value`                | `boolean`                     | `undefined` | Current selected state (controlled mode)          |
| `onPressButton`        | `(isActive: boolean) => void` | `undefined` | Callback when pressed                             |
| `label`                | `string`                      | `undefined` | Text label for the radio button                   |
| `textComponent`        | `React.ReactNode`             | `undefined` | Custom text component                             |
| `style`                | `StyleProp<ViewStyle>`        | Theme       | Style for the radio ring (overrides theme)        |
| `wrapperStyle`         | `StyleProp<ViewStyle>`        | Theme       | Style for the wrapper container (overrides theme) |
| `textStyle`            | `StyleProp<TextStyle>`        | Theme       | Style for the text label (overrides theme)        |
| `textContainerStyle`   | `StyleProp<ViewStyle>`        | Theme       | Style for the text container (overrides theme)    |
| `innerContainerStyle`  | `StyleProp<ViewStyle>`        | Theme       | Style for the inner circle container              |

## Usage Patterns

### Settings Options

```tsx
const SettingsOptions = () => {
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.sectionTitle}>Theme</Text>
      <RadioButton
        label="Light mode"
        value={theme === 'light'}
        onPressButton={() => setTheme('light')}
        wrapperStyle={styles.settingItem}
      />
      <RadioButton
        label="Dark mode"
        value={theme === 'dark'}
        onPressButton={() => setTheme('dark')}
        wrapperStyle={styles.settingItem}
      />

      <Text style={styles.sectionTitle}>Notifications</Text>
      <RadioButton
        label="Enable push notifications"
        value={notifications}
        onPressButton={setNotifications}
        wrapperStyle={styles.settingItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    paddingVertical: 12,
  },
})
```

### Survey Questions

```tsx
const SurveyQuestion = ({question, options, value, onChange}) => (
  <View style={styles.questionContainer}>
    <Text style={styles.questionText}>{question}</Text>
    {options.map((option, index) => (
      <RadioButton
        key={index}
        label={option}
        value={value === index}
        onPressButton={() => onChange(index)}
        wrapperStyle={styles.optionWrapper}
        outerSize={35}
        innerSize={18}
        ringColor="#4CAF50"
        innerBackgroundColor="#4CAF50"
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  optionWrapper: {
    marginVertical: 8,
    paddingLeft: 10,
  },
})
```

### Payment Methods

```tsx
const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('')

  const methods = [
    {id: 'card', name: 'Credit Card', icon: '💳', details: '**** 1234'},
    {id: 'paypal', name: 'PayPal', icon: '🅿️', details: 'user@example.com'},
    {id: 'apple', name: 'Apple Pay', icon: '🍎', details: 'Touch ID'},
  ]

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.paymentTitle}>Payment Method</Text>

      {methods.map(method => (
        <View key={method.id} style={styles.paymentMethod}>
          <RadioButton
            value={selectedMethod === method.id}
            onPressButton={() => setSelectedMethod(method.id)}
            outerSize={45}
            innerSize={25}
            ringColor="#007AFF"
            innerBackgroundColor="#007AFF"
          />
          <View style={styles.methodInfo}>
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodDetails}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodMeta}>{method.details}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  paymentContainer: {
    padding: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  methodMeta: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
})
```

## Theme Integration

The RadioButton component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    RadioButton: {
      outerSize: 50, // Custom outer ring size
      innerSize: 28, // Custom inner circle size
      ringColor: '#007AFF', // Custom ring color
      innerBackgroundColor: '#007AFF', // Custom fill color
      disabled: false, // Default enabled state
      disableOpacity: 0.5, // Opacity when disabled
      initial: false, // Default selection state
      borderWidth: 2, // Ring border width
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<RadioButton label="Default styling" />

// Override specific theme values
<RadioButton
  label="Custom styling"
  outerSize={60}
  ringColor="#FF6B6B"
  innerBackgroundColor="#FF6B6B"
/>
```

### Default Theme Values

```tsx
// Default RadioButton theme configuration
RadioButtonTheme: {
  outerSize: 45,                    // Default outer ring size
  innerSize: 25,                    // Default inner circle size
  ringColor: '#004282',             // base.colors.darkBlue
  innerBackgroundColor: '#004282',  // base.colors.darkBlue
  disabled: false,                  // Default enabled
  disableOpacity: 0.5,              // Half opacity when disabled
  initial: false,                   // Not selected by default
  borderWidth: 1,                   // base.borderWidths.little
}
```

## Accessibility

### Screen Reader Support

```tsx
<RadioButton
  label="Option 1"
  accessibilityLabel="First option in the list"
  accessibilityHint="Tap to select this option"
  accessibilityRole="radio"
  accessibilityState={{selected: isSelected}}
/>
```

### Radio Button Groups

```tsx
// For radio button groups, use proper labeling
<View accessibilityRole="radiogroup" accessibilityLabel="Choose your plan">
  {plans.map(plan => (
    <RadioButton
      key={plan.id}
      label={plan.name}
      accessibilityState={{selected: selectedPlan === plan.id}}
      onPressButton={() => setSelectedPlan(plan.id)}
    />
  ))}
</View>
```

## Animation and Feedback

### Custom Bounce Effects

```tsx
<RadioButton
  label="Bouncy radio"
  bounceEffectIn={0.95} // Scale down to 95% on press
  bounceEffectOut={1.0} // Scale back to 100%
  onPressButton={handlePress}
/>
```

### State Persistence

```tsx
const PersistentRadio = () => {
  const [value, setValue] = useState(false)

  // Keep the radio in a specific state
  return (
    <RadioButton
      label="Always active"
      isRemainActive={true}
      initial={true}
      onPressButton={isActive => {
        console.log('Radio pressed, state:', isActive)
        // State remains as set by isRemainActive
      }}
    />
  )
}
```

## Best Practices

1. **Group Related Options** - Use radio buttons for mutually exclusive choices
2. **Clear Labels** - Provide descriptive and concise labels
3. **Consistent Sizing** - Use consistent sizes within the same interface
4. **Accessibility** - Always provide accessibility labels and roles
5. **Visual Feedback** - Use animations and color changes for state feedback
6. **Touch Targets** - Ensure adequate touch target size (minimum 44pt)
7. **Default Selection** - Consider providing sensible default selections

## Form Integration

### Validation

```tsx
const FormWithValidation = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!selectedOption) {
      newErrors.option = 'Please select an option'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <View>
      <Text style={styles.label}>Required Selection</Text>
      <RadioButton
        label="Option A"
        value={selectedOption === 'a'}
        onPressButton={() => setSelectedOption('a')}
        style={errors.option && styles.errorBorder}
      />
      <RadioButton
        label="Option B"
        value={selectedOption === 'b'}
        onPressButton={() => setSelectedOption('b')}
        style={errors.option && styles.errorBorder}
      />
      {errors.option && <Text style={styles.errorText}>{errors.option}</Text>}
    </View>
  )
}
```

## Troubleshooting

### Common Issues

**Radio button not responding to touch**

- Ensure `onPressButton` callback is provided
- Check if the component is disabled
- Verify touch target size is adequate

**Animation not working**

- Check bounce effect values are within valid range (0.0 - 1.0)
- Ensure device supports animations
- Verify React Native Reanimated is properly installed

**State not updating correctly**

- Use controlled mode with `value` prop for predictable state management
- Ensure `onPressButton` is updating state correctly
- Check for conflicts with `isRemainActive` prop

**Styling not applying**

- Verify style object syntax
- Check for style conflicts between different style props
- Use theme configuration for consistent styling across the app
