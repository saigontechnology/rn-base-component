import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles, customCellStyles } from './styles'

export const SecurityAndStyling = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🔐 Security & Styling</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Secure Text Entry</Text>
        <CodeInput
          length={6}
          label="Password"
          secureTextEntry
          helperText="Characters are hidden for security"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Placeholder as Dots</Text>
        <CodeInput
          length={6}
          label="Code Entry"
          placeholderAsDot
          helperText="Empty cells show as dots"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Custom Placeholder</Text>
        <CodeInput
          length={4}
          label="Custom Placeholder"
          placeholder="*"
          helperText="Custom placeholder character"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Custom Cell Styling</Text>
        <CodeInput
          length={4}
          label="Styled Cells"
          cellStyle={customCellStyles.customCell}
          focusCellStyle={customCellStyles.customFocusCell}
          textStyle={customCellStyles.customText}
        />
      </View>
    </View>
  )
}
