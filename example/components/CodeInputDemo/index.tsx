import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { demoStyles } from './styles'
import { InteractivePlayground } from './InteractivePlayground'
import { BasicExamples } from './BasicExamples'
import { ValidationStates } from './ValidationStates'
import { IconsAndComponents } from './IconsAndComponents'
import { SecurityAndStyling } from './SecurityAndStyling'
import { AdvancedCellStyling } from './AdvancedCellStyling'
import { DisabledState } from './DisabledState'
import { AdditionalFeatures } from './AdditionalFeatures'

export const CodeInputDemo = () => {
  return (
    <ScrollView style={demoStyles.container} contentContainerStyle={demoStyles.contentContainer}>
      <Text style={demoStyles.mainTitle}>CodeInput Component Demo</Text>

      <InteractivePlayground />
      <BasicExamples />
      <ValidationStates />
      <IconsAndComponents />
      <SecurityAndStyling />
      <AdvancedCellStyling />
      <DisabledState />
      <AdditionalFeatures />

      <View style={demoStyles.footer}>
        <Text style={demoStyles.footerText}>🎯 Explore all CodeInput features above!</Text>
      </View>
    </ScrollView>
  )
}
