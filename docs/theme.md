# How to config theme

- Theme
- BaseProvider
- extendTheme

### Theme

```ts
{
    colors: {...},
    borderWidths: {...},
    sizes: {...},
    spacing: {...},
    fontWeights: {...},
    fonts: {...},
    fontSizes: {...},
}
```

### BaseProvider

The `BaseProvider` component is used to provide the theme to all the components in the app.
It should be wrapped around the root component of the app.
Here is an example of how to use it:

```ts
import React from 'react'
import {BaseProvider} from 'rn-base-component'

const App = () => <BaseProvider theme={theme}>{/* Your app components go here */}</BaseProvider>

export default App
```

### extendTheme

The `extendTheme` function is used to extend the default theme provided by `rn-base-component`. It takes an object as an argument, which should contain the properties you want to override or add to the default theme. Here is an example of how to use it:

```ts
import { BaseProvider, extendTheme } from 'rn-base-component';

const theme = extendTheme({
    <!-- Add new color -->
    colors: {
        cardPrimaryBackground: 'green',
    },
    <!-- Add new dark color -->
    darkColors: {
        cardPrimaryBackground: 'gray',
    },
});

const App = () => (
  <BaseProvider theme={theme}>
    {/* Your app components go here */}
  </BaseProvider>
);

```

# How to use theme for component

The `theme` object is used to the colors, sizes, spacing, and other properties of the components in the app.

Here is an example of how to use it:

```ts
import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../helpers/metrics'
import type {ITheme} from '../theme'

export type ButtonProps = {
  onPress: () => void
  text: string
  color?: string
  textColor?: string
}

const Button: React.FC<ButtonProps> = ({text, onPress, color, textColor}) => (
  <ButtonRoot onPress={onPress} activeOpacity={0.8} color={color}>
    <Label color={textColor}>{text}</Label>
  </ButtonRoot>
)

<!-- Here is an example of use colors  -->
interface IButtonRoot {
  color?: string
}
const ButtonRoot = styled.TouchableOpacity<IButtonRoot>(({theme, color}) => ({
  paddingVertical: metrics.xxs,
  paddingHorizontal: metrics.small,
  borderRadius: metrics.borderRadius,
  backgroundColor: color || theme.colors?.cardPrimaryBackground,
  alignSelf: 'flex-start',
}))

<!-- Here is an example of use fontWeights -->
interface ILabel {
  color?: string
}
const Label = styled.Text<ILabel>(({theme, color}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

```

# Hook

- useTheme
- useBase

### useTheme

The `useTheme` hook allows you to access the theme object in any component without having to pass it down as a prop. Here is an example of how to use the `useTheme` hook:

```ts
import React from 'react'
import {useTheme} from 'rn-base-component'

const MyComponent = () => {
  const theme = useTheme()

  return (
    <View style={{backgroundColor: theme.colors.cardPrimaryBackground}}>
      {/* Your component content goes here */}
    </View>
  )
}
```

### useBase

```ts
{
    theme: {...},
    colorMode: 'light' | 'dark',
    toggleColorMode: () => {},
    setColorMode: (colorMode) => {},
}
```

- The `colorMode` property in the `useBase` hook is used to determine the current color mode of the app. It can be set to 'light', 'dark', null, or undefined.
- The `toggleColorMode` function is used to toggle between 'light' and 'dark' color modes.
- The `setColorMode` function is used to set the color mode to a specific value.

```ts
import React from 'react'
import {Button} from 'react-native'
import {useBase} from 'rn-base-component'

const MyComponent = () => {
  const {colorMode, toggleColorMode, setColorMode} = useBase()

  return (
    <View>
      <Text>{colorMode}</Text>
      <Button title="Toggle Color" onPress={toggleColorModee} />
      <Button title="Set Color Light" onPress={() => setColorMode('light')} />
      <Button title="Set Color Dark" onPress={() => setColorMode('dark')} />
    </View>
  )
}
```

# Default theme

### Colors

```ts
const colors = {
  mainBackground: '#F0F2F3',
  cardPrimaryBackground: '#0A906E',
  textColor: '#0B0B0B',
}
```

### Typography

```ts
const typography = {
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
  fonts: {
    heading: undefined,
    body: undefined,
    mono: undefined,
  },
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
}
```

### Border Width

```ts
const borderWidths = {
  smallest: 1,
  tiny: 2,
  small: 4,
  medium: 6,
  large: 8,
  huge: 10,
  enormous: 12,
  massive: 14,
  gargantuan: 16,
  colossal: 18,
  largest: 20,
}
```

### Sizes

```ts
const sizes = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 20,
  huge: 24,
  enormous: 32,
  massive: 48,
  gargantuan: 64,
  colossal: 96,
  gigantic: 128,
  extraLarge: 160,
  jumbo: 200,
}
```

### Spacing

```ts
const spacing = {
  mini: 2,
  tiny: 4,
  micro: 6,
  xxs: 8,
  xs: 12,
  small: 16,
  sMedium: 18,
  medium: 20,
  large: 24,
  xl: 28,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
  giant: 80,
}
```
