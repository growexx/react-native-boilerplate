import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

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
    color: colors.light.text
  },
  titleTextDark: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.dark.text
  },
  sourceTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.light.darkText
  },
  sourceTextDark: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.dark.gray
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.light.darkText,
    alignSelf: 'flex-end'
  },
  timeTextDark: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.dark.darkText,
    alignSelf: 'flex-end'
  }
})

export default styles
