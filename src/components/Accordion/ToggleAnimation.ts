import {LayoutAnimation} from 'react-native'

export type AnimationType = 'easeInEaseOut' | 'easeIn' | 'easeOut' | 'keyboard' | 'linear' | 'spring'

export const toggleAnimation = (
  openAnimation: AnimationType = 'easeInEaseOut',
  closeAnimation: AnimationType = 'easeInEaseOut',
  openDuration = 300,
  closeDuration = 300,
) => ({
  duration: 300,
  update: {
    duration: openDuration,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types[openAnimation],
  },
  delete: {
    duration: closeDuration,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types[closeAnimation],
  },
})
