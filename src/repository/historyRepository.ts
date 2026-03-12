import { load, save } from "../services/storageService";

const KEY = "history";

export async function getHistory() {
  return await load(KEY);
}

export async function saveHistory(data: any[]) {
  await save(KEY, data);
}