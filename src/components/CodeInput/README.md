# CodeInput Component

A highly customizable and accessible code input component for React Native, perfect for OTP (One-Time Password), PIN, and verification code inputs.

## Features

- 🎯 **Flexible Length** - Support for 1-20 digit codes
- 🎨 **Highly Customizable** - Extensive styling options for every element
- ♿ **Accessible** - Full screen reader support and ARIA labels
- 🎮 **Controlled/Uncontrolled** - Works with both patterns
- 🔒 **Secure Input** - Built-in secure text entry mode
- 📱 **Mobile Optimized** - Proper keyboard handling and auto-focus
- 🎪 **Multiple Placeholders** - Text, dots, or custom placeholders
- 🎯 **TypeScript Ready** - Full type safety and IntelliSense support

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import { CodeInput } from 'rn-base-component'

export default function App() {
  return (
    <CodeInput
      length={6}
      onSubmit={(code) => console.log('Code entered:', code)}
      autoFocus
    />
  )
}
```

## Advanced Usage

### Controlled Component

```tsx
import React, { useState } from 'react'
import { CodeInput } from 'rn-base-component'

export default function ControlledExample() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (enteredCode: string) => {
    setLoading(true)
    try {
      await verifyCode(enteredCode)
    } catch (error) {
      setCode('') // Clear on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <CodeInput
      value={code}
      onChangeText={setCode}
      onSubmit={handleSubmit}
      disabled={loading}
      length={6}
    />
  )
}
```

### With Ref Control

```tsx
import React, { useRef } from 'react'
import { CodeInput, CodeInputRef } from 'rn-base-component'

export default function RefExample() {
  const codeInputRef = useRef<CodeInputRef>(null)

  const handleClear = () => {
    codeInputRef.current?.clear()
    codeInputRef.current?.focus()
  }

  return (
    <>
      <CodeInput
        ref={codeInputRef}
        length={4}
        onSubmit={(code) => {
          if (code !== '1234') {
            codeInputRef.current?.clear()
          }
        }}
      />
      <Button title="Clear" onPress={handleClear} />
    </>
  )
}
```

## Styling Examples

### Custom Cell Styling

```tsx
<CodeInput
  length={6}
  cellStyle={{
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  }}
  filledCellStyle={{
    borderColor: '#007AFF',
    backgroundColor: '#ffffff',
  }}
  focusCellStyle={{
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  }}
  textStyle={{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  }}
/>
```

### Dot Placeholder Style

```tsx
<CodeInput
  length={6}
  placeholderAsDot={true}
  placeholderDotStyle={{
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  }}
  secureTextEntry={true}
  secureViewStyle={{
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  }}
/>
```

### Container Styling

```tsx
<CodeInput
  length={4}
  cellContainerStyle={{
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    gap: 8, // For React Native 0.71+
  }}
  cellWrapperStyle={{
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    padding: 4,
  }}
  focusCellWrapperStyle={{
    backgroundColor: '#ffffff',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }}
/>
```

## Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of code input cells (1-20) |
| `value` | `string` | `undefined` | Controlled value |
| `onChangeText` | `(code: string) => void` | `undefined` | Called when code changes |
| `onSubmit` | `(code: string) => void` | `undefined` | Called when code is complete |
| `onClear` | `() => void` | `undefined` | Called when code is cleared |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `disabled` | `boolean` | `false` | Disable input |
| `testID` | `string` | `'code-input'` | Test identifier |

### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `cellStyle` | `StyleProp<ViewStyle>` | Style for individual cells |
| `filledCellStyle` | `StyleProp<ViewStyle>` | Style for cells with values |
| `focusCellStyle` | `StyleProp<ViewStyle>` | Style for focused cell |
| `textStyle` | `StyleProp<TextStyle>` | Style for text inside cells |
| `focusTextStyle` | `StyleProp<TextStyle>` | Style for focused cell text |
| `cellContainerStyle` | `StyleProp<ViewStyle>` | Style for container holding all cells |
| `cellWrapperStyle` | `StyleProp<ViewStyle>` | Style for wrapper around each cell |
| `focusCellWrapperStyle` | `StyleProp<ViewStyle>` | Style for wrapper around focused cell |

### Placeholder Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `''` | Placeholder text for empty cells |
| `placeholderTextColor` | `string` | `undefined` | Color for placeholder text |
| `placeholderAsDot` | `boolean` | `false` | Render placeholder as dot |
| `placeholderDotStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for placeholder dot |

### Security Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `secureTextEntry` | `boolean` | `false` | Hide entered values |
| `secureViewStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for secure dots |

### Cursor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `withCursor` | `boolean` | `false` | Show cursor in focused cell |
| `customCursor` | `() => ReactNode` | `undefined` | Custom cursor component |

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keyboardType` | `KeyboardTypeOptions` | `'number-pad'` | Keyboard type |
| `...textInputProps` | `TextInputProps` | - | All other TextInput props |

## Ref Methods

```tsx
interface CodeInputRef {
  focus: () => void      // Focus the input
  blur: () => void       // Blur the input
  clear: () => void      // Clear the code
  getValue: () => string // Get current value
  setValue: (value: string) => void // Set value programmatically
}
```

## Accessibility

The component is fully accessible with:

- **Screen reader support** with descriptive labels
- **Proper ARIA attributes** for each cell
- **Keyboard navigation** support
- **Focus management** with clear focus indicators
- **Status announcements** for completion state

### Accessibility Labels

- Input: "Code input with X digits"
- Cells: "Code input cell X of Y, contains Z" or "empty"
- Container: "Code input cells, X of Y filled"

## Common Use Cases

### OTP Verification

```tsx
<CodeInput
  length={6}
  keyboardType="number-pad"
  autoFocus
  onSubmit={verifyOTP}
  cellStyle={{
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  }}
  focusCellStyle={{
    borderColor: '#007AFF',
  }}
/>
```

### PIN Entry

```tsx
<CodeInput
  length={4}
  secureTextEntry
  keyboardType="number-pad"
  placeholderAsDot
  onSubmit={verifyPIN}
  cellStyle={{
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderWidth: 0,
  }}
/>
```

### Verification Code

```tsx
<CodeInput
  length={8}
  keyboardType="default"
  placeholder="•"
  onSubmit={verifyCode}
  cellStyle={{
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderRadius: 0,
    backgroundColor: 'transparent',
  }}
  focusCellStyle={{
    borderBottomColor: '#007AFF',
  }}
/>
```

## Best Practices

1. **Use appropriate keyboard types** - `number-pad` for numeric codes, `default` for alphanumeric
2. **Provide clear visual feedback** - Use `focusCellStyle` to indicate active cell
3. **Handle errors gracefully** - Clear input on invalid codes
4. **Consider accessibility** - Test with screen readers
5. **Use controlled components** for complex validation logic
6. **Provide loading states** - Disable input during verification
7. **Auto-focus appropriately** - Only when it makes sense in your UX flow

## Troubleshooting

### Common Issues

**Input not focusing on cell press**
- Ensure the component is not disabled
- Check if `autoFocus` conflicts with your navigation

**Styling not applying**
- Verify you're using the correct style prop for the element
- Check theme integration if using styled-components

**Accessibility issues**
- Test with screen readers enabled
- Ensure proper labeling for your use case

**Performance with many cells**
- Consider using fewer cells (max 20 supported)
- Optimize custom render functions

## Contributing

Found a bug or want to contribute? Please check our [Contributing Guide](../../CONTRIBUTING.md).

## License

MIT License - see [LICENSE](../../LICENSE) for details. 