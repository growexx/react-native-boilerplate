import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/fonts'
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
    color:Colors.dark.text
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
    color: Colors.dark.text
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
    color: Color.dark.text,
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
    backgroundColor: Colors.light.primary,
    color: 'white',
    marginStart: 20,
    marginTop: 40,
    padding: Spacing * 2
  },
  resendCodeText: {
    marginStart: 20,
    marginTop: 40
  },
  resendCodeTextDark: {
    marginStart: 20,
    marginTop: 40,
    color:Color.dark.text
  },
  resendCodeContainer: {
    flexDirection: 'row',
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
})
