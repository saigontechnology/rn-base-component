# Slider Component

A comprehensive and highly customizable slider component for React Native applications with smooth animations, multiple variants, and extensive styling options.

## Features

- 🎨 **Multiple Variants** - Basic, Range, Fixed, and FixedRange slider types
- ⚡ **Smooth Animations** - Fluid interactions with react-native-reanimated
- 🎯 **Interactive Features** - Tap to seek, track points, and thumb dragging
- 🏷️ **Value Display** - Optional value labels with custom styling
- 🎨 **Theme Integration** - Seamlessly integrates with the design system
- 🔧 **Highly Customizable** - Extensive styling and behavior options
- ♿ **Accessibility Ready** - Full accessibility support
- 📱 **Touch Optimized** - Responsive touch interactions with proper hit areas

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

```tsx
import React, {useState} from 'react'
import {Slider} from 'rn-base-component'

export default function App() {
  const [value, setValue] = useState(50)

  return <Slider minimumValue={0} maximumValue={100} step={1} onValueChange={setValue} />
}
```

## Slider Variants

### Basic Slider

```tsx
const [volume, setVolume] = useState(75)

<Slider
  minimumValue={0}
  maximumValue={100}
  step={5}
  onValueChange={setVolume}
  alwaysShowValue={true}
/>
```

### Range Slider

```tsx
<Slider.Range
  minimumValue={0}
  maximumValue={1000}
  step={10}
  initialLowerBound={200}
  initialUpperBound={800}
  onValueChange={({lowerBound, upperBound}) => {
    console.log('Range:', lowerBound, 'to', upperBound)
  }}
/>
```

### Fixed Slider

```tsx
<Slider.Fixed minimumValue={0} maximumValue={10} step={1} fixedPosition={5} onValueChange={handleChange} />
```

### Fixed Range Slider

```tsx
<Slider.FixedRange
  minimumValue={0}
  maximumValue={100}
  step={5}
  fixedLowerBound={25}
  fixedUpperBound={75}
  onValueChange={handleRangeChange}
/>
```

## Advanced Usage

### Custom Styling

```tsx
;<Slider
  minimumValue={0}
  maximumValue={100}
  step={1}
  trackStyle={styles.customTrack}
  trackedStyle={styles.customTracked}
  thumbStyle={styles.customThumb}
  thumbSize={{width: 30, height: 30}}
  bgColorLabelView="#FF6B6B"
  labelStyle={styles.customLabel}
  onValueChange={setValue}
/>

const styles = StyleSheet.create({
  customTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  customTracked: {
    backgroundColor: '#FF6B6B',
  },
  customThumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FF6B6B',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  customLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})
```

### Volume Control

```tsx
const VolumeControl = () => {
  const [volume, setVolume] = useState(50)

  return (
    <View style={styles.volumeContainer}>
      <Text style={styles.volumeLabel}>Volume: {volume}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        onValueChange={setVolume}
        trackStyle={styles.volumeTrack}
        trackedStyle={styles.volumeTracked}
        thumbStyle={styles.volumeThumb}
        alwaysShowValue={false}
        showTrackPoint={false}
        tapToSeek={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  volumeContainer: {
    padding: 20,
  },
  volumeLabel: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  volumeTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  volumeTracked: {
    backgroundColor: '#007AFF',
  },
  volumeThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
```

### Price Range Filter

```tsx
const PriceRangeFilter = () => {
  const [priceRange, setPriceRange] = useState({min: 100, max: 500})

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Price Range</Text>
      <Text style={styles.rangeDisplay}>
        ${priceRange.min} - ${priceRange.max}
      </Text>

      <Slider.Range
        minimumValue={0}
        maximumValue={1000}
        step={10}
        initialLowerBound={priceRange.min}
        initialUpperBound={priceRange.max}
        onValueChange={({lowerBound, upperBound}) => setPriceRange({min: lowerBound, max: upperBound})}
        trackStyle={styles.priceTrack}
        trackedStyle={styles.priceTracked}
        thumbStyle={styles.priceThumb}
        showTrackPoint={true}
        tapToSeek={true}
      />
    </View>
  )
}
```

## API Reference

### SliderProps

