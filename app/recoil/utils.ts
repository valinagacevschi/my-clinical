import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultValue } from 'recoil'

export async function defaultAsync<T>(key: string, defaultValue: T): Promise<T> {
  const savedValue = await AsyncStorage.getItem(key)
  if (savedValue != null) {
    return JSON.parse(savedValue)
  } else {
    return defaultValue
  }
}

export const localStorageEffect = (key: string) => ({ onSet }): void => {
  onSet(async (newValue) => {
    if (newValue instanceof DefaultValue) {
      await AsyncStorage.removeItem(key)
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(newValue))
    }
  })
}

export function hasChanged<T>(key: string, newObj: T, oldObj: T): boolean {
  return newObj[key] !== oldObj[key] && newObj[key] != null
}

export async function asyncReset(key: string): Promise<void> {
  await AsyncStorage.removeItem(key)
}
