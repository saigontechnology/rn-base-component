import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React, {useRef, useState} from 'react'
import {Text, TextInput} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomSheet, Button} from 'rn-base-component'
import type {BottomSheetMethods} from 'src/components/BottomSheet/types'

export default {
  title: 'components/BottomSheet',
  component: BottomSheet,
} as ComponentMeta<typeof BottomSheet>

export const Basic: ComponentStory<typeof BottomSheet> = rest => {
  const ref = useRef<BottomSheetMethods>(null)
  const insets = useSafeAreaInsets()

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button text="Open Bottom Sheet" onPress={() => ref?.current?.open?.()} />

      <BottomSheet
        {...rest}
        ref={ref}
        isVisible={isVisible}
        onChangeValue={setIsVisible}
        bottomInset={insets.bottom}
        title="Header">
        <Text>Header</Text>
        <TextInput placeholder="Search" />
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>footer</Text>
      </BottomSheet>
    </>
  )
}

export const ContentHeight: ComponentStory<typeof BottomSheet> = rest => {
  const ref = useRef<BottomSheetMethods>(null)
  const insets = useSafeAreaInsets()

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button text="Open Bottom Sheet" onPress={() => ref?.current?.open?.()} />

      <BottomSheet
        {...rest}
        ref={ref}
        isVisible={isVisible}
        onChangeValue={setIsVisible}
        bottomInset={insets.bottom}
        title="Header">
        <Text>Header</Text>
        <TextInput placeholder="Search" />
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>footer</Text>
      </BottomSheet>
    </>
  )
}

Basic.args = {}

ContentHeight.args = {
  contentHeight: 400,
}
