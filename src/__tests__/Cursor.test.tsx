import React from 'react'
import {render} from '@testing-library/react-native'
import {Cursor} from '../components'
import {BaseProvider} from '../core/BaseProvider'

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('Cursor Component', () => {
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      const {toJSON} = renderWithProvider(<Cursor />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('renders cursor character correctly', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })

    it('renders as Animated.Text component', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
      // Should have animated styles applied
      expect(cursor.props.style).toBeDefined()
    })
  })

  describe('Custom Styling', () => {
    it('applies custom style', () => {
      const customStyle = {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold' as const,
      }
      const {getByText} = renderWithProvider(<Cursor style={customStyle} />)
      const cursor = getByText('|')

      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]))
    })

    it('applies multiple style properties', () => {
      const customStyle = {
        color: '#ff0000',
        fontSize: 24,
        lineHeight: 30,
        textAlign: 'center' as const,
      }
      const {getByText} = renderWithProvider(<Cursor style={customStyle} />)
      const cursor = getByText('|')

      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]))
    })

    it('applies array of styles', () => {
      const styleArray = [{color: 'blue'}, {fontSize: 18}, {fontWeight: 'bold' as const}]
      const {getByText} = renderWithProvider(<Cursor style={styleArray} />)
      const cursor = getByText('|')

      // Style array is passed as the second element in the style array
      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.arrayContaining(styleArray)]))
    })

    it('handles empty style object', () => {
      const {getByText} = renderWithProvider(<Cursor style={{}} />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })

    it('handles undefined style', () => {
      const {getByText} = renderWithProvider(<Cursor style={undefined} />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })
  })

  describe('Animation', () => {
    it('has animated style applied', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')

      // Should have animated opacity style
      expect(cursor.props.style).toBeDefined()
      expect(Array.isArray(cursor.props.style)).toBe(true)
    })

    it('maintains animation with custom style', () => {
      const customStyle = {color: 'red'}
      const {getByText} = renderWithProvider(<Cursor style={customStyle} />)
      const cursor = getByText('|')

      // Should have both animated and custom styles
      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]))
    })
  })

  describe('Text Properties', () => {
    it('displays pipe character', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor.props.children).toBe('|')
    })

    it('renders as text element', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })
  })

  describe('Component Interface', () => {
    it('accepts style prop of TextStyle type', () => {
      const textStyle = {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: '500' as const,
        fontStyle: 'italic' as const,
        letterSpacing: 1,
        lineHeight: 20,
        textAlign: 'left' as const,
        textDecorationLine: 'underline' as const,
        textTransform: 'uppercase' as const,
      }

      expect(() => {
        renderWithProvider(<Cursor style={textStyle} />)
      }).not.toThrow()
    })

    it('handles StyleProp array syntax', () => {
      const styles = [{color: 'red'}, {fontSize: 14}, {fontWeight: 'bold' as const}]

      expect(() => {
        renderWithProvider(<Cursor style={styles} />)
      }).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('renders without any props', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })

    it('handles null style gracefully', () => {
      const {getByText} = renderWithProvider(<Cursor style={null} />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })

    it('handles complex nested style arrays', () => {
      const complexStyle = [
        {color: 'red'},
        [{fontSize: 16}, {fontWeight: 'bold' as const}],
        null,
        {lineHeight: 20},
      ]

      const {getByText} = renderWithProvider(<Cursor style={complexStyle} />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })
  })

  describe('Theme Integration', () => {
    it('works with theme provider', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')
      expect(cursor).toBeTruthy()
    })

    it('combines with theme-aware styles', () => {
      const themeAwareStyle = {
        color: '#333333', // Could come from theme
        fontSize: 16, // Could come from theme
      }

      const {getByText} = renderWithProvider(<Cursor style={themeAwareStyle} />)
      const cursor = getByText('|')

      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.objectContaining(themeAwareStyle)]))
    })
  })

  describe('Accessibility', () => {
    it('maintains text accessibility', () => {
      const {getByText} = renderWithProvider(<Cursor />)
      const cursor = getByText('|')

      // Text should be accessible by content
      expect(cursor).toBeTruthy()
      expect(cursor.props.children).toBe('|')
    })

    it('works with accessibility-friendly styles', () => {
      const accessibleStyle = {
        fontSize: 18, // Larger font for accessibility
        color: '#000000', // High contrast color
      }

      const {getByText} = renderWithProvider(<Cursor style={accessibleStyle} />)
      const cursor = getByText('|')

      expect(cursor.props.style).toEqual(expect.arrayContaining([expect.objectContaining(accessibleStyle)]))
    })
  })

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = Date.now()
      renderWithProvider(<Cursor />)
      const endTime = Date.now()

      // Should render quickly (within reasonable time)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('handles multiple instances', () => {
      expect(() => {
        renderWithProvider(
          <>
            <Cursor />
            <Cursor style={{color: 'red'}} />
            <Cursor style={{fontSize: 20}} />
          </>,
        )
      }).not.toThrow()
    })
  })
})
