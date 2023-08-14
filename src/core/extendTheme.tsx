/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {theme as defaultTheme, Theme} from './../theme'
import _ from 'lodash'

function isFunction(value: any): boolean {
  return typeof value === 'function'
}

type ThemeUtil = Theme | (Record<string, any> & {})

export function extendTheme<T extends ThemeUtil>(overrides: T, ...restOverrides: T[]) {
  function customizer(source: any, override: any) {
    if (isFunction(source)) {
      return (...args: any[]) => {
        const sourceValue = source(...args)
        const overrideValue = isFunction(override) ? override(...args) : override
        return _.mergeWith({}, sourceValue, overrideValue, customizer)
      }
    }
    return undefined
  }

  const finalOverrides = [overrides, ...restOverrides].reduce(
    (prevValue, currentValue) => _.mergeWith({}, prevValue, currentValue, customizer),
    defaultTheme,
  )

  return finalOverrides as T & Theme
}
