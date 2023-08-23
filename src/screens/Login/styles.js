import { Dimensions, StyleSheet } from 'react-native'
import { colors } from '@constants'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/colors'
import Font from '../../constants/fonts'
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
    borderColor: colors.LIGHT_GREY,
    borderRadius: 10
  },
  buttonWrapper: {
    height: 40,
    width: '100%',
    backgroundColor: colors.DARK_GREY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialButton: {
    height: 40,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center'
  },
  socialButtonGoogle: {
    height: 50,
    width: '103%',
    borderRadius: 15,
    justifyContent: 'center'
  },
  createAccountButton: {
    fontFamily: Font.BOLD,
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small
  }
})

export default styles
