# Card Component

A flexible and reusable card container component for React Native applications that provides a consistent layout foundation with optional touch interactions.

## Features

- 🎨 **Themed Styling** - Consistent styling that integrates with the design system
- 👆 **Touch Interactions** - Optional onPress functionality with appropriate feedback
- 🔧 **Flexible Layout** - Accepts any children for maximum flexibility
- 📱 **Responsive Design** - Adapts to different screen sizes
- ♿ **Accessibility Ready** - Built-in accessibility features
- 🎯 **TypeScript Support** - Full type safety and IntelliSense

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Card} from 'rn-base-component'
import {Text, View} from 'react-native'

export default function App() {
  return (
    <Card>
      <Text>This is a simple card</Text>
    </Card>
  )
}
```

## Interactive Card

```tsx
<Card onPress={() => console.log('Card pressed!')}>
  <Text>Tap this card</Text>
</Card>
```

## Advanced Usage

### Custom Styled Card

```tsx
;<Card style={styles.customCard}>
  <Text>Card with custom shadow</Text>
</Card>

const styles = StyleSheet.create({
  customCard: {
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
})
```

### Card with Complex Content

```tsx
;<Card onPress={() => navigateToDetails()}>
  <View style={styles.profileContent}>
    <Image source={{uri: 'https://example.com/avatar.jpg'}} style={styles.avatar} />
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileRole}>Software Engineer</Text>
      <Text style={styles.profileActivity}>Last active 2 hours ago</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#ccc" />
  </View>
</Card>

const styles = StyleSheet.create({
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: {
    color: '#666',
    marginTop: 2,
  },
  profileActivity: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
})
```

### List of Cards

```tsx
;<ScrollView>
  {items.map((item, index) => (
    <Card key={index} style={styles.listCard} onPress={() => handleItemPress(item)}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </Card>
  ))}
</ScrollView>

const styles = StyleSheet.create({
  listCard: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    color: '#666',
    marginTop: 4,
  },
})
```

## API Reference

### CardProps

| Prop              | Type                                                  | Default     | Description                                         |
| ----------------- | ----------------------------------------------------- | ----------- | --------------------------------------------------- |
| `onPress`         | `() => void`                                          | `undefined` | Callback function when card is pressed              |
| `style`           | `StyleProp<ViewStyle> \| Array<StyleProp<ViewStyle>>` | `undefined` | Custom styles for the card                          |
| `children`        | `React.ReactNode`                                     | Required    | Content to be rendered inside the card              |
| `padding`         | `number`                                              | Theme       | Padding inside the card (overrides theme default)   |
| `borderRadius`    | `number`                                              | Theme       | Border radius of the card (overrides theme default) |
| `backgroundColor` | `string`                                              | Theme       | Background color of the card (overrides theme)      |

### Default Styling

The Card component comes with default styling from the theme:

- **Padding**: `theme.components.Card.padding` (internal padding)
- **Border Radius**: `theme.components.Card.borderRadius`
- **Background Color**: `theme.components.Card.backgroundColor`
- **Touch Opacity**: Low opacity when pressable, none when not pressable

## Layout Patterns

### Profile Card

```tsx
;<Card style={styles.profileCard}>
  <View style={styles.profileContainer}>
    <Image source={{uri: userAvatar}} style={styles.profileAvatar} />
    <Text style={styles.profileUserName}>{userName}</Text>
    <Text style={styles.profileUserRole}>{userRole}</Text>
    <TouchableOpacity style={styles.followButton}>
      <Text style={styles.followButtonText}>Follow</Text>
    </TouchableOpacity>
  </View>
</Card>

const styles = StyleSheet.create({
  profileCard: {
    margin: 16,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  profileUserRole: {
    color: '#666',
    marginTop: 4,
  },
  followButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
  },
})
```

### Statistics Card

```tsx
;<Card style={styles.statsCard}>
  <Text style={styles.statsValue}>{value}</Text>
  <Text style={styles.statsLabel}>{label}</Text>
  <Text style={styles.statsChange}>↗ +12% from last month</Text>
</Card>

