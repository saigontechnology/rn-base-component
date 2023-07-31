import React, {ReactNode, useCallback, useRef, useState, memo} from 'react'
import {TextInput, Text, StyleProp, ViewStyle, KeyboardTypeOptions, TextStyle} from 'react-native'
import {metrics} from '../../helpers/metrics'
import styled from 'styled-components/native'
import Cursor from './Cursor'
import type {ITheme} from 'src/theme'

interface CodeInputProps {
  /** define style for cell */
  cellStyle?: StyleProp<ViewStyle>

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
}

type CellStyle = {
  theme: ITheme
}

type SecureViewStyle = {
  theme: ITheme
}

const DEFAULT_LENGTH = 6

const CodeInput = ({
  cellStyle,
  focusCellStyle,
  textStyle,
  focusTextStyle,
  secureViewStyle,
  length = DEFAULT_LENGTH,
  onSubmit,
  customCursor,
  secureTextEntry,
  keyboardType = 'number-pad',
}: CodeInputProps) => {
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

  const renderCells = useCallback(() => {
    const cells = []
    for (let index = 0; index < length; index++) {
      const isFocused = code.length === index

      cells.push(
        <Cell
          testID="cell"
          style={[cellStyle, isFocused && focusCellStyle]}
          key={index}
          onPress={() => handleCellPress(index)}>
          {code[index] ? (
            secureTextEntry ? (
              <SecureView testID="text" style={secureViewStyle} />
            ) : (
              <Text testID="text" style={textStyle}>
                {code[index]}
              </Text>
            )
          ) : (
            isFocused && (customCursor ? customCursor() : <Cursor style={focusTextStyle} />)
          )}
        </Cell>,
      )
    }
    return cells
  }, [
    length,
    cellStyle,
    focusCellStyle,
    code,
    customCursor,
    textStyle,
    focusTextStyle,
    handleCellPress,
    secureTextEntry,
    secureViewStyle,
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
      />
      <CellContainer>{renderCells()}</CellContainer>
    </CodeInputContainer>
  )
}

export default memo(CodeInput)

const CodeInputContainer = styled.View({})

const Cell = styled.Pressable((props: CellStyle) => ({
  width: metrics.huge,
  height: metrics.huge,
  borderRadius: metrics.tiny,
  borderWidth: 1,
  borderColor: props?.theme?.colors?.coolGray,
  justifyContent: 'center',
  alignItems: 'center',
  margin: metrics.tiny,
}))

const SecureView = styled.Pressable((props: SecureViewStyle) => ({
  width: metrics.small,
  height: metrics.small,
  borderRadius: metrics.small,
  backgroundColor: props?.theme?.colors?.darkText,
}))

const CellContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const StyledTextInput = styled.TextInput({
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})
