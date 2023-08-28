import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Image,
  useColorScheme
} from 'react-native'
import React, { useRef, useState } from 'react'
import { colors, fonts, fontSize, spacing } from '@constants'
import ImagePicker from 'react-native-image-crop-picker'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import languagekeys from '../../localization/languagekeys'
import LanguageUtils from '../../localization/languageUtils'
import { isEmailValid } from '../../utils/validations'

const EditProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme()
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [imageUri, setImageUri] = useState()
  const phoneInput = useRef()
  return (
    <SafeAreaView
      style={{
        padding: spacing * 2
      }}>
      <ScrollView>
        <View style={styles.view}>
          <TouchableOpacity
            testID="image-picker"
            onPress={() => {
              ImagePicker.openPicker({
                freeStyleCropEnabled: true,
                cropping: true
              }).then(image => {
                setImageUri(image.path)
              })
            }}
            style={styles.imageContainerBox}>
            {imageUri == null ? (
              <Text style={styles.pickImagetext}>
                {LanguageUtils.getLangText(languagekeys.pickImage)}
              </Text>
            ) : (
              <Image source={{ uri: imageUri }} style={styles.imageUri} />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: spacing * 3
          }}>
          <TextInput
            style={[
              colorScheme === 'dark' ? styles.inputTextDark : styles.inputText
            ]}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            autoComplete="off"
            autoCorrect={false}
            testID="email-input"
          />
          <PhoneInput
            ref={phoneInput}
            placeholder="Enter phone number"
            value={mobile}
            onChangeText={text => {
              setMobile(text)
            }}
            defaultCode="IN"
            withDarkTheme
            containerStyle={styles.numberInput}
          />
        </View>
        <TouchableOpacity
          testID="editProfile-button"
          onPress={() => {
            const checkValid = phoneInput.current?.isValidNumber(mobile)
            if (checkValid) {
              if (isEmailValid(email)) {
                navigation.pop()
              } else {
                showToast('Please enter a valid email')
              }
            } else if (mobile === '') {
              showToast('All fields are required.')
            } else {
              showToast('Please Enter Valid Phone Number.')
            }
          }}
          style={styles.signup}>
          <Text style={styles.signup_text}>
            {LanguageUtils.getLangText(languagekeys.editProfile)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainerBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageUri: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover'
  },
  pickImagetext: {
    position: 'absolute',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  numberInput: {
    width: '100%',
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.lightPrimary,
    borderRadius: spacing
  },
  inputText: {
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.lightPrimary,
    borderRadius: spacing,
    marginVertical: spacing
  },
  inputTextDark: {
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    borderRadius: spacing,
    marginVertical: spacing,
    borderColor: colors.dark.text
  },
  signup_text: {
    fontFamily: fonts.BOLD,
    color: colors.light.onPrimary,
    textAlign: 'center',
    fontSize: fontSize.large
  },
  signup: {
    padding: spacing * 1.5,
    backgroundColor: colors.light.primary,
    borderRadius: spacing,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: spacing
    },
    shadowOpacity: 0.3,
    shadowRadius: spacing
  }
})