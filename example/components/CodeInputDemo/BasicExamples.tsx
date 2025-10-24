import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const BasicExamples = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>📝 Basic Examples</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Default with Label</Text>
        <CodeInput length={4} label="PIN Code" helperText="Enter your 4-digit PIN" />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Required Field</Text>
        <CodeInput
          length={6}
          label="Verification Code"
          isRequire
          helperText="This field is required"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Different Length (5 digits)</Text>
        <CodeInput length={5} label="Security Code" placeholder="0" />
      </View>
    </View>
  )
}
