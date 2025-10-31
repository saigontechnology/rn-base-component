import { StyleSheet } from 'react-native'
import { demoColors } from '../../theme/demoColors'
import { demoMetrics, componentMetrics } from '../../theme/demoMetrics'

export const demoStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: demoColors.backgroundLight,
  },
  contentContainer: {
    padding: componentMetrics.containerPadding,
    paddingBottom: componentMetrics.containerPaddingBottom,
  },

  // Header styles
  mainTitle: {
    fontSize: demoMetrics.fontSize.heading,
    fontWeight: 'bold',
    color: demoColors.textPrimary,
    marginBottom: demoMetrics.margin.medium,
    textAlign: 'center',
  },

  // Section styles
  section: {
    backgroundColor: demoColors.surface,
    borderRadius: componentMetrics.sectionBorderRadius,
    padding: componentMetrics.sectionPadding,
    marginVertical: componentMetrics.sectionMargin,
    shadowColor: demoColors.shadow,
    ...demoMetrics.shadow.normal,
  },
  sectionTitle: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '700',
    color: demoColors.textDark,
    marginBottom: demoMetrics.margin.small,
  },
  sectionDescription: {
    fontSize: demoMetrics.fontSize.body,
    color: demoColors.textSecondary,
    marginBottom: demoMetrics.spacing.large,
  },

  // Example styles
  example: {
    marginVertical: demoMetrics.margin.normal,
    paddingVertical: demoMetrics.padding.medium,
    borderBottomWidth: demoMetrics.borderWidth.normal,
    borderBottomColor: demoColors.borderLight,
  },
  exampleTitle: {
    fontSize: demoMetrics.fontSize.subheading,
    fontWeight: '600',
    color: demoColors.textSecondary,
    marginBottom: demoMetrics.margin.medium,
  },

  // Control buttons
  controlButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: demoMetrics.gap.small,
    marginTop: demoMetrics.spacing.large,
    justifyContent: 'center',
  },
  smallButton: {
    paddingHorizontal: componentMetrics.buttonPaddingHorizontal,
    paddingVertical: componentMetrics.buttonPaddingVertical,
    minWidth: componentMetrics.buttonMinWidth,
  },

  // Footer styles
  footer: {
    marginTop: demoMetrics.margin.xlarge,
    padding: demoMetrics.padding.large,
    backgroundColor: demoColors.surface,
    borderRadius: demoMetrics.borderRadius.large,
    alignItems: 'center',
  },
  footerText: {
    fontSize: demoMetrics.fontSize.normal,
    color: demoColors.textSecondary,
    textAlign: 'center',
  },
})

