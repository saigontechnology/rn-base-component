# Progress Component

A customizable and animated progress bar component for React Native applications that provides visual feedback for ongoing processes and loading states.

## Features

- 🎨 **Customizable Styling** - Configurable colors, size, and border radius
- ⚡ **Smooth Animations** - Fluid progress transitions with timing controls
- 🔄 **Indeterminate Mode** - Support for unknown progress duration
- 📱 **Responsive Design** - Adapts to different screen sizes
- 🎯 **Theme Integration** - Seamlessly integrates with the design system
- ♿ **Accessibility Ready** - Built-in accessibility features

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React from 'react'
import {Progress} from 'rn-base-component'

export default function App() {
  return <Progress value={75} />
}
```

## Advanced Usage

### Custom Styling

```tsx
<Progress
  value={50}
  size={8}
  borderRadius={4}
  filledTrackColor="#4CAF50"
  backgroundColor="#E0E0E0"
  width={300}
/>
```

### Indeterminate Progress

```tsx
<Progress isIndeterminateProgress={true} />
```

### Dynamic Progress

```tsx
const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress(prev => (prev >= 100 ? 0 : prev + 10))
  }, 500)
  return () => clearInterval(timer)
}, [])

return <Progress value={progress} />
```

## API Reference

### ProgressProps

| Prop                      | Type      | Default | Description                                            |
| ------------------------- | --------- | ------- | ------------------------------------------------------ |
| `value`                   | `number`  | `0`     | Current progress value (0-100)                         |
| `size`                    | `number`  | Theme   | Height of the progress bar (overrides theme)           |
| `borderRadius`            | `number`  | Theme   | Border radius of the progress bar (overrides theme)    |
| `filledTrackColor`        | `string`  | Theme   | Color of the filled portion (overrides theme)          |
| `backgroundColor`         | `string`  | Theme   | Background color of the progress bar (overrides theme) |
| `width`                   | `number`  | Theme   | Width of the progress bar (overrides theme)            |
| `isIndeterminateProgress` | `boolean` | `false` | Enable indeterminate progress animation                |

## Usage Patterns

### Loading States

```tsx
const LoadingExample = () => {
  const [loading, setLoading] = useState(true)

  return (
    <View>
      {loading && <Progress isIndeterminateProgress={true} filledTrackColor="#007AFF" size={4} />}
      <Text>Loading content...</Text>
    </View>
  )
}
```

### File Upload Progress

```tsx
const UploadProgress = ({uploadPercent}) => (
  <View style={styles.uploadContainer}>
    <Text>Uploading file... {uploadPercent}%</Text>
    <Progress
      value={uploadPercent}
      size={6}
      borderRadius={3}
      filledTrackColor="#4CAF50"
      backgroundColor="#F5F5F5"
    />
  </View>
)

const styles = StyleSheet.create({
  uploadContainer: {
    padding: 16,
  },
})
```

### Step Progress

```tsx
const StepProgress = ({currentStep, totalSteps}) => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <View style={styles.stepContainer}>
      <Text>
        Step {currentStep} of {totalSteps}
      </Text>
      <Progress value={progress} size={8} borderRadius={4} filledTrackColor="#007AFF" />
    </View>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
```

### Health/Fitness Progress

```tsx
const FitnessProgress = ({calories, target}) => {
  const progress = Math.min((calories / target) * 100, 100)
  const isComplete = progress >= 100

  return (
    <View style={styles.fitnessCard}>
      <Text style={styles.title}>Daily Calories</Text>
      <Text style={styles.stats}>
        {calories} / {target} kcal
      </Text>
      <Progress
        value={progress}
        size={12}
        borderRadius={6}
        filledTrackColor={isComplete ? '#4CAF50' : '#FF9800'}
        backgroundColor="#E8F5E8"
      />
      {isComplete && <Text style={styles.complete}>Goal reached! 🎉</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  fitnessCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stats: {
    color: '#666',
    marginVertical: 8,
  },
  complete: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 8,
  },
})
```

## Theme Integration

The Progress component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    Progress: {
      size: 6, // Custom height
      borderRadius: 3, // Custom border radius
      filledTrackColor: '#4CAF50', // Custom fill color
      backgroundColor: '#E0E0E0', // Custom background color
      width: undefined, // Full width by default
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<Progress value={75} />

// Override specific theme values
<Progress
  value={75}
  size={10}
  filledTrackColor="#FF5722"
  borderRadius={5}
/>
```

