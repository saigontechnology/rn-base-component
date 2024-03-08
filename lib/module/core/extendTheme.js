/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme as defaultTheme } from './../theme';
import _ from 'lodash';
function isFunction(value) {
  return typeof value === 'function';
}
export function extendTheme(overrides) {
  function customizer(source, override) {
    if (isFunction(source)) {
      return function () {
        const sourceValue = source(...arguments);
        const overrideValue = isFunction(override) ? override(...arguments) : override;
        return _.mergeWith({}, sourceValue, overrideValue, customizer);
      };
    }
    return undefined;
  }
  for (var _len = arguments.length, restOverrides = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restOverrides[_key - 1] = arguments[_key];
  }
  const finalOverrides = [overrides, ...restOverrides].reduce((prevValue, currentValue) => _.mergeWith({}, prevValue, currentValue, customizer), defaultTheme);
  return finalOverrides;
}
//# sourceMappingURL=extendTheme.js.map