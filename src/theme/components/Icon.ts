import type {StyleProp, ImageStyle, ViewStyle} from 'react-native'
import type {IconProps} from '../../components'
import {metrics} from '../../helpers'
import base from '../base'

export type IconThemeProps = Pick<IconProps, 'size' | 'color' | 'disabled' | 'resizeMode'> & {
  /**
   * Default style for icon image
   */
  style?: StyleProp<ImageStyle>
  /**
   * Default style for icon button container
   */
  buttonStyle?: StyleProp<ViewStyle>
}

export const IconTheme: IconThemeProps = {
  size: metrics.medium,
  color: base.colors.black,
  disabled: false,
  resizeMode: 'contain',
  style: undefined,
  buttonStyle: undefined,
}
