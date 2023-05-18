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
  primary: '#0e7490',
  secondary: '#be185d',
  tertiary: '#047857',
  danger: '#be123c',
  error: '#b91c1c',
  success: '#15803d',
  warning: '#c2410c',
  muted: '#404040',
  info: '#0369a1',
  light: '#44403c',
  white: '#FFFFFF',
  black: '#000000',
  darkText: '#27272a',
  rose: '#be123c',
  pink: '#be185d',
  fuchsia: '#a21caf',
  purple: '#7e22ce',
  violet: '#6d28d9',
  indigo: '#4338ca',
  blue: '#1d4ed8',
  lightBlue: '#0369a1',
  darkBlue: '#004282',
  cyan: '#0e7490',
  teal: '#0f766e',
  emerald: '#047857',
  green: '#15803d',
  lime: '#4d7c0f',
  yellow: '#a16207',
  amber: '#b45309',
  orange: '#c2410c',
  red: '#b91c1c',
  warmGray: '#44403c',
  trueGray: '#404040',
  gray: '#3f3f46',
  coolGray: '#374151',
  blueGray: '#334155',
  dark: '#18181b',
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
  tiny: 1,
  miniature: 2,
  petite: 3,
  small: 4,
  little: 5,
  compact: 6,
  narrow: 7,
  slim: 8,
  moderate: 9,
  average: 10,
  substantial: 11,
  large: 12,
  big: 13,
  grand: 14,
  huge: 15,
  giant: 16,
  colossal: 17,
  enormous: 18,
  mammoth: 19,
  titanic: 20,
}
```

### Sizes

```ts
const sizes = {
  tiny: 4,
  miniature: 8,
  petite: 12,
  small: 16,
  little: 20,
  compact: 24,
  narrow: 28,
  slim: 32,
  moderate: 36,
  average: 40,
  substantial: 48,
  large: 64,
  big: 80,
  grand: 96,
  huge: 128,
  giant: 160,
  colossal: 192,
  enormous: 224,
  mammoth: 256,
  titanic: 288,
}
```

### Spacing

```ts
const spacing = {
  tiny: 2,
  miniature: 4,
  petite: 6,
  small: 8,
  little: 10,
  compact: 12,
  narrow: 14,
  slim: 16,
  moderate: 18,
  average: 20,
  substantial: 22,
  large: 24,
  big: 26,
  grand: 28,
  huge: 30,
  giant: 32,
  colossal: 34,
  enormous: 36,
  mammoth: 38,
  titanic: 40,
}
```

### Opacity

```ts
const opacity = {
  transparent: 0,
  translucent: 0.05,
  hazy: 0.1,
  misty: 0.2,
  faint: 0.25,
  lightyOpaque: 0.3,
  semiOpaque: 0.4,
  partiallyOpaque: 0.5,
  clouded: 0.6,
  murky: 0.7,
  opaque: 0.75,
  solid: 0.8,
  dense: 0.9,
  darkened: 0.95,
  blackened: 1,
}
```

### Shadows

```ts
const shadows = {
  tiny: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  miniature: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  petite: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  little: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  compact: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  narrow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  slim: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  moderate: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  average: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
}
```
