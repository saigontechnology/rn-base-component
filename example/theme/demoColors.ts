/**
 * Demo App Color System
 * All colors used in the component demo application
 */

export const demoColors = {
  // Primary Colors
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',
  primaryBackground: '#eff6ff',
  primaryBackgroundLight: '#f0f9ff',

  // Text Colors
  textPrimary: '#1a1a1a',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  textDark: '#1e293b',
  textLight: '#ffffff',

  // Background Colors
  background: '#f5f7fa',
  backgroundLight: '#f8f9fa',
  surface: '#ffffff',
  surfaceHover: '#fafafa',

  // Border Colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderDark: '#cbd5e1',

  // Status Colors
  success: '#10b981',
  successLight: '#d5f4e6',
  successBorder: '#27ae60',
  error: '#e74c3c',
  errorLight: '#fadbd8',
  errorBorder: '#e74c3c',
  warning: '#f39c12',
  warningLight: '#fff8e1',
  info: '#3498db',

  // Component Specific Colors
  // Purple theme
  purple: '#9b59b6',
  purpleDark: '#8e44ad',
  purpleLight: '#f8f3ff',
  purpleLighter: '#f0e6ff',
  purpleFilled: '#e8d5f5',

  // Gray theme
  gray: '#95a5a6',
  grayDark: '#7f8c8d',
  grayLight: '#ecf0f1',
  grayLighter: '#f5f5f5',
  grayBorder: '#bdc3c7',
  grayText: '#5d6d7e',
  grayPlaceholder: '#d5d8dc',

  // Orange/Yellow theme
  orange: '#f39c12',
  orangeDark: '#e67e22',
  orangeLight: '#fff8e1',
  yellow: '#ffd54f',
  yellowLight: '#ffe082',

  // Blue theme
  blue: '#3498db',
  blueDark: '#2980b9',
  blueLight: '#ebf5fb',
  blueLighter: '#d6eaf8',
  blueFilled: '#5dade2',
  blueActive: '#aed6f1',
  blueText: '#21618c',

  // Teal/Green theme
  teal: '#16a085',
  tealLight: '#1abc9c',
  tealLighter: '#e8f8f5',
  green: '#27ae60',
  greenDark: '#229954',
  greenLight: '#eafaf1',

  // Red theme
  red: '#c0392b',
  redLight: '#fadbd8',
  redFilled: '#f5b7b1',

  // Figma Light Style
  figmaLight: '#FAFAF9',
  figmaLightBorder: '#E5E5E5',
  figmaLightFilled: '#E0E0E0',
  figmaLightText: '#333333',

  // Shadow Colors
  shadow: '#000',
  shadowBlue: '#3498db',
  shadowDark: '#040A01',

  // Icon/Badge Colors
  iconBackground: '#ecf0f1',
  badgeBackground: '#f1f5f9',

  // Transparent
  transparent: 'transparent',
}

// Color aliases for semantic usage
export const semanticColors = {
  // Text
  heading: demoColors.textPrimary,
  body: demoColors.textSecondary,
  caption: demoColors.textTertiary,

  // Backgrounds
  screen: demoColors.background,
  card: demoColors.surface,

  // Interactions
  active: demoColors.primary,
  hover: demoColors.surfaceHover,
  disabled: demoColors.grayLight,

  // Status
  success: demoColors.success,
  error: demoColors.error,
  warning: demoColors.warning,
  info: demoColors.info,
}

export type DemoColors = typeof demoColors
export type SemanticColors = typeof semanticColors
