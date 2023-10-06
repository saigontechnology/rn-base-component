import {Dimensions} from 'react-native'

// dimensions
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen')

// default values
const DEFAULT_CONTENT_HEIGHT = 0

// initial values
const INITIAL_CONTENT_HEIGHT_POSITIVE = 999

export {
  // dimensions
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  // default values
  DEFAULT_CONTENT_HEIGHT,
  // initial values
  INITIAL_CONTENT_HEIGHT_POSITIVE,
}
