import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const ValidationStates = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>✓ Validation States</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Success State</Text>
        <CodeInput
          length={6}
          label="Verification Code"
          value="123456"
          success
          helperText="Code verified successfully!"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Error State</Text>
        <CodeInput
          length={6}
          label="Verification Code"
          value="1234"
          error
          errorText="Invalid code. Please check and try again."
        />
      </View>
    </View>
  )
}
