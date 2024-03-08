import React, { createContext, useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme as defaultTheme } from '../theme';
export const BaseContext = /*#__PURE__*/createContext(null);
export const BaseProvider = _ref => {
  let {
    children,
    theme = defaultTheme
  } = _ref;
  const [colorModeValue, setColorModeValue] = useState(theme === null || theme === void 0 ? void 0 : theme.config.initialColorMode);
  const isLight = useMemo(() => colorModeValue === 'light', [colorModeValue]);
  const darkTheme = useMemo(() => ({
    ...theme,
    colors: {
      ...theme.colors,
      ...theme.darkColors
    }
  }), [theme]);
  const newTheme = useMemo(() => isLight ? theme : darkTheme, [darkTheme, isLight, theme]);
  const toggleColorMode = useCallback(() => {
    isLight ? setColorModeValue('dark') : setColorModeValue('light');
  }, [isLight]);
  const setColorMode = useCallback(value => {
    setColorModeValue(value);
  }, []);
  return /*#__PURE__*/React.createElement(BaseContext.Provider, {
    value: {
      theme: newTheme,
      colorMode: colorModeValue,
      toggleColorMode,
      setColorMode
    }
  }, /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: newTheme
  }, children));
};
//# sourceMappingURL=BaseProvider.js.map