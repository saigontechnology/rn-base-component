# RadioButton Component

A customizable and animated radio button component for React Native applications with built-in label support and smooth touch interactions.

## Features

- 🎯 **Single Selection** - Perfect for mutually exclusive options
- 🎨 **Highly Customizable** - Full control over colors, sizes, and styling
- 📝 **Label Support** - Built-in text label with custom styling options
- 🎪 **Smooth Animations** - Bounce effects and responsive interactions
- 🔧 **Flexible State** - Controlled and uncontrolled modes
- ♿ **Accessibility Ready** - Screen reader support and proper semantics

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {RadioButton} from 'rn-base-component'

export default function App() {
  return <RadioButton label="Option 1" onPressButton={isActive => console.log('Selected:', isActive)} />
}
```

## Radio Button Group

```tsx
import React, {useState} from 'react'
import {View} from 'react-native'
import {RadioButton} from 'rn-base-component'

export default function RadioGroup() {
  const [selectedValue, setSelectedValue] = useState('option1')

  const options = [
    {value: 'option1', label: 'Option 1'},
    {value: 'option2', label: 'Option 2'},
    {value: 'option3', label: 'Option 3'},
  ]

  return (
    <View>
      {options.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={selectedValue === option.value}
          onPressButton={() => setSelectedValue(option.value)}
          style={{marginBottom: 12}}
        />
      ))}
    </View>
  )
}
```

## Advanced Usage

### Custom Styling

```tsx
<RadioButton
  label="Custom styled radio button"
  outerSize={50}
  innerSize={30}
  ringColor="#007AFF"
  innerBackgroundColor="#007AFF"
  onPressButton={handlePress}
/>
```

### Controlled Component

```tsx
import React, {useState} from 'react'

export default function ControlledRadio() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <RadioButton
      label="Controlled radio button"
      value={isSelected}
      onPressButton={() => setIsSelected(!isSelected)}
    />
  )
}
```

### Custom Text Component

```tsx
;<RadioButton
  textComponent={
    <View style={styles.customTextContainer}>
      <Text style={styles.planTitle}>Premium Plan</Text>
      <Text style={styles.planPrice}>$19.99/month</Text>
      <Text style={styles.planDescription}>Best value for teams</Text>
    </View>
  }
  onPressButton={handlePress}
/>

const styles = StyleSheet.create({
  customTextContainer: {
    marginLeft: 12,
  },
  planTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  planPrice: {
    color: '#666',
    fontSize: 14,
  },
  planDescription: {
    color: '#999',
    fontSize: 12,
  },
})
```

### Disabled State

```tsx
<RadioButton label="Disabled option" disabled disableOpacity={0.3} onPressButton={handlePress} />
```

### Different Sizes

```tsx
;<View style={styles.sizeContainer}>
  <RadioButton label="Small" outerSize={35} innerSize={20} onPressButton={handlePress} />

  <RadioButton label="Medium (Default)" onPressButton={handlePress} />

  <RadioButton label="Large" outerSize={55} innerSize={35} onPressButton={handlePress} />
</View>

const styles = StyleSheet.create({
  sizeContainer: {
    gap: 12,
  },
})
```

## API Reference

### IRadioButtonProps

| Prop                   | Type                          | Default                 | Description                          |
| ---------------------- | ----------------------------- | ----------------------- | ------------------------------------ |
| `wrapperStyle`         | `StyleProp<ViewStyle>`        | `undefined`             | Style for the wrapper container      |
| `style`                | `StyleProp<ViewStyle>`        | `undefined`             | Style for the radio button ring      |
| `outerSize`            | `number`                      | `45`                    | Size of the outer ring container     |
| `innerSize`            | `number`                      | `25`                    | Size of the inner circle             |
| `ringColor`            | `string`                      | `theme.colors.darkBlue` | Color of the outer ring              |
| `innerContainerStyle`  | `StyleProp<ViewStyle>`        | `undefined`             | Style for the inner circle container |
| `isRemainActive`       | `boolean`                     | `undefined`             | Override built-in state management   |
| `initial`              | `boolean`                     | `undefined`             | Initial activation state             |
| `innerBackgroundColor` | `string`                      | `theme.colors.darkBlue` | Color when active                    |
| `onPressButton`        | `(isActive: boolean) => void` | `undefined`             | Press callback                       |
| `textComponent`        | `React.ReactNode`             | `undefined`             | Custom text component                |
| `textContainerStyle`   | `StyleProp<ViewStyle>`        | `undefined`             | Style for text container             |
| `disabled`             | `boolean`                     | `undefined`             | Disable the radio button             |
| `disableOpacity`       | `number`                      | `0.5`                   | Opacity when disabled                |
| `textStyle`            | `StyleProp<TextStyle>`        | `undefined`             | Style for the text label             |
| `label`                | `string`                      | `undefined`             | Text label content                   |
| `value`                | `boolean`                     | `undefined`             | Controlled value state               |

## Form Integration

### Survey Form

```tsx
import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {RadioButton, Button} from 'rn-base-component'

