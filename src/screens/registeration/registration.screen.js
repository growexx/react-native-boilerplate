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
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/colors'
import Font from '../../constants/fonts'
import handleRegistration from '../../controllers/registrationController'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import ImagePicker from 'react-native-image-crop-picker'

const RegisterScreen = ({ navigation }) => {
  const [focused, setFocused] = useState(false)
  const [passWordFocus, setPassWordFocus] = useState(false)
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
            padding: Spacing * 2
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
              marginVertical: Spacing * 3
            }}>
            <TextInput
              style={[styles.inputText, focused && styles.focused]}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter e-mail address"
              autoComplete="email"
              autoCorrect={false}
              inputMode="email"
              keyboardType="email-address"
              testID="email-input"
              placeholderTextColor={Colors.darkText}
            />
            <TextInput
              style={[styles.inputText, passWordFocus && styles.focused]}
              onFocus={() => setPassWordFocus(true)}
              onBlur={() => setPassWordFocus(false)}
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              testID="password-input"
              placeholderTextColor={Colors.darkText}
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
              placeholderTextColor={Colors.darkText}
            />
            <PhoneInput
              ref={phoneInput}
              style={[styles.inputText, styles.focused]}
              placeholder="Enter phone number"
              value={mobile}
              onChangeText={text => {
                setMobile(text)
              }}
              defaultCode="IN"
              withDarkTheme
            />
          </View>

          <TouchableOpacity
            testID="signup-button"
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(mobile)
              if (checkValid) {
                handleRegistration(email, password, confirmPassword, navigation)
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
              padding: Spacing
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
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font.BOLD,
    marginVertical: Spacing * 2
  },
  login: {
    fontFamily: Font.BOLD,
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small
  },
  signup_text: {
    fontFamily: Font.BOLD,
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large
  },
  signup: {
    padding: Spacing * 1.5,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 0.5,
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
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing
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
  }
})
export default RegisterScreen
