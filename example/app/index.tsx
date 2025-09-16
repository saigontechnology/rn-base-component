import React, { useRef } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, CountDown, CountDownRef } from 'rn-base-component'

const HomeScreen = () => {
  const countdownRef = useRef<CountDownRef>(null)
  const handleRestart = () => {
    countdownRef.current?.restart()
  }
  const handleStop = () => {
    countdownRef.current?.stopCountDown()
  }
  const handleGetCurrentTime = () => {
    console.log(countdownRef.current?.getCurrentTime())
    Alert.alert('Current Time', countdownRef.current?.getCurrentTime().toString() || '0')
  }
  const handleResume = () => {
    countdownRef.current?.resumeCountDown()
  }
  const handleGetCountDownStatus = () => {
    Alert.alert('Countdown Status', countdownRef.current?.getCountDownStatus() || '0')
  }
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <View style={styles.buttonContainer}> 
        <Button onPress={handleRestart}>Reset Countdown</Button>
        <Button onPress={handleStop}>Stop Countdown</Button>
        <Button onPress={handleResume}>Resume Countdown</Button>
        <Button onPress={handleGetCurrentTime}>Get Current Time</Button>
        <Button onPress={handleGetCountDownStatus}>Get Countdown Status</Button>
      </View>
      <CountDown
      ref={countdownRef}  
      // countDownTo={
      //   dayjs('2025-09-11T00:00:00')
      // }
      value={120}
      // timeToShow={['D', 'H', 'M', 'S']}
      showLabels={true}
      separator=" : "
      // fontSize={20}
      // onFinish={() => alert('Happy New Year!')}
      textStyle={{color:'red', fontSize:35, fontFamily:'Arial'}}
      unitTextStyle={{color:'blue', fontSize:30, fontFamily:'Arial'}}
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
  buttonContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})