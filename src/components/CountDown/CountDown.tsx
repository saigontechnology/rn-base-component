import React, {useEffect, useRef, useState} from 'react'
import {AppState, type StyleProp, type ViewStyle, type TextStyle} from 'react-native'
import styled from 'styled-components/native'

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
  loop countdown
  */
  loop?: boolean
  /*
  format countdown
  */
  format?: 'MM:SS' | 'HH:MM:SS' | 'DD:HH:MM:SS'
  /*
  default count time after milisecond
  */
  intervalTimeBySecond?: number
}
const CountDown: React.FunctionComponent<CountDownProps> = ({
  initialSeconds,
  containerStyle,
  onFinish,
  textStyle,
  loop,
  format = 'MM:SS',
  intervalTimeBySecond = 1000,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  const appState = useRef(AppState.currentState)
  const timeEnd = useRef(new Date(new Date().getTime() + initialSeconds * 1000).getTime())
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
    const timeout = setTimeout(() => {
      if (seconds >= 0) {
        const uff = new Date(timeEnd.current - new Date().getTime()).getTime()
        setSeconds(uff / 1000)
      }
      if (seconds < 1) {
        if (loop) {
          timeEnd.current = new Date(new Date().getTime() + initialSeconds * 1000).getTime()
          setSeconds(initialSeconds)
        } else {
          clearTimeout(timeout)
          if (onFinish) {
            onFinish()
          }
        }
      }
    }, intervalTimeBySecond)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, appStateVisible])

  const renderTimer = () => {
    /*
    caculate minutes
    */
    const minute = Math.floor(seconds / 60) % 60 >= 0 ? Math.floor(seconds / 60) % 60 : 0
    const textMinute = minute >= 10 ? `${minute}p` : `0${minute}p`
    /*
    caculate seconds
    */
    const _seconds = Math.round(seconds % 60) >= 0 ? Math.round(seconds % 60) : 0
    const textSecond = _seconds >= 10 ? `${_seconds}s` : `0${_seconds}s`

    let textDay = null
    let textHour = null
    /*
    caculate day
    */
    if (format.includes('DD')) {
      const caculate = 60 * 60 * 24
      const day = Math.floor(seconds / caculate) >= 0 ? Math.floor(seconds / caculate) : 0
      textDay = day >= 10 ? `${day}d` : `0${day}d`
    }
    /*
    caculate hours
    */
    if (format.includes('HH')) {
      const caculate = 60 * 60
      const hour = Math.floor(seconds / caculate) >= 0 ? Math.floor(seconds / caculate) % 24 : 0
      textHour = hour >= 10 ? `${hour}h` : `0${hour}h`
    }
    return (
      <Text style={[textStyle]}>
        {textDay && `${textDay}:`}
        {textHour && `${textHour}:`}
        {textMinute}:{textSecond}
      </Text>
    )
  }

  return <Container style={containerStyle}>{seconds === 0 ? null : renderTimer()}</Container>
}

const Container = styled.View({})
const Text = styled.Text(() => ({
  textAlign: 'center',
}))
