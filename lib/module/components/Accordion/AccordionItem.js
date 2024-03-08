import React, { useCallback, useMemo } from 'react';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { toggleAnimation } from './ToggleAnimation';
const AccordionItem = _ref => {
  let {
    title = '',
    onPress,
    keyExtractorItem,
    expanded = false,
    index,
    itemContainerStyle,
    headerContainerStyle,
    contentContainerStyle,
    titleStyle,
    item,
    openAnimation,
    closeAnimation,
    openDuration,
    closeDuration,
    renderHeader = () => null,
    renderSectionTitle,
    renderContent,
    children
  } = _ref;
  const content = useMemo(() => {
    if (expanded) {
      return renderContent ? renderContent(item, index, expanded, keyExtractorItem) : /*#__PURE__*/React.createElement(AccordionBody, {
        style: contentContainerStyle
      }, children);
    }
    return null;
  }, [renderContent, expanded, keyExtractorItem, index, item, children, contentContainerStyle]);
  const header = useMemo(() => renderHeader(item, index, expanded, keyExtractorItem) || /*#__PURE__*/React.createElement(AccordionHeader, {
    style: headerContainerStyle
  }, renderSectionTitle ? renderSectionTitle(item, index, expanded) : /*#__PURE__*/React.createElement(Title, {
    style: titleStyle
  }, title)), [renderHeader, item, index, expanded, keyExtractorItem, renderSectionTitle, headerContainerStyle, title, titleStyle]);
  const onPressItem = useCallback(() => {
    LayoutAnimation.configureNext(toggleAnimation(openAnimation, closeAnimation, openDuration, closeDuration));
    onPress(keyExtractorItem);
  }, [closeAnimation, closeDuration, keyExtractorItem, onPress, openAnimation, openDuration]);
  return /*#__PURE__*/React.createElement(AccordionContainer, {
    key: keyExtractorItem,
    style: itemContainerStyle
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: "accordion-item",
    activeOpacity: 0.7,
    onPress: onPressItem
  }, header), content);
};
export default /*#__PURE__*/React.memo(AccordionItem);
const AccordionContainer = styled.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.petite,
    overflow: 'hidden'
  };
});
const AccordionHeader = styled.View(_ref3 => {
  var _theme$spacing2;
  let {
    theme
  } = _ref3;
  return {
    padding: theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.compact
  };
});
const Title = styled.Text(_ref4 => {
  var _theme$fontSizes, _theme$colors, _theme$fontWeights;
  let {
    theme
  } = _ref4;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.xl,
    textAlign: 'center',
    color: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.amber,
    fontWeight: theme === null || theme === void 0 || (_theme$fontWeights = theme.fontWeights) === null || _theme$fontWeights === void 0 ? void 0 : _theme$fontWeights.bold
  };
});
const AccordionBody = styled.View(_ref5 => {
  var _theme$spacing3;
  let {
    theme
  } = _ref5;
  return {
    padding: theme === null || theme === void 0 || (_theme$spacing3 = theme.spacing) === null || _theme$spacing3 === void 0 ? void 0 : _theme$spacing3.compact,
    justifyContent: 'center',
    alignItems: 'center'
  };
});
//# sourceMappingURL=AccordionItem.js.map