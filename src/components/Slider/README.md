# Slider Component

A comprehensive and highly customizable slider component for React Native with support for single values, ranges, and various interactive features built with React Native Gesture Handler and Reanimated.

## Features

- 🎯 **Multiple Variants** - Single, Range, Fixed, and FixedRange sliders
- 🎨 **Highly Customizable** - Extensive styling options for all elements
- ✋ **Gesture Support** - Smooth touch interactions with gesture handling
- 📊 **Track Points** - Optional visual indicators along the track
- 🎪 **Smooth Animations** - Built with React Native Reanimated for performance
- 🔧 **Flexible Configuration** - Support for steps, custom thumbs, and more
- ♿ **Accessibility Ready** - Screen reader support and proper semantics

## Installation

```bash
npm install rn-base-component react-native-gesture-handler react-native-reanimated
# or
yarn add rn-base-component react-native-gesture-handler react-native-reanimated
```

**Note**: Make sure to complete the installation of React Native Gesture Handler and Reanimated following their official documentation.

## Basic Usage

### Single Value Slider

```tsx
import React from 'react'
import {Slider} from 'rn-base-component'

export default function App() {
  return <Slider minimumValue={0} maximumValue={100} onValueChange={value => console.log('Value:', value)} />
}
```

### Range Slider

```tsx
<Slider.Range
  minimumValue={0}
  maximumValue={100}
  initialLowValue={20}
  initialHighValue={80}
  onValueChange={(low, high) => console.log('Range:', low, high)}
/>
```

### Fixed Value Slider

```tsx
<Slider.Fixed
  minimumValue={0}
  maximumValue={10}
  step={1}
  onValueChange={value => console.log('Fixed value:', value)}
/>
```

### Fixed Range Slider

```tsx
<Slider.FixedRange
  minimumValue={0}
  maximumValue={10}
  step={1}
  initialLowValue={2}
  initialHighValue={8}
  onValueChange={(low, high) => console.log('Fixed range:', low, high)}
/>
```

## Advanced Usage

### With Track Points

```tsx
<Slider
  minimumValue={0}
  maximumValue={100}
  step={10}
  showTrackPoint={true}
  sliderWidth={300}
  tapToSeek={true}
  onValueChange={handleValueChange}
/>
```

### Custom Styling

```tsx
;<Slider
  minimumValue={0}
  maximumValue={100}
  style={styles.customSlider}
  trackStyle={styles.customTrack}
  trackedStyle={styles.customTracked}
  thumbStyle={styles.customThumb}
  thumbSize={{width: 24, height: 24}}
  onValueChange={handleValueChange}
/>

const styles = StyleSheet.create({
  customSlider: {
    margin: 20,
  },
  customTrack: {
    backgroundColor: '#E0E0E0',
    height: 8,
    borderRadius: 4,
  },
  customTracked: {
    backgroundColor: '#007AFF',
  },
  customThumb: {
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: 'white',
  },
})
```

### With Custom Thumb

```tsx
const CustomThumb = () => (
  <View style={styles.customThumbContainer}>
    <Icon name="circle" size={20} color="#FF6B6B" />
  </View>
)

<Slider
  minimumValue={0}
  maximumValue={100}
  thumbComponent={<CustomThumb />}
  onValueChange={handleValueChange}
/>

const styles = StyleSheet.create({
  customThumbContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

### With Value Display

```tsx
;<Slider
  minimumValue={0}
  maximumValue={100}
  alwaysShowValue={true}
  bgColorLabelView="#333333"
  labelStyle={styles.valueLabel}
  onValueChange={handleValueChange}
/>

