import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const DisabledState = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🚫 Disabled State</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Pre-filled Disabled Input</Text>
        <CodeInput
          length={6}
          label="Submitted Code"
          value="987654"
          disabled
          helperText="This code has already been submitted"
        />
      </View>
    </View>
  )
}
