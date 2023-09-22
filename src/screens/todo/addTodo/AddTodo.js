import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import styles from './styles'
import LanguageUtils from '../../../localization/languageUtils'
import languagekeys from '../../../localization/languagekeys'
import { useIsFocused } from '@react-navigation/native'
import { getItem } from '../../../utils/StorageService'

const db = SQLite.openDatabase({ name: 'todos.db', location: 'default' })

const AddTodo = ({ navigation }) => {
  const isFocused = useIsFocused()

  const getAppLanguage = async () => {
    await getItem(constants.APP_LANGUAGE)
  }

  useEffect(() => {
    getAppLanguage()
  }, [isFocused])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDesription, setTodoDescription] = useState('')

  const addTodo = () => {
    if (todoTitle.trim() === '' || todoDesription.trim() === '') {
      Alert.alert(LanguageUtils.getLangText(languagekeys.validtodo), '', [
        {
          text: LanguageUtils.getLangText(languagekeys.ok)
        }
      ])
      return
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO todos (title, description) VALUES (?,?)',
        [todoTitle, todoDesription],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(LanguageUtils.getLangText(languagekeys.success), '', [
              {
                text: LanguageUtils.getLangText(languagekeys.ok)
              }
            ])
            setTodoDescription('')
            setTodoTitle('')
            navigation.navigate('Todo')
          } else {
            Alert.alert('Error adding todo. Please try again.')
          }
        },
        error => {
          Alert.alert('Error adding todo:' + error.toString())
          console.error('Error adding todo:', error)
        }
      )
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {LanguageUtils.getLangText(languagekeys.title1)}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={LanguageUtils.getLangText(languagekeys.entertitle)}
        onChangeText={text => setTodoTitle(text)}
        value={todoTitle}
      />
      <Text style={styles.label}>
        {LanguageUtils.getLangText(languagekeys.description)}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={LanguageUtils.getLangText(languagekeys.enterdes)}
        onChangeText={text => setTodoDescription(text)}
        value={todoDesription}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>
          {LanguageUtils.getLangText(languagekeys.addTodo)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddTodo
