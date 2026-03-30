import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const IconsAndComponents = () => {
  const [searchText, setSearchText] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const SearchIcon = () => (
    <View style={{ paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 16 }}>🔍</Text>
    </View>
  )

  const PhoneIcon = () => (
    <View style={{ paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 16 }}>📞</Text>
    </View>
  )

  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <TouchableOpacity
      onPress={() => setIsPasswordVisible(!visible)}
      style={{ paddingHorizontal: 8 }}
    >
      <Text style={{ fontSize: 16 }}>{visible ? '👁️' : '🙈'}</Text>
    </TouchableOpacity>
  )

  const ClearButton = ({ onClear }: { onClear: () => void }) => (
    <TouchableOpacity onPress={onClear} style={{ paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 16 }}>❌</Text>
    </TouchableOpacity>
  )

  const UnitLabel = ({ unit }: { unit: string }) => (
    <View style={{ paddingHorizontal: 8, backgroundColor: '#f0f0f0', borderRadius: 4, paddingVertical: 2 }}>
      <Text style={{ fontSize: 12, color: '#666' }}>{unit}</Text>
    </View>
  )

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎨 Icons and Components</Text>
      <Text style={demoStyles.sectionDescription}>
        TextInput with left and right components for enhanced UX
      </Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Search Input with Icon</Text>
        <TextInput
          label="Search"
          placeholder="Search for something..."
          value={searchText}
          onChangeText={setSearchText}
          leftComponent={<SearchIcon />}
          rightComponent={
            searchText ? <ClearButton onClear={() => setSearchText('')} /> : undefined
          }
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Phone Number Input</Text>
        <TextInput
          label="Phone Number"
          placeholder="(123) 456-7890"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          leftComponent={<PhoneIcon />}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Password with Visibility Toggle</Text>
        <TextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          rightComponent={<EyeIcon visible={isPasswordVisible} />}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Weight Input with Unit</Text>
        <TextInput
          label="Weight"
          placeholder="Enter weight"
          keyboardType="numeric"
          rightComponent={<UnitLabel unit="kg" />}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Price Input with Currency</Text>
        <TextInput
          label="Price"
          placeholder="0.00"
          keyboardType="numeric"
          leftComponent={<UnitLabel unit="$" />}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Complex Example - Email with Actions</Text>
        <TextInput
          label="Email Address"
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          leftComponent={
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 16 }}>✉️</Text>
            </View>
          }
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 16 }}>📎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 16 }}>⚙️</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  )
}
