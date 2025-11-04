import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const ValidationStates = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [age, setAge] = useState('')

  // Validation logic
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPassword = (password: string) => {
    return password.length >= 8
  }

  const doPasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword && confirmPassword.length > 0
  }

  const isValidAge = (age: string) => {
    const ageNum = parseInt(age)
    return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120
  }

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>✅ Validation States</Text>
      <Text style={demoStyles.sectionDescription}>
        TextInput with error states and validation feedback
      </Text>

      <View style={demoStyles.validationContainer}>
        <View style={demoStyles.example}>
          <Text style={demoStyles.exampleTitle}>Email Validation</Text>
          <TextInput
            label="Email Address"
            placeholder="Enter a valid email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            errorText={
              email && !isValidEmail(email)
                ? 'Please enter a valid email address'
                : undefined
            }
          />
          {email && isValidEmail(email) && (
            <View style={[demoStyles.validationResult, demoStyles.validationSuccess]}>
              <Text style={[demoStyles.validationText, demoStyles.validationTextSuccess]}>
                ✓ Valid email address
              </Text>
            </View>
          )}
        </View>

        <View style={demoStyles.example}>
          <Text style={demoStyles.exampleTitle}>Password Strength</Text>
          <TextInput
            label="Password"
            placeholder="Minimum 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorText={
              password && !isValidPassword(password)
                ? 'Password must be at least 8 characters long'
                : undefined
            }
          />
          {password && isValidPassword(password) && (
            <View style={[demoStyles.validationResult, demoStyles.validationSuccess]}>
              <Text style={[demoStyles.validationText, demoStyles.validationTextSuccess]}>
                ✓ Strong password
              </Text>
            </View>
          )}
        </View>

        <View style={demoStyles.example}>
          <Text style={demoStyles.exampleTitle}>Password Confirmation</Text>
          <TextInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            errorText={
              confirmPassword && !doPasswordsMatch(password, confirmPassword)
                ? 'Passwords do not match'
                : undefined
            }
          />
          {confirmPassword && doPasswordsMatch(password, confirmPassword) && (
            <View style={[demoStyles.validationResult, demoStyles.validationSuccess]}>
              <Text style={[demoStyles.validationText, demoStyles.validationTextSuccess]}>
                ✓ Passwords match
              </Text>
            </View>
          )}
        </View>

        <View style={demoStyles.example}>
          <Text style={demoStyles.exampleTitle}>Age Validation</Text>
          <TextInput
            label="Age"
            placeholder="Enter your age (18-120)"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            errorText={
              age && !isValidAge(age)
                ? 'Please enter a valid age between 18 and 120'
                : undefined
            }
          />
          {age && isValidAge(age) && (
            <View style={[demoStyles.validationResult, demoStyles.validationSuccess]}>
              <Text style={[demoStyles.validationText, demoStyles.validationTextSuccess]}>
                ✓ Valid age
              </Text>
            </View>
          )}
        </View>

        <View style={demoStyles.example}>
          <Text style={demoStyles.exampleTitle}>Always Show Error</Text>
          <TextInput
            label="Error Example"
            placeholder="This will always show an error"
            errorText="This is a permanent error message for demonstration"
          />
        </View>
      </View>
    </View>
  )
}
