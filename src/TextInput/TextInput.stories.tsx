import React, {useState} from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import TextInput from './TextInput'
import {ScrollView, StyleSheet, View} from 'react-native'

export default {
  title: 'components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

export const TextInputComponent: ComponentStory<typeof TextInput> = () => {
  const [text, setText] = useState<string>('')

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 100}}>
      <View style={{marginTop: 50}} />
      <TextInput.Flat
        label={'Icon left'}
        value={text}
        onChangeText={setText}
        autoCapitalize={'words'}
        autoCorrect
        leftComponent={<TextInput.Icon source={require('../assets/folder-search.png')} />}
        containerStyle={{marginHorizontal: 20}}
        errorText={'sadasdsadsa'}
      />
      <View style={{marginBottom: 10}} />
      <TextInput
        label={'Password'}
        isRequire
        autoFocus
        inputContainerStyle={{borderWidth: 1, borderColor: 'black', borderRadius: 6}}
        secureTextEntry
        containerStyle={{marginHorizontal: 20}}
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Multiline'}
        autoCapitalize={'words'}
        autoCorrect
        multiline
        containerStyle={{marginHorizontal: 20}}
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Icon left'}
        autoCapitalize={'words'}
        autoCorrect
        containerStyle={{marginHorizontal: 20}}
        inputContainerStyle={{borderWidth: 1, borderColor: 'black', borderRadius: 6}}
        leftComponent={<TextInput.Icon source={require('../assets/folder-search.png')} />}
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Icon right'}
        autoCapitalize={'words'}
        autoCorrect
        containerStyle={{marginHorizontal: 20}}
        rightComponent={<TextInput.Icon source={require('../assets/folder-search.png')} />}
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Error message'}
        autoCapitalize={'words'}
        autoCorrect
        errorText={'Error message'}
        containerStyle={{marginHorizontal: 20}}
      />
      <View style={styles.spacingTop} />
      <TextInput
        label={'Custom TextInput'}
        autoCapitalize={'words'}
        inputContainerStyle={styles.background}
        containerStyle={{marginHorizontal: 20}}
        leftComponent={<TextInput.Icon source={require('../assets/folder-search.png')} />}
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
