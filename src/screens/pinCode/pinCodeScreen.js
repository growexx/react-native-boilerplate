import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import PINCode from '@haskkor/react-native-pincode'
import styles from './styles'
import { getItem, removeItemValue } from '../../utils/StorageService'
import constants from '../../constants/constants'

const PinCodeScreen = ({ navigation }) => {
  const [pin, setPin] = useState()
  const [pinDetails, setPinDetails] = useState({
    pin: '',
    PINCodeStatus: 'choose',
    showPinLock: false
  })

  useEffect(() => {
    _getPinDetails()
    _showEnterPinLock()
  }, [])

  const _clearPin = async () => {
    await removeItemValue(constants.PIN)
    navigation.navigate('SetPinCode')
  }

  const _getPinDetails = async () => {
    const pinCode = await getItem(constants.PIN)
    setPin(pinCode)
  }

  const _showEnterPinLock = async () => {
    try {
      // const hasPin = await hasUserSetPinCode();
      const pinCode = await getItem(constants.PIN)
      if (pinCode) {
        setPin(pinCode)
        setPinDetails({
          pin: pinCode,
          PINCodeStatus: 'enter',
          showPinLock: true
        })
      } else {
        Alert.alert('Error', 'You have not set your pin.', [
          {
            title: 'Ok',
            onPress: () => {
              navigation.navigate('SetPinCode')
            }
          }
        ])
      }
    } catch (error) {}
  }

  const onPinEntered = pin => {
    const isValid = pin === '1234' // Replace '1234' with your actual pin
    if (isValid) {
      Alert.alert(null, 'Correct pin.', [
        {
          title: 'Ok',
          onPress: async () => {
            // do nothing
            // await resetPinCodeInternalStates();
            navigation.navigate(' ')
          }
        }
      ])
    } else {
      Alert.alert('Incorrect pin')
    }
  }

  return (
    <View style={styles.container}>
      {pin !== null ? (
        <View>
          <PINCode
            status={pinDetails.PINCodeStatus}
            finishProcess={onPinEntered}
            storedPin={pin}
            vibrationEnabled={false}
            touchIDSentence="Please touch your fingerprint or enter passcode"
          />
          <TouchableOpacity
            style={{ ...styles.clearButton, marginBottom: 30 }}
            onPress={_clearPin}>
            <Text style={styles.buttonText}>Clear PIN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SetPinCode')}>
            <Text style={styles.buttonText}>Create a PIN code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default PinCodeScreen
