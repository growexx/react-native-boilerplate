import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import ReactNativeBiometrics from 'react-native-biometrics'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'
import { getItem } from '../../utils/StorageService'
import { useIsFocused } from '@react-navigation/native'

const PinCodeScreen = ({ navigation }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [pinEnabled, setPinEnabled] = useState('false')
  const isFocused = useIsFocused()

  const checkPinEnabled = async () => {
    var isPinEnabled = await getItem('pinEnabled')
    setPinEnabled(isPinEnabled)
  }

  useEffect(() => {
    checkPinEnabled()
    setPin('')
    setError('')
  }, [isFocused])

  const handlePinInput = value => {
    if (/^\d+$/.test(value) && value.length <= 4) {
      setPin(value)
      setError('')
    } else {
      setError(
        LanguageUtils.getLangText(languagekeys.pinCodeScreen.invalidPinMessage)
      )
    }
  }

  const handleNumberPress = number => {
    if (pin.length < 4) {
      setPin(pin + number.toString())
    }
  }

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1))
    }
  }

  const handleBiometricAuthentication = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics()
      const { biometryType } = await rnBiometrics.isSensorAvailable()
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: LanguageUtils.getLangText(
          languagekeys.pinCodeScreen.biometricsPromptMessage
        ),
        cancelButtonText: LanguageUtils.getLangText(languagekeys.cancel)
      })

      if (success) {
        Alert.alert(
          LanguageUtils.getLangText(languagekeys.success),
          LanguageUtils.getLangText(languagekeys.pinCodeScreen.successMessage)
        )
        navigation.navigate('')
      } else {
        Alert.alert(
          LanguageUtils.getLangText(languagekeys.error),
          LanguageUtils.getLangText(languagekeys.pinCodeScreen.errorMessage)
        )
      }
    } catch (error) {
      console.error(error)
      Alert.alert(
        LanguageUtils.getLangText(languagekeys.error),
        error.toString()
      )
    }
  }

  const handleSubmit = () => {
    if (pin === '1234') {
      setPin('')
      setError('')
      Alert.alert(
        LanguageUtils.getLangText(languagekeys.success),
        LanguageUtils.getLangText(languagekeys.pinCodeScreen.correctPin)
      )
    } else {
      setError(
        LanguageUtils.getLangText(languagekeys.pinCodeScreen.incorrectPin)
      )
      setPin('')
    }
  }

  return (
    <View style={styles.container}>
      {pinEnabled ? (
        <Text style={styles.header}>
          {LanguageUtils.getLangText(languagekeys.pinCodeScreen.enterPinTitle)}
        </Text>
      ) : (
        <Text style={styles.header}>
          {LanguageUtils.getLangText(languagekeys.pinCodeScreen.enablePinText)}
        </Text>
      )}
      {pinEnabled ? (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry={true}
          value={pin}
          onChangeText={handlePinInput}
        />
      ) : null}
      {pinEnabled ? (
        error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null
      ) : null}
      {pinEnabled ? (
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            {[1, 2, 3].map(number => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number)}>
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[4, 5, 6].map(number => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number)}>
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[7, 8, 9].map(number => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number)}>
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={handleBiometricAuthentication}>
              <Icon name="fingerprint" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={handleBackspace}>
              <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {pinEnabled ? (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {LanguageUtils.getLangText(languagekeys.submit)}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width
  },
  header: {
    fontSize: 20,
    marginVertical: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    width: 200,
    textAlign: 'center'
  },
  error: {
    color: 'red',
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  numberButton: {
    backgroundColor: 'lightblue', // Lighter shade of blue
    borderRadius: 50, // Make it round
    width: 60, // Adjust the size
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  button: {
    backgroundColor: 'lightblue',
    marginTop: 20,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
})

export default PinCodeScreen
