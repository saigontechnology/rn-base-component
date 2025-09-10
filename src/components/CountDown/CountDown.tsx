/* eslint-disable @typescript-eslint/no-shadow */
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {type ViewProps} from 'react-native'
import styled from 'styled-components/native'
import dayjs from 'dayjs'
import {Text} from '../Text/Text'
import {useTheme} from '../../hooks'

export interface CountDownRef {
  /**
   * Restart the countdown timer
   */
  restart: () => void
}

export interface CountDownProps extends Omit<ViewProps, 'children'> {
  /**
   * Initial countdown value in seconds
   */
  value?: number
  /**
   * Callback function when countdown finishes
   */
  onFinish?: () => void
  /**
   * Target date/time to countdown to (using dayjs)
   */
  countDownTo?: dayjs.Dayjs
  /**
   * Array of time units to show ['D', 'H', 'M', 'S']
   * D = Days, H = Hours, M = Minutes, S = Seconds
   */
  timeToShow?: string[]
  /**
   * Custom font size for countdown text
   */
  fontSize?: number
  /**
   * Custom text color
   */
  textColor?: string
  /**
   * Separator between time units
   */
  separator?: string
  /**
   * Show time unit labels (e.g., 'd', 'h', 'm', 's')
   */
  showLabels?: boolean
  /**
   * Custom time unit labels
   */
  timeLabels?: {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
  }
  /**
   * Test ID for testing purposes
   */
  testID?: string
}

export const CountDown = forwardRef<CountDownRef, CountDownProps>(
  (
    {
      value = 0,
      onFinish,
      countDownTo,
      timeToShow = ['D', 'H', 'M', 'S'],
      fontSize,
      textColor,
      separator = ' : ',
      showLabels = false,
      timeLabels = {
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
      },
      style,
      testID,
      accessible = true,
      accessibilityRole = 'timer',
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()

    const CountDownTheme = theme?.components?.CountDown ?? {
      fontSize: 16,
      textColor: '#000000',
      labelFontSize: 12,
      labelColor: '#666666',
    }
    const [countDownTime, setCountDownTime] = useState(value)
    const timerRef = useRef<NodeJS.Timeout>()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useImperativeHandle(ref, () => ({
      restart: () => setCountDownTime(value),
    }))

    const updateTimer = useCallback(() => {
      if (countDownTime === 1) {
        if (onFinish) {
          onFinish()
        }
      }

      if (countDownTime === 0) {
        setCountDownTime(0)
      } else {
        setCountDownTime(Math.max(0, countDownTime - 1))
      }
    }, [countDownTime, onFinish])

    const updateCountDownTimer = useCallback(() => {
      if (countDownTo) {
        const count = Math.max(0, countDownTo.diff(dayjs(), 'seconds'))
        if (count === 0) {
          onFinish?.()
          return
        }
        setCountDownTime(count)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        if (count > 0) {
          // Get current millisecond to calculate time left for next seconds change
          const milliSecond = 1000 - dayjs().millisecond()
          timeoutRef.current = setTimeout(() => {
            updateCountDownTimer()
          }, milliSecond)
        }
      }
    }, [onFinish, countDownTo])

    useEffect(() => {
      if (countDownTo) {
        updateCountDownTimer()
      } else {
        timerRef.current = setInterval(updateTimer, 1000)
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [countDownTo, updateCountDownTimer, updateTimer])

    const getTimeLeft = useCallback(() => {
      const padStart = (n: number) => (timeToShow.length > 1 && n < 10 ? '0' : '') + n
      return {
        seconds: padStart(countDownTime % 60),
        minutes: padStart(Math.floor(countDownTime / 60) % 60),
        hours: padStart(Math.floor(countDownTime / (60 * 60)) % 24),
        days: padStart(Math.floor(countDownTime / (60 * 60 * 24))),
      }
    }, [countDownTime, timeToShow.length])

    const renderTimeUnit = (value: string, unit: string, showSeparator: boolean) => (
      <TimeUnitContainer key={unit}>
        <TimeText
          fontSize={fontSize || CountDownTheme.fontSize}
          color={textColor || CountDownTheme.textColor}>
          {value}
        </TimeText>
        {showLabels && (
          <LabelText fontSize={CountDownTheme.labelFontSize} color={textColor || CountDownTheme.labelColor}>
            {timeLabels[unit.toLowerCase() as keyof typeof timeLabels]}
          </LabelText>
        )}
        {showSeparator && (
          <SeparatorText
            fontSize={fontSize || CountDownTheme.fontSize}
            color={textColor || CountDownTheme.textColor}>
            {separator}
          </SeparatorText>
        )}
      </TimeUnitContainer>
    )

    const renderCountDown = () => {
      const {days, hours, minutes, seconds} = getTimeLeft()
      const timeUnits: Array<{value: string; unit: string; show: boolean}> = [
        {value: days, unit: 'days', show: timeToShow.includes('D') && !!+days},
        {value: hours, unit: 'hours', show: timeToShow.includes('H')},
        {value: minutes, unit: 'minutes', show: timeToShow.includes('M')},
        {value: seconds, unit: 'seconds', show: timeToShow.includes('S')},
      ]

      const visibleUnits = timeUnits.filter(unit => unit.show)

      return (
        <CountDownContainer
          style={style}
          testID={testID}
          accessible={accessible}
          accessibilityRole={accessibilityRole}
          accessibilityLabel={`Countdown timer: ${visibleUnits
            .map(unit => `${unit.value} ${unit.unit}`)
            .join(', ')}`}
          {...props}>
          {visibleUnits.map((unit, index) => {
            const showSeparator = index < visibleUnits.length - 1
            return renderTimeUnit(unit.value, unit.unit, showSeparator)
          })}
        </CountDownContainer>
      )
    }

    // Simple countdown mode (just seconds)
    if (countDownTo) {
      return renderCountDown()
    }

    return (
      <SimpleCountDownContainer
        style={style}
        testID={testID}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={`Countdown: ${countDownTime} seconds`}
        {...props}>
        <SimpleCountDownText
          color={textColor || CountDownTheme.textColor}
          fontSize={fontSize || CountDownTheme.fontSize}>
          {countDownTime}s
        </SimpleCountDownText>
      </SimpleCountDownContainer>
    )
  },
)

CountDown.displayName = 'CountDown'

// Styled Components
const CountDownContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const SimpleCountDownContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const TimeUnitContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

const TimeText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color}) => `
    font-size: ${fontSize}px;
    color: ${color};
    font-weight: bold;
  `}
`

const LabelText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color}) => `
    font-size: ${fontSize}px;
    color: ${color};
    margin-left: 2px;
  `}
`

const SeparatorText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color}) => `
    font-size: ${fontSize}px;
    color: ${color};
    margin-horizontal: 4px;
  `}
`

const SimpleCountDownText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color}) => `
    font-size: ${fontSize}px;
    color: ${color};
    width: 30px;
    text-align: center;
  `}
`
