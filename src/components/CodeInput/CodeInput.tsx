import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {KeyboardTypeOptions, StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {metrics} from '../../helpers'
import {Cursor} from './Cursor'
import {Text} from '../Text/Text'

// Types
type CodeInputValue = string
type CodeInputLength = number
type CellIndex = number

interface CodeInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
  getValue: () => CodeInputValue
  setValue: (value: CodeInputValue) => void
}

interface CodeInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'maxLength'> {
  /** Number of code input cells */
  length?: CodeInputLength

  /** Initial value for the code input */
  value?: CodeInputValue

  /** Callback when code changes */
  onChangeText?: (code: CodeInputValue) => void

  /** Callback when code input is complete */
  onSubmit?: (code: CodeInputValue) => void

  /** Callback when code input is cleared */
  onClear?: () => void

  /** Style for individual cell */
  cellStyle?: StyleProp<ViewStyle>

  /** Style for cell when it has a value */
  filledCellStyle?: StyleProp<ViewStyle>

  /** Style for cell when it's focused */
  focusCellStyle?: StyleProp<ViewStyle>

  /** Style for text inside cells */
  textStyle?: StyleProp<TextStyle>

  /** Style for text when cell is focused */
  focusTextStyle?: StyleProp<TextStyle>

  /** Style for secure text entry dots */
  secureViewStyle?: StyleProp<ViewStyle>

  /** Style for the container holding all cells */
  cellContainerStyle?: StyleProp<ViewStyle>

  /** Style for wrapper around each cell */
  cellWrapperStyle?: StyleProp<ViewStyle>

  /** Style for wrapper around focused cell */
  focusCellWrapperStyle?: StyleProp<ViewStyle>

  /** Custom cursor component */
  customCursor?: () => ReactNode

  /** Enable secure text entry mode */
  secureTextEntry?: boolean

  /** Keyboard type for input */
  keyboardType?: KeyboardTypeOptions

  /** Show cursor in focused cell */
  withCursor?: boolean

  /** Placeholder text for empty cells */
  placeholder?: string

  /** Color for placeholder text */
  placeholderTextColor?: string

  /** Render placeholder as dot instead of text */
  placeholderAsDot?: boolean

  /** Style for placeholder dot */
  placeholderDotStyle?: StyleProp<ViewStyle>

  /** Auto focus on mount */
  autoFocus?: boolean

  /** Disable input */
  disabled?: boolean

  /** Test ID for the component */
  testID?: string
}

// Constants
const DEFAULT_LENGTH = 6
const DEFAULT_KEYBOARD_TYPE: KeyboardTypeOptions = 'number-pad'
const DEFAULT_PLACEHOLDER = ''

