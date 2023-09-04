import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from './styles';
import LanguageUtils from '../../../localization/languageUtils';
import languagekeys from '../../../localization/languagekeys';

const db = SQLite.openDatabase({ name: 'todos.db', location: 'default' });

const AddTodo = ({ navigation }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesription, setTodoDescription] = useState('');

  const addTodo = () => {
    if (todoTitle.trim() === '' || todoDesription.trim() === '') {
      Alert.alert('Please enter a valid todo.');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO todos (title, description) VALUES (?,?)',
        [todoTitle, todoDesription],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Todo added successfully!');
            setTodoTitle('');
            setTodoDescription('');
            navigation.navigate('Todo');
          } else {
           Alert.alert('Error adding todo. Please try again.');
          }
        },
        (error) => {
          Alert.alert('Error adding todo:' + error.toString())
          console.error('Error adding todo:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container} >
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter todo title"
        onChangeText={(text) => setTodoTitle(text)}
        value={todoTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter todo description"
        onChangeText={(text) => setTodoDescription(text)}
        value={todoDesription}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>{LanguageUtils.getLangText(languagekeys.addTodo)}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddTodo;
