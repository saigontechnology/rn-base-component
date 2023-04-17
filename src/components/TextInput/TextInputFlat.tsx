import React, {forwardRef, useCallback, useImperativeHandle, useRef} from 'react'
import type {TextInput as Input, LayoutChangeEvent} from 'react-native'
import styled from 'styled-components/native'
import type {
  FlexDirection,
  TextInputProps,
  InputContainerProps,
  Position,
  TextInputRef,
  Theme,
} from './TextInput'
import {isIOS} from '../../helpers/metrics'
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

const TextInputFlat = forwardRef<TextInputRef, TextInputProps>(
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
    const valueRef = useRef('')
    const wrapperInfo = useSharedValue<Size>({width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT})
    const labelHeight = useSharedValue<number>(DEFAULT_HEIGHT)
    const textInputContentWidth = useSharedValue<number>(DEFAULT_WIDTH)
    const focus = useSharedValue<number>(OUT_OF_FOCUS)
    const blur = useSharedValue<number>(BLURRED)

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
     * Returns the animated style for the input label based on label height and wrapper height
     * @returns an object containing animated styles for the input label
     */
    const animatedLabelStyle = useAnimatedStyle(() => {
      const topAnimated = interpolate(
        focus.value,
        [0, 1],
        [(wrapperInfo.value.height - labelHeight.value) / 2, 0],
      )
      const fontSizeAnimated = interpolate(focus.value, [0, 1], [UNFOCUSED_FONTSIZE, FOCUSED_FONTSIZE])

      return {
        fontSize: fontSizeAnimated,
        color: !blur.value ? theme.colors.primary : theme.colors.placeHolderText,
        top: wrapperInfo.value.height === 0 || labelHeight.value === 0 ? undefined : topAnimated,
      }
    }, [wrapperInfo, labelHeight, focus])

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
            <LeftContainer>{!!leftComponent && leftComponent}</LeftContainer>
            <TextInputContent testID="test-TextInputContent" onLayout={getTextInputContentInfo}>
              {!!label && (
                <Label testID={'test-Label'} onLayout={getLabelInfo} style={[animatedLabelStyle, labelStyle]}>
                  {label}
                </Label>
              )}
              <TextInput
                testID={'test-TextInputFlat'}
                ref={inputRef}
                multiline={multiline}
                style={[inputStyle]}
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

const LeftContainer = styled.View(({theme}: Theme) => ({
  marginBottom: isIOS ? 0 : -(theme?.spacing?.micro || 0),
}))

const TextInputContent = styled.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center',
}))

const Content = styled(Animated.View)((props: InputContainerProps) => ({
  flexDirection: 'row' as FlexDirection,
  height: props.theme?.sizes?.extensive,
  borderWidth: props.theme?.borderWidths?.smallest,
  borderRadius: props.theme?.borderWidths?.small,
  paddingHorizontal: props.theme?.spacing?.micro,
  backgroundColor: props.theme?.colors?.lightBackground,
  alignItems: 'center',
}))

const Label = styled(Animated.Text)(({theme}: Theme) => ({
  position: 'absolute' as Position,
  width: '100%',
  left: isIOS ? -(theme?.spacing?.puny || 0) : 0,
  paddingHorizontal: theme?.spacing?.micro,
  paddingTop: theme?.spacing?.mini,
  paddingBottom: theme?.spacing?.tiny,
  zIndex: 1,
  backgroundColor: theme?.colors?.lightBackground,
}))

const ErrorText = styled.Text(({theme}: Theme) => ({
  fontSize: theme?.fontSizes?.md,
  color: theme?.colors?.errorText,
}))

const TextInput = styled.TextInput(({theme}: Theme) => ({
  paddingVertical: 0,
  fontSize: theme?.fontSizes?.xs,
  textAlignVertical: 'bottom',
  marginRight: theme?.spacing?.puny,
  color: theme?.colors?.darkTextColor,
}))

TextInputFlat.displayName = 'TextInputFlat'

export default TextInputFlat
