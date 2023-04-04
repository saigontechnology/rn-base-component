import React, {ReactNode, useCallback, useRef, useState, memo} from 'react'
import {TextInput, Text, StyleProp, ViewStyle, KeyboardTypeOptions, TextStyle} from 'react-native'
import {metrics} from '../helpers/metrics'
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

  /** define style for text in the cell when cell is focused */
  focusTextStyle?: StyleProp<TextStyle>

  /** cell count */
  cellCount?: number
  /** callback when complete  */

  onFulfill?: (val: string) => void

  /** render custom view for cursor/indicator */
  customCursor?: () => ReactNode

  /** render custom view for cursor/indicator */
  secureTextEntry?: boolean

  /** keyboard type */
  keyboardType?: KeyboardTypeOptions
}

const DEFAULT_CELL_COUNT = 6

const CodeInput = ({
  cellStyle,
  focusCellStyle,
  textStyle,
  focusTextStyle,
  cellCount = DEFAULT_CELL_COUNT,
  onFulfill,
  customCursor,
  secureTextEntry,
  keyboardType = 'number-pad',
}: CodeInputProps) => {
  const textInputRef = useRef<TextInput>()
  const [code, setCode] = useState<string>('')
  const [focusIndex, setFocusIndex] = useState<number>(0)

  const handleOnChangeText = useCallback(
    (val: string) => {
      setCode(val)
      setFocusIndex(val.length)
      if (val.length === cellCount) {
        onFulfill && onFulfill(val)
        textInputRef.current?.blur()
      }
    },
    [cellCount, onFulfill],
  )

  const handleCellPress = useCallback(
    (index: number) => {
      if (index < code.length) {
        setCode(code.slice(0, index))
        setFocusIndex(index)
      }
      textInputRef.current?.focus()
    },
    [code],
  )

  return (
    <CodeInputContainer>
      <StyledTextInput
        testID="input"
        ref={textInputRef}
        value={code}
        textContentType="oneTimeCode"
        keyboardType={keyboardType}
        onChangeText={handleOnChangeText}
        maxLength={cellCount}
      />
      <CellContainer>
        {new Array(cellCount).fill(0).map((_, index: number) => {
          const isFocused = focusIndex === index
          return (
            <Cell
              testID="cell"
              style={[cellStyle, isFocused && focusCellStyle]}
              key={index}
              onPress={() => handleCellPress(index)}>
              {code[index] ? (
                secureTextEntry ? (
                  <SecureView testID="text" style={textStyle} />
                ) : (
                  <Text testID="text" style={textStyle}>
                    {code[index]}
                  </Text>
                )
              ) : (
                isFocused && (customCursor ? customCursor() : <Cursor style={focusTextStyle} />)
              )}
            </Cell>
          )
        })}
      </CellContainer>
    </CodeInputContainer>
  )
}

export default memo(CodeInput)

const CodeInputContainer = styled.View({})

const Cell = styled.Pressable`
  ${(props: {theme: ITheme}) => ({
    width: metrics.huge,
    height: metrics.huge,
    borderRadius: metrics.tiny,
    borderWidth: 1,
    borderColor: props?.theme?.colors?.cardPrimaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.tiny,
  })}
`

const SecureView = styled.View`
  ${(props: {theme: ITheme}) => ({
    width: metrics.small,
    height: metrics.small,
    borderRadius: metrics.small,
    backgroundColor: props.theme.colors.textColor,
  })}
`

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
