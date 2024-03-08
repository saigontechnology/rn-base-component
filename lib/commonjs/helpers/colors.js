"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorOpacity = exports.colors = void 0;
const baseColor = {
  primary: '#7239E5',
  black: '#1F1F1F',
  white: '#ffffff',
  gray: '#454545',
  red: '#ff0009',
  textDisabled: '#666666',
  placeHolderText: '#929298',
  backgroundDisabled: '#e3e6e8'
};
const colors = exports.colors = {
  ...baseColor
};
const getColorOpacity = (color, opacity) => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16);
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`;
  }
  return color || null || undefined;
};
exports.getColorOpacity = getColorOpacity;
//# sourceMappingURL=colors.js.map