import { load, save } from "../services/storageService";

const KEY = "appliances";

export async function getAppliances() {
  return await load(KEY);
}

export async function saveAppliances(data: any[]) {
  await save(KEY, data);
}