import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import React from 'react'
import { BaseProvider } from 'rn-base-component'


export default function RootLayout() {
  return (
    <BaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </BaseProvider>
  );
}
