import * as SecureStore from 'expo-secure-store';

const saveToStorage = async (key, value) => {
  return  SecureStore.setItemAsync(key, value);
}

const getFromStorage = async (key) => {
 return   SecureStore.getItemAsync(key);
}

const removeFromStorage = (key) => {
    SecureStore.deleteItemAsync(key);
}



export {saveToStorage, getFromStorage, removeFromStorage};