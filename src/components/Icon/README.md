# Icon Component

A versatile icon component for React Native applications that provides consistent icon rendering with touch interactions and customizable styling options.

## Features

- 🎨 **Flexible Styling** - Customizable size, color, and styling options
- 👆 **Touch Interactions** - Built-in press and long press support
- 🎯 **Hit Area** - Configurable touch target area for better usability
- 🖼️ **Image Support** - Works with any React Native image source
- ♿ **Accessibility Ready** - Built-in accessibility features
- 🔧 **TypeScript Support** - Full type safety and IntelliSense

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Icon} from 'rn-base-component'

export default function App() {
  return <Icon source={require('./assets/icons/home.png')} />
}
```

## Interactive Icon

```tsx
<Icon source={require('./assets/icons/heart.png')} onPress={() => console.log('Heart icon pressed!')} />
```

## Advanced Usage

### Custom Size and Color

```tsx
<Icon source={require('./assets/icons/star.png')} size={32} color="#FFD700" onPress={handleStarPress} />
```

### With Custom Hit Area

```tsx
<Icon
  source={require('./assets/icons/close.png')}
  size={16}
  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
  onPress={handleClose}
/>
```

### Long Press Support

```tsx
<Icon source={require('./assets/icons/menu.png')} onPress={handlePress} onLongPress={handleLongPress} />
```

### Custom Styling

```tsx
;<Icon
  source={require('./assets/icons/profile.png')}
  size={40}
  style={styles.profileIcon}
  buttonStyle={styles.profileButton}
  onPress={handleProfilePress}
/>

const styles = StyleSheet.create({
  profileIcon: {
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  profileButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
  },
})
```

### Disabled State

```tsx
<Icon
  source={require('./assets/icons/action.png')}
  disabled={isLoading}
  color={isLoading ? '#ccc' : '#333'}
  onPress={handleAction}
/>
```

## API Reference

### IconProps

| Prop          | Type                    | Default          | Description                               |
| ------------- | ----------------------- | ---------------- | ----------------------------------------- |
| `source`      | `ImageSourcePropType`   | Required         | Image source for the icon                 |
| `size`        | `number`                | `metrics.medium` | Width and height of the icon              |
| `disabled`    | `boolean`               | `false`          | Disable touch interactions                |
| `color`       | `string`                | `undefined`      | Tint color for the icon                   |
| `hitSlop`     | `Insets`                | `defaultHitSlop` | Extends the touchable area                |
| `style`       | `StyleProp<ImageStyle>` | `undefined`      | Custom styles for the icon image          |
| `resizeMode`  | `ImageResizeMode`       | `'contain'`      | How the image should be resized           |
| `testID`      | `string`                | `undefined`      | Testing identifier                        |
| `onPress`     | `() => void`            | `undefined`      | Callback for press events                 |
| `onLongPress` | `() => void`            | `undefined`      | Callback for long press events            |
| `buttonStyle` | `StyleProp<ViewStyle>`  | `undefined`      | Custom styles for the touchable container |

## Icon Patterns

### Navigation Icons

```tsx
;<View style={styles.navigationContainer}>
  <Icon source={require('./assets/icons/back.png')} onPress={() => navigation.goBack()} hitSlop={12} />
  <Icon
    source={require('./assets/icons/settings.png')}
    onPress={() => navigation.navigate('Settings')}
    hitSlop={12}
  />
</View>

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
```

### Tab Bar Icons

```tsx
;<View style={styles.tabBar}>
  {tabs.map((tab, index) => (
    <Icon
      key={tab.id}
      source={tab.icon}
      size={24}
      color={activeTab === index ? '#007AFF' : '#999'}
      onPress={() => setActiveTab(index)}
      style={[styles.tabIcon, {opacity: activeTab === index ? 1 : 0.6}]}
    />
  ))}
</View>

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tabIcon: {
    padding: 8,
  },
})
```

### Action Icons

```tsx
;<View style={styles.actionContainer}>
  <Icon
    source={require('./assets/icons/like.png')}
    size={20}
    color={isLiked ? '#FF6B6B' : '#999'}
    onPress={toggleLike}
  />
  <Text style={styles.likeCount}>{likeCount}</Text>

  <Icon
    source={require('./assets/icons/share.png')}
    size={20}
    color="#007AFF"
    onPress={handleShare}
    style={styles.shareIcon}
  />
</View>

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 4,
  },
  shareIcon: {
    marginLeft: 16,
  },
})
```

### Floating Action Button

```tsx
;<Icon
  source={require('./assets/icons/add.png')}
  size={24}
  color="white"
  buttonStyle={styles.fab}
  onPress={handleAdd}
