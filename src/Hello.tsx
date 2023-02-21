/**
 * Created by NL on 04/01/2023.
 */
// src/Hello.tsx
import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {useComponentTheme} from './theme'

export interface IHello {
  name: string
  enthusiasmLevel?: number
}

const Hello = (props: IHello) => {
  const theme = useComponentTheme('Hello')
  const [enthusiasmLevel, setEnthusiasmLevel] = useState<number>(props.enthusiasmLevel || 1)

  useEffect(() => {
    if ((enthusiasmLevel || 0) <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }
  }, [enthusiasmLevel])

  const onIncrement = () => setEnthusiasmLevel(prev => prev + 1)
  const onDecrement = () => setEnthusiasmLevel(prev => prev - 1)
  const getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!')

  return (
    <View style={styles.root}>
      <Text style={[styles.greeting, {color: theme ? theme.text : styles.greeting.color}]}>
        Hello {props.name + getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="-" onPress={onDecrement} accessibilityLabel="decrement" color="red" />
        </View>
        <View style={styles.button}>
          <Button title="+" onPress={onIncrement} accessibilityLabel="increment" color="blue" />
        </View>
      </View>
    </View>
  )
}

export default Hello

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
})
