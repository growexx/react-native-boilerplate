import AsyncStorage from '@react-native-async-storage/async-storage';


// Save an item to AsyncStorage
const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Item with key ${key} saved successfully with value ${value}.`);
  } catch (error) {
    console.error(`Error saving item with key ${key}: ${error}`);
  }
};

// Get an item from AsyncStorage
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Item found, parse and return it
      return JSON.parse(value);
    } else {
      // Item not found
      console.log(`Item with key ${key} not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving item with key ${key}: ${error}`);
    return null;
  }
};

export { saveItem, getItem };
