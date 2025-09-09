# Typography Component

A comprehensive typography system component that provides consistent text styling with predefined variants for building hierarchical text layouts in React Native applications.

## Features

- 📐 **Typography Scale** - Predefined text variants (h1, h2, regular, bold)
- 🎨 **Consistent Styling** - Standardized font sizes, weights, and line heights
- 🎯 **Easy to Use** - Simple variant-based API for quick implementation
- 🔧 **Flexible** - Supports custom colors and additional styling
- ♿ **Accessible** - Built-in text accessibility features
- 🎪 **TypeScript Ready** - Full type definitions and IntelliSense support

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Typography} from 'rn-base-component'

export default function App() {
  return <Typography variant="h1">Welcome to our app</Typography>
}
```

## Typography Variants

### Heading 1 (h1)

```tsx
<Typography variant="h1">Large Heading</Typography>
// Font size: 28, Weight: 700, Line height: 32
```

### Heading 2 (h2)

```tsx
<Typography variant="h2">Medium Heading</Typography>
// Font size: 24, Weight: 700, Line height: 28
```

### Regular Text

```tsx
<Typography variant="regular">Regular body text</Typography>
// Font size: 16, Weight: 400, Line height: 24
```

### Bold Text

```tsx
<Typography variant="bold">Bold body text</Typography>
// Font size: 16, Weight: bold, Line height: 24
```

### Default (Regular)

```tsx
<Typography>Default text (same as regular variant)</Typography>
```

## Advanced Usage

### Custom Colors

```tsx
<Typography variant="h1" color="#FF6B6B">
  Red Heading
</Typography>

<Typography variant="regular" color="#666666">
  Gray body text
</Typography>
```

### With Additional Styling

```tsx
;<Typography variant="h2" color="#2196F3" style={styles.styledHeading}>
  Styled Heading
</Typography>

const styles = StyleSheet.create({
  styledHeading: {
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
})
```

### Combining with React Native Text Props

```tsx
<Typography variant="regular" numberOfLines={3} ellipsizeMode="tail" selectable>
  This is a long text that will be truncated after three lines and can be selected by the user.
</Typography>
```

## API Reference

### TypographyProps

| Prop      | Type                | Default                 | Description                 |
| --------- | ------------------- | ----------------------- | --------------------------- |
| `variant` | `TypographyVariant` | `'regular'`             | Typography variant to apply |
| `color`   | `string`            | `theme.colors.darkText` | Text color                  |

### TypographyVariant

```tsx
type TypographyVariant = 'h1' | 'h2' | 'regular' | 'bold'
```

### Typography Variant Styles

| Variant   | Font Size | Font Weight | Line Height |
| --------- | --------- | ----------- | ----------- |
| `h1`      | 28        | 700         | 32          |
| `h2`      | 24        | 700         | 28          |
| `regular` | 16        | 400         | 24          |
| `bold`    | 16        | bold        | 24          |

### Inherited Props

The Typography component also accepts all props from React Native's `TextProps`:

- `style` - Additional styling
- `numberOfLines` - Limit number of lines
- `ellipsizeMode` - Text truncation behavior
- `selectable` - Allow text selection
- `testID` - Testing identifier
- And all other React Native Text props

## Layout Examples

### Article Layout

```tsx
;<View style={styles.articleContainer}>
  <Typography variant="h1" style={styles.articleTitle}>
    Article Title
  </Typography>

  <Typography variant="regular" color="#666666" style={styles.publishDate}>
    Published on March 15, 2024
  </Typography>

  <Typography variant="h2" style={styles.sectionTitle}>
    Introduction
  </Typography>

  <Typography variant="regular" style={styles.introText}>
    This is the introduction paragraph of the article. It provides context and overview of what the reader can
    expect to learn.
  </Typography>

  <Typography variant="bold" style={styles.keyPointsTitle}>
    Key Points:
  </Typography>

  <Typography variant="regular">• Point one with important information</Typography>
  <Typography variant="regular">• Point two with additional details</Typography>
</View>

const styles = StyleSheet.create({
  articleContainer: {
    padding: 16,
  },
  articleTitle: {
    marginBottom: 8,
  },
  publishDate: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  introText: {
    marginBottom: 16,
    lineHeight: 26,
  },
  keyPointsTitle: {
    marginBottom: 8,
  },
})
```

### Card Content

```tsx
;<View style={styles.card}>
  <Typography variant="h2" style={styles.cardTitle}>
    Card Title
  </Typography>

  <Typography variant="regular" color="#666666" style={styles.cardDescription}>
    Card description with supporting information
  </Typography>

  <Typography variant="bold" color="#007AFF">
    Learn More →
  </Typography>
</View>

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardDescription: {
    marginBottom: 12,
  },
})
```

### Form Section

```tsx
;<View style={styles.formSection}>
  <Typography variant="h2" style={styles.formTitle}>
    Personal Information
  </Typography>

  <Typography variant="bold" style={styles.fieldLabel}>
    Full Name *
  </Typography>
  <TextInput placeholder="Enter your full name" />

  <Typography variant="bold" style={styles.fieldLabelWithMargin}>
    Email Address *
  </Typography>
  <TextInput placeholder="Enter your email" />
