import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const BasicExamples = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>📝 Basic Examples</Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Default TextInput</Text>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Required Field with Label</Text>
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          isRequire
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>With Placeholder and Keyboard Type</Text>
        <TextInput
          label="Phone Number"
          placeholder="(123) 456-7890"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Password Input</Text>
        <TextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          isRequire
        />
      </View>
    </View>
  )
}
