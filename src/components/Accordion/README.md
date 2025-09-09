# Accordion Component

A flexible and animated accordion component for React Native applications that allows users to expand and collapse content sections with smooth animations.

## Features

- 📁 **Collapsible Sections** - Expand and collapse content with smooth animations
- 🎨 **Customizable Styling** - Full control over headers, content, and container styling
- 🔄 **Multiple Modes** - Single or multiple section expansion support
- 🎪 **Smooth Animations** - Configurable animation types and durations
- 🎯 **Custom Rendering** - Custom header and content rendering capabilities
- ♿ **Accessibility Ready** - Screen reader support and proper semantics

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Accordion} from 'rn-base-component'

const sections = [
  {
    title: 'What is React Native?',
    content: 'React Native is a framework for building mobile applications using React.',
  },
  {
    title: 'How does it work?',
    content: 'React Native uses native components instead of web components as building blocks.',
  },
  {
    title: 'Is it production ready?',
    content: 'Yes, many popular apps like Facebook, Instagram, and Airbnb use React Native.',
  },
]

export default function App() {
  return <Accordion sections={sections} onPress={key => console.log('Section pressed:', key)} />
}
```

## Advanced Usage

### Multiple Expansion

```tsx
<Accordion sections={sections} expandMultiple={true} onPress={key => console.log('Toggled section:', key)} />
```

### Custom Key Extractor

```tsx
<Accordion
  sections={sections}
  keyExtractor={(item, index) => `section-${item.id || index}`}
  expandMultiple={false}
/>
```

### Custom Styling

```tsx
import {StyleSheet} from 'react-native'
;<Accordion
  sections={sections}
  wrapperStyle={styles.wrapper}
  itemContainerStyle={styles.itemContainer}
  headerContainerStyle={styles.headerContainer}
  contentContainerStyle={styles.contentContainer}
  titleStyle={styles.title}
/>

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    borderRadius: 8,
  },
  headerContainer: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
```

### Custom Animation

```tsx
<Accordion
  sections={sections}
  openAnimation="easeInEaseOut"
  closeAnimation="easeInEaseOut"
  openDuration={300}
  closeDuration={250}
/>
```

### Custom Header Rendering

```tsx
;<Accordion
  sections={sections}
  renderHeader={(item, index, expanded, key) => (
    <View style={[styles.header, expanded && styles.headerExpanded]}>
      <Text style={styles.headerText}>{item.title}</Text>
      <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
    </View>
  )}
/>

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  headerExpanded: {
    backgroundColor: '#007AFF',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})
```

### Custom Content Rendering

```tsx
;<Accordion
  sections={sections}
  renderContent={(item, index, expanded, key) => (
    <View style={styles.content}>
      <Text style={styles.contentText}>{item.content}</Text>
      {item.image && <Image source={{uri: item.image}} style={styles.contentImage} />}
      {item.actions && (
        <View style={styles.actions}>
          {item.actions.map(action => (
            <Button key={action.id} onPress={action.onPress}>
              {action.label}
            </Button>
          ))}
        </View>
      )}
    </View>
  )}
/>

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: 'white',
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  contentImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
})
```

### Custom Section Title

```tsx
import {StyleSheet} from 'react-native'
;<Accordion
  sections={sections}
  renderSectionTitle={(item, index, expanded) => (
    <View style={styles.sectionTitleContainer}>
      <Icon name={item.icon} size={20} color="#007AFF" />
      <Text style={styles.sectionTitleText}>{item.title}</Text>
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
    </View>
  )}
/>

