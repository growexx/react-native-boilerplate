import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  useColorScheme
} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'
import { styles } from './style'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../stores/actions/auth.action'
import showToast from '../../components/toast'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'

const CELL_COUNT = 6
const RESEND_OTP_TIME_LIMIT = 30

const OtpScreen = ({ navigation, route }) => {
  const colorScheme = useColorScheme()
  const { mobile } = route.params
  const dispatch = useDispatch()
  let resendOtpTimerInterval: any

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  )

  //to start resent otp option
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval)
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval)
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1)
      }
    }, 1000)
  }

  //on click of resend button
  const onResendOtpButtonPress = () => {
    //clear input field
    setValue('')
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT)
    startResendOtpTimer()
    console.log('todo: Resend OTP')
  }

  //declarations for input field
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })
  //start timer on screen on launch
  useEffect(() => {
    startResendOtpTimer()
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval)
      }
    }
  }, [resendButtonDisabledTime])

  const styleForResendText =
    colorScheme === 'dark' ? styles.resendCodeTextDark : styles.resendCodeText

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text style={colorScheme === 'dark' ? styles.titleDark : styles.title}>
          {LanguageUtils.getLangText(languagekeys.verificationCode)}
        </Text>
        <Text
          style={
            colorScheme === 'dark' ? styles.subTitleDark : styles.subTitle
          }>
          Sent to {mobile}
        </Text>
        <CodeField
          testID="otp-input"
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text
                style={
                  colorScheme === 'dark' ? styles.cellTextDark : styles.cellText
                }>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {/* View for resend otp  */}
        {resendButtonDisabledTime > 0 ? (
          <Text style={styleForResendText}>
            {LanguageUtils.getLangText(languagekeys.resendCode)}{' '}
            {resendButtonDisabledTime} sec
          </Text>
        ) : (
          <TouchableOpacity
            testID="resend-otp"
            onPress={onResendOtpButtonPress}>
            <View style={styles.resendCodeContainer}>
              <Text style={styles.resendCode}>
                {LanguageUtils.getLangText(languagekeys.resendCode)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            testID="verify-otp-btn"
            style={styles.otp}
            onPress={() => {
              console.log('otp is ', value)
              if (value === '123456') {
                dispatch(loginSuccess({ number: mobile }))
              } else {
                showToast('Please enter valid code.')
              }
            }}>
            <Text style={styles.otp_text}>
              {LanguageUtils.getLangText(languagekeys.submit)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen
