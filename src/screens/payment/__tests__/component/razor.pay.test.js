import { Provider } from 'react-redux'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import RazorPayComponent from '../../component/razor.pay'
jest.mock('react-native-gesture-handler')
describe('should handle test case of razor pay component', () => {
    const Wrapper = (
        <Provider store={store}>
            <RazorPayComponent/>
        </Provider>
    )
        test('should click on button', () => {
          const {getByTestId } = render(Wrapper)
          fireEvent.press(getByTestId('razor-pay'))
        }
    )
})
