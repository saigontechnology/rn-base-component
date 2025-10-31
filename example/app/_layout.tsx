import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import React from 'react'
import { BaseProvider } from 'rn-base-component'


export default function RootLayout() {
  return (
    <BaseProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="code-input"
          options={{
            title: 'CodeInput Component',
            headerShown: true,
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#1a1a1a',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </BaseProvider>
  );
}
