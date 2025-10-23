/**
 * Demo App Metrics System
 * All spacing, sizing, and dimension values used in the component demo application
 */

export const demoMetrics = {
  // Spacing Scale
  spacing: {
    tiny: 4,
    small: 8,
    medium: 12,
    normal: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 30,
    xxxlarge: 40,
  },

  // Padding Scale
  padding: {
    tiny: 4,
    small: 8,
    medium: 12,
    normal: 16,
    large: 20,
    xlarge: 24,
  },

  // Margin Scale
  margin: {
    tiny: 4,
    small: 8,
    medium: 10,
    normal: 15,
    large: 20,
    xlarge: 30,
  },

  // Border Radius
  borderRadius: {
    tiny: 4,
    small: 6,
    medium: 8,
    normal: 10,
    large: 12,
    xlarge: 14,
    xxlarge: 16,
    round: 25,
  },

  // Border Width
  borderWidth: {
    thin: 0.5,
    normal: 1,
    medium: 1.5,
    thick: 2,
    xthick: 3,
    xxthick: 4,
    xxxthick: 5,
  },

  // Font Sizes
  fontSize: {
    tiny: 11,
    small: 12,
    caption: 13,
    body: 14,
    subheading: 15,
    normal: 16,
    medium: 18,
    large: 20,
    xlarge: 22,
    xxlarge: 24,
    title: 26,
    heading: 28,
    hero: 32,
  },

  // Icon Sizes
  iconSize: {
    tiny: 16,
    small: 20,
    normal: 24,
    medium: 28,
    large: 32,
    xlarge: 40,
    xxlarge: 48,
    huge: 56,
  },

  // Cell/Input Sizes (for CodeInput)
  cellSize: {
    tiny: 36,
    small: 38,
    compact: 40,
    normal: 45,
    medium: 48,
    large: 50,
    xlarge: 52,
    xxlarge: 55,
    huge: 60,
    xhuge: 65,
  },

  // Button/Control Heights
  controlHeight: {
    small: 32,
    normal: 40,
    medium: 44,
    large: 48,
    xlarge: 52,
  },

  // Shadow
  shadow: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    normal: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    large: {
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 8,
    },
    glass: {
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 32,
      elevation: 8,
    },
  },

  // Opacity
  opacity: {
    disabled: 0.5,
    dimmed: 0.6,
    faded: 0.7,
    translucent: 0.8,
  },

  // Line Height
  lineHeight: {
    tight: 20,
    normal: 24,
    relaxed: 28,
  },

  // Gap (for flex/grid)
  gap: {
    tiny: 4,
    small: 8,
    medium: 12,
    normal: 16,
  },

  // Scale transforms
  scale: {
    small: 1.03,
    normal: 1.05,
    medium: 1.08,
  },
}

// Metric aliases for specific use cases
export const componentMetrics = {
  // Card
  cardPadding: demoMetrics.padding.large,
  cardBorderRadius: demoMetrics.borderRadius.xxlarge,
  cardGap: demoMetrics.gap.medium,

  // Button
  buttonMinWidth: 100,
  buttonPaddingHorizontal: demoMetrics.padding.medium,
  buttonPaddingVertical: demoMetrics.padding.small,

  // Icon Container
  iconContainerSize: demoMetrics.iconSize.xlarge,
  iconContainerPadding: demoMetrics.padding.tiny,

  // Section
  sectionPadding: demoMetrics.padding.large,
  sectionMargin: demoMetrics.margin.medium,
  sectionBorderRadius: demoMetrics.borderRadius.large,

  // Container
  containerPadding: demoMetrics.padding.large,
  containerPaddingBottom: demoMetrics.padding.xlarge,

  // Stats
  statDividerWidth: 1,
  statDividerMargin: demoMetrics.spacing.normal,
}

export type DemoMetrics = typeof demoMetrics
export type ComponentMetrics = typeof componentMetrics