export default function SurveyForm() {
  const [satisfaction, setSatisfaction] = useState('')
  const [frequency, setFrequency] = useState('')

  const satisfactionOptions = [
    {value: 'very-satisfied', label: 'Very Satisfied'},
    {value: 'satisfied', label: 'Satisfied'},
    {value: 'neutral', label: 'Neutral'},
    {value: 'dissatisfied', label: 'Dissatisfied'},
  ]

  const frequencyOptions = [
    {value: 'daily', label: 'Daily'},
    {value: 'weekly', label: 'Weekly'},
    {value: 'monthly', label: 'Monthly'},
    {value: 'rarely', label: 'Rarely'},
  ]

  return (
    <View style={styles.surveyContainer}>
      <Text style={styles.sectionTitle}>How satisfied are you with our service?</Text>

      {satisfactionOptions.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={satisfaction === option.value}
          onPressButton={() => setSatisfaction(option.value)}
          style={styles.radioButtonItem}
        />
      ))}

      <Text style={[styles.sectionTitle, styles.secondSection]}>How often do you use our app?</Text>

      {frequencyOptions.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={frequency === option.value}
          onPressButton={() => setFrequency(option.value)}
          style={styles.radioButtonItem}
        />
      ))}

      <Button
        style={styles.submitButton}
        disabled={!satisfaction || !frequency}
        onPress={() => console.log({satisfaction, frequency})}>
        Submit Survey
      </Button>
    </View>
  )

  const styles = StyleSheet.create({
    surveyContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    secondSection: {
      marginTop: 24,
    },
    radioButtonItem: {
      marginBottom: 8,
    },
    submitButton: {
      marginTop: 32,
    },
  })
}
```

### Settings Selection

```tsx
const [theme, setTheme] = useState('light')
const [language, setLanguage] = useState('en')

const themes = [
  {value: 'light', label: 'Light Theme'},
  {value: 'dark', label: 'Dark Theme'},
  {value: 'auto', label: 'Auto (System)'},
]

