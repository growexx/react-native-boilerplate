import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.light.background
  },
  SafeAreaViewDark: {
    flex: 1,
    backgroundColor: colors.light.background
  },
  header: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light.borderWithOpacity,
    elevation: 3,
    backgroundColor: colors.light.background,
    shadowColor: colors.LIGHT_GREY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1
  },
  headerDark: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.dark.borderWithOpacity,
    elevation: 3,
    backgroundColor: colors.dark.background,
    shadowColor: colors.dark.borderWithOpacity,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1
  },
  headerItem: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: colors.light.text,
    shadowColor: colors.light.borderWithOpacity,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  headerItemDark: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: colors.dark.text,
    shadowColor: colors.dark.borderWithOpacity,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: colors.light.background
  },
  containerDark: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: colors.dark.background
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 8
  },
  errorContainer: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  errorTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.light.darkText,
    textAlign: 'center'
  },
  errorTitleDark: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.dark.darkText,
    textAlign: 'center'
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.light.darkText,
    textAlign: 'center',
    marginTop: 10
  },
  errorMessageDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.darkText,
    textAlign: 'center',
    marginTop: 10
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.light.text,
    backgroundColor: colors.light.background,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  retryTextDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    backgroundColor: colors.dark.background,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  activeView: {
    paddingHorizontal: 15,
    backgroundColor: colors.light.gray,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: colors.light.borderWithOpacity
  },
  activeViewDark: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: colors.dark.gray,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: colors.dark.borderWithOpacity
  },
  inactiveView: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: colors.light.background,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.light.borderWithOpacity
  },
  inactiveViewDark: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: colors.dark.background,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.dark.text
  },

  activeViewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.light.text
  },
  activeViewTextDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text
  },
  inactiveViewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.light.text
  },
  inactiveViewTextDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text
  }
})

export default styles
