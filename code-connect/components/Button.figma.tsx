import React from 'react'
import figma from '@figma/code-connect'
import {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonOutline,
  ButtonTransparent,
  Icon,
} from 'rn-base-component'

const BUTTON_FIGMA_URL = '<FIGMA_BUTTON>'
const buttonProps = {
  disabled: figma.enum('state', {
    disabled: true,
  }),
  leftIcon: figma.boolean('leading_icon', {
    true: figma.boolean('is_icon_only', {
      true: undefined,
      false: <Icon source={require('@/assets/images/leading_icon.png')} />,
    }),
    false: undefined,
  }),
  rightIcon: figma.boolean('trailing_icon', {
    true: figma.boolean('is_icon_only', {
      true: undefined,
      false: <Icon source={require('@/assets/images/trailing_icon.png')} />,
    }),
    false: undefined,
  }),
  children: figma.boolean('is_icon_only', {
    true: <Icon source={require('@/assets/images/icon.png')} />,
    false: figma.string('button_text'),
  }),
}

figma.connect(ButtonPrimary, BUTTON_FIGMA_URL, {
  variant: {type: 'contained', style: 'primary'},
  props: buttonProps,
  example: props => <ButtonPrimary {...props} />,
})

figma.connect(ButtonSecondary, BUTTON_FIGMA_URL, {
  variant: {type: 'contained', style: 'secondary'},
  props: buttonProps,
  example: props => <ButtonSecondary {...props} />,
})

figma.connect(ButtonOutline, BUTTON_FIGMA_URL, {
  variant: {type: 'outlined'},
  props: buttonProps,
  example: props => <ButtonOutline {...props} />,
})

figma.connect(ButtonTransparent, BUTTON_FIGMA_URL, {
  variant: {type: 'ghost'},
  props: buttonProps,
  example: props => <ButtonTransparent {...props} />,
})

figma.connect(Button, BUTTON_FIGMA_URL, {
  variant: {type: 'link'},
  props: buttonProps,
  example: props => <Button {...props} />,
})