const styles = StyleSheet.create({
  statsCard: {
    margin: 8,
    flex: 1,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statsLabel: {
    color: '#666',
    marginTop: 4,
  },
  statsChange: {
    color: '#00AA00',
    fontSize: 12,
    marginTop: 8,
  },
})
```

### Article Card

```tsx
;<Card onPress={() => openArticle(article.id)} style={styles.articleCard}>
  <Image source={{uri: article.image}} style={styles.articleImage} />
  <View style={styles.articleContent}>
    <Text style={styles.articleTitle}>{article.title}</Text>
    <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
    <View style={styles.articleFooter}>
      <Text style={styles.articleDate}>{article.date}</Text>
      <Text style={styles.readMoreText}>Read More</Text>
    </View>
  </View>
</Card>

const styles = StyleSheet.create({
  articleCard: {
    margin: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleExcerpt: {
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  articleDate: {
    color: '#999',
    fontSize: 12,
  },
  readMoreText: {
    color: '#007AFF',
    fontSize: 14,
  },
})
```

### Settings Item Card

```tsx
;<Card onPress={() => navigateToSetting(setting.id)}>
  <View style={styles.settingItem}>
    <View style={[styles.settingIcon, {backgroundColor: setting.color}]}>
      <Icon name={setting.icon} size={20} color="white" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{setting.title}</Text>
      <Text style={styles.settingDescription}>{setting.description}</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#ccc" />
  </View>
</Card>

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    color: '#666',
    fontSize: 14,
  },
})
```

## Theme Integration

The Card component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    Card: {
      padding: 20, // Custom padding
      borderRadius: 12, // Custom border radius
      backgroundColor: '#F8F9FA', // Custom background color
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<Card>
  <Text>This card uses theme styling</Text>
</Card>

// Override specific theme values
<Card
  padding={24}
  backgroundColor="#FFFFFF"
  borderRadius={16}
>
  <Text>This card overrides theme values</Text>
</Card>
```

### Default Theme Values

```tsx
// Default Card theme configuration
CardTheme: {
  padding: 16,              // theme.spacing.slim
  borderRadius: 8,          // metrics.borderRadius
  backgroundColor: '#FFFFFF' // theme.colors.cardBackground
}
```

## Styling Guidelines

### Elevation and Shadows

```tsx
// iOS shadow
<Card style={styles.iosShadow}>

// Android elevation
<Card style={styles.androidElevation}>

// Cross-platform shadow
<Card style={styles.crossPlatformShadow}>

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  androidElevation: {
    elevation: 3,
  },
  crossPlatformShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
})
```

### Spacing

```tsx
// Card margins for list layouts
<Card style={styles.listLayout}>

// Full-width cards
<Card style={styles.fullWidth}>

// Grid cards
<Card style={styles.gridCard}>

const styles = StyleSheet.create({
  listLayout: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  fullWidth: {
    marginVertical: 8,
  },
  gridCard: {
    margin: 8,
    flex: 1,
  },
})
```

## Accessibility

### Screen Reader Support

```tsx
<Card
  onPress={handlePress}
  accessibilityRole="button"
  accessibilityLabel="User profile card for John Doe"
  accessibilityHint="Tap to view full profile">
  {/* Card content */}
</Card>
```

### Non-interactive Cards

```tsx
<Card accessibilityRole="text">{/* Static content */}</Card>
```

## Best Practices

1. **Touch Feedback** - Only add `onPress` when the card should be interactive
2. **Content Hierarchy** - Use consistent padding and spacing inside cards
3. **Visual Consistency** - Maintain consistent card styling across the app
4. **Performance** - Use `StyleSheet.create()` for static styles
5. **Accessibility** - Provide appropriate accessibility props for interactive cards
6. **Shadow Consistency** - Use consistent shadow/elevation values

## Common Use Cases

### Dashboard Cards

```tsx
;<View style={styles.dashboardContainer}>
  {metrics.map(metric => (
    <Card key={metric.id} style={styles.dashboardCard}>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricLabel}>{metric.label}</Text>
    </Card>
  ))}
</View>

const styles = StyleSheet.create({
  dashboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  dashboardCard: {
    width: '48%',
    margin: '1%',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: '#666',
  },
})
```

### Navigation Menu

```tsx
;<ScrollView>
  {menuItems.map(item => (
    <Card key={item.id} onPress={() => navigate(item.route)}>
      <View style={styles.menuItem}>
        <Icon name={item.icon} size={24} />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
    </Card>
  ))}
</ScrollView>

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
  },
})
```

## Performance Considerations

- Cards with images should implement proper image loading and caching
- For long lists, consider using FlatList with Card components
- Avoid complex nested layouts inside cards for better performance
- Use `removeClippedSubviews` for long scrollable card lists

## Troubleshooting

### Common Issues

**Card not responding to touch**

- Ensure `onPress` prop is provided
- Check if there are overlapping touchable components
- Verify the card has sufficient size for touch interaction

**Styling not applying**

- Check style prop syntax and ensure valid style objects
- Verify theme configuration is correct
- Use style array format for multiple style objects

**Shadow not showing on Android**

- Use `elevation` property instead of shadow properties
- Ensure the card has sufficient margin for shadow visibility
