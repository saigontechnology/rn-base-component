import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import Button from '../components/Button/Button'
import { BaseProvider } from '../core'

describe('Button', () => {
    const onPressMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('renders correctly', () => {
        const { getByText } = render(
            <BaseProvider>
                <Button >
                    <Text>Button</Text>
                </Button>
            </BaseProvider>,
        )

        expect(getByText('Button')).toBeTruthy()
    })
    it('renders background correctly', () => {
        const { getByTestId } = render(
            <BaseProvider>
                <Button backgroundColor='#000000'>
                    <Text>Button</Text>
                </Button>
            </BaseProvider>,
        )
        const color = getByTestId('container')
        expect(color.props.style.backgroundColor).toEqual('#000000')
    })
    it('should call on press', () => {
        const { getByTestId } = render(
            <BaseProvider>
                <Button onPress={onPressMock}>
                    <Text>Button</Text>
                </Button>
            </BaseProvider>)

        const button = getByTestId('container')
        fireEvent.press(button)
        expect(onPressMock).toHaveBeenCalled()
    })
    it('should not call when disabled', () => {
        const { getByTestId } = render(
            <BaseProvider>
                <Button onPress={onPressMock} disabled={true}>
                    <Text>Button</Text>
                </Button>
            </BaseProvider>)
        const button = getByTestId('container')
        fireEvent.press(button)
        expect(onPressMock).not.toHaveBeenCalled()
    })
})
