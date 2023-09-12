import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef} from 'react'
import type {TextInput as Input, LayoutChangeEvent} from 'react-native'
import styled from 'styled-components/native'
import type {
  FlexDirection,
  InputContainerProps,
  TextInputProps,
  Position,
  TextInputRef,
  Theme,
} from './TextInput'
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {useTheme} from '../../hooks'
import {
  BLURRED,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DURATION,
  FOCUSED,
  FOCUSED_FONTSIZE,
  OUT_OF_BLUR,
  OUT_OF_FOCUS,
  UNFOCUSED_FONTSIZE,
} from './constants'

interface Size {
  width: number
  height: number
}

const TextInputOutlined = forwardRef<TextInputRef, TextInputProps>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      label,
      errorProps,
      errorText,
      leftComponent,
      rightComponent,
      labelStyle,
      numberOfLines,
      placeholder,
      maxLength,
      multiline,
      onChangeText,
      onFocus,
      onSubmitEditing,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme()
    const inputRef = useRef<Input>(null)
    const valueRef = useRef<string>('')
    const wrapperInfo = useSharedValue<Size>({width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT})
    const labelHeight = useSharedValue<number>(DEFAULT_HEIGHT)
    const textInputContentWidth = useSharedValue<number>(DEFAULT_WIDTH)
    const hasLeftComponent = useMemo(() => !!leftComponent, [leftComponent])
    const focus = useSharedValue<number>(OUT_OF_FOCUS)
    const blur = useSharedValue<number>(BLURRED)

    /**
     * This function handles the focus event of the text input. When the input is focused
     * it sets the value of focus to 1 with a duration of 200ms and value of 0 indicates that the input is not focused
     */
    const handleFocus = useCallback(() => {
      focus.value = withTiming(FOCUSED, {duration: DURATION})
      blur.value = withTiming(OUT_OF_BLUR, {duration: 1})
    }, [blur, focus])

    const handleBlur = useCallback(() => {
      blur.value = withTiming(BLURRED, {duration: 1})
      if (valueRef.current === '') {
        focus.value = withTiming(OUT_OF_FOCUS, {duration: DURATION})
      }
    }, [blur, focus])

    const setFocus = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },
      blur() {
        inputRef.current?.blur()
      },
      clear() {
        inputRef.current?.clear()
      },
    }))

    const getWrapperInfo = (event: LayoutChangeEvent) => {
      const {width, height} = event.nativeEvent.layout
      wrapperInfo.value = {width, height}
    }

    const getLabelInfo = (event: LayoutChangeEvent) => {
      labelHeight.value = event.nativeEvent.layout.height
    }

    const getTextInputContentInfo = (event: LayoutChangeEvent) => {
      textInputContentWidth.value = event.nativeEvent.layout.width
    }
    /**
     * Returns the animated style for the input label based on the focus and wrapper information
     * @returns an object containing animated styles for the input label
     */
    const animatedLabelStyle = useAnimatedStyle(() => {
      // Calculates the animated left position for the label based on wrapper width and textInputContent width
      const leftAnimated = interpolate(
        focus.value,
        [0, 1],
        [0, -(wrapperInfo.value.width - textInputContentWidth.value - 13)],
      )
      // Calculates the animated top position for the label based on wrapper height and label height
      const topAnimated = interpolate(
        focus.value,
        [0, 1],
        [(wrapperInfo.value.height - labelHeight.value) / 2, -labelHeight.value / 2],
      )
      // Calculates the animated font size for the label
      const fontSizeAnimated = interpolate(focus.value, [0, 1], [UNFOCUSED_FONTSIZE, FOCUSED_FONTSIZE])
      return {
        fontSize: fontSizeAnimated,
        left: hasLeftComponent ? leftAnimated : 0,
        color: !blur.value ? theme.colors.primary : theme.colors.placeHolderText,
        top: wrapperInfo.value.height === 0 || labelHeight.value === 0 ? undefined : topAnimated,
      }
    }, [wrapperInfo, labelHeight, focus, blur])

    const animatedContentStyle = useAnimatedStyle(
      () => ({
        borderColor: !blur.value ? theme.colors.primary : theme.colors.primaryBorder,
      }),
      [blur],
    )

    return (
      <Container style={containerStyle}>
        <Wrapper testID="test-Wrapper" onPress={setFocus} onLayout={getWrapperInfo}>
          <Content style={[animatedContentStyle, inputContainerStyle]}>
            {!!leftComponent && leftComponent}
            <TextInputContent testID="test-TextInputContent" onLayout={getTextInputContentInfo}>
              {!!label && (
                <Label testID={'test-Label'} onLayout={getLabelInfo} style={[animatedLabelStyle, labelStyle]}>
                  {label}
                </Label>
              )}
              <TextInput
                testID={'test-TextInputOutlined'}
                ref={inputRef}
                multiline={multiline}
                style={inputStyle}
                editable={editable}
                numberOfLines={numberOfLines}
                placeholder={placeholder}
                maxLength={maxLength}
                onChangeText={(text: string) => {
                  valueRef.current = text
                  onChangeText?.(text)
                }}
                onSubmitEditing={onSubmitEditing}
                onFocus={() => {
                  onFocus?.()
                  handleFocus()
                }}
                onBlur={() => {
                  onBlur?.()
                  handleBlur()
                }}
                {...rest}
              />
            </TextInputContent>
            {!!rightComponent && rightComponent}
          </Content>
        </Wrapper>
        {!!errorText && (
          <ErrorText testID="test-ErrorText" {...errorProps}>
            {errorText}
          </ErrorText>
        )}
      </Container>
    )
  },
)

const Container = styled.View({})

const Wrapper = styled.TouchableWithoutFeedback({})

const TextInputContent = styled.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center',
}))

const Content = styled(Animated.View)((props: InputContainerProps) => ({
  flexDirection: 'row' as FlexDirection,
  height: props.theme?.sizes?.substantial,
  borderWidth: props.theme?.borderWidths?.tiny,
  borderRadius: props.theme?.borderWidths?.small,
  paddingHorizontal: props.theme?.spacing?.petite,
  backgroundColor: props.theme?.colors?.lightBackground,
  alignItems: 'center',
}))

const Label = styled(Animated.Text)(({theme}: Theme) => ({
  position: 'absolute' as Position,
  paddingHorizontal: theme?.spacing?.petite,
  zIndex: 1,
  backgroundColor: theme?.colors?.lightBackground,
}))

const ErrorText = styled.Text(({theme}: Theme) => ({
  fontSize: theme?.fontSizes?.sm,
  color: theme?.colors?.errorText,
}))

const TextInput = styled.TextInput(({theme}: Theme) => ({
  paddingVertical: 0,
  fontSize: theme?.fontSizes?.sm,
  color: theme?.colors?.darkTextColor,
}))

TextInputOutlined.displayName = 'TextInputOutlined'

export default TextInputOutlined
