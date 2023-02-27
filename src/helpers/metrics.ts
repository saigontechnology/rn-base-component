import {Dimensions, Platform} from 'react-native'

export type IMetrics = {
  // Text Size
  readonly title: number
  readonly span: number

  // spacing
  readonly tiny: number
  readonly xxs: number
  readonly xs: number
  readonly small: number
  readonly sMedium: number
  readonly medium: number
  readonly large: number
  readonly xl: number
  readonly xxl: number
  readonly xxxl: number
  readonly huge: number
  readonly massive: number
  readonly giant: number

  // border
  readonly borderWidth: number
  readonly borderRadius: number
  readonly borderRadiusLarge: number
  readonly borderRadiusHuge: number

  // margin
  readonly marginTop: number
  readonly marginHorizontal: number
  readonly marginVertical: number
  readonly paddingHorizontal: number

  readonly voucherBorderRadius: number
  readonly logoWidth: number
  readonly logoHeight: number
  readonly icon: number
}

export type IHitSlop = {
  readonly top: number
  readonly bottom: number
  readonly right: number
  readonly left: number
}

const hitSlop: IHitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
}

const DESIGN_WIDTH: number = 375
const DESIGN_HEIGHT: number = 812
const {width, height} = Dimensions.get('window')

const responsiveFont = (value = 0): number => {
  return (width * value) / DESIGN_WIDTH
}

const deviceWidth = (): number => {
  return width
}

const deviceHeight = (): number => {
  return height
}

const responsiveWidth = (value = 0): number => {
  return (width * value) / DESIGN_WIDTH
}

const responsiveHeight = (value = 0): number => {
  return (height * value) / DESIGN_HEIGHT
}

const isIOS: boolean = Platform.OS === 'ios'

const metrics: IMetrics = {
  // Text Size
  title: responsiveFont(20),
  span: responsiveFont(14),

  // spacing
  tiny: responsiveHeight(4),
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

  // border
  borderWidth: responsiveHeight(1),
  borderRadius: responsiveHeight(5),
  borderRadiusLarge: responsiveHeight(10),
  borderRadiusHuge: responsiveHeight(20),
  // margin
  marginTop: responsiveHeight(12),
  marginHorizontal: responsiveWidth(24),
  marginVertical: responsiveWidth(16),
  paddingHorizontal: responsiveWidth(20),

  voucherBorderRadius: responsiveHeight(15),
  logoWidth: responsiveWidth(300),
  logoHeight: responsiveHeight(70),
  icon: responsiveHeight(30),
}

export {metrics, isIOS, hitSlop, responsiveFont, responsiveHeight, responsiveWidth, deviceWidth, deviceHeight}
