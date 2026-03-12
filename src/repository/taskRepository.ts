import { load, save } from "../services/storageService";

const KEY = "tasks";

export async function getTasks() {
  return await load(KEY);
}

export async function saveTasks(data: any[]) {
  await save(KEY, data);
}