import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React, {useRef} from 'react'
import {Text, TextInput} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomSheet, Button} from 'rn-base-component'
import type {BottomSheetMethods} from 'src/components/BottomSheet/types'

export default {
  title: 'components/BottomSheet',
  component: BottomSheet,
} as ComponentMeta<typeof BottomSheet>

export const Basic: ComponentStory<typeof BottomSheet> = args => {
  const ref = useRef<BottomSheetMethods>(null)
  const insets = useSafeAreaInsets()

  return (
    <>
      <Button text="Open Bottom Sheet" onPress={() => ref?.current?.open?.()} />

      <BottomSheet
        {...args}
        ref={ref}
        topInset={insets.top}
        bottomInset={insets.bottom}
        snapPoints={[200, 500]}
        index={0}
        style={{
          width: '100%',
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <Text>Header</Text>
        <TextInput placeholder="Search" />
        <Text>Content</Text>
        <Text>footer</Text>
      </BottomSheet>
    </>
  )
}

Basic.args = {}
