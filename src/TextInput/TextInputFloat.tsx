import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  ForwardRefExoticComponent,
} from 'react'
import {
  TextInput,
  View,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {isIOS, metrics, responsiveFont, responsiveHeight} from '../helpers/metrics'
import styled from 'styled-components/native'
import {colors} from '../helpers/colors'
import type {
  AnimationMode,
  FlexDirection,
  InputContainerProps,
  ITextInputAnimation,
  TextInputRef,
} from './TextInput'
import {Error} from './components'

interface ContentContainerProps {
  isOutLinedMode: boolean
}

interface TextInputComponentProps {
  mode: AnimationMode
  multiline?: boolean
}

const FLOAT_TITLE_HALF_HEIGHT = responsiveHeight(10)
const INPUT_HEIGHT = responsiveHeight(55)

interface CompoundedComponent
  extends ForwardRefExoticComponent<ITextInputAnimation & React.RefAttributes<TextInputRef>> {
  Float: React.FunctionComponent<ITextInputAnimation>
}

const TextInputFloat = forwardRef<TextInputRef, ITextInputAnimation>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      value,
      label,
      scrollEnabled,
      leftComponent,
      rightComponent,
      mode = 'None',
      keyboardType,
      errorText,
      errorProps,
      labelStyle,
      numberOfLines,
      placeholder,
      maxLength,
      textAlignVertical,
      autoCapitalize,
      autoCorrect,
      autoFocus,
      multiline,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry,
      onChangeText,
      onFocus,
      onSubmitEditing,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null)
    const topAnimated = useRef<Animated.Value>(new Animated.Value(0)).current
    const [containerHeight, setContainerHeight] = useState<number>(INPUT_HEIGHT)

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const isOutLinedMode = useMemo(() => mode === 'Outlined', [mode])
    const isNoneMode = useMemo(() => mode === 'None', [mode])

    const endAnimationTop = useMemo(
      () => (isOutLinedMode ? -FLOAT_TITLE_HALF_HEIGHT : metrics.tiny),
      [isOutLinedMode],
    )
    const startAnimationTop = useMemo(
      () => (isNoneMode ? containerHeight / 2 : (containerHeight - metrics.medium) / 2),
      [containerHeight, isNoneMode],
    )

    const noneModeStyle = useMemo(
      () => ({
        borderBottomWidth: metrics.borderWidth,
        paddingBottom: metrics.tiny,
        paddingLeft: metrics.tiny,
        alignItems: 'flex-end',
      }),
      [],
    )

    const otherModeStyle = useMemo(
      () => ({
        borderWidth: 1,
        paddingHorizontal: metrics.xxs,
        paddingBottom: metrics.tiny,
        alignItems: 'center',
      }),
      [],
    )

    const textInputStyle = useMemo(
      () => ({textAlignVertical: 'bottom', paddingBottom: isNoneMode ? 0 : responsiveHeight(3)}),
      [isNoneMode],
    )

    const handleFocus = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocused(false)
    }, [])

    const setFocus = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    const animatedFocus = useCallback(() => {
      Animated.timing(topAnimated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [topAnimated])

    const animatedBlur = useCallback(() => {
      Animated.timing(topAnimated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [topAnimated])

    useEffect(() => {
      if (isFocused || value !== '') {
        animatedFocus()
      } else {
        animatedBlur()
      }
    }, [animatedBlur, animatedFocus, isFocused, value])

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

    const getHeight = (event: LayoutChangeEvent) => {
      setContainerHeight(event.nativeEvent.layout.height)
    }

    const moveToTop = useMemo(
      () =>
        topAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [startAnimationTop, endAnimationTop],
        }),
      [startAnimationTop, endAnimationTop, topAnimated],
    )

    const moveToLeft = useMemo(
      () =>
        topAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -metrics.xl],
        }),
      [topAnimated],
    )

    const reduceFontSize = useMemo(
      () =>
        topAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [responsiveFont(14), responsiveFont(11)],
        }),
      [topAnimated],
    )

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={setFocus} onLayout={getHeight}>
          <TextInputContainer
            style={[
              inputContainerStyle,
              (isNoneMode ? noneModeStyle : otherModeStyle) as StyleProp<ViewStyle>,
            ]}
            multiline={multiline}
            isFocused={isFocused}>
            {!!leftComponent && leftComponent}
            <ContentContainer isOutLinedMode={isOutLinedMode}>
              {!!label && (
                <Animated.Text
                  style={StyleSheet.flatten([
                    styles.labelContainer,
                    {
                      left: !isOutLinedMode
                        ? isIOS
                          ? 0
                          : metrics.tiny
                        : leftComponent
                        ? moveToLeft
                        : metrics.xxs,
                      top: moveToTop,
                      fontSize: reduceFontSize,
                      color: isFocused ? colors.primary : colors.placeHolderText,
                      backgroundColor: isOutLinedMode ? colors.white : 'transparent',
                    },
                    labelStyle,
                  ])}>
                  {label}
                </Animated.Text>
              )}
              <TextInputComponent
                testID={'test-textInputFloat'}
                ref={inputRef}
                value={value}
                multiline={multiline}
                mode={mode}
                style={[
                  inputStyle,
                  (!isOutLinedMode && !isIOS && textInputStyle) as StyleProp<ViewStyle>,
                  isNoneMode && {lineHeight: metrics.large},
                ]}
                editable={editable}
                numberOfLines={numberOfLines}
                placeholder={placeholder}
                maxLength={maxLength}
                textAlignVertical={textAlignVertical}
                scrollEnabled={scrollEnabled}
                keyboardType={keyboardType}
                placeholderTextColor={placeholderTextColor}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                onFocus={() => {
                  onFocus?.()
                  handleFocus()
                }}
                onSubmitEditing={onSubmitEditing}
                onBlur={() => {
                  onBlur?.()
                  handleBlur()
                }}
                {...rest}
              />
            </ContentContainer>
            {!!rightComponent && rightComponent}
          </TextInputContainer>
        </TouchableWithoutFeedback>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </View>
    )
  },
) as CompoundedComponent

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    lineHeight: responsiveHeight(18),
    height: metrics.medium,
  },
})

const ContentContainer = styled.View((props: ContentContainerProps) => ({
  flex: 1,
  paddingTop: props.isOutLinedMode ? 0 : metrics.small,
}))

const TextInputContainer = styled.View((props: InputContainerProps) => ({
  flexDirection: 'row' as FlexDirection,
  borderColor: props.isFocused ? colors.primary : colors.gray,
  borderRadius: metrics.borderRadius,
  alignItems: 'center',
}))

const TextInputComponent = styled.TextInput((props: TextInputComponentProps) => ({
  height: props.multiline ? metrics.giant : props.mode === 'Outlined' ? metrics.huge : metrics.xxl,
  textAlignVertical: 'center',
}))

export default TextInputFloat
