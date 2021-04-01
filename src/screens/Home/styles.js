import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.LIGHT_GREY,
    elevation: 3,
    backgroundColor: colors.WHITE,
    shadowColor: colors.LIGHT_GREY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1, 
  },
  headerItem: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: colors.WHITE,
    shadowColor: colors.LIGHT_GREY,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1, 
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  errorContainer: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.DARK_GREY,
    textAlign: 'center'
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.LIGHT_GREY,
    textAlign: 'center',
    marginTop: 10
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE,
    backgroundColor: colors.DARK_GREY,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  activeView: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: colors.DARK_GREY,
    borderRadius: 25,
    marginLeft: 10,
    marginTop: 12,
    justifyContent: 'center'
  },
  inactiveView: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    marginLeft: 10,
    marginTop: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.LIGHT_GREY
  },
  activeViewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  inactiveViewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.DARK_GREY,
  }
})

export default styles
