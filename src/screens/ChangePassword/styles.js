import { Dimensions, StyleSheet } from 'react-native'
import { colors, fonts, fontSize, spacing } from '@constants'

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
    width: width * 0.8,
    paddingVertical: width * 0.05,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.lightPrimary,
    borderRadius: spacing,
    marginVertical: spacing,
    marginHorizontal: 0
  },
  inputDark: {
    color: colors.dark.darkText,
    borderColor: colors.dark.gray
  },
  infoIcon: {
    flexDirection: 'row',
    marginLeft: 10
  },
  menuTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '110%'
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
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
