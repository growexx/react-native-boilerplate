import { Dimensions, StyleSheet } from 'react-native'
import { colors } from '@constants'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/colors'
import Font from '../../constants/fonts'
import Spacing from '../../constants/Spacing'

const styles = StyleSheet.create({
  SafeAreaView: {
    height: Dimensions.get('window').height,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  logoImage: {
    height: '20%',
    resizeMode: 'contain'
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  inputField: {
    paddingVertical: 0,
    paddingLeft: 10,
    height: 40,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10
  },
  buttonWrapper: {
    height: 40,
    width: '100%',
    backgroundColor: colors.darkText,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialButton: {
    height: 40,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  socialButtonGoogle: {
    height: 50,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center'
  },
  createAccountButton: {
    fontFamily: Font.BOLD,
    color: 'blue',
    textAlign: 'center',
    fontSize: FontSize.small
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
    width: '100%',
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    backgroundColor: Colors.dark.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    alignItems: 'center'
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
  register_view: {
    flexDirection: 'row'
  },
  dont_have_account: {
    textAlign: 'center',
    fontSize: FontSize.small,
    paddingTop: Spacing
  },
  dont_have_account_dark: {
    textAlign: 'center',
    fontSize: FontSize.small,
    paddingTop: Spacing,
    color: Colors.dark.text
  }
})

export default styles
