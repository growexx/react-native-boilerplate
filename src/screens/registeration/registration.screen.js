import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Image
} from 'react-native'
import React, { useRef, useState } from 'react'
import { colors, fonts, fontSize, spacing } from '@constants';
import handleRegistration from '../../controllers/registrationController'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import ImagePicker from 'react-native-image-crop-picker'
import AuthInput from '../../components/auth.Input'

const RegisterScreen = ({ navigation }) => {
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const phoneInput = useRef()
  const [imageUri, setImageUri] = useState()
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            padding: spacing * 2
          }}>
          <View style={styles.view}>
            <Text style={styles.title}>Create account</Text>
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
                <Text style={styles.pickImageText}>Pick Image</Text>
              ) : (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: spacing * 3
            }}>
            <AuthInput
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <TextInput
              style={[styles.inputText, confirmPasswordFocus && styles.focused]}
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
              onChangeText={setconfirmPassword}
              value={confirmPassword}
              placeholder="Re-Enter your password"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              testID="confirm-password-input"
              placeholderTextColor={colors.darkText}
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
            <Text style={styles.signup_text}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="go-to-login"
            onPress={() => navigation.navigate('Login')}
            style={{
              padding: spacing
            }}>
            <Text style={styles.login}>Already have an account?</Text>
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
    fontSize: fontSize.xLarge,
    color: colors.primary,
    fontFamily: fonts.BOLD,
    marginVertical: spacing * 2
  },
  login: {
    fontFamily: fonts.BOLD,
    color: colors.text,
    textAlign: 'center',
    fontSize: fontSize.small
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
  },
  focused: {
    borderWidth: 3,
    borderColor: colors.primary,
    shadowOffset: { width: 4, height: spacing },
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: spacing
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
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.lightPrimary,
    borderRadius: spacing
  }
})
export default RegisterScreen
