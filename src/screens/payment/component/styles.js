import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  payButton: {
    height: 40,
    width: '100%',
    backgroundColor: colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  pay_text: {
    color: colors.light.background,
    fontSize: 18,
    fontWeight: 'bold'
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16
  }
})

export default styles
