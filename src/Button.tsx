import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {metrics} from './helpers/metrics'

export type ButtonProps = {
  onPress: () => void
  text: string
  color?: string
  textColor?: string
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: metrics.xxs,
    paddingHorizontal: metrics.small,
    borderRadius: metrics.borderRadius,
    alignSelf: 'flex-start',
    flexGrow: 0,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: 'white',
    fontSize: metrics.span,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
})

const Button: React.FC<ButtonProps> = ({text, onPress, color, textColor}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.button, !!color && {backgroundColor: color}]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.buttonText, !!textColor && {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  </View>
)

export default Button