// Main component
export const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(
  (
    {
      length = DEFAULT_LENGTH,
      value: controlledValue,
      onChangeText,
      onSubmit,
      onClear,
      cellStyle,
      focusCellStyle,
      filledCellStyle,
      textStyle,
      focusTextStyle,
      secureViewStyle,
      cellContainerStyle,
      cellWrapperStyle,
      focusCellWrapperStyle,
      customCursor,
      secureTextEntry = false,
      keyboardType = DEFAULT_KEYBOARD_TYPE,
      withCursor = false,
      placeholder = DEFAULT_PLACEHOLDER,
      placeholderTextColor,
      placeholderAsDot = false,
      placeholderDotStyle,
      autoFocus = false,
      disabled = false,
      testID = 'code-input',
      ...textInputProps
    },
    ref,
  ) => {
    const textInputRef = useRef<TextInput>(null)
    const [internalValue, setInternalValue] = useState<CodeInputValue>(controlledValue || '')
    const [isFocused, setIsFocused] = useState(false)

    // Use controlled or uncontrolled value
    const code = controlledValue !== undefined ? controlledValue : internalValue
    const isControlled = controlledValue !== undefined

    // Validation
    const isValidLength = useMemo(() => length > 0 && length <= 20, [length])
    const focusedCellIndex = useMemo(() => Math.min(code.length, length - 1), [code.length, length])

    // Imperative handle for ref
    useImperativeHandle(ref, () => ({
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
      clear: () => handleClear(),
      getValue: () => code,
      setValue: (newValue: CodeInputValue) => handleValueChange(newValue),
    }))

    // Handlers
    const handleValueChange = useCallback(
      (newValue: CodeInputValue) => {
        if (disabled) {
          return
        }

        const sanitizedValue = newValue.slice(0, length)

        if (!isControlled) {
          setInternalValue(sanitizedValue)
        }

        onChangeText?.(sanitizedValue)

        // Handle completion
        if (sanitizedValue.length === length) {
          onSubmit?.(sanitizedValue)
          textInputRef.current?.blur()
        }

        // Handle clearing
        if (sanitizedValue.length === 0) {
          onClear?.()
        }
      },
      [disabled, length, isControlled, onChangeText, onSubmit, onClear],
    )

    const handleClear = useCallback(() => {
      if (disabled) {
        return
      }

      handleValueChange('')
      textInputRef.current?.focus()
    }, [disabled, handleValueChange])

    const handleCellPress = useCallback(
      (index: CellIndex) => {
        if (disabled) {
          return
        }

        // Focus the input
        textInputRef.current?.focus()

        // If pressing the first cell and there's already a value, clear it
        if (index === 0 && code.length > 0) {
          handleClear()
          return
        }

        // If pressing before the current position, truncate the code
        if (index < code.length) {
          const newValue = code.slice(0, index)
          handleValueChange(newValue)
        }
      },
      [disabled, code, handleClear, handleValueChange],
    )

    const handleFocus = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocused(false)
    }, [])

    // Render functions
    const renderCursor = useCallback(
      () => (customCursor ? customCursor() : <Cursor style={focusTextStyle} />),
      [customCursor, focusTextStyle],
    )

    const renderCellContent = useCallback(
      (cellIndex: CellIndex, cellValue?: string) => {
        const isCellFocused = isFocused && cellIndex === focusedCellIndex

        if (withCursor && isCellFocused && !cellValue) {
          return renderCursor()
        }

        if (secureTextEntry && cellValue) {
          return <SecureView testID={`${testID}-secure-${cellIndex}`} style={secureViewStyle} />
        }

        if (cellValue) {
          return (
            <Text testID={`${testID}-text-${cellIndex}`} style={textStyle}>
              {cellValue}
            </Text>
          )
        }

        if (placeholderAsDot && !cellValue) {
          return <PlaceholderDot style={placeholderDotStyle} />
        }

        return (
          <PlaceholderText testID={`${testID}-placeholder-${cellIndex}`} color={placeholderTextColor}>
            {placeholder}
          </PlaceholderText>
        )
      },
      [
        isFocused,
        focusedCellIndex,
        withCursor,
        renderCursor,
        secureTextEntry,
        secureViewStyle,
        textStyle,
        placeholderTextColor,
        placeholder,
        placeholderAsDot,
        placeholderDotStyle,
        testID,
      ],
    )

    const renderCell = useCallback(
      (cellIndex: CellIndex) => {
        const cellValue = code[cellIndex]
        const isCellFocused = isFocused && cellIndex === focusedCellIndex
        const hasCellValue = Boolean(cellValue)

        const cellStyles = [cellStyle, hasCellValue && filledCellStyle, isCellFocused && focusCellStyle]

        const wrapperStyles = [cellWrapperStyle, isCellFocused && focusCellWrapperStyle]

        return (
          <CellWrapperStyled key={cellIndex} style={wrapperStyles}>
            <Cell
              testID={`${testID}-cell-${cellIndex}`}
              style={cellStyles}
              onPress={() => handleCellPress(cellIndex)}
              disabled={disabled}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Code input cell ${cellIndex + 1} of ${length}${
                cellValue ? `, contains ${cellValue}` : ', empty'
              }`}
              accessibilityHint={`Tap to ${cellValue ? 'clear and ' : ''}enter code digit`}>
              {renderCellContent(cellIndex, cellValue)}
            </Cell>
          </CellWrapperStyled>
        )
      },
      [
        code,
        isFocused,
        focusedCellIndex,
        cellStyle,
        filledCellStyle,
        focusCellStyle,
        cellWrapperStyle,
        focusCellWrapperStyle,
        handleCellPress,
        disabled,
        length,
        testID,
        renderCellContent,
      ],
    )

    const cells = useMemo(() => {
      if (!isValidLength) {
        return []
      }

      return Array.from({length}, (_, index) => renderCell(index))
    }, [isValidLength, length, renderCell])

    // Don't render if invalid length
    if (!isValidLength) {
      console.warn(`CodeInput: Invalid length ${length}. Length must be between 1 and 20.`)
      return null
    }

    return (
      <Container testID={testID}>
        <HiddenTextInput
          testID={`${testID}-hidden-input`}
          ref={textInputRef}
          value={code}
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={length}
          keyboardType={keyboardType}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          autoFocus={autoFocus}
          editable={!disabled}
          accessible={true}
          accessibilityLabel={`Code input with ${length} digits`}
          accessibilityHint={`Enter ${length} digit code`}
          accessibilityValue={{
            text: `${code.length} of ${length} digits entered`,
          }}
          {...textInputProps}
        />
        <CellContainer
          style={cellContainerStyle}
          accessible={true}
          accessibilityLabel={`Code input cells, ${code.length} of ${length} filled`}>
          {cells}
        </CellContainer>
      </Container>
    )
  },
)

CodeInput.displayName = 'CodeInput'

// Styled components
const Container = styled.View({
  position: 'relative',
})

const CellWrapperStyled = styled.View({})

const Cell = styled.Pressable<{disabled?: boolean}>(({theme, disabled}) => ({
  width: theme?.spacing?.gigantic || 48,
  height: theme?.spacing?.gigantic || 48,
  borderRadius: metrics.tiny,
  borderWidth: metrics.line,
  borderColor: theme?.colors?.coolGray || '#ccc',
  justifyContent: 'center',
  alignItems: 'center',
  margin: metrics.tiny,
  opacity: disabled ? 0.5 : 1,
  backgroundColor: disabled ? '#f5f5f5' : 'transparent',
}))

const SecureView = styled.View(({theme}) => ({
  width: theme?.spacing?.slim || 12,
  height: theme?.spacing?.slim || 12,
  borderRadius: metrics.small,
  backgroundColor: theme?.colors?.darkText || '#333',
}))

const CellContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const HiddenTextInput = styled(TextInput)({
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  top: -1000,
  left: -1000,
})

const PlaceholderText = styled.Text<{color?: string}>(({color}) => ({
  color: color || '#999',
  fontSize: 16,
}))

const PlaceholderDot = styled.View(({theme}) => ({
  width: theme?.spacing?.slim || 12,
  height: theme?.spacing?.slim || 12,
  borderRadius: metrics.small,
  backgroundColor: theme?.colors?.coolGray || '#ccc',
}))

export type {CodeInputProps, CodeInputRef}
export default CodeInput
