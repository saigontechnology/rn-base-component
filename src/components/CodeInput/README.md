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

#### Core Props

| Prop           | Type                     | Default     | Description                    |
| -------------- | ------------------------ | ----------- | ------------------------------ |
| `length`       | `number`                 | Theme       | Number of input cells          |
| `value`        | `string`                 | `''`        | Current input value            |
| `onChangeText` | `(code: string) => void` | `undefined` | Callback when code changes     |
| `onSubmit`     | `(code: string) => void` | `undefined` | Callback when code is complete |
| `onClear`      | `() => void`             | `undefined` | Callback when code is cleared  |
| `autoFocus`    | `boolean`                | Theme       | Auto focus on mount            |
| `disabled`     | `boolean`                | Theme       | Disable input                  |
| `keyboardType` | `KeyboardTypeOptions`    | Theme       | Keyboard type to show          |
| `testID`       | `string`                 | `undefined` | Test ID for the component      |

#### Styling Props

| Prop                    | Type                   | Default     | Description                           |
| ----------------------- | ---------------------- | ----------- | ------------------------------------- |
| `containerStyle`        | `StyleProp<ViewStyle>` | `undefined` | Style for outer container             |
| `cellContainerStyle`    | `StyleProp<ViewStyle>` | `undefined` | Style for container holding all cells |
| `cellStyle`             | `StyleProp<ViewStyle>` | Theme       | Style for individual cells            |
| `cellWrapperStyle`      | `StyleProp<ViewStyle>` | `undefined` | Style for wrapper around each cell    |
| `filledCellStyle`       | `StyleProp<ViewStyle>` | Theme       | Style for cells with values           |
| `focusCellStyle`        | `StyleProp<ViewStyle>` | Theme       | Style for focused cell                |
| `focusCellWrapperStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for wrapper around focused cell |
| `activeCellStyle`       | `StyleProp<ViewStyle>` | `undefined` | Style for cell in active state        |
| `errorCellStyle`        | `StyleProp<ViewStyle>` | `undefined` | Style for cell in error state         |
| `successCellStyle`      | `StyleProp<ViewStyle>` | `undefined` | Style for cell in success state       |
| `disabledCellStyle`     | `StyleProp<ViewStyle>` | `undefined` | Style for cell in disabled state      |

#### Text & Secure Entry Props

| Prop                   | Type                   | Default     | Description                      |
| ---------------------- | ---------------------- | ----------- | -------------------------------- |
| `textStyle`            | `StyleProp<TextStyle>` | Theme       | Style for cell text              |
| `focusTextStyle`       | `StyleProp<TextStyle>` | Theme       | Style for focused cell text      |
| `secureTextEntry`      | `boolean`              | Theme       | Enable secure input mode         |
| `secureViewStyle`      | `StyleProp<ViewStyle>` | `undefined` | Style for secure text entry dots |
| `placeholder`          | `string`               | Theme       | Placeholder text for empty cells |
| `placeholderTextColor` | `string`               | Theme       | Color for placeholder text       |
| `placeholderAsDot`     | `boolean`              | Theme       | Render placeholder as dot        |
| `placeholderDotStyle`  | `StyleProp<ViewStyle>` | `undefined` | Style for placeholder dot        |

#### Cursor Props

| Prop           | Type              | Default     | Description                 |
| -------------- | ----------------- | ----------- | --------------------------- |
| `withCursor`   | `boolean`         | Theme       | Show cursor in focused cell |
| `customCursor` | `() => ReactNode` | `undefined` | Custom cursor component     |

#### Label Props

| Prop             | Type                   | Default     | Description                               |
| ---------------- | ---------------------- | ----------- | ----------------------------------------- |
| `label`          | `string`               | `undefined` | Label text displayed above the code input |
| `labelComponent` | `ReactNode`            | `undefined` | Custom label component to replace default |
| `labelStyle`     | `StyleProp<TextStyle>` | `undefined` | Styling for the label                     |
| `labelProps`     | `TextProps`            | `undefined` | Props passed to the label Text component  |
| `isRequire`      | `boolean`              | `undefined` | Show asterisk beside label for required   |

#### Helper & Error Text Props

| Prop              | Type        | Default     | Description                                |
| ----------------- | ----------- | ----------- | ------------------------------------------ |
| `helperText`      | `string`    | `undefined` | Helper text displayed below the code input |
| `helperComponent` | `ReactNode` | `undefined` | Custom helper component to replace default |
| `helperTextProps` | `TextProps` | `undefined` | Props passed to the helper text component  |
| `errorText`       | `string`    | `undefined` | Error text displayed below the code input  |
| `errorProps`      | `TextProps` | `undefined` | Props passed to the error text component   |

#### State Props

| Prop      | Type      | Default     | Description                  |
| --------- | --------- | ----------- | ---------------------------- |
| `error`   | `boolean` | `undefined` | Enable error state styling   |
| `success` | `boolean` | `undefined` | Enable success state styling |

#### Component Props

| Prop             | Type        | Default     | Description                                    |
| ---------------- | ----------- | ----------- | ---------------------------------------------- |
| `leftComponent`  | `ReactNode` | `undefined` | React node rendered on the left side of input  |
| `rightComponent` | `ReactNode` | `undefined` | React node rendered on the right side of input |

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

### Error State Handling

```tsx
const CodeInputWithError = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    // Clear error when user types
    if (error) {
      setError(false)
      setErrorMessage('')
    }
  }

  const handleCodeSubmit = async (finalCode: string) => {
    try {
      await verifyCode(finalCode)
      // Success handling
      navigation.navigate('Success')
    } catch (err) {
      setError(true)
      setErrorMessage('Invalid code. Please try again.')
      setCode('')
    }
  }

  return (
    <CodeInput
      length={6}
      value={code}
      onChangeText={handleCodeChange}
      onSubmit={handleCodeSubmit}
      error={error}
      errorText={errorMessage}
      errorCellStyle={styles.errorCell}
      label="Verification Code"
      isRequire={true}
      helperText="Enter the 6-digit code sent to your phone"
    />
  )
}

