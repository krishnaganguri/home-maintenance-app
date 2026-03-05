import AsyncStorage from "@react-native-async-storage/async-storage";

async function getTasks() {
  const data: string | null = await AsyncStorage.getItem("tasks");
  return JSON.parse(data || "[]");
}

async function saveTasks(tasks: any[]) {
  await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
}

async function getAppliances() {
  const data: string | null = await AsyncStorage.getItem("appliances");
  return JSON.parse(data || "[]");
}

async function saveAppliances(appliances: any[]) {
  await AsyncStorage.setItem("appliances", JSON.stringify(appliances));
}

export default {
  getTasks,
  saveTasks,
  getAppliances,
  saveAppliances
};