/>

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
```

## Styling Guidelines

### Size Recommendations

- **Small Icons**: 16px - For inline text or compact layouts
- **Medium Icons**: 24px - Standard UI icons
- **Large Icons**: 32px - Prominent actions or headers
- **Extra Large**: 48px+ - Featured content or app icons

### Color Guidelines

```tsx
// Semantic colors
<Icon color="#333333" /> // Primary actions
<Icon color="#666666" /> // Secondary actions
<Icon color="#999999" /> // Disabled/inactive state
<Icon color="#007AFF" /> // Primary brand color
<Icon color="#FF3B30" /> // Destructive actions
<Icon color="#34C759" /> // Success/positive actions
```

### Hit Area Best Practices

```tsx
// Minimum 44x44 pt touch target (iOS HIG)
<Icon
  size={20}
  hitSlop={12} // Extends touch area to 44x44
  onPress={handlePress}
/>

// For very small icons
<Icon
  size={12}
  hitSlop={16} // Extends touch area to 44x44
  onPress={handlePress}
/>
```

## Icon Sources

### Local Images

```tsx
<Icon source={require('./assets/icons/home.png')} />
<Icon source={require('./assets/icons/profile.jpg')} />
```

### Remote Images

```tsx
<Icon source={{uri: 'https://example.com/icon.png'}} />
<Icon source={{uri: userAvatarUrl}} style={{borderRadius: 20}} />
```

### Base64 Images

```tsx
<Icon source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'}} />
```

## Accessibility

### Screen Reader Support

```tsx
<Icon
  source={require('./assets/icons/close.png')}
  onPress={handleClose}
  accessibilityLabel="Close dialog"
  accessibilityHint="Closes the current dialog"
  accessibilityRole="button"
/>
```

### Semantic Icons

```tsx
<Icon
  source={require('./assets/icons/warning.png')}
  accessibilityRole="image"
  accessibilityLabel="Warning icon"
/>
```

## Performance Optimization

### Image Caching

```tsx
// For remote icons, consider using react-native-fast-image
import FastImage from 'react-native-fast-image'

// Custom icon component with caching
const CachedIcon = ({source, ...props}) => (
  <Icon
    {...props}
    source={{
      uri: source.uri,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
  />
)
```

### Optimized Local Icons

- Use appropriately sized assets (@1x, @2x, @3x)
- Consider vector formats (SVG) for scalable icons
- Compress PNG/JPG assets without losing quality

## Common Use Cases

### Header Actions

```tsx
;<View style={styles.header}>
  <Icon source={require('./assets/icons/menu.png')} onPress={openDrawer} hitSlop={8} />
  <Text style={styles.title}>Screen Title</Text>
  <Icon source={require('./assets/icons/search.png')} onPress={openSearch} hitSlop={8} />
</View>

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
})
```

### Form Controls

```tsx
;<View style={styles.inputContainer}>
  <TextInput style={styles.input} placeholder="Search..." />
  <Icon source={require('./assets/icons/search.png')} size={20} color="#999" style={styles.searchIcon} />
</View>

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  searchIcon: {
    marginLeft: 8,
  },
})
```

### Status Indicators

```tsx
;<View style={styles.statusContainer}>
  <Icon source={require('./assets/icons/wifi.png')} size={16} color={isConnected ? '#34C759' : '#FF3B30'} />
  <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
</View>

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 4,
  },
})
```

### Interactive Lists

```tsx
;<FlatList
  data={items}
  renderItem={({item}) => (
    <View style={styles.listItem}>
      <Icon source={item.icon} size={24} />
      <Text style={styles.itemText}>{item.title}</Text>
      <Icon
        source={require('./assets/icons/chevron-right.png')}
        size={16}
        color="#ccc"
        onPress={() => navigateToItem(item)}
      />
    </View>
  )}
/>

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
})
```

## Best Practices

1. **Consistent Sizing** - Use standardized icon sizes across your app
2. **Appropriate Hit Areas** - Ensure touch targets are at least 44pt
3. **Color Semantics** - Use consistent colors for similar actions
4. **Loading States** - Show disabled state during async operations
5. **Accessibility** - Always provide meaningful accessibility labels
6. **Performance** - Optimize icon assets for different screen densities

## Troubleshooting

### Common Issues

**Icon not showing**

- Verify the image source path is correct
- Check if the image file exists in the specified location
- Ensure proper image formats are used (PNG, JPG, etc.)

**Touch events not working**

- Confirm `onPress` or `onLongPress` props are provided
- Check if the icon is disabled
- Verify `hitSlop` is not interfering with other components

**Icon appears blurry**

- Use appropriate image resolutions (@2x, @3x for different densities)
- Check `resizeMode` prop setting
- Ensure source images are high quality
