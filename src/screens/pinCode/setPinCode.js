import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import PINCode from '@haskkor/react-native-pincode'

import styles from './styles' // You can define your styles in a separate file
import { saveItem } from '../../utils/StorageService'
import constants from '../../constants/constants'

const SetPinCode = ({ navigation }) => {
  const [pin, setPin] = useState()

  const _finishProcess = async pinCode => {
    // const hasPin = await hasUserSetPinCode();
    if (pinCode != null && pin === pinCode) {
      await saveItem(constants.PIN, pinCode)
      Alert.alert(null, 'You have successfully set your pin.', [
        {
          title: 'Ok',
          onPress: () => {
            // do nothing
            navigation.navigate('ReactNative Boilerplate')
          }
        }
      ])
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create a PIN code</Text>
        <PINCode
          status='choose'
          finishProcess={_finishProcess}
          storePin={setPin}
          vibrationEnabled={false}
        />
      </View>
    </>
  );
};

export default SetPinCode
