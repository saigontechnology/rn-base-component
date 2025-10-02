import React from 'react'
import figma from '@figma/code-connect'
import {CountDown, theme, Typography} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from 'src/helpers'

const COUNT_DOWN_FIGMA_URL = '<FIGMA_COUNT_DOWN>'

const countdownProps = {
  value: 50000,
  timeToShow: ['D', 'H', 'M', 'S'],
  fontSize: theme.fontSizes.lg,
  fontFamily: theme.fonts.regular,
  textColor: theme.colors.black,
  textStyle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.lg,
    color: theme.colors.black,
  },
  unitTextStyle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
  },
  onFinish: () => {
    /* TODO: handle onFinish */
  },
}

figma.connect(CountDown, COUNT_DOWN_FIGMA_URL, {
  variant: {type: 'clock_countdown'},
  props: {
    ...countdownProps,
    showLabels: true,
    timeLabels: {
      days: 'd',
      hours: 'h',
      minutes: 'm',
      seconds: 's',
    },
  },
  example: props => <CountDown {...props} />,
})

figma.connect(CountDown, COUNT_DOWN_FIGMA_URL, {
  variant: {type: 'colon_countdown'},
  props: {
    ...countdownProps,
    separator: ' : ',
  },
  example: props => <CountDown {...props} />,
})

figma.connect(CountDown, COUNT_DOWN_FIGMA_URL, {
  variant: {type: 'large_text_with_labels'},
  props: {
    ...countdownProps,
    textStyle: {
      fontFamily: theme.fonts.bold,
      fontSize: theme.fontSizes.lg,
      color: theme.colors.black,
    },
  },
  example: props => <CountDown {...props} />,
})

figma.connect(CountDown, COUNT_DOWN_FIGMA_URL, {
  variant: {type: 'large_text_with_labels_under'},
  props: {
    ...countdownProps,
  },
  example: props => (
    <View style={styles.container}>
      <CountDown {...props} />
      <View style={styles.labelsContainer}>
        {['days', 'hours', 'minutes', 'seconds'].map(item => (
          <Typography key={item} variant={'regular'}>
            {item}
          </Typography>
        ))}
      </View>
    </View>
  ),
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.xxs,
  },
})
