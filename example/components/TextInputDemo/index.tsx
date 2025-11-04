import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { demoStyles } from './styles'
import { InteractivePlayground } from './InteractivePlayground'
import { BasicExamples } from './BasicExamples'
import { ValidationStates } from './ValidationStates'
import { IconsAndComponents } from './IconsAndComponents'
import { VariantsDemo } from './VariantsDemo'
import { MultilineDemo } from './MultilineDemo'
import { DisabledState } from './DisabledState'

export const TextInputDemo = () => {
  return (
    <ScrollView style={demoStyles.container} contentContainerStyle={demoStyles.contentContainer}>
      <Text style={demoStyles.mainTitle}>TextInput Component Demo</Text>

      <InteractivePlayground />
      <BasicExamples />
      <ValidationStates />
      <IconsAndComponents />
      <VariantsDemo />
      <MultilineDemo />
      <DisabledState />

      <View style={demoStyles.footer}>
        <Text style={demoStyles.footerText}>🎯 Explore all TextInput features above!</Text>
      </View>
    </ScrollView>
  )
}
