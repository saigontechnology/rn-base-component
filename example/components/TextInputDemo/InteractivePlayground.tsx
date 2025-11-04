import React, { useRef, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { ButtonPrimary, TextInput, TextInputRef } from 'rn-base-component'
import { demoStyles } from './styles'

export const InteractivePlayground = () => {
  const playgroundRef = useRef<TextInputRef>(null)
  const [playgroundValue, setPlaygroundValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(false)

  const handlePlaygroundChange = (text: string) => {
    setPlaygroundValue(text)
  }

  const handlePlaygroundSubmit = () => {
    Alert.alert('Text Submitted', `You entered: ${playgroundValue}`)
    setHasError(false)
  }

  const toggleError = () => {
    setHasError(!hasError)
  }

  const toggleDisabled = () => setIsDisabled(!isDisabled)
  const toggleRequired = () => setIsRequired(!isRequired)

  const clearInput = () => {
    playgroundRef.current?.clear()
    setPlaygroundValue('')
    setHasError(false)
  }

  const focusInput = () => {
    playgroundRef.current?.focus()
  }

  const blurInput = () => {
    playgroundRef.current?.blur()
  }

  const getCurrentValue = () => {
    Alert.alert('Current Value', playgroundValue || '(empty)')
  }

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎮 Interactive Playground</Text>
      <Text style={demoStyles.sectionDescription}>
        Experiment with different TextInput states and behaviors
      </Text>

      <View style={demoStyles.playground}>
        <Text style={demoStyles.playgroundTitle}>Playground Controls</Text>

        <View style={demoStyles.playgroundControls}>
          <TouchableOpacity
            style={[demoStyles.controlButton, hasError && demoStyles.controlButtonDanger]}
            onPress={toggleError}
          >
            <Text style={demoStyles.controlButtonText}>
              {hasError ? 'Remove Error' : 'Add Error'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={demoStyles.controlButton} onPress={toggleDisabled}>
            <Text style={demoStyles.controlButtonText}>
              {isDisabled ? 'Enable' : 'Disable'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={demoStyles.controlButton} onPress={toggleRequired}>
            <Text style={demoStyles.controlButtonText}>
              {isRequired ? 'Optional' : 'Required'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={demoStyles.playgroundControls}>
          <TouchableOpacity style={demoStyles.controlButton} onPress={focusInput}>
            <Text style={demoStyles.controlButtonText}>Focus</Text>
          </TouchableOpacity>

          <TouchableOpacity style={demoStyles.controlButton} onPress={blurInput}>
            <Text style={demoStyles.controlButtonText}>Blur</Text>
          </TouchableOpacity>

          <TouchableOpacity style={demoStyles.controlButton} onPress={clearInput}>
            <Text style={demoStyles.controlButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={demoStyles.controlButton} onPress={getCurrentValue}>
            <Text style={demoStyles.controlButtonText}>Get Value</Text>
          </TouchableOpacity>
        </View>

        <View style={demoStyles.componentWrapper}>
          <TextInput
            ref={playgroundRef}
            label="Interactive Input"
            placeholder="Type something here..."
            value={playgroundValue}
            onChangeText={handlePlaygroundChange}
            onSubmitEditing={handlePlaygroundSubmit}
            editable={!isDisabled}
            isRequire={isRequired}
            errorText={hasError ? 'This is an example error message' : undefined}
            inputContainerStyle={{ backgroundColor: 'white' }}
          />
        </View>

        <View style={demoStyles.statusContainer}>
          <Text style={demoStyles.statusText}>Current Status:</Text>
          <Text style={demoStyles.statusValue}>
            Value: &quot;{playgroundValue}&quot; | Length: {playgroundValue.length} | Error: {hasError ? 'Yes' : 'No'} | Disabled: {isDisabled ? 'Yes' : 'No'}
          </Text>
        </View>

        <ButtonPrimary
          onPress={handlePlaygroundSubmit}
          disabled={!playgroundValue.trim()}
        >
          Submit Text
        </ButtonPrimary>
      </View>
    </View>
  )
}
