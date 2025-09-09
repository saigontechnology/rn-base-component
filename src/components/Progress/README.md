# Progress Component

A flexible and animated progress bar component for React Native applications with support for both determinate and indeterminate progress states.

## Features

- 📊 **Determinate Progress** - Show specific progress values (0-100%)
- 🔄 **Indeterminate Progress** - Animated loading indicator for unknown durations
- 🎨 **Customizable Styling** - Full control over colors, dimensions, and border radius
- ⚡ **Smooth Animations** - Built with React Native Reanimated for optimal performance
- 📱 **Responsive Design** - Adapts to different screen sizes and orientations
- 🎯 **TypeScript Ready** - Full type safety and IntelliSense support

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

### Determinate Progress

```tsx
import React from 'react'
import {Progress} from 'rn-base-component'

export default function App() {
  return <Progress value={65} />
}
```

### Indeterminate Progress

```tsx
import {Progress} from 'rn-base-component'
;<Progress isIndeterminateProgress />
```

## Advanced Usage

### Custom Styling

```tsx
<Progress
  value={80}
  size={8}
  borderRadius={4}
  filledTrackColor="#4CAF50"
  backgroundColor="#E0E0E0"
  width={300}
/>
```

### Dynamic Progress

```tsx
import React, {useState, useEffect} from 'react'
import {Progress} from 'rn-base-component'

export default function ProgressExample() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0
        return prev + 10
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <Progress
      value={progress}
      filledTrackColor="#FF9800"
      backgroundColor="#F5F5F5"
      style={styles.progressBar}
    />
  )
}

const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: 16,
  },
})
```

### Loading Indicator

```tsx
<Progress
  isIndeterminateProgress
  size={4}
  filledTrackColor="#2196F3"
  backgroundColor="#E3F2FD"
  borderRadius={2}
/>
```

### File Upload Progress

```tsx
import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {Progress} from 'rn-base-component'

export default function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)

  return (
    <View style={styles.uploadContainer}>
      <Text style={styles.uploadText}>Upload Progress: {uploadProgress}%</Text>
      <Progress
        value={uploadProgress}
        size={6}
        filledTrackColor="#4CAF50"
        backgroundColor="#E8F5E8"
        borderRadius={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    padding: 16,
  },
  uploadText: {
    fontSize: 14,
    marginBottom: 8,
  },
})
```

## API Reference

### IProgressProps

| Prop                      | Type      | Default                | Description                                               |
| ------------------------- | --------- | ---------------------- | --------------------------------------------------------- |
| `value`                   | `number`  | `0`                    | Current progress value (0-100)                            |
| `size`                    | `number`  | `16`                   | Height of the progress bar                                |
| `borderRadius`            | `number`  | `0`                    | Border radius of the progress bar                         |
| `filledTrackColor`        | `string`  | `theme.colors.primary` | Color of the filled portion                               |
| `backgroundColor`         | `string`  | `theme.colors.gray`    | Background color of the progress bar                      |
| `width`                   | `number`  | `undefined`            | Custom width (uses full container width if not specified) |
| `isIndeterminateProgress` | `boolean` | `false`                | Enable indeterminate (loading) animation                  |

## Animation Details

### Determinate Animation

- **Duration**: 500ms
- **Easing**: Linear
- **Behavior**: Smoothly animates to the target value

### Indeterminate Animation

- **Duration**: 2000ms (2 seconds per cycle)
- **Easing**: Linear
- **Behavior**: Continuous sliding animation with scale effects

## Styling Guidelines

### Size Recommendations

- **Thin Progress**: 2-4px for subtle progress indicators
- **Standard Progress**: 6-8px for general use cases
- **Thick Progress**: 12-16px for prominent progress displays

### Color Guidelines

- **Success**: Green tones (#4CAF50, #8BC34A)
- **Warning**: Orange/Yellow tones (#FF9800, #FFC107)
- **Error**: Red tones (#F44336, #E57373)
- **Info**: Blue tones (#2196F3, #03A9F4)

### Border Radius

- Use `borderRadius` equal to half the `size` for fully rounded progress bars
- Use smaller values for slightly rounded corners
- Use 0 for sharp rectangular progress bars

## Use Cases

### Form Validation Progress

```tsx
<Progress
  value={validationScore}
  filledTrackColor={validationScore > 80 ? '#4CAF50' : '#FF9800'}
  size={4}
  borderRadius={2}
/>
```

### Download Progress

```tsx
<Progress
  value={downloadPercentage}
  filledTrackColor="#2196F3"
  backgroundColor="#E3F2FD"
  size={8}
  borderRadius={4}
  width={250}
/>
```

### Loading States

```tsx
// When loading data
<Progress isIndeterminateProgress filledTrackColor="#9C27B0" size={3} borderRadius={1.5} />
```

### Multi-step Forms

```tsx
<Progress
  value={(currentStep / totalSteps) * 100}
  filledTrackColor="#673AB7"
  backgroundColor="#EDE7F6"
  size={6}
  borderRadius={3}
/>
```

## Theme Integration

The Progress component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  colors: {
    primary: '#007AFF', // Default filledTrackColor
    gray: '#E0E0E0', // Default backgroundColor
  },
  spacing: {
    small: 16, // Used for default size
  },
}
```

## Performance Considerations

- Uses React Native Reanimated for optimal animation performance
- Animations run on the UI thread
- Minimal re-renders during progress updates
- Efficient memory usage for indeterminate animations

## Best Practices

1. **Value Range** - Keep progress values between 0 and 100
2. **Accessibility** - Consider adding progress announcements for screen readers
3. **Visual Feedback** - Use appropriate colors to indicate progress states
4. **Loading States** - Use indeterminate progress for unknown durations
5. **Responsive Design** - Test on different screen sizes
6. **Animation Duration** - Default durations work well, avoid very fast animations

## Troubleshooting

### Common Issues

**Progress not animating**

- Ensure React Native Reanimated is properly installed
- Check if the component is receiving value updates

**Indeterminate animation not showing**

- Verify `isIndeterminateProgress` is set to `true`
- Check if the component has sufficient width for animation

**Styling not applying**

- Ensure style props are passed correctly
- Check theme configuration if using theme colors

**Performance issues**

- Avoid updating progress values too frequently (>60fps)
- Use React.memo for parent components if needed
