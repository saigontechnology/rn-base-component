import {Dimensions} from 'react-native'

// dimensions
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen')

// default values
const DEFAULT_HANDLE_HEIGHT = 24
const DEFAULT_OVER_DRAG_RESISTANCE_FACTOR = 2.5
const DEFAULT_ENABLE_CONTENT_PANNING_GESTURE = true
const DEFAULT_ENABLE_HANDLE_PANNING_GESTURE = true
const DEFAULT_ENABLE_OVER_DRAG = true
const DEFAULT_ENABLE_PAN_DOWN_TO_CLOSE = false
const DEFAULT_ANIMATE_ON_MOUNT = true
const DEFAULT_DYNAMIC_SIZING = false

// keyboard
const KEYBOARD_BEHAVIOR = {
  interactive: 'interactive',
  extend: 'extend',
  fillParent: 'fillParent',
} as const
const KEYBOARD_BLUR_BEHAVIOR = {
  none: 'none',
  restore: 'restore',
} as const
const KEYBOARD_INPUT_MODE = {
  adjustPan: 'adjustPan',
  adjustResize: 'adjustResize',
} as const
const DEFAULT_KEYBOARD_BEHAVIOR = KEYBOARD_BEHAVIOR.interactive
const DEFAULT_KEYBOARD_BLUR_BEHAVIOR = KEYBOARD_BLUR_BEHAVIOR.none
const DEFAULT_KEYBOARD_INPUT_MODE = KEYBOARD_INPUT_MODE.adjustPan

// initial values
const INITIAL_VALUE = Number.NEGATIVE_INFINITY
const INITIAL_SNAP_POINT = -999
const INITIAL_CONTAINER_HEIGHT = -999
const INITIAL_CONTAINER_OFFSET = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}
const INITIAL_HANDLE_HEIGHT = -999
const INITIAL_POSITION = SCREEN_HEIGHT

// states
const BOTTOM_SHEET_STATE = {
  open: 'open',
  close: 'close',
}

export {
  // dimensions
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  // default values
  DEFAULT_HANDLE_HEIGHT,
  DEFAULT_OVER_DRAG_RESISTANCE_FACTOR,
  DEFAULT_ENABLE_CONTENT_PANNING_GESTURE,
  DEFAULT_ENABLE_HANDLE_PANNING_GESTURE,
  DEFAULT_ENABLE_OVER_DRAG,
  DEFAULT_ENABLE_PAN_DOWN_TO_CLOSE,
  DEFAULT_DYNAMIC_SIZING,
  DEFAULT_ANIMATE_ON_MOUNT,
  // keyboard
  DEFAULT_KEYBOARD_BEHAVIOR,
  DEFAULT_KEYBOARD_BLUR_BEHAVIOR,
  DEFAULT_KEYBOARD_INPUT_MODE,
  // layout
  INITIAL_POSITION,
  INITIAL_CONTAINER_HEIGHT,
  INITIAL_CONTAINER_OFFSET,
  INITIAL_HANDLE_HEIGHT,
  INITIAL_SNAP_POINT,
  INITIAL_VALUE,
  // states
  BOTTOM_SHEET_STATE,
}
