import type {TextInputProps} from '../../../components/TextInput/TextInput'

export type TextInputThemeProps = Pick<
  TextInputProps,
  'containerStyle' | 'inputContainerStyle' | 'inputStyle' | 'labelStyle'
>

export const TextInputTheme: TextInputThemeProps = {}
