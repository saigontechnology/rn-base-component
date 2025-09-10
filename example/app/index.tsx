import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, CountDown } from 'rn-base-component'
import dayjs from 'dayjs'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Button>Test 123</Button>
      <CountDown
      countDownTo={
        dayjs('2025-09-11T00:00:00')
      }
      timeToShow={['D', 'H', 'M', 'S']}
      showLabels={true}
      separator=" : "
      fontSize={20}
      onFinish={() => alert('Happy New Year!')}
    />
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