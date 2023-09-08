import { Dimensions, StyleSheet } from 'react-native'
import { colors, fontSize, fonts, spacing } from '@constants'

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
  h1Dark: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.dark.text
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
    backgroundColor: colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: colors.light.background,
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialButtonApple: {
    height: 40,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  socialButtonGoogle: {
    height: 50,
    width: '103%',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  createAccountButton: {
    fontFamily: fonts.BOLD,
    color: 'blue',
    textAlign: 'center',
    fontSize: fontSize.small
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
    width: '100%',
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    borderRadius: spacing,
    marginVertical: spacing,
    alignItems: 'center'
  },
  register_view: {
    flexDirection: 'row'
  },
  dont_have_account: {
    textAlign: 'center',
    fontSize: fontSize.small,
    paddingTop: spacing
  },
  dont_have_account_dark: {
    textAlign: 'center',
    fontSize: fontSize.small,
    paddingTop: spacing,
    color: colors.dark.text
  }
})

export default styles
