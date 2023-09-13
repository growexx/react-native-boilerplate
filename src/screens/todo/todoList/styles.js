import { StyleSheet } from 'react-native'
import { colors } from '@constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  todoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  todoContainer: {
    flexDirection: 'column',
    flex: 1
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8
  },

  todoTitle: {
    fontSize: 18
  },
  todoDescription: {
    fontSize: 14
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
