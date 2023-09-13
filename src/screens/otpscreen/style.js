import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import spacing from '../../constants/spacing'
import fontSize from '../../constants/fontSize'
import fonts from '../../constants/fonts'
export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    marginStart: 20,
    fontWeight: 'bold'
  },
  titleDark: {
    textAlign: 'left',
    fontSize: 20,
    marginStart: 20,
    fontWeight: 'bold',
    color: colors.dark.text
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 16,
    marginStart: 20,
    marginTop: 10
  },
  subTitleDark: {
    textAlign: 'left',
    fontSize: 16,
    marginStart: 20,
    marginTop: 10,
    color: colors.dark.text
  },
  codeFieldRoot: {
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
    marginRight: 20
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  cellText: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center'
  },
  cellRootDark: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  cellTextDark: {
    color: colors.dark.text,
    fontSize: 28,
    textAlign: 'center'
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2
  },

  button: {
    marginTop: 20
  },
  resendCode: {
    color: colors.light.primary,
    marginTop: 40,
    padding: spacing * 2
  },
  resendCodeText: {
    marginStart: 20,
    marginTop: 40
  },
  resendCodeTextDark: {
    marginStart: 20,
    marginTop: 40,
    color: colors.dark.text
  },
  resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  otp: {
    height: 40,
    width: '90%',
    backgroundColor: colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%'
  },
  otp_dark: {
    width: '100%',
    padding: spacing * 1.5,
    backgroundColor: colors.dark.primary,
    marginVertical: spacing * 0.5,
    borderRadius: spacing,
    shadowColor: colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: spacing
    }
  },
  otp_text: {
    fontFamily: fonts.BOLD,
    color: colors.light.onPrimary,
    textAlign: 'center',
    fontSize: fontSize.large
  },
  otp_text_dark: {
    fontFamily: fonts.BOLD,
    color: colors.dark.text,
    textAlign: 'center',
    fontSize: fontSize.large
  }
})
