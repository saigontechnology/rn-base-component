import {responsiveHeight} from '../../helpers/metrics'

const sizes = {
  tiny: responsiveHeight(4),
  small: responsiveHeight(8),
  medium: responsiveHeight(16),
  large: responsiveHeight(20),
  huge: responsiveHeight(24),
  enormous: responsiveHeight(32),
  massive: responsiveHeight(48),
  gargantuan: responsiveHeight(64),
  colossal: responsiveHeight(96),
  gigantic: responsiveHeight(128),
  extraLarge: responsiveHeight(160),
  jumbo: responsiveHeight(200),
}

export type ISize = keyof typeof sizes
export default sizes
