import type {SwitchTheme} from './Switch'

export const TRACK_RADIUS = 1000
export const THUMB_SIZE = 30
export const TRACK_PADDING = 3
export const TRACK_WIDTH = 10
export const SPACING_OUTSIDE = 10
export const SPACING_INSIDE = 3
export enum SwitchVariant {
  inside = 'inside',
  outside = 'outside',
}
export const TEXT_INSIDE: SwitchTheme = {
  active: 'On',
  inActive: 'Off',
}
export const TEXT_INSIDE_COLOR: SwitchTheme = {
  active: 'white',
  inActive: 'black',
}