### Default Theme Values

```tsx
// Default Progress theme configuration
ProgressTheme: {
  size: 16,                    // metrics.small
  borderRadius: 0,             // No border radius by default
  filledTrackColor: '#0e7490', // base.colors.primary
  backgroundColor: '#3f3f46',  // base.colors.gray
  width: undefined,            // Full width
}
```

## Styling Guidelines

### Size Recommendations

- **Thin Progress**: 2-4px - Subtle progress indicators
- **Standard Progress**: 6-8px - General purpose progress bars
- **Prominent Progress**: 10-16px - Important loading states
- **Large Progress**: 20px+ - Hero progress indicators

### Color Guidelines

```tsx
// Success states
<Progress filledTrackColor="#4CAF50" backgroundColor="#E8F5E8" />

// Warning states
<Progress filledTrackColor="#FF9800" backgroundColor="#FFF3E0" />

// Error states
<Progress filledTrackColor="#F44336" backgroundColor="#FFEBEE" />

// Brand colors
<Progress filledTrackColor="#007AFF" backgroundColor="#E3F2FD" />
```

## Accessibility

### Screen Reader Support

```tsx
<Progress
  value={75}
  accessibilityLabel="Loading progress"
  accessibilityValue={{text: '75 percent complete'}}
  accessibilityRole="progressbar"
/>
```

### Progress Announcements

```tsx
const [progress, setProgress] = useState(0)

useEffect(() => {
  // Announce progress at key milestones
  if (progress === 25 || progress === 50 || progress === 75 || progress === 100) {
    AccessibilityInfo.announceForAccessibility(`${progress} percent complete`)
  }
}, [progress])

return <Progress value={progress} />
```

## Performance Considerations

- Progress animations use `react-native-reanimated` for optimal performance
- Indeterminate progress runs on the UI thread for smooth animations
- Consider debouncing rapid progress updates to avoid excessive re-renders

## Best Practices

1. **Clear Context** - Always provide context about what is progressing
2. **Appropriate Duration** - Match animation speed to perceived loading time
3. **Consistent Styling** - Use consistent progress bar styles across the app
4. **Accessibility** - Provide meaningful accessibility labels and announcements
5. **Visual Hierarchy** - Ensure progress bars don't compete with important content
6. **Completion Feedback** - Provide clear indication when progress is complete

## Common Use Cases

### Download Progress

```tsx
const DownloadProgress = ({downloadProgress, fileName}) => (
  <View style={styles.downloadItem}>
    <Text numberOfLines={1}>{fileName}</Text>
    <Progress value={downloadProgress} size={4} borderRadius={2} filledTrackColor="#007AFF" />
    <Text style={styles.progressText}>{downloadProgress}%</Text>
  </View>
)

const styles = StyleSheet.create({
  downloadItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
})
```

### Form Completion

```tsx
const FormProgress = ({completedFields, totalFields}) => {
  const progress = (completedFields / totalFields) * 100

  return (
    <View style={styles.formHeader}>
      <Text>Form Progress</Text>
      <Progress value={progress} size={6} borderRadius={3} filledTrackColor="#4CAF50" />
      <Text style={styles.fieldCount}>
        {completedFields} of {totalFields} fields completed
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  formHeader: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  fieldCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
})
```

## Troubleshooting

### Common Issues

**Progress not animating**

- Ensure you're using a compatible React Native version with `react-native-reanimated`
- Check that the value prop is changing appropriately
- Verify animation permissions on the device

**Progress bar not visible**

- Check container dimensions and ensure adequate width/height
- Verify color contrast between filled and background colors
- Ensure the progress bar isn't hidden behind other elements

**Performance issues**

- Avoid updating progress too frequently (consider throttling updates)
- Use `isIndeterminateProgress` for unknown duration tasks
- Check for memory leaks in progress update timers
