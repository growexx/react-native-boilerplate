import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16
  },
  addButtonText: {
    color: 'white',
    fontSize: 16
  }
})

export default styles
