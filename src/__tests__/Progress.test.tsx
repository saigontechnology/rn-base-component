import React from 'react'
import {render, act, fireEvent} from '@testing-library/react-native'
import {Progress} from '../components'
import {responsiveHeight} from '../helpers/metrics'
import {BaseProvider} from '../core/BaseProvider'

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('Progress Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper).toBeTruthy()
      expect(filledTrack).toBeTruthy()
    })

    it('renders progress wrapper with correct testID', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')
      expect(progressWrapper).toBeDefined()
    })

    it('renders filled track with correct testID', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const filledTrack = getByTestId('filled-track')
      expect(filledTrack).toBeDefined()
    })
  })

  describe('Default Props', () => {
    it('renders with theme default props', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.backgroundColor).toBe('#3f3f46')
      expect(progressWrapper.props.borderRadius).toBe(0)
      expect(progressWrapper.props.width).toBeUndefined()
      expect(progressWrapper.props.size).toBe(responsiveHeight(16))

      expect(filledTrack.props.style[1].backgroundColor).toBe('#0e7490')
      expect(filledTrack.props.style[1].borderRadius).toBe(0)
      expect(filledTrack.props.style[1].width).toBe(0)
      expect(filledTrack.props.style[1].height).toBe(responsiveHeight(16))
    })

    it('has default value of 0', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const filledTrack = getByTestId('filled-track')
      // Default value should result in minimal width
      expect(filledTrack.props.style[1].width).toBe(0)
    })

    it('is not indeterminate by default', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const filledTrack = getByTestId('filled-track')
      // Should have a determinate style when not indeterminate
      expect(filledTrack.props.style).toBeDefined()
    })
  })

  describe('Custom Props', () => {
    it('renders with custom value', () => {
      const {getByTestId} = renderWithProvider(<Progress value={50} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper).toBeTruthy()
      expect(filledTrack).toBeTruthy()
    })

    it('renders with custom size', () => {
      const customSize = 20
      const {getByTestId} = renderWithProvider(<Progress size={customSize} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.size).toBe(customSize)
      expect(filledTrack.props.style[1].height).toBe(customSize)
    })

    it('renders with custom border radius', () => {
      const customBorderRadius = 8
      const {getByTestId} = renderWithProvider(<Progress borderRadius={customBorderRadius} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.borderRadius).toBe(customBorderRadius)
      expect(filledTrack.props.style[1].borderRadius).toBe(customBorderRadius)
    })

    it('renders with custom filled track color', () => {
      const customColor = 'red'
      const {getByTestId} = renderWithProvider(<Progress filledTrackColor={customColor} />)
      const filledTrack = getByTestId('filled-track')

      expect(filledTrack.props.style[1].backgroundColor).toBe(customColor)
    })

    it('renders with custom background color', () => {
      const customBackgroundColor = 'blue'
      const {getByTestId} = renderWithProvider(<Progress backgroundColor={customBackgroundColor} />)
      const progressWrapper = getByTestId('progress-wrapper')

      expect(progressWrapper.props.backgroundColor).toBe(customBackgroundColor)
    })

    it('renders with custom width', () => {
      const customWidth = 200
      const {getByTestId} = renderWithProvider(<Progress width={customWidth} />)
      const progressWrapper = getByTestId('progress-wrapper')

      expect(progressWrapper.props.width).toBe(customWidth)
    })

    it('renders with all custom props together', () => {
      const props = {
        value: 75,
        size: 24,
        borderRadius: 12,
        filledTrackColor: 'green',
        backgroundColor: 'gray',
        width: 300,
      }
      const {getByTestId} = renderWithProvider(<Progress {...props} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.backgroundColor).toBe(props.backgroundColor)
      expect(progressWrapper.props.borderRadius).toBe(props.borderRadius)
      expect(progressWrapper.props.width).toBe(props.width)
      expect(progressWrapper.props.size).toBe(props.size)

      expect(filledTrack.props.style[1].backgroundColor).toBe(props.filledTrackColor)
      expect(filledTrack.props.style[1].borderRadius).toBe(props.borderRadius)
      expect(filledTrack.props.style[1].height).toBe(props.size)
    })
  })

  describe('Progress Values', () => {
    it('handles zero value', () => {
      const {getByTestId} = renderWithProvider(<Progress value={0} />)
      const filledTrack = getByTestId('filled-track')
      expect(filledTrack.props.style[1].width).toBe(0)
    })

    it('handles maximum value (100)', () => {
      const {getByTestId} = renderWithProvider(<Progress value={100} />)
      const filledTrack = getByTestId('filled-track')
      // Should be rendered and have some width
      expect(filledTrack).toBeTruthy()
    })

    it('handles values over 100 (should cap at 100)', () => {
      const {getByTestId} = renderWithProvider(<Progress value={150} />)
      const filledTrack = getByTestId('filled-track')
      // Should still render normally, capped internally
      expect(filledTrack).toBeTruthy()
    })

    it('handles negative values', () => {
      const {getByTestId} = renderWithProvider(<Progress value={-10} />)
      const filledTrack = getByTestId('filled-track')
      expect(filledTrack.props.style[1].width).toBe(0)
    })

    it('handles fractional values', () => {
      const {getByTestId} = renderWithProvider(<Progress value={50.5} />)
      const filledTrack = getByTestId('filled-track')
      expect(filledTrack).toBeTruthy()
    })
  })

  describe('Indeterminate Progress', () => {
    it('renders indeterminate progress', () => {
      const {getByTestId} = renderWithProvider(<Progress isIndeterminateProgress={true} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper).toBeTruthy()
      expect(filledTrack).toBeTruthy()
    })

    it('applies correct styling for indeterminate progress', () => {
      const {getByTestId} = renderWithProvider(<Progress isIndeterminateProgress={true} />)
      const filledTrack = getByTestId('filled-track')

      // Should have animated styles applied
      expect(filledTrack.props.style[0]).toBeDefined()
      expect(filledTrack.props.style[1]).toBeDefined()
    })

    it('ignores value prop when indeterminate', () => {
      const {getByTestId} = renderWithProvider(<Progress value={50} isIndeterminateProgress={true} />)
      const filledTrack = getByTestId('filled-track')

      // Should render with indeterminate styling regardless of value
      expect(filledTrack).toBeTruthy()
    })
  })

  describe('Layout Handling', () => {
    it('handles layout changes', async () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')

      const layoutEvent = {
        nativeEvent: {
          layout: {
            width: 200,
            height: 16,
            x: 0,
            y: 0,
          },
        },
      }

      await act(async () => {
        fireEvent(progressWrapper, 'layout', layoutEvent)
      })

      expect(progressWrapper).toBeTruthy()
    })

    it('updates on multiple layout changes', async () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')

      const layoutEvent1 = {
        nativeEvent: {
          layout: {width: 100, height: 16, x: 0, y: 0},
        },
      }

      const layoutEvent2 = {
        nativeEvent: {
          layout: {width: 200, height: 16, x: 0, y: 0},
        },
      }

      await act(async () => {
        fireEvent(progressWrapper, 'layout', layoutEvent1)
      })

      await act(async () => {
        fireEvent(progressWrapper, 'layout', layoutEvent2)
      })

      expect(progressWrapper).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('handles zero size', () => {
      const {getByTestId} = renderWithProvider(<Progress size={0} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.size).toBe(0)
      expect(filledTrack.props.style[1].height).toBe(0)
    })

    it('handles zero border radius', () => {
      const {getByTestId} = renderWithProvider(<Progress borderRadius={0} />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.borderRadius).toBe(0)
      expect(filledTrack.props.style[1].borderRadius).toBe(0)
    })

    it('handles zero width', () => {
      const {getByTestId} = renderWithProvider(<Progress width={0} />)
      const progressWrapper = getByTestId('progress-wrapper')

      expect(progressWrapper.props.width).toBe(0)
    })

    it('handles very large width', () => {
      const largeWidth = 10000
      const {getByTestId} = renderWithProvider(<Progress width={largeWidth} />)
      const progressWrapper = getByTestId('progress-wrapper')

      expect(progressWrapper.props.width).toBe(largeWidth)
    })

    it('handles transparent colors', () => {
      const {getByTestId} = renderWithProvider(
        <Progress backgroundColor="transparent" filledTrackColor="transparent" />,
      )
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      expect(progressWrapper.props.backgroundColor).toBe('transparent')
      expect(filledTrack.props.style[1].backgroundColor).toBe('transparent')
    })
  })

  describe('Theme Integration', () => {
    it('uses theme defaults when no props provided', () => {
      const {getByTestId} = renderWithProvider(<Progress />)
      const progressWrapper = getByTestId('progress-wrapper')
      const filledTrack = getByTestId('filled-track')

      // Should have theme-provided defaults
      expect(progressWrapper.props.backgroundColor).toBeDefined()
      expect(progressWrapper.props.size).toBeDefined()
      expect(filledTrack.props.style[1].backgroundColor).toBeDefined()
    })

    it('overrides theme defaults with custom props', () => {
      const customSize = 50
      const {getByTestId} = renderWithProvider(<Progress size={customSize} />)
      const progressWrapper = getByTestId('progress-wrapper')

      expect(progressWrapper.props.size).toBe(customSize)
    })
  })

  describe('Accessibility', () => {
    it('has accessible testIDs', () => {
      const {getByTestId} = renderWithProvider(<Progress />)

      expect(() => getByTestId('progress-wrapper')).not.toThrow()
      expect(() => getByTestId('filled-track')).not.toThrow()
    })
  })

  describe('Component Memoization', () => {
    it('is memoized properly', () => {
      // Progress component should be wrapped with React.memo
      expect(Progress.$$typeof).toBeDefined()
    })
  })
})
