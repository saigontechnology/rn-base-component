import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'

import {HighlightText} from 'rn-base-component'

export default {
  title: 'components/HighlightText',
  component: HighlightText,
} as ComponentMeta<typeof HighlightText>

export const Basic: ComponentStory<typeof HighlightText> = args => <HighlightText {...args} />

Basic.args = {
  textToHighlight: 'Hello STS Tea123123m!',
  searchWords: ['Hello', 'Tea'],
  highlightTextStyle: {backgroundColor: 'yellow'},
}
