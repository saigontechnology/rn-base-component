import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'rn-base-component'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Button>Test 123</Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})