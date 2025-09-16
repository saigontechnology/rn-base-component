# Typography Component

A flexible and consistent typography component for React Native applications that provides standardized text styling with built-in design system integration.

## Features

- 🎨 **Predefined Variants** - H1, H2, Regular, and Bold typography styles
- 🎯 **Theme Integration** - Seamlessly integrates with the design system
- 🔧 **Customizable** - Override colors, styles, and variants as needed
- 📱 **Responsive** - Consistent text rendering across different screen sizes
- ♿ **Accessibility Ready** - Built-in accessibility features
- 🎪 **Flexible Styling** - Supports all React Native Text properties

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
  return (
    <View>
      <Typography variant="h1">Main Heading</Typography>
      <Typography variant="h2">Sub Heading</Typography>
      <Typography variant="regular">Regular body text</Typography>
      <Typography variant="bold">Bold text</Typography>
    </View>
  )
}
```

## Typography Variants

### Heading 1 (H1)

```tsx
<Typography variant="h1">Page Title or Main Heading</Typography>
```

### Heading 2 (H2)

```tsx
<Typography variant="h2">Section Heading or Subtitle</Typography>
```

### Regular Text

```tsx
<Typography variant="regular">This is regular body text for paragraphs and general content.</Typography>
```

### Bold Text

```tsx
<Typography variant="bold">This text is bold for emphasis and highlights.</Typography>
```

## Advanced Usage

### Custom Colors

```tsx
<Typography variant="h1" color="#FF6B6B">
  Colored Heading
</Typography>

<Typography variant="regular" color="#666666">
  Muted text content
</Typography>
```

### Custom Styling

```tsx
;<Typography variant="h2" style={styles.customHeading} numberOfLines={2} ellipsizeMode="tail">
  Custom styled heading with truncation
</Typography>

const styles = StyleSheet.create({
  customHeading: {
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
})
```

### Responsive Typography

```tsx
const ResponsiveText = ({isLargeScreen}) => (
  <Typography
    variant={isLargeScreen ? 'h1' : 'h2'}
    style={isLargeScreen ? styles.largeText : styles.normalText}>
    Responsive Typography
  </Typography>
)
```

## API Reference

### TypographyProps

| Prop      | Type                   | Default     | Description                                  |
| --------- | ---------------------- | ----------- | -------------------------------------------- |
| `variant` | `TypographyVariant`    | Theme       | Typography variant (overrides theme default) |
| `color`   | `string`               | Theme       | Text color (overrides theme default)         |
| `style`   | `StyleProp<TextStyle>` | `undefined` | Custom styles for the text                   |
| `...rest` | `TextProps`            | -           | All other React Native Text props            |

### TypographyVariant

```tsx
type TypographyVariant = 'h1' | 'h2' | 'regular' | 'bold'
```

## Usage Patterns

### Article Layout

```tsx
const ArticleLayout = ({article}) => (
  <ScrollView style={styles.container}>
    <Typography variant="h1" style={styles.title}>
      {article.title}
    </Typography>

    <Typography variant="regular" color="#666" style={styles.meta}>
      By {article.author} • {article.date}
    </Typography>

    <Typography variant="h2" style={styles.subtitle}>
      {article.subtitle}
    </Typography>

    {article.content.split('\n').map((paragraph, index) => (
      <Typography key={index} variant="regular" style={styles.paragraph}>
        {paragraph}
      </Typography>
    ))}
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  meta: {
    marginBottom: 20,
  },
  subtitle: {
    marginVertical: 16,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 24,
  },
})
```

### Card Content

```tsx
const ProductCard = ({product}) => (
  <View style={styles.card}>
    <Typography variant="bold" style={styles.productName}>
      {product.name}
    </Typography>

    <Typography variant="regular" color="#666" style={styles.description}>
      {product.description}
    </Typography>

    <Typography variant="h2" color="#007AFF" style={styles.price}>
      ${product.price}
    </Typography>

    <Typography variant="regular" color="#FF6B6B">
      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
    </Typography>
  </View>
)

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
  },
  productName: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
  },
  price: {
    marginBottom: 8,
  },
})
```

### Form Labels and Messages

```tsx
const FormField = ({label, error, required}) => (
  <View style={styles.fieldContainer}>
    <Typography variant="bold" style={styles.label}>
      {label}
      {required && <Typography color="#FF6B6B"> *</Typography>}
    </Typography>

    <TextInput style={styles.input} />

    {error && (
      <Typography variant="regular" color="#FF6B6B" style={styles.error}>
        {error}
      </Typography>
    )}
  </View>
)

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 14,
  },
})
```

### Status Messages

```tsx
const StatusMessage = ({type, message}) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50'
      case 'warning':
        return '#FF9800'
      case 'error':
        return '#F44336'
      default:
        return '#666666'
    }
  }

  return (
    <View style={[styles.statusContainer, {borderLeftColor: getColor()}]}>
      <Typography variant="bold" color={getColor()}>
        {type.toUpperCase()}
      </Typography>
      <Typography variant="regular" style={styles.statusMessage}>
        {message}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderLeftWidth: 4,
    marginVertical: 8,
  },
  statusMessage: {
    marginTop: 4,
  },
})
```

## Theme Integration

The Typography component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    Typography: {
      color: '#2D3748', // Default text color
      variant: 'regular', // Default variant
      variantStyles: {
        // Custom variant styles
        h1: {
          fontSize: 32,
          fontWeight: '700',
          lineHeight: 40,
        },
        h2: {
          fontSize: 28,
          fontWeight: '700',
          lineHeight: 34,
        },
        regular: {
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 24,
        },
        bold: {
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 24,
        },
      },
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<Typography>Default styled text</Typography>

// Override specific theme values
<Typography
  variant="h1"
  color="#FF6B6B"
  style={{textAlign: 'center'}}
>
  Custom colored heading
</Typography>
```

