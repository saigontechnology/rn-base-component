import React from 'react'
import DatePicker from 'react-native-date-picker'
import figma from '@figma/code-connect'

const DATE_PICKER_FIGMA_URL = '<FIGMA_DATE_PICKER>'

figma.connect(DatePicker, DATE_PICKER_FIGMA_URL, {
  props: {},
  example: props => <DatePicker mode="date" date={new Date()} {...props} />,
})
