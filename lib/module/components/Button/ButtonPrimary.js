function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { useTheme } from '../../hooks';
import Button from './Button';
const ButtonPrimary = props => {
  const ButtonPrimaryTheme = useTheme().components.ButtonPrimary;
  return /*#__PURE__*/React.createElement(Button, _extends({}, ButtonPrimaryTheme, props));
};
export default ButtonPrimary;
//# sourceMappingURL=ButtonPrimary.js.map