import {requireNativeComponent} from 'react-native'
import type {ShimmerProp} from './Shimmer'

const ShimmeringView = requireNativeComponent<ShimmerProp>('RCTShimmeringView')

export default ShimmeringView
