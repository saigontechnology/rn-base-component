import React, {forwardRef, ReactNode, useCallback, useRef, useState} from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native'
import styled from 'styled-components/native'
import {metrics} from '../../helpers'
import {Cursor} from './Cursor'
import {Text} from '../Text/Text'

interface CodeInputProps extends TextInputProps {
  /** define style for cell */
  cellStyle?: StyleProp<ViewStyle>

  /** define style for valued Cell */
  filledCellStyle?: StyleProp<ViewStyle>

  /** define style for cell when cell is focused */
  focusCellStyle?: StyleProp<ViewStyle>

  /** define style for text in the cell */
  textStyle?: StyleProp<TextStyle>

  /** define secure view style when using secureTextEntry mode */
  secureViewStyle?: StyleProp<ViewStyle>

  /** define style for text in the cell when cell is focused */
  focusTextStyle?: StyleProp<TextStyle>

  /** cell count */
  length?: number

  /** callback when complete  */
  onSubmit?: (val: string) => void

  /** render custom view for cursor/indicator */
  customCursor?: () => ReactNode

  /** render custom view for cursor/indicator */
  secureTextEntry?: boolean

  /** keyboard type */
  keyboardType?: KeyboardTypeOptions

  withCursor?: boolean

  placeholder?: string

  placeholderTextColor?: string

  onClear?: () => void
}

const DEFAULT_LENGTH = 6

export const CodeInput: React.FC<CodeInputProps> = ({
  cellStyle,
  focusCellStyle,
  filledCellStyle,
  textStyle,
  focusTextStyle,
  secureViewStyle,
  length = DEFAULT_LENGTH,
  onSubmit,
  customCursor,
  secureTextEntry,
  keyboardType = 'number-pad',
  withCursor = false,
  placeholder,
  placeholderTextColor,
  onClear,
  ...rest
}) => {
  const textInputRef = useRef<TextInput>(null)
  const [code, setCode] = useState<string>('')

  const handleOnChangeText = useCallback(
    (val: string) => {
      setCode(val)
      if (val.length === length) {
        onSubmit?.(val)
        textInputRef.current?.blur()
      }

      if (!val.length) {
        onClear?.()
        onSubmit?.('')
      }
    },
    [length, onSubmit, onClear],
  )

  const handleCellPress = useCallback(
    (index: number) => {
      // This behavior means the user clicked on the first cell to correct the OTP.
      // Only at the first cell, and the have the OTP code already will trigger onClear method.
      if (index === 0 && code) {
        onClear?.()
      }

      if (index < code.length) {
        setCode(code.slice(0, index))
        onSubmit?.(code.slice(0, index))
      }
      textInputRef.current?.focus()
    },
    [code, onClear, onSubmit],
  )

  const renderCursor = useCallback(
    () => (customCursor ? customCursor() : <Cursor style={focusTextStyle} />),
    [customCursor, focusTextStyle],
  )

  const renderCell = useCallback(
    (isFocused: boolean, value?: string) => {
      if (withCursor && isFocused) {
        return renderCursor()
      }
      if (secureTextEntry) {
        return <SecureView testID="text" style={secureViewStyle} />
      }
      if (value) {
        return (
          <Text testID="text" style={textStyle}>
            {value}
          </Text>
        )
      }
      return <PlaceholderText color={placeholderTextColor}>{placeholder ?? ''}</PlaceholderText>
    },
    [
      renderCursor,
      secureTextEntry,
      secureViewStyle,
      withCursor,
      textStyle,
      placeholderTextColor,
      placeholder,
    ],
  )

  const renderCells = useCallback(() => {
    const cells = []
    for (let index = 0; index < length; index++) {
      const isFocused = code.length === index

      cells.push(
        <Cell
          testID="cell"
          style={[cellStyle, code[index] ? filledCellStyle : {}, isFocused && focusCellStyle]}
          key={index}
          onPress={() => handleCellPress(index)}>
          {renderCell(isFocused, code[index])}
        </Cell>,
      )
    }
    return cells
  }, [length, code, cellStyle, filledCellStyle, focusCellStyle, renderCell, handleCellPress])

  return (
    <View>
      <StyledTextInput
        testID="input"
        ref={textInputRef}
        value={code}
        textContentType="oneTimeCode"
        keyboardType={keyboardType}
        onChangeText={handleOnChangeText}
        maxLength={length}
        {...rest}
      />
      <CellContainer>{renderCells()}</CellContainer>
    </View>
  )
}

const Cell = styled.Pressable(props => ({
  width: props?.theme?.spacing?.gigantic,
  height: props?.theme?.spacing?.gigantic,
  borderRadius: metrics.tiny,
  borderWidth: metrics.line,
  borderColor: props?.theme?.colors?.coolGray,
  justifyContent: 'center',
  alignItems: 'center',
  margin: metrics.tiny,
}))

const SecureView = styled.Pressable(props => ({
  width: props?.theme?.spacing.slim,
  height: props?.theme?.spacing.slim,
  borderRadius: metrics.small,
  backgroundColor: props?.theme?.colors?.darkText,
}))

const CellContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const ForwardRefTextInputComponent = forwardRef<TextInput, TextInputProps>((props, ref) => (
  <TextInput {...props} ref={ref} />
))

const StyledTextInput = styled(ForwardRefTextInputComponent)(() => ({
  opacity: 0,
  position: 'absolute',
  width: 0,
  height: 0,
}))

const PlaceholderText = styled.Text<{color?: string}>(({color}) => ({
  color,
}))
