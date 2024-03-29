import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'
import styles from './styles'
import { configs } from '@constants'

const RazorPayComponent = () => {
  return (
    <View>
      <TouchableOpacity
        testID="razor-pay"
        style={styles.payButton}
        onPress={() => {
          const options = {
            description: 'React Native Boilerplate',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: configs.RAZOR_PAY_API_KEY, // Your api key
            amount: '5000',
            name: 'Growexx Test',
            prefill: {
              email: 'info@growexx.com',
              contact: '9191919191',
              name: 'Razorpay Software'
            },
            theme: { color: '#F37254' }
          }
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              Alert.alert(`Success: ${data.razorpay_payment_id}`)
            })
            .catch(error => {
              // handle failure
              Alert.alert(`Error: ${error.code} | ${error.description}`)
            })
        }}>
        <Text style={styles.pay_text}>
          {LanguageUtils.getLangText(languagekeys.paywithRazorPay)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default RazorPayComponent
