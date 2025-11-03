import React, { useRef, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, CodeInput, CodeInputRef } from 'rn-base-component'
import { demoStyles } from './styles'

export const InteractivePlayground = () => {
  const playgroundRef = useRef<CodeInputRef>(null)
  const [playgroundValue, setPlaygroundValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [hasSuccess, setHasSuccess] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isSecure, setIsSecure] = useState(false)

  const handlePlaygroundChange = (code: string) => {
    setPlaygroundValue(code)
  }

  const handlePlaygroundSubmit = (code: string) => {
    Alert.alert('Code Submitted', `You entered: ${code}`)
    setHasSuccess(true)
    setHasError(false)
  }

  const toggleError = () => {
    setHasError(!hasError)
    setHasSuccess(false)
  }

  const toggleSuccess = () => {
    setHasSuccess(!hasSuccess)
    setHasError(false)
  }

  const toggleDisabled = () => setIsDisabled(!isDisabled)
  const toggleSecure = () => setIsSecure(!isSecure)

  const clearInput = () => {
    playgroundRef.current?.clear()
    setPlaygroundValue('')
    setHasError(false)
    setHasSuccess(false)
  }

  const getCurrentValue = () => {
    const value = playgroundRef.current?.getValue()
    Alert.alert('Current Value', value || '(empty)')
  }

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎮 Interactive Playground</Text>
      <Text style={demoStyles.sectionDescription}>
        Test different states and configurations
      </Text>

      <CodeInput
        ref={playgroundRef}
        length={6}
        value={playgroundValue}
        onChangeText={handlePlaygroundChange}
        onSubmit={handlePlaygroundSubmit}
        label="Verification Code"
        helperText="Enter 6-digit code to test different states"
        error={hasError}
        errorText={hasError ? 'Invalid code. Please try again.' : undefined}
        success={hasSuccess}
        disabled={isDisabled}
        secureTextEntry={isSecure}
        autoFocus={false}
      />

      <View style={demoStyles.controlButtons}>
        <Button onPress={toggleError} style={demoStyles.smallButton}>
          {hasError ? 'Remove Error' : 'Show Error'}
        </Button>
        <Button onPress={toggleSuccess} style={demoStyles.smallButton}>
          {hasSuccess ? 'Remove Success' : 'Show Success'}
        </Button>
        <Button onPress={toggleDisabled} style={demoStyles.smallButton}>
          {isDisabled ? 'Enable' : 'Disable'}
        </Button>
        <Button onPress={toggleSecure} style={demoStyles.smallButton}>
          {isSecure ? 'Show Text' : 'Hide Text'}
        </Button>
        <Button onPress={clearInput} style={demoStyles.smallButton}>
          Clear
        </Button>
        <Button onPress={getCurrentValue} style={demoStyles.smallButton}>
          Get Value
        </Button>
      </View>
    </View>
  )
}
