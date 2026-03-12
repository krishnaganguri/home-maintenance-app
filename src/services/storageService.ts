import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, value: any) {
  await AsyncStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

export async function load(key: string) {
  //await AsyncStorage.clear();
  const value = await AsyncStorage.getItem(key);

  return value ? JSON.parse(value) : [];
}
