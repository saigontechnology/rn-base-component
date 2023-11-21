import React, {ReactNode, useCallback, useRef, useState, memo} from 'react'
import {TextInput, Text, ColorValue, TextInputProps} from 'react-native'
import type {KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {metrics} from '../../helpers'
import styled from 'styled-components/native'
import Cursor from './Cursor'
import type {ITheme} from 'src/theme'

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
  placeholderTextColor?: ColorValue
}

type CellStyle = {
  theme: ITheme
}

type SecureViewStyle = {
  theme: ITheme
}

const DEFAULT_LENGTH = 6

const CodeInput: React.FC<CodeInputProps> = ({
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
    },
    [length, onSubmit],
  )

  const handleCellPress = useCallback(
    (index: number) => {
      if (index < code.length) {
        setCode(code.slice(0, index))
      }
      textInputRef.current?.focus()
    },
    [code],
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
          style={[cellStyle, code[index] && filledCellStyle, isFocused && focusCellStyle]}
          key={index}
          onPress={() => handleCellPress(index)}>
          {renderCell(isFocused, code[index])}
        </Cell>,
      )
    }
    return cells
  }, [
    length,
    code,
    placeholder,
    placeholderTextColor,
    cellStyle,
    filledCellStyle,
    focusCellStyle,
    renderCell,
    handleCellPress,
  ])

  return (
    <CodeInputContainer>
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
    </CodeInputContainer>
  )
}

export default memo(CodeInput)

const CodeInputContainer = styled.View({})

const Cell = styled.Pressable((props: CellStyle) => ({
  width: props?.theme?.spacing.gigantic,
  height: props?.theme?.spacing.gigantic,
  borderRadius: metrics.tiny,
  borderWidth: metrics.line,
  borderColor: props?.theme?.colors?.coolGray,
  justifyContent: 'center',
  alignItems: 'center',
  margin: metrics.tiny,
}))

const SecureView = styled.Pressable((props: SecureViewStyle) => ({
  width: props?.theme?.spacing.slim,
  height: props?.theme?.spacing.slim,
  borderRadius: metrics.small,
  backgroundColor: props?.theme?.colors?.darkText,
}))

const CellContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const StyledTextInput = styled.TextInput({
  opacity: 0,
  position: 'absolute',
  width: 0,
  height: 0,
})

const PlaceholderText = styled.Text(({color}: {color?: string}) => ({
  color,
}))
