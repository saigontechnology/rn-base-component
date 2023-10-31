/**
 * Created by NL on 10/31/23.
 */
import React from 'react'
import {
  Pressable as RNPressable,
  type PressableProps as PressableProperties,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'

type PressableProps = {
  style: StyleProp<ViewStyle>
} & PressableProperties

export const Pressable: React.FC<PressableProps> = ({style, ...props}) => {
  return (
    <RNPressable style={styles.container} {...props}>
      <Text>Pressable</Text>
    </RNPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
