function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { metrics } from '../../helpers';
import Cursor from './Cursor';
import { Text } from '../Text/Text';
const DEFAULT_LENGTH = 6;
export const CodeInput = _ref => {
  let {
    cellStyle,
    focusCellStyle,
    filledCellStyle,
    textStyle,
    focusTextStyle,
    secureViewStyle,
    length = DEFAULT_LENGTH,
    onSubmit,
    customCursor,
    secureTextEntry,
    keyboardType = 'number-pad',
    withCursor = false,
    placeholder,
    placeholderTextColor,
    ...rest
  } = _ref;
  const textInputRef = useRef(null);
  const [code, setCode] = useState('');
  const handleOnChangeText = useCallback(val => {
    setCode(val);
    if (val.length === length) {
      var _textInputRef$current;
      onSubmit === null || onSubmit === void 0 || onSubmit(val);
      (_textInputRef$current = textInputRef.current) === null || _textInputRef$current === void 0 || _textInputRef$current.blur();
    }
  }, [length, onSubmit]);
  const handleCellPress = useCallback(index => {
    var _textInputRef$current2;
    if (index < code.length) {
      setCode(code.slice(0, index));
    }
    (_textInputRef$current2 = textInputRef.current) === null || _textInputRef$current2 === void 0 || _textInputRef$current2.focus();
  }, [code]);
  const renderCursor = useCallback(() => customCursor ? customCursor() : /*#__PURE__*/React.createElement(Cursor, {
    style: focusTextStyle
  }), [customCursor, focusTextStyle]);
  const renderCell = useCallback((isFocused, value) => {
    if (withCursor && isFocused) {
      return renderCursor();
    }
    if (secureTextEntry) {
      return /*#__PURE__*/React.createElement(SecureView, {
        testID: "text",
        style: secureViewStyle
      });
    }
    if (value) {
      return /*#__PURE__*/React.createElement(Text, {
        testID: "text",
        style: textStyle
      }, value);
    }
    return /*#__PURE__*/React.createElement(PlaceholderText, {
      color: placeholderTextColor
    }, placeholder ?? '');
  }, [renderCursor, secureTextEntry, secureViewStyle, withCursor, textStyle, placeholderTextColor, placeholder]);
  const renderCells = useCallback(() => {
    const cells = [];
    for (let index = 0; index < length; index++) {
      const isFocused = code.length === index;
      cells.push( /*#__PURE__*/React.createElement(Cell, {
        testID: "cell",
        style: [cellStyle, code[index] ? filledCellStyle : {}, isFocused && focusCellStyle],
        key: index,
        onPress: () => handleCellPress(index)
      }, renderCell(isFocused, code[index])));
    }
    return cells;
  }, [length, code, cellStyle, filledCellStyle, focusCellStyle, renderCell, handleCellPress]);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(StyledTextInput, _extends({
    testID: "input",
    ref: textInputRef,
    value: code,
    textContentType: "oneTimeCode",
    keyboardType: keyboardType,
    onChangeText: handleOnChangeText,
    maxLength: length
  }, rest)), /*#__PURE__*/React.createElement(CellContainer, null, renderCells()));
};
const Cell = styled.Pressable(props => {
  var _props$theme, _props$theme2, _props$theme3;
  return {
    width: props === null || props === void 0 || (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.spacing.gigantic,
    height: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.spacing.gigantic,
    borderRadius: metrics.tiny,
    borderWidth: metrics.line,
    borderColor: props === null || props === void 0 || (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.colors) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.coolGray,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.tiny
  };
});
const SecureView = styled.Pressable(props => {
  var _props$theme4, _props$theme5, _props$theme6;
  return {
    width: props === null || props === void 0 || (_props$theme4 = props.theme) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.spacing.slim,
    height: props === null || props === void 0 || (_props$theme5 = props.theme) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.spacing.slim,
    borderRadius: metrics.small,
    backgroundColor: props === null || props === void 0 || (_props$theme6 = props.theme) === null || _props$theme6 === void 0 || (_props$theme6 = _props$theme6.colors) === null || _props$theme6 === void 0 ? void 0 : _props$theme6.darkText
  };
});
const CellContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between'
});
const ForwardRefTextInputComponent = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
  ref: ref
})));
const StyledTextInput = styled(ForwardRefTextInputComponent)(() => ({
  opacity: 0,
  position: 'absolute',
  width: 0,
  height: 0
}));
const PlaceholderText = styled.Text(_ref2 => {
  let {
    color
  } = _ref2;
  return {
    color
  };
});
//# sourceMappingURL=CodeInput.js.map