function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { isIOS, metrics, responsiveHeight } from '../../helpers';
import { useTheme } from '../../hooks';
import { BLURRED, DEFAULT_HEIGHT, DEFAULT_WIDTH, DURATION, FOCUSED, FOCUSED_FONTSIZE, OUT_OF_BLUR, OUT_OF_FOCUS, UNFOCUSED_FONTSIZE } from './constants';
const TextInputFlat = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
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
  } = _ref;
  const theme = useTheme();
  const inputRef = useRef(null);
  const valueRef = useRef('');
  const wrapperInfo = useSharedValue({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  });
  const labelHeight = useSharedValue(DEFAULT_HEIGHT);
  const textInputContentWidth = useSharedValue(DEFAULT_WIDTH);
  const focus = useSharedValue(OUT_OF_FOCUS);
  const blur = useSharedValue(BLURRED);
  const handleFocus = useCallback(() => {
    focus.value = withTiming(FOCUSED, {
      duration: DURATION
    });
    blur.value = withTiming(OUT_OF_BLUR, {
      duration: 1
    });
  }, [blur, focus]);
  const handleBlur = useCallback(() => {
    blur.value = withTiming(BLURRED, {
      duration: 1
    });
    if (valueRef.current === '') {
      focus.value = withTiming(OUT_OF_FOCUS, {
        duration: DURATION
      });
    }
  }, [blur, focus]);
  const setFocus = useCallback(() => {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
  }, []);
  useImperativeHandle(ref, () => ({
    focus() {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.focus();
    },
    blur() {
      var _inputRef$current3;
      (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 || _inputRef$current3.blur();
    },
    clear() {
      var _inputRef$current4;
      (_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 || _inputRef$current4.clear();
    }
  }));
  const getWrapperInfo = event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    wrapperInfo.value = {
      width,
      height
    };
  };
  const getLabelInfo = event => {
    labelHeight.value = event.nativeEvent.layout.height;
  };
  const getTextInputContentInfo = event => {
    textInputContentWidth.value = event.nativeEvent.layout.width;
  };

  /**
   * Returns the animated style for the input label based on label height and wrapper height
   * @returns an object containing animated styles for the input label
   */
  const animatedLabelStyle = useAnimatedStyle(() => {
    const topAnimated = interpolate(focus.value, [0, 1], [(wrapperInfo.value.height - labelHeight.value) / 2, 0]);
    const fontSizeAnimated = interpolate(focus.value, [0, 1], [UNFOCUSED_FONTSIZE, FOCUSED_FONTSIZE]);
    return {
      fontSize: fontSizeAnimated,
      color: !blur.value ? theme.colors.primary : theme.colors.placeHolderText,
      top: wrapperInfo.value.height === 0 || labelHeight.value === 0 ? undefined : topAnimated
    };
  }, [wrapperInfo, labelHeight, focus]);
  const animatedContentStyle = useAnimatedStyle(() => ({
    borderColor: !blur.value ? theme.colors.primary : theme.colors.primaryBorder
  }), [blur]);
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(Wrapper, {
    testID: "test-Wrapper",
    onPress: setFocus,
    onLayout: getWrapperInfo
  }, /*#__PURE__*/React.createElement(ContentAnimated, {
    style: [animatedContentStyle, StyleSheet.flatten(inputContainerStyle)]
  }, /*#__PURE__*/React.createElement(LeftContainer, null, !!leftComponent && leftComponent), /*#__PURE__*/React.createElement(TextInputContent, {
    testID: "test-TextInputContent",
    onLayout: getTextInputContentInfo
  }, !!label && /*#__PURE__*/React.createElement(LabelAnimated, {
    testID: 'test-Label',
    onLayout: getLabelInfo,
    style: [animatedLabelStyle, StyleSheet.flatten(labelStyle)]
  }, label), /*#__PURE__*/React.createElement(TextInputComponent, _extends({
    testID: 'test-TextInputFlat',
    ref: inputRef,
    multiline: multiline,
    style: [inputStyle],
    editable: editable,
    numberOfLines: numberOfLines,
    placeholder: placeholder,
    maxLength: maxLength,
    onChangeText: text => {
      valueRef.current = text;
      onChangeText === null || onChangeText === void 0 || onChangeText(text);
    },
    onSubmitEditing: onSubmitEditing,
    onFocus: () => {
      onFocus === null || onFocus === void 0 || onFocus();
      handleFocus();
    },
    onBlur: () => {
      onBlur === null || onBlur === void 0 || onBlur();
      handleBlur();
    }
  }, rest))), !!rightComponent && rightComponent)), !!errorText && /*#__PURE__*/React.createElement(ErrorText, _extends({
    testID: "test-ErrorText"
  }, errorProps), errorText));
});
const Wrapper = styled.Pressable({});
const LeftContainer = styled.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    marginBottom: isIOS ? 0 : -((theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.petite) || 0)
  };
});
const TextInputContent = styled.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center'
}));
const Content = styled.View(props => {
  var _props$theme, _props$theme2, _props$theme3, _props$theme4, _props$theme5;
  return {
    flexDirection: 'row',
    height: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.sizes) === null || _props$theme === void 0 ? void 0 : _props$theme.substantial,
    borderWidth: (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.borderWidths) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.tiny,
    borderRadius: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.borderWidths) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.small,
    paddingHorizontal: (_props$theme4 = props.theme) === null || _props$theme4 === void 0 || (_props$theme4 = _props$theme4.spacing) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.petite,
    backgroundColor: (_props$theme5 = props.theme) === null || _props$theme5 === void 0 || (_props$theme5 = _props$theme5.colors) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.lightBackground,
    alignItems: 'center'
  };
});
const ContentAnimated = Animated.createAnimatedComponent(Content);
const Label = styled.Text(_ref3 => {
  var _theme$spacing2, _theme$spacing3, _theme$spacing4, _theme$spacing5, _theme$colors;
  let {
    theme
  } = _ref3;
  return {
    position: 'absolute',
    width: '100%',
    left: isIOS ? -responsiveHeight((theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.tiny) ?? 0) : 0,
    paddingHorizontal: responsiveHeight((theme === null || theme === void 0 || (_theme$spacing3 = theme.spacing) === null || _theme$spacing3 === void 0 ? void 0 : _theme$spacing3.small) ?? metrics.paddingHorizontal),
    paddingTop: responsiveHeight((theme === null || theme === void 0 || (_theme$spacing4 = theme.spacing) === null || _theme$spacing4 === void 0 ? void 0 : _theme$spacing4.tiny) ?? metrics.tiny),
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing5 = theme.spacing) === null || _theme$spacing5 === void 0 ? void 0 : _theme$spacing5.tiny,
    zIndex: 1,
    backgroundColor: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.lightBackground
  };
});
const LabelAnimated = Animated.createAnimatedComponent(Label);
const ErrorText = styled.Text(_ref4 => {
  var _theme$fontSizes, _theme$colors2;
  let {
    theme
  } = _ref4;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.md,
    color: theme === null || theme === void 0 || (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.errorText
  };
});
const ForwardRefTextInputComponent = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(RNTextInput, _extends({}, props, {
  ref: ref
})));
const TextInputComponent = styled(ForwardRefTextInputComponent)(_ref5 => {
  var _theme$fontSizes2, _theme$spacing6, _theme$colors3;
  let {
    theme
  } = _ref5;
  return {
    paddingVertical: 0,
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes2 = theme.fontSizes) === null || _theme$fontSizes2 === void 0 ? void 0 : _theme$fontSizes2.xs,
    textAlignVertical: 'bottom',
    marginRight: theme === null || theme === void 0 || (_theme$spacing6 = theme.spacing) === null || _theme$spacing6 === void 0 ? void 0 : _theme$spacing6.miniature,
    color: theme === null || theme === void 0 || (_theme$colors3 = theme.colors) === null || _theme$colors3 === void 0 ? void 0 : _theme$colors3.darkTextColor
  };
});
TextInputFlat.displayName = 'TextInputFlat';
export default TextInputFlat;
//# sourceMappingURL=TextInputFlat.js.map