const styles = StyleSheet.create({
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  badge: {
    // Add your badge styles here
  },
  badgeText: {
    // Add your badge text styles here
  },
})
```

## API Reference

### AccordionProps

| Prop                    | Type                                        | Default            | Description                            |
| ----------------------- | ------------------------------------------- | ------------------ | -------------------------------------- |
| `sections`              | `Section[]`                                 | Required           | Array of section data                  |
| `keyExtractor`          | `(item: Section, index: number) => string`  | `index.toString()` | Function to extract unique keys        |
| `expandMultiple`        | `boolean`                                   | `false`            | Allow multiple sections to be expanded |
| `wrapperStyle`          | `StyleProp<ViewStyle>`                      | `undefined`        | Style for the accordion wrapper        |
| `onPress`               | `(key: string) => void`                     | `undefined`        | Callback when section is pressed       |
| `renderHeader`          | `(item, index, expanded, key) => ReactNode` | `undefined`        | Custom header renderer                 |
| `renderSectionTitle`    | `(item, index, expanded) => ReactNode`      | `undefined`        | Custom title renderer                  |
| `renderContent`         | `(item, index, expanded, key) => ReactNode` | `undefined`        | Custom content renderer                |
| `title`                 | `string`                                    | `undefined`        | Accordion title                        |
| `itemContainerStyle`    | `StyleProp<ViewStyle>`                      | `undefined`        | Style for each item container          |
| `titleStyle`            | `StyleProp<TextStyle>`                      | `undefined`        | Style for section titles               |
| `headerContainerStyle`  | `StyleProp<ViewStyle>`                      | `undefined`        | Style for header containers            |
| `contentContainerStyle` | `StyleProp<ViewStyle>`                      | `undefined`        | Style for content containers           |
| `openAnimation`         | `AnimationType`                             | `'easeInEaseOut'`  | Animation type for opening             |
| `closeAnimation`        | `AnimationType`                             | `'easeInEaseOut'`  | Animation type for closing             |
| `openDuration`          | `number`                                    | `300`              | Duration for open animation (ms)       |
| `closeDuration`         | `number`                                    | `300`              | Duration for close animation (ms)      |

### Section Type

```tsx
type Section = {
  [key: string]: string | number
  title: string
  content: string
  // Additional custom properties are supported
}
```

### Animation Types

```tsx
type AnimationType = 'easeInEaseOut' | 'linear' | 'easeIn' | 'easeOut'
```

## Layout Patterns

### FAQ Section

```tsx
import { StyleSheet } from 'react-native'

const faqData = [
  {
    title: 'How do I reset my password?',
    content: 'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.',
  },
  {
    title: 'Can I change my subscription plan?',
    content: 'Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes will be reflected in your next billing cycle.',
  },
  {
    title: 'Is my data secure?',
    content: 'We use industry-standard encryption and security measures to protect your data. All data is encrypted in transit and at rest.',
  },
]

<Accordion
  sections={faqData}
  itemContainerStyle={styles.faqItem}
  headerContainerStyle={styles.faqHeader}
  contentContainerStyle={styles.faqContent}
  titleStyle={styles.faqTitle}
/>

const styles = StyleSheet.create({
  faqItem: {
    // Add your FAQ item styles here
  },
  faqHeader: {
    // Add your FAQ header styles here
  },
  faqContent: {
    // Add your FAQ content styles here
  },
  faqTitle: {
    // Add your FAQ title styles here
  },
})
```

### Settings Menu

```tsx
import { StyleSheet } from 'react-native'

const settingsData = [
  {
    title: 'Account Settings',
    content: 'Manage your profile, email preferences, and account security.',
    icon: 'user',
  },
  {
    title: 'Privacy & Security',
    content: 'Control who can see your information and how it\'s used.',
    icon: 'shield',
  },
  {
    title: 'Notifications',
    content: 'Choose what notifications you want to receive and how.',
    icon: 'bell',
  },
]

<Accordion
  sections={settingsData}
  renderHeader={(item, index, expanded, key) => (
    <View style={styles.settingsHeader}>
      <Icon name={item.icon} size={24} color="#007AFF" />
      <Text style={styles.settingsTitle}>{item.title}</Text>
      <Icon
        name={expanded ? 'chevron-up' : 'chevron-down'}
        size={20}
        color="#666"
      />
    </View>
  )}
/>

const styles = StyleSheet.create({
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingsTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
})
```

### Product Information

```tsx
import { StyleSheet } from 'react-native'

