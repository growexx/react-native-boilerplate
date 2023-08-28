import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay'
import colors from '../../constants/colors'
import spacing from '../../constants/spacing'
import configs from '../../constants/configs'
import fonts from '../../constants/fonts'
import fontSize from '../../constants/fontSize'
import RazorPayComponent from './component/razor.pay'
import GooglePayComponent from './component/google.pay'

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <RazorPayComponent />
      <GooglePayComponent />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
 container:{
  justifyContent: 'center',
  padding: spacing*2
 }
})
