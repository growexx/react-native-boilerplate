import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import spacing from '../../constants/spacing'
import RazorPayComponent from './component/razor.pay'
import GooglePayComponent from './component/google.pay'
import StripeButton from './component/stripe'
import { getItem } from '../../utils/StorageService'
import constants from '../../constants/constants'
import { useIsFocused } from '@react-navigation/native'

const PaymentScreen = () => {
  const isFocused = useIsFocused()

  const getAppLanguage = async () => {
    await getItem(constants.APP_LANGUAGE)
  }

  useEffect(() => {
    getAppLanguage()
  }, [isFocused])

  return (
    <View style={styles.container}>
      <RazorPayComponent />
      <GooglePayComponent />
      <StripeButton />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: spacing * 2
  }
})
