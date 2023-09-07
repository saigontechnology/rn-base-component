import {responsiveHeight} from '../../helpers/metrics'

const spacing = {
  mini: responsiveHeight(2),
  tiny: responsiveHeight(4),
  puny: responsiveHeight(5),
  micro: responsiveHeight(6),
  xxs: responsiveHeight(8),
  xs: responsiveHeight(12),
  small: responsiveHeight(16),
  sMedium: responsiveHeight(18),
  medium: responsiveHeight(20),
  large: responsiveHeight(24),
  xl: responsiveHeight(28),
  xxl: responsiveHeight(32),
  xxxl: responsiveHeight(40),
  huge: responsiveHeight(48),
  massive: responsiveHeight(64),
  giant: responsiveHeight(80),
}
export type ISpacing = keyof typeof spacing
export default spacing
