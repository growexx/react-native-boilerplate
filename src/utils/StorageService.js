import AsyncStorage from '@react-native-async-storage/async-storage';


// Save an item to AsyncStorage
const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {}
};

// Get an item from AsyncStorage
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      // Item found, parse and return it
      return JSON.parse(value)
    } else {
      // Item not found
      return null
    }
  } catch (error) {
    return null
  }
};

export { saveItem, getItem };
