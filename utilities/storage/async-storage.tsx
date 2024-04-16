import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
    static storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            // saving error
            throw e;
        }
    };

    static storeObjectData = async (key: string, value: object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
            throw e;
        }
    };

    static getData = async (key: string): Promise<string | null> => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // value previously stored
                return value;
            }
            return null;
        } catch (e) {
            // error reading value
            throw e;
        }
    };

    static getObjectData = async (key: string): Promise<object | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            throw e;
        }
    };

    static removeValue = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            // remove error
            throw e;
        }
    };
}
