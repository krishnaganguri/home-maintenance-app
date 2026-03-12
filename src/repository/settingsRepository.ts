import { load, save } from "../services/storageService";

const KEY = "settings";

export async function getSettings() {
  return await load(KEY);
}

export async function saveSettings(data: any) {
  await save(KEY, data);
}