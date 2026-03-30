import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const VariantsDemo = () => {
  const [outlinedValue, setOutlinedValue] = useState('')
  const [flatValue, setFlatValue] = useState('')
  const [defaultValue, setDefaultValue] = useState('')

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎭 TextInput Variants</Text>
      <Text style={demoStyles.sectionDescription}>
        Different visual styles: Default, Outlined, and Flat
      </Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Default Style</Text>
        <TextInput
          label="Default TextInput"
          placeholder="This is the default style"
          value={defaultValue}
          onChangeText={setDefaultValue}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Variant Comparison</Text>
        <View style={demoStyles.variantComparison}>
          <View style={demoStyles.variantItem}>
            <Text style={demoStyles.variantLabel}>Outlined</Text>
            <TextInput.Outlined
              label="Outlined Input"
              placeholder="Outlined style"
              value={outlinedValue}
              onChangeText={setOutlinedValue}
            />
          </View>

          <View style={demoStyles.variantItem}>
            <Text style={demoStyles.variantLabel}>Flat</Text>
            <TextInput.Flat
              label="Flat Input"
              placeholder="Flat style"
              value={flatValue}
              onChangeText={setFlatValue}
            />
          </View>
        </View>
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Outlined with Error</Text>
        <TextInput.Outlined
          label="Email Address"
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          errorText="Please enter a valid email address"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Flat with Icon</Text>
        <TextInput.Flat
          label="Search"
          placeholder="Search here..."
          leftComponent={
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 16 }}>🔍</Text>
            </View>
          }
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>All Variants with Required Field</Text>
        <View style={{ gap: 16 }}>
          <TextInput
            label="Default Required"
            placeholder="Default style"
            isRequire
          />

          <TextInput.Outlined
            label="Outlined Required"
            placeholder="Outlined style"
            isRequire
          />

          <TextInput.Flat
            label="Flat Required"
            placeholder="Flat style"
            isRequire
          />
        </View>
      </View>
    </View>
  )
}