const styles = StyleSheet.create({
  errorCell: {
    borderColor: '#FF3B30',
    borderWidth: 2,
    backgroundColor: '#FFF5F5',
  },
})
```

### Success State Handling

```tsx
const CodeInputWithSuccess = () => {
  const [code, setCode] = useState('')
  const [success, setSuccess] = useState(false)

  const handleCodeSubmit = async (finalCode: string) => {
    const isValid = await verifyCode(finalCode)

    if (isValid) {
      setSuccess(true)
      setTimeout(() => {
        navigation.navigate('NextScreen')
      }, 1000)
    }
  }

  return (
    <CodeInput
      length={6}
      value={code}
      onChangeText={setCode}
      onSubmit={handleCodeSubmit}
      success={success}
      successCellStyle={styles.successCell}
      label="Verification Code"
      disabled={success}
    />
  )
}

const styles = StyleSheet.create({
  successCell: {
    borderColor: '#34C759',
    borderWidth: 2,
    backgroundColor: '#F0FFF4',
  },
})
```

### With Left & Right Components

```tsx
import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CodeInputWithComponents = () => {
  const [code, setCode] = useState('')

  const handleClear = () => {
    setCode('')
  }

  return (
    <CodeInput
      length={6}
      value={code}
      onChangeText={setCode}
      leftComponent={<Icon name="lock-closed" size={24} color="#666" style={{marginRight: 8}} />}
      rightComponent={
        code.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={{marginLeft: 8}}>
            <Icon name="close-circle" size={24} color="#999" />
          </TouchableOpacity>
        )
      }
    />
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
      labelStyle: {
        // Label text styling
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
      },
      errorCellStyle: {
        // Style for cells in error state
        borderColor: '#FF3B30',
        borderWidth: 2,
      },
      successCellStyle: {
        // Style for cells in success state
        borderColor: '#34C759',
        borderWidth: 2,
      },
      disabledCellStyle: {
        // Style for cells in disabled state
        opacity: 0.5,
        backgroundColor: '#F5F5F5',
      },
      secureTextEntry: false, // Secure input mode
      keyboardType: 'number-pad', // Keyboard type
      autoFocus: false, // Auto focus behavior
      disabled: false, // Disabled state
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
  filledCellStyle: {
    borderColor: '#007AFF',       // Highlight when filled
  },
  focusCellStyle: {
    borderColor: '#007AFF',       // Highlight when focused
    borderWidth: 2,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',            // base.colors.black
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',            // Label text color
  },
  errorCellStyle: {
    borderColor: '#FF3B30',      // Error state
    borderWidth: 2,
  },
  successCellStyle: {
    borderColor: '#34C759',      // Success state
    borderWidth: 2,
  },
  disabledCellStyle: {
    opacity: 0.5,                // Disabled state
    backgroundColor: '#F5F5F5',
  },
  secureTextEntry: false,
  keyboardType: 'number-pad',
  autoFocus: false,
  disabled: false,
  placeholderTextColor: '#999999',
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
