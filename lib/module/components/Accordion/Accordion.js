function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Text } from 'react-native';
import AccordionItem from './AccordionItem';
const Accordion = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    sections,
    expandMultiple = false,
    keyExtractor,
    wrapperStyle,
    ...rest
  } = _ref;
  const [array, setArray] = useState([]);
  const _keyExtractor = useMemo(() => keyExtractor || ((_, index) => index.toString()), [keyExtractor]);
  const onPress = useCallback(key => {
    setArray(previousArray => {
      const index = previousArray.indexOf(key);
      let newArray = [...previousArray];
      if (expandMultiple) {
        if (index >= 0) {
          newArray.splice(index, 1);
        } else {
          newArray.push(key);
        }
      } else {
        newArray = index >= 0 ? [] : [key];
      }
      return newArray;
    });
  }, [expandMultiple]);
  const renderItem = useCallback(_ref2 => {
    let {
      item,
      index
    } = _ref2;
    return /*#__PURE__*/React.createElement(AccordionItem, _extends({
      key: _keyExtractor(item, index),
      title: item === null || item === void 0 ? void 0 : item.title,
      expanded: array.includes(_keyExtractor(item, index))
    }, rest, {
      item: item,
      keyExtractorItem: _keyExtractor(item, index),
      onPress: onPress,
      index: index
    }), /*#__PURE__*/React.createElement(Text, null, (item === null || item === void 0 ? void 0 : item.content) ?? ''));
  }, [_keyExtractor, onPress, array, rest]);
  return /*#__PURE__*/React.createElement(FlatList, _extends({
    style: wrapperStyle,
    data: sections,
    ref: ref,
    keyExtractor: keyExtractor,
    renderItem: renderItem,
    extraData: array
  }, rest));
});
Accordion.displayName = 'Accordion';
export default /*#__PURE__*/React.memo(Accordion);
//# sourceMappingURL=Accordion.js.map