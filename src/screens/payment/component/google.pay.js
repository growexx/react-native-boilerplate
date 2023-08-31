import { View, Text, TouchableOpacity, Platform } from 'react-native'

import {
  GooglePay,
  RequestDataType,
  AllowedCardNetworkType,
  AllowedCardAuthMethodsType
} from 'react-native-google-pay'

import React, { useEffect } from 'react'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'
import styles from './styles'

const GooglePayComponent = () => {
  const allowedCardNetworks: AllowedCardNetworkType[] = ['VISA', 'MASTERCARD']
  const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = [
    'PAN_ONLY',
    'CRYPTOGRAM_3DS'
  ]
  const gatewayRequestData: RequestDataType = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        gateway: 'example',
        gatewayMerchantId: 'exampleGatewayMerchantId'
      },
      allowedCardNetworks,
      allowedCardAuthMethods
    },
    transaction: {
      totalPrice: '123',
      totalPriceStatus: 'FINAL',
      currencyCode: 'INR'
    },
    merchantName: 'Example Merchant'
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)
    }
  }, [])

  const payWithGooglePay = async (requestData: RequestDataType) => {
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          GooglePay.requestPayment(requestData)
            .then(handleSuccess)
            .catch(handleError)
        }
      }
    )
  }

  const handleSuccess = (token: string) => {
    // Send a token to your payment gateway
  }

  const handleError = (error: any) => {
    // Handle the error, and show message accordingly if user cancelled the request
  }

  return (
    <View>
      {Platform.OS === 'android' && (
        <TouchableOpacity
          testID="gpay-btn"
          style={styles.payButton}
          onPress={() => payWithGooglePay(gatewayRequestData)}>
          <Text style={styles.pay_text}>
            {LanguageUtils.getLangText(languagekeys.payWithGooglePay)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default GooglePayComponent
