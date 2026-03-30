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
    fontSize: demoMetrics.fontSize.medium,
    fontWeight: '600',
    color: demoColors.textDark,
    marginBottom: demoMetrics.margin.small,
  },
  exampleDescription: {
    fontSize: demoMetrics.fontSize.small,
    color: demoColors.textSecondary,
    marginBottom: demoMetrics.margin.small,
  },

  // Playground styles
  playground: {
    backgroundColor: demoColors.primaryBackground,
    borderRadius: componentMetrics.cardBorderRadius,
    padding: componentMetrics.cardPadding,
    marginVertical: demoMetrics.margin.normal,
  },
  playgroundTitle: {
    fontSize: demoMetrics.fontSize.medium,
    fontWeight: '600',
    color: demoColors.textDark,
    marginBottom: demoMetrics.margin.normal,
  },
  playgroundControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: demoMetrics.spacing.small,
    marginBottom: demoMetrics.margin.normal,
  },
  controlButton: {
    backgroundColor: demoColors.primary,
    paddingHorizontal: demoMetrics.padding.medium,
    paddingVertical: demoMetrics.padding.small,
    borderRadius: demoMetrics.borderRadius.small,
    minWidth: 80,
  },
  controlButtonText: {
    color: demoColors.surface,
    fontSize: demoMetrics.fontSize.small,
    fontWeight: '600',
    textAlign: 'center',
  },
  controlButtonSecondary: {
    backgroundColor: demoColors.primaryLight,
  },
  controlButtonDanger: {
    backgroundColor: demoColors.error,
  },

  // Status display
  statusContainer: {
    backgroundColor: demoColors.surface,
    padding: demoMetrics.padding.medium,
    borderRadius: demoMetrics.borderRadius.medium,
    marginVertical: demoMetrics.margin.small,
  },
  statusText: {
    fontSize: demoMetrics.fontSize.small,
    color: demoColors.textSecondary,
  },
  statusValue: {
    fontSize: demoMetrics.fontSize.body,
    fontWeight: '600',
    color: demoColors.textPrimary,
    marginTop: demoMetrics.margin.tiny,
  },

  // Component wrapper
  componentWrapper: {
    marginVertical: demoMetrics.margin.small,
  },

  // Footer styles
  footer: {
    alignItems: 'center',
    paddingVertical: demoMetrics.padding.large,
    marginTop: demoMetrics.margin.large,
  },
  footerText: {
    fontSize: demoMetrics.fontSize.body,
    color: demoColors.textSecondary,
    textAlign: 'center',
  },

  // Grid styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: demoMetrics.spacing.medium,
  },
  gridItem: {
    flex: 1,
    minWidth: 150,
  },

  // Custom styles for specific demos
  variantComparison: {
    flexDirection: 'row',
    gap: demoMetrics.spacing.medium,
    alignItems: 'flex-start',
  },
  variantItem: {
    flex: 1,
  },
  variantLabel: {
    fontSize: demoMetrics.fontSize.small,
    fontWeight: '600',
    color: demoColors.textSecondary,
    marginBottom: demoMetrics.margin.tiny,
    textAlign: 'center',
  },

  // Icon demo styles
  iconDemoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: demoMetrics.spacing.small,
  },
  iconLabel: {
    fontSize: demoMetrics.fontSize.small,
    color: demoColors.textSecondary,
    flex: 1,
  },

  // Multiline demo styles
  multilineContainer: {
    minHeight: 100,
  },

  // Form styles
  formContainer: {
    gap: demoMetrics.spacing.medium,
  },
  formRow: {
    flexDirection: 'row',
    gap: demoMetrics.spacing.small,
    alignItems: 'flex-start',
  },
  formField: {
    flex: 1,
  },

  // Validation styles
  validationContainer: {
    gap: demoMetrics.spacing.small,
  },
  validationResult: {
    padding: demoMetrics.padding.small,
    borderRadius: demoMetrics.borderRadius.small,
    borderWidth: demoMetrics.borderWidth.normal,
  },
  validationSuccess: {
    backgroundColor: demoColors.primaryBackgroundLight,
    borderColor: demoColors.success,
  },
  validationError: {
    backgroundColor: demoColors.primaryBackgroundLight,
    borderColor: demoColors.error,
  },
  validationText: {
    fontSize: demoMetrics.fontSize.small,
    fontWeight: '500',
  },
  validationTextSuccess: {
    color: demoColors.success,
  },
  validationTextError: {
    color: demoColors.error,
  },
})
