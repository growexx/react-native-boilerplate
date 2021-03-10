import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    height: 80,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 15,
    backgroundColor: colors.LIGHT_GREY
  },
  rightContainer: {
    flex: 1,
    height: 80,
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.BLACK
  },
  sourceTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.LIGHT_GREY
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.LIGHT_GREY,
    alignSelf: 'flex-end'
  }
})

export default styles
