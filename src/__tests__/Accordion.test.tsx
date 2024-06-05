import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Text} from 'react-native'
import {Accordion, AccordionItem} from '../components'

// Mock data for testing
const sections = [
  {title: 'Section 1', content: 'Content 1'},
  {title: 'Section 2', content: 'Content 2'},
  {title: 'Section 3', content: 'Content 3'},
]

describe('Accordion', () => {
  test('renders correctly', () => {
    const {getByText} = render(<Accordion sections={sections} />)

    expect(getByText('Section 1')).toBeTruthy()
    expect(getByText('Section 2')).toBeTruthy()
    expect(getByText('Section 3')).toBeTruthy()
  })

  test('expands and collapses sections', () => {
    const {getByText} = render(<Accordion sections={sections} />)

    fireEvent.press(getByText('Section 1'))
    expect(getByText('Content 1')).toBeTruthy()

    fireEvent.press(getByText('Section 1'))
    expect(() => getByText('Content 1')).toThrowError()
  })

  test('should update the array state correctly when expandMultiple is false', () => {
    const {getByText, queryByText} = render(<Accordion sections={sections} expandMultiple={false} />)

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
    const {getByText} = render(
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
    const {getByText} = render(
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
})