| Prop               | Type                              | Default     | Description                                        |
| ------------------ | --------------------------------- | ----------- | -------------------------------------------------- |
| `minimumValue`     | `number`                          | Theme       | Minimum slider value (overrides theme)             |
| `maximumValue`     | `number`                          | Theme       | Maximum slider value (overrides theme)             |
| `step`             | `number`                          | Theme       | Step increment between values (overrides theme)    |
| `alwaysShowValue`  | `boolean`                         | Theme       | Always show value label (overrides theme)          |
| `showTrackPoint`   | `boolean`                         | Theme       | Show track points (overrides theme)                |
| `tapToSeek`        | `boolean`                         | Theme       | Enable tap to seek (overrides theme)               |
| `hitSlopPoint`     | `Insets`                          | Theme       | Hit area for track points (overrides theme)        |
| `trackStyle`       | `StyleProp<ViewStyle>`            | Theme       | Style for the track background (overrides theme)   |
| `trackedStyle`     | `StyleProp<ViewStyle>`            | Theme       | Style for the filled track (overrides theme)       |
| `trackPointStyle`  | `StyleProp<ViewStyle>`            | Theme       | Style for track points (overrides theme)           |
| `bgColorLabelView` | `string`                          | Theme       | Background color for value label (overrides theme) |
| `labelStyle`       | `StyleProp<TextStyle>`            | Theme       | Style for value label text (overrides theme)       |
| `thumbStyle`       | `StyleProp<ViewStyle>`            | Theme       | Style for the thumb (overrides theme)              |
| `thumbSize`        | `{width: number, height: number}` | Theme       | Size of the thumb (overrides theme)                |
| `thumbComponent`   | `React.ReactNode`                 | `undefined` | Custom thumb component                             |
| `onValueChange`    | `(value: number) => void`         | `undefined` | Callback when value changes                        |
| `sliderWidth`      | `number`                          | `undefined` | Fixed width for the slider                         |
| `style`            | `StyleProp<ViewStyle>`            | Theme       | Style for the slider container (overrides theme)   |

## Usage Patterns

### Audio Player Controls

```tsx
const AudioPlayer = () => {
  const [position, setPosition] = useState(30)
  const [duration] = useState(180) // 3 minutes

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <View style={styles.playerContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <Slider
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={setPosition}
        trackStyle={styles.audioTrack}
        trackedStyle={styles.audioTracked}
        thumbStyle={styles.audioThumb}
        alwaysShowValue={false}
        tapToSeek={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  audioTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  audioTracked: {
    backgroundColor: '#1DB954', // Spotify green
  },
  audioThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1DB954',
  },
})
```

### Brightness Control

```tsx
const BrightnessControl = () => {
  const [brightness, setBrightness] = useState(80)

  return (
    <View style={styles.brightnessContainer}>
      <View style={styles.brightnessHeader}>
        <Icon name="brightness-low" size={20} color="#666" />
        <Icon name="brightness-high" size={20} color="#666" />
      </View>

      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        onValueChange={setBrightness}
        trackStyle={styles.brightnessTrack}
        trackedStyle={[styles.brightnessTracked, {opacity: brightness / 100}]}
        thumbStyle={styles.brightnessThumb}
        alwaysShowValue={true}
        bgColorLabelView="rgba(0,0,0,0.8)"
        labelStyle={styles.brightnessLabel}
      />
    </View>
  )
}
```

### Temperature Range

```tsx
const TemperatureRange = () => {
  const [tempRange, setTempRange] = useState({min: 18, max: 24})

  return (
    <View style={styles.tempContainer}>
      <Text style={styles.tempTitle}>Temperature Range</Text>
      <Text style={styles.tempDisplay}>
        {tempRange.min}°C - {tempRange.max}°C
      </Text>

      <Slider.Range
        minimumValue={10}
        maximumValue={35}
        step={0.5}
        initialLowerBound={tempRange.min}
        initialUpperBound={tempRange.max}
        onValueChange={({lowerBound, upperBound}) => setTempRange({min: lowerBound, max: upperBound})}
        trackStyle={styles.tempTrack}
        trackedStyle={styles.tempTracked}
        thumbStyle={styles.tempThumb}
      />
    </View>
  )
}
```

## Theme Integration

The Slider component integrates with the theme system and can be customized via theme configuration:

### Theme Configuration

```tsx
import {extendTheme} from 'rn-base-component'

const customTheme = extendTheme({
  components: {
    Slider: {
      minimumValue: 0, // Default minimum value
      maximumValue: 100, // Default maximum value
      step: 1, // Default step increment
      alwaysShowValue: false, // Show value label
      showTrackPoint: false, // Show track markers
      tapToSeek: true, // Enable tap to seek
      hitSlopPoint: {
        // Touch area for points
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
      trackStyle: {
        // Track background style
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E0E0E0',
      },
      trackedStyle: {
        // Filled track style
        backgroundColor: '#007AFF',
      },
      trackPointStyle: {
        // Track point style
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#999',
      },
      bgColorLabelView: '#007AFF', // Label background
      labelStyle: {
        // Label text style
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
      },
      thumbStyle: {
        // Thumb style
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      thumbSize: {width: 20, height: 20}, // Thumb dimensions
      style: undefined, // Container style
    },
  },
})
```

