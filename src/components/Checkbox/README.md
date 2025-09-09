# Checkbox Component

A highly customizable and animated checkbox component for React Native applications with built-in label support and smooth animations.

## Features

- ✅ **Animated Interactions** - Smooth bounce and scale animations
- 🎨 **Highly Customizable** - Full control over colors, sizes, and styling
- 📝 **Label Support** - Built-in text label with custom styling options
- 🎯 **Flexible State Management** - Controlled and uncontrolled modes
- ♿ **Accessibility Ready** - Screen reader support and proper semantics
- 🔧 **TypeScript Support** - Full type safety and IntelliSense

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Checkbox} from 'rn-base-component'

export default function App() {
  return (
    <Checkbox label="Accept terms and conditions" onChange={checked => console.log('Checked:', checked)} />
  )
}
```

## Controlled Component

```tsx
import React, {useState} from 'react'
import {Checkbox} from 'rn-base-component'

export default function ControlledCheckbox() {
  const [isChecked, setIsChecked] = useState(false)

  return <Checkbox label="Subscribe to newsletter" isChecked={isChecked} onChange={setIsChecked} />
}
```

## Advanced Usage

### Custom Styling

```tsx
<Checkbox
  label="Custom styled checkbox"
  size={30}
  borderRadius={15}
  fillColor="#4CAF50"
  unfillColor="#E0E0E0"
  checkMarkColor="#FFFFFF"
  borderWidth={2}
  onChange={handleChange}
/>
```

### Custom Colors

```tsx
<Checkbox
  label="Brand colored checkbox"
  fillColor="#007AFF"
  unfillColor="transparent"
  checkMarkColor="white"
  onChange={handleChange}
/>
```

### Disabled State

```tsx
<Checkbox label="Disabled checkbox" disabled disableOpacity={0.3} onChange={handleChange} />
```

### Custom Icon

```tsx
import {Icon} from 'react-native-vector-icons/MaterialIcons'
;<Checkbox
  label="Custom icon checkbox"
  iconComponent={<Icon name="star" size={16} color="gold" />}
  onChange={handleChange}
/>
```

### Custom Text Component

```tsx
;<Checkbox
  textComponent={
    <View style={styles.customTextContainer}>
      <Text style={styles.planTitle}>Premium Plan</Text>
      <Text style={styles.planPrice}>$9.99/month</Text>
    </View>
  }
  onChange={handleChange}
/>

const styles = StyleSheet.create({
  customTextContainer: {
    marginLeft: 12,
  },
  planTitle: {
    fontWeight: 'bold',
  },
  planPrice: {
    color: '#666',
    fontSize: 12,
  },
})
```

### With Custom Animations

```tsx
<Checkbox label="Animated checkbox" bounceEffectIn={0.9} bounceEffectOut={1.0} onChange={handleChange} />
```

## API Reference

### ICheckboxProps

| Prop                   | Type                         | Default         | Description                       |
| ---------------------- | ---------------------------- | --------------- | --------------------------------- |
| `size`                 | `number`                     | Theme default   | Size of the checkbox              |
| `label`                | `string`                     | `undefined`     | Text label for the checkbox       |
| `borderRadius`         | `number`                     | `undefined`     | Border radius of the checkbox     |
| `borderWidth`          | `number`                     | `undefined`     | Border width of the checkbox      |
| `fillColor`            | `string`                     | `'#ffc484'`     | Color when checkbox is checked    |
| `isChecked`            | `boolean`                    | `undefined`     | Controlled checked state          |
| `unfillColor`          | `string`                     | `'transparent'` | Color when checkbox is unchecked  |
| `checkMarkColor`       | `string`                     | `'white'`       | Color of the check mark           |
| `disableOpacity`       | `number`                     | `0.5`           | Opacity when disabled             |
| `disableText`          | `boolean`                    | `false`         | Disable the text label            |
| `disableBuiltInState`  | `boolean`                    | `false`         | Disable built-in state management |
| `bounceEffectIn`       | `number`                     | `0.8`           | Scale value when pressed          |
| `bounceEffectOut`      | `number`                     | `1.0`           | Scale value when released         |
| `iconComponent`        | `React.ReactNode`            | `undefined`     | Custom icon component             |
| `textComponent`        | `React.ReactNode`            | `undefined`     | Custom text component             |
| `iconStyle`            | `StyleProp<ViewStyle>`       | `undefined`     | Style for the icon container      |
| `innerIconStyle`       | `StyleProp<ViewStyle>`       | `undefined`     | Style for the inner icon          |
| `style`                | `StyleProp<ViewStyle>`       | `undefined`     | Style for the container           |
| `labelStyle`           | `StyleProp<TextStyle>`       | `undefined`     | Style for the label text          |
| `iconImageStyle`       | `StyleProp<ImageStyle>`      | `undefined`     | Style for the icon image          |
| `textContainerStyle`   | `StyleProp<ViewStyle>`       | `undefined`     | Style for text container          |
| `checkIconImageSource` | `ImageSourcePropType`        | `Images.check`  | Custom check mark image           |
| `onChange`             | `(checked: boolean) => void` | `undefined`     | Callback when state changes       |
| `disabled`             | `boolean`                    | `false`         | Disable the checkbox              |

## Form Integration

### Simple Form

```tsx
import React, {useState} from 'react'
import {View} from 'react-native'
import {Checkbox, Button} from 'rn-base-component'

