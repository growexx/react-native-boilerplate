import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, Platform } from 'react-native'
import Moment from 'moment'
import {
  StripeProvider,
  useApplePay,
  useStripe,
  ApplePayButton
} from '@stripe/stripe-react-native'
import configs from '../../../constants/configs'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'
import styles from './styles'

const StripeButton = props => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const { presentApplePay, confirmApplePayPayment } = useApplePay()
  const handlePayPress = async () => {
    const { error, paymentMethod } = await presentApplePay({
      cartItems: [
        {
          label: 'payment label',
          amount: '50', // amount as string
          type: 'Immediate',
          paymentType: 'Immediate'
        }
      ],
      country: 'US', // enter any country code supported by stripe,
      currency: 'USD' // enter any currency supported by stripe,
    })
    if (error) {
      Alert.alert(error.code, error.message)
    } else {
      const { error: confirmApplePayError } = await confirmApplePayPayment(
        configs.STRIPE_CLIENT_SECRET
      )
      confirmApplePayPayment(configs.STRIPE_CLIENT_SECRET)
      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message)
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully!')
      }
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      //TODO add code here if payment sheet opens successfully
    }
  }

  const initializePaymentSheet = async params => {
    //params would come from the API from BE.
    await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      // customerId: params.customer,
      // customerEphemeralKeySecret: params.ephemeralKey,
      // paymentIntentClientSecret: params.paymentIntent,

      customerId: 'customer',
      customerEphemeralKeySecret: 'ephemeralKey',
      paymentIntentClientSecret: 'paymentIntent',
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe'
      }
    })
  }

  const today = new Date()
  today.setMonth(today.getMonth() + 1)
  const priorDate = new Date(new Date().setDate(today.getDate() + 30))
  const formattedDate = Moment(priorDate).format('MMM D, YYYY')

  useEffect(() => {
    //getPaymentData is the method where payment intent API is called.
    // dispatch(getPaymentData(props.token));
  }, [])

  return (
    <StripeProvider
      merchantIdentifier="com.growexx.rnboilerplate"
      publishableKey={configs.STRIPE_PUBLISHABLE_KEY}>
      <TouchableOpacity
        testID="stripe-btn"
        style={styles.payButton}
        onPress={async () => {
          // const response = await getPaymentDetails(props.token);
          // await initializePaymentSheet(response.data);
          await initializePaymentSheet()
          await openPaymentSheet()
        }}>
        <Text style={styles.pay_text}>
          {LanguageUtils.getLangText(languagekeys.payWithStripe)}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <ApplePayButton
          testID="apple-pay"
          onPress={handlePayPress}
          type="plain"
          borderRadius={4}
          style={styles.applePayButton}
        />
      ) : null}
    </StripeProvider>
  )
}

export default StripeButton;