const productSections = [
  {
    title: 'Description',
    content: 'This is a premium product with advanced features...',
  },
  {
    title: 'Specifications',
    content: 'Weight: 2.5kg\nDimensions: 30x20x15cm\nMaterial: Aluminum',
  },
  {
    title: 'Reviews (4.8)',
    content: '142 customer reviews with an average rating of 4.8 stars.',
  },
  {
    title: 'Shipping & Returns',
    content: 'Free shipping on orders over $50. 30-day return policy.',
  },
]

<Accordion
  sections={productSections}
  expandMultiple={true}
  itemContainerStyle={styles.productSection}
/>

const styles = StyleSheet.create({
  productSection: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
})
```

## Accessibility

### Screen Reader Support

```tsx
<Accordion
  sections={sections}
  renderHeader={(item, index, expanded, key) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${item.title} section`}
      accessibilityHint={`Tap to ${expanded ? 'collapse' : 'expand'} section`}
      accessibilityState={{expanded}}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  )}
/>
```

### Content Accessibility

```tsx
<Accordion
  sections={sections}
  renderContent={(item, index, expanded, key) => (
    <View accessibilityRole="text" accessibilityLabel={`Section content: ${item.content}`}>
      <Text>{item.content}</Text>
    </View>
  )}
/>
```

## Animation Customization

### Smooth Animations

```tsx
<Accordion
  sections={sections}
  openAnimation="easeInEaseOut"
  closeAnimation="easeInEaseOut"
  openDuration={400}
  closeDuration={300}
/>
```

### Fast Animations

```tsx
<Accordion
  sections={sections}
  openAnimation="easeOut"
  closeAnimation="easeIn"
  openDuration={200}
  closeDuration={150}
/>
```

## Common Use Cases

### Help Center

```tsx
import { StyleSheet } from 'react-native'

const helpSections = [
  {
    category: 'Getting Started',
    title: 'How to create an account',
    content: 'Step-by-step guide to creating your account...',
  },
  {
    category: 'Billing',
    title: 'Understanding your invoice',
    content: 'Detailed explanation of billing components...',
  },
]

<Accordion
  sections={helpSections}
  keyExtractor={(item, index) => `help-${index}`}
  renderSectionTitle={(item) => (
    <View>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )}
/>

const styles = StyleSheet.create({
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})
```

### Feature Showcase

```tsx
import { StyleSheet } from 'react-native'

const features = [
  {
    title: 'Advanced Analytics',
    content: 'Get detailed insights into your app performance with our analytics dashboard.',
    icon: 'chart-line',
    premium: true,
  },
  {
    title: 'Real-time Collaboration',
    content: 'Work together with your team in real-time on projects and documents.',
    icon: 'users',
    premium: false,
  },
]

<Accordion
  sections={features}
  renderHeader={(item, index, expanded) => (
    <View style={styles.featureHeader}>
      <Icon name={item.icon} size={24} color="#007AFF" />
      <Text style={styles.featureTitle}>{item.title}</Text>
      {item.premium && <Badge text="Premium" />}
    </View>
  )}
/>

const styles = StyleSheet.create({
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  featureTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})
```

## Best Practices

1. **Content Organization** - Group related content logically
2. **Clear Titles** - Use descriptive, scannable section titles
3. **Performance** - Avoid complex content in collapsed sections
4. **Visual Feedback** - Provide clear indicators for expandable sections
5. **Animation Timing** - Keep animations quick but noticeable
6. **Accessibility** - Ensure proper accessibility labels and states

## Performance Considerations

- Use React.memo for sections with complex content
- Consider lazy loading for accordion content with heavy assets
- Optimize custom renderers to avoid unnecessary re-renders
- Use appropriate keys for efficient list updates

## Troubleshooting

### Common Issues

**Sections not expanding**

- Check if `onPress` callback is properly implemented
- Verify section data structure matches expected format
- Ensure `keyExtractor` returns unique values

**Animation not smooth**

- Check React Native Reanimated installation
- Verify animation duration values are reasonable
- Test on different devices for performance

**Custom content not rendering**

- Verify render function returns valid React elements
- Check prop names match component expectations
- Ensure custom components are properly imported
