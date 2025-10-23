import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const AdditionalFeatures = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>💭 Additional Features</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>With Cursor Animation</Text>
        <CodeInput
          length={6}
          label="Code Input"
          withCursor
          helperText="Shows blinking cursor in focused cell"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Auto Focus Enabled</Text>
        <CodeInput
          length={4}
          label="Auto Focus"
          autoFocus={false}
          helperText="Keyboard appears automatically (autoFocus can be true)"
        />
      </View>
    </View>
  )
}