### Default Theme Values

```tsx
// Default Typography theme configuration
TypographyTheme: {
  color: '#27272a',          // base.colors.darkText
  variant: 'regular',        // Default variant
  variantStyles: {
    h1: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 32,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 28,
    },
    regular: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bold: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 24,
    },
  }
}
```

## Typography Scale

### Font Size Guidelines

- **H1**: 28px - Page titles, main headings
- **H2**: 24px - Section headings, subtitles
- **Regular**: 16px - Body text, paragraphs
- **Bold**: 16px - Emphasized body text

### Line Height Recommendations

- **H1**: 32px (1.14x) - Tight spacing for headings
- **H2**: 28px (1.17x) - Balanced heading spacing
- **Regular**: 24px (1.5x) - Comfortable reading spacing
- **Bold**: 24px (1.5x) - Consistent with regular text

## Accessibility

### Screen Reader Support

```tsx
<Typography
  variant="h1"
  accessibilityRole="header"
  accessibilityLevel={1}
>
  Main Page Title
</Typography>

<Typography
  variant="h2"
  accessibilityRole="header"
  accessibilityLevel={2}
>
  Section Heading
</Typography>
```

### Semantic HTML Equivalents

```tsx
// For important announcements
<Typography
  variant="bold"
  accessibilityLiveRegion="polite"
  accessibilityRole="alert"
>
  Form submitted successfully!
</Typography>

// For descriptive text
<Typography
  variant="regular"
  accessibilityRole="text"
>
  Detailed description text
</Typography>
```

## Best Practices

1. **Consistent Hierarchy** - Use heading variants in proper order (H1, then H2)
2. **Readable Contrast** - Ensure sufficient color contrast for accessibility
3. **Appropriate Line Heights** - Use recommended line heights for readability
4. **Semantic Usage** - Use appropriate variants for their intended purpose
5. **Custom Styling** - Use the `style` prop for layout-specific adjustments
6. **Theme Integration** - Leverage theme values for consistent design

## Advanced Patterns

### Conditional Typography

```tsx
const ConditionalText = ({condition, children}) => (
  <Typography variant={condition ? 'bold' : 'regular'} color={condition ? '#007AFF' : '#666666'}>
    {children}
  </Typography>
)
```

### Truncated Text

```tsx
const TruncatedHeading = ({text, maxLines = 2}) => (
  <Typography variant="h2" numberOfLines={maxLines} ellipsizeMode="tail" style={styles.truncated}>
    {text}
  </Typography>
)

const styles = StyleSheet.create({
  truncated: {
    width: '100%',
  },
})
```

### Interactive Typography

```tsx
const InteractiveText = ({onPress, children}) => (
  <TouchableOpacity onPress={onPress}>
    <Typography variant="bold" color="#007AFF" style={styles.interactive}>
      {children}
    </Typography>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  interactive: {
    textDecorationLine: 'underline',
  },
})
```

## Troubleshooting

### Common Issues

**Text not showing theme styles**

- Ensure the component is wrapped in a theme provider
- Check that theme configuration is properly applied
- Verify variant name is spelled correctly

**Custom styles not applying**

- Check style object syntax and properties
- Ensure custom styles don't conflict with variant styles
- Use array syntax for multiple style objects

**Accessibility warnings**

- Provide appropriate accessibility roles for headings
- Use semantic variants for their intended purpose
- Ensure color contrast meets accessibility standards

**Performance issues with large text blocks**

- Consider using React Native's Text component directly for very large texts
- Use `numberOfLines` prop to limit rendering for long content
- Implement virtualization for very long lists of text content
