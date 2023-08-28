import { Provider } from 'react-redux'
import { store } from '@stores'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import PaymentScreen from "../payment.screen"

describe('payment screen test', () => { 
    const Wrapper = (
        <Provider store={store}>
            <PaymentScreen/>
        </Provider>
    )
    test('should render payment button', () => { 
        const screen = render(Wrapper)
        expect(screen).toBeDefined()
     })
   
 })