import type {ColorValue} from 'react-native'

export interface IColors {
  readonly primary: string
  readonly black: string
  readonly white: string
  readonly gray: string
  readonly red: string
  readonly textDisabled: string
  readonly placeHolderText: string
  readonly backgroundDisabled: string
}

const baseColor: IColors = {
  primary: '#7239E5',
  black: '#1F1F1F',
  white: '#ffffff',
  gray: '#454545',
  red: '#ff0009',
  textDisabled: '#666666',
  placeHolderText: '#929298',
  backgroundDisabled: '#e3e6e8',
}

const colors = {
  ...baseColor,
}

const getColorOpacity = (color: string, opacity: number): ColorValue | string | null | undefined => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16)
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`
  }
  return color || null || undefined
}

export {colors, getColorOpacity}