// Custom cell styling examples
export const customCellStyles = StyleSheet.create({
  // Basic custom example
  customCell: {
    borderRadius: demoMetrics.borderRadius.large,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.blue,
    backgroundColor: demoColors.blueLight,
  },
  customFocusCell: {
    borderColor: demoColors.blueDark,
    backgroundColor: demoColors.blueLighter,
    transform: [{ scale: demoMetrics.scale.normal }],
  },
  customText: {
    fontSize: demoMetrics.fontSize.xxlarge,
    fontWeight: 'bold',
    color: demoColors.textDark,
  },

  // Circular cells
  circularCell: {
    width: demoMetrics.cellSize.large,
    height: demoMetrics.cellSize.large,
    borderRadius: demoMetrics.borderRadius.round,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.purple,
    backgroundColor: demoColors.purpleLight,
  },
  circularFocusCell: {
    borderColor: demoColors.purpleDark,
    backgroundColor: demoColors.purpleLighter,
    transform: [{ scale: demoMetrics.scale.medium }],
  },
  circularFilledCell: {
    borderColor: demoColors.purple,
    backgroundColor: demoColors.purpleFilled,
  },
  circularText: {
    fontSize: demoMetrics.fontSize.xlarge,
    fontWeight: '600',
    color: demoColors.purpleDark,
  },

  // Square cells
  squareCell: {
    width: demoMetrics.cellSize.large,
    height: demoMetrics.cellSize.large,
    borderRadius: 0,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.gray,
    backgroundColor: demoColors.surface,
  },
  squareFocusCell: {
    borderColor: demoColors.grayDark,
    backgroundColor: demoColors.grayLight,
    borderWidth: demoMetrics.borderWidth.xthick,
  },
  squareText: {
    fontSize: demoMetrics.fontSize.xlarge,
    fontWeight: '700',
    color: demoColors.textDark,
  },

  // Gradient cells
  gradientCell: {
    width: demoMetrics.cellSize.medium,
    height: demoMetrics.cellSize.medium,
    borderRadius: demoMetrics.borderRadius.normal,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.orange,
    backgroundColor: demoColors.orangeLight,
  },
  gradientFocusCell: {
    borderColor: demoColors.orangeDark,
    backgroundColor: demoColors.yellowLight,
    transform: [{ scale: demoMetrics.scale.normal }],
  },
  gradientFilledCell: {
    backgroundColor: demoColors.yellow,
    borderColor: demoColors.orange,
  },
  gradientText: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: 'bold',
    color: demoColors.orangeDark,
  },

  // Large cells
  largeCell: {
    width: demoMetrics.cellSize.xhuge,
    height: demoMetrics.cellSize.xhuge,
    borderRadius: demoMetrics.borderRadius.large,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.blue,
    backgroundColor: demoColors.surface,
  },
  largeFocusCell: {
    borderColor: demoColors.blueDark,
    backgroundColor: demoColors.blueLight,
    borderWidth: demoMetrics.borderWidth.xthick,
  },
  largeText: {
    fontSize: demoMetrics.fontSize.heading,
    fontWeight: 'bold',
    color: demoColors.textDark,
  },

  // Small cells
  smallCell: {
    width: demoMetrics.cellSize.small,
    height: demoMetrics.cellSize.small,
    borderRadius: demoMetrics.borderRadius.small,
    borderWidth: demoMetrics.borderWidth.medium,
    borderColor: demoColors.teal,
    backgroundColor: demoColors.surface,
  },
  smallFocusCell: {
    borderColor: demoColors.tealLight,
    backgroundColor: demoColors.tealLighter,
    borderWidth: demoMetrics.borderWidth.thick,
  },
  smallText: {
    fontSize: demoMetrics.fontSize.normal,
    fontWeight: '600',
    color: demoColors.teal,
  },

  // Shadow cells
  shadowCell: {
    width: demoMetrics.cellSize.xlarge,
    height: demoMetrics.cellSize.xlarge,
    borderRadius: demoMetrics.borderRadius.normal,
    borderWidth: demoMetrics.borderWidth.normal,
    borderColor: demoColors.grayBorder,
    backgroundColor: demoColors.surface,
    shadowColor: demoColors.shadow,
    ...demoMetrics.shadow.medium,
  },
  shadowFocusCell: {
    borderColor: demoColors.blue,
    backgroundColor: demoColors.surface,
    shadowColor: demoColors.shadowBlue,
    ...demoMetrics.shadow.large,
  },
  shadowText: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '600',
    color: demoColors.textSecondary,
  },

  // Outlined cells
  outlinedCell: {
    width: demoMetrics.cellSize.large,
    height: demoMetrics.cellSize.large,
    borderRadius: demoMetrics.borderRadius.medium,
    borderWidth: demoMetrics.borderWidth.xthick,
    borderColor: demoColors.green,
    backgroundColor: demoColors.transparent,
  },
  outlinedFocusCell: {
    borderColor: demoColors.greenDark,
    borderWidth: demoMetrics.borderWidth.xxthick,
    transform: [{ scale: demoMetrics.scale.normal }],
  },
  outlinedFilledCell: {
    borderColor: demoColors.green,
    backgroundColor: demoColors.greenLight,
  },
  outlinedText: {
    fontSize: demoMetrics.fontSize.xlarge,
    fontWeight: 'bold',
    color: demoColors.green,
  },

  // Filled cells
  filledCell: {
    width: demoMetrics.cellSize.medium,
    height: demoMetrics.cellSize.medium,
    borderRadius: demoMetrics.borderRadius.normal,
    borderWidth: demoMetrics.borderWidth.normal,
    borderColor: demoColors.blueFilled,
    backgroundColor: demoColors.blueLighter,
  },
  filledFocusCell: {
    borderColor: demoColors.blue,
    backgroundColor: demoColors.blueActive,
    borderWidth: demoMetrics.borderWidth.thick,
  },
  filledFilledCell: {
    backgroundColor: demoColors.blueFilled,
    borderColor: demoColors.blue,
  },
  filledText: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '600',
    color: demoColors.blueText,
  },

  // Minimalist cells
  minimalistCell: {
    width: demoMetrics.cellSize.normal,
    height: demoMetrics.cellSize.normal,
    borderRadius: demoMetrics.borderRadius.medium,
    borderWidth: demoMetrics.borderWidth.normal,
    borderColor: demoColors.grayPlaceholder,
    backgroundColor: demoColors.surface,
  },
  minimalistFocusCell: {
    borderColor: demoColors.grayBorder,
    backgroundColor: demoColors.surfaceHover,
  },
  minimalistText: {
    fontSize: demoMetrics.fontSize.medium,
    fontWeight: '400',
    color: demoColors.grayText,
  },

  // Bold cells
  boldCell: {
    width: demoMetrics.cellSize.xxlarge,
    height: demoMetrics.cellSize.xxlarge,
    borderRadius: demoMetrics.borderRadius.medium,
    borderWidth: demoMetrics.borderWidth.xxthick,
    borderColor: demoColors.red,
    backgroundColor: demoColors.surface,
  },
  boldFocusCell: {
    borderColor: demoColors.error,
    backgroundColor: demoColors.redLight,
    borderWidth: demoMetrics.borderWidth.xxxthick,
    transform: [{ scale: demoMetrics.scale.small }],
  },
  boldFilledCell: {
    borderColor: demoColors.red,
    backgroundColor: demoColors.redFilled,
  },
  boldText: {
    fontSize: demoMetrics.fontSize.title,
    fontWeight: '900',
    color: demoColors.red,
  },

  // Validation cells
  validationCell: {
    width: demoMetrics.cellSize.large,
    height: demoMetrics.cellSize.large,
    borderRadius: demoMetrics.borderRadius.normal,
    borderWidth: demoMetrics.borderWidth.thick,
    borderColor: demoColors.grayBorder,
    backgroundColor: demoColors.surface,
  },
  customErrorCell: {
    borderColor: demoColors.errorBorder,
    borderWidth: demoMetrics.borderWidth.xthick,
    backgroundColor: demoColors.errorLight,
    transform: [{ scale: demoMetrics.scale.normal }],
  },
  customSuccessCell: {
    borderColor: demoColors.successBorder,
    borderWidth: demoMetrics.borderWidth.xthick,
    backgroundColor: demoColors.successLight,
    transform: [{ scale: demoMetrics.scale.normal }],
  },
  validationText: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '600',
    color: demoColors.textSecondary,
  },

  // Figma light cells
  figmaLightCell: {
    width: demoMetrics.cellSize.tiny,
    height: demoMetrics.cellSize.tiny,
    borderRadius: demoMetrics.borderRadius.tiny + 0.5,
    borderWidth: demoMetrics.borderWidth.thin,
    borderColor: demoColors.figmaLight,
    backgroundColor: 'rgba(250, 250, 249, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  figmaLightFocusCell: {
    borderColor: demoColors.figmaLightBorder,
    borderWidth: demoMetrics.borderWidth.normal,
    backgroundColor: demoColors.figmaLight,
  },
  figmaLightFilledCell: {
    borderColor: demoColors.figmaLightFilled,
    backgroundColor: demoColors.figmaLight,
  },
  figmaLightText: {
    fontSize: demoMetrics.fontSize.normal,
    fontWeight: '500',
    color: demoColors.figmaLightText,
  },
})
