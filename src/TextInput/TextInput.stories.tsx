// stories/MyButton.stories.tsx
import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {TextInput} from './TextInput'
import {ScrollView, StyleSheet, View} from 'react-native'

export default {
  title: 'components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

export const TextInputComponent: ComponentStory<typeof TextInput> = () => {
  return (
    <ScrollView>
      <TextInput label={'Password'} isRequire autoFocus secureTextEntry />
      <View style={styles.spacingTop} />
      <TextInput label={'Multiline'} autoCapitalize={'words'} autoCorrect multiline iconPosition="left" />
      <View style={styles.spacingTop} />
      <TextInput label={'Icon left'} autoCapitalize={'words'} autoCorrect iconPosition="left" />
      <View style={styles.spacingTop} />
      <TextInput label={'Icon right'} autoCapitalize={'words'} autoCorrect iconPosition="right" />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Error message'}
        autoCapitalize={'words'}
        autoCorrect
        errorText={'Error message'}
        iconPosition="left"
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Custom TextInput'}
        autoCapitalize={'words'}
        inputContainerStyle={styles.background}
        iconPosition="right"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  spacingTop: {
    marginVertical: 10,
  },
  background: {
    backgroundColor: '#e6e0ec',
  },
})
