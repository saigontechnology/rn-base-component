import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { demoColors } from '../../theme/demoColors'
import { demoMetrics } from '../../theme/demoMetrics'

// Icon Components for demos
export const LockIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.icon}>🔒</Text>
  </View>
)

export const CheckIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.icon}>✓</Text>
  </View>
)

export const ClearButton = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.icon}>✕</Text>
  </View>
)

const styles = StyleSheet.create({
  iconContainer: {
    width: demoMetrics.iconSize.xlarge,
    height: demoMetrics.iconSize.xlarge,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: demoColors.iconBackground,
    borderRadius: demoMetrics.borderRadius.medium,
    marginHorizontal: demoMetrics.spacing.tiny,
  },
  icon: {
    fontSize: demoMetrics.fontSize.large,
  },
})
