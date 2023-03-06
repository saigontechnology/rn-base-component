import React, {useRef, useState} from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import TextInput, {TextInputRef} from './TextInput'
import {ScrollView, StyleSheet, View} from 'react-native'
import {metrics} from '../helpers/metrics'

export default {
  title: 'components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

export const TextInputComponent: ComponentStory<typeof TextInput> = () => {
  const [text, setText] = useState<string>('')
  const [text1, setText1] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  const [text3, setText3] = useState<string>('')
  const [isShowPasswordText3, setIsShowPasswordText3] = useState<boolean>(false)
  const [isShowPasswordText1, setIsShowPasswordText1] = useState<boolean>(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const showPasswordIcon = require('../assets/show-password.png')
  const hidePasswordIcon = require('../assets/hide-password.png')
  const inputRef = useRef<TextInputRef>(null)
  const inputRef1 = useRef<TextInputRef>(null)

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
      <View style={{marginBottom: 20}} />
      <TextInput.Float
        ref={inputRef1}
        label={'None mode'}
        value={text2}
        leftComponent={
          <TextInput.Icon
            source={require('../assets/folder-search.png')}
            onPress={() => inputRef1.current?.focus()}
          />
        }
        onChangeText={setText2}
        containerStyle={{marginHorizontal: 20}}
      />
      <View style={{marginBottom: 50}} />
      <TextInput.Float
        label={'Flat mode with multiline'}
        value={text}
        mode={'Flat'}
        onChangeText={setText}
        multiline
        containerStyle={{marginHorizontal: 20}}
        errorText={'Error message'}
      />
      <View style={{marginBottom: 50}} />
      <TextInput.Float
        label={'Flat mode'}
        value={text3}
        mode={'Flat'}
        onChangeText={setText3}
        secureTextEntry={!isShowPasswordText3}
        rightComponent={
          <TextInput.Icon
            source={isShowPasswordText3 ? hidePasswordIcon : showPasswordIcon}
            size={25}
            resizeMode={'cover'}
            onPress={() => setIsShowPasswordText3(!isShowPasswordText3)}
          />
        }
        containerStyle={{marginHorizontal: 20}}
        errorText={'Error message'}
      />
      <View style={{marginBottom: 20}} />
      <TextInput.Float
        label={'Outlined mode'}
        value={text1}
        mode={'Outlined'}
        secureTextEntry={!isShowPasswordText1}
        onChangeText={setText1}
        rightComponent={
          <TextInput.Icon
            source={isShowPasswordText1 ? hidePasswordIcon : showPasswordIcon}
            size={25}
            resizeMode={'cover'}
            onPress={() => setIsShowPasswordText1(!isShowPasswordText1)}
          />
        }
        containerStyle={{marginHorizontal: 20}}
        errorText={'Error message'}
      />
      <View style={{marginBottom: 10}} />
      <TextInput
        ref={inputRef}
        label={'Password'}
        isRequire
        autoFocus
        inputContainerStyle={{borderWidth: 1, borderColor: 'black', borderRadius: 6}}
        secureTextEntry={!isShowPassword}
        rightComponent={
          <TextInput.Icon
            source={isShowPassword ? hidePasswordIcon : showPasswordIcon}
            size={25}
            resizeMode={'cover'}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
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
        inputContainerStyle={[{minHeight: metrics.xl, borderWidth: 0, borderBottomWidth: 1}]}
        containerStyle={{marginHorizontal: 20}}
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
