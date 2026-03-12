export type Appliance = {
  id: number;
  brand: string;
  model: string;
  serial?: string;
  type: string;
  nickname?: string;
  purchaseDate?: string;
  createdAt: string;
};

export type Task = {
  id: number;
  applianceId: number;
  applianceName: string;
  taskName: string;
  dueDate: string;
  frequencyDays: number;
  status: string; //"pending" | "done";
  createdAt: string;
  completedAt?: string;
};

export type HistoryItem = {
  id: number;
  applianceId: number;
  applianceName: string;
  taskName: string;
  completedAt: string;
  estimatedSavings?: number;
};

export type Settings = {
  notifications: boolean;
  calendarSync: boolean;
  costInsights: boolean;
  weeklyDigest: boolean;
};