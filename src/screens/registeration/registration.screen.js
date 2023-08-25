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
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/colors'
import Font from '../../constants/fonts'
import handleRegistration from '../../controllers/registrationController'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import ImagePicker from 'react-native-image-crop-picker'
import AuthInput from '../../components/auth.Input'
import languagekeys from '../../localization/languagekeys'
import LanguageUtils from '../../localization/languageUtils'

const RegisterScreen = ({ navigation }) => {
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const phoneInput = useRef()
  const [imageUri, setImageUri] = useState()
  const colorScheme = useColorScheme()
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            padding: Spacing * 2
          }}>
          <View style={styles.view}>
            <Text
              style={colorScheme === 'dark' ? styles.titleDark : styles.title}>
              {LanguageUtils.getLangText(languagekeys.createAccount)}
            </Text>
          </View>
          <View style={styles.container}>
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
              style={styles.imageContainer}>
              {imageUri == null ? (
                <Text style={styles.pickImageText}>
                  {LanguageUtils.getLangText(languagekeys.pickImage)}
                </Text>
              ) : (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3
            }}>
            <AuthInput
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <TextInput
              style={[
                colorScheme === 'dark'
                  ? styles.inputTextDark
                  : styles.inputText,
                confirmPasswordFocus && styles.focused
              ]}
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
              onChangeText={setconfirmPassword}
              value={confirmPassword}
              placeholder="Re-Enter your password"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              testID="confirm-password-input"
              placeholderTextColor={Colors.darkText}
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
              containerStyle={styles.phoneInput}
            />
          </View>

          <TouchableOpacity
            testID="signup-button"
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(mobile)
              if (checkValid) {
                handleRegistration(email, password, confirmPassword, navigation)
              } else if (mobile === '') {
                showToast('All fields are required.')
              } else {
                showToast('Please Enter Valid Phone Number.')
              }
            }}
            style={styles.signup}>
            <Text style={styles.signup_text}>
              {LanguageUtils.getLangText(languagekeys.signup)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="go-to-login"
            onPress={() => navigation.navigate('Login')}
            style={{
              padding: Spacing
            }}>
            <Text
              style={colorScheme === 'dark' ? styles.loginDark : styles.login}>
              {LanguageUtils.getLangText(languagekeys.alreadyHaveAccount)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },
  title: {
    fontSize: FontSize.xLarge,
    color: 'black',
    fontFamily: Font.BOLD,
    marginVertical: Spacing * 2
  },
  titleDark: {
    fontSize: FontSize.xLarge,
    color: Colors.dark.text,
    fontFamily: Font.BOLD,
    marginVertical: Spacing * 2
  },
  login: {
    fontFamily: Font.BOLD,
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small
  },
  loginDark: {
    fontFamily: Font.BOLD,
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small,
    color: Colors.dark.text
  },
  signup_text: {
    fontFamily: Font.BOLD,
    color: Colors.light.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large
  },
  signup: {
    padding: Spacing * 1.5,
    backgroundColor: Colors.light.primary,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing
  },
  focused: {
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing
  },
  inputText: {
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    // backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing
  },
  inputTextDark: {
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    borderRadius: Spacing,
    marginVertical: Spacing,
    borderColor: Colors.dark.text
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover'
  },
  pickImageText: {
    position: 'absolute',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  phoneInput: {
    width: '100%',
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing
  }
})
export default RegisterScreen
