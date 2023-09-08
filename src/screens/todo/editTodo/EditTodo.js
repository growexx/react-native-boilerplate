import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from './styles';
import LanguageUtils from '../../../localization/languageUtils';
import languagekeys from '../../../localization/languagekeys';

const db = SQLite.openDatabase({ name: 'todos.db', location: 'default' });

function EditTodo({ route, navigation }) {
    const { id } = route.params;
    const { description } = route.params;
    const [todo, setTodo] = useState({ id, description, title: '' });

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM todos WHERE id = ?',
                [id],
                (tx, { rows }) => {
                    const data = rows.item(0);
                    setTodo({ id: data.id, title: data.title, description: data.description });
                },
                (error) => {
                    console.error('Error fetching todo:', error);
                }
            );
        });
    }, [id]);

    const updateTodo = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE todos SET title = ?, description = ? WHERE id = ?',
                [todo.title, todo.description, todo.id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert('Todo updated successfully!');
                        navigation.navigate('Todo');
                    } else {
                       Alert.alert('Error updating todo. Please try again.');
                    }
                },
                (error) => {
                    console.error('Error updating todo:', error);
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Todo</Text>
            <TextInput
                style={styles.input}
                placeholder="Todo title"
                value={todo.title}
                onChangeText={(text) => setTodo({ ...todo, title: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Todo Description"
                value={todo.description}
                onChangeText={(text) => setTodo({ ...todo, description: text })}
            />
            <TouchableOpacity style={styles.updateButton} onPress={updateTodo}>
                <Text style={styles.updateButtonText}>{LanguageUtils.getLangText(languagekeys.updateTodo)}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default EditTodo;
