import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import styled from 'styled-components/native'
import {useTheme} from '../../hooks'
import {metrics} from '../../helpers'
import {Cursor} from './Cursor'
import {Text} from '../Text/Text'
import {ErrorText, HelperText} from './components'

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

  /** Style for outer container */
  containerStyle?: StyleProp<ViewStyle>

  /** Label text displayed above the code input */
  label?: string

  /** Custom label component to replace default label text */
  labelComponent?: ReactNode

  /** Styling for the label */
  labelStyle?: StyleProp<TextStyle>

  /** Props to be passed to the label Text component */
  labelProps?: TextProps

  /** Show asterisk beside label for required fields */
  isRequire?: boolean

  /** Helper text displayed below the code input */
  helperText?: string

  /** Custom helper component to replace default helper text */
  helperComponent?: ReactNode

  /** Props to be passed to the helper text component */
  helperTextProps?: TextProps

  /** Error text displayed below the code input */
  errorText?: string

  /** Props to be passed to the error text component */
  errorProps?: TextProps

  /** Enable error state styling */
  error?: boolean

  /** Style for cell in error state */
  errorCellStyle?: StyleProp<ViewStyle>

  /** Enable success state styling */
  success?: boolean

  /** Style for cell in success state */
  successCellStyle?: StyleProp<ViewStyle>

  /** Style for cell in disabled state */
  disabledCellStyle?: StyleProp<ViewStyle>

  /** Style for cell in active state */
  activeCellStyle?: StyleProp<ViewStyle>

  /** React node to be rendered on the left side of the code input */
  leftComponent?: ReactNode

  /** React node to be rendered on the right side of the code input */
  rightComponent?: ReactNode
}

// Default constants moved to theme configuration

// Main component
export const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(
  (
    {
      length,
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
      secureTextEntry,
      keyboardType,
      withCursor,
      placeholder,
      placeholderTextColor,
      placeholderAsDot,
      placeholderDotStyle,
      autoFocus,
      disabled,
      testID = 'code-input',
      containerStyle,
      label,
      labelComponent,
      labelStyle,
      labelProps,
      isRequire,
      helperText,
      helperComponent,
      helperTextProps,
      errorText,
      errorProps,
      error,
      errorCellStyle,
      success,
      successCellStyle,
      disabledCellStyle,
      activeCellStyle,
      leftComponent,
      rightComponent,
      ...textInputProps
    },
    ref,
  ) => {
    const CodeInputTheme = useTheme().components.CodeInput
    const textInputRef = useRef<TextInput>(null)
    const [internalValue, setInternalValue] = useState<CodeInputValue>(controlledValue || '')
    const [isFocused, setIsFocused] = useState(false)

    // Use theme defaults with props override
    const actualLength = length ?? CodeInputTheme.length

    // Use controlled or uncontrolled value
    const code = controlledValue !== undefined ? controlledValue : internalValue
    const isControlled = controlledValue !== undefined

    // Validation
    const isValidLength = useMemo(() => actualLength > 0 && actualLength <= 20, [actualLength])
    const focusedCellIndex = useMemo(
      () => Math.min(code.length, actualLength - 1),
      [code.length, actualLength],
    )

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

        // Apply styles in priority order: disabled > error > success > focused > filled > default
        const cellStyles = [
          cellStyle,
          hasCellValue && filledCellStyle,
          isCellFocused && (activeCellStyle ?? focusCellStyle),
          success && (successCellStyle ?? CodeInputTheme.successCellStyle),
          error && (errorCellStyle ?? CodeInputTheme.errorCellStyle),
          disabled && (disabledCellStyle ?? CodeInputTheme.disabledCellStyle),
        ]

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
              accessibilityHint={`Tap to ${cellValue ? 'clear and ' : ''}enter code digit`}
              accessibilityState={{
                disabled: !!disabled,
                selected: isCellFocused,
              }}>
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
        activeCellStyle,
        cellWrapperStyle,
        focusCellWrapperStyle,
        handleCellPress,
        disabled,
        error,
        success,
        errorCellStyle,
        successCellStyle,
        disabledCellStyle,
        length,
        testID,
        renderCellContent,
        CodeInputTheme,
      ],
    )

    const cells = useMemo(() => {
      if (!isValidLength) {
        return []
      }

      return Array.from({length: actualLength}, (_, index) => renderCell(index))
    }, [isValidLength, actualLength, renderCell])

    // Don't render if invalid length
    if (!isValidLength) {
      console.warn(`CodeInput: Invalid length ${actualLength}. Length must be between 1 and 20.`)
      return null
    }

    return (
      <Container testID={testID} style={containerStyle}>
        {labelComponent ? (
          <LabelContainer testID={`${testID}-label-container`}>
            {labelComponent}
            {isRequire && <RequiredStar testID={`${testID}-required`}> *</RequiredStar>}
          </LabelContainer>
        ) : (
          !!label && (
            <LabelText
              testID={`${testID}-label`}
              style={labelStyle ?? CodeInputTheme.labelStyle}
              {...labelProps}>
              {label}
              {isRequire && <RequiredStar testID={`${testID}-required`}> *</RequiredStar>}
            </LabelText>
          )
        )}
        <InputWrapper>
          <HiddenTextInput
            testID={`${testID}-hidden-input`}
            ref={textInputRef}
            value={code}
            onChangeText={handleValueChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={actualLength}
            keyboardType={keyboardType ?? CodeInputTheme.keyboardType}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            autoFocus={autoFocus ?? CodeInputTheme.autoFocus}
            editable={!(disabled ?? CodeInputTheme.disabled)}
            accessible={true}
            accessibilityLabel={`Code input with ${actualLength} digits${error ? ', error' : ''}${
              success ? ', success' : ''
            }${disabled ? ', disabled' : ''}`}
            accessibilityHint={`Enter ${actualLength} digit code`}
            accessibilityValue={{
              text: `${code.length} of ${actualLength} digits entered`,
            }}
            accessibilityState={{
              disabled: !!disabled,
            }}
            {...textInputProps}
          />
          <ComponentRow>
            {!!leftComponent && leftComponent}
            <CellContainer
              style={cellContainerStyle}
              accessible={true}
              accessibilityLabel={`Code input cells, ${code.length} of ${actualLength} filled${
                error ? ', error' : ''
              }${success ? ', success' : ''}${disabled ? ', disabled' : ''}`}
              accessibilityState={{
                disabled: !!disabled,
              }}>
              {cells}
            </CellContainer>
            {!!rightComponent && rightComponent}
          </ComponentRow>
        </InputWrapper>
        {!!errorText && <ErrorText errorText={errorText} errorProps={errorProps} />}
        {!errorText && (!!helperText || !!helperComponent) && (
          <HelperText
            helperText={helperText}
            helperComponent={helperComponent}
            helperTextProps={helperTextProps}
          />
        )}
      </Container>
    )
  },
)

CodeInput.displayName = 'CodeInput'

// Styled components
const Container = styled.View({})

const InputWrapper = styled.View({
  position: 'relative',
})

const LabelContainer = styled.View(({theme}) => ({
  marginBottom: theme?.spacing?.tiny || 8,
  flexDirection: 'row',
  alignItems: 'center',
}))

const LabelText = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.sm || 14,
  color: theme?.colors?.darkText || '#333',
  marginBottom: theme?.spacing?.tiny || 8,
}))

const RequiredStar = styled.Text(({theme}) => ({
  color: theme?.colors?.errorText || '#ff0000',
}))

const ComponentRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
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
