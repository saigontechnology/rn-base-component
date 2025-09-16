import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Text} from 'react-native'
import {Accordion, AccordionItem} from '../components'
import {BaseProvider} from '../core/BaseProvider'

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

// Mock data for testing
const sections = [
  {title: 'Section 1', content: 'Content 1'},
  {title: 'Section 2', content: 'Content 2'},
  {title: 'Section 3', content: 'Content 3'},
]

describe('Accordion', () => {
  test('renders correctly', () => {
    const {getByText} = renderWithProvider(<Accordion sections={sections} />)

    expect(getByText('Section 1')).toBeTruthy()
    expect(getByText('Section 2')).toBeTruthy()
    expect(getByText('Section 3')).toBeTruthy()
  })

  test('expands and collapses sections', () => {
    const {getByText} = renderWithProvider(<Accordion sections={sections} />)

    fireEvent.press(getByText('Section 1'))
    expect(getByText('Content 1')).toBeTruthy()

    fireEvent.press(getByText('Section 1'))
    expect(() => getByText('Content 1')).toThrowError()
  })

  test('should update the array state correctly when expandMultiple is false', () => {
    const {getByText, queryByText} = renderWithProvider(
      <Accordion sections={sections} expandMultiple={false} />,
    )

    const accordionItem1 = getByText('Section 1')

    fireEvent.press(accordionItem1)

    const accordionItem1Content = queryByText('Content 1')
    expect(accordionItem1Content).toBeTruthy()

    fireEvent.press(accordionItem1)

    expect(queryByText('Content 1')).toBeNull()
  })

  test('should render custom content when expanded', () => {
    const item = {title: 'Accordion Item', content: 'Custom Content'}
    const renderContentMock = jest.fn(() => <Text>Custom Content</Text>)
    const {getByText} = renderWithProvider(
      <AccordionItem
        onPress={() => null}
        title={item.title}
        item={item}
        expanded={true}
        index={0}
        keyExtractorItem="1"
        renderContent={renderContentMock}
      />,
    )

    expect(renderContentMock).toHaveBeenCalledWith(item, 0, true, '1')
    expect(getByText('Custom Content')).toBeTruthy()
  })

  test('should render custom section title when provided', () => {
    const item = {title: 'Accordion Item', content: 'Custom Content'}
    const renderSectionTitleMock = jest.fn(() => <Text>Custom Section Title</Text>)
    const {getByText} = renderWithProvider(
      <AccordionItem
        onPress={() => null}
        title={item.title}
        item={item}
        expanded={true}
        index={0}
        keyExtractorItem="1"
        renderSectionTitle={renderSectionTitleMock}
      />,
    )

    expect(renderSectionTitleMock).toHaveBeenCalledWith(item, 0, true)
    expect(getByText('Custom Section Title')).toBeTruthy()
  })

  test('should have testID on accordion item', () => {
    const item = {title: 'Accordion Item', content: 'Custom Content'}
    const {getByTestId} = renderWithProvider(
      <AccordionItem
        onPress={() => null}
        title={item.title}
        item={item}
        expanded={false}
        index={0}
        keyExtractorItem="1"
      />,
    )

    expect(getByTestId('accordion-item')).toBeTruthy()
  })
})

describe('Accordion Theme Integration', () => {
  test('should render with theme provider context', () => {
    const {getByText} = renderWithProvider(<Accordion sections={sections} />)

    // Verify the component renders without theme errors
    expect(getByText('Section 1')).toBeTruthy()
    expect(getByText('Section 2')).toBeTruthy()
    expect(getByText('Section 3')).toBeTruthy()
  })

  test('should apply theme styles to AccordionItem', () => {
    const item = {title: 'Test Item', content: 'Test Content'}
    const {getByText} = renderWithProvider(
      <AccordionItem
        onPress={() => null}
        title={item.title}
        item={item}
        expanded={false}
        index={0}
        keyExtractorItem="1"
      />,
    )

    // Verify the title renders with theme context
    const title = getByText('Test Item')
    expect(title).toBeTruthy()
  })

  test('should work with custom theme animation durations', () => {
    const item = {title: 'Test Item', content: 'Test Content'}
    const mockOnPress = jest.fn()

    const {getByTestId} = renderWithProvider(
      <AccordionItem
        onPress={mockOnPress}
        title={item.title}
        item={item}
        expanded={false}
        index={0}
        keyExtractorItem="1"
        openDuration={250}
        closeDuration={200}
      />,
    )

    const accordionItem = getByTestId('accordion-item')
    fireEvent.press(accordionItem)

    expect(mockOnPress).toHaveBeenCalledWith('1')
  })
})
