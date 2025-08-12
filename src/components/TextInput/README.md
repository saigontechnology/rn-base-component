# TextInput Component

A comprehensive and customizable text input component for React Native applications with multiple variants, built-in validation support, and extensive styling options.

## Features

- 🎨 **Multiple Variants** - Default, Outlined, and Flat input styles
- 🏷️ **Label Support** - Built-in label with required field indicators
- ❌ **Error Handling** - Built-in error display and styling
- 🎯 **Icon Integration** - Left and right component support
- 🔧 **Highly Customizable** - Extensive styling and behavior options
- ♿ **Accessibility Ready** - Screen reader support and proper semantics
- 📱 **Platform Optimized** - Consistent behavior across iOS and Android

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {TextInput} from 'rn-base-component'

export default function App() {
  return <TextInput placeholder="Enter your name" onChangeText={text => console.log(text)} />
}
```

## TextInput Variants

### Default TextInput

```tsx
<TextInput label="Email" placeholder="Enter your email" onChangeText={setEmail} />
```

### Outlined TextInput

```tsx
<TextInput.Outlined
  label="Password"
  placeholder="Enter your password"
  secureTextEntry
  onChangeText={setPassword}
/>
```

### Flat TextInput

```tsx
<TextInput.Flat
  label="Message"
  placeholder="Type your message"
  multiline
  numberOfLines={4}
  onChangeText={setMessage}
/>
```

## Advanced Usage

### With Label and Validation

```tsx
<TextInput
  label="Email Address"
  isRequire
  placeholder="john@example.com"
  value={email}
  onChangeText={setEmail}
  errorText={emailError}
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

### With Icons

```tsx
<TextInput.Outlined
  label="Search"
  placeholder="Search products..."
  leftComponent={<TextInput.Icon name="search" size={20} color="#666" />}
  rightComponent={
    <TouchableOpacity onPress={clearSearch}>
      <TextInput.Icon name="close" size={20} color="#666" />
    </TouchableOpacity>
  }
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
```

### Password Input with Toggle

```tsx
import React, {useState} from 'react'

export default function PasswordInput() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextInput.Outlined
      label="Password"
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      rightComponent={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      }
    />
  )
}
```

### Multiline Text Area

```tsx
;<TextInput.Flat
  label="Description"
  placeholder="Enter a detailed description..."
  multiline
  numberOfLines={6}
  value={description}
  onChangeText={setDescription}
  style={styles.textArea}
/>

const styles = StyleSheet.create({
  textArea: {
    textAlignVertical: 'top',
  },
})
```

### Custom Styling

```tsx
;<TextInput.Outlined
  label="Styled Input"
  placeholder="Custom styled input"
  containerStyle={styles.customContainer}
  inputContainerStyle={styles.customInputContainer}
  inputStyle={styles.customInput}
  labelStyle={styles.customLabel}
  onChangeText={setValue}
/>

const styles = StyleSheet.create({
  customContainer: {
    marginBottom: 20,
  },
  customInputContainer: {
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 12,
  },
  customInput: {
    fontSize: 16,
    color: '#333',
  },
  customLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
})
```

## API Reference

### TextInputProps

| Prop                  | Type                   | Default     | Description                    |
| --------------------- | ---------------------- | ----------- | ------------------------------ |
| `containerStyle`      | `StyleProp<ViewStyle>` | `undefined` | Style for the outer container  |
| `editable`            | `boolean`              | `true`      | Whether text is editable       |
| `inputContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the input container  |
| `inputStyle`          | `StyleProp<TextStyle>` | `undefined` | Style for the input component  |
| `label`               | `string`               | `undefined` | Label text above the input     |
| `isRequire`           | `boolean`              | `undefined` | Add asterisk beside the label  |
| `labelStyle`          | `StyleProp<TextStyle>` | `undefined` | Style for the label            |
| `labelProps`          | `TextProps`            | `undefined` | Additional props for the label |
| `leftComponent`       | `React.ReactNode`      | `undefined` | Component on the left side     |
| `rightComponent`      | `React.ReactNode`      | `undefined` | Component on the right side    |
| `errorText`           | `string`               | `undefined` | Error message to display       |
| `errorProps`          | `TextProps`            | `undefined` | Props for the error text       |
| `onFocus`             | `() => void`           | `undefined` | Focus callback                 |
| `onBlur`              | `() => void`           | `undefined` | Blur callback                  |

### TextInputRef

The component exposes these methods via ref:

| Method    | Description                      |
| --------- | -------------------------------- |
| `focus()` | Focus the text input             |
| `blur()`  | Remove focus from the text input |
| `clear()` | Clear the text input content     |

### Inherited Props

All React Native `TextInputProps` are supported, including:

- `value`, `onChangeText`, `placeholder`
- `secureTextEntry`, `multiline`, `numberOfLines`
- `keyboardType`, `autoCapitalize`, `autoCorrect`
- `maxLength`, `returnKeyType`, `onSubmitEditing`

## Form Integration

### Login Form

```tsx
import React, {useState} from 'react'
import {View} from 'react-native'
import {TextInput, Button} from 'rn-base-component'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form
      console.log('Login:', {email, password})
    }
  }

  return (
    <View style={styles.formContainer}>
      <TextInput.Outlined
        label="Email"
        isRequire
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.inputSpacing}
      />

      <TextInput.Outlined
        label="Password"
        isRequire
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        errorText={errors.password}
        secureTextEntry
        style={styles.inputLargeSpacing}
      />

      <Button onPress={handleSubmit}>Log In</Button>
    </View>
  )

  const styles = StyleSheet.create({
    formContainer: {
      padding: 20,
    },
    inputSpacing: {
      marginBottom: 16,
    },
    inputLargeSpacing: {
      marginBottom: 24,
    },
  })
}
```

### Search with Debouncing

```tsx
import React, {useState, useEffect} from 'react'
import {useDebounce} from 'your-debounce-hook'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  return (
    <TextInput.Flat
      placeholder="Search..."
      value={query}
      onChangeText={setQuery}
      leftComponent={<TextInput.Icon name="search" size={20} color="#666" />}
      rightComponent={
        query ? (
          <TouchableOpacity onPress={() => setQuery('')}>
            <TextInput.Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        ) : null
      }
    />
  )
}
```

## Styling Patterns

### Modern Flat Design

```tsx
;<TextInput.Flat
  label="Full Name"
  placeholder="Enter your full name"
  inputContainerStyle={styles.flatContainer}
  inputStyle={styles.flatInput}
  labelStyle={styles.flatLabel}
