import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: '60%',
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
    borderRadius: 10,
    justifyContent: 'center',
  },
})

export default styles
