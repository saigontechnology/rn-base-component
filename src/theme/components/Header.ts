import {metrics, responsiveHeight} from '../../helpers'
import type {HeaderProps} from '../../components/Header/Header'
import base from '../base'

export type HeaderThemeProps = Pick<
  HeaderProps,
  | 'paddingTop'
  | 'height'
  | 'borderBottomWidth'
  | 'borderBottomColor'
  | 'titleColor'
  | 'titleStyle'
  | 'backgroundColor'
  | 'backIconColor'
>

export const HeaderTheme: HeaderThemeProps = {
  paddingTop: metrics.xxl,
  height: metrics.huge,
  borderBottomWidth: responsiveHeight(1),
  borderBottomColor: base.colors.backgroundSecondary,
  titleColor: base.colors.textColor,
  titleStyle: {
    fontSize: base.fontSizes.sm,
  },
  backgroundColor: base.colors.white,
  backIconColor: base.colors.black,
}
