import { StyleSheet, Text, View , TouchableOpacity , useColorScheme} from 'react-native'
import React, { useState , useRef } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/colors'
import Font from '../../constants/fonts'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'
const PhoneInputScreen = ({navigation}) => {
  const colorScheme = useColorScheme()
    const [mobile, setMobile] = useState('')
    const phoneInput = useRef()
  return (
    <View style={styles.root}>
       <PhoneInput
            ref={phoneInput}
            placeholder="Enter phone number"
            value={mobile}
            onChangeText={text => {
              setMobile(text)
            }}
            defaultCode="IN"
            withDarkTheme
            containerStyle={colorScheme==='dark'? styles.phoneInputDark: styles.phoneInput}
          />
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              const val = phoneInput.current?.isValidNumber(mobile)
              if (val) {
                navigation.navigate('signwithotp' , {mobile,})
              } else if (mobile === '') {
                showToast('All fields are required.')
              } else {
                showToast('Please Enter Valid Phone Number.')
              }
            }}>
            <Text style={styles.login_text}>{LanguageUtils.getLangText(languagekeys.submit)}</Text>
          </TouchableOpacity>
    </View>
  )
}

export default PhoneInputScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center'
      },
    login: {
        width: '100%',
        padding: Spacing * 1.5,
        backgroundColor: Colors.light.primary,
        marginVertical: Spacing * 0.5,
        borderRadius: Spacing,
        shadowColor: Colors.light.primary,
        shadowOffset: {
          width: 0,
          height: Spacing
        }
      },
      login_dark: {
        width: '100%',
        padding: Spacing * 1.5,
        backgroundColor: Colors.dark.primary,
        marginVertical: Spacing * 0.5,
        borderRadius: Spacing,
        shadowColor: Colors.dark.primary,
        shadowOffset: {
          width: 0,
          height: Spacing
        }
      },
      login_text: {
        fontFamily: Font.BOLD,
        color: Colors.light.onPrimary,
        textAlign: 'center',
        fontSize: FontSize.large
      },
      login_text_dark: {
        fontFamily: Font.BOLD,
        color: Colors.dark.text,
        textAlign: 'center',
        fontSize: FontSize.large
      },
      phoneInput: {
        width: '100%',
        fontFamily: Font.REGULAR,
        fontSize: FontSize.small,
        padding: Spacing * 1.5,
        backgroundColor: Colors.light.lightPrimary,
        borderRadius: Spacing
      },
      phoneInputDark: {
        width: '100%',
        fontFamily: Font.REGULAR,
        fontSize: FontSize.small,
        padding: Spacing * 1.5,
        color:'black',
        backgroundColor: Colors.light.gray,
      }
})
