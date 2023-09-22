import type Animated from 'react-native-reanimated'
import type {BottomSheetProps} from './types'
import {useDerivedValue} from 'react-native-reanimated'
import {INITIAL_CONTAINER_HEIGHT, INITIAL_HANDLE_HEIGHT, INITIAL_SNAP_POINT} from './constants'

export const normalizeSnapPoint = (snapPoint: number | string, containerHeight: number) => {
  'worklet'
  let normalizedSnapPoint = snapPoint

  // percentage snap point
  if (typeof normalizedSnapPoint === 'string') {
    normalizedSnapPoint = (Number(normalizedSnapPoint.split('%')[0]) * containerHeight) / 100
  }
  return Math.max(0, containerHeight - normalizedSnapPoint)
}

export const useNormalizedSnapPoints = (
  snapPoints: BottomSheetProps['snapPoints'],
  containerHeight: Animated.SharedValue<number>,
  // contentHeight: Animated.SharedValue<number>,
  //   handleHeight: Animated.SharedValue<number>,
  //   enableDynamicSizing: BottomSheetProps['enableDynamicSizing'],
  //   maxDynamicContentSize: BottomSheetProps['maxDynamicContentSize'],
) => {
  const normalizedSnapPoints = useDerivedValue(() => {
    // early exit, if container layout is not ready
    // const isContainerLayoutReady = containerHeight.value !== INITIAL_CONTAINER_HEIGHT
    // if (!isContainerLayoutReady) {
    //   return [INITIAL_SNAP_POINT]
    // }

    const _snapPoints = snapPoints || []

    // const _normalizedSnapPoints = _snapPoints.map(snapPoint =>
    //   normalizeSnapPoint(snapPoint, containerHeight.value),
    // ) as number[]

    // if (enableDynamicSizing) {
    //   if (handleHeight.value === INITIAL_HANDLE_HEIGHT) {
    //     return [INITIAL_SNAP_POINT]
    //   }

    //   if (contentHeight.value === INITIAL_CONTAINER_HEIGHT) {
    //     return [INITIAL_SNAP_POINT]
    //   }

    //   _normalizedSnapPoints.push(
    //     containerHeight.value -
    //       Math.min(
    //         contentHeight.value + handleHeight.value,
    //         maxDynamicContentSize !== undefined ? maxDynamicContentSize : containerHeight.value,
    //       ),
    //   )

    //   _normalizedSnapPoints = _normalizedSnapPoints.sort((a, b) => b - a)
    // }
    return _snapPoints
  }, [snapPoints])

  return normalizedSnapPoints
}
