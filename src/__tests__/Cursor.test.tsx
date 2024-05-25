import React from 'react'
import {Cursor} from '../components'
import {render} from '@testing-library/react-native'

describe('Cursor', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<Cursor />)
    expect(toJSON()).toMatchSnapshot()
  })
})
