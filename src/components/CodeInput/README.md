# CodeInput Component

A specialized input component for entering verification codes, PINs, and other sequential character inputs with customizable styling and enhanced user experience.

## Features

- 🔢 **Flexible Length** - Configurable number of input cells (1-20)
- 🎨 **Customizable Styling** - Individual cell styling with focus states
- 🔒 **Secure Input** - Built-in secure text entry mode
- ⌨️ **Smart Keyboard** - Automatic keyboard type selection
- 📱 **Mobile Optimized** - Touch-friendly interface with proper focus management
- 🎯 **Theme Integration** - Seamlessly integrates with the design system
- ♿ **Accessibility Ready** - Full accessibility support

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React, {useState} from 'react'
import {CodeInput} from 'rn-base-component'

export default function App() {
  const [code, setCode] = useState('')

  return (
    <CodeInput
      length={6}
      value={code}
      onChangeText={setCode}
      onSubmit={code => console.log('Code entered:', code)}
    />
  )
}
```

## Advanced Usage

### SMS Verification Code

```tsx
const SMSVerification = () => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCodeSubmit = async enteredCode => {
    setLoading(true)
    try {
      await verifyCode(enteredCode)
      navigation.navigate('Success')
    } catch (error) {
      setCode('')
      showError('Invalid code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to your phone</Text>

      <CodeInput
        length={6}
        value={code}
        onChangeText={setCode}
        onSubmit={handleCodeSubmit}
        keyboardType="number-pad"
        autoFocus={true}
        disabled={loading}
      />

      <TouchableOpacity onPress={resendCode}>
        <Text style={styles.resendText}>Resend code</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### PIN Entry

```tsx
const PINEntry = () => {
  const [pin, setPin] = useState('')

  return (
    <CodeInput
      length={4}
      value={pin}
      onChangeText={setPin}
      secureTextEntry={true}
      placeholder="•"
      cellStyle={styles.pinCell}
      focusCellStyle={styles.pinCellFocused}
      textStyle={styles.pinText}
    />
  )
}

const styles = StyleSheet.create({
  pinCell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  pinCellFocused: {
    borderColor: '#007AFF',
  },
  pinText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
```

### Custom Styling

```tsx
;<CodeInput
  length={5}
  cellStyle={styles.customCell}
  filledCellStyle={styles.filledCell}
  focusCellStyle={styles.focusedCell}
  textStyle={styles.customText}
  cellContainerStyle={styles.container}
  withCursor={true}
  placeholder="0"
  placeholderTextColor="#999"
/>

const styles = StyleSheet.create({
  customCell: {
    width: 45,
    height: 60,
    borderBottomWidth: 3,
    borderBottomColor: '#DDD',
    backgroundColor: 'transparent',
  },
  filledCell: {
    borderBottomColor: '#007AFF',
  },
  focusedCell: {
    borderBottomColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  customText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    justifyContent: 'space-around',
  },
})
```

## API Reference

### CodeInputProps

| Prop                   | Type                     | Default     | Description                                   |
| ---------------------- | ------------------------ | ----------- | --------------------------------------------- |
| `length`               | `number`                 | Theme       | Number of input cells (overrides theme)       |
| `value`                | `string`                 | `''`        | Current input value                           |
| `onChangeText`         | `(code: string) => void` | `undefined` | Callback when code changes                    |
| `onSubmit`             | `(code: string) => void` | `undefined` | Callback when code is complete                |
| `onClear`              | `() => void`             | `undefined` | Callback when code is cleared                 |
| `cellStyle`            | `StyleProp<ViewStyle>`   | Theme       | Style for individual cells (overrides theme)  |
| `filledCellStyle`      | `StyleProp<ViewStyle>`   | Theme       | Style for cells with values (overrides theme) |
| `focusCellStyle`       | `StyleProp<ViewStyle>`   | Theme       | Style for focused cell (overrides theme)      |
| `textStyle`            | `StyleProp<TextStyle>`   | Theme       | Style for cell text (overrides theme)         |
| `focusTextStyle`       | `StyleProp<TextStyle>`   | Theme       | Style for focused cell text (overrides theme) |
| `secureTextEntry`      | `boolean`                | Theme       | Enable secure input mode (overrides theme)    |
| `keyboardType`         | `KeyboardTypeOptions`    | Theme       | Keyboard type to show (overrides theme)       |
| `withCursor`           | `boolean`                | Theme       | Show cursor in focused cell (overrides theme) |
| `placeholder`          | `string`                 | Theme       | Placeholder text for empty cells              |
| `placeholderTextColor` | `string`                 | Theme       | Color for placeholder text (overrides theme)  |
| `placeholderAsDot`     | `boolean`                | Theme       | Render placeholder as dot (overrides theme)   |
| `autoFocus`            | `boolean`                | Theme       | Auto focus on mount (overrides theme)         |
| `disabled`             | `boolean`                | Theme       | Disable input (overrides theme)               |

## Usage Patterns

### Two-Factor Authentication

```tsx
const TwoFactorAuth = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleCodeChange = newCode => {
    setCode(newCode)
    setError('') // Clear error when user types
  }

  const handleVerification = async finalCode => {
    try {
      await verifyTwoFactorCode(finalCode)
      onSuccess()
    } catch (err) {
      setError('Invalid code. Please try again.')
      setCode('')
    }
  }

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Enter authentication code</Text>
      <Text style={styles.instruction}>Check your authenticator app for the 6-digit code</Text>

      <CodeInput
        length={6}
        value={code}
        onChangeText={handleCodeChange}
        onSubmit={handleVerification}
        keyboardType="number-pad"
        cellStyle={[styles.authCell, error && styles.errorCell]}
        autoFocus={true}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}
```

### OTP with Resend Timer

```tsx
const OTPInput = () => {
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const resendOTP = () => {
    setTimeLeft(60)
    setCanResend(false)
    setOtp('')
    // API call to resend OTP
  }

  return (
    <View style={styles.otpContainer}>
      <CodeInput
        length={4}
        value={otp}
        onChangeText={setOtp}
        onSubmit={verifyOTP}
        cellStyle={styles.otpCell}
        focusCellStyle={styles.otpCellFocused}
      />

      <View style={styles.resendContainer}>
        <Text>Didn't receive the code? </Text>
        {canResend ? (
          <TouchableOpacity onPress={resendOTP}>
            <Text style={styles.resendButton}>Resend</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timer}>Resend in {timeLeft}s</Text>
        )}
      </View>
    </View>
  )
}
```

### Bank PIN with Secure Display

```tsx
const BankPIN = () => {
  const [pin, setPin] = useState('')

  return (
    <View style={styles.bankContainer}>
      <Text style={styles.bankTitle}>Enter your PIN</Text>

      <CodeInput
        length={4}
        value={pin}
        onChangeText={setPin}
        onSubmit={handlePINSubmit}
        secureTextEntry={true}
        keyboardType="number-pad"
        cellStyle={styles.bankPinCell}
        filledCellStyle={styles.bankPinFilled}
        secureViewStyle={styles.bankSecureDot}
        autoFocus={true}
      />

      <TouchableOpacity style={styles.forgotPin} onPress={() => navigation.navigate('ForgotPIN')}>
        <Text style={styles.forgotPinText}>Forgot PIN?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bankPinCell: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  bankPinFilled: {
    borderColor: '#28A745',
    backgroundColor: '#F8FFF9',
  },
  bankSecureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28A745',
  },
})
```

## Theme Integration

The CodeInput component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    CodeInput: {
      length: 6, // Default number of cells
      cellStyle: {
        // Default cell styling
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
      },
      filledCellStyle: {
        // Style when cell has value
        borderColor: '#007AFF',
      },
      focusCellStyle: {
        // Style when cell is focused
        borderColor: '#007AFF',
        borderWidth: 2,
      },
      textStyle: {
        // Text styling
        fontSize: 18,
        fontWeight: '600',
      },
      secureTextEntry: false, // Secure input mode
      keyboardType: 'number-pad', // Keyboard type
      autoFocus: false, // Auto focus behavior
      placeholderTextColor: '#999999', // Placeholder color
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<CodeInput onChangeText={setCode} />

// Override specific theme values
<CodeInput
  length={4}
  secureTextEntry={true}
  cellStyle={{borderRadius: 12}}
  onChangeText={setCode}
/>
```

### Default Theme Values

```tsx
// Default CodeInput theme configuration
CodeInputTheme: {
  length: 6,
  cellStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#454545',       // base.colors.primaryBorder
    borderRadius: 8,              // metrics.borderRadius
    backgroundColor: '#FFFFFF',   // base.colors.white
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',            // base.colors.black
  },
  secureTextEntry: false,
  keyboardType: 'number-pad',
  autoFocus: false,
  disabled: false,
}
```

## Accessibility

### Screen Reader Support

```tsx
<CodeInput
  length={6}
  accessibilityLabel="Six digit verification code"
  accessibilityHint="Enter the six digit code sent to your phone"
  accessibilityValue={{
    text: `${code.length} of 6 digits entered`,
  }}
/>
```

### Voice Input Support

```tsx
<CodeInput
  length={4}
  keyboardType="number-pad"
  textContentType="oneTimeCode" // iOS autofill support
  autoComplete="sms-otp" // Android autofill support
/>
```

## Best Practices

1. **Appropriate Length** - Use standard lengths (4 for PINs, 6 for SMS codes)
2. **Keyboard Type** - Match keyboard to expected input type
3. **Auto-focus** - Enable for primary code inputs
4. **Clear Errors** - Clear error states when user starts typing
5. **Accessibility** - Provide clear labels and hints
6. **Security** - Use secure input for sensitive codes like PINs
7. **Feedback** - Provide visual feedback for successful/failed validation

## Security Considerations

### Secure Code Entry

```tsx
// For sensitive codes (PINs, passwords)
<CodeInput
  secureTextEntry={true}
  keyboardType="number-pad"
  textContentType="password"
  onChangeText={handleSecureInput}
/>
```

### Clear Sensitive Data

```tsx
useEffect(() => {
  return () => {
    // Clear sensitive data on unmount
    setPin('')
  }
}, [])
```

## Troubleshooting

### Common Issues

**Auto-focus not working**

- Ensure `autoFocus={true}` is set
- Check if another input is stealing focus
- Verify the component is properly mounted

**Keyboard not showing**

- Confirm `keyboardType` is set correctly
- Check device keyboard settings
- Ensure component is focusable

**Styling not applying**

- Verify style object syntax
- Check for style conflicts
- Use theme configuration for consistent styling

**Code not submitting**

- Ensure `onSubmit` callback is provided
- Check if `length` matches expected code length
- Verify validation logic in submit handler
