import { StyleSheet, View } from 'react-native'
import React from 'react'
import spacing from '../../constants/spacing'
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
