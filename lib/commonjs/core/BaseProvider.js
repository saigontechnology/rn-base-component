"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseProvider = exports.BaseContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _theme = require("../theme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BaseContext = exports.BaseContext = /*#__PURE__*/(0, _react.createContext)(null);
const BaseProvider = _ref => {
  let {
    children,
    theme = _theme.theme
  } = _ref;
  const [colorModeValue, setColorModeValue] = (0, _react.useState)(theme === null || theme === void 0 ? void 0 : theme.config.initialColorMode);
  const isLight = (0, _react.useMemo)(() => colorModeValue === 'light', [colorModeValue]);
  const darkTheme = (0, _react.useMemo)(() => ({
    ...theme,
    colors: {
      ...theme.colors,
      ...theme.darkColors
    }
  }), [theme]);
  const newTheme = (0, _react.useMemo)(() => isLight ? theme : darkTheme, [darkTheme, isLight, theme]);
  const toggleColorMode = (0, _react.useCallback)(() => {
    isLight ? setColorModeValue('dark') : setColorModeValue('light');
  }, [isLight]);
  const setColorMode = (0, _react.useCallback)(value => {
    setColorModeValue(value);
  }, []);
  return /*#__PURE__*/_react.default.createElement(BaseContext.Provider, {
    value: {
      theme: newTheme,
      colorMode: colorModeValue,
      toggleColorMode,
      setColorMode
    }
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: newTheme
  }, children));
};
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=BaseProvider.js.map