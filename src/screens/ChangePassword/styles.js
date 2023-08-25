import { Dimensions, StyleSheet } from 'react-native'
import { colors, fontSize, fonts, spacing } from '@constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  changePasswordText: {
    color: colors.light.text,
    fontSize: fontSize.xLarge,
    alignSelf: 'flex-start',
    marginBottom: width * 0.03
  },
  changePasswordTextDark: {
    color: colors.dark.text
  },
  passwordValidationStyle: {
    marginHorizontal: width * 0.025,
    color: colors.light.errorColor,
    fontSize: fontSize.medium
  },
  container: {
    height: '100%',
    justifyContent: 'center'
  },
  innerContainer: {
    borderRadius: width * 0.03,
    borderColor: colors.dark.darkText,
    paddingHorizontal: width * 0.1,
    paddingVertical: width * 0.05,
    borderWidth: 2,
    alignSelf: 'center',
    width: width * 0.9
  },
  input: {
    margin: width * 0.025,
    color: colors.light.darkText,
    fontSize: fontSize.medium,
    borderBottomWidth: 2.5,
    borderColor: colors.light.gray
  },
  inputDark: {
    color: colors.dark.darkText,
    borderColor: colors.dark.gray
  },
  menuTextInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.1,
    backgroundColor: colors.light.active,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: width * 0.1
  },
  buttonText: {
    color: colors.light.lightPrimary,
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginRight: width * 0.01
  },
  buttonTextDark: {
    color: colors.dark.text
  },
  infoImage: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 15,
    top: -10
  }
})

export default styles
