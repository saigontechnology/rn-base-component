import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {TextInput, View, Animated, StyleSheet, LayoutChangeEvent} from 'react-native'
import {metrics, responsiveFont, responsiveHeight} from '../helpers/metrics'
import styled from 'styled-components/native'
import {colors} from '../helpers/colors'
import type {TextInputContainerProps, ITextInputFlat} from './TextInput'
import {Error} from './components'

export const TextInputFlat = forwardRef<TextInput, ITextInputFlat>(
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
      textAlignVertical = 'top',
      maxLength,
      numberOfLines,
      keyboardType,
      errorText,
      errorProps,
      labelStyle,
      autoCapitalize = 'none',
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
    const topAnimated = useRef<Animated.Value>(new Animated.Value(0)).current
    const containerHeightRef = useRef<number>(metrics.huge)

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleFocus = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocused(false)
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

    const getHeight = (event: LayoutChangeEvent) => {
      containerHeightRef.current = event.nativeEvent.layout.height
    }

    const moveToTop = useMemo(
      () =>
        topAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [(containerHeightRef.current - metrics.medium) / 2, -metrics.medium / 2],
        }),
      [topAnimated],
    )

    const moveToLeft = useMemo(
      () =>
        topAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -metrics.medium],
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
        <TextInputContainer
          onLayout={getHeight}
          style={inputContainerStyle}
          multiline={multiline}
          isFocused={isFocused}>
          {!!leftComponent && leftComponent}
          <ContentContainer>
            {!!label && (
              <Animated.Text
                style={[
                  styles.labelContainer,
                  {
                    left: leftComponent ? moveToLeft : metrics.xxs,
                    top: moveToTop,
                    fontSize: reduceFontSize,
                    color: isFocused ? colors.primary : colors.placeHolderText,
                  },
                  labelStyle,
                ]}
                onPress={handleFocus}>
                {label}
              </Animated.Text>
            )}
            <TextInputComponent
              testID={'test-textInputFlat'}
              ref={ref}
              as={TextInput}
              value={value}
              style={inputStyle}
              editable={editable}
              underlineColorAndroid="transparent"
              multiline={multiline}
              numberOfLines={numberOfLines}
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
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    lineHeight: responsiveHeight(18),
    height: metrics.medium,
    backgroundColor: colors.white,
  },
})

const ContentContainer = styled.View({
  flex: 1,
})

const TextInputContainer = styled.View<TextInputContainerProps>(props => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: props.isFocused ? colors.primary : colors.gray,
  height: props.multiline ? metrics.giant : metrics.huge,
  minHeight: metrics.huge,
  borderRadius: 6,
}))

const TextInputComponent = styled.TextInput({
  flex: 1,
  textAlignVertical: 'center',
})

export default TextInputFlat
