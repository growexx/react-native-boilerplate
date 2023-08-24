import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { isEmailValid } from '../../utils/validations'
import showToast from '../../components/toast'

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        testID="email-input"
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        testID="submit"
        style={styles.button}
        onPress={() => {
          if (email === '') {
            showToast('Email field is required.')
          } else if (isEmailValid(email)) {
            showToast(
              'Email has been sent successfully.Please Check your inbox .'
            )
            setTimeout(() => {
              navigation.navigate('Login')
            }, 2000)
          } else {
            showToast(
              'You have entered invalid email address, Please, enter a valid email address.'
            )
          }
        }}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="go-back"
        style={styles.link}
        onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Go back to login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  },
  successText: {
    color: 'green',
    marginTop: 10
  },
  link: {
    marginTop: 20
  },
  linkText: {
    color: '#007bff',
    fontSize: 16
  }
})

export default ForgotPasswordScreen
