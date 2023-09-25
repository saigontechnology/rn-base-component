import type {StyleProp, ViewStyle} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'

export interface BottomSheetContentContainerProps {
  // configurations
  animatedCalculateContentHeight: SharedValue<number>
  animatedContentHeight: SharedValue<number>
  animatedContentTranslateY: SharedValue<number>

  // styles
  style?: StyleProp<ViewStyle>

  // components
  children?: React.ReactNode
}
