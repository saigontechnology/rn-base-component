import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const DisabledState = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🚫 Disabled States</Text>
      <Text style={demoStyles.sectionDescription}>
        TextInput in disabled state for read-only scenarios
      </Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled Default Input</Text>
        <TextInput
          label="Disabled Field"
          placeholder="This input is disabled"
          editable={false}
          value="This field is read-only"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled Outlined Input</Text>
        <TextInput.Outlined
          label="Read-only Email"
          placeholder="user@example.com"
          editable={false}
          value="user@example.com"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled Flat Input</Text>
        <TextInput.Flat
          label="Read-only Name"
          placeholder="John Doe"
          editable={false}
          value="John Doe"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled with Required Indicator</Text>
        <TextInput
          label="Required but Disabled"
          placeholder="This is required but disabled"
          isRequire
          editable={false}
          value="Pre-filled value"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled with Icons</Text>
        <TextInput
          label="Contact Info"
          placeholder="Contact information"
          editable={false}
          value="+1 (555) 123-4567"
          leftComponent={
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 16 }}>📞</Text>
            </View>
          }
          rightComponent={
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
          }
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Disabled Multiline Input</Text>
        <TextInput
          label="Read-only Description"
          placeholder="Description"
          editable={false}
          multiline
          numberOfLines={3}
          value="This is a multi-line read-only text field that contains some example content to demonstrate how disabled multiline inputs appear in the interface."
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Comparison: Enabled vs Disabled</Text>
        <View style={{ gap: 12 }}>
          <TextInput
            label="Enabled Input"
            placeholder="You can type here"
            value=""
          />

          <TextInput
            label="Disabled Input"
            placeholder="You cannot type here"
            editable={false}
            value="Disabled content"
          />
        </View>
      </View>
    </View>
  )
}
