/* eslint-disable @typescript-eslint/no-empty-interface */

import base from './base';
import components from './components';
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};
const darkColors = base.colors;
const theme = {
  ...base,
  components,
  config,
  darkColors
};
export { theme };
//# sourceMappingURL=theme.js.map