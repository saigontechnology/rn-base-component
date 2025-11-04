/* eslint-disable @typescript-eslint/no-shadow */
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {type ViewProps, type TextStyle, type StyleProp, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import dayjs from 'dayjs'
import {Text} from '../Text/Text'
import {useTheme} from '../../hooks'

export type CountDownStatus = 'running' | 'stopped' | 'finished'

export interface CountDownRef {
  /**
   * Restart the countdown timer
   */
  restart: () => void
  /**
   * Get the current countdown time in seconds
   */
  getCurrentTime: () => number
  /**
   * Stop the countdown timer
   */
  stopCountDown: () => void
  /**
   * Get the current countdown status
   */
  getCountDownStatus: () => CountDownStatus
  /**
   * Resume the countdown timer
   */
  resumeCountDown: () => void
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
   * Custom font family for countdown text
   */
  fontFamily?: string
  /**
   * Custom text color
   */
  textColor?: string
  /**
   * Custom text style for countdown text
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Custom label text style for countdown text
   */
  unitTextStyle?: StyleProp<TextStyle>
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
   * Allow countdown to go into negative values
   */
  allowNegative?: boolean
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
      textStyle,
      unitTextStyle,
      separator = ' : ',
      showLabels = false,
      timeLabels = {
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
      },
      allowNegative = false,
      style,
      testID,
      accessible = true,
      accessibilityRole = 'timer',
      fontFamily,
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
      fontFamily: theme?.fonts?.regular,
      textStyle: undefined,
      unitTextStyle: undefined,
    }
    const [countDownTime, setCountDownTime] = useState(value)
    const [status, setStatus] = useState<CountDownStatus>(() => {
      // If using countDownTo, always start as running unless the target date has passed
      if (countDownTo) {
        return 'running'
      }
      // For simple countdown, check if initial value is 0
      return value === 0 ? 'finished' : 'running'
    })
    const timerRef = useRef<NodeJS.Timeout>()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useImperativeHandle(ref, () => ({
      restart: () => {
        setCountDownTime(value)
        setStatus('running')
      },
      getCurrentTime: () => countDownTime,
      stopCountDown: () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = undefined
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        setStatus('stopped')
      },
      getCountDownStatus: () => status,
      resumeCountDown: () => {
        if (status === 'stopped' && countDownTime > 0) {
          setStatus('running')
        }
      },
    }))

    const updateTimer = useCallback(() => {
      // Don't update if status is stopped
      if (status === 'stopped') {
        return
      }

      // Call onFinish when we reach zero (before decrementing)
      if (countDownTime === 1) {
        onFinish?.()
      }

      // If we're at zero and shouldn't go negative, mark as finished and stop
      if (countDownTime === 0 && !allowNegative) {
        setStatus('finished')
        return
      }

      const newTime = countDownTime - 1
      setCountDownTime(newTime)

      // Check if we just reached zero and should finish
      if (newTime === 0 && !allowNegative) {
        setStatus('finished')
      }
    }, [countDownTime, onFinish, allowNegative, status])

    const updateCountDownTimer = useCallback(() => {
      if (countDownTo && status !== 'stopped') {
        const rawCount = countDownTo.diff(dayjs(), 'seconds')
        const count = allowNegative ? rawCount : Math.max(0, rawCount)

        // Call onFinish if the target date has passed (negative or zero)
        if (rawCount <= 0) {
          onFinish?.()
        }

        if (count === 0 && !allowNegative) {
          setStatus('finished')
          return
        }

        setCountDownTime(count)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        if ((count > 0 || allowNegative) && status === 'running') {
          // Get current millisecond to calculate time left for next seconds change
          const milliSecond = 1000 - dayjs().millisecond()
          timeoutRef.current = setTimeout(() => {
            updateCountDownTimer()
          }, milliSecond)
        }
      }
    }, [onFinish, countDownTo, allowNegative, status])

    useEffect(() => {
      if (status === 'running') {
        if (countDownTo) {
          updateCountDownTimer()
        } else {
          timerRef.current = setInterval(updateTimer, 1000)
        }
      } else {
        // Clear timers when stopped or finished
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = undefined
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [countDownTo, updateCountDownTimer, updateTimer, status])

    const getTimeLeft = useCallback(() => {
      const padStart = (n: number) => (timeToShow.length > 1 && Math.abs(n) < 10 ? '0' : '') + n
      const isNegative = countDownTime < 0
      const absTime = Math.abs(countDownTime)

      return {
        seconds: padStart(isNegative ? -(absTime % 60) : absTime % 60),
        minutes: padStart(isNegative ? -Math.floor(absTime / 60) % 60 : Math.floor(absTime / 60) % 60),
        hours: padStart(
          isNegative ? -Math.floor(absTime / (60 * 60)) % 24 : Math.floor(absTime / (60 * 60)) % 24,
        ),
        days: padStart(
          isNegative ? -Math.floor(absTime / (60 * 60 * 24)) : Math.floor(absTime / (60 * 60 * 24)),
        ),
        isNegative,
      }
    }, [countDownTime, timeToShow.length])

    const renderTimeUnit = (value: string, unit: string, showSeparator: boolean) => (
      <TimeUnitContainer key={unit}>
        <TimeText
          fontSize={fontSize || CountDownTheme.fontSize}
          color={textColor || CountDownTheme.textColor}
          fontFamily={fontFamily || CountDownTheme.fontFamily}
          style={[CountDownTheme.textStyle, StyleSheet.flatten(textStyle)]}>
          {value}
        </TimeText>
        {showLabels && (
          <LabelText
            fontSize={CountDownTheme.labelFontSize}
            color={textColor || CountDownTheme.labelColor}
            fontFamily={fontFamily || CountDownTheme.fontFamily}
            style={[CountDownTheme.unitTextStyle, StyleSheet.flatten(unitTextStyle)]}>
            {timeLabels[unit.toLowerCase() as keyof typeof timeLabels]}
          </LabelText>
        )}
        {showSeparator && (
          <SeparatorText
            fontSize={fontSize || CountDownTheme.fontSize}
            color={textColor || CountDownTheme.textColor}
            fontFamily={fontFamily || CountDownTheme.fontFamily}
            style={[CountDownTheme.textStyle, StyleSheet.flatten(textStyle)]}>
            {separator}
          </SeparatorText>
        )}
      </TimeUnitContainer>
    )

    const renderCountDown = () => {
      const {days, hours, minutes, seconds, isNegative} = getTimeLeft()
      const timeUnits: Array<{value: string; unit: string; show: boolean}> = [
        {value: days, unit: 'days', show: timeToShow.includes('D') && !!+Math.abs(+days)},
        {value: hours, unit: 'hours', show: timeToShow.includes('H')},
        {value: minutes, unit: 'minutes', show: timeToShow.includes('M')},
        {value: seconds, unit: 'seconds', show: timeToShow.includes('S')},
      ]

      const visibleUnits = timeUnits.filter(unit => unit.show)
      const accessibilityPrefix = isNegative ? 'Overtime: ' : 'Countdown timer: '

      return (
        <CountDownContainer
          style={[CountDownTheme.style, StyleSheet.flatten(style)]}
          testID={testID}
          accessible={accessible}
          accessibilityRole={accessibilityRole}
          accessibilityLabel={`${accessibilityPrefix}${visibleUnits
            .map(unit => `${Math.abs(+unit.value)} ${unit.unit}`)
            .join(', ')}`}
          {...props}>
          {isNegative && allowNegative && (
            <SeparatorText
              fontSize={fontSize || CountDownTheme.fontSize}
              color={textColor || CountDownTheme.textColor}
              fontFamily={fontFamily || CountDownTheme.fontFamily}
              style={[CountDownTheme.textStyle, StyleSheet.flatten(textStyle)]}>
              -
            </SeparatorText>
          )}
          {visibleUnits.map((unit, index) => {
            const showSeparator = index < visibleUnits.length - 1
            const displayValue = isNegative
              ? Math.abs(+unit.value).toString().padStart(unit.value.length, '0')
              : unit.value
            return renderTimeUnit(displayValue, unit.unit, showSeparator)
          })}
        </CountDownContainer>
      )
    }

    // Simple countdown mode (just seconds)
    if (countDownTo) {
      return renderCountDown()
    }

    const isNegative = countDownTime < 0
    const accessibilityText = isNegative
      ? `Overtime: ${Math.abs(countDownTime)} seconds`
      : `Countdown: ${countDownTime} seconds`
    return (
      <SimpleCountDownContainer
        style={[CountDownTheme.style, StyleSheet.flatten(style)]}
        testID={testID}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityText}
        {...props}>
        <SimpleCountDownText
          color={textColor || CountDownTheme.textColor}
          fontSize={fontSize || CountDownTheme.fontSize}
          fontFamily={fontFamily || CountDownTheme.fontFamily}
          style={[CountDownTheme.textStyle, StyleSheet.flatten(textStyle)]}>
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
  ${({fontSize, color, fontFamily}) => `
    font-size: ${fontSize}px;
    color: ${color};
    font-weight: bold;
    font-family: ${fontFamily};
  `}
`

const LabelText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color, fontFamily}) => `
    font-size: ${fontSize}px;
    color: ${color};
    margin-left: 2px;
    font-family: ${fontFamily};
  `}
`

const SeparatorText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color, fontFamily}) => `
    font-size: ${fontSize}px;
    color: ${color};
    margin-horizontal: 4px;
    font-family: ${fontFamily};
  `}
`

const SimpleCountDownText = styled(Text)<{fontSize?: number; color?: string}>`
  ${({fontSize, color, fontFamily}) => `
    font-size: ${fontSize}px;
    color: ${color};
    text-align: center;
    font-family: ${fontFamily};
  `}
`
