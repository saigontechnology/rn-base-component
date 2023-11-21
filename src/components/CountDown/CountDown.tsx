import React, {useEffect, useRef, useState} from 'react'
import {AppState, type StyleProp, type ViewStyle, type TextStyle} from 'react-native'
import styled from 'styled-components/native'
import {Text} from 'rn-base-component'
export const FormatTime = {
  mmss: 'mm:ss',
  hhmmss: 'HH:mm:ss',
  ddhhmmss: 'DD:HH:mm:ss',
} as const

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
  format countdown as key 
  */
  format?: keyof typeof FormatTime
  /*
  default count time after milisecond
  */
  intervalTimeBySecond?: number
}
export const CountDown: React.FunctionComponent<CountDownProps> = ({
  initialSeconds = 300,
  containerStyle,
  onFinish,
  textStyle,
  loop,
  format = 'mmss',
  intervalTimeBySecond = 1000,
  elementStyle,
  colonsStyle,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const appState = useRef(AppState.currentState)
  const milisecond = 1000
  const timeEnd = useRef(new Date().getTime() + initialSeconds * milisecond)
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
        setSeconds(uff / milisecond)
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

  const renderColons = () => (
    <Container>
      <Text style={[textStyle, colonsStyle]}>:</Text>
    </Container>
  )

  const renderTimer = () => {
    const numberSecondPerMinute = 60
    /*
    caculate minutes
    */
    const resultCaculatMinute = Math.floor(seconds / numberSecondPerMinute) % numberSecondPerMinute
    const minute = resultCaculatMinute >= 0 ? resultCaculatMinute : 0
    const textMinute = (
      <Container style={elementStyle}>
        <Text style={[textStyle]}>{minute >= 10 ? `${minute}` : `0${minute}`}</Text>
      </Container>
    )
    /*
    caculate seconds
    */
    const resultCaculatSecond = Math.round(seconds % numberSecondPerMinute)
    const second = resultCaculatSecond >= 0 ? resultCaculatSecond : 0
    const textSecond = (
      <Container style={elementStyle}>
        <Text style={[textStyle]}>{second >= 10 ? `${second}` : `0${second}`}</Text>
      </Container>
    )
    let textDay = null
    let textHour = null

    /*
    caculate day
    */
    if (FormatTime.ddhhmmss === FormatTime[format]) {
      const secondPerDay = 86400
      const resultCaculatDay = Math.floor(seconds / secondPerDay)
      const day = resultCaculatDay >= 0 ? resultCaculatDay : 0
      textDay = (
        <Container style={elementStyle}>
          <Text style={[textStyle]}>{day >= 10 ? `${day}` : `0${day}`}</Text>
        </Container>
      )
    }
    /*
    caculate hours
    */
    if (FormatTime.hhmmss === FormatTime[format] || FormatTime.ddhhmmss === FormatTime[format]) {
      const secondPerHour = 3600
      const resultCaculatHour = Math.floor(seconds / secondPerHour)
      const hourPerDay = 24
      const hour = resultCaculatHour >= 0 ? resultCaculatHour % hourPerDay : 0
      textHour = (
        <Container style={elementStyle}>
          <Text style={[textStyle]}>{hour >= 10 ? `${hour}` : `0${hour}`}</Text>
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

const Container = styled.View({
  flexDirection: 'row',
})
