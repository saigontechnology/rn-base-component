function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import styled from 'styled-components/native';
import TextInputOutlined from './TextInputOutlined';
import { CustomIcon, Error } from './components';
import { isIOS } from '../../helpers';
import TextInputFlat from './TextInputFlat';
export const TextInput = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    containerStyle,
    editable,
    inputContainerStyle,
    inputStyle,
    label,
    leftComponent,
    rightComponent,
    errorText,
    errorProps,
    isRequire,
    numberOfLines,
    labelStyle,
    labelProps,
    multiline,
    onChangeText,
    onFocus,
    onSubmitEditing,
    onBlur,
    ...rest
  } = _ref;
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    },
    clear: () => {
      var _inputRef$current2;
      return (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.clear();
    },
    blur: () => {
      var _inputRef$current3;
      return (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.blur();
    }
  }));
  const handleFocus = useCallback(() => {
    var _inputRef$current4;
    (_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 || _inputRef$current4.focus();
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, !!label && /*#__PURE__*/React.createElement(Title, _extends({
    testID: "test-title",
    style: labelStyle
  }, labelProps), label, !!isRequire && /*#__PURE__*/React.createElement(StarText, {
    testID: "test-startText"
  }, " *")), /*#__PURE__*/React.createElement(TouchableContainer, {
    style: inputContainerStyle,
    activeOpacity: 1,
    onPress: handleFocus,
    disabled: editable
  }, !!leftComponent && leftComponent, /*#__PURE__*/React.createElement(TextInputComponent, _extends({
    testID: "test-TextInputComponent",
    ref: inputRef,
    style: inputStyle,
    editable: editable,
    multiline: multiline,
    numberOfLines: numberOfLines,
    onChangeText: onChangeText,
    onFocus: onFocus,
    onSubmitEditing: onSubmitEditing,
    onBlur: onBlur
  }, rest)), !!rightComponent && rightComponent), !!errorText && /*#__PURE__*/React.createElement(Error, {
    errorProps: errorProps,
    errorText: errorText
  }));
});
const TouchableContainer = styled.TouchableOpacity(_ref2 => {
  var _theme$colors, _theme$sizes;
  let {
    theme
  } = _ref2;
  return {
    flexDirection: 'row',
    borderColor: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.primaryBorder,
    height: theme === null || theme === void 0 || (_theme$sizes = theme.sizes) === null || _theme$sizes === void 0 ? void 0 : _theme$sizes.narrow,
    alignItems: 'center'
  };
});
const Title = styled.Text(_ref3 => {
  var _theme$fontSizes, _theme$colors2, _theme$spacing, _theme$spacing2;
  let {
    theme
  } = _ref3;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.xs,
    color: theme === null || theme === void 0 || (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.textColor,
    paddingLeft: isIOS ? 0 : theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.tiny,
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.tiny
  };
});
const StarText = styled.Text(_ref4 => {
  var _theme$colors3;
  let {
    theme
  } = _ref4;
  return {
    color: theme === null || theme === void 0 || (_theme$colors3 = theme.colors) === null || _theme$colors3 === void 0 ? void 0 : _theme$colors3.errorText
  };
});
const ForwardRefTextInputComponent = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(RNTextInput, _extends({}, props, {
  ref: ref
})));
const TextInputComponent = styled(ForwardRefTextInputComponent)(_ref5 => {
  var _theme$fontSizes2, _theme$colors4;
  let {
    theme
  } = _ref5;
  return {
    flex: 1,
    paddingVertical: 0,
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes2 = theme.fontSizes) === null || _theme$fontSizes2 === void 0 ? void 0 : _theme$fontSizes2.sm,
    color: theme === null || theme === void 0 || (_theme$colors4 = theme.colors) === null || _theme$colors4 === void 0 ? void 0 : _theme$colors4.darkTextColor
  };
});
TextInput.Outlined = TextInputOutlined;
TextInput.Flat = TextInputFlat;
TextInput.Icon = CustomIcon;
//# sourceMappingURL=TextInput.js.map