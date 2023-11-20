import React, {useEffect, useRef, useState} from 'react'
import {AppState, type StyleProp, type ViewStyle, type TextStyle} from 'react-native'
import styled from 'styled-components/native'

type FormatTime = 'MM:SS' | 'HH:MM:SS' | 'DD:HH:MM:SS'

export type CountDownProps = {
  /*
  init time countdown by second
  */
  initialSeconds: number
  /*
  call when count down finish
  */
  onFinish?: () => void
  /*
  container countdown view style
  */
  containerStyle?: StyleProp<ViewStyle>
  /*
  text countdown style
  */
  textStyle?: StyleProp<TextStyle>
  /*
  element countdown style
  */
  elementStyle?: StyleProp<ViewStyle>
  /*
  colons countdown
  */
  colonsStyle?: StyleProp<TextStyle>
  /*
  loop countdown
  */
  loop?: boolean
  /*
  format countdown
  */
  format?: FormatTime
  /*
  default count time after milisecond
  */
  intervalTimeBySecond?: number
}
const CountDown: React.FunctionComponent<CountDownProps> = ({
  initialSeconds = 300,
  containerStyle,
  onFinish,
  textStyle,
  loop,
  format = 'MM:SS',
  intervalTimeBySecond = 1000,
  elementStyle,
  colonsStyle,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  const appState = useRef(AppState.currentState)
  const timeEnd = useRef(new Date().getTime() + initialSeconds * 1000)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  /*
    check app state is change
  */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })
    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    const timeLoop = intervalTimeBySecond - new Date().getMilliseconds()
    const timeout = setTimeout(() => {
      if (seconds >= 0) {
        const uff = timeEnd.current - new Date().getTime()
        setSeconds(uff / 1000)
      }
      if (seconds < 1) {
        if (loop) {
          timeEnd.current = timeEnd.current - new Date().getTime()
          setSeconds(initialSeconds)
        } else {
          clearTimeout(timeout)
          if (onFinish) {
            onFinish()
          }
        }
      }
    }, timeLoop)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, appStateVisible])

  const renderColons = () => {
    return (
      <Container>
        <Text style={[textStyle, colonsStyle]}>:</Text>
      </Container>
    )
  }
  const renderTimer = () => {
    /*
    caculate minutes
    */
    const minute = Math.floor(seconds / 60) % 60 >= 0 ? Math.floor(seconds / 60) % 60 : 0
    const textMinute = (
      <Container style={elementStyle}>
        <Text style={[textStyle]}>{minute >= 10 ? `${minute}p` : `0${minute}p`}</Text>
      </Container>
    )
    /*
    caculate seconds
    */
    const second = Math.round(seconds % 60) >= 0 ? Math.round(seconds % 60) : 0
    const textSecond = (
      <Container style={elementStyle}>
        <Text style={[textStyle]}>{second >= 10 ? `${second}s` : `0${second}s`}</Text>
      </Container>
    )
    let textDay = null
    let textHour = null
    const formatDate = 'DD'
    const formatHour = 'HH'
    /*
    caculate day
    */
    if (format.includes(formatDate)) {
      const caculate = 60 * 60 * 24
      const day = Math.floor(seconds / caculate) >= 0 ? Math.floor(seconds / caculate) : 0
      textDay = (
        <Container style={elementStyle}>
          <Text style={[textStyle]}>{day >= 10 ? `${day}d` : `0${day}d`}</Text>
        </Container>
      )
    }
    /*
    caculate hours
    */
    if (format.includes(formatHour)) {
      const caculate = 60 * 60
      const hour = Math.floor(seconds / caculate) >= 0 ? Math.floor(seconds / caculate) % 24 : 0
      textHour = (
        <Container style={elementStyle}>
          <Text style={[textStyle]}>{hour >= 10 ? `${hour}h` : `0${hour}h`}</Text>
        </Container>
      )
    }

    return (
      <Container style={containerStyle}>
        {textDay && textDay}
        {textDay && renderColons()}
        {textHour && textHour}
        {textHour && renderColons()}
        {textMinute}
        {renderColons()}
        {textSecond}
      </Container>
    )
  }

  return renderTimer()
}

export default CountDown
const Container = styled.View({
  flexDirection: 'row',
})
const Text = styled.Text(() => ({
  textAlign: 'center',
}))