### Using Theme Values

```tsx
// Uses theme defaults
<Slider onValueChange={setValue} />

// Override specific theme values
<Slider
  minimumValue={0}
  maximumValue={200}
  step={5}
  trackStyle={{height: 8, backgroundColor: '#F0F0F0'}}
  thumbStyle={{width: 30, height: 30}}
  onValueChange={setValue}
/>
```

### Default Theme Values

```tsx
// Default Slider theme configuration
SliderTheme: {
  minimumValue: 0,
  maximumValue: 100,
  step: 1,
  alwaysShowValue: false,
  showTrackPoint: false,
  tapToSeek: true,
  hitSlopPoint: {top: 10, bottom: 10, left: 10, right: 10},
  trackStyle: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#f1f5f9',      // base.colors.backgroundSecondary
  },
  trackedStyle: {
    backgroundColor: '#0e7490',      // base.colors.primary
  },
  trackPointStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3f3f46',     // base.colors.gray
  },
  bgColorLabelView: '#0e7490',      // base.colors.primary
  labelStyle: {
    color: '#FFFFFF',               // base.colors.white
    fontSize: 12,                   // base.fontSizes.sm
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',     // base.colors.white
    shadowColor: '#000000',         // base.colors.black
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbSize: {width: 20, height: 20},
}
```

## Accessibility

### Screen Reader Support

```tsx
<Slider
  minimumValue={0}
  maximumValue={100}
  step={1}
  accessibilityLabel="Volume control"
  accessibilityHint="Adjust the volume level"
  accessibilityRole="adjustable"
  accessibilityValue={{
    min: 0,
    max: 100,
    now: currentValue,
    text: `${currentValue} percent`,
  }}
  onValueChange={setCurrentValue}
/>
```

### Range Slider Accessibility

```tsx
<Slider.Range
  minimumValue={0}
  maximumValue={1000}
  accessibilityLabel="Price range filter"
  accessibilityHint="Set minimum and maximum price range"
  onValueChange={handleRangeChange}
/>
```

## Performance Considerations

- Slider animations use `react-native-reanimated` for optimal performance
- Track rendering is optimized for smooth interactions
- Consider debouncing `onValueChange` callbacks for expensive operations
- Use `step` values appropriately to balance precision and performance

## Best Practices

1. **Appropriate Steps** - Use reasonable step values for the data range
2. **Visual Feedback** - Provide clear visual indication of current values
3. **Touch Targets** - Ensure thumb and track points have adequate touch areas
4. **Value Display** - Show current values when precision is important
5. **Accessibility** - Provide meaningful accessibility labels and values
6. **Performance** - Debounce callbacks for expensive operations
7. **Consistent Styling** - Use theme values for consistent appearance

## Advanced Features

### Custom Thumb Component

```tsx
const CustomThumb = ({value}) => (
  <View style={styles.customThumbContainer}>
    <View style={styles.customThumbShape} />
    <Text style={styles.thumbValue}>{value}</Text>
  </View>
)

<Slider
  thumbComponent={<CustomThumb />}
  onValueChange={setValue}
/>
```

### Multiple Sliders Sync

```tsx
const SyncedSliders = () => {
  const [masterValue, setMasterValue] = useState(50)

  return (
    <View>
      <Text>Master Control</Text>
      <Slider minimumValue={0} maximumValue={100} onValueChange={setMasterValue} />

      <Text>Synced Control</Text>
      <Slider minimumValue={0} maximumValue={100} value={masterValue} onValueChange={setMasterValue} />
    </View>
  )
}
```

## Troubleshooting

### Common Issues

**Slider not responding to touch**

- Ensure proper hit areas are configured with `hitSlopPoint`
- Check if the slider has adequate dimensions
- Verify `onValueChange` callback is provided

**Animation performance issues**

- Ensure `react-native-reanimated` is properly installed and configured
- Consider reducing the frequency of `onValueChange` callbacks
- Use appropriate `step` values to reduce update frequency

**Styling not applying correctly**

- Check style object syntax and properties
- Ensure custom styles don't conflict with theme values
- Use theme configuration for consistent styling across the app

**Thumb positioning issues**

- Verify `thumbSize` matches the actual thumb style dimensions
- Check for layout conflicts with custom thumb components
- Ensure proper container dimensions for the slider
