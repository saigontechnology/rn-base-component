// Define interface locally since IProgressProps is not exported
import {metrics} from '../../helpers'
import base from '../base'
interface IProgressProps {
  value?: number
  size?: number
  borderRadius?: number
  filledTrackColor?: string
  backgroundColor?: string
  width?: number
  isIndeterminateProgress?: boolean
}

export type ProgressThemeProps = Pick<
  IProgressProps,
  'size' | 'borderRadius' | 'filledTrackColor' | 'backgroundColor' | 'width'
>

export const ProgressTheme: ProgressThemeProps = {
  size: metrics.small,
  borderRadius: 0,
  filledTrackColor: base.colors.primary,
  backgroundColor: base.colors.gray,
  width: undefined, // Full width by default
}
