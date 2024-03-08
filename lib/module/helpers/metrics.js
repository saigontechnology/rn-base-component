import { Dimensions, Platform } from 'react-native';
const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10
};
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;
const {
  width,
  height
} = Dimensions.get('window');
const responsiveFont = value => width * value / DESIGN_WIDTH;
const deviceWidth = () => width;
const deviceHeight = () => height;
const responsiveWidth = value => width * value / DESIGN_WIDTH;
const responsiveHeight = value => height * value / DESIGN_HEIGHT;
const activeOpacity = {
  none: 1,
  low: 0.8,
  medium: 0.6,
  high: 0.4,
  veryHigh: 0.2
};
const isIOS = Platform.OS === 'ios';
const metrics = {
  // Text Size
  title: responsiveFont(20),
  span: responsiveFont(14),
  // spacing
  line: responsiveHeight(1),
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
  icon: responsiveHeight(30)
};
export { metrics, isIOS, hitSlop, activeOpacity, responsiveFont, responsiveHeight, responsiveWidth, deviceWidth, deviceHeight };
//# sourceMappingURL=metrics.js.map