</View>

const styles = StyleSheet.create({
  formSection: {
    padding: 16,
  },
  formTitle: {
    marginBottom: 16,
  },
  fieldLabel: {
    marginBottom: 4,
  },
  fieldLabelWithMargin: {
    marginTop: 16,
    marginBottom: 4,
  },
})
```

## Color Guidelines

### Semantic Colors

```tsx
// Primary content
<Typography color="#333333">Primary text content</Typography>

// Secondary content
<Typography color="#666666">Secondary information</Typography>

// Tertiary content
<Typography color="#999999">Helper text or captions</Typography>

// Status colors
<Typography color="#00AA00">Success message</Typography>
<Typography color="#FF0000">Error message</Typography>
<Typography color="#FF9500">Warning message</Typography>
<Typography color="#007AFF">Link or action text</Typography>
```

## Theme Integration

The Typography component uses predefined styles but can be customized through the theme:

```tsx
// Custom typography styles (modify in Typography.tsx)
export const typographyVariantStyles = {
  h1: {
    fontSize: 32, // Larger heading
    fontWeight: '800', // Extra bold
    lineHeight: 36,
  },
  h2: {
    fontSize: 26, // Adjusted medium heading
    fontWeight: '600', // Semi-bold
    lineHeight: 30,
  },
  regular: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bold: {
    fontSize: 16,
    fontWeight: '700', // Explicit weight
    lineHeight: 24,
  },
}
```

## Accessibility Features

### Semantic Headers

```tsx
<Typography
  variant="h1"
  accessibilityRole="header"
  accessibilityLevel={1}>
  Main Page Title
</Typography>

<Typography
  variant="h2"
  accessibilityRole="header"
  accessibilityLevel={2}>
  Section Title
</Typography>
```

### Screen Reader Support

```tsx
<Typography variant="regular" accessibilityLabel="Welcome message for new users">
  Welcome! Let's get started.
</Typography>
```

## Best Practices

1. **Hierarchy** - Use variants consistently to create clear visual hierarchy
2. **Contrast** - Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
3. **Line Height** - Default line heights provide good readability
4. **Spacing** - Add appropriate margins between typography elements
5. **Consistency** - Stick to the predefined variants for consistency
6. **Performance** - Typography component is optimized for minimal re-renders

## Common Use Cases

### Navigation Headers

```tsx
;<Typography variant="h1" style={styles.navigationHeader}>
  Settings
</Typography>

const styles = StyleSheet.create({
  navigationHeader: {
    textAlign: 'center',
  },
})
```

### List Items

```tsx
;<View style={styles.listItem}>
  <Typography variant="bold">John Doe</Typography>
  <Typography variant="regular" color="#666666">
    Software Engineer
  </Typography>
</View>

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
})
```

### Status Messages

```tsx
<Typography variant="bold" color="#00AA00">
  ✓ Profile updated successfully
</Typography>
```

### Captions and Labels

```tsx
;<Typography variant="regular" color="#999999" style={styles.caption}>
  Last updated 2 hours ago
</Typography>

const styles = StyleSheet.create({
  caption: {
    fontSize: 12,
  },
})
```

## Troubleshooting

### Common Issues

**Text not displaying with correct variant**

- Check that the variant prop is spelled correctly
- Verify the variant exists in `typographyVariantStyles`

**Custom colors not applying**

- Ensure the color prop is a valid color string
- Check if parent styles are overriding the color

**Line height issues**

- Default line heights are optimized for readability
- Adjust line height in style prop if needed for specific layouts

**Font weight not showing**

- Some platforms may not support all font weights
- Ensure the font family supports the specified weight
