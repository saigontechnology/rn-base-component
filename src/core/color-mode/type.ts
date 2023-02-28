export type ColorMode = 'light' | 'dark' | null | undefined

export interface StorageManager {
  get(init?: ColorMode): Promise<ColorMode>
  set(value: ColorMode): void
}

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

export interface IColorModeContextProps {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}
