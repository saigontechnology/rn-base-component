import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles } from './styles'
import { LockIcon, CheckIcon, ClearButton } from './utils'

export const IconsAndComponents = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎨 Icons & Components</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Left Icon Component</Text>
        <CodeInput
          length={4}
          label="Secure PIN"
          leftComponent={<LockIcon />}
          secureTextEntry
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Right Icon Component</Text>
        <CodeInput
          length={6}
          label="Verification Code"
          value="123456"
          rightComponent={<CheckIcon />}
          success
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Both Left & Right Components</Text>
        <CodeInput
          length={4}
          label="PIN Code"
          leftComponent={<LockIcon />}
          rightComponent={<ClearButton />}
          helperText="Tap X to clear"
        />
      </View>
    </View>
  )
}