const styles = StyleSheet.create({
  valueLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
```

### Rounded Values

```tsx
<Slider minimumValue={0} maximumValue={1} step={0.01} roundToValue={2} onValueChange={handleValueChange} />
```

## API Reference

### ISliderCommonProps

| Prop               | Type                   | Default                   | Description                        |
| ------------------ | ---------------------- | ------------------------- | ---------------------------------- |
| `maximumValue`     | `number`               | `1`                       | Maximum value of the slider        |
| `minimumValue`     | `number`               | `0`                       | Minimum value of the slider        |
| `step`             | `number`               | `undefined`               | Step value for discrete increments |
| `alwaysShowValue`  | `boolean`              | `undefined`               | Always display the current value   |
| `showTrackPoint`   | `boolean`              | `undefined`               | Show points along the track        |
| `tapToSeek`        | `boolean`              | `undefined`               | Allow tapping track points to seek |
| `hitSlopPoint`     | `Insets \| number`     | `hitSlop`                 | Touch area for track points        |
| `style`            | `StyleProp<ViewStyle>` | `undefined`               | Style for the slider container     |
| `trackStyle`       | `StyleProp<ViewStyle>` | `undefined`               | Style for the track                |
| `trackedStyle`     | `StyleProp<ViewStyle>` | `undefined`               | Style for the filled track         |
| `trackPointStyle`  | `StyleProp<ViewStyle>` | `undefined`               | Style for track points             |
| `bgColorLabelView` | `string`               | `undefined`               | Background color for value label   |
| `labelStyle`       | `StyleProp<TextStyle>` | `undefined`               | Style for value label text         |
| `thumbStyle`       | `StyleProp<ViewStyle>` | `undefined`               | Style for the thumb                |
| `thumbSize`        | `Size`                 | `{width: 16, height: 16}` | Size of the thumb                  |

### Slider-specific Props

| Prop             | Type                      | Description                          |
| ---------------- | ------------------------- | ------------------------------------ |
| `roundToValue`   | `number`                  | Number of decimal places to round to |
| `thumbComponent` | `React.ReactElement`      | Custom thumb component               |
| `onValueChange`  | `(value: number) => void` | Value change callback                |

### SliderRange Props

| Prop               | Type                                  | Description                  |
| ------------------ | ------------------------------------- | ---------------------------- |
| `initialLowValue`  | `number`                              | Initial low value for range  |
| `initialHighValue` | `number`                              | Initial high value for range |
| `onValueChange`    | `(low: number, high: number) => void` | Range change callback        |

### Size Type

```tsx
type Size = {
  width: number
  height: number
}
```

## Slider Variants

### Single Value Slider

Standard slider for selecting a single value within a range.

```tsx
<Slider minimumValue={0} maximumValue={100} step={5} onValueChange={value => setVolume(value)} />
```

### Range Slider

Allows selection of a range with two thumbs for low and high values.

```tsx
<Slider.Range
  minimumValue={0}
  maximumValue={1000}
  initialLowValue={200}
  initialHighValue={800}
  onValueChange={(low, high) => setPriceRange({min: low, max: high})}
/>
```

### Fixed Slider

Slider with discrete step values and visual track points.

```tsx
<Slider.Fixed
  minimumValue={1}
  maximumValue={5}
  step={1}
  showTrackPoint={true}
  sliderWidth={250}
  onValueChange={value => setRating(value)}
/>
```

### Fixed Range Slider

Range slider with discrete steps and track points.

```tsx
<Slider.FixedRange
  minimumValue={0}
  maximumValue={24}
  step={1}
  initialLowValue={9}
  initialHighValue={17}
  showTrackPoint={true}
  sliderWidth={300}
  onValueChange={(start, end) => setTimeRange({start, end})}
/>
```

## Common Use Cases

### Volume Control

```tsx
const [volume, setVolume] = useState(50)

<View style={styles.volumeContainer}>
  <Icon name="volume-down" size={20} color="#666" />
  <Slider
    style={styles.volumeSlider}
    minimumValue={0}
    maximumValue={100}
    step={1}
    onValueChange={setVolume}
    trackStyle={styles.volumeTrack}
    trackedStyle={styles.volumeTracked}
    thumbSize={{width: 20, height: 20}}
  />
  <Icon name="volume-up" size={20} color="#666" />
</View>

const styles = StyleSheet.create({
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 16,
  },
  volumeTrack: {
    backgroundColor: '#E0E0E0',
    height: 4,
  },
  volumeTracked: {
    backgroundColor: '#007AFF',
  },
})
```

### Price Range Filter

```tsx
const [priceRange, setPriceRange] = useState({min: 50, max: 500})

<View style={styles.priceFilter}>
  <Text style={styles.label}>Price Range</Text>
  <Slider.Range
    minimumValue={0}
    maximumValue={1000}
    initialLowValue={priceRange.min}
    initialHighValue={priceRange.max}
    onValueChange={(low, high) => setPriceRange({min: low, max: high})}
    style={styles.priceSlider}
  />
  <View style={styles.priceLabels}>
    <Text>${priceRange.min}</Text>
    <Text>${priceRange.max}</Text>
  </View>
</View>

const styles = StyleSheet.create({
  priceFilter: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceSlider: {
    marginVertical: 16,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
```

### Rating Selector

```tsx
const [rating, setRating] = useState(3)

<View style={styles.ratingContainer}>
  <Text style={styles.ratingLabel}>Rate this product</Text>
  <Slider.Fixed
    minimumValue={1}
    maximumValue={5}
    step={1}
    showTrackPoint={true}
    tapToSeek={true}
    sliderWidth={200}
    onValueChange={setRating}
    trackPointStyle={styles.ratingPoint}
  />
  <Text style={styles.ratingValue}>{rating} stars</Text>
</View>

const styles = StyleSheet.create({
  ratingContainer: {
    alignItems: 'center',
    padding: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  ratingPoint: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  ratingValue: {
    fontSize: 14,
    marginTop: 12,
  },
})
```

### Time Range Picker

```tsx
const [timeRange, setTimeRange] = useState({start: 9, end: 17})

<View style={styles.timeContainer}>
  <Text style={styles.timeLabel}>Working Hours</Text>
  <Slider.FixedRange
    minimumValue={0}
    maximumValue={23}
    step={1}
    initialLowValue={timeRange.start}
    initialHighValue={timeRange.end}
    showTrackPoint={true}
    sliderWidth={300}
    onValueChange={(start, end) => setTimeRange({start, end})}
  />
  <Text style={styles.timeDisplay}>
    {timeRange.start}:00 - {timeRange.end}:00
  </Text>
</View>

const styles = StyleSheet.create({
  timeContainer: {
    padding: 16,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  timeDisplay: {
    fontSize: 14,
    marginTop: 12,
    color: '#666',
  },
})
```

### Brightness Control

```tsx
const [brightness, setBrightness] = useState(75)

<View style={styles.brightnessContainer}>
  <Icon name="brightness-low" size={20} color="#666" />
  <Slider
    style={styles.brightnessSlider}
    minimumValue={0}
    maximumValue={100}
    onValueChange={setBrightness}
    alwaysShowValue={false}
    trackStyle={styles.brightnessTrack}
    trackedStyle={styles.brightnessTracked}
    thumbStyle={styles.brightnessThumb}
  />
  <Icon name="brightness-high" size={20} color="#666" />
</View>

const styles = StyleSheet.create({
  brightnessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  brightnessSlider: {
    flex: 1,
    marginHorizontal: 12,
  },
  brightnessTrack: {
    backgroundColor: '#333',
    height: 6,
  },
  brightnessTracked: {
    backgroundColor: '#FFF',
  },
  brightnessThumb: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
  },
})
```

## Styling Guidelines

### Track Styling

```tsx
// Thin track
trackStyle={{
  backgroundColor: '#E0E0E0',
  height: 2,
}}

// Thick track
trackStyle={{
  backgroundColor: '#F0F0F0',
  height: 8,
  borderRadius: 4,
}}

// Rounded track
trackStyle={{
  backgroundColor: '#E5E5E5',
  height: 6,
  borderRadius: 3,
}}
```

### Thumb Styling

```tsx
// Circular thumb
thumbStyle={{
  backgroundColor: '#007AFF',
  borderRadius: 12,
}}

// Square thumb
thumbStyle={{
  backgroundColor: '#FF6B6B',
  borderRadius: 2,
}}

// Bordered thumb
thumbStyle={{
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#007AFF',
}}
```

### Track Points

```tsx
trackPointStyle={{
  backgroundColor: '#007AFF',
  borderRadius: 4,
  width: 8,
  height: 8,
}}
```

## Accessibility

### Screen Reader Support

```tsx
<Slider
  accessibilityLabel="Volume control"
  accessibilityHint="Adjust the volume level"
  accessibilityRole="adjustable"
  minimumValue={0}
  maximumValue={100}
  onValueChange={setVolume}
/>
```

### Range Slider Accessibility

```tsx
<Slider.Range
  accessibilityLabel="Price range filter"
  accessibilityHint="Set minimum and maximum price values"
  minimumValue={0}
  maximumValue={1000}
  onValueChange={setPriceRange}
/>
```

## Performance Optimization

### Debounced Updates

```tsx
import {useCallback} from 'react'
import {debounce} from 'lodash'

const debouncedUpdate = useCallback(
  debounce((value) => {
    // Expensive operation
    updateServerValue(value)
  }, 300),
  []
)

<Slider
  onValueChange={(value) => {
    setValue(value) // Immediate UI update
    debouncedUpdate(value) // Debounced server update
  }}
/>
```

### Memoized Components

```tsx
const SliderComponent = React.memo(({value, onValueChange}) => (
  <Slider minimumValue={0} maximumValue={100} onValueChange={onValueChange} />
))
```

## Theme Integration

The Slider component integrates with the theme system:

```tsx
// Theme configuration
const theme = {
  colors: {
    primary: '#007AFF', // Default tracked color
  },
}
```

## Best Practices

1. **Appropriate Ranges** - Use meaningful min/max values for your use case
2. **Step Values** - Choose step values that make sense for the data
3. **Visual Feedback** - Provide clear visual indicators for current values
4. **Touch Targets** - Ensure thumbs are large enough for easy interaction
5. **Performance** - Debounce expensive operations triggered by value changes
6. **Accessibility** - Provide proper accessibility labels and hints

## Troubleshooting

### Common Issues

**Slider not responding to touch**

- Ensure React Native Gesture Handler is properly installed and linked
- Check if the slider container has sufficient height
- Verify there are no overlapping gesture handlers

**Values not updating correctly**

- Check if `onValueChange` callback is properly implemented
- Verify min/max values are set correctly
- Ensure step values are appropriate for the range

**Performance issues**

- Avoid complex operations in `onValueChange` callback
- Use debouncing for expensive operations
- Consider memoizing slider components

**Track points not showing**

- Ensure `showTrackPoint` is true and `sliderWidth` is provided
- Check track point styling is visible
- Verify step value creates appropriate number of points

**Custom thumb not rendering**

- Verify `thumbComponent` is a valid React element
- Check if custom thumb has appropriate dimensions
- Ensure custom thumb doesn't interfere with gesture handling
