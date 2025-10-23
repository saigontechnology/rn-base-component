import React from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { COMPONENTS, ComponentItem } from '../constants/components'
import { demoColors } from '../theme/demoColors'
import { demoMetrics, componentMetrics } from '../theme/demoMetrics'

const HomeScreen = () => {
  const router = useRouter()

  const handleComponentPress = (item: ComponentItem) => {
    if (item.route && item.status === 'Complete') {
      router.push(item.route as any)
    }
  }

  const renderComponentCard = (item: ComponentItem) => {
    const isAvailable = item.status === 'Complete'

    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.card,
          !isAvailable && styles.cardDisabled,
          pressed && isAvailable && styles.cardPressed,
        ]}
        onPress={() => handleComponentPress(item)}
        disabled={!isAvailable}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text
              style={[
                styles.statusText,
                item.status === 'Complete' ? styles.statusComplete : styles.statusComingSoon,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.componentName}>{item.name}</Text>
          <Text style={styles.componentDescription}>{item.description}</Text>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        {isAvailable && (
          <View style={styles.cardFooter}>
            <Text style={styles.viewDemoText}>View Demo →</Text>
          </View>
        )}
      </Pressable>
    )
  }

  const groupedComponents = {
    Input: COMPONENTS.filter(c => c.category === 'Input'),
    Display: COMPONENTS.filter(c => c.category === 'Display'),
    Navigation: COMPONENTS.filter(c => c.category === 'Navigation'),
    Feedback: COMPONENTS.filter(c => c.category === 'Feedback'),
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>RN Base Component</Text>
          <Text style={styles.subtitle}>
            Explore comprehensive component library with interactive demos
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{COMPONENTS.length}</Text>
            <Text style={styles.statLabel}>Components</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {COMPONENTS.filter(c => c.status === 'Complete').length}
            </Text>
            <Text style={styles.statLabel}>Ready</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>

        {Object.entries(groupedComponents).map(
          ([category, components]) =>
            components.length > 0 && (
              <View key={category} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{category} Components</Text>
                <View style={styles.cardsGrid}>{components.map(renderComponentCard)}</View>
              </View>
            )
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Built with React Native & Expo</Text>
          <Text style={styles.footerSubtext}>v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: demoColors.background,
  },
  contentContainer: {
    padding: componentMetrics.containerPadding,
    paddingBottom: componentMetrics.containerPaddingBottom,
  },
  header: {
    marginBottom: demoMetrics.margin.xlarge,
    alignItems: 'center',
  },
  title: {
    fontSize: demoMetrics.fontSize.hero,
    fontWeight: 'bold',
    color: demoColors.textPrimary,
    marginBottom: demoMetrics.spacing.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: demoMetrics.fontSize.normal,
    color: demoColors.textSecondary,
    textAlign: 'center',
    lineHeight: demoMetrics.lineHeight.normal,
    paddingHorizontal: demoMetrics.padding.large,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: demoColors.surface,
    borderRadius: demoMetrics.borderRadius.xxlarge,
    padding: demoMetrics.padding.large,
    marginBottom: demoMetrics.margin.xlarge,
    shadowColor: demoColors.shadow,
    ...demoMetrics.shadow.normal,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: demoMetrics.fontSize.heading,
    fontWeight: 'bold',
    color: demoColors.primary,
    marginBottom: demoMetrics.spacing.tiny,
  },
  statLabel: {
    fontSize: demoMetrics.fontSize.caption,
    color: demoColors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: componentMetrics.statDividerWidth,
    backgroundColor: demoColors.border,
    marginHorizontal: componentMetrics.statDividerMargin,
  },
  categorySection: {
    marginBottom: demoMetrics.margin.xlarge,
  },
  categoryTitle: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '700',
    color: demoColors.textDark,
    marginBottom: demoMetrics.spacing.normal,
    paddingLeft: demoMetrics.padding.tiny,
  },
  cardsGrid: {
    gap: componentMetrics.cardGap,
  },
  card: {
    backgroundColor: demoColors.surface,
    borderRadius: componentMetrics.cardBorderRadius,
    padding: componentMetrics.cardPadding,
    shadowColor: demoColors.shadow,
    ...demoMetrics.shadow.normal,
    borderWidth: demoMetrics.borderWidth.normal,
    borderColor: demoColors.border,
  },
  cardDisabled: {
    opacity: demoMetrics.opacity.disabled,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: demoMetrics.margin.medium,
  },
  iconContainer: {
    width: demoMetrics.iconSize.huge,
    height: demoMetrics.iconSize.huge,
    backgroundColor: demoColors.primaryBackgroundLight,
    borderRadius: demoMetrics.borderRadius.xlarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: demoMetrics.fontSize.heading,
  },
  statusBadge: {
    paddingHorizontal: demoMetrics.padding.medium,
    paddingVertical: demoMetrics.padding.tiny,
    borderRadius: demoMetrics.borderRadius.medium,
    backgroundColor: demoColors.badgeBackground,
  },
  statusText: {
    fontSize: demoMetrics.fontSize.tiny,
    fontWeight: '600',
  },
  statusComplete: {
    color: demoColors.success,
  },
  statusComingSoon: {
    color: demoColors.textTertiary,
  },
  cardContent: {
    marginBottom: demoMetrics.margin.normal,
  },
  componentName: {
    fontSize: demoMetrics.fontSize.large,
    fontWeight: '700',
    color: demoColors.textDark,
    marginBottom: demoMetrics.spacing.small,
  },
  componentDescription: {
    fontSize: demoMetrics.fontSize.body,
    color: demoColors.textSecondary,
    lineHeight: demoMetrics.lineHeight.tight,
    marginBottom: demoMetrics.margin.medium,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: demoMetrics.padding.medium,
    paddingVertical: demoMetrics.padding.tiny,
    backgroundColor: demoColors.primaryBackground,
    borderRadius: demoMetrics.borderRadius.small,
  },
  categoryText: {
    fontSize: demoMetrics.fontSize.small,
    fontWeight: '600',
    color: demoColors.primary,
  },
  cardFooter: {
    paddingTop: demoMetrics.padding.normal,
    borderTopWidth: demoMetrics.borderWidth.normal,
    borderTopColor: demoColors.borderLight,
  },
  viewDemoText: {
    fontSize: demoMetrics.fontSize.body,
    fontWeight: '600',
    color: demoColors.primary,
    textAlign: 'center',
  },
  footer: {
    marginTop: demoMetrics.spacing.xxxlarge,
    paddingTop: demoMetrics.padding.large,
    borderTopWidth: demoMetrics.borderWidth.normal,
    borderTopColor: demoColors.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: demoMetrics.fontSize.body,
    color: demoColors.textSecondary,
    marginBottom: demoMetrics.spacing.tiny,
  },
  footerSubtext: {
    fontSize: demoMetrics.fontSize.small,
    color: demoColors.textTertiary,
  },
})
