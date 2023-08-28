import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert
} from 'react-native'

import {
  GooglePay,
  RequestDataType,
  AllowedCardNetworkType,
  AllowedCardAuthMethodsType
} from 'react-native-google-pay'

import React, { useEffect } from 'react'
import { colors, fontSize, fonts, spacing } from '@constants'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'

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
            .then(this.handleSuccess)
            .catch(this.handleError)
        }
      }
    )
  }

  handleSuccess = (token: string) => {
    // Send a token to your payment gateway
  }

  handleError = (error: any) => {
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

const styles = StyleSheet.create({
  payButton: {
    width: '100%',
    padding: spacing * 1.5,
    backgroundColor: colors.light.primary,
    marginVertical: spacing * 0.5,
    borderRadius: spacing,
    shadowColor: colors.light.primary,
    shadowOffset: {
      width: 0,
      height: spacing
    }
  },
  pay_text: {
    fontFamily: fonts.BOLD,
    color: colors.light.onPrimary,
    textAlign: 'center',
    fontSize: fontSize.large
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16
  }
})

export default GooglePayComponent
