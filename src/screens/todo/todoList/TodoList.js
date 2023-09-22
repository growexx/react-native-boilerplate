import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'
import { useIsFocused } from '@react-navigation/native'
import { getItem } from '../../../utils/StorageService'

const db = SQLite.openDatabase({ name: 'todos.db', location: 'default' })

function TodoList({ navigation }) {
  const isFocused = useIsFocused()

  const getAppLanguage = async () => {
    await getItem(constants.APP_LANGUAGE)
  }

  useEffect(() => {
    getAppLanguage()
  }, [isFocused])
  const [todos, setTodos] = useState()

  const fetchTodos = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM todos',
        [],
        (tx, results) => {
          const rows = results.rows
          const todosArray = []
          for (let i = 0; i < rows.length; i++) {
            todosArray.push(rows.item(i))
          }
          setTodos(todosArray)
        },
        error => {
          console.error('Error fetching todos:', error)
        }
      )
    })
  }

  const deleteTodo = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM todos WHERE id = ?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              LanguageUtils.getLangText(languagekeys.tododelete),
              '',
              [
                {
                  text: LanguageUtils.getLangText(languagekeys.ok)
                }
              ]
            )
            fetchTodos()
          }
        },
        error => {
          console.error('Error deleting todo:', error)
        }
      )
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTodos()
    })
    return unsubscribe
  }, [navigation])

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity
        testID="edit-button"
        style={styles.editButton}
        onPress={() => navigation.navigate('EditTodo', { id: item.id })}>
        <Icon name="playlist-edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        testID="delete-button"
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(LanguageUtils.getLangText(languagekeys.areYouSure), '', [
            {
              text: LanguageUtils.getLangText(languagekeys.ok),
              onPress: async () => {
                deleteTodo(item.id)
              }
            },
            {
              text: LanguageUtils.getLangText(languagekeys.cancel),
              onPress: async () => {
                //do nothing
              }
            }
          ])
        }>
        <Icon name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        testID="add-todo"
        onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.addButtonText}>
          {LanguageUtils.getLangText(languagekeys.addTodo)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TodoList