export default function SimpleForm() {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [subscribe, setSubscribe] = useState(false)

  const handleSubmit = () => {
    if (!acceptTerms) {
      alert('Please accept terms and conditions')
      return
    }
    // Submit form
  }

  return (
    <View style={styles.formContainer}>
      <Checkbox
        label="I accept the terms and conditions"
        isChecked={acceptTerms}
        onChange={setAcceptTerms}
        style={styles.checkboxMargin}
      />

      <Checkbox
        label="Subscribe to our newsletter"
        isChecked={subscribe}
        onChange={setSubscribe}
        style={styles.checkboxLargeMargin}
      />

      <Button disabled={!acceptTerms} onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  checkboxMargin: {
    marginBottom: 16,
  },
  checkboxLargeMargin: {
    marginBottom: 24,
  },
})
```

### Multi-select List

```tsx
const [selectedItems, setSelectedItems] = useState<string[]>([])

const toggleItem = (itemId: string) => {
  setSelectedItems(prev => (prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]))
}

return (
  <View>
    {items.map(item => (
      <Checkbox
        key={item.id}
        label={item.title}
        isChecked={selectedItems.includes(item.id)}
        onChange={() => toggleItem(item.id)}
        style={styles.listItem}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 12,
  },
})
```

## Styling Patterns

### Settings List

```tsx
;<View style={styles.settingsContainer}>
  <Checkbox
    label="Enable notifications"
    isChecked={notificationsEnabled}
    onChange={setNotificationsEnabled}
    fillColor="#007AFF"
    style={styles.settingItem}
  />

  <Checkbox
    label="Dark mode"
    isChecked={darkModeEnabled}
    onChange={setDarkModeEnabled}
    fillColor="#007AFF"
    style={styles.settingItem}
  />
</View>

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 16,
  },
  settingItem: {
    marginBottom: 16,
  },
})
```

### Shopping Cart

```tsx
;<View style={styles.cartItem}>
  <Checkbox
    size={20}
    isChecked={item.selected}
    onChange={() => toggleItemSelection(item.id)}
    fillColor="#4CAF50"
    style={styles.cartCheckbox}
  />

  <View style={styles.itemDetails}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemPrice}>${item.price}</Text>
  </View>
</View>

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cartCheckbox: {
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})
```

### Todo List

```tsx
;<Checkbox
  label={todo.text}
  isChecked={todo.completed}
  onChange={() => toggleTodo(todo.id)}
  fillColor="#28A745"
  labelStyle={[styles.todoLabel, todo.completed && styles.todoCompleted]}
/>

const styles = StyleSheet.create({
  todoLabel: {
    color: '#333',
  },
  todoCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
})
```

## Animation Customization

### Subtle Animation

```tsx
<Checkbox label="Subtle animation" bounceEffectIn={0.95} bounceEffectOut={1.0} onChange={handleChange} />
```

### Pronounced Animation

```tsx
<Checkbox label="Bouncy animation" bounceEffectIn={0.7} bounceEffectOut={1.1} onChange={handleChange} />
```

### No Animation

```tsx
<Checkbox label="No animation" bounceEffectIn={1.0} bounceEffectOut={1.0} onChange={handleChange} />
```

## Accessibility

### Screen Reader Support

```tsx
<Checkbox
  label="Enable accessibility features"
  accessibilityLabel="Enable accessibility features checkbox"
  accessibilityHint="Toggles accessibility features for the app"
  onChange={handleChange}
/>
```

### Custom Accessibility

```tsx
<Checkbox
  textComponent={<Text accessibilityRole="text">Custom accessible text</Text>}
  accessibilityRole="checkbox"
  accessibilityState={{checked: isChecked}}
  onChange={handleChange}
/>
```

## Theme Integration

The Checkbox component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  components: {
    Checkbox: {
      size: 24,
      fillColor: '#007AFF',
      unfillColor: 'transparent',
      checkMarkColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 4,
    },
  },
}
```

## Best Practices

1. **Label Clarity** - Use clear, concise labels that describe the action
2. **Visual Feedback** - Ensure sufficient color contrast for accessibility
3. **Touch Targets** - Maintain adequate size for easy interaction
4. **State Management** - Use controlled components for complex forms
5. **Animation Timing** - Keep animations quick and subtle
6. **Error Handling** - Provide clear validation feedback

## Performance Considerations

- Use React.memo for checkbox lists with many items
- Avoid frequent state updates during animations
- Consider virtualization for very long checkbox lists
- Optimize custom icon components for smooth animations

## Troubleshooting

### Common Issues

**Checkbox not responding to touch**

- Ensure `onChange` callback is provided
- Check if the checkbox is disabled
- Verify there are no overlapping touchable components

**Custom icon not showing**

- Verify the `iconComponent` prop is correctly formatted
- Check if custom icons are properly imported
- Ensure icon component dimensions fit within the checkbox

**Animation issues**

- Check React Native Reanimated installation
- Verify animation values are within reasonable ranges
- Test on different devices for performance

**Styling conflicts**

- Use specific style props instead of generic `style` when possible
- Check theme configuration for default values
- Ensure parent container styles don't interfere
