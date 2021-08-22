import AsyncStorage  from '@react-native-async-storage/async-storage'

export async function set(key: string, value: string) {
    await AsyncStorage.setItem(key, value)
}
export async function get(key: string) {
    return AsyncStorage.getItem(key)
}

export async function retrieve(key: string) {
    const serialized = await AsyncStorage.getItem(key)
    if (!serialized) {
        return null
    }
    return JSON.parse(serialized)
}

export async function remove(key: string) {
    await AsyncStorage.removeItem(key)
}