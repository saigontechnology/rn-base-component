# Button Component

A versatile and customizable button component for React Native applications with multiple variants and styling options.

## Features

- 🎨 **Multiple Variants** - Primary, Secondary, Outline, and Transparent button styles
- 🎯 **Flexible Styling** - Extensive customization options for colors, borders, and dimensions
- 🔗 **Icon Support** - Left and right icon placement capabilities
- ♿ **Accessibility Ready** - Built-in accessibility features
- 🎨 **Theme Integration** - Seamlessly integrates with the design system
- 🎮 **Touch Feedback** - Configurable opacity and press animations

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Button} from 'rn-base-component'

export default function App() {
  return <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
}
```

## Button Variants

### Primary Button

```tsx
import {ButtonPrimary} from 'rn-base-component'
;<ButtonPrimary onPress={handlePress}>Primary Action</ButtonPrimary>
```

### Secondary Button

```tsx
import {ButtonSecondary} from 'rn-base-component'
;<ButtonSecondary onPress={handlePress}>Secondary Action</ButtonSecondary>
```

### Outline Button

```tsx
import {ButtonOutline} from 'rn-base-component'
;<ButtonOutline onPress={handlePress}>Outline Button</ButtonOutline>
```

### Transparent Button

```tsx
import {ButtonTransparent} from 'rn-base-component'
;<ButtonTransparent onPress={handlePress}>Transparent Button</ButtonTransparent>
```

## Advanced Usage

### With Icons

```tsx
import {Button} from 'rn-base-component'
import {Icon} from 'react-native-vector-icons/MaterialIcons'

<Button
  leftIcon={<Icon name="add" size={20} color="white" />}
  onPress={handlePress}>
  Add Item
</Button>

<Button
  rightIcon={<Icon name="arrow-forward" size={20} color="white" />}
  onPress={handlePress}>
  Continue
</Button>
```

### Custom Styling

```tsx
;<Button
  backgroundColor="#ff6b6b"
  textColor="#ffffff"
  borderRadius={25}
  style={styles.customButton}
  textStyle={styles.customButtonText}
  onPress={handlePress}>
  Custom Button
</Button>

const styles = StyleSheet.create({
  customButton: {
    marginVertical: 10,
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
```

### Outline Variant

```tsx
<Button outline outlineColor="#007AFF" outlineWidth={2} textColor="#007AFF" onPress={handlePress}>
  Outlined Button
</Button>
```

### Disabled State

```tsx
<Button disabled disabledColor="#cccccc" onPress={handlePress}>
  Disabled Button
</Button>
```

## API Reference

### ButtonProps

| Prop              | Type                   | Default                 | Description                             |
| ----------------- | ---------------------- | ----------------------- | --------------------------------------- |
| `textColor`       | `string`               | `theme.textColor`       | Color of the button text                |
| `backgroundColor` | `string`               | `theme.backgroundColor` | Background color of the button          |
| `disabled`        | `boolean`              | `false`                 | Disable interactions for the component  |
| `disabledColor`   | `string`               | `theme.disabledColor`   | Background color when disabled          |
| `outline`         | `boolean`              | `false`                 | Enable outline style                    |
| `outlineColor`    | `string`               | `theme.primaryBorder`   | Color of the outline border             |
| `outlineWidth`    | `number`               | `1`                     | Width of the outline border             |
| `borderRadius`    | `number`               | `theme.borderRadius`    | Custom border radius                    |
| `textSize`        | `number`               | `theme.fontSize`        | Size of the button text                 |
| `leftIcon`        | `ReactNode`            | `undefined`             | Icon to display on the left side        |
| `rightIcon`       | `ReactNode`            | `undefined`             | Icon to display on the right side       |
| `textProps`       | `TextProps`            | `undefined`             | Additional props for the text component |
| `textStyle`       | `StyleProp<TextStyle>` | `undefined`             | Custom style for the text               |
| `style`           | `StyleProp<ViewStyle>` | `undefined`             | Custom style for the container          |

### Inherited Props

The Button component also accepts all props from React Native's `TouchableOpacityProps`.

## Styling Guidelines

### Color Usage

- Use `backgroundColor` for the main button color
- Use `textColor` for text visibility and contrast
- Use `disabledColor` for accessibility in disabled states

### Size Consistency

- Button height is controlled by the theme
- Use `borderRadius` for consistent corner rounding
- Icon sizes should complement the button text size

### Accessibility

- Always provide meaningful button text
- Use appropriate contrast ratios
- Consider disabled states for user feedback

## Theme Integration

The Button component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  components: {
    Button: {
      backgroundColor: '#007AFF',
      textColor: '#FFFFFF',
      disabledColor: '#CCCCCC',
      borderRadius: 8,
      height: 44,
    },
  },
}
```

## Common Use Cases

### Form Actions

```tsx
;<View style={styles.buttonContainer}>
  <ButtonPrimary onPress={handleSubmit}>Submit</ButtonPrimary>
  <ButtonSecondary onPress={handleCancel}>Cancel</ButtonSecondary>
</View>

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
})
```

### Navigation Actions

```tsx
<Button rightIcon={<Icon name="arrow-forward" />} onPress={() => navigation.navigate('NextScreen')}>
  Continue
</Button>
```

### Loading States

```tsx
<Button disabled={isLoading} leftIcon={isLoading ? <ActivityIndicator /> : undefined} onPress={handleAction}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Best Practices

1. **Consistent Sizing** - Use theme values for consistent button heights
2. **Clear Labels** - Use descriptive text that clearly indicates the action
3. **Icon Placement** - Place icons logically (e.g., arrow-right for "Next")
4. **Loading States** - Provide visual feedback during async operations
5. **Accessibility** - Ensure sufficient color contrast and touch targets
6. **Disabled States** - Clearly indicate when buttons are not interactive

## Troubleshooting

### Common Issues

**Button text not visible**

- Check color contrast between `textColor` and `backgroundColor`
- Ensure the theme colors are properly configured

**Icons not appearing**

- Verify icon components are properly imported
- Check icon props and styling

**Touch events not working**

- Ensure `onPress` prop is provided
- Check if button is disabled
- Verify no overlapping touchable components