/>

const styles = StyleSheet.create({
  flatContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  flatInput: {
    fontSize: 16,
    color: '#212529',
  },
  flatLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
})
```

### Material Design Outlined

```tsx
;<TextInput.Outlined
  label="Email Address"
  placeholder="you@example.com"
  inputContainerStyle={styles.materialContainer}
  labelStyle={styles.materialLabel}
/>

const styles = StyleSheet.create({
  materialContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  materialLabel: {
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#666',
  },
})
```

### Rounded Input

```tsx
;<TextInput
  placeholder="Search..."
  inputContainerStyle={styles.roundedContainer}
  inputStyle={styles.roundedInput}
  leftComponent={<TextInput.Icon name="search" size={20} color="#999" />}
/>

const styles = StyleSheet.create({
  roundedContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
  },
  roundedInput: {
    fontSize: 16,
  },
})
```

## Icon Component

The TextInput comes with a built-in Icon component:

```tsx
import {TextInput} from 'rn-base-component'

// Usage
;<TextInput.Icon name="user" size={20} color="#666" style={{marginRight: 8}} />
```

### CustomIconProps

| Prop    | Type             | Description        |
| ------- | ---------------- | ------------------ |
| `name`  | `string`         | Icon name          |
| `size`  | `number`         | Icon size          |
| `color` | `string`         | Icon color         |
| `style` | `StyleProp<any>` | Additional styling |

## Accessibility

### Screen Reader Support

```tsx
<TextInput.Outlined
  label="Phone Number"
  placeholder="Enter your phone number"
  accessibilityLabel="Phone number input field"
  accessibilityHint="Enter your 10-digit phone number"
  keyboardType="phone-pad"
/>
```

### Error Announcements

```tsx
<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  errorText={emailError}
  accessibilityInvalid={!!emailError}
  accessibilityErrorMessage={emailError}
/>
```

## Theme Integration

The TextInput component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  colors: {
    primaryBorder: '#007AFF',
    textColor: '#333333',
    darkTextColor: '#000000',
    errorText: '#FF3B30',
  },
  sizes: {
    narrow: 44, // Default input height
    petite: 12, // Small spacing
  },
  fontSizes: {
    xs: 12, // Label font size
    sm: 16, // Input font size
  },
  spacing: {
    tiny: 4, // Small spacing
  },
}
```

## Validation Patterns

### Real-time Validation

```tsx
const validateEmail = email => {
  if (!email) return ''
  if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email'
  return ''
}

;<TextInput.Outlined
  label="Email"
  value={email}
  onChangeText={text => {
    setEmail(text)
    setEmailError(validateEmail(text))
  }}
  errorText={emailError}
/>
```

### Async Validation

```tsx
const [isValidating, setIsValidating] = useState(false)

const checkUsernameAvailability = async username => {
  if (username.length < 3) return

  setIsValidating(true)
  try {
    const isAvailable = await api.checkUsername(username)
    setUsernameError(isAvailable ? '' : 'Username is not available')
  } finally {
    setIsValidating(false)
  }
}

;<TextInput
  label="Username"
  value={username}
  onChangeText={setUsername}
  onBlur={() => checkUsernameAvailability(username)}
  errorText={usernameError}
  rightComponent={isValidating ? <ActivityIndicator size="small" /> : null}
/>
```

## Best Practices

1. **Label Clarity** - Use clear, descriptive labels
2. **Placeholder Text** - Provide helpful placeholder examples
3. **Error Messages** - Show specific, actionable error messages
4. **Keyboard Types** - Use appropriate keyboard types for input
5. **Auto-correction** - Disable for sensitive inputs (emails, passwords)
6. **Accessibility** - Provide proper accessibility labels and hints

## Performance Considerations

- Use `onChangeText` debouncing for search inputs
- Avoid complex validation on every keystroke
- Consider using `onBlur` for expensive validations
- Optimize custom components used in left/right slots

## Troubleshooting

### Common Issues

**Input not responding to focus**

- Check if `editable` prop is set to false
- Ensure no overlapping touchable components
- Verify the ref is properly attached

**Styling not applying**

- Use specific style props (inputStyle, containerStyle) instead of generic style
- Check theme configuration
- Ensure parent styles don't conflict

**Keyboard not showing**

- Verify the component is properly mounted
- Check if device has hardware keyboard connected
- Test on different platforms

**Icons not displaying**

- Ensure icon library is properly linked
- Check icon name spelling
- Verify icon component props are correct
