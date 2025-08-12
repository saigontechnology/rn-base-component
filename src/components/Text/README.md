# Text Component

A styled text component for React Native that provides consistent typography and theming capabilities with additional text styling variants.

## Features

- 🎨 **Theme Integration** - Seamlessly integrates with the design system
- 📝 **Multiple Variants** - Regular, Bold, and Italic text styles
- 🎯 **Customizable** - Override colors, fonts, and sizes easily
- ♿ **Accessible** - Inherits all React Native Text accessibility features
- 🔧 **TypeScript Ready** - Full type safety and IntelliSense support
- 🎪 **Styled Components** - Built with styled-components for optimal performance

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Text} from 'rn-base-component'

export default function App() {
  return <Text>Hello, World!</Text>
}
```

## Text Variants

### Regular Text

```tsx
import {Text} from 'rn-base-component'
;<Text>This is regular text</Text>
```

### Bold Text

```tsx
import {TextBold} from 'rn-base-component'
;<TextBold>This is bold text</TextBold>
```

### Italic Text

```tsx
import {TextItalic} from 'rn-base-component'
;<TextItalic>This is italic text</TextItalic>
```

## Advanced Usage

### Custom Colors

```tsx
<Text color="#FF6B6B">Red colored text</Text>
<Text color="#4ECDC4">Teal colored text</Text>
<Text color="#45B7D1">Blue colored text</Text>
```

### Custom Font Sizes

```tsx
<Text fontSize={12}>Small text</Text>
<Text fontSize={16}>Regular text</Text>
<Text fontSize={20}>Large text</Text>
<Text fontSize={24}>Extra large text</Text>
```

### Custom Font Family

```tsx
<Text fontFamily="Arial">Text with Arial font</Text>
<Text fontFamily="Helvetica">Text with Helvetica font</Text>
<TextBold fontFamily="CustomFont-Bold">Bold with custom font</TextBold>
```

### Combining Properties

```tsx
<Text color="#333333" fontSize={18} fontFamily="Roboto-Medium">
  Custom styled text
</Text>
```

### With Standard Text Props

```tsx
;<Text numberOfLines={2} ellipsizeMode="tail" selectable style={styles.centeredText}>
  This text will be truncated after two lines and can be selected
</Text>

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
})
```

## API Reference

### TextProps

| Prop         | Type                    | Default                          | Description        |
| ------------ | ----------------------- | -------------------------------- | ------------------ |
| `fontSize`   | `TextStyle['fontSize']` | `theme.components.Text.fontSize` | Custom font size   |
| `color`      | `string`                | `theme.components.Text.color`    | Text color         |
| `fontFamily` | `string`                | `theme.fonts.regular`            | Custom font family |

### Inherited Props

The Text component also accepts all props from React Native's `TextProps`:

- `style` - Additional styling
- `numberOfLines` - Limit number of lines
- `ellipsizeMode` - Text truncation behavior
- `selectable` - Allow text selection
- `testID` - Testing identifier
- And all other React Native Text props

## Text Variants

### Text

The base text component with theme defaults.

### TextBold

Text component with bold font weight using the theme's bold font family.

### TextItalic

Text component with italic font style applied.

## Theme Integration

The Text component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  components: {
    Text: {
      fontSize: 16,
      color: '#333333',
    },
  },
  fonts: {
    regular: 'System',
    bold: 'System-Bold',
  },
}
```

## Styling Guidelines

### Font Size Scale

```tsx
// Recommended font sizes
<Text fontSize={12}>Caption text</Text>
<Text fontSize={14}>Small text</Text>
<Text fontSize={16}>Body text</Text>
<Text fontSize={18}>Subheading</Text>
<Text fontSize={20}>Heading</Text>
<Text fontSize={24}>Large heading</Text>
```

### Color Usage

```tsx
// Semantic colors
<Text color="#333333">Primary text</Text>
<Text color="#666666">Secondary text</Text>
<Text color="#999999">Tertiary text</Text>
<Text color="#FF0000">Error text</Text>
<Text color="#00AA00">Success text</Text>
```

## Common Use Cases

### UI Labels

```tsx
;<View style={styles.labelContainer}>
  <TextBold fontSize={18}>Username</TextBold>
  <Text color="#666666">john.doe@example.com</Text>
</View>

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 16,
  },
})
```

### Form Labels

```tsx
;<View style={styles.formField}>
  <TextBold fontSize={14}>Email Address</TextBold>
  <TextInput placeholder="Enter your email" />
</View>

const styles = StyleSheet.create({
  formField: {
    marginBottom: 16,
  },
})
```

### Status Messages

```tsx
<Text color="#00AA00">✓ Success: Data saved</Text>
<Text color="#FF0000">✗ Error: Invalid input</Text>
<Text color="#FF9500">⚠ Warning: Please check</Text>
```

### Content Display

```tsx
;<View style={styles.articleContainer}>
  <TextBold fontSize={20}>Article Title</TextBold>
  <Text color="#666666" fontSize={12}>
    Published on March 15, 2024
  </Text>
  <Text style={styles.articleContent}>Article content goes here...</Text>
</View>

const styles = StyleSheet.create({
  articleContainer: {
    padding: 16,
  },
  articleContent: {
    marginTop: 10,
    lineHeight: 24,
  },
})
```

### Navigation Elements

```tsx
;<TouchableOpacity style={styles.navButton}>
  <Text color="#007AFF">Learn More →</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  navButton: {
    padding: 12,
    alignSelf: 'flex-start',
  },
})
```

## Accessibility

### Screen Reader Support

```tsx
<Text accessibilityLabel="Welcome message" accessibilityRole="text">
  Welcome to our app!
</Text>
```

### Semantic Usage

```tsx
<Text accessibilityRole="header" fontSize={20}>
  Page Title
</Text>
```

## Best Practices

1. **Consistent Typography** - Use theme values for consistent font sizes and colors
2. **Semantic Colors** - Use meaningful color names and values
3. **Hierarchy** - Use font sizes and weights to create clear visual hierarchy
4. **Accessibility** - Ensure sufficient color contrast (4.5:1 for normal text)
5. **Line Height** - Consider line spacing for readability
6. **Font Loading** - Ensure custom fonts are properly loaded before use

## Performance Considerations

- The Text component is optimized with styled-components
- Font changes may trigger re-renders
- Consider memoization for dynamic text with frequent updates
- Custom fonts should be preloaded for optimal performance

## Troubleshooting

### Common Issues

**Custom font not displaying**

- Verify the font is properly linked in your project
- Check font family name spelling
- Ensure font files are included in the build

**Theme colors not applying**

- Verify theme provider is properly configured
- Check theme structure matches expected format
- Ensure component is wrapped in theme provider

**Text not wrapping properly**

- Add `flexShrink: 1` to parent container
- Consider using `numberOfLines` for truncation
- Check parent container width constraints

**Styling conflicts**

- Theme styles have lower priority than direct props
- Use `style` prop for one-off customizations
- Check for conflicting styles in parent components