return (
  <View style={styles.themeContainer}>
    <Text style={styles.sectionTitle}>Theme Preference</Text>
    {themes.map(option => (
      <RadioButton
        key={option.value}
        label={option.label}
        value={theme === option.value}
        onPressButton={() => setTheme(option.value)}
        ringColor="#007AFF"
        innerBackgroundColor="#007AFF"
        style={styles.themeOption}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  themeContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  themeOption: {
    marginBottom: 12,
  },
})
```

## Styling Patterns

### Payment Method Selection

```tsx
;<View style={styles.paymentContainer}>
  <RadioButton
    textComponent={
      <View style={styles.paymentOption}>
        <View style={styles.paymentInfo}>
          <Icon name="credit-card" size={24} color="#333" />
          <Text style={styles.paymentText}>Credit Card</Text>
        </View>
        <Text style={styles.paymentSubtext}>Visa ending in 1234</Text>
      </View>
    }
    value={paymentMethod === 'card'}
    onPressButton={() => setPaymentMethod('card')}
  />

  <RadioButton
    textComponent={
      <View style={styles.paymentOption}>
        <View style={styles.paymentInfo}>
          <Icon name="paypal" size={24} color="#0070ba" />
          <Text style={styles.paymentText}>PayPal</Text>
        </View>
        <Text style={styles.paymentSubtext}>user@example.com</Text>
      </View>
    }
    value={paymentMethod === 'paypal'}
    onPressButton={() => setPaymentMethod('paypal')}
  />
</View>

const styles = StyleSheet.create({
  paymentContainer: {
    padding: 16,
  },
  paymentOption: {
    marginLeft: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})
```

### Plan Selection

```tsx
;<View style={styles.planContainer}>
  {plans.map(plan => (
    <RadioButton
      key={plan.id}
      textComponent={
        <View style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>${plan.price}/month</Text>
          <Text style={styles.planFeatures}>{plan.features.join(', ')}</Text>
          {plan.recommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
      }
      value={selectedPlan === plan.id}
      onPressButton={() => setSelectedPlan(plan.id)}
      wrapperStyle={[styles.planWrapper, selectedPlan === plan.id && styles.selectedPlan]}
    />
  ))}
</View>

const styles = StyleSheet.create({
  planContainer: {
    padding: 16,
  },
  planCard: {
    marginLeft: 12,
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 4,
  },
  planFeatures: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  recommendedBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planWrapper: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedPlan: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
})
```

### Compact List

```tsx
;<View style={styles.compactList}>
  {options.map(option => (
    <RadioButton
      key={option.value}
      text={option.label}
      value={selected === option.value}
      onPressButton={() => setSelected(option.value)}
      outerSize={35}
      innerSize={20}
      textStyle={styles.compactText}
      style={styles.compactItem}
    />
  ))}
</View>

const styles = StyleSheet.create({
  compactList: {
    padding: 16,
  },
  compactText: {
    fontSize: 14,
  },
  compactItem: {
    marginBottom: 8,
  },
})
```

## Accessibility

### Screen Reader Support

```tsx
<RadioButton
  label="Accessible option"
  accessibilityLabel="Select payment method: Credit Card"
  accessibilityHint="Choose this option to pay with credit card"
  accessibilityRole="radio"
  onPressButton={handlePress}
/>
```

### Grouped Radio Buttons

```tsx
<View accessibilityRole="radiogroup" accessibilityLabel="Theme selection">
  {themes.map(theme => (
    <RadioButton
      key={theme.value}
      label={theme.label}
      value={selectedTheme === theme.value}
      accessibilityRole="radio"
      accessibilityState={{selected: selectedTheme === theme.value}}
      onPressButton={() => setSelectedTheme(theme.value)}
    />
  ))}
</View>
```

## Animation Customization

The RadioButton component uses the Bounceable component for touch animations. You can customize the bounce behavior through the underlying Bounceable props.

## Theme Integration

The RadioButton component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  colors: {
    darkBlue: '#007AFF', // Default ring and inner colors
    black: '#000000', // Default text color
  },
  spacing: {
    small: 8, // Default margin for text
  },
  fontSizes: {
    md: 16, // Default text size
  },
  borderWidths: {
    little: 1, // Default border width
  },
}
```

## Best Practices

1. **Mutual Exclusivity** - Use radio buttons for mutually exclusive options
2. **Clear Labels** - Provide clear, descriptive labels for each option
3. **Grouping** - Visually group related radio buttons
4. **Default Selection** - Consider providing a sensible default selection
5. **Accessibility** - Use proper accessibility roles and labels
6. **Visual Hierarchy** - Use consistent sizing and spacing

## Performance Considerations

- Use React.memo for radio button groups with many options
- Avoid complex custom text components for better performance
- Consider virtualization for very long option lists
- Optimize touch area calculations for smooth interactions

## Troubleshooting

### Common Issues

**Radio button not responding**

- Ensure `onPressButton` callback is provided
- Check if the component is disabled
- Verify there are no overlapping touchable components

**State not updating correctly**

- For controlled components, ensure `value` prop reflects current state
- Check if `isRemainActive` is interfering with state management
- Verify callback functions are updating state correctly

**Styling issues**

- Check theme configuration for default values
- Use specific style props instead of generic `style` when possible
- Ensure parent container styles don't interfere with layout

**Custom text not displaying**

- Verify `textComponent` prop is correctly formatted
- Check if custom components are properly imported
- Ensure text component styles don't conflict with container